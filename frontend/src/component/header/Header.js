import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Col, Container, Row } from "react-bootstrap";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <Col className="text-start">
          <Link to="/">
            <img src="/images/YUKI.png" style={{width: "20%", height:"20%"}} alt="" />
          </Link>
        </Col>

        <Col className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav navbar mx-auto">
            <li className="nav-item">
              <Link to="" className="nav-link">
                Menu
              </Link>
            </li>

            <li className="nav-item">
              <Link to="" className="nav-link">
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
              <Link to="">
                <i className="bi bi-bag"></i>
              </Link>
              <span
                className="position-absolute badge rounded-pill bg-danger"
                id="cart-number"
              ></span>
              <Link to="">
                <i className="bi bi-person-circle"></i>
              </Link>
              <Link>Login</Link>
            </li>
          </ul>
        </Col>
      </Container>
    </nav>
  );
}
