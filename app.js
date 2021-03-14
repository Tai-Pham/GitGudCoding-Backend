const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const yaml = require("js-yaml");
const fs = require("fs");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const movieRouter = require("./routes/test/test-route.js");
global.config = yaml.load(fs.readFileSync("./config/ci.yaml", "utf8"));

const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api/test", movieRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
