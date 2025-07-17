const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true, 
}));


mongoose.connect("mongodb+srv://teo:123@superkids.uykkxhl.mongodb.net/")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
