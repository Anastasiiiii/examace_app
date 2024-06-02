import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CardsFlip.css";
import "../styles/Formulas.css";

const AddNewWords = () => {
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");
  const addWords = () => {
    const username = JSON.parse(localStorage.getItem("currentUser"));
    const currentUser = username.id;
    axios.post("http://localhost:3001/addWords", { username: currentUser, word, definition })
      .then(response => {
        if (response.data.status === "created" || response.data.status === "exist") {
          alert("The word has been added successfully");
        } else {
          alert("The word hasn't been saved");
        }
      })
      .catch(err => {
        console.error(err);
      });
      document.getElementById('word').value = '';
      document.getElementById('definition').value = '';
  };
  return (
    <div className="adding-a-new-word">
      <input
        type="text"
        className="form-field"
        placeholder="Word"
        name="word"
        id="word"
        onChange={(e) => {
            setWord(e.target.value);
          }}
      />
      <input
        type="text"
        className="form-field"
        placeholder="Definition"
        name="definition"
        id="definition"
        onChange={(e) => {
            setDefinition(e.target.value);
          }}
      />
      <button onClick={addWords}>Submit</button>
    </div>
  );
};

export default AddNewWords;
