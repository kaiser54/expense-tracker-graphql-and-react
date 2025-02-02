const transactionTypeDef = `#graphql
  type Transaction {
    _id: ID!
    userId: String!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }

  type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput): Transaction
    updateTransaction(input: UpdateTransactionInput): Transaction
    deleteTransaction(transactionId: ID!): DeleteTransactionResponse
  }

  input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }

  input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    date: String
    location: String
  }

  type DeleteTransactionResponse {
    message: String
  }
  `
export default transactionTypeDef;