import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Form.css";
import icons from "../icons.json";
const arrowIcon = icons.icons[4].src;

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    if (!username || !email || !password) {
      setFormError(true);
      alert("There is no data");
      return;
    }
    try {
      await axios.post("http://localhost:3001/", {
          username,
          email,
          password,
        })
        .then((res) => {
            if (res.data.status === "exist") {
              alert("User has already exist");
            } else if (res.data.status === "doesnontexist") {
              navigate("/home", { state: { id: res.data.user.username } });
              console.log("navigated")
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
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          name="username"
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="psw"
          required
        />
      </form>
      <div className="button-container">
        <button type="submit" onClick={handleSubmit} className="sign-up-button">
          sign-up
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

export default SignupForm;