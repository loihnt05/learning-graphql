const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect("mongodb+srv://teo:123@superkids.uykkxhl.mongodb.net/")
mongoose.connection.once("open", () => {
  console.log("Connected to database");
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
