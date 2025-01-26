const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ENV_VAR = require("../config/envVars");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-movie"];

    if (!token) {
      return res.status(401).json({
        EC: 0,
        EM: "Unauthorized - No Token Provided",
      });
    }

    const decode = jwt.verify(token, ENV_VAR.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        EC: 0,
        EM: "Unauthorized - Invalid Token",
      });
    }

    const user = await User.findById(decode.id).select("-password");

    if (!user) {
      return res.status(404).json({
        EC: 0,
        EM: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message,
    });
  }
};

module.exports = { protectRoute };
