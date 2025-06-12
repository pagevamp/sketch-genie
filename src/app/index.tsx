import { Redirect } from "expo-router";
import { useIsUserLoggedIn } from "@io/store";

const Home = () => {
  const isLoggedIn = useIsUserLoggedIn();

  return isLoggedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)" />;
};

export default Home;
