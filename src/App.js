import React, { useEffect } from "react";
import Home from "./components/Home";
import Editor from "./components/Editor";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./shared/Navbar";
import Problems from "./components/Problems";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/editor/:id" element={<Editor />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
