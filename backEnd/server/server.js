const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/db.js");

// connecting to MySQL database
connectDB();
// loading routes
const router = require("./routes");

app.use(express.json());
app.use(router);

app.listen(7000, () => {
  console.log("Server Started");
});
