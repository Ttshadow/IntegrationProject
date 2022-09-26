import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import useLocalStorage from "../../../util/useLocalStorage";
import moment from 'moment';

function AddReservation() {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    //const [user, setUser] = useState(2);
    const user = localStorage.getItem('userId');
    const [numberOfParty, setNumberOfParty] = useState(1);
    const [startTime, setStartTime] = useState(moment().format("yyyy-MM-DDTHH:mm"));
    const [endTime, setEndTime] = useState('');
    const [diningTable, setDiningTable] = useState(2);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailAlert, setShowFailAlert] = useState(false);
    const [showFailTimeAlert, setShowFailTimeAlert] = useState(false);
    //console.log(moment(startTime, "hh:mm"));
    var minValue;
    var maxValue;

    var optionArray = [];
    const partyLimit = 20;
    /*(() => {
        
    })();*/

    (() => {
        const format = "HH:mm";
        const startLunchTime = moment().set({'hour': 11, 'minute': 30}).format(format);
        const maxLunchTime = moment().set({'hour': 14, 'minute': 30}).format(format);
        const startDinnerTime = moment().set({'hour': 17, 'minute': 30}).format(format);
        const maxDinnerTime = moment().set({'hour': 22, 'minute': 0}).format(format);
        const currentDate = moment().format("yyyy-MM-DD");
        const currentTime = moment().format(format);
        const nextDate = moment().add(1, 'd').format("yyyy-MM-DD");
        
        console.log(startTime);
        console.log('now: ' + moment(startTime).format(format));
        console.log('lunch: ' + startLunchTime);
        if (moment(currentTime, format).isBefore(moment(startLunchTime, format))) {
            minValue = moment(currentDate + 'T' + startLunchTime).format("yyyy-MM-DDTHH:mm");
            maxValue = moment(currentDate + 'T' + maxLunchTime).format("yyyy-MM-DDTHH:mm");
        }
        else if (moment(currentTime, format).isBefore(moment(startDinnerTime, format))) {
            minValue = moment(currentDate + 'T' + startDinnerTime).format("yyyy-MM-DDTHH:mm");
            maxValue = moment(currentDate + 'T' + maxDinnerTime).format("yyyy-MM-DDTHH:mm");
            console.log(minValue);
        }
        else {
            minValue = moment(nextDate + 'T' + startLunchTime).format("yyyy-MM-DDTHH:mm");
            maxValue = moment(currentDate + 'T' + maxDinnerTime).format("yyyy-MM-DDTHH:mm");
            console.log(minValue);
        }
        
        for (let i = 1; i < partyLimit+1; i++) {
            optionArray.push(i);
        }
        return optionArray;

    })();

    const reservationStatus = () => {
        const dto = {startTime: startTime, endTime: endTime, numberOfParty: numberOfParty};
        fetch('/userdashboard/reservation/statusrequest', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(dto)
        })
        .then((response) => response.text())
        .then((text) => {
            addReservation(text);
        })
    };

    const addReservation = (status2) => {
        console.log(status2);
        const reservation = {diningTable: {id: diningTable}, user: {id: user}, startTime: moment(startTime).toDate(), endTime: moment(endTime).toDate(), numberOfParty: numberOfParty, status: status2};
        fetch('/userdashboard/reservation/new', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(reservation)
        })
        .then((data) => data.json())
        .then((json) => {
            var info = json;
            console.log(json);
            if (info.status === 'pending') {
                setShowFailAlert(false);
                setShowSuccessAlert(true);
                clearInputs();
            }
            else {
                setShowSuccessAlert(false);
                setShowFailAlert(true);
            }
        })
    }

    const clearInputs = () => {
        setNumberOfParty(1);
        setStartTime('');
        setEndTime('');
    }

    return <div className='login-container text-light'>
        <br/>
        <Container>
        <Row>
            <Alert show={showSuccessAlert} variant="success">Reservation was successfully added. The status is 'pending' and will be updated soon.</Alert>
            <Alert show={showFailAlert} variant="danger">Reservation was rejected. There is no availability for the requested time slot.</Alert>
            <Alert show={showFailTimeAlert} variant="danger">Please select a time slot between {/*startValue*/} and {/*endValue*/}</Alert>
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
                <p>Daily from 5:30 pm - 10:00 pm</p>
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
                            /*min={moment(Date.now()).toDate()}
                            max={moment(Date.now()).toDate()}*/
                            min={minValue}
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>End time</Form.Label>
                        <Form.Control
                            required
                            type="datetime-local"
                            min={minValue}
                            max={maxValue}
                            value={endTime}
                            onChange={(e) => {
                                setEndTime(e.target.value);
                                moment(e.target.value).isAfter(moment(maxValue)) ? setShowFailTimeAlert(true) : setShowFailTimeAlert(false);
                            }}
                        />
                    </Form.Group>
                    <Button onClick={reservationStatus}>Confirm</Button>
                </Form>
            </Col>
        </Row>
        </Container>
    </div>
}

export default AddReservation;