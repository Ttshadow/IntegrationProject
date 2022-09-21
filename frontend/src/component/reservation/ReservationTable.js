import { Button, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "../../util/useLocalStorage";
import moment from 'moment';

function ReservationTable() {
    const [reservation, setReservation] = useState([]);
    const [jwt,setJwt] = useLocalStorage("","jwt")

    const allReservation = () => {
        fetch('reservation', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
        },
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
                        <td>{moment(reservation.startTime).format("YYYY-MM-DD HH:mm ")}</td>
                        <td>{moment(reservation.startTime).format("YYYY-MM-DD HH:mm ")}</td>
                        <td>{reservation.numberOfParty}</td>
                        <td>{reservation.status}</td>
                        <td>
                            <Button className="ml-auto mx-2" onClick={editReservation}>Edit</Button>
                            <Button variant='danger
                            ' className="ml-auto" onClick={deleteReservation}>Delete</Button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    </>
};
export default ReservationTable;