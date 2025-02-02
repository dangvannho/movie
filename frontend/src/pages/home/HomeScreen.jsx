import Header from "~/components/Header";

const HomeScreen = ({ user }) => {
  return (
    <div>
      <Header user={user} />
    </div>
  );
};

export default HomeScreen;
