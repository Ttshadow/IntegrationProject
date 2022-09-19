import { Button, Form, Tab, Tabs, Modal } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
function AddTable() {
    const [showModal, setShowModal] = useState(false);
    const [name, setTableName] = useState('');
    const [capacity, setTableCapacity] = useState(0);
    const [status, setTableStatus] = useState('available');
    const addTable = () => {
        const table = {name, capacity, status};
        fetch('addtable', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8", 
            },
            body: JSON.stringify(table)
        })
        .then((data) => data.json())
    }
    const openModal = () => {setShowModal(true)}
    return (
    <div>
    <Button onClick={openModal}>
        New table
    </Button>
    <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add a new table
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
    </Modal>
    </div>
    )
}
export default AddTable;