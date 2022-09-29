import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import useLocalStorage from "../../util/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddTable() {
    const [showModal, setShowModal] = useState(false);
    const [name, setTableName] = useState('');
    const [capacity, setTableCapacity] = useState(0);
    const [status, setTableStatus] = useState('available');
    const [validated, setValidated] = useState(false);
    const [jwt,setJwt] = useLocalStorage("","jwt");
    const [errorMessage, setErrorMessage] = useState("");

    const addTable = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            
            setErrorMessage("Please verify the information entered.");
        }
        else {
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
            .then((data) => {
                if(data.status === 200){
                    toast.success(name + ' updated successfully.');
                    setShowModal(false);
                    window.setTimeout(function(){window.location.reload(false)}, 2500);
                }
                else{
                    return data.text();
                }
            })
            .then((text)=>{
                  setErrorMessage(text);
            })
        }
    }
    const openModal = () => {setShowModal(true)}
    return (
    <div>
    <ToastContainer hideProgressBar={true} theme="colored" position="top-center" autoClose={1000} closeButton={false} />
    <Button onClick={openModal} className="mb-3">
        New table
    </Button>
    <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>
            Add a new table
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="text-danger">{errorMessage}</p>
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