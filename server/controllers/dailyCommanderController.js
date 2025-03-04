const mongoose = require("mongoose");
const DailyCommander = require("../models/dailyCommanderModel");

// @desc Fetch a random commander from the Scryfall API
const fetchCommander = async () => {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch(
    "https://api.scryfall.com/cards/random?q=is%3Acommander"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch commander");
  }
  return await response.json();
};

const isValidCommander = (commanderData) => {
  return (
    commanderData.name &&
    commanderData.image_uris?.art_crop &&
    commanderData.colors &&
    commanderData.type_line?.includes("—")
  );
};

// @desc Create new daily commander in the database if one does not exist
const createNewDailyCommander = async (req, res) => {
  try {
    let dailyCommanderData = await fetchCommander();
    while (!isValidCommander(dailyCommanderData)) {
      dailyCommanderData = await fetchCommander();
    }

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

// @desc Get an endless commander from the API
// @route GET /api/daily/endless
// @access Public
const getEndlessCommander = async (req, res) => {
  try {
    let endlessCommanderData = await fetchCommander();
    while (!isValidCommander(endlessCommanderData)) {
      endlessCommanderData = await fetchCommander();
    }

    const name = endlessCommanderData.name;
    const image = endlessCommanderData.image_uris.art_crop;
    const colors = endlessCommanderData.colors;
    const whole_type_line = endlessCommanderData.type_line.split("—");
    const card_type = whole_type_line[0].trim();
    const type_line = whole_type_line[1].trim().toLowerCase().split(" ");
    const newEndlessCommander = {
      name,
      image,
      colors,
      card_type,
      type_line,
    };
    res.json(newEndlessCommander);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getDailyCommander,
  getEndlessCommander,
};
