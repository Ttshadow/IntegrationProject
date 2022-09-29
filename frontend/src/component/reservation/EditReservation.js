import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import useLocalStorage from "../../util/useLocalStorage";
import ReservationStatusOption from './ReservationStatusOption';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EditReservation(props) {
    const [showModal, setShowModal] = useState(false);
    const [name, setTableName] = useState('');
    const [capacity, setTableCapacity] = useState(0);
    const [status, setStatus] = useState(props.status);
    const [validated, setValidated] = useState(false);
    const [table, setTable] = useState(props.table);
    const [jwt,setJwt] = useLocalStorage("","jwt");
    const openModal = () => {setShowModal(true)}
    
    const editReservation = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const reservation = {id: props.id, user: {id: props.user}, numberOfParty: props.numberOfParty, startTime: props.startTime, endTime: props.endTime, status: status, diningTable: {id: table}};
        fetch('/admindashboard/reservation/editreservation', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8", 
            },
            body: JSON.stringify(reservation)
        })
        .then(() =>{
            toast.success("Reservation " + props.id + " been updated.");
            setShowModal(false);
            window.setTimeout(function(){window.location.reload(false)}, 2500);
            })
    }

    return (
        <div>
        <ToastContainer hideProgressBar={true} theme="colored" position="top-center" autoClose={1000} closeButton={false} />
        <Button onClick={openModal} className="mb-3">
            Edit
        </Button>
        <Modal show={showModal}>
            <Modal.Header>
            <Modal.Title>
                Edit Reservation {props.id}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} >
                <ReservationStatusOption setTable={setTable} setStatus={setStatus} status={props.status} startTime={props.startTime} endTime={props.endTime} numberOfParty={props.numberOfParty} tableName={props.tableName}></ReservationStatusOption>
                <Button variant="primary" type="submit" onClick={editReservation}>Confirm</Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="warning" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}
export default EditReservation;