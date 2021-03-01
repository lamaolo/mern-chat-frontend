import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/globalState";

const ChatsList = ({ user, chats }) => {
  const [, dispatch] = useContext(UserContext);

  const handleJoinChat = (chat) => {
    dispatch({
      type: "JOIN_CHAT",
      payload: chat,
    });
  };

  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2>
            Lista de chats de <b>{user.name}</b>:
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-4">
          {chats.length ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ChatID</th>
                  <th scope="col">Usuarios participantes</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {chats.map((chat) => (
                  <tr key={chat._id} className="table-default">
                    <th scope="row">{chat._id}</th>
                    <td>
                      <ul>
                        {chat.users.map(({ _id, name }) => (
                          <li key={_id}>
                            <p>{name}</p>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <Link
                        onClick={() => handleJoinChat(chat)}
                        to={`/chat/${chat._id}`}
                      >
                        <button type="button" className="btn btn-primary">
                          Entrar al chat
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>
    </main>
  );
};

export default ChatsList;
