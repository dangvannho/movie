import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { useContext } from "react";
import toast from "react-hot-toast";

import routeConfig from "~/config/routeConfig";
import logo from "~/assets/images/netflix-logo.png";
import { AuthContext } from "~/context/authContext";
import { TrendingContext } from "~/context/TrendingContext";
import logout from "~/services/auth/logout";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setTypeTrending } = useContext(TrendingContext);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res.EC === 1) {
      toast.success(res.EM);
      setUser(null);
      navigate(routeConfig.home);
    }
  };
  return (
    <div>
      <header className="max-w-6xl mx-auto p-4 flex items-center relative z-10">
        <Link to={routeConfig.home}>
          <img className="w-28 tablet:w-40 laptop:w-52" src={logo} alt="" />
        </Link>

        <nav className="hidden tablet:flex gap-3 ml-8">
          <Link
            className="hover:underline text-white"
            onClick={() => setTypeTrending("movie")}
          >
            Movies
          </Link>
          <Link
            className="hover:underline text-white"
            onClick={() => setTypeTrending("tv")}
          >
            TV shows
          </Link>
          <Link className="hover:underline text-white">Search History</Link>
        </nav>

        <div className="flex items-center ml-auto gap-1">
          <IoSearch size={30} className="text-white cursor-pointer" />
          <img
            src={user.image}
            alt=""
            className="w-[30px] h-[30px] cursor-pointer"
          />
          <div onClick={handleLogout}>
            <IoLogOutOutline size={30} className="text-white cursor-pointer" />
          </div>
        </div>

        {/* moblie */}
        <IoMdMenu
          size={28}
          className="tablet:hidden text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <nav className="w-full flex flex-col p-2 tablet:hidden bg-black border border-gray-800 rounded absolute top-full">
            <Link
              className="hover:underline text-white pb-3"
              onClick={() => setTypeTrending("movie")}
            >
              Movies
            </Link>
            <Link
              className="hover:underline text-white pb-3"
              onClick={() => setTypeTrending("tv")}
            >
              TV shows
            </Link>
            <Link className="hover:underline text-white">Search History</Link>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Navbar;
