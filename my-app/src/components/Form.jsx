import React from "react";
import "./Form.css";
import icons from "../icons.json";
const arrowIcon = icons.icons[4].src;

const Form = () => {
  return (
    <div className="form-box">
      <div className="sign-form">
        <h1>Sign Up</h1>
        <form>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input type="text" name="username" required />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input type="text" name="email" required />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input type="password" name="psw" required />
        </form>
        <div className="button-container">
          <button className="sign-up-button">
            sign-up
            <img
              src={arrowIcon}
              alt="Arrow"
              style={{ verticalAlign: "middle", marginLeft: "5px" }}
            />
          </button>
          <p>Have an account?</p>
        </div>
      </div>
    </div>
  );
};

export default Form;
