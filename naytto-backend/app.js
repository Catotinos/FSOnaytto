const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

const app = express();

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info("connected to MongoDB");
});

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

module.exports = app;
