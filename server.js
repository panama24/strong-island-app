const express = require('express');
const cors = require('cors');
const path = require("path")
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")))

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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
