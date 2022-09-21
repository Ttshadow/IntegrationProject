 import { Form } from "react-bootstrap";

 export default function Profile(){
    return(
        <>
        <br/ >
            <h3>Profile Page</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formGroupFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter first name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter last name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupTel">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="password" placeholder="Enter phone number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="password" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>
        </>
    )
}