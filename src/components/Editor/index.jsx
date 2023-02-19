import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../services/api";
import { useParams } from "react-router-dom";
import Description from "./Description";
import Submissions from "./Submissions";
import "./styles.css";
import TextEditor from "./TextEditor";
import Loader from "./Loader";

const Editor = () => {
  const [question, setQuestion] = useState();
  const [toggle, setToggle] = useState(0);
  const [codeResult, setCodeResult] = useState();
  const [counter, setCounter] = useState(false);
  const [loading, setLoading] = useState(false);
  const questionId = useParams();

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/question/get/${questionId.id}`
      );
      setQuestion(data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderPage = () => {
    if (toggle === 0) {
      return <Description question={question} />;
    } else {
      return (
        <Submissions
          counter={counter}
          setCounter={setCounter}
          question={question}
          codeResult={codeResult}
          setCodeResult={setCodeResult}
          loading={loading}
          setLoading={setLoading}
        />
      );
    }
  };

  return (
    <div className="editor">
      <Loader open={loading} />
      <div className="leftContainer">
        <div className="editorTab">
          <div
            className={toggle === 0 ? "tabButton active" : "tabButton"}
            onClick={() => {
              setToggle(0);
            }}
          >
            Description
          </div>
          <div
            className={toggle === 1 ? "tabButton active" : "tabButton"}
            onClick={() => {
              setToggle(1);
            }}
          >
            Submissions
          </div>
        </div>
        {renderPage()}
      </div>
      <div className="rightContainer">
        <div className="tab">
          <div className="tabRightButton">Instructions</div>
          <div className="tabRightButton"> Reset</div>
        </div>
        <TextEditor
          question={question}
          codeResult={codeResult}
          setCodeResult={setCodeResult}
          setToggle={setToggle}
          counter={counter}
          setCounter={setCounter}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default Editor;
