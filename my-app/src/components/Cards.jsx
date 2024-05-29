import React from "react";
import PropTypes from "prop-types";

const Cards = ({ icon, passage, color }) => {
  return (
    <div>
      <div className="containers" style={{ backgroundColor: color }}>
        <img
          className="container-icon"
          src={process.env.PUBLIC_URL + icon}
          alt="Icon"
        />
        <div className="passage">{passage}</div>
      </div>
    </div>
  );
};

Cards.propTypes = {
  icon: PropTypes.string.isRequired,
  icon2: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Cards;
