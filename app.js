const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require("./db");
const path = require("path");
const movieRouter = require("./routes/test/test-route.js");
const fs = require("fs");
const yaml = require("js-yaml");
global.config = yaml.load(fs.readFileSync("./config/ci.yaml", "utf8"));
const utube = require("./routes/youtube");

const apiPort = 5000;

app.use(cors());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api/test", movieRouter);

app.use("/api", utube);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
