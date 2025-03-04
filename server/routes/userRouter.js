const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  getUserById,
  updateUser,
  solveCommander,
} = require("../controllers/userController");
const requireAuth = require("../middlewares/requireAuth");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get user by id route
router.get("/:userId", getUserById);

// requireAuth middleware
router.use(requireAuth);

// solve commander route
router.put("/solve/:userId", solveCommander);

// update user route
router.put("/:userId", updateUser);

module.exports = router;
