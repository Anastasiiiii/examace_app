import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import Menu from "../components/Menu.jsx";
import Description from "../components/Description.jsx";
//import Carousel from "../components/Carousel.jsx";
import List from "../components/List.jsx";
import text from "../text.json";
import imgHeader from "../img_header.png";
import icons from "../icons.json";

const textDescription = text.text[0].text;
const buttonName = text.text[4].text;
const nightModeIcon = icons.icons[0].src;


const HomePage = () => {
  const location = useLocation();
  const description = textDescription;
  const trialExam = buttonName;
  const name = location.state.id;
  const nightModeIconSrc = nightModeIcon;
  const menuList = ["Home", "Information", "Contact"];
  const secondMenuList = [
    "Use of English",
    "Reading",
    "Vocabulary",
    "Grammar",
    "Test",
    "Library",
  ];

  return (
    <div className="App">
      <menu className="menu">
        <Menu list={menuList} img={nightModeIconSrc} />
      </menu>
      <header className="App-header">
        <Description name={"Hello, " + name + "!"} text={description} img={imgHeader} button={trialExam} />
      </header>
      <div className="second-menu">
        <List list={secondMenuList} />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default HomePage;
