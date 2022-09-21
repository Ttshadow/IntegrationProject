import { Button, Form, Tab, Tabs, Modal, Container, Row, Col, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "../../../util/useLocalStorage";
import moment from 'moment';

function ReservationTable() {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    const [reservation, setReservation] = useState([]);
    const [userId, setUserId] = useState(2);
    
    const allReservationById = () => {
        fetch('reservation/' + userId, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-type": "application/json; charset=UTF-8",
        },
        })
        .then((data) => data.json())
        .then((json) => {setReservation(JSON.parse(JSON.stringify(json)))})
    };

    useEffect(() =>{
        allReservationById();
    }, []);
    return <>
        <h2>User Reservation table</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Reservation number</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Number of People</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {reservation.map((reservation, index) => {
                    return (
                    <tr key={index}>
                        <td>{reservation.id}</td>
                        <td>{moment(reservation.startTime).format("YYYY-MM-DD HH:mm ")}</td>
                        <td>{moment(reservation.endTime).format("YYYY-MM-DD HH:mm ")}</td>
                        <td>{reservation.numberOfParty}</td>
                        <td>{reservation.status}</td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    </>
};
export default ReservationTable;