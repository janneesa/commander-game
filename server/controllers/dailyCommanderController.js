const mongoose = require("mongoose");
const DailyCommander = require("../models/dailyCommanderModel");
const User = require("../models/userModel");

// @desc Create new daily commander in the database if one does not exist
const createNewDailyCommander = async (req, res) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const dailyCommander = await fetch(
      "https://api.scryfall.com/cards/random?q=is%3Acommander"
    );
    if (!dailyCommander.ok) {
      throw new Error("Failed to fetch daily commander");
    }
    const dailyCommanderData = await dailyCommander.json();
    const name = dailyCommanderData.name;
    const image = dailyCommanderData.image_uris.art_crop;
    const colors = dailyCommanderData.colors;
    const whole_type_line = dailyCommanderData.type_line.split("—");
    const card_type = whole_type_line[0].trim();
    const type_line = whole_type_line[1].trim().toLowerCase().split(" ");
    const newDailyCommander = new DailyCommander({
      name,
      image,
      colors,
      card_type,
      type_line,
    });
    const savedDailyCommander = await newDailyCommander.save();
    await User.updateMany({}, { solved: false, life: 4 });
    res.json(savedDailyCommander);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get a daily commander from the database.
// if there is none that was created on this day, create a new one
// @route GET /api/daily
// @access Public
const getDailyCommander = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const dailyCommander = await DailyCommander.findOne({
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });
    if (dailyCommander) {
      res.json(dailyCommander);
    } else {
      createNewDailyCommander(req, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getDailyCommander,
};
