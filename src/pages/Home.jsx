import React, { useContext } from "react";
import NotLoggedScreen from "../components/NotLoggedScreen";
import LoggedScreen from "../components/LoggedScreen";

import { UserContext } from "../context/globalState";

function Home() {
  const [state] = useContext(UserContext);

  return state.isLogged ? <LoggedScreen /> : <NotLoggedScreen />;
}

export default Home;
