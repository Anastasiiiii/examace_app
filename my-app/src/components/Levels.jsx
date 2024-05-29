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

  const colors = [
    getCssVariableValue("--blue-color"),
    getCssVariableValue("--pink-color"),
    getCssVariableValue("--yellow-color"),
  ]

  const levelsContainersData = Array.from({ length: 24}, (_, i) => ({
    passage: `${i + 1}`,
    color: colors[i % colors.length],
  }));
    
  return (
    <div>
      <ul id="levels-containers">
        {levelsContainersData.map((data, index) => (
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
