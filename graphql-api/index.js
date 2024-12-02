const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./graphql/Schema");
const resolvers = require("./graphql/Resolvers");


const startServer = async () => {
    const app = express();
    app.use(cors());
  
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/graphql-demo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    console.log('MongoDB connected');
  
    // Initialize Apollo Server
    const server = new ApolloServer({ typeDefs: schema, resolvers });
    await server.start();
  
    server.applyMiddleware({ app });
  
    // Start the server
    app.listen(3000, () => {
      console.log(`Server is running at http://localhost:3000${server.graphqlPath}`);
    });
  };
  
  startServer().catch((error) => console.error(error));