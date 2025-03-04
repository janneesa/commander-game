const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    highscore: {
      type: Number,
      default: 0,
    },
    life: {
      type: Number,
      default: 4,
    },
    solved: {
      type: Boolean,
      default: false,
    },
    solvedDate: {
      type: String,
      default: "",
    },
    canSolve: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// static signup method
userSchema.statics.signup = async function (email, password, confirmPassword) {
  // validation
  if (!email || !password || !confirmPassword) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (password.length < 8) {
    throw Error("Password must be at least 8 characters long");
  }
  if (password !== confirmPassword) {
    throw Error("Passwords do not match");
  }

  // check if email is already in use.
  const lowerCaseEmail = email.toLowerCase();
  const exists = await this.findOne({ lowerCaseEmail });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(13);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email: lowerCaseEmail,
    password: hash,
  });

  const userObject = user.toJSON();
  delete userObject.password; // Remove the password field

  return userObject;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  const userObject = user.toJSON();
  delete userObject.password; // Remove the password field

  return userObject;
};
module.exports = mongoose.model("User", userSchema);
