const jwt = require("jsonwebtoken");
const ENV_VAR = require("../config/envVars");

const generateToken = (user, res) => {
  const token = jwt.sign(
    { _id: user._id, image: user.image },
    ENV_VAR.JWT_SECRET,
    { expiresIn: "2d" }
  );

  res.cookie("jwt-movie", token, {
    httpOnly: true, // Đảm bảo cookie chỉ được truy cập bởi HTTP, không thể truy cập từ JavaScript (bảo mật hơn)
    secure: ENV_VAR.NODE_ENV === "production", // Chỉ dùng cookie qua HTTPS nếu là môi trường production
    maxAge: 2 * 24 * 60 * 60 * 1000, // Thời gian sống của cookie: 2 ngày (tính bằng milliseconds)
    sameSite: "strict", // Ngăn ngừa cookie được gửi trong các yêu cầu cross-site (bảo mật CSRF)
  });
};

module.exports = generateToken;
