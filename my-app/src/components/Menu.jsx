import React from "react";
import "../styles/Menu.css";

const Menu = ({ list, img }) => {
  const menuItems = list.map((item, index) => (
    <li key={index}>
      <a>{item}</a>
    </li>
  ));

  return (
    <div>
      <ul className="menu">{menuItems}</ul>
      <img id="night-mode" src={img} />
    </div>
  );
};

export default Menu;
