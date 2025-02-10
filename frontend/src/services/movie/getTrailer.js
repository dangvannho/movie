import httpRequest from "~/utils/httpRequest";

const getTrailer = (type, id) => {
  return httpRequest.get(`/api/v1/${type}/${id}/trailer`);
};

export default getTrailer;
