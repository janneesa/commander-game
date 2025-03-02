const express = require("express");
const {
  getDailyCommander,
} = require("../controllers/dailyCommanderController");
const router = express.Router();

// Get daily commander
router.get("/", getDailyCommander);

module.exports = router;
