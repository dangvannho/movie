const express = require("express");
const router = express.Router();
const {
  getTrendingTv,
  getTvTrailer,
  getTvDetail,
  getSimilarTv,
  getTvByCategory,
} = require("../controllers/tv.controller");

router.get("/trending", getTrendingTv);
router.get("/:id/trailer", getTvTrailer);
router.get("/:id/detail", getTvDetail);
router.get("/:id/similar", getSimilarTv);
router.get("/:category", getTvByCategory);

module.exports = router;
