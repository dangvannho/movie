import HomePage from "~/pages/home/HomePage";
import LoginPage from "~/pages/LoginPage";
import SignUpPage from "~/pages/SignUpPage";
import WatchPage from "~/pages/WatchPage";

import routeConfig from "~/config/routeConfig";
import ProtectRoute from "./ProtectRoute";

const listRoute = [
  {
    path: routeConfig.home,
    element: <HomePage />,
  },
  {
    path: routeConfig.login,
    element: <LoginPage />,
  },
  {
    path: routeConfig.signUp,
    element: <SignUpPage />,
  },
  {
    path: routeConfig.watching,
    element: (
      <ProtectRoute>
        <WatchPage />
      </ProtectRoute>
    ),
  },
];

export default listRoute;
