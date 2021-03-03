import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/globalState";

import LoginUserCard from "./LoginUserCard";

const NotLoggedScreen = () => {
  const [users, setUsers] = useState([]);
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    fetch("https://mern-chat-backend.herokuapp.com/user")
      .then((data) => {
        return data.json();
      })
      .then((users) => {
        setUsers(users.body);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogin = (user) => {
    dispatch({
      type: "USER_LOGIN",
      payload: user,
    });
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col-12 text-center my-5">
          <h2>Inicia sesión con un usuario</h2>
        </div>
      </div>
      <div className="row">
        {users.length ? (
          users.map((user) => (
            <LoginUserCard
              key={user._id}
              user={user}
              profilePic="https://www.palmkvistmaleri.se/wp-content/uploads/2018/02/default.jpg"
              handleLogin={handleLogin}
            />
          ))
        ) : (
          <div
            className="spinner-border"
            style={{ width: "70px", height: "70px" }}
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
        )}
      </div>
    </main>
  );
};

export default NotLoggedScreen;
