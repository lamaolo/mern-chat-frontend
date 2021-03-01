/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useEffect, useState } from "react";
import { UserContext } from "../context/globalState";
import openSocket from "socket.io-client";

import "../static/styles/ChatMessages.css";

const ChatMessages = ({ messages, setMessages, handleMessageSubmit, id }) => {
  const [state] = useContext(UserContext);
  const messagesContainer = useRef(null);
  const [messageValue, setMessageValue] = useState("");

  const socket = openSocket("http://localhost:8080");

  useEffect(() => {
    // DEsde el Backend, cada vez que agrego un nuevo mensaje por REST, el socket emite el mismo mensaje
    socket.on("message", (data) => {
      if (data[0].chat === id) {
        setMessages((oldMmessages) => [...oldMmessages, data[0]]);
      }
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (messagesContainer.current) {
      // Hacer que siempre se vea la parte de abajo del chat
      messagesContainer.current.scrollTop = 10000;
    }
  }, [messages]);

  const handleTextChange = (e) => {
    setMessageValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (messageValue !== "") {
      handleMessageSubmit(messageValue);
      setMessageValue("");
    }
  };

  return (
    <section className="list-group">
      <div
        ref={messagesContainer}
        className="messages-container list-group-item list-group-item"
      >
        {messages.map((message) => (
          <article
            className={
              message.user._id === state.user._id ? "message own" : "message"
            }
            key={message._id}
          >
            <p className="message-user">{message.user.name}</p>
            <p className="message-content">{message.message}</p>
            {message.file && <img src={message.file} alt={message.name} />}
          </article>
        ))}
      </div>
      <form onSubmit={onSubmit} className="write-message">
        <input
          value={messageValue}
          onChange={handleTextChange}
          type="text"
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" title="Envíar mensaje">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default ChatMessages;
