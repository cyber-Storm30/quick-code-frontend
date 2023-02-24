import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import Item from "./Item";
import "./styles.css";
import { useSelector } from "react-redux";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CircularProgress from "@mui/material/CircularProgress";

const Problems = () => {
  const [questions, setQuestions] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/question/get/all`);
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="problemWrapper">
      {!loading ? (
        <>
          <Item
            index="#"
            title="Problems"
            difficulty="Difficulty"
            practiced="Practiced"
          />
          {questions?.map((data, idx) => (
            <Item
              key={idx}
              index={idx + 1}
              id={data._id}
              title={data.title}
              difficulty={data.tags[0]}
              lastItem={idx + 1 === questions.length}
              practiced={
                data.attemptedBy.includes(user._id) && (
                  <DoneAllIcon sx={{ color: "#0E86D4" }} />
                )
              }
            />
          ))}
        </>
      ) : (
        <div style={{ position: "absolute", top: "43%", left: "50%" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Problems;
