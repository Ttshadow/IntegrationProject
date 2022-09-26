import React, { useState,useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Service.css";
import Card from "react-bootstrap/Card";
import useLocalStorage from "../../../util/useLocalStorage";

function Service() {
  const [promotion, setPromotion] = useState({});
  const [jwt,setJwt] = useLocalStorage('','jwt');

  useEffect(() => {
    fetch('promotion',{
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then((res)=>{return res.json()})
    .then((data)=>{
      const value = data.filter((element)=>{
        return element.status === true;
      })[0]
      setPromotion(value);
      console.log(value);
    });
  }, [])

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
                {promotion.description}
              </Card.Subtitle>
              <Card.Text className="text-light">
                Our biggest event is here!{" "}
                <span className="coupon">{promotion.title}</span> for all orders.
              </Card.Text>
              <Card.Link
                className="btn btn-warning promotionCode"
                onClick={()=>{navigator.clipboard.writeText(promotion.code)}}
              >
                {promotion.code}
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
