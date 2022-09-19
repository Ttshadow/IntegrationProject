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
                {value: 'occupied'}
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
    /*if (status === 'available') { 
        statusOptions = [
            {value: 'available'},
            {value: 'occupied'},
            {value: 'unavailable'}
        ];
    };
    if (status === 'occupied') {
        statusOptions = [
            {value: 'occupied'}
        ];
     };
    if (status === 'reserved') {
        statusOptions = [
            {value: 'reserved'},
            {value: 'available'},
            {value: 'occupied'},
            {value: 'unavailable'}
        ];
     };
    if (status === 'unavailable') {
        statusOptions = [
            {value: 'unavailable'},
            {value: 'available'}
        ];
     };*/
    return (
    <Form.Select onChange={(e) => props.setTableStatus(e.target.value)}>
        {statusOptions.map((option, index) => {
            return option.value === status ? 
                <option key={index} defaultValue={option.value}>{option.value}</option>
            :
                <option key={index} value={option.value}>{option.value}</option>
        })}
    </Form.Select>
    )
};
export default TableStatusOption;