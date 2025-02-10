import httpRequest from "~/utils/httpRequest";

const getDetail = (type, id) => {
  return httpRequest.get(`/api/v1/${type}/${id}/detail`);
};

export default getDetail;
