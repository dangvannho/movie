import httpRequest from "~/utils/httpRequest";

const getContentByCategory = (type, category) => {
  return httpRequest.get(`/api/v1/${type}/${category}`);
};

export default getContentByCategory;
