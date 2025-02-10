import { useContext, useState, useEffect } from "react";
import { LuLoader } from "react-icons/lu";

import { AuthContext } from "~/context/authContext";
import checkAuth from "~/services/auth/checkAuth";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await checkAuth();
    if (res.EC === 1) {
      setUser(res.user);
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <LuLoader className="animate-spin text-red-600" size={30} />
      </div>
    );
  }
  return <> {user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
