import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootswatch/dist/minty/bootstrap.min.css";
import { UserContextProvider } from "./context/globalState";

ReactDOM.render(
  <UserContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserContextProvider>,
  document.getElementById("root")
);
