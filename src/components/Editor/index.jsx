import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../services/api";
import { useParams } from "react-router-dom";
import Description from "./Description";
import Submissions from "./Submissions";
import "./styles.css";
import TextEditor from "./TextEditor";
import Loader from "./Loader";
import ReplayIcon from "@mui/icons-material/Replay";
import Instruction from "./Instructions";
import { CircularProgress } from "@mui/material";

const Editor = () => {
  const [question, setQuestion] = useState();
  const [toggle, setToggle] = useState(0);
  const [codeResult, setCodeResult] = useState();
  const [counter, setCounter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instructionModalOpen, setInstructionModalOpen] = useState();
  const questionId = useParams();

  const [writtenCode, setWrittenCode] = useState();

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseUrl}/question/get/${questionId.id}`
      );
      console.log(data);
      setQuestion(data);
      setLoading(false);
      setWrittenCode(data.functionPrototype);
    } catch (err) {
      setLoading(false);
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
      {loading ? (
        <div style={{ position: "absolute", top: "43%", left: "50%" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Instruction
            open={instructionModalOpen}
            setOpen={setInstructionModalOpen}
          />
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
              <button
                className="tabRightButton"
                onClick={() => {
                  setInstructionModalOpen(true);
                }}
              >
                Need Help? Click here
              </button>
              <button
                className="tabRightButton"
                onClick={() => {
                  setWrittenCode(question?.functionPrototype);
                }}
              >
                <ReplayIcon />
                <p>Reset Code</p>
              </button>
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
              writtenCode={writtenCode}
              setWrittenCode={setWrittenCode}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Editor;
