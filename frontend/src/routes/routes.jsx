import HomePage from "~/pages/home/HomePage";
import LoginPage from "~/pages/LoginPage";
import SignUpPage from "~/pages/SignUpPage";
import WatchPage from "~/pages/WatchPage";

import ProtectRoute from "./ProtectRoute";
import routeConfig from "~/config/routeConfig";

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
    path: routeConfig.watch,
    element: (
      <ProtectRoute>
        <WatchPage />
      </ProtectRoute>
    ),
  },
];

export default listRoute;
