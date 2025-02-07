import httpRequest from "~/utils/httpRequest";

const register = (email, password, username) => {
  const data = {
    email,
    password,
    username,
  };
  return httpRequest.post("/api/v1/auth/register", data);
};

export default register;
