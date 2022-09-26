import { Form } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import useLocalStorage from "../../util/useLocalStorage";

function ReservationStatusOption(props) {
    const [status, setStatus] = useState(props.status);
    const [tables, setTables] = useState([]);
    const [jwt,setJwt] = useLocalStorage("","jwt")
    let statusOptions = 
            tables.length > 0 ? 
            [
                {value: 'confirmed'},
                {value: 'pending'},
                {value: 'rejected'}
            ]
            :
            [
                {value: 'pending'},
                {value: 'rejected'}
            ]
    ;

    
    const reservationStatus = () => {
        const dto = {startTime: props.startTime, endTime: props.endTime, numberOfParty: props.numberOfParty};
        fetch('/admindashboard/reservation/tables', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(dto)
        })
        .then((data) => data.json())
        .then((json) => {setTables(JSON.parse(JSON.stringify(json)))})
    };

    useEffect(() =>{
        reservationStatus();
    }, []);


    return (
    <>
        <Form.Group className="mb-3">
            <Form.Label>Reservation status</Form.Label>
            <Form.Select onChange={(e) => {props.setStatus(e.target.value); setStatus(e.target.value);}}>
                {statusOptions.map((option, index) => {
                    return option.value === status ? 
                        <option key={index} defaultValue={option.value}>{option.value}</option>
                    :
                        <option key={index} value={option.value}>{option.value}</option>
                })}
                
            </Form.Select>
        </Form.Group>
            <Form.Group className="mb-3">

            <Form.Label>Assign a table</Form.Label>
            <Form.Select onChange={(e) => props.setTable(e.target.value)}>
                {tables.length > 0 ? 
                    tables.map((table, index) => {
                        return <option key={index} value={table.id} disabled={status === 'confirmed' ? null : true}>{table.name}</option>
                    })
                    :
                    <option value={2}>No table available</option>
                }
            </Form.Select>
        </Form.Group>
        
        {status}
    </>
    )
};
export default ReservationStatusOption;