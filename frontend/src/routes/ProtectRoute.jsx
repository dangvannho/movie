import { useContext } from "react";
import { AuthContext } from "~/context/AuthContext";
import LoginPage from "~/pages/LoginPage";

const ProtectRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return user ? children : <LoginPage />;
};

export default ProtectRoute;
