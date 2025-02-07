import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/AuthContext";
import routeConfig from "~/config/routeConfig";

const ProtectRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(routeConfig.login);
    }
  }, [user]);

  return user ? children : null;
};

export default ProtectRoute;
