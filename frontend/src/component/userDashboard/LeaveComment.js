import { Form, Button, Alert } from 'react-bootstrap';
import React, { useState, useNavigate } from "react";

function LeaveComment() {
    const [comment, setComment] = useState(null);
    //const navigate = useNavigate();

    
    const[validate, setValidate] = useState();
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidate(true);
    }

    const addComment = async() => {
        fetch('/userdashboard/review', {
            method: 'post',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        if(Response.status !== 200){
            throw new Error(`Request failed: ${Response.status}`);
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            await addComment();
            Alert.success('Comment added successfully');
            setComment(comment);
        }catch(e){
            Alert.error('Failed to add comment');
        }
    }
    return (
        <>
        <br/>
            <Form noValidate validated={validate} onSubmit={handleSubmit} style={{border: "ridge", padding:"20px"}}>
                
                <Form.Group className="mb-3" controlId="validateText">
                    <Form.Label><h4>Please leave your comments:</h4></Form.Label>
                    <Form.Control as="textarea" rows={5} required />
                    <Form.Control.Feedback type="invalid">
                        Empty Comment! Please leave your comments.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant='primary' onClick={onSubmit}>Submit</Button>
            </Form>
        </>
    )
}
export default LeaveComment;