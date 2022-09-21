import { Form, Button, Alert } from 'react-bootstrap';
import React, { useState, useRef} from "react";
import useLocalStorage from "../../util/useLocalStorage";
import moment from 'moment';
import { useNavigate } from "react-router-dom";


function LeaveComment() {
    const [jwt,setJwt] = useLocalStorage("","jwt");
    const dateCreate = Date.now(); 
    const commentRef = useRef("");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    
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
        }).then((data)=>{
            if(data.status === 200){
                setShow(true);
            }else{
                return data.text();
            }            
        })
        .then((text) =>{
            setErrorMessage(text);
        })
        // .then(()=>{
        //     navigate("/");
        // })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
            addComment();
            console.log(moment(dateCreate).toDate());
            console.log(commentRef);
    }

    const backClick = (event) => {
        event.preventDefault();
        navigate("/");
    }
    return (
        <>
        <br/>

        {/* noValidate validated={validate} onSubmit={handleSubmit} */}
            <Alert show={show} variant="success">Comment added successfully!</Alert>
            <Form style={{border: "ridge", padding:"20px"}}>
                
                <Form.Group className="mb-3" controlId="validateText">
                    <Form.Label><h4>Please leave your comments:</h4></Form.Label>
                    <Form.Control as="textarea" rows={5} ref={commentRef} required />
                    {/* <Form.Control.Feedback type="invalid">
                        Empty Comment! Please leave your comments.
                    </Form.Control.Feedback> */}
                    <p className='text-danger' defaultValue={''}>{errorMessage}</p>
                </Form.Group>
                <Button type="submit" variant='warning' onClick={onSubmit}>Submit</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant='success' onClick={backClick}>Back to Home</Button>
            </Form>
        </>
    )
}
export default LeaveComment;