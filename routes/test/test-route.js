const express = require("express");

const MovieCtrl = require("../../controllers/test/test-ctrl");

const router = express.Router();

testRouter = router;

testRouter.get("/movies", MovieCtrl.getMovies);

module.exports = testRouter;
