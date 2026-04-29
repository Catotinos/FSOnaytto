const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const questionsRouter = require("./controllers/questions");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const blogsRouter = require("./controllers/blogs");

const app = express();

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/questions", questionsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
