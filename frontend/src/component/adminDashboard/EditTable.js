import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import TableStatusOption from './TableStatusOption';
import useLocalStorage from "../../util/useLocalStorage";

function EditTable(props) {
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(props.table.id)
    const [name, setTableName] = useState(props.table.name);
    const [capacity, setTableCapacity] = useState(props.table.capacity);
    const [status, setTableStatus] = useState(props.table.status);
    const [validated, setValidated] = useState(false);
    const [jwt,setJwt] = useLocalStorage("","jwt");
    
    const editTable = (event) => {
        const form = event.currentTarget;
        const updatetable = {id, name, capacity, status};
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            alert('Please verify the information entered.');
        }
        else {
            setValidated(true);
            fetch('updatetable', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(updatetable)
            })
            alert(name + " has been updated.");
        }
    };

    const deleteTable = () => {
        fetch('deletetable/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8", 
            },
        })
        alert(name + " has been deleted.");
    };

    const openModal = () => {setShowModal(true)}
    return (
    <div>
    <Button onClick={openModal}>
        Edit {props.tableName}
    </Button>
    <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>
          Edit {props.table.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={editTable}>
            <Form.Group className="mb-3">
                <Form.Label>Table Name</Form.Label>
                <Form.Control
                    required 
                    type="text" 
                    placeholder="Name of the table"
                    defaultValue={props.table.name}
                    onChange={(e)=> setTableName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control  
                    required
                    type="number"
                    placeholder="Number of seats"
                    defaultValue={props.table.capacity}
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
            <TableStatusOption status={status} setTableStatus={setTableStatus}/>
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="danger" onClick={deleteTable}>Delete</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowModal(false)}>Close</Button>
          
        </Modal.Footer>
    </Modal>
    </div>
    )
}
export default EditTable;