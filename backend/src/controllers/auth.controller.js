const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Register
const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        EC: 0,
        EM: "All fields are required",
      });
    }

    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        EC: 0,
        EM: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        EC: 0,
        EM: "Password must be at least 6 characters",
      });
    }

    const checkEmailExisting = await User.findOne({ email: email });
    if (checkEmailExisting) {
      return res.status(400).json({
        EC: 0,
        EM: "Email already exists",
      });
    }

    const checkUsernameExisting = await User.findOne({ username: username });
    if (checkUsernameExisting) {
      return res.status(400).json({
        EC: 0,
        EM: "Username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const PROFILE_PICS = [""]

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    const { password: ignoredPassword, ...infoUser } = newUser.toObject();

    return res.status(200).json({
      EC: 1,
      EM: "Create account successful",
      User: infoUser,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message || "Internal server error",
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        EC: 0,
        EM: "All fields are required",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        EC: 0,
        EM: "Email or password incorrect",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        EC: 0,
        EM: "Email or password incorrect",
      });
    }

    generateToken(user, res);
    return res.status(200).json({
      EC: 1,
      EM: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message || "Internal server error",
    });
  }
};

// logout
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-movie");
    return res.status(200).json({
      EC: 1,
      EM: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message || "Internal server error",
    });
  }
};

module.exports = { register, login, logout };
