import React, {useEffect, useRef} from 'react';
import {Form , Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function NewCategory(){
    const nameRef = useRef();
    const navigate = useNavigate();

    function addCategory(event){
        event.preventDefault();
        fetch('category/add_category', {
            method:"POST",
            body: JSON.stringify({    
                name: nameRef.current.value,
           }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'            }, 
        })
        .then((data) => {
            if(data.status == 200){
                navigate('../menuDashboard');
            } 
        })        
    }

    return(
        <div>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" ref={nameRef}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addCategory}>
                Submit
            </Button>
            </Form>
        </div>
    )
}
export default NewCategory;