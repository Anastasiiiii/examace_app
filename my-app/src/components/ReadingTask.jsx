import axios from "axios";
import React from "react";
import { useState } from "react";
import "../styles/ReadingTask.css";
import "../styles/Formulas.css";

const ReadingTask = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const getReadingText = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/getRandomUploadedFile"
      );
      setFile(res.data.fileName);
      setText(res.data.content);
    } catch (err) {
      console.error("Error getting the file: ", err);
    }
  };
 
  //const name = file.split('.');
  //const newName = name.slice(0, -1).join('.');
  return (
    <div className="info-container">
      <button className="postText" onClick={getReadingText}>
        Get an article
      </button>
      {file && (
        <div className="reading-box">
          <h3>{file}</h3>
            <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default ReadingTask;
