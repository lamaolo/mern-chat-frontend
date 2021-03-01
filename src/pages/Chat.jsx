/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/globalState";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import ChatMessages from "../components/ChatMessages";

const Chat = (props) => {
  const [state] = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const id = props.match.params.id;

  if (!state.isLogged) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    fetch("http://localhost:8080/message/" + id)
      .then((data) => data.json())
      .then((data) => {
        setMessages(data.body);
      });
  }, []);

  const handleMessageSubmit = async (messageValue, image) => {
    console.log("message: ", messageValue);
    console.log("image: ", image);

    if (image) {
      let formData = new FormData();
      formData.append("user", state.user._id);
      formData.append("chat", id);
      formData.append("message", messageValue);
      formData.append("file", image);

      try {
        await axios.post("http://localhost:8080/message", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // Hago POST a la API para crear un nuevo mensaje en la base de datos,
        // Automáticamente cuando se crea un mensaje, también se emite por WebSocket
        await axios.post("http://localhost:8080/message", {
          message: messageValue,
          user: state.user._id,
          chat: id,
          file: image,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="container">
      <div className="row mt-5 mb-3">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Lista de chats</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Chat actual
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="row">
            <div className="col-12">
              <h2 className="font-weight-bold">Chat</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12 my-3 mt-md-0">
              <ChatMessages
                messages={messages}
                setMessages={setMessages}
                handleMessageSubmit={handleMessageSubmit}
                id={id}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-12 mt-4 mb-2 mt-md-0 mb-md-0">
              <h2 className="font-weight-bold">Usuarios</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-4 mb-md-0">
              <div className="list-group">
                <div className="list-group-item list-group-item-action active font-weight-bold">
                  Usuarios en este chat
                </div>
                {state.currentChat.users.map((user) => (
                  <div
                    key={user._id}
                    className="list-group-item list-group-item"
                  >
                    {user.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chat;

/*
  <div className="row mb-3">
        <div className="col-12 col-md-8">
          <h2 className="font-weight-bold">Chat</h2>
        </div>
        <div className="col-12 col-md-4">
          <h2 className="font-weight-bold">Usuarios</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8">
          <ChatMessages
            messages={messages}
            setMessages={setMessages}
            handleMessageSubmit={handleMessageSubmit}
            id={id}
          />
        </div>
        <div className="col-12 col-md-4">
          <div className="list-group">
            <div className="list-group-item list-group-item-action active font-weight-bold">
              Usuarios en este chat
            </div>
            {state.currentChat.users.map((user) => (
              <div key={user._id} className="list-group-item list-group-item">
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </div>
*/
