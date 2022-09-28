import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "../../../util/useLocalStorage";
import moment from 'moment';

function AddReservation() {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    //const [user, setUser] = useState(2);
    const user = localStorage.getItem('userId');
    const [numberOfParty, setNumberOfParty] = useState(1);
    const [startTime, setStartTime] = useState(moment().format("yyyy-MM-DDTHH:mm"));
    const [endTime, setEndTime] = useState(moment().add(30, 'm').format("yyyy-MM-DDTHH:mm"));
    const [diningTable, setDiningTable] = useState(2);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailAlert, setShowFailAlert] = useState(false);
    const [showFailTimeAlert, setShowFailTimeAlert] = useState(false);
    const [showFailMinTimeAlert, setShowFailMinTimeAlert] = useState(false);
    const [showFailFormAlert, setShowFailFormAlert] = useState(false);
    const [showFailLogicTimeAlert, setShowFailLogicTimeAlert] = useState(false);
    const [minCount, setMinCount] = useState(0);
    const [maxCount, setMaxCount] = useState(0);

    //console.log(moment(startTime, "hh:mm"));
    var minValue;
    var maxValue;
    //let minCount = 0;
   // let maxCount = 0;
    const dateNow = moment().format("yyyy-MM-DDTHH:mm");
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
        const currentDate = moment(dateNow).format("yyyy-MM-DD");
        const updatedDate = moment(startTime).format("yyyy-MM-DD");
        const currentTime = moment(dateNow).format(format);
        const nextDate = moment().add(1, 'd').format("yyyy-MM-DD");
        
        console.log(startTime);
        console.log('now: ' + moment(startTime).format(format));
        console.log('lunch: ' + startLunchTime);
        if (moment(currentTime, format).isBefore(moment(maxLunchTime, format))) {
            minValue = moment(currentDate + 'T' + startLunchTime).format("yyyy-MM-DDTHH:mm");
            maxValue = moment(updatedDate + 'T' + maxLunchTime).format("yyyy-MM-DDTHH:mm");
            console.log(minValue);
            console.log(maxValue);
        }
        else if (moment(currentTime, format).isBefore(moment(maxDinnerTime, format))) {
            minValue = moment(currentDate + 'T' + startDinnerTime).format("yyyy-MM-DDTHH:mm");
            maxValue = moment(updatedDate + 'T' + maxDinnerTime).format("yyyy-MM-DDTHH:mm");
            console.log(minValue);
            console.log(maxValue);
        }
        else {
            minValue = moment(nextDate + 'T' + startLunchTime).format("yyyy-MM-DDTHH:mm");
            maxValue = moment(updatedDate + 'T' + maxDinnerTime).format("yyyy-MM-DDTHH:mm");
            console.log(minValue);
            console.log(maxValue);
        }
        
        for (let i = 1; i < partyLimit+1; i++) {
            optionArray.push(i);
        }
        return optionArray;

    })();

    const reservationStatus = () => {
        setShowFailAlert(false);
        setShowSuccessAlert(false);
        if(showFailTimeAlert === true || showFailMinTimeAlert === true || showFailLogicTimeAlert === true) {
            setShowFailFormAlert(true);
        }
        else {
            setShowFailFormAlert(false);
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
        }
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
        setStartTime(moment().format("yyyy-MM-DDTHH:mm"));
        setEndTime(moment().add(30, 'm').format("yyyy-MM-DDTHH:mm"));
    }

    return <div className='login-container text-light'>
        <br/>
        <Container>
        <Row>
            <Alert show={showSuccessAlert} variant="success">Reservation was successfully added. The status is 'pending' and will be updated soon.</Alert>
            <Alert show={showFailAlert} variant="danger">Reservation was rejected. There is no availability for the requested time slot.</Alert>
            <Alert show={showFailTimeAlert} variant="danger">Please select a time slot between {moment(minValue).format("HH:mm")} and {moment(maxValue).format("HH:mm")}.</Alert>
            <Alert show={showFailMinTimeAlert} variant="danger">You cannot select a time slot before the current time: {moment(dateNow).format("yyyy-MM-DD HH:mm")}.</Alert>
            <Alert show={showFailFormAlert} variant="danger">Please verify your reservation information.</Alert>
            <Alert show={showFailLogicTimeAlert} variant="danger">Please verify your start and end time.</Alert>
            <Col className='col-lg-7'>
                <div className='transparentBg'>
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
                </div>
            </Col>
            <Col className='col-lg-5'>
                <div className='transparentBg'>
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
                                min={dateNow}
                                value={moment(minValue).isAfter(moment(startTime)) && minCount === 0 ? setStartTime(minValue) : startTime}
                                onChange={(e) => {
                                    setShowFailFormAlert(false);
                                    setStartTime(e.target.value);
                                    setMinCount(minCount+1);
                                    moment(e.target.value).isBefore(moment(dateNow)) ? setShowFailMinTimeAlert(true) : setShowFailMinTimeAlert(false);
                                    moment(e.target.value).isBefore(moment(minValue)) ? setShowFailTimeAlert(true) : setShowFailTimeAlert(false);
                                    moment(e.target.value).isAfter(moment(maxValue)) ? setShowFailLogicTimeAlert(true) : setShowFailLogicTimeAlert(false);
                                }}
                            />
                            
                        </Form.Group> 
                        <p>
                            start: {startTime}<br></br>
                            min: {minValue}
                        </p>
                        <Form.Group className="mb-3">
                            <Form.Label>End time</Form.Label>
                            <Form.Control
                                required
                                type="datetime-local"
                                min={minValue}
                                max={maxValue}
                                value={(moment(endTime).isAfter(moment(maxValue)) || moment(minValue).isAfter(moment(endTime))) && maxCount === 0  ? setEndTime(maxValue) : endTime}
                                onChange={(e) => {
                                    setShowFailFormAlert(false);
                                    setEndTime(e.target.value);
                                    setMaxCount(maxCount+1);
                                    moment(e.target.value).isBefore(moment(dateNow)) ? setShowFailMinTimeAlert(true) : setShowFailMinTimeAlert(false);
                                    moment(e.target.value).isAfter(moment(maxValue)) ? setShowFailTimeAlert(true) : setShowFailTimeAlert(false);
                                    moment(e.target.value).isBefore(moment(startTime)) ? setShowFailLogicTimeAlert(true) : setShowFailLogicTimeAlert(false);
                                }}
                            />
                        </Form.Group>
                        <p>
                            end: {endTime}<br></br>
                            max: {maxValue}<br></br>
                            maxCount {maxCount}
                        </p>
                        <Button onClick={reservationStatus}>Confirm</Button>
                    </Form>
                </div>
            </Col>
        </Row>
        </Container>
    </div>
}

export default AddReservation;