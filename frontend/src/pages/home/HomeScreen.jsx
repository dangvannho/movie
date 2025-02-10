import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";

import { TrendingContext } from "~/context/TrendingContext";
import Navbar from "~/components/Navbar";
import MovieSlider from "~/components/MovieSlider";
import imageConfig from "~/config/imgeConfig";
import categoryConfig from "~/config/categoryConfig";
import routeConfig from "~/config/routeConfig";

const HomeScreen = () => {
  const { typeTrending, trendingContent } = useContext(TrendingContext);

  return (
    <>
      <div className="h-screen relative text-white z-10">
        <Navbar />
        <img
          src={
            imageConfig.ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path
          }
          alt=""
          className="absolute top-0 -z-30 w-full h-full object-cover"
        />
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-black -z-20"></div>

        <div className="absolute w-full h-full top-0 left-0 flex items-center px-40">
          <div className="max-w-2xl">
            <h2 className="text-7xl font-extrabold">
              {trendingContent?.title || trendingContent?.name}
            </h2>
            <div className="text-xl flex items-center gap-2 mt-3">
              <span>
                {trendingContent?.release_date?.split("-")[0] ||
                  trendingContent?.first_air_date?.split("-")[0]}{" "}
                | {trendingContent?.adult ? "18+" : "PG-13"}
              </span>
            </div>
            <p className="mt-4 text-lg leading-8">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                to={routeConfig.watch.replace(":id", trendingContent?.id)}
                className="btn bg-white hover:bg-white/80 text-black"
              >
                <FaPlay />
                Play
              </Link>

              <Link
                to={routeConfig.watch.replace(":id", trendingContent?.id)}
                className="btn text-white bg-gray-500/70 hover:bg-gray-500"
              >
                <IoIosInformationCircle />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black flex flex-col gap-10 py-10 px-20">
        {typeTrending === "movie"
          ? categoryConfig.MOVIE_CATEGORIES.map((item, index) => {
              return <MovieSlider key={index} category={item} />;
            })
          : categoryConfig.TV_CATEGORIES.map((item, index) => {
              return <MovieSlider key={index} category={item} />;
            })}
      </div>
    </>
  );
};

export default HomeScreen;
