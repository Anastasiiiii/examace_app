import React from "react";
import PropTypes from "prop-types";

const LevelCard = ({ passage, color, onClick }) => {
  return (
    <div
      className="level-containers"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <div className="level-passage">{passage}</div>
    </div>
  );
};

LevelCard.propTypes = {
  passage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

export default LevelCard;
