import React from "react";
import "./Cards.css";

const Cards = ({ icon, icon2, passage, color }) => {
  return (
    <div>
      <div className="containers" style={{ backgroundColor: color }}>
        <img className="container-icon" src={process.env.PUBLIC_URL + icon} />
        <div className="passage">{passage}</div>
      </div>
    </div>
  );
};

export default Cards;
