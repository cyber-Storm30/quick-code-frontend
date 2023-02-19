import React, { useState, useEffect } from "react";
import "./styles.css";

const Description = ({ question, codeResult, setCodeResult }) => {
  return (
    <div className="wrapper">
      <p className="title">{question?.title}</p>
      <div className="tagWrapper">
        {question?.tags?.map((data, idx) => (
          <div className="tags" key={idx}>
            {data}
          </div>
        ))}
      </div>
      <div className="desc">{question?.desc}</div>
      <div className="examples">
        {question?.examples.map((data, idx) => (
          <div className="exampleContainer" key={idx}>
            <p className="exampleTitle">{data?.name}</p>
            {data?.exampleTexts?.map((data, idx) => (
              <p key={idx} className="exampleTexts">
                {data}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="desc">{question?.note}</div>
    </div>
  );
};

export default Description;
