import React, { useContext } from "react";
import { UserContext } from "../context/globalState";
import { Link } from "react-router-dom";

const Header = () => {
  const [state, dispatch] = useContext(UserContext);

  const handleLogout = () => {
    dispatch({
      type: "USER_LOGOUT",
      payload: false,
    });
  };

  return (
    <header>
      <nav className="navbar py-3 navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand font-weight-bold" to="/">
            MERN Chat
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarColor01"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item font-weight-bold">
                {state.isLogged ? (
                  <div className="dropdown">
                    <button
                      className="nav-link btn active dropdown-toggle"
                      type="button"
                      href="/#"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <b>{state.user.name}</b>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          href="/#"
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          Cerrar sesión
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <a href="/#" className="nav-link active">
                    Iniciar sesión
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
