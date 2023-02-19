import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Home = () => {
  const navigate = useNavigate();
  const container = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets6.lottiefiles.com/packages/lf20_mlp3zxve.json",
    });
  }, []);

  return (
    <div className="homeWrapper">
      <Login open={open} setOpen={setOpen} />
      <div className="leftWrapper">
        <p className="homeTitle">Learn Coding & Programming</p>
        <p className="homeDesc">
          Hello there,
          <br />
          want ace your JavaScript Interview, <br />a simple platform to
          practice JavaScript questions.
        </p>
        <button
          className="exploreButton"
          onClick={() => {
            setOpen(true);
          }}
        >
          Explore Now
        </button>
      </div>
      <div className="rightWrapper">
        <div className="animation" ref={container}></div>
      </div>
    </div>
  );
};

export default Home;
