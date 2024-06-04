import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/Formulas.css";
import "../styles/Dictionary.css";
import icons from "../JsonFiles/icons.json";
const trashCan = icons.icons[8].src;

const Dictionary = () => {
  const [word, setWord] = useState([]);
  const [definition, setDefinition] = useState([]);

  useEffect(() => {
    getData();
    console.log(word);
    console.log(definition);
  }, []);

  const getData = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("currentUser"));
      const currentUser = username.id;
      const res = await axios.get(
        `http://localhost:3001/getWords/${currentUser}`
      );
      setWord(res.data.words);
      setDefinition(res.data.definitions);
    } catch (err) {}
  };

  const deleteTheWord = async (element, row) => {
    try {
      const username = JSON.parse(localStorage.getItem("currentUser"));
      const currentUser = username.id;
      const res = await axios.delete("http://localhost:3001/deleteTheWord", {
        data: {
          username: currentUser,
          word: element,
        }
      });
      if (res.data.status === "deleted") {
        alert("The word has been deleted successfully");
        row.remove();
      }
    } catch (err) {
      alert("The word hasn't been deleted");
    }
  };

  function generateTable() {
    const existingTable = document.getElementById("dictionaryTable");
    if (existingTable) {
      existingTable.remove();
      return;
    }
    const tbl = document.createElement("table");
    tbl.setAttribute("id", "dictionaryTable");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < word.length; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 2; j++) {
        const cell = document.createElement("td");
        cell.style.position = "relative";
        let cellText;
        let cellImage;
        if (j === 0) {
          cellText = document.createTextNode(` ${word[i]}`);
          cell.appendChild(cellText);
          cellImage = document.createElement("img");
          cellImage.setAttribute("src", trashCan);
          cellImage.style.position = "absolute";
          cellImage.style.bottom = "3px";
          cellImage.style.left = "1px";
          cellImage.style.cursor = "pointer";
          cellImage.onclick = function() {
            deleteTheWord(word[i], row);
            console.log(word[i]);
          };
          cell.appendChild(cellImage);
        } else {
          cellText = document.createTextNode(`${definition[i]}`);
          cell.appendChild(cellText);
        }

        row.appendChild(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    const header = document.createElement("tr");
    const headerLeft = document.createElement("th");
    headerLeft.textContent = "Words";
    const headerRight = document.createElement("th");
    headerRight.textContent = "Definitions";

    header.appendChild(headerLeft);
    header.appendChild(headerRight);
    tblBody.insertBefore(header, tblBody.firstChild);
  }
  function toggleTable() {
    const button = document.getElementById("toggleButton");
    const existingTable = document.getElementById("dictionaryTable");

    if (existingTable) {
      existingTable.remove();
      button.textContent = "Open the Dictionary";
    } else {
      generateTable();
      button.textContent = "Close the Dictionary";
    }
  }

  return (
    <div style={{ marginBottom: "100px" }}>
      <button className="open-button" id="toggleButton" onClick={toggleTable}>
        Open the Dictionary
      </button>
    </div>
  );
};

export default Dictionary;
