const userTypeDef = `#graphql
  type User {
    _id: ID! # means its required and cannot be null, hence the exclamation mark
    username: String!
    name: String!
    password: String!
    gender: String!
    profilePicture: String
  }
  
  type Query {
    users: [User!] # more like get an array of users
    authUser: User # get authenticated user. no exclamations is used cause user can or not be authenticated
    user(userId: ID!): User # get user by id
  }

  type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
  }

  input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type LogoutResponse {
    message: String!
  }
  `

export default userTypeDef;