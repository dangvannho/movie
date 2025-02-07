import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import routeConfig from "~/config/routeConfig";
import logo from "~/assets/images/netflix-logo.png";
import register from "~/services/auth/register";

const SignUpPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = await register(email, password, username);
    if (res.EC === 1) {
      toast.success(res.EM);
      navigate(routeConfig.login);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="h-screen hero-bg">
      <header className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to={routeConfig.home}>
          <img className="w-20 tablet:w-52" src={logo} alt="" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20">
        <div className="max-w-sm tablet:max-w-md w-full p-8 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-2xl text-white font-bold mb-4 text-center">
            Sign Up
          </h1>
          <form className="mt-4">
            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-3 bg-transparent rounded-md text-white border border-gray-700 outline-none"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* username */}
            <div className="mt-4">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-3 bg-transparent rounded-md text-white border border-gray-700 outline-none"
                placeholder="johndoe"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* password */}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-3 bg-transparent rounded-md text-white border border-gray-700 outline-none"
                placeholder="******"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full mt-4 py-2 text-center bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>

          <div className="mt-5 text-gray-400 text-center">
            Already a member?{" "}
            <Link
              to={routeConfig.login}
              className="text-red-500 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
