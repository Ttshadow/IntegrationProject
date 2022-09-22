import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Button, Col, Container } from "react-bootstrap";
import { BsCartDash } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import useLocalStorage from "../../util/useLocalStorage";

export default function Header() {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [authority, setAuthority] = useLocalStorage("", "authority");
  const [userId, setUserId] = useLocalStorage("", "userId");
  const handleLogin = () => {
    if (jwt) {
      setJwt("");
      setAuthority("");
      setUserId("");
    } 
    // else {
    //   window.location.href = "/";

    // } 
    else {
      window.location.href = "/login";
    }
  };

  const jumpToDashboard = () => {
    if(authority === "ROLE_ADMIN") {
      window.location.href = "/admindashboard";
    }else if(authority === "ROLE_USER") { 
      window.location.href = "/userdashboard";
    }else{
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <Col className="text-start">
          <Link to="/">
            <div id="logo"></div>
          </Link>
        </Col>

        <Col className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav navbar mx-auto">
            <li className="nav-item">
              <Link to="dine" className="nav-link">
                Menu
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/newreservation" className="nav-link">
                Reservation
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="">
                Testimonials
              </Link>
            </li>
          </ul>
        </Col>

        <Col>
          <ul className="navbar-nav navbar float-end">
            <li className="nav-item">
              <button className="btn btn-light"onClick={()=>{window.location.href = "/dine/cart";}}>
                <BsCartDash />
              </button>
              <span
                className="position-absolute badge rounded-pill bg-danger"
                id="cart-number"
              ></span>
              <button className="me-2 btn btn-light" onClick={jumpToDashboard}>
                <FaUserCircle />
              </button>
              <button onClick={handleLogin} className='btn btn-light'>
                {jwt ? "Log Out" : "Log In"}
              </button>
            </li>
          </ul>
        </Col>
      </Container>
    </nav>
  );
}