import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import useLocalStorage from "../../../util/useLocalStorage";
import moment from 'moment';

function AddReservation() {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    //const [user, setUser] = useState(2);
    const user = localStorage.getItem('userId');
    const [numberOfParty, setNumberOfParty] = useState(1);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [diningTable, setDiningTable] = useState(1);
    
    var optionArray = [];
    const partyLimit = 20;
    (() => {
        for (let i = 1; i < partyLimit+1; i++) {
            optionArray.push(i);
        }
        return optionArray;
    })()

    const reservationStatus = () => {
        const dto = {startTime: startTime, endTime: endTime, numberOfParty: numberOfParty};
        fetch('reservation/statusrequest', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(dto)
        })
        .then((response) => response.text())
        .then((text) => {
            console.log(text);
            addReservation(text);
        })
    };

    const addReservation = (status2) => {
        console.log(status2);
        const reservation = {diningTable: {id: diningTable}, user: {id: user}, startTime: moment(startTime).toDate(), endTime: moment(endTime).toDate(), numberOfParty: numberOfParty, status: status2};
        fetch('reservation/new', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(reservation)
        })
        .then((data) => data.json())
        .then((json) => alert(JSON.parse(JSON.stringify(json))))
    }

    return <Container>
        <Row>
            <Col className='col-lg-7'>
                <h1>
                    RESERVATIONS
                </h1>
                <h2>
                    DINING HOURS
                </h2>
                <h3>
                    LUNCH
                </h3>
                <p>Daily from 11:30 am - 2:30 pm</p>
                <h3>
                    DINNER
                </h3>
                <p>Daily from 5:30 am - 10:00 pm</p>
                <br></br>
                <p>Please note that the last call is one hour before closing</p>
                <h2>
                    TAKEOUT HOURS
                </h2>
                <p>Daily from 11:30 am - 9:00 pm</p>
            </Col>
            <Col className='col-lg-5'>
                <h1>
                    BOOK A TABLE
                </h1>
                <Form noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>Number of People</Form.Label>
                        <Form.Select onChange={(e) => setNumberOfParty(e.target.value)}>
                            {optionArray.map(function (i) {
                                return <option key={i} value={i}>{i}</option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Start time</Form.Label>
                        <Form.Control
                            required
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>End time</Form.Label>
                        <Form.Control
                            required
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </Form.Group>
                    <Button onClick={reservationStatus}>Confirm</Button>
                </Form>
                {startTime}
                {endTime}
            </Col>
        </Row>
    </Container>
}

export default AddReservation;