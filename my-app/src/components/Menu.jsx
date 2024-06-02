import React from "react";
import "../styles/Menu.css";

const Menu = ({ list, onNavigate }) => {
  const menuItems = list.map((item, index) => (
    <li key={index}>
      <a
        onClick={() =>
          onNavigate(
            item === "Test"
              ? "/test"
              : item === "Home"
              ? "/home"
              : item === "ReadingPage"
              ? "/reading" 
              : item === "CardsPage" 
              ? "/cards" : `/${item.toLowerCase()}`
          )
        }
      >
        {item}
      </a>
    </li>
  ));

  return (
    <div>
      <ul className="menu">{menuItems}</ul>
    </div>
  );
};

export default Menu;
