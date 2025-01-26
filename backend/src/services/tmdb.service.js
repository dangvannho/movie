const axois = require("axios");
const ENV_VAR = require("../config/envVars");

const fetchFromTMDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ENV_VAR.API_KEY}`,
    },
  };
  const response = await axois.get(url, options);
  if (response.status !== 200) {
    throw new Error("Fail to fetch data from TMDB" + response.statusText);
  }
  return response.data;
};

module.exports = fetchFromTMDB;
