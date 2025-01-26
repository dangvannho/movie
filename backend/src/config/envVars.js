const dotenv = require("dotenv");
dotenv.config();

const ENV_VAR = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  API_KEY: process.env.TMBD_API_KEY,
};

module.exports = ENV_VAR;
