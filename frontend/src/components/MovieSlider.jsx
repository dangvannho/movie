import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { TrendingContext } from "~/context/TrendingContext";
import getContentByCategory from "~/services/movie/getContentByCategory";
import imageConfig from "~/config/imgeConfig";
import routeConfig from "~/config/routeConfig";

const MovieSlider = ({ category }) => {
  const { typeTrending } = useContext(TrendingContext);
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(true);

  const slideRef = useRef();

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

  useEffect(() => {
    fetchContentByCategory();
  }, [typeTrending]);

  const fetchContentByCategory = async () => {
    const res = await getContentByCategory(typeTrending, category);
    if (res.EC === 1) {
      setContent(res.content);
    }
  };

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedType = typeTrending === "movie" ? "Movies" : "TV Shows";

  return (
    <div
      className="bg-black text-white relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-lg font-semibold">
        {formattedCategoryName} {formattedType}
      </h2>
      <div className="flex mt-5 gap-x-4 overflow-hidden" ref={slideRef}>
        {content?.map((item, index) => {
          return (
            <div key={index} className="flex-none overflow-hidden rounded-lg">
              <Link
                to={`${routeConfig.watching.replace(":id", item.id)}`}
                className="block w-[250px] h-[120px] overflow-hidden"
              >
                <img
                  src={imageConfig.SMALL_IMG_BASE_URL + item?.backdrop_path}
                  alt=""
                  className=" w-full h-full object-cover hover:transform hover:scale-125 transition duration-300 ease-in-out"
                />
              </Link>
              <h3 className="mt-4 text-center">{item.title || item.name}</h3>
            </div>
          );
        })}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer bg-black  bg-opacity-50 flex justify-center items-center size-12 rounded-[50%] hover:bg-opacity-75  transition duration-300 ease-in-out"
            onClick={scrollLeft}
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-black bg-opacity-50 flex justify-center items-center size-12 rounded-[50%] hover:bg-opacity-75"
            onClick={scrollRight}
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
