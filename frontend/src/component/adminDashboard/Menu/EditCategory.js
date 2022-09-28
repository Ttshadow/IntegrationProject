import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import useLocalStorage from '../../../util/useLocalStorage';


export function EditCategory(){
    // const [validated, setValidated] = useState(false);
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const {id} = useParams();
    const [category, setCategory] = useState({id:'', name:''});
    const categoryNameRef = useRef();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    function saveCategory(e){
        e.preventDefault();
        if(categoryNameRef.current.value === ""){
          setErrorMessage("Please enter a category name.");
        }
        else{
          setErrorMessage("");
          fetch('/admindashboard/category/edit_category',{
              method:'PUT',
              body: JSON.stringify({
                  id : id,
                  name: categoryNameRef.current.value,
                }),
                headers: {
                  'Accept': 'application/json',
                  "Content-type": "application/json; charset=UTF-8",
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
    }

      useEffect(() => {
        fetch(`/admindashboard/category/${id}`, {
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
                  <p className='text-danger' defaultValue={''}>{errorMessage}</p>
                </Form.Group>
                <Button type="submit" variant="warning" className="mt-3 mb-3">Save</Button>
            </Form>
        </div>
    )
}
