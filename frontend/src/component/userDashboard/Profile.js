 import { Form, Button } from "react-bootstrap";
 import useLocalStorage from "../../util/useLocalStorage";
 import React, { useState, useRef} from "react";

 export default function Profile(){
    const [jwt,setJwt] = useLocalStorage("","jwt");
    const [userId, setUserId] = useLocalStorage("","userId");
    const fNameRef = useRef("");
    const lNameRef = useRef("");
    const emailRef = useRef("");
    const telRef = useRef("");

    const saveProfile = ()=>{
        fetch('/userdashboard/edituser', {
            method: 'POST',
            headers:{
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({              
                    id: userId,
                    firstName: fNameRef.current.value,
                    lastName: lNameRef.current.value,
                    email: emailRef.current.value,
                    tel: telRef.current.value,               
            })
        })
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        saveProfile();
    }
    return(
        <>
        <br/ >
            <h3>Profile Page</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formGroupFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" ref={fNameRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" ref={lNameRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupTel">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" ref={telRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
                </Form.Group>
                <Button type="submit" variant="warning" onClick={onSubmit}>Update Profile</Button>
            </Form>
        </>
    )
}