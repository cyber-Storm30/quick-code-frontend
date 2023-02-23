import React from "react";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../redux/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ProfileCard = () => {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="cardWrapper">
      <button className="logoutWrapper" onClick={handleLogout}>
        <LogoutIcon style={{ color: "crimson" }} />
        <p className="logoutText">Log out</p>
      </button>
      <div className="cardLeft">
        <div className="cardUserImageWrapper">
          <img
            className="cardUserImage"
            src="https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png"
          />
        </div>
        <div className="cardUserDetails">
          <p className="cardUserName">{user?.name}</p>
          <p className="cardSecondatyText">Questions attempted</p>
        </div>
      </div>

      <div className="cardRight"></div>
    </div>
  );
};

export default ProfileCard;
