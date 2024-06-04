import React from "react";
import { useState } from "react";
import "../styles/Form.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Form = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const changeToLoginForm = () => {
    setShowLoginForm(true);
    console.log("clicked");
    console.log(showLoginForm);
  };

  const changeToSignupForm = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="form-box">
      <div className="sign-form">
        {showLoginForm ? <LoginForm /> : <SignupForm />}
        {showLoginForm && (
          <p onClick={changeToSignupForm}>Don`t have an account?</p>
        )}
        {!showLoginForm && <p onClick={changeToLoginForm}>Have an account?</p>}
      </div>
    </div>
  );
};

export default Form;
