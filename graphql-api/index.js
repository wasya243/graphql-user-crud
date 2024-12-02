const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./graphql/Schema");
const resolvers = require("./graphql/Resolvers");

const app = express();

app.use(cors())

mongoose.connect("mongodb://localhost:27017/graphql-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

app.use(
    "/",
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true,
    })
);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});