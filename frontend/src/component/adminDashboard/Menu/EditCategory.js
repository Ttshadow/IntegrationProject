import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import useLocalStorage from '../../../util/useLocalStorage';


export function EditCategory(){
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const {id} = useParams();
    const [category, setCategory] = useState({id:'', name:''});
    const categoryNameRef = useRef();
    const navigate = useNavigate();

    function saveCategory(e){
        e.preventDefault();
        fetch('../category/edit_category',{
            method:'PUT',
            body: JSON.stringify({
                id : id,
                name: categoryNameRef.current.value,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${jwt}`
              },
            })
              .then((data) => data.json())
              .then(navigate('../menuDashboard'))
    }

    useEffect(() => {
      fetch(`../category/${id}`, {
        method:'GET',
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then((data) => data.json())
      .then((json) => {setCategory(json)})
    }, [])


    return (
        <div className='col-6'>
          <h2>Edit A Category</h2>
          <hr></hr>
            <Form onSubmit={saveCategory}>
                <Form.Group className="mb-3" >
                    <Form.Label >ID</Form.Label>
                    <Form.Control type="text" value={category.id} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label >Name</Form.Label>
                  <Form.Control type="text" defaultValue={category.name} ref={categoryNameRef}/>
                </Form.Group>
                <Button type="submit" variant="warning" className="mt-3 mb-3">Save</Button>
            </Form>
        </div>
    )
}
