import React, { useState, useEffect } from "react";
import useLocalStorage from "../elements/useLocalStorage.js";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import "../styles/Formulas.css";
import Menu from "../components/Menu.jsx";
import Levels from "../components/Levels.jsx";
import ExamCard from "../components/ExamCard.jsx";


const TestPage = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || { id: "Guest" }
  );
  const [isDarkMode, setIsDarkMode] = useLocalStorage(false);
  const [taskBox, setTaskBox] = useState(false);
  const navigate = useNavigate();
  const menuList = ["Home", "Cards", "Reading", "Test"];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleTaskBox = () => {
    setTaskBox(!taskBox);
    console.log(localStorage)
    console.log(currentUser.id)
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

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
      <div>
        <h1 className="main-headline">Test:</h1>
        <div>
            <Levels onClick={toggleTaskBox} />
            {taskBox && (
                <div className="exam-card-levels">
                  <ExamCard onClick={toggleTaskBox} />
                </div>
             )}
            
        </div>
      </div>
    </div>
  );
};

export default TestPage;
