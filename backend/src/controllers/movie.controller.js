const fetchFromTMDB = require("../services/tmdb.service");

const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];
    return res.status(200).json({
      EC: 1,
      content: randomMovie,
    });
  } catch (error) {
    return res.status(200).json({
      EC: 0,
      EM: error.message || "Internal server error",
    });
  }
};

const getMovieTrailer = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
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

const getDetailMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
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

const getSimilarMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
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

const getMovieByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
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
  getTrendingMovie,
  getMovieTrailer,
  getDetailMovie,
  getSimilarMovie,
  getMovieByCategory,
};
