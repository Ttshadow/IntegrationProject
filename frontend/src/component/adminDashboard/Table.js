import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Table() {
    const [table, setTable] = useState([]);
    const [tableId, setTableId] = useState(table.id);
    const [tableName, setTableName] = useState(table.name);
    const [tableCapacity, setTableCapacity] = useState(table.capacity);
    const [tableStatus, setTableStatus] = useState(table.status);
    const [validated, setValidated] = useState(false);
    const allTable = () => {
        fetch('diningtable', {
          method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setTable(JSON.parse(JSON.stringify(json)))
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
        saveTable(event);
    };

    const saveTable = (event) => {
        event.preventDefault();
        const table = {tableId, tableCapacity, tableStatus, tableName}
        fetch('save_dining_table', {
            method: 'POST',
            body: JSON.stringify(table),
            headers: {
                "Content-type": "application/json; charset=UTF-8", 
            }
        })

    };

    const statusOptions = [
        {value: 'available', label: 'Available'},
        {value: 'reserved', label: 'Reserved'},
        {value: 'unavailable', label: 'Unavailable'},
    ];
    useEffect(() =>{
        allTable();
    }, []);

    return (
        <Tabs
            defaultActiveKey="home"
            transition={false}
            className="mb-3"
        >
            {table.map((table) => {
                return <Tab eventKey={table.id} title={table.name}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required 
                                type="text" 
                                placeholder="Name of the table"
                                defaultValue={table.name}
                                onChange={(e)=> setTableName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control  
                                required
                                type="number"
                                placeholder="Number of seats"
                                defaultValue={table.capacity}
                                onChange={(e)=> setTableCapacity(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Label>Availability</Form.Label>
                        <Form.Select onChange={(e) => setTableStatus(e.target.value)}>
                            {statusOptions.map((status) => {
                                return status.value === table.status ? 
                                    <option selected value={status.value}>{status.label}</option>
                                :
                                    <option value={status.value}>{status.label}</option>
                            })}
                        </Form.Select>
                        <Button type="submit">Save</Button>
                    </Form>
                </Tab>
            })}
        {/*<div>
        <p>hello</p>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Table name</th>
                    <th>Capacity</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {table.map((table) => {
                    return <tr key={table.id}>
                        <td>{table.id}</td>
                        <td>{table.name}</td>
                        <td>{table.capacity}</td>
                        <td>{table.status}</td>
                    </tr>
                })}
            </tbody>
        </table>
            </div>*/}
        </Tabs>
    )
}
export default Table;

