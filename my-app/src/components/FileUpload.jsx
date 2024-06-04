import React, { useState } from "react";
import axios from "axios";
import "../styles/FileUpload.css";
import icons from "../JsonFiles/icons.json";
const icon = icons.icons[7].src;

const FileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };
  const uploadTheFile = () => {
    const formData = new FormData();
    formData.append("task", uploadedFile);

    axios
      .post("http://localhost:3001/api/upload", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="file-upload-box">
      <form className="file-upload-form">
        <input
          type="file"
          name="task"
          className="uploaded-file"
          id="uploadBtn"
          onChange={handleFileUpload}
        />
        <label for="uploadBtn">Upload File</label>
        <button type="button" onClick={uploadTheFile}>
          Upload
        </button>
        <img src={icon} />
      </form>
    </div>
  );
};

export default FileUpload;
