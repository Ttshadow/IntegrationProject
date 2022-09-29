import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import useLocalStorage from "../../util/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EditAllStatus() {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState('available');
    const editAll = (event) => {
        event.preventDefault();
        event.stopPropagation();
        fetch('updatealltable/' + status, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8", 
            },
        })
        .then(() =>{
        toast.success("All tables' status has been updated.");
        setShowModal(false);
        window.setTimeout(function(){window.location.reload(false)}, 2500);
        })
    };

    const openModal = () => {setShowModal(true)}

    const statusOptions = [
        {value: 'available'},
        {value: 'reserved'},
        {value: 'occupied'},
        {value: 'unavailable'}
    ];

    return <>
        <ToastContainer hideProgressBar={true} theme="colored" position="top-center" autoClose={1000} closeButton={false} />
        <Button className="mt-3" onClick={openModal}>
            Edit all table status
        </Button>
        <Modal show={showModal}>
            <Modal.Header>
            <Modal.Title>
            Edit status for all tables
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate onSubmit={editAll}>
                <Form.Group>
                    <Form.Select onChange={(e) => setStatus(e.target.value)}>
                        {statusOptions.map((option, index) => {
                            return <option key={index} value={option.value}>{option.value}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">Save</Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="warning" onClick={() => setShowModal(false)}>Close</Button>
            
            </Modal.Footer>
        </Modal>
    </>
}

export default EditAllStatus;