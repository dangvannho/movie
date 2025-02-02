import { Link } from "react-router-dom";
import routeConfig from "~/config/routeConfig";
import logo from "~/assets/images/netflix-logo.png";

const Header = ({ user }) => {
  return (
    <header className="max-w-6xl mx-auto p-4 flex justify-between items-center">
      <Link to={routeConfig.home}>
        <img className="w-20 tablet:w-40 laptop:w-52" src={logo} alt="" />
      </Link>
      {user ? (
        <p>Đã đăng nhập</p>
      ) : (
        <Link
          to={routeConfig.login}
          className="bg-red-600 text-white py-1 px-2 rounded cursor-pointer"
        >
          Sign in
        </Link>
      )}
    </header>
  );
};

export default Header;
