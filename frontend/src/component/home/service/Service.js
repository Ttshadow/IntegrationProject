import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Service.css";
import Card from "react-bootstrap/Card";

function Service() {
  let promotionCode = "20OFFTHURSDAY";
  return (
    <Container fluid className="container-service bg-dark">
      <Row>
        <Col className="col-5">
          <Card
            style={{ width: "25rem" }}
            className="happyHourCard float-end bg-dark"
          >
            <Card.Body>
              <Card.Title className="text-light">Happy Hours</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Every Thursday Night 6:00 PM - 8:00 PM
              </Card.Subtitle>
              <Card.Text className="text-light">
                Our biggest event is here!{" "}
                <span className="coupon">20% OFF</span> for all orders.
              </Card.Text>
              <Card.Link
                className="btn btn-warning promotionCode"
                onClick={()=>{navigator.clipboard.writeText(promotionCode)}}
              >
                {promotionCode}
                <span className="tooltipText">Click To Copy</span>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col
          className="col-7"
          id="happyHourImgContainer"
          style={{ height: "500px" }}
        ></Col>
      </Row>
    </Container>
  );
}

export default Service;
