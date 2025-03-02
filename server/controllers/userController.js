const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

// Handle user signup errors
const handleDuplicateError = (error, res) => {
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];
    res.status(400).json({
      error: `${field} with value '${value}' already exists.`,
      message: `Duplicate key error. ${error.message}`,
    });
  } else {
    res.status(400).json({ message: error.message, error: error.message });
  }
};

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // Custom signup method in the User model
    const user = await User.signup(email, password, confirmPassword);

    if (user) {
      const token = generateToken(user.id);
      return res.status(201).json({ ...user, token });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    handleDuplicateError(error, res);
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      const token = generateToken(user.id);
      res.status(200).json({ ...user, token });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get user by id
// @route   GET /api/users/:userId
// @access  Public
const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update user data
// @route   PUT /api/users/:userId
// @access  Private
const updateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields with req.body
    Object.assign(user, req.body);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  updateUser,
  getUserById,
};
