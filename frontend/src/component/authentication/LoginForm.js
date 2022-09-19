import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../util/useLocalStorage";

export default function LoginForm() {
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (!jwt) {
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
                    if(response.status === 200){
                       return Promise.all([response.json(), response.headers])
                    }
                })
                .then(([body, headers]) => {
                    setJwt(headers.get('authorization'))
                    window.location.href = '/'
                });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" ref={usernameRef} required />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" ref={passwordRef} required />
                <button type="submit">Log in</button>
            </form>
            <Link to="/register">Go to Register</Link>
        </div>
    );
}