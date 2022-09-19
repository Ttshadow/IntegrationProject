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
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Registration success")
                } else {
                    setMessage('Username already exists, Please choose another one!')
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>{message}</p>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" ref={usernameRef} required />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" ref={passwordRef} required />
                <button type="submit">Create User</button>
            </form>
            <Link to="/login">Go to Login Form</Link>
        </div>
    );
}

export default RegisterForm;