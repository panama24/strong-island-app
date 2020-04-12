const express = require('express');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const port = process.env.PORT || 8000;

require('./db/mongoose');

const { User } = require('./models/user');

const TEMP_USER = {
  id: '1',
  username: 'jess',
  email: 'jess@example.com',
  password: '123456!',
  jwt: ''
};

const typeDefs = gql`
  type User {
    id: ID!
    username: String
    email: String
    password: String
    jwt: String
  }

  type Query {
    currentUser: User
    getUsers: [User]
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): User
    signup(username: String!, email: String!, password: String!): User
  }
`;

const resolvers = {
  Query: {
    currentUser: () => {
      return TEMP_USER;
    },
    getUsers: async () => await User.find({}).exec()
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.loginUser(email, password);
      return user;
    },
    signup: async (_, args) => {
      const user = await User.signupUser(args);
      return user;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")))

server.applyMiddleware({ app });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}${server.graphqlPath}`))
