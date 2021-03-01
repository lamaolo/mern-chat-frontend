/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useEffect, useState } from "react";
import { UserContext } from "../context/globalState";
import openSocket from "socket.io-client";

import "../static/styles/ChatMessages.css";

const ChatMessages = ({ messages, setMessages, handleMessageSubmit, id }) => {
  const [state] = useContext(UserContext);
  const messagesContainer = useRef(null);
  const [messageValue, setMessageValue] = useState("");
  const [image, setImage] = useState("");

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
      messagesContainer.current.scrollTop = 50000;
    }
  }, [messages]);

  const handleTextChange = (e) => {
    setMessageValue(e.target.value);
    console.log(messageValue);
    console.log(image);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0].size < 512000) {
      setImage(e.target.files[0]);
    } else {
      alert("Error:\nEl tamaño máximo de la foto es de 512 kilobytes.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (messageValue !== "") {
      handleMessageSubmit(messageValue, image);
      setMessageValue("");
      setImage("");
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
            {message.file && (
              <img
                className="message-image"
                src={message.file}
                alt={message.name}
              />
            )}
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
        <label
          title="Subir una imagen"
          className="upload-photo"
          htmlFor="upload-photo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-image"
            viewBox="0 0 16 16"
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
          </svg>
        </label>
        <input
          onChange={handleImageChange}
          type="file"
          name="photo"
          id="upload-photo"
          hidden
          accept="image/png, image/jpeg, image/jpg, image/svg"
        />
        <button type="submit" title="Envíar mensaje">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default ChatMessages;
