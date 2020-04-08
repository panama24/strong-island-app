const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

app.use(cors());

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({ typeDefs });

server.applyMiddleware({
    app,
    path: '/graphql'
});

app.listen({
    port: 8000
}, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});
