import React, { useState, useEffect } from "react";
import LevelCard from "./LevelCard";
import "../styles/Formulas.css";

const Levels = () => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const getCssVariableValue = (variableName) => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  };

  const passageText = ["1", "2", "3", "4"];
  const containersData = [
    {
      passage: passageText[0],
      color: getCssVariableValue("--blue-color"),
    },
    {
      passage: passageText[1],
      color: getCssVariableValue("--pink-color"),
    },
    {
      passage: passageText[2],
      color: getCssVariableValue("--yellow-color"),
    },
    {
        passage: passageText[3],
        color: getCssVariableValue("--blue-color"),
      },
  ];

  return (
    <div>
      <ul id="containers">
        {containersData.map((data, index) => (
          <LevelCard
            key={index}
            passage={data.passage}
            color={data.color}
          />
        ))}
      </ul>
    </div>
  );
};

export default Levels;
