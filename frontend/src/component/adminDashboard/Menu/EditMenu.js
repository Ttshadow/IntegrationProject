import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { UseFetchCategories } from './UseFetchCategories';
import useLocalStorage from '../../../util/useLocalStorage';

export function EditMenu(){
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const {id} = useParams();
    const [menu, setMenu] = useState({});
    // const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(menu.category?.id);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const [selectImage, setSelectImage] = useState('');
    const priceRef = useRef();
    const [imageChange, setImageChange] = useState(false);
    const navigate = useNavigate();
    let imageSrc = menu.image;

    async function saveMenu(e){
        e.preventDefault();
        if (imageChange){
            await uploadImage();
        }
        await fetch('/admindashboard/menu/edit_menu',{
            method:'PUT',
            body: JSON.stringify({
                id : id,
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
                status: menu.status,
                image: imageSrc,
                category: 
                {
                    id: categoryId,
                }
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${jwt}`
              },
            })
              .then((data) => data.json())
              .then(navigate('../menuDashboard'))
    }

    async function uploadImage(e){
        const formData = new FormData();
        formData.append("file", selectImage);
        formData.append("upload_preset", "ql5cmmn8")
        await fetch('https://api.cloudinary.com/v1_1/ddz01pm2r/image/upload',{
            method: 'POST',
            body: formData,
        })
        .then(response=>response.json())
        .then((json)=>{
            imageSrc = json.secure_url;
        })
    }

    function handleChange(e){
        setCategoryId(e.target.value);
    }
    useEffect(() => {
      fetch(`/admindashboard/menu/${id}`, {
        method:'GET',
        headers: {
            Authorization: `Bearer ${jwt}`
          }
      })
      .then((data) => data.json())
      .then((json) => {
        setMenu(json);
    })
    }, [])

    // useEffect(() =>{
    //     fetch('../category', {
    //         method: 'GET',
    //     })
    //     .then((data) => data.json())
    //     .then((json) => {setCategories(json)})
    // }, [])
    const categories = UseFetchCategories('/admindashboard/category');
    
    useEffect(()=>{
        setCategoryId(menu.category?.id);
    },[menu])

    return (
        <div>
            <h2>Edit A Dish</h2>
            <hr />
            <Form onSubmit={saveMenu}>
                <Form.Group className="mb-3" >
                    <Form.Label >ID:</Form.Label>
                    <Form.Control type="text" defaultValue={menu.id} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label >Name:</Form.Label>
                <Form.Control type="text" defaultValue={menu.name} ref={nameRef}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label >Description:</Form.Label>
                <Form.Control type="text" defaultValue={menu.description} ref={descriptionRef}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label >Price:</Form.Label>
                <Form.Control type="text" defaultValue={menu.price} ref={priceRef}/>
                </Form.Group>
                <Form.Label >Category:</Form.Label>
                <Form.Select onChange={handleChange}>
                    {categories?.map((category)=>{
                        // return category.id === menu.category.id ?
                        // <option key={category.id} defaultValue={category.id}>{category.name}</option>
                        // :
                        // <option key={category.id} value={menu.category.id}>{category.name}</option>
                        return <option key={category.id} selected={category.id === menu.category?.id} value={category.id}>{category.name}</option>
                    })}
                </Form.Select>
                <Form.Group className="mb-3" >
                    <Form.Label >Image</Form.Label>
                    <div>
                    <img src={menu.image} width="100" alt='' />
                    </div>
                    <Form.Control type="file" defaultValue={menu.image} onChange={(e)=>{setSelectImage(e.target.files[0]); setImageChange(true)}}/>
                </Form.Group>
                <Button type="submit" variant="warning" className="mt-3 mb-3">Save</Button>
            </Form>
        </div>
        
    )
}