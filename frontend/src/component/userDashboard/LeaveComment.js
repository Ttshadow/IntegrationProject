import { Form, Button } from 'react-bootstrap';
import React, { useState } from "react";

function LeaveComment() {

    

    const[validate, setValidate] = useState();
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidate(true);
    }

    return (
        <>
        <br/>
            <Form noValidate validated={validate} onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="validateText">
                    <Form.Label><h4>Please leave your comments:</h4></Form.Label>
                    <Form.Control as="textarea" rows={5} required />
                    <Form.Control.Feedback type="invalid">
                        Empty Comment! Please leave your comments.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="btn btn-primary">Submit</Button>
            </Form>
        </>
    )
}
export default LeaveComment;