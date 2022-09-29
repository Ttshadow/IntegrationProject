import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Col, Container } from "react-bootstrap";
import { BsCartDash } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import useLocalStorage from "../../util/useLocalStorage";

export default function Header() {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [authority, setAuthority] = useLocalStorage("", "authority");
  const [userId, setUserId] = useLocalStorage("", "userId");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    });
  }, []);
  const handleLogin = () => {
    if (jwt) {
      setJwt("");
      setAuthority("");
      setUserId("");
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  const jumpToDashboard = () => {
    if (authority === "ROLE_ADMIN") {
      window.location.href = "/admindashboard/table";
    } else if (authority === "ROLE_USER") {
      window.location.href = "/userdashboard/profile";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="nav-container">
      <div className="navigation">
        <Link to="/">
          <div id="logo"></div>
        </Link>
        <div className="navMenu">
          <nav className={isMobile && isNavOpen ? "open" : undefined}>
            {isMobile && (
              <div
                className="closeIcon"
                tabIndex="0"
                role="button"
                onClick={() => setIsNavOpen(false)}
                onKeyDown={() => setIsNavOpen(false)}
              >
                <FiX />
              </div>
            )}
            <ul>
              <li>
                <Link to="dine">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/newreservation">
                  Reservation
                </Link>
              </li>
              <li className="nav-item">
                <a href="#testimonial">
                  Testimonials
                </a>
              </li>
            </ul>
          </nav>
          {isMobile && (
            <div
              className="menuIcon"
              tabIndex="0"
              role="button"
              onClick={() => setIsNavOpen(true)}
              onKeyDown={() => setIsNavOpen(true)}
            >
              <FiMenu />
            </div>
          )}
        </div>
        <ul>
          <li>
            <button
              className="btn btn-light"
              onClick={() => {
                window.location.href = "/dine/cart";
              }}
            >
              <BsCartDash />
            </button>
            <span
              className="position-absolute badge rounded-pill bg-danger"
              id="cart-number"
            ></span>
            <button className="me-2 btn btn-light" onClick={jumpToDashboard}>
              <FaUserCircle />
            </button>
            <button onClick={handleLogin} className="btn btn-light">
              {jwt ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
