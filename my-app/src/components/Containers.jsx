import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import text from "../JsonFiles/text.json";
import "../styles/Formulas.css";

const passageText = text.text[4].text;
const passageText2 = text.text[5].text;
const passageText3 = text.text[6].text;

const Containers = () => {
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

  const bookIcon = "/icons/book-icon.png";
  const listIcon = "/icons/list-icon.png";
  const searchIcon = "/icons/search-icon.png";
  const arrowIcon = "/icons/arrow-icon.png";

  const containersData = [
    {
      icon: bookIcon,
      icon2: arrowIcon,
      passage: passageText,
      color: getCssVariableValue("--blue-color"),
    },
    {
      icon: listIcon,
      icon2: arrowIcon,
      passage: passageText2,
      color: getCssVariableValue("--pink-color"),
    },
    {
      icon: searchIcon,
      icon2: arrowIcon,
      passage: passageText3,
      color: getCssVariableValue("--yellow-color"),
    },
  ];

  return (
    <div>
      <ul id="containers">
        {containersData.map((data, index) => (
          <Cards
            key={index}
            icon={data.icon}
            icon2={data.icon2}
            passage={data.passage}
            color={data.color}
          />
        ))}
      </ul>
    </div>
  );
};

export default Containers;
