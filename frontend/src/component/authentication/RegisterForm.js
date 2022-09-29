import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function RegisterForm() {
  const [message, setMessage] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
  const usernameRegex = new RegExp("[^a-zA-Z0-9]");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (usernameRegex.test(usernameRef.current.value)){
      toast.error("Username should not contain any special characters.")
    }
    else{
      if(checkValidation()){
        setMessage("");
        fetch("/user/register", {
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
            // setMessage("Registration success");
            toast.success("Registration Successful");
            setTimeout(()=>{
              navigate("/login");
            }, 1500)
          } else {
            toast.error("Username already exists, Please choose another one!");
            // setMessage("Username already exists, Please choose another one!");
          }
      })}
      else{
        setMessage("Password should contain at least one upper case character, one numeric character, one special character, and must be 6 characters or longer.");
      }}
    };

  function checkValidation(){
    if(strongRegex.test(passwordRef.current.value)){
      return true;
    }else{
      return false;
    }
  }

  return (
    <div className="login-container">
      <ToastContainer hideProgressBar={true} theme="colored" position="top-center" closeOnClick />
      <div className="login-form">
        <h1>Register</h1>
        {/* <p>{message}</p> */}
        <form onSubmit={handleSubmit}>
          {/* <p>{message}</p> */}
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
            placeholder="Password"
          />
          <p className="text-danger bg-light mt-3 rounded">{message}</p>
          <button type="submit" id="button">
            Create User
          </button>
        </form>
        <Link to="/login" id="goToLogin">
          Go to Login
        </Link>
        <Link to="/" id="goToRegister">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
