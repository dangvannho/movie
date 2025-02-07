import httpRequest from "~/utils/httpRequest";

const logout = () => {
  return httpRequest.post("/api/v1/auth/logout");
};

export default logout;
