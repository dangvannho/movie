import httpRequest from "~/utils/httpRequest";

const checkAuth = () => {
  return httpRequest.get("/api/v1/auth/authCheck");
};

export default checkAuth;
