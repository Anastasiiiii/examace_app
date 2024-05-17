import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Form.css";
import icons from "../icons.json";
const arrowIcon = icons.icons[4].src;

const LoginForm = () => { 
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setFormError(true);
      alert("There is no data");
      return;
    }
    try {
      await axios
        .post("http://localhost:3001/", {
          username,
          password,
        })
        .then((res) => {
          if (res.data.status === "exist") {
            history("/home", { state: { id: username } });
          } else if (res.data.status === "doesnontexist") {
            alert("User has not signed in");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input type="text" name="username" required />

          <label htmlFor="psw" style={{marginTop: "10%"}}>
            <b>Password</b>
          </label>
          <input type="password" name="psw" required />
        </form>
        <div className="button-container">
          <button type="submit" onClick = {handleSubmit} className="sign-up-button" style={{marginTop: "5%"}}>
            Login
            <img
              src={arrowIcon}
              alt="Arrow"
              style={{ verticalAlign: "middle", marginLeft: "5px" }}
            />
          </button>
          
        </div>
    </div>
  );
};

export default LoginForm;