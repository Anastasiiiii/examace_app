import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import icons from "../JsonFiles/icons.json";
const arrowIcon = icons.icons[4].src;

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [admin, setAdmin] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setFormError(true);
      alert("Please fill in all fields");
      return;
    }

    try {
      const adminRes = await axios.get(`http://localhost:3001/getUsers/admin`);
      const adminData = adminRes.data;
      setAdmin(adminData.username);
      setAdminPassword(adminData.password);

      const res = await axios.post("http://localhost:3001/", {
        username,
        password,
      });
      if (
        username !== "admin" &&
        password !== "admin" &&
        res.data.status === "exist"
      ) {
        navigate("/home", { state: { id: username } });
      } else if (username === "admin" && password === "admin") {
        navigate("/admin", { state: { admin } });
      } else if (res.data.status === "doesnotexist") {
        alert("User does not exist");
      }
    } catch (error) {
      alert("Wrong details");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password" style={{ marginTop: "10%" }}>
          <b>Password</b>
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-container" style={{ marginTop: "5%" }}>
          <button type="submit" className="sign-up-button">
            Login
            <img
              src={arrowIcon}
              alt="Arrow"
              style={{ verticalAlign: "middle", marginLeft: "5px" }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
