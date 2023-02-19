import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./styles.css";

const Login = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setOpen(false);
    navigate("/problems");
  };
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="loginCard">
        <p className="loginHeading">Login to your account</p>
        <div>
          <p className="inputHeader">Email address</p>
          <input className="loginInput" placeholder="Email address" />
        </div>
        <div>
          <p className="inputHeader">Password</p>
          <input
            className="loginInput"
            placeholder="Password"
            type="password"
          />
        </div>
        <button className="loginButton" onClick={handleLogin}>
          Login
        </button>
        {/* <p className="bottomText">
          New here?{" "}
          <span
            className="extraText"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </span>
        </p> */}
      </div>
    </Modal>
  );
};

export default Login;
