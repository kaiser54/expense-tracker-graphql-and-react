import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';


import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';


import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';


import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from './db/connectDB.js';
import { buildContext } from 'graphql-passport';
import { configurePassport } from './passport/passport.config.js';

// gives access the the dotenv files
dotenv.config();

configurePassport()

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

const MongoDBStore = connectMongo(session)

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  COLLECTION: 'session'
})

store.on('error', (err) => console.log(err))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // specifies whether to save session to store on every request
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  },
  store
}))

app.use(passport.initialize())
app.use(passport.session())

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.

const origin = 'http://localhost:3000'; // Define the origin variable

app.use( '/', cors({
  origin,
  credentials: true
}), express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  }),
);

// Modified server startup
await new Promise((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);

await connectDB()

console.log(`🚀 Server ready at http://localhost:4000/`);