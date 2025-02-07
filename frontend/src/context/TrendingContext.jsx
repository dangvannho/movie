import { createContext, useState, useEffect } from "react";
import getTrending from "~/services/movie/getTrending";

export const TrendingContext = createContext();

export const TrendingProvider = ({ children }) => {
  const [typeTrending, setTypeTrending] = useState("movie");
  const [trendingContent, setTrendingContent] = useState(null);

  useEffect(() => {
    fetchTrending();
  }, [typeTrending]);

  const fetchTrending = async () => {
    const res = await getTrending(typeTrending);
    if (res.EC === 1) {
      setTrendingContent(res.content);
    }
  };

  return (
    <TrendingContext.Provider
      value={{ trendingContent, typeTrending, setTypeTrending }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
