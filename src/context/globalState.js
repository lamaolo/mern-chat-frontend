import React, { useReducer, createContext } from "react";
import reducer from "./reducers";

export const UserContext = createContext();

const initialState = {
  user: {},
  currentChat: {},
  isLogged: false,
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
