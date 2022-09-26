 import { Form, Button } from "react-bootstrap";
 import useLocalStorage from "../../util/useLocalStorage";
 import React, { useState, useRef, useEffect} from "react";
 import { useNavigate } from 'react-router-dom';

 export default function Profile(){
    const [jwt,setJwt] = useLocalStorage("","jwt");
    const [userId, setUserId] = useLocalStorage("","userId");
    const [user, setUser] = useState({id: userId, firstName: "", lastName: "", email: "", tel: "", password: ""});
    const fNameRef = useRef("");
    const lNameRef = useRef("");
    const emailRef = useRef("");
    const telRef = useRef("");
    const passRef = useRef("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState('');
    const [imageChange, setImageChange] = useState(false);

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
                setErrorMessage("");
            }
        })
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
                <Form.Group className="mb-3" controlId="formGroupFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" defaultValue={user.firstName} ref={fNameRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" defaultValue={user.lastName} ref={lNameRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupTel">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" defaultValue={user.tel} ref={telRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue={user.email} ref={emailRef} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" ref={passRef} />
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formGroupImage">
                    <Form.Label>Image</Form.Label>
                    <div>
                        <img src={user.image} width="200" alt="" />
                    </div>
                    <Form.Control type="file" defaultValue={user.image} onChange={(e)=>{setUserImage(e.target.files[0]); setImageChange(true)}} />
                </Form.Group>
                <Button type="submit" variant="warning">Update Profile</Button>
            </Form>
        </>
    )
}