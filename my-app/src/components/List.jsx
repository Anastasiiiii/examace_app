import React from "react";
import "../styles/List.css";

const List = ({ list }) => {
  const menuItems = list.map((item, index) => (
    <li key={index}>
      <a>{item}</a>
    </li>
  ));

  return (
    <div>
      <ul className="list">{menuItems}</ul>
    </div>
  );
};

export default List;
