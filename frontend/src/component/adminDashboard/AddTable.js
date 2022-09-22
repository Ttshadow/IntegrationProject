import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import useLocalStorage from "../../util/useLocalStorage";

function AddTable() {
    const [showModal, setShowModal] = useState(false);
    const [name, setTableName] = useState('');
    const [capacity, setTableCapacity] = useState(0);
    const [status, setTableStatus] = useState('available');
    const [validated, setValidated] = useState(false);
    const [jwt,setJwt] = useLocalStorage("","jwt");

    const addTable = (event) => {
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        const table = {name, capacity, status};
        fetch('addtable', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(table)
        })
        .then(() => alert(name + ' added successfully.'))
    }
    const openModal = () => {setShowModal(true)}
    return (
    <div>
    <Button onClick={openModal} className="mb-3">
        New table
    </Button>
    <Modal show={showModal}>
        <Modal.Header >
          <Modal.Title>
            Add a new table
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={addTable}>
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
    </Modal>
    </div>
    )
}
export default AddTable;