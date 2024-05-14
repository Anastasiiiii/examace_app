import React from "react";
//import './Containers.css';
import Cards from './Cards';
import text from '../text.json';

const passageText = text.text[3].text;

const Containers = () => {

    const bookIcon = "/icons/book-icon.png";
    const listIcon = "/icons/list-icon.png";
    const searchIcon = "/icons/search-icon.png";
    const arrowIcon = "/icons/arrow-icon.png";

    const containersData = [
        {
          icon: bookIcon,
          icon2: arrowIcon,
          passage: passageText,
          color: "#9BD3D0"
        },
        {
          icon: listIcon,
          icon2: arrowIcon,
          passage: passageText,
          color: "#FECCB5"
        },
        {
          icon: searchIcon,
          icon2: arrowIcon,
          passage: passageText,
          color: "#FEC447"
        }
      ];

    return (
        <div>
            <ul id="containers">
        <Cards
          icon={containersData[0].icon}
          icon2={containersData[0].icon2}
          passage={containersData[0].passage}
          color={containersData[0].color} 
        ></Cards>
        <Cards
          icon={containersData[1].icon}
          icon2={containersData[1].icon2}
          passage={containersData[1].passage}
          color={containersData[1].color} 
        ></Cards>
        <Cards
          icon={containersData[2].icon}
          icon2={containersData[2].icon2}
          passage={containersData[2].passage}
          color={containersData[2].color} 
        ></Cards>
      </ul>
        </div>
    )
}

export default Containers;