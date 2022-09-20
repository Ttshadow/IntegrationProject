import { Form, Button, Alert } from 'react-bootstrap';
import React, { useState, useRef} from "react";
import {useNavigate} from 'react-router-dom';
import useLocalStorage from "../../util/useLocalStorage";

function LeaveComment() {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    const [comment, setComment] = useState({
        user_id: "",
        content: "",
    });
    const inputComment = useRef("");
    const navigate = useNavigate();

    
    // const[validate, setValidate] = useState();
    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if(form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     setValidate(true);
    // }

    const addComment = async() => {
        
        fetch('/userdashboard/review', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                user_id: 2,
                content: inputComment.current.value,
            })
        })     
        if(Response.status !== 200){
            throw new Error(`Request failed`);
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            await addComment();
            console.log(comment.content);
            <Alert variant="success">Comment added successfully!</Alert>
            setComment(comment);
        }catch(e){
            alert(`Failed to add comment$(e.message)`);
        }
    }
    return (
        <>
        <br/>
        {/* noValidate validated={validate} onSubmit={handleSubmit} */}
            <Form style={{border: "ridge", padding:"20px"}}>
                
                <Form.Group className="mb-3" controlId="validateText">
                    <Form.Label><h4>Please leave your comments:</h4></Form.Label>
                    <Form.Control as="textarea" rows={5} ref={inputComment} required />
                    {/* <Form.Control.Feedback type="invalid">
                        Empty Comment! Please leave your comments.
                    </Form.Control.Feedback> */}
                </Form.Group>
                <Button type="submit" variant='primary' onClick={onSubmit}>Submit</Button>
            </Form>
        </>
    )
}
export default LeaveComment;