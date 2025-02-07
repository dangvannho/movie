import httpRequest from "~/utils/httpRequest";

const getTrending = (type) => {
  return httpRequest.get(`/api/v1/${type}/trending`);
};

export default getTrending;
