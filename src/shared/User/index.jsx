import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth";

const User = () => {
  //   const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logout());
    navigate("/profile");
  };

  return (
    <div className="userWrapper">
      <div className="userContainer" onClick={handleLogout}>
        <img
          className="userImage"
          src="https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png"
        />
      </div>
    </div>
  );
};

export default User;
