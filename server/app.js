require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const dailyCommanderRouter = require("./routes/dailyCommanderRouter");
const {
  unknownEndpoint,
  errorHandler,
  requestLogger,
} = require("./middlewares/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Middlewares
app.use(cors());
app.use(express.json());

connectDB();

// Use the requestLogger middleware for all routes
app.use(requestLogger);

// Use the userRouter for all "/user" routes
app.use("/api/user", userRouter);

// Use the drinkRouter for all "/drink" routes
app.use("/api/daily", dailyCommanderRouter);

// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
