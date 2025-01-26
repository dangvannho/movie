const express = require("express");
const router = express.Router();
const {
  getTrendingMovie,
  getMovieTrailer,
  getDetailMovie,
  getSimilarMovie,
  getMovieByCategory,
} = require("../controllers/movie.controller");

router.get("/trending", getTrendingMovie);
router.get("/:id/trailer", getMovieTrailer);
router.get("/:id/detail", getDetailMovie);
router.get("/:id/similar", getSimilarMovie);
router.get("/:category", getMovieByCategory);

module.exports = router;
