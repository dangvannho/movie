import httpRequest from "~/utils/httpRequest";

const login = (email, password) => {
  const data = {
    email,
    password,
  };
  return httpRequest.post("/api/v1/auth/login", data);
};

export default login;
