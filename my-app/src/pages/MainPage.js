import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../elements/useLocalStorage.js";
import "../styles/MainPage.css";
import "../styles/Formulas.css";
import Menu from "../components/Menu.jsx";
import Description from "../components/Description.jsx";
import List from "../components/List.jsx";
import Containers from "../components/Containers.jsx";
import FormContainer from "../components/FormContainer.jsx";
import imgHeaderLight from "../assets/img_header.png";
import imgHeaderDark from "../assets/img_header_dark_mode.png";
import text from "../JsonFiles/text.json";
import icons from "../JsonFiles/icons.json";

const textDescription = text.text[0].text;
const appName = text.text[1].text;
const joinUsText = text.text[2].text;

const arrowIcon = icons.icons[4].src;
const arrowDownIcon = icons.icons[5].src;

function MainPage() {
  const navigate = useNavigate();
  const [formBox, setFormBox] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage(false);

  const toggleFormBox = () => {
    setFormBox(!formBox);
  };

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

  const menuList = ["Home", "Information", "Contact"];
  const secondMenuList = [
    "Use of English",
    "Reading",
    "Vocabulary",
    "Grammar",
    "Test",
    "Library",
  ];

  const joinUs = (
    <span>
      {joinUsText}
      <img
        src={formBox ? arrowDownIcon : arrowIcon}
        alt="Arrow"
        style={{ verticalAlign: "middle", marginLeft: "5px" }}
      />
    </span>
  );
  const headerImage = isDarkMode ? imgHeaderDark : imgHeaderLight;

  const handleNavigate = (path) => {
    navigate(path, { state: { id: "Guest"} });
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
          name={appName}
          text={textDescription}
          img={headerImage}
          button={joinUs}
          onClickJoinButton={toggleFormBox}
        />
      </header>
      <div className="second-menu">
        <List list={secondMenuList} />
      </div>
      {formBox && (
        <div id="sign-up">
          <FormContainer />
        </div>
      )}
      <div className="headline-block">
        <h1 className="block-headline">
          Ace your English exam with our app online!
        </h1>
      </div>
      <div className="App">
        <Containers />
      </div>
      <div
        className="second-menu"
        style={{ paddingTop: "20px", paddingLeft: "45%" }}
      >
        @anastasiii
      </div>
    </div>
  );
}

export default MainPage;
