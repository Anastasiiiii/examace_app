import React, { useState, useEffect } from "react";
import useLocalStorage from "../elements/useLocalStorage.js";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import "../styles/Formulas.css";
import Description from "../components/Description.jsx";
import imgHeaderLight from "../assets/img_header.png";
import imgHeaderDark from "../assets/img_header_dark_mode.png";
import text from "../JsonFiles/text.json";
import FileUpload from "../components/FileUpload.jsx";
import List from "../components/List.jsx";

const textDescription = text.text[0].text;

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || { id: "Guest" }
  );
  const [isDarkMode, setIsDarkMode] = useLocalStorage(false);
  const navigate = useNavigate();
  const description = textDescription;
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

  const headerImage = isDarkMode ? imgHeaderDark : imgHeaderLight;
  const secondMenuList = [
    "Use of English",
    "Reading",
    "Vocabulary",
    "Grammar",
    "Test",
    "Library",
  ];
  const buttonName = "Upload file"
  const linkToUploadFile = () => {
    navigate('/uploadTheFile');
  }
  return (
    <div className="App" style={{ backgroundColor: "var(--background-color)" }}>
      <menu className="menu">
        <button className="mode-button" onClick={toggleDarkMode}>
          Dark mode
        </button>
      </menu>
      <header className="App-header">
        <Description
          name={"Hello, admin!"}
          text={description}
          img={headerImage}
          button={buttonName}
        />
      </header>
      <div className="second-menu">
        <List list={secondMenuList} />
      </div>
      <div>
        <FileUpload />
      </div>
    </div>
  );
};

export default AdminPage;
