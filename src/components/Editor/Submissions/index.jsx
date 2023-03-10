import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { baseUrl } from "../../../services/api";
import moment from "moment";

const Submissions = ({ counter, question, codeResult, loading }) => {
  const [submissions, setSubmissions] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${baseUrl}/user/get/all/submissions/63f20b0b887bdea9a39d4b2e`
      );
      console.log(res.data);
      setSubmissions(res?.data);
    };
    getData();
  }, []);

  return (
    <div className="submissionsWrapper">
      {codeResult?.status === 200 ? (
        <div className="submissionUpperWrapper">
          <CheckCircleIcon sx={{ color: "green" }} />
          <p className="acceptedText">Accepted</p>
        </div>
      ) : null}
      {codeResult?.status === 201 ? (
        <div className="submissionUpperWrapper">
          <CancelIcon sx={{ color: "crimson" }} />
          <p className="acceptedText wrong">Wrong answer</p>
        </div>
      ) : null}
      <div className="textWrapper">
        <p className="submissionText">All Submissions</p>
      </div>
      <div>
        {submissions?.reverse()?.map((data, idx) => (
          <div className="submissionUpperWrapper" key={idx}>
            {data.submission !== "Wrong Answer" ? (
              <div className="resultsWrapper">
                <div className="resultsInnerWrapper">
                  <CheckCircleIcon sx={{ color: "green" }} />
                  <p className="acceptedText">{data?.submission}</p>
                </div>
                <div>
                  <p className="submissionText">
                    {moment(data?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="resultsWrapper">
                <div className="resultsInnerWrapper">
                  <CancelIcon sx={{ color: "crimson" }} />
                  <p className="acceptedText wrong">Wrong answer</p>
                </div>
                <div>
                  <p className="submissionText">
                    {moment(data?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
