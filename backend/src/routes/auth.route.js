const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  authCheck,
} = require("../controllers/auth.controller");
const { protectRoute } = require("../middlewares/protectRoute");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authCheck", protectRoute, authCheck);

module.exports = router;
