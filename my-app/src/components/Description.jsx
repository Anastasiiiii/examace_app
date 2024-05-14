import React from "react";
import "./Description.css";

const Description = ({ name, text, img, button }) => {
  return (
    <div className="description-container">
      <div className="description-content">
        <div className="text">
          <h1 className="name">{name}</h1>
          {text}
        </div>
        <img
          className="image"
          src={process.env.PUBLIC_URL + img}
          alt="Description"
        />
      </div>
      <div className="button-div">
        <button type="button" className="join-button">
          {button}
        </button>
      </div>
    </div>
  );
};

export default Description;
