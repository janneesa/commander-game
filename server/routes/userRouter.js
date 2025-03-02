const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  updateUser,
} = require("../controllers/userController");
const requireAuth = require("../middlewares/requireAuth");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// requireAuth middleware
router.use(requireAuth);

// update user route
router.put("/:userId", updateUser);

module.exports = router;
