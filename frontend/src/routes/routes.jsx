import routeConfig from "~/config/routeConfig";

import HomePage from "~/pages/home/HomePage";
import LoginPage from "~/pages/LoginPage";
import SignUpPage from "~/pages/SignUpPage";

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
];

export default listRoute;
