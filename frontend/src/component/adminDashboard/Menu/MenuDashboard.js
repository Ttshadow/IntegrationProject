import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import useLocalStorage from '../../../util/useLocalStorage';

export const cloudName = "ddz01pm2r";
export function MenuDashboard(){
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [menus, setMenus] = useState([]);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    //fetch to get all the catogires from the db.
    useEffect(() =>{
        fetch('/admindashboard/category', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data) => data.json())
        .then((json) => {setCategories(json)})
    }, [refresh])

    //fetch menu depending on the category, or fetch all menus.
    useEffect(()=>{
        let url = '';
        if (selectCategory == 0){
            url = '/admindashboard/menu'
        }
        else{
            url = `/admindashboard/menu/category/${selectCategory}`
        }
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data) => data.json())
        .then((json) => {setMenus(json)})
    },[refresh, selectCategory])

    function navigateToNewCategory(){
        navigate('../newCategory')
    }
    function navigateToEditCategory(event){ 
        if(selectCategory == 0){
            alert("Please select a category that you want to edit.")
        }
        else{
            navigate(`../editCategory/${selectCategory}`);
        }
    }

    // user select different category.
    function handleChange(e){
        // console.log(e.target.value);
        setSelectCategory(e.target.value);
    }

    function deleteCategory(){
        if(selectCategory == 0){
            alert("Please select a category that you want to delete.")
        }
        else{
            fetch(`/admindashboard/category/${selectCategory}`, 
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then((data)=>{
                if(data.status === 200){
                    alert("Category Delete Successfully!");
                }
            })
            .then(()=>{
                setSelectCategory(0);
                setRefresh(true);
            })
        }
    }

    function deleteMenu(id){
        fetch(`/admindashboard/menu/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data)=>{
            if(data.status === 200){
                alert("Dish Delete Successfully!");
            }
        })
        .then(()=>{
            setRefresh(true);
        })
        
    }

    function navigateToNewMenu(){
        navigate('../newMenu');
    }

    function handleShow(menu){
        navigate(`../editMenu/${menu.id}`)
    }


    useEffect(()=>{
        setRefresh(false)
    },[menus, categories])

    // handle on change for menu status.
    function selectStatus(e){
        setStatus(e.target.value);
    }
    // change menu status
    function changeStatus(id){
        fetch(`/admindashboard/menu/status/${id}`, {
            method: 'PUT',
            body: status,
            headers: {
            "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${jwt}`
            },
        })
        .then((data)=>{
            if(data.status === 200){
                alert("Dish Status Update Successfully!");
            }
        })
    }
    
    return (
        <>
        <div>
            <Form.Select onChange={handleChange} >
                <option value={0} >Select a Category</option>
                {categories?.map((category)=>{
                    return <option key={category.id} defaultValue={category.id} value={category.id}>{category.name}</option>
                })}
            </Form.Select>
            <div className='my-3 d-flex'>
                <Button className='mx-2' variant="outline-primary" onClick={navigateToNewCategory}>
                    New Category
                </Button>
                <Button className='mx-2' variant="outline-secondary" onClick={navigateToEditCategory}>
                    Edit Category
                </Button>
                <Button className='mx-2' variant="outline-danger" onClick={deleteCategory}>
                    Delete Category
                </Button>
                <Button className='mx-2' variant="info text-light ms-auto" onClick={navigateToNewMenu}>
                    Add A New Dish
                </Button>
            </div>
            
        </div>
        <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Dish</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    menus?.map((menu)=>{
                        return <tr key={menu.id}>
                            <td><img alt='' src={menu.image} width="90"></img></td>
                            <td>{menu.name}</td>
                            <td>{menu.description}</td>
                            <td>{menu.price}</td>
                            <td>
                                <div className='row'>
                                    <div className='col-7'>
                                        <Form.Select size='sm' defaultValue={menu.status} onChange={selectStatus} >
                                            <option>Available</option>     
                                            <option>SoldOut</option>              
                                        </Form.Select>
                                    </div>
                                    <div className='col-5'>
                                        <Button variant='outline-primary' className='btn-sm' onClick={()=>changeStatus(menu.id)}>Update</Button>
                                    </div>
                                </div>
                                </td>
                            <td>{menu.category.name}</td>
                            <td><Button variant='outline-secondary' onClick={()=>handleShow(menu)} className='me-1 btn-sm'>Edit</Button>
                            <Button className='btn-sm' variant='outline-danger' onClick={()=>deleteMenu(menu.id)}>Delete</Button></td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        </div>
        </>
        
    )
}