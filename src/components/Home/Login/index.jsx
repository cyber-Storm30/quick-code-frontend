import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import { baseUrl } from "../../../services/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/auth";
import { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsEmailConfirmed(false);
    setIsForgotPassword(false);
    setSuccess(false);
    setOpen(false);
  };

  const handleBackToLogin = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setLoading(false);
    setIsEmailConfirmed(false);
    setIsForgotPassword(false);
    setSuccess(false);
  };

  useEffect(() => {
    return () => {
      setLoginError("");
      setLoading("");
    };
  }, [open]);

  const handleLogin = async () => {
    setLoading(true);
    if (email && password) {
      try {
        const { data } = await axios.post(`${baseUrl}/user/login`, {
          email,
          password,
        });
        console.log(data);
        setPassword("");
        setEmail("");
        if (data.status === 200) {
          dispatch(setUser(data.data));
          handleClose();
          setLoading(false);
          navigate("/problems");
        } else {
          setLoginError(data.message);
          setLoading(false);
        }
      } catch (err) {
        setLoginError("Some unknown error occured, try again later");
        setLoading(false);
      }
    } else {
      alert("Fill the fields before loging in");
      setLoading(false);
    }
  };

  const handleConfirmEmail = async () => {
    if (!email) {
      alert("Enter your email first");
    } else {
      try {
        const res = await axios.post(`${baseUrl}/user/verify`, {
          email,
        });
        console.log(res);
        if (res.data === true) {
          setIsEmailConfirmed(true);
        } else {
          setEmailError("Email id is not registered");
        }
      } catch (err) {
        console.log(err);
        setEmailError("Some unknown error occured");
      }
    }
  };

  const updatePassword = async () => {
    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords does not match");
      } else {
        try {
          const res = await axios.post(`${baseUrl}/user/forgot/password`, {
            password,
          });
          console.log(res);
          if (res.status === 200) {
            setSuccess(true);
          } else {
            setPasswordError("Some unknown error occured. Try again later");
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Fill all the fields first");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {!isForgotPassword ? (
        <div className="loginCard">
          <p className="loginHeading">Login to your account</p>
          <div className="inputWrapper">
            <p className="inputHeader">Email address</p>
            <input
              className="loginInput"
              value={email}
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
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
            <p
              className="forgotPasswordText"
              onClick={() => {
                setIsForgotPassword(true);
              }}
            >
              Forgot Password?
            </p>
            {loginError && <p className="errorMessage">{loginError}</p>}
          </div>

          <button className="loginButton" onClick={handleLogin}>
            {loading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              <p>Login</p>
            )}
          </button>
        </div>
      ) : (
        <div className="loginCard">
          {!isEmailConfirmed ? (
            <>
              <p className="loginHeading">Forgot Password</p>
              <div className="inputWrapper">
                <p className="inputHeader">Email address</p>
                <input
                  className="loginInput"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              {emailError && <p className="errorMessage">{emailError}</p>}
              <button className="loginButton" onClick={handleConfirmEmail}>
                {loading ? (
                  <CircularProgress color="inherit" size={30} />
                ) : (
                  <p>Verify Email</p>
                )}
              </button>
            </>
          ) : (
            <>
              {!success ? (
                <>
                  <p className="loginHeading">Change your password</p>
                  <div className="inputWrapper">
                    <p className="inputHeader">New Password</p>
                    <input
                      className="loginInput"
                      placeholder="Password"
                      value={newPassword}
                      type="password"
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="inputWrapper">
                    <p className="inputHeader">Confirm Password</p>
                    <input
                      className="loginInput"
                      value={confirmPassword}
                      placeholder="Password"
                      type="password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    {passwordError && (
                      <p className="errorMessage">{passwordError}</p>
                    )}
                  </div>
                  <button className="loginButton" onClick={updatePassword}>
                    {loading ? (
                      <CircularProgress color="inherit" size={30} />
                    ) : (
                      <p>Save Password</p>
                    )}
                  </button>
                </>
              ) : (
                <div>
                  <p className="loginHeading">Password Succesfully updated</p>
                  <button className="loginButton" onClick={handleBackToLogin}>
                    Back to login
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Login;
