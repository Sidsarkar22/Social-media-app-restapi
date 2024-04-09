// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS middleware
const { mongoConnect } = require("./util/database");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json()); // application/json

// Enable CORS for all origins
app.use(cors({ origin: "*" }));

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoConnect(() => {
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
});
