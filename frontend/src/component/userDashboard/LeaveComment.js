import { Form, Button, Alert } from 'react-bootstrap';
import React, { useState, useRef} from "react";
import useLocalStorage from "../../util/useLocalStorage";
import moment from 'moment';



function LeaveComment() {
    const [jwt,setJwt] = useLocalStorage("","jwt");
    //const [userId,setUserId] = useLocalStorage('','userId');
    const dateCreate = Date.now(); 
    const commentRef = useRef("");
    

    
    // const[validate, setValidate] = useState();
    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if(form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     setValidate(true);
    // }

    const addComment = () => {
        
        fetch('/userdashboard/review', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                user: {id: localStorage.getItem('userId')},
                content: commentRef.current.value,
                createDate: moment(dateCreate).toDate(),
            })
        }).then(()=>{
            alert('success');
        })     
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
            addComment();
            console.log(moment(dateCreate).toDate());
            console.log(commentRef);
            //<Alert variant="success">Comment added successfully!</Alert>
            
        
    }
    return (
        <>
        <br/>
        {/* noValidate validated={validate} onSubmit={handleSubmit} */}
            <Form style={{border: "ridge", padding:"20px"}}>
                
                <Form.Group className="mb-3" controlId="validateText">
                    <Form.Label><h4>Please leave your comments:</h4></Form.Label>
                    <Form.Control as="textarea" rows={5} ref={commentRef} required />
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