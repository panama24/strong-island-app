const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer, AuthenticationError, gql } = require('apollo-server-express');
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
    getUser(token: String): User
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): LoginResponse!
    logout: User!
    signup(username: String!, email: String!, password: String!): User!
  }

  type LoginResponse {
    token: String
    user: User
  }
`;

const resolvers = {
  Query: {
    getUser: async (_, args, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const currentUser = await User.findUser(user._id);

      return currentUser;
    },
    getUsers: async () => await User.find({}).exec(),
  },
  Mutation: {
    login: async (root, { email, password }, context) => {
      const user = await User.loginUser(email, password);
      return user;
    },
    logout: async (root, args, { user }) => {
      const { loggedOutUser } = await User.logoutUser(user);
      return loggedOutUser;
    },
    signup: async (root, args) => {
      const user = await User.signupUser(args);
      return user;
    }
  }
};

const getMe = async (token) => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_KEY);
    } catch (e) {
      return null;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: async ({ req }) => {
    if (req) {
      const token = req.headers.authorization || '';
      const user = await getMe(token);
      return { user };
    }
  },
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client", "build")))


server.applyMiddleware({ app });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}${server.graphqlPath}`))
