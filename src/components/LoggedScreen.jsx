import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/globalState";

import ChatsList from "./ChatsList";

const LoggedScreen = () => {
  const [state] = useContext(UserContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Este endpoint devuelve los chats en los que participa el usuario con el _id especificado.
    fetch("https://mern-chat-backend.herokuapp.com/chat/" + state.user._id)
      .then((response) => response.json())
      .then((data) => setChats(data.body))
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ChatsList chats={chats} user={state.user} />;
};

export default LoggedScreen;
