import { Form } from "react-bootstrap";
import React, { useState } from 'react';

function TableStatusOption(props) {
    const [status, setStatus] = useState(props.status);
    let statusOptions = [{value: ''}];
    
    (() => {
        switch (status) {
          case 'available':
            statusOptions = [
                {value: 'available'},
                {value: 'occupied'},
                {value: 'unavailable'}
            ];
            break;
          case 'occupied':
            statusOptions = [
                {value: 'occupied'},
                {value: 'available'}
            ];
            break;
          case 'reserved':
            statusOptions = [
                {value: 'reserved'},
                {value: 'available'},
                {value: 'occupied'},
                {value: 'unavailable'}
            ];
            break;
          case 'unavailable':
            statusOptions = [
                {value: 'unavailable'},
                {value: 'available'}
            ];
            break;
          default:
            statusOptions = [{value: ''}];
        }
      })()

    return (<>
      <Form.Group className="mb-3">
        <Form.Label>Availability</Form.Label>
        <Form.Select onChange={(e) => props.setTableStatus(e.target.value)}>
            {statusOptions.map((option, index) => {
                return option.value === status ? 
                    <option key={index} defaultValue={option.value}>{option.value}</option>
                :
                    <option key={index} value={option.value}>{option.value}</option>
            })}
        </Form.Select>
      </Form.Group>
    </>
    )
};
export default TableStatusOption;