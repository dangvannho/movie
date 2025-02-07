const fetchFromTMDB = require("../services/tmdb.service");

const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results.length)];
    return res.status(200).json({
      EC: 1,
      content: randomTv,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message,
    });
  }
};

const getTvTrailer = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    return res.status(200).json({
      EC: 1,
      trailers: data.results,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message || "Internal server error",
    });
  }
};

const getTvDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    return res.status(200).json({
      EC: 1,
      content: data,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message || "Internal server error",
    });
  }
};

const getSimilarTv = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    return res.status(200).json({
      EC: 1,
      similar: data,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message || "Internal server error",
    });
  }
};

const getTvByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    return res.status(200).json({
      EC: 1,
      content: data.results,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message || "Internal server error",
    });
  }
};

module.exports = {
  getTrendingTv,
  getTvTrailer,
  getTvDetail,
  getSimilarTv,
  getTvByCategory,
};
