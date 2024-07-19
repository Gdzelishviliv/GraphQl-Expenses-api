import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    expenses: [Expense]
  }

  type Expense {
    id: ID!
    amount: Float!
    description: String
    date: String
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    expenses: [Expense]
    expense(id: ID!): Expense
  }

  type Mutation {
    addUser(name: String!): User
    updateUser(id: ID!, name: String!): User
    deleteUser(id: ID!): User
    addExpense(amount: Float!, description: String, date: String, userId: ID!): Expense
    updateExpense(id: ID!, amount: Float, description: String, date: String): Expense
    deleteExpense(id: ID!): Expense
  }
`;

export default typeDefs;
