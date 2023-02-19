import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";
import "@uiw/codemirror-theme-sublime";
import axios from "axios";
import { baseUrl } from "../../../services/api";

const TextEditor = ({
  question,
  codeResult,
  setCodeResult,
  setToggle,
  setCounter,
  loading,
  setLoading,
}) => {
  //   const code = `/**\n* Do not change this function body\n* Do your changes within the function\n*/ \n\n/**
  //   * Do not change this function body
  //   * Do your changes within the function
  //   */
  //   `
  const code = `return function ${question?.functionPrototype}{
    // write your code here
  }`;
  const [writtenCode, setWrittenCode] = useState(code);
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = React.useCallback((value) => {
    setWrittenCode(value);
  }, []);

  useEffect(() => {
    if (isSubmit) {
      setLoading(true);
      const submit = setTimeout(() => {
        axios
          .post(`${baseUrl}/question/submit`, {
            questionId: question._id,
            code: writtenCode,
            userId: "63f20b0b887bdea9a39d4b2e",
          })
          .then((res) => {
            console.log(res.data);
            setCodeResult(res);
            setToggle(1);
            // setCounter((prevCount) => !prevCount);
            setLoading(false);
            setIsSubmit(false);
          });
      }, 2000);
      return () => clearTimeout(submit);
    }
  }, [isSubmit]);

  const handleSubmitCode = async () => {
    setIsSubmit(true);
    // setLoading(true);
    try {
      // let res;
      // res = await axios.post(`${baseUrl}/question/submit`, {
      //   questionId: question._id,
      //   code: writtenCode,
      //   userId: "63f20b0b887bdea9a39d4b2e",
      // });
      // setLoading(false);
      // setCodeResult(res);
      // setToggle(1);
      // setCounter((prevCount) => !prevCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CodeMirror
        height="500px"
        theme={darcula}
        value={code}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      <button className="submitButton" onClick={handleSubmitCode}>
        Submit
      </button>
    </>
  );
};

export default TextEditor;
