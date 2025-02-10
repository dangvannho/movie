import httpRequest from "~/utils/httpRequest";

const getSimilar = (type, id) => {
  return httpRequest.get(`/api/v1/${type}/${id}/similar`);
};

export default getSimilar;
