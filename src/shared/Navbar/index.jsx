import React, { useState } from "react";
import "./styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../../components/Home/Login";
import Signup from "../../components/Home/Signup";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div className="navbar">
      <Login open={open} setOpen={setOpen} />
      <Signup open={signupOpen} setOpen={setSignupOpen} />
      <div className="splitWrapper">
        <p
          className="title"
          onClick={() => {
            navigate("/");
          }}
        >
          QuickCode
        </p>
      </div>
      <div className="splitWrapper">
        {pathname !== "/" && (
          <div className="items">
            <p
              className="itemText"
              onClick={() => {
                navigate("/problems");
              }}
            >
              Problems
            </p>
            <p className="itemText">Discuss</p>
            <p className="itemText">Contest</p>
          </div>
        )}
      </div>
      <div className="splitWrapper">
        {pathname === "/" && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              className="signupButton"
              onClick={() => {
                setSignupOpen(true);
              }}
            >
              Signup
            </button>
            <button
              className="newloginButton"
              onClick={() => {
                setOpen(true);
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
