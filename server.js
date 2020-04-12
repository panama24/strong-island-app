const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
  }

  type Query {
    currentUser: User
    getUsers: [User]
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): LoginResponse!
    logout(email: String!): User!
    signup(username: String!, email: String!, password: String!): User!
  }

  type LoginResponse {
    token: String
    user: User
  }
`;

const resolvers = {
  Query: {
    currentUser: async (_, args, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const currentUser = await User.findUser(user._id);

      return currentUser;
    },
    getUsers: async () => await User.find({}).exec()
  },
  Mutation: {
    login: async (_, { email, password }, context) => {
      const user = await User.loginUser(email, password);
      return user;
    },
    logout: async (_, { email }, context) => {
      const { user } = await User.logoutUser(email);
      return user;
    },
    signup: async (_, args) => {
      const user = await User.signupUser(args);
      return user;
    }
  }
};

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_KEY);
    }
    return null;
  } catch (e) {
    return null;
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);

    return { user };
  },
});

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")))

server.applyMiddleware({ app });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}${server.graphqlPath}`))
