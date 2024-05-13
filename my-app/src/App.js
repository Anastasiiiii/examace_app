import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './components/Menu.jsx';
import Description from './components/Description.jsx';
import List from './components/List.jsx';
import nightMode from './night-mode.png';
import imgHeader from './img_header.png';
import text from './text.json';


const textDescription = text.text[0].text;
const appName = text.text[1].text;
const joinUsText = text.text[2].text;

  //import iconData from './icons.json';

//const iconSrc = iconData.icons[0].src; // Accessing icon source correctly

function App() {
  const menuList = ["Home", "Information", "Contact"];
  const secondMenuList = ["Use of English", "Reading", "Vocabulary", "Grammar", "Test"]
  const description = textDescription;
  const name = appName;
  const joinUs = joinUsText;

  return (
    <div className="App">
      <menu className='menu'>
      <Menu list={menuList} img={nightMode} />
      </menu>
      <header className="App-header">
        <Description name={name} text={description} img={imgHeader} button={joinUs} />
      </header>
      <div className='second-menu'>
        <List list={secondMenuList} />
      </div>
    </div> 
  );
}

export default App;
