import { Button, Form, Tab, Tabs, Modal, Container, Row, Col, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function ReservationTable() {
    const [reservation, setReservation] = useState([]);
    
    const allReservation = () => {
        fetch('reservation', {
          method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setReservation(JSON.parse(JSON.stringify(json)))})
    };

    const editReservation = () => {
        
    }

    const deleteReservation  = () => {

    } 

    useEffect(() =>{
        allReservation();
    }, []);

    return <>
        <h1>Admin reservation table</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Reservation number</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Number of People</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {reservation.map((reservation, index) => {
                    return (
                    <tr key={index}>
                        <td>{reservation.id}</td>
                        <td>{reservation.startTime.toString()}</td>
                        <td>{reservation.endTime}</td>
                        <td>{reservation.numberOfParty}</td>
                        <td>{reservation.status}</td>
                        <td>
                            <Button onClick={editReservation}>Edit</Button>
                            <Button onClick={deleteReservation}>Delete</Button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    </>
};
export default ReservationTable;