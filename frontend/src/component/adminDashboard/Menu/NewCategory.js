import React, {useEffect, useRef, useState} from 'react';
import {Form , Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import useLocalStorage from '../../../util/useLocalStorage';

// export const checkStatus = response => {
//     const hasError = (response.status < 200 || response.status >= 300)
//     if (hasError) {
//       throw response.json();
//     }
//     return response
//   }
function NewCategory(){
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const nameRef = useRef();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    function addCategory(event){
        event.preventDefault();
        fetch('/admindashboard/category/add_category', {
            method:"POST",
            body: JSON.stringify({    
                name: nameRef.current.value,
           }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }, 
        })
        .then((data) => {
            if(data.status === 200){
            navigate('../menuDashboard');}
            else{
                return data.text();
            }
        })
        .then((text)=>{
              setErrorMessage(text);
        })

    }

    return(
        <div className='col-6'>
            <div >
            <h2>Add A New Category</h2>
            <hr/>
            </div>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" ref={nameRef}/>
                <Form.Text className="text-muted">
                </Form.Text>
                <p className='text-danger' defaultValue={''}>{errorMessage}</p>
            </Form.Group>
            <Button variant="warning" type="submit" onClick={addCategory}>
                Submit
            </Button>
            </Form>
        </div>
    )
}
export default NewCategory;