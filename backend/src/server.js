const express = require("express");
const ENV_VAR = require("./config/envVars");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
connectDB();

const authRoute = require("./routes/auth.route");
const movieRoute = require("./routes/movie.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Chào các bạn");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", movieRoute);

app.listen(ENV_VAR.PORT, () => {
  console.log(`Example app listening on port ${ENV_VAR.PORT}`);
});
