import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./styles.css";

const Instruction = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="instructionWrapper">
        <h3 className="instructionTitle">Instructions</h3>
        <p className="instructionText">
          1. You dont have to take any inputs. Just complete the function and
          submit your code
        </p>
        <p className="instructionText">
          2.If the page becomes unresponsive due to recursive calls then reload
          it
        </p>
        <p className="instructionText">
          3.If you face any issue or spot a bug feel free to mail be at
          writetorm.26@gmail.com
        </p>
      </div>
    </Modal>
  );
};

export default Instruction;
