import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./styles.css";

const Signup = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
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
        <p className="loginHeading">Create your account</p>
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
        <div>
          <p className="inputHeader">Confirm Password</p>
          <input
            className="loginInput"
            placeholder="Confirm password"
            type="password"
          />
        </div>
        <button className="loginButton">Create your account</button>
        {/* <p className="bottomText">
          Already a user?
          <span
            className="extraText"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p> */}
      </div>
    </Modal>
  );
};

export default Signup;
