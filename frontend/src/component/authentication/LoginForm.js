import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../util/useLocalStorage";
import "./LoginForm.css";

export default function LoginForm() {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [authority, setAuthority] = useLocalStorage("", "authority");
  const [userId, setUserId] = useLocalStorage("", "userId");
  const [message, setMessage] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("user/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else {
          setMessage("Username or Password not correct, Please try again");
        }
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        setAuthority(body.authority.authority);
        window.location.href = "/";
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={usernameRef}
            className="input"
            placeholder="Username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="input"
            required
          />
          <button type="submit" id="button">
            Log in
          </button>
        </form>
        <Link to="/register" id="goToRegister">
          Go to Register
        </Link>
      </div>
    </div>
  );
}
