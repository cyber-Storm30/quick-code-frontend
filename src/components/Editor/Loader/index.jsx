import React, { useEffect, useState, useRef } from "react";
import { Modal } from "@mui/material";
import lottie from "lottie-web";
import LinearProgress from "@mui/material/LinearProgress";
import "./styles.css";

const Loader = ({ open }) => {
  const container = useRef(null);
  //   useEffect(() => {
  //     lottie.loadAnimation({
  //       container: container.current,
  //       renderer: "svg",
  //       loop: true,
  //       autoplay: true,
  //       path: "https://assets10.lottiefiles.com/packages/lf20_io5ZKsAQwu.json",
  //     });
  //   });
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="loaderWrapper">
        <LinearProgress
          sx={{ height: "8px", width: "500px", borderRadius: "50px" }}
        />
      </div>
      {/* <div className="loadingAnimation" ref={container}></div> */}
      {/* <iframe src="https://embed.lottiefiles.com/animation/136644"></iframe> */}
      {/* </div> */}
    </Modal>
  );
};

export default Loader;
