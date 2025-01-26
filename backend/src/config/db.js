const mongoose = require("mongoose");
const ENV_VAR = require("./envVars");

const connectDB = () => {
  mongoose
    .connect(ENV_VAR.MONGO_URI)
    .then(() => {
      console.log("Kết nối thành công với MongoDB qua Mongoose!");
    })
    .catch((err) => {
      console.error("Lỗi kết nối:", err);
    });
};

module.exports = connectDB;
