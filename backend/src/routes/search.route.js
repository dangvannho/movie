const express = require("express");
const router = express.Router();
const {
  searchPerson,
  searchMovie,
  searchTv,
  searchHistory,
  removeItemFromSearchHisotry,
} = require("../controllers/search.controller");

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", searchHistory);
router.delete("/history/:id", removeItemFromSearchHisotry);

module.exports = router;
