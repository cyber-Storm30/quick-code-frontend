import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import "./styles.css";

const Problems = () => {
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/question/get/all`);
      setQuestions(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="problemWrapper">
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
        />
      ))}
    </div>
  );
};

export default Problems;
