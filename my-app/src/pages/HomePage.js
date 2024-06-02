import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import Menu from "../components/Menu.jsx";
import Description from "../components/Description.jsx";
import useLocalStorage from "../elements/useLocalStorage.js";
import List from "../components/List.jsx";
import text from "../text.json";
import imgHeaderLight from "../assets/img_header.png";
import imgHeaderDark from "../assets/img_header_dark_mode.png";
import GridChart from "../components/GridChart.jsx";

const textDescription = text.text[0].text;
const buttonName = text.text[4].text;

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(false);
  const location = useLocation();
  const navigate = useNavigate(); 
  const description = textDescription;
  const trialExam = buttonName;
  const title = "Your results:";
  const currentUser = location.state?.id
    ? { id: location.state.id }
    : JSON.parse(localStorage.getItem("currentUser")) || { id: "Guest" };

  useEffect(() => {
    if (currentUser.id !== "Guest") {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  const menuList = ["Home", "Cards", "Reading", "Test"];
  const secondMenuList = [
    "Use of English",
    "Reading",
    "Vocabulary",
    "Grammar",
    "Test",
    "Library",
  ];

  const headerImage = isDarkMode ? imgHeaderDark : imgHeaderLight;

  const handleNavigate = (path) => {
    navigate(path, { state: { id: currentUser.id } });
  };

  return (
    <div className="App" style={{ backgroundColor: "var(--background-color)" }}>
      <menu className="menu">
        <Menu list={menuList} onNavigate={handleNavigate} />
        <button className="mode-button" onClick={toggleDarkMode}>
          Dark mode
        </button>
      </menu>
      <header className="App-header">
        <Description
          name={"Hello, " + currentUser.id + "!"}
          text={description}
          img={headerImage}
          button={trialExam}
        />
      </header>
      <div className="second-menu">
        <List list={secondMenuList} />
      </div>
      <div>
        <GridChart title = {title}/>
      </div>
    </div>
  );
};

export default HomePage;
