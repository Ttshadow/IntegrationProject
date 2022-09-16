import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export function EditMenu(){
    const {id} = useParams();
    const [menu, setMenu] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const priceRef = useRef();
    const navigate = useNavigate();

    function saveMenu(e){
        e.preventDefault();
        fetch('../menu/edit_menu',{
            method:'PUT',
            body: JSON.stringify({
                id : id,
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
                category: 
                {
                    id: categoryId,
                }
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((data) => data.json())
              .then(navigate('../menuDashboard'))
    }
    function handleChange(e){
        setCategoryId(e.target.value);
    }
    useEffect(() => {
      fetch(`../menu/${id}`, {
        method:'GET'
      })
      .then((data) => data.json())
      .then((json) => {setMenu(json)})
    }, [])

    useEffect(() =>{
        fetch('../category', {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setCategories(json)})
    }, [])

    return (
        <div>
            <Form onSubmit={saveMenu}>
                <Form.Group className="mb-3" >
                    <Form.Label >ID</Form.Label>
                    <Form.Control type="text" value={menu.id} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label >Name</Form.Label>
                <Form.Control type="text" defaultValue={menu.name} ref={nameRef}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label >Description</Form.Label>
                <Form.Control type="text" defaultValue={menu.description} ref={descriptionRef}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label >Price</Form.Label>
                <Form.Control type="text" defaultValue={menu.price} ref={priceRef}/>
                </Form.Group>
                <Form.Select onChange={handleChange}>
                {categories?.map((category)=>{
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </Form.Select>
                <Button type="submit" variant="warning" className="mt-3 mb-3">Save</Button>
            </Form>
        </div>
        
    )
}