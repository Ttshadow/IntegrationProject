import { Button, Form, Tab, Tabs, Modal, Container, Row, Col } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
function AddReservation() {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(1);
    const [numberOfParty, setNumberOfParty] = useState(1);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState();
    const [status, setStatus] = useState('pending');
    const [diningTable, setDiningTable] = useState(8);
    
    var optionArray = [];
    const partyLimit = 20;
    (() => {
        for (let i = 1; i < partyLimit+1; i++) {
            optionArray.push(i);
        }
        return optionArray;
    })()
    const openModal = () => {setShowModal(true)}

    //function to determine the status

    const addReservation = () => {
        const reservation = {dining_table_id: diningTable, user_id: user, start_time: startTime, end_time: endTime, number_of_party: numberOfParty, status: status};
        fetch('reservation/new', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8", 
            },
            body: JSON.stringify(reservation)
        })
        .then((data) => data.json())
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
                            value={startTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </Form.Group>
                    {/*<Form.Group className="mb-3">
                        <Form.Control hidden
                            required
                            type="number"
                            value={1}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control hidden
                            required
                            type="number"
                            value={8}
                        />
                        </Form.Group>*/}
                    <Button onClick={addReservation}>Confirm</Button>
                </Form>
            </Col>
        </Row>
    {/*<Button onClick={openModal}>
        New reservation
    </Button>
    <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add a new reservation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={addTable}>
            <Form.Group className="mb-3">
                <Form.Label>Table Name</Form.Label>
                <Form.Control
                    required 
                    type="text" 
                    placeholder="Name of the table"
                    onChange={(e)=> setTableName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control  
                    required
                    type="number"
                    placeholder="Number of seats"
                    onChange={(e)=> setTableCapacity(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control hidden
                    required
                    type="text"
                    defaultValue="available"
                />
            </Form.Group>
            <Button variant="primary" type="submit">Create</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowModal(false)}>Close</Button>
          
        </Modal.Footer>
    </Modal>*/}
    </Container>
}

export default AddReservation;