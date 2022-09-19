import { Form, Tab, Tabs } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import EditTable from './EditTable';
import EditAllStatus from './EditAllStatus';

function Table() {
    const [table, setTable] = useState([]);
    const [id, setTableId] = useState(null);
    const [name, setTableName] = useState('');
    const [capacity, setTableCapacity] = useState(0);
    const [status, setTableStatus] = useState('');
    
    const allTable = () => {
        fetch('diningtable', {
          method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setTable(JSON.parse(JSON.stringify(json)))})
    };

    useEffect(() =>{
        allTable();
    }, []);

    return (
        <>
        <Tabs
            transition={false}
            className="mb-3"
        >
        {table.map((table, index) => {
            return (
                <Tab key={index} eventKey={index} title={table.name}>
                    <Form noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                disabled 
                                type="text" 
                                defaultValue={table.name}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control  
                                disabled
                                type="number"
                                defaultValue={table.capacity}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Current Status</Form.Label>
                            <Form.Control  
                                disabled
                                type="text"
                                defaultValue={table.status}
                            />
                        </Form.Group>
                        <EditTable tableName={table.name} table={table} ></EditTable>
                    </Form>
                    
                </Tab>
            )})}
        </Tabs>
        <EditAllStatus></EditAllStatus>
        </>
    )
}
export default Table;

