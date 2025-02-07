import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

import routeConfig from "~/config/routeConfig";
import logo from "~/assets/images/netflix-logo.png";
import tvImage from "~/assets/images/tv.png";
import strangerImageLg from "~/assets/images/stranger-things-lg.png";
import strangerImageSm from "~/assets/images/stranger-things-sm.png";
import iconGif from "~/assets/images/download-icon.gif";
import deviceImage from "~/assets/images/device-pile.png";
import kidImage from "~/assets/images/kids.png";

const AuthScreen = ({ user }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    navigate(`${routeConfig.signUp}?email=${email}`);
  };

  return (
    <div className="hero-bg">
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

      {/* Hero section */}
      <div className="flex flex-col justify-center items-center py-40">
        <h3 className="text-4xl tablet:text-6xl text-center text-white font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h3>
        <p className="text-lg text-white text-center mb-4 ">
          Watch anywhere. Cancel anytime.
        </p>
        <p className="text-lg text-white text-center mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form className="flex flex-col tablet:flex-row gap-4">
          <input
            type="text"
            className="w-[300px] py-2 pl-2 pr-5 border border-gray-700 bg-black text-gray-400 rounded outline-none"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="flex justify-center items-center min-w-[120px] px-4 py-2 bg-red-600 text-lg text-white rounded "
            onClick={handleSubmitEmail}
          >
            Get Started
            <IoIosArrowForward size={28} />
          </button>
        </form>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

      {/* section 1 */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col tablet:flex-row justify-center items-center max-w-6xl mx-auto ">
          {/* left side */}
          <div className="flex-1">
            <h2 className="text-4xl text-center tablet:text-5xl tablet:text-left font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg tablet:text-xl text-center tablet:text-left">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray player, and more.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative">
            <img src={tvImage} alt="" className="relative z-20" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

      {/* section 2 */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col-reverse tablet:flex-row justify-center items-center max-w-6xl mx-auto ">
          {/* left side */}
          <div className="flex-1">
            <div className="relative">
              <img src={strangerImageLg} alt="" />
              <div className="flex gap-[15px] items-center absolute bottom-5 left-1/2 -translate-x-1/2 h-24 w-[55%] bg-black border-2 border-gray-400 rounded-lg p-2">
                <img src={strangerImageSm} alt="" className="h-full" />
                <div>
                  <p className="text-white text-sm font-bold ">
                    Stranger Things
                  </p>
                  <span className="text-sm text-blue-500">Downloading...</span>
                </div>
                <img src={iconGif} alt="" className="ml-auto h-14" />
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="flex-1">
            <h2 className="text-4xl tablet:text-[48px] text-center tablet:text-left leading-tight font-extrabold text-balance mb-4">
              Download your shows to watch offline
            </h2>
            <p className="tablet:text-lg text-center tablet:text-left ">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

      {/* section 3 */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col tablet:flex-row justify-center items-center max-w-6xl mx-auto ">
          {/* left side */}
          <div className="flex-1">
            <h2 className="text-4xl text-center tablet:text-5xl tablet:text-left font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg tablet:text-xl text-center tablet:text-left">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative">
            <img src={deviceImage} alt="" className="relative z-20" />
            <video
              className="absolute top-[35%] left-[49%] h-[47%] -translate-x-1/2 -translate-y-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

      {/* section 4 */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col-reverse tablet:flex-row justify-center items-center max-w-6xl mx-auto ">
          {/* left side */}
          <div className="flex-1">
            <div className="relative">
              <img src={kidImage} alt="" />
            </div>
          </div>
          {/* right side */}
          <div className="flex-1">
            <h2 className="text-4xl tablet:text-[48px] text-center tablet:text-left leading-tight font-extrabold text-balance mb-4">
              Create profiles for kids
            </h2>
            <p className="tablet:text-lg text-center tablet:text-left ">
              Send kids on adventures with their favorite characters in a space
              made just for them--free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
