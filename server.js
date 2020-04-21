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
    getUser: async (_, args, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      const currentUser = await User.findUser(user._id);

      return currentUser;
    },
    getUsers: async () => await User.find({}).exec(),
    /*getUser: async (_, { token }, { user }) => {
      if (!token) {
        return null;
      }

      jwt.verify(token, process.env.JWT_KEY);

      const loggedInUser = await User.findUser(user._id);
      console.log(user, loggedInUser)
      //return loggedInUser;
      return TEMP_USER
    }*/
  },
  Mutation: {
    login: async (root, { email, password }, context) => {
      console.log('EMAIL:', email);
      const user = await User.loginUser(email, password);
      return user;
    },
    logout: async (root, { email }, context) => {
      const { user } = await User.logoutUser(email);
      return user;
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
      // throw new AuthenticationError('Your session expired. Sign in again.');
      return null;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context: async ({ req }) => {
    if (req) {
      const token = req.headers.authorization || '';
      const user = await getMe(token);
      console.log('getMe:', user);

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
