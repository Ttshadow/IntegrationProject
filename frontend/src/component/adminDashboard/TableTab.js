/*import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
function TableTab({children}){
    const [activeTab, setActiveTab] = useState(children[0].props.name);
    const handleTabSelect = (id, index) => {
        fetch('diningtable/'+id, {
            method: 'GET',
          })
          .then((data) => data.json())
          .then((json) => {setTableName(JSON.parse(JSON.stringify(json.name)))})
          .then((json) => {setTableCapacity(JSON.parse(JSON.stringify(json.capacity)))})
          .then((json) => {setTableStatus(JSON.parse(JSON.stringify(json.status)))})
    };
    return <Tabs
    transition={false}
    className="mb-3"
    >
    {children.map((tab) => {
        if()
    return (
        <Tab key={tab.props.name} eventKey={tab.props.name} title={tab.props.name} >
            <Form noValidate validated={validated} onSubmit={handleSubmit(table.id)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required 
                        type="text" 
                        placeholder="Name of the table"
                        defaultValue={tab.props.name}
                        onChange={(e)=> setTableName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control  
                        required
                        type="number"
                        placeholder="Number of seats"
                        defaultValue={tab.props.capacity}
                        onChange={(e)=> setTableCapacity(e.target.value)}
                    />
                </Form.Group>
                <Form.Label>Availability</Form.Label>
                <Form.Select onChange={(e) => setTableStatus(e.target.value)}>
                    {statusOptions.map((status) => {
                        return status.value === table.status ? 
                            <option defaultValue={status.value}>{status.label}</option>
                        :
                            <option value={status.value}>{status.label}</option>
                    })}
                </Form.Select>
                <Button type="submit">Save</Button>
            </Form>
            id: {table.id}
            name: {name}
            capa: {capacity}
            status: {status}
        </Tab>
        
    )})}
</Tabs>
}

export default TableTab;*/