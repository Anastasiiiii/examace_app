import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/CardsFlip.css";
import "../styles/Formulas.css";
import icons from "../JsonFiles/icons.json";

const arrowIcon = icons.icons[4].src;

const CardsFlip = () => {
  const [flipped, setFlipped] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const getData = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("currentUser"));
      const currentUser = username.id;
      const res = await axios.get(
        `http://localhost:3001/getRandomWord/${currentUser}`
      );
      setWord(res.data.word);
      setDefinition(res.data.definition);
    } catch (err) {
      console.error("Error getting the data: ", err);
    }
  };

  const handleFlip = () => {
    if (!animated) {
      setFlipped(!flipped);
      setAnimated(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="centered-flex">
      <div className="flip-card custom-box" onClick={handleFlip}>
        <motion.div
          className="flip-card-inner"
          style={{ width: "100%", height: "100%" }}
          initial={false}
          animate={{ rotateY: flipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          onAnimationComplete={() => setAnimated(false)}
        >
          <div className="flip-card-front div-container-class">
            <p>
              {word}
              <img src={arrowIcon} onClick={getData} />
            </p>
          </div>
          <div className="flip-card-back div-container-class">
            <h1 className="h1-class">Definition</h1>
            <p style={{textDecoration: "underline"}}>{word}:</p>
            <p>{definition}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardsFlip;
