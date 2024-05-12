import React from 'react';
import './App.css';
import Menu from './components/Menu.jsx';
import nightmode from './night-mode.png' 

function App() {
  // Define the list of menu items
  const menuList = ["Home", "Information", "Contact us"];

  return (
    <div className="App">
      <header className="App-header">
        {React.createElement(Menu, { list: menuList, img: nightmode })}
      </header>
    </div> 
  );
}

export default App;
