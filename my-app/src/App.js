import React, { useState } from "react";
import "./App.css";
import Menu from "./components/Menu.jsx";
import Description from "./components/Description.jsx";
import List from "./components/List.jsx";
import Containers from "./components/Containers.jsx";
import FormContainer from "./components/FormContainer.jsx";
import imgHeader from "./img_header.png";
import text from "./text.json";
import icons from "./icons.json";

const textDescription = text.text[0].text;
const appName = text.text[1].text;
const joinUsText = text.text[2].text;

const nightModeIcon = icons.icons[0].src;
const arrowIcon = icons.icons[4].src;
const arrowDownIcon = icons.icons[5].src;

function App() {
  const [formBox, setFormBox] = useState(false);
  const menuList = ["Home", "Information", "Contact"];

  const toggleFormBox = () => {
    setFormBox(!formBox);
  };

  const secondMenuList = [
    "Use of English",
    "Reading",
    "Vocabulary",
    "Grammar",
    "Test",
  ];
  const description = textDescription;
  const name = appName;
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

  const nightModeIconSrc = nightModeIcon;

  return (
    <div className="App">
      <menu className="menu">
        <Menu list={menuList} img={nightModeIconSrc} />
      </menu>
      <header className="App-header">
        <Description
          name={name}
          text={description}
          img={imgHeader}
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
      <div className="second-menu" style={{ paddingTop: "20px" }}>
        @anastasiii
      </div>
    </div>
  );
}

export default App;
