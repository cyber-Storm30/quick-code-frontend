import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import "./styles.css";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../../services/api";
import { setUser } from "../../../redux/auth";
import CircularProgress from "@mui/material/CircularProgress";

const Signup = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setEmailError("");
      setPasswordError("");
      setLoading(false);
    };
  }, [email, open]);

  const [disable, setDisable] = useState(true);

  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  const handleSignup = async () => {
    setLoading(true);
    if (name && email && password && confirmPasword) {
      try {
        if (confirmPasword === password) {
          const res = await axios.post(`${baseUrl}/user/signup`, {
            name,
            email,
            password,
          });
          console.log(res);
          if (res.data.status === 201) {
            setLoading(false);
            dispatch(setUser(res.data.data));
            handleClose();
            navigate("/problems");
          } else if (res.data.status === 400) {
            setEmailError(res.data.message);
          }
        } else {
          setPasswordError("Passwords does not match");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      alert("Fill the fields before signing in");
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="loginCard">
        <p className="loginHeading">Create your account</p>
        <div className="inputWrapper">
          <p className="inputHeader">Username</p>
          <input
            className="loginInput"
            placeholder="Username"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="inputWrapper">
          <p className="inputHeader">Email address</p>
          <input
            className="loginInput"
            placeholder="Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError && <p className="errorMessage">{emailError}</p>}
        </div>
        <div className="inputWrapper">
          <p className="inputHeader">Password</p>
          <input
            className="loginInput"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="inputWrapper">
          <p className="inputHeader">Confirm Password</p>
          <input
            className="loginInput"
            placeholder="Confirm password"
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {passwordError && <p className="errorMessage">{passwordError}</p>}
        </div>
        <button
          className="loginButton"
          onClick={handleSignup}
          // disabled={disable}
        >
          {loading ? (
            <CircularProgress color="inherit" size={30} />
          ) : (
            <p>Create your account</p>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default Signup;
