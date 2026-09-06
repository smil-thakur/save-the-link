import { useAuth } from "../../context/authContext";

const HomeScreen = () => {
  const { user } = useAuth();

  return <h1>{user?.username}</h1>;
};

export default HomeScreen;
