 import { Form, Button, Col, Row, Alert, Modal } from "react-bootstrap";
 import useLocalStorage from "../../util/useLocalStorage";
 import React, { useState, useRef, useEffect} from "react";
 import { useNavigate } from 'react-router-dom';

 export default function Profile(){
    const [jwt,setJwt] = useLocalStorage("","jwt");
    const [userId, setUserId] = useLocalStorage("","userId");
    const [user, setUser] = useState({id: userId, firstName: "", lastName: "", email: "", tel: "", password:"", image: ""});
    const fNameRef = useRef("");
    const lNameRef = useRef("");
    const emailRef = useRef("");
    const telRef = useRef("");
    const passRef = useRef("");
    const cPassRef = useRef("");
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState('');
    const [imageChange, setImageChange] = useState(false);
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => {setModalShow(false); setPwdError("")}
    const handleShow = () => setModalShow(true);
    const [pwdError, setPwdError] = useState("");
    const [passError, setPassError] = useState("");
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})');

    let id = Number(localStorage.getItem('userId'));
    useEffect(() =>{
        fetch('/userdashboard/'+ id, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data)=> data.json())
        .then((json)=> {
            //console.log(json)
            setUser(JSON.parse(JSON.stringify(json)))
        });
    }, []);

    let imageSrc = user.image;
    async function saveProfile (e) {
        e.preventDefault();
        if(imageChange){
            await uploadImage();
        }
            fetch('/userdashboard/edituser', {
                method: 'PUT',
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
                        //password: passRef.current.value,
                        image: imageSrc,
                })
            })
            .then((response) => {
                if (response.status === 200) {
                    navigate('/userdashboard/profile');
                } else {
                    return response.text();
                }
            })
            .then((text) =>{
                setErrorMessage(text);
                setShow(true);
            })
    }

    function editPassword (e) {
        e.preventDefault();
        if(pwdError==="" && passError === ""){
            // setPwdError("");
            // setPassError("");
            setShow(false);
        fetch('/userdashboard/editdetail', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                id: userId,
                password: passRef.current.value,
            })
        })    
            .then((response) => {
                if (response.status === 200) {
                    setModalShow(false);
                    navigate('/userdashboard/profile');
                }else{
                    return response.text();
                }
            }).then((text) =>{
                setPwdError(text);
            })
        }
        // else{
        //     setPwdError("Password should contain at least one upper case character, one numeric character, one special character, and must be 6 characters or longer, and can not be empty.");
        // }
    }
    const PwdValidator = () =>{
        if(!passwordRegex.test(passRef.current.value)){
            setPwdError("Password should contain at least one upper case character, one numeric character, one special character, and must be 6 characters or longer, and can not be empty.");
        }else{
            setPwdError("");
        }
    }

    const cPassCheck = () =>{
        if(cPassRef.current.value !== passRef.current.value){
            setPassError("Password did not match!");
        }else{
            setPassError("");
        }
    }

    async function uploadImage(e){
        const formData = new FormData();
        formData.append("file", userImage);
        formData.append("upload_preset", "lbxauk4n");
        await fetch('https://api.cloudinary.com/v1_1/dmncdxm4z/image/upload',{
            method: 'POST',
            body: formData,
        })
        .then(response=>response.json())
        .then((json)=>{
            imageSrc = json.secure_url;
        })
    }

    return(
        <>
        <br/ >
            <h3>Edit Profile</h3>
            <Form onSubmit={saveProfile}>
            <Alert show={show} variant="danger">{errorMessage}</Alert>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGroupFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" defaultValue={user.firstName} ref={fNameRef} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGroupLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" defaultValue={user.lastName} ref={lNameRef} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGroupTel">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={user.tel} ref={telRef} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" defaultValue={user.email} ref={emailRef} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGroupImage">
                    <Form.Label>Image</Form.Label>
                    <div className="mb-2">
                        <img src={user.image} width="200" alt="" />
                    </div>
                    <Form.Control type="file" defaultValue={user.image} onChange={(e)=>{setUserImage(e.target.files[0]); setImageChange(true)}} />
                </Form.Group>
                <Button type="submit" variant="warning">Update Profile</Button>
                
            </Form>
            <Button type="submit" variant="success" onClick={handleShow}>Update Password</Button>

            {/* Password modal starts here */}
            <Modal show={modalShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passRef} onChange={PwdValidator} />
                        <p className='text-danger' defaultValue={''}>{pwdError}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Confirmed Password</Form.Label>
                    <Form.Control type="password" ref={cPassRef} onChange={cPassCheck} />
                    <p className='text-danger' defaultValue={''}>{passError}</p>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={editPassword}>Update</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}