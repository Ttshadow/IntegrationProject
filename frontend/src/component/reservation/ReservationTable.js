import { Button, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "../../util/useLocalStorage";
import moment from 'moment';
import EditReservation from './EditReservation';

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
                <th>Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Number of People</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {reservation.slice(0).reverse().map((reservation, index) => {
                    return (
                    <tr key={index}>
                        <td>{reservation.id}</td>
                        <td>{reservation.user.firstName} {reservation.user.lastName}</td>
                        <td>{moment(reservation.startTime).format("YYYY-MM-DD HH:mm ")}</td>
                        <td>{moment(reservation.endTime).format("YYYY-MM-DD HH:mm ")}</td>
                        <td>{reservation.numberOfParty}</td>
                        <td>{reservation.status}</td>
                        <td>
                            <EditReservation className="ml-auto mx-2" user={reservation.user.id} table={reservation.diningTable.id} id={reservation.id} status={reservation.status} startTime={reservation.startTime} endTime={reservation.endTime} numberOfParty={reservation.numberOfParty}>Edit</EditReservation>
                            <Button variant='danger' className="ml-auto" onClick={deleteReservation}>Delete</Button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    </>
};
export default ReservationTable;