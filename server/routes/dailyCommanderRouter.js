const express = require("express");
const {
  getDailyCommander,
  getEndlessCommander,
} = require("../controllers/dailyCommanderController");
const router = express.Router();

// Get daily commander
router.get("/", getDailyCommander);

// Get endless commander
router.get("/endless", getEndlessCommander);

module.exports = router;
