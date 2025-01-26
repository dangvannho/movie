const User = require("../models/user.model");
const fetchFromTMDB = require("../services/tmdb.service");

const searchPerson = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json({
        EC: 0,
        EM: "Not found data",
      });
    }

    console.log("id:", req.user._id);

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            image: data.results[0].profile_path,
            title: data.results[0].name,
            searchType: "personal",
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    console.log("updated: ", updated);

    return res.status(200).json({
      EC: 1,
      content: data,
    });
  } catch (error) {
    return res.status(200).json({
      EC: 0,
      EM: error.message,
    });
  }
};

const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json({
        EC: 0,
        EM: "Not found data",
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      EC: 1,
      content: data,
    });
  } catch (error) {
    return res.status(200).json({
      EC: 0,
      EM: error.message,
    });
  }
};

const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json({
        EC: 0,
        EM: "Not found data",
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      EC: 1,
      content: data,
    });
  } catch (error) {
    return res.status(200).json({
      EC: 0,
      EM: error.message,
    });
  }
};

const searchHistory = async (req, res) => {
  try {
    return res.status(200).json({
      EC: 1,
      content: req.user.searchHistory,
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message,
    });
  }
};

const removeItemFromSearchHisotry = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    return res.status(200).json({
      EC: 1,
      EM: "Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      EC: 0,
      EM: error.message,
    });
  }
};

module.exports = {
  searchPerson,
  searchMovie,
  searchTv,
  searchHistory,
  removeItemFromSearchHisotry,
};
