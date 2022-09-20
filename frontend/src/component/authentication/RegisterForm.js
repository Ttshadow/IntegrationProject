import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [message, setMessage] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("user/register", {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        setMessage("Registration success");
      } else {
        setMessage("Username already exists, Please choose another one!");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Register</h1>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <p>{message}</p>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={usernameRef}
            required
            className="input"
            placeholder="Username"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            ref={passwordRef}
            required
            className="input"
            placeholder="Username"
          />
          <button type="submit" id="button">
            Create User
          </button>
        </form>
        <Link to="/login" id="goToLogin">
          Go to Login Form
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
