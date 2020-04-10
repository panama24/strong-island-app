const express = require('express');
// const userRouter = require('./routers/user');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const port = process.env.PORT || 8000;

require('./db/mongoose');

const app = express();

app.use(express.json());
// app.use(useRouter);
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
