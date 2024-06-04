import React from "react";
import Quiz from "./Quiz";

const ExamCard = ({ onClick }) => {
  return (
    <div className="exam-card">
      <Quiz onClick={onClick} />
    </div>
  );
};

export default ExamCard;
