import { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ReactPlayer from "react-player";

import Navbar from "~/components/Navbar";
import getTrailer from "~/services/movie/getTrailer";
import getDetail from "~/services/movie/getDetail";
import getSimilar from "~/services/movie/getSimilar";
import { TrendingContext } from "~/context/TrendingContext";
import imageConfig from "~/config/imgeConfig";
import routeConfig from "~/config/routeConfig";

const WatchPage = () => {
  const { id } = useParams();
  const { typeTrending } = useContext(TrendingContext);

  const [trailers, setTrailers] = useState([]);
  const [detail, setDetail] = useState({});
  const [similars, setSimilars] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const slideRef = useRef();

  useEffect(() => {
    fetchData();
  }, [typeTrending, id]);

  const fetchData = async () => {
    try {
      const [trailerRes, detailRes, similarRes] = await Promise.all([
        getTrailer(typeTrending, id),
        getDetail(typeTrending, id),
        getSimilar(typeTrending, id),
      ]);

      if (trailerRes.EC === 1) setTrailers(trailerRes.trailers);
      if (detailRes.EC === 1) setDetail(detailRes.content);
      if (similarRes.EC === 1) setSimilars(similarRes.similar.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (date) => {
    const dateFormat = new Date(`${date}T00:00:00Z`);
    const formattedDate = dateFormat.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const handePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1);
    }
  };

  const handeNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
  };

  const scrollLeft = () => {
    slideRef.current.scrollBy({
      left: -slideRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    slideRef.current.scrollBy({
      left: slideRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-12">
        {trailers.length > 0 && (
          <div className="flex justify-between">
            <button
              className={`btn w-[50px] bg-gray-500/70 hover:bg-gray-500 text-white ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handePrev}
            >
              <FaChevronLeft />
            </button>
            <button
              className={`btn w-[50px] bg-gray-500/70 hover:bg-gray-500 text-white ${
                currentTrailerIdx === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handeNext}
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        <div className="aspect-video mt-10 flex justify-center items-center">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"90%"}
              height={"70vh"}
              className="mx-auto"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5 text-white ">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {detail?.title || detail?.name}
              </span>
              &#128549;
            </h2>
          )}
        </div>

        {/* movie detail */}
        <div className="mt-40 max-w-6xl flex items-center gap-8 mx-auto">
          <div>
            <h2 className="text-3xl font-extrabold text-white">
              {detail?.title || detail?.name}
            </h2>
            <div className="text-lg flex items-center gap-2 mt-3 text-white">
              <span>
                {formatDate(detail?.release_date || detail?.first_air_date)} |
              </span>

              {detail?.adult ? (
                <span className="text-red-500">18+</span>
              ) : (
                <span className="text-green-500">PG-13</span>
              )}
            </div>
            <p className="mt-4 text-lg leading-8 text-white">
              {detail?.overview}
            </p>
          </div>

          <img
            src={imageConfig.ORIGINAL_IMG_BASE_URL + detail.poster_path}
            alt=""
            className="h-[600px] rounded-md"
          />
        </div>

        {/* similar */}
        <div
          className="mt-10 max-w-6xl mx-auto relative"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          <h2 className="text-3xl text-white font-bold">
            Similar Movies/TV Shows
          </h2>
          <div
            className="flex mt-8 gap-5 overflow-x-hidden cursor-pointer"
            ref={slideRef}
          >
            {similars.length > 0 &&
              similars.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className="flex-none"
                    to={routeConfig.watch.replace(":id", item.id)}
                  >
                    <img
                      src={imageConfig.SMALL_IMG_BASE_URL + item.poster_path}
                      alt=""
                      className="w-[200px] h-[300px] object-cover"
                    />
                    <h4 className="text-lg text-center text-white my-4">
                      {(item?.name?.length > 20
                        ? item?.name.slice(0, 20) + " ..."
                        : item?.name) ||
                        (item?.title?.length > 20
                          ? item?.title?.slice(0, 20) + " ..."
                          : item?.title)}
                    </h4>
                  </Link>
                );
              })}
            {showArrows && (
              <>
                <div
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-[50%] bg-red-500 flex justify-center items-center text-white cursor-pointer"
                  onClick={scrollLeft}
                >
                  <FaChevronLeft />
                </div>

                <div
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-[50%] bg-red-500 flex justify-center items-center text-white cursor-pointer"
                  onClick={scrollRight}
                >
                  <FaChevronRight />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
