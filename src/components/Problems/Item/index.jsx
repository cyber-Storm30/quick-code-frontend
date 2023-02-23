import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Item = ({
  index,
  id,
  title,
  difficulty,
  practiced,
  lastItem,
  attemptedBy,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/editor/${id}`);
  };
  return (
    <div className={`itemWrapper ${lastItem === true && "last"}`}>
      <div className="slNo">{index}</div>
      <div className="problemTitle" onClick={handleClick}>
        {title}
      </div>
      <div
        className={`difficulty ${difficulty === "Easy" && "easy"} ${
          difficulty === "Medium" && "medium"
        } ${difficulty === "Hard" && "hard"}`}
      >
        {difficulty}
      </div>
      <div className="practiced">{practiced}</div>
    </div>
  );
};

export default Item;
