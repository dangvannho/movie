import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
const HomePage = () => {
  const user = false;

  return <> {user ? <HomeScreen user={user} /> : <AuthScreen user={user} />}</>;
};

export default HomePage;
