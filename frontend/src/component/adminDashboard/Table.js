import { Form, Tab, Tabs } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import EditTable from './EditTable';
import useLocalStorage from "../../util/useLocalStorage";

function Table() {
    const [table, setTable] = useState([]);
    const [id, setTableId] = useState(null);
    const [name, setTableName] = useState('');
    const [capacity, setTableCapacity] = useState(0);
    const [status, setTableStatus] = useState('');
    const [jwt,setJwt] = useLocalStorage("","jwt")
    
    const allTable = () => {
        fetch('diningtable', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
        },
        })
        .then((data) => data.json())
        .then((json) => {setTable(JSON.parse(JSON.stringify(json)))})
    };

    useEffect(() =>{
        allTable();
    }, []);

    return (
        <div id="tab">
        <Tabs
            transition={false}
        >
        {table.filter(t => t.id !== 1 && t.id !== 2).map((table, index) => {
            return (
                <Tab key={index} eventKey={index} title={table.name}>
                    <Form id="tab-content" noValidate>
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
                        <div className="align-self-end">
                        <EditTable tableName={table.name} table={table} ></EditTable>
                        </div>
                    </Form>
                    
                </Tab>
            )})}
        </Tabs>
        
        </div>
    )
}
export default Table;

