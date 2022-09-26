import { Form, Button, Col, Row, Card } from "react-bootstrap";
import useLocalStorage from "../../util/useLocalStorage";
import React, { useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";

 export default function ShowProfile(props){
    const [jwt,setJwt] = useLocalStorage("","jwt");
    const [userId, setUserId] = useLocalStorage("","userId");
    const [user, setUser] = useState([])
    const navigate = useNavigate();

    let id = Number(localStorage.getItem('userId'));
    useEffect(() =>{
        fetch('/userdashboard/'+ id, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data)=> data.json())
        .then((json)=> {
            console.log(json)
            setUser(JSON.parse(JSON.stringify(json)))
        });
    }, []);

    const navClick = (event) => {
        event.preventDefault();
        navigate("/userdashboard/profile/edit");
    }

    return(
        <>
        <br/ >
            <h3>Profile Page</h3>
            <br/>
            <Col lg="8">
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text>First Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{user.firstName}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Last Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{user.lastName}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{user.email}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{user.tel}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            </Col>
            <Button variant="warning" onClick={navClick}>Edit Profile</Button>
        </>
    )
 }