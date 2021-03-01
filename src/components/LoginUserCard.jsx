import React from "react";

const LoginUserCard = ({ user, profilePic = "", handleLogin }) => {
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
      <div style={{ width: "300px", margin: "20px 0" }} className="card">
        <img src={profilePic} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <button onClick={() => handleLogin(user)} className="btn btn-primary">
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUserCard;
