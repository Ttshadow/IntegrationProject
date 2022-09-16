import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';

export function MenuDashboard(){

    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [menus, setMenus] = useState([]);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    //fetch to get all the catogires from the db.
    useEffect(() =>{
        fetch('category', {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setCategories(json)})
    }, [refresh])

    //fetch menu depending on the category, or fetch all menus.
    useEffect(()=>{
        let url = '';
        if (selectCategory == 0){
            url = 'menu'
        }
        else{
            url = `menu/category/${selectCategory}`
        }
        fetch(url, {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setMenus(json)})
    },[refresh, selectCategory])

    function navigateToNewCategory(){
        navigate('../newCategory')
    }
    function navigateToEditCategory(event){ 
        navigate(`../editCategory/${selectCategory}`);
    }

    // user select different category.
    function handleChange(e){
        setSelectCategory(e.target.value);
    }

    function deleteCategory(){
        fetch(`category/${selectCategory}`, 
        {
            method: 'DELETE',
        })
        .then((data)=>{
            if(data.status == 200){
                alert("Category Delete Successfully!");
            }
        })
        .then(()=>{
            setRefresh(true);
        })
    }

    function deleteMenu(id){
        fetch(`menu/${id}`, {
            method: 'DELETE',
        })
        .then((data)=>{
            if(data.status == 200){
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
        fetch(`menu/status/${id}`, {
            method: 'PUT',
            body: status,
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((data)=>{
            if(data.status == 200){
                alert("Dish Status Update Successfully!");
            }
        })
    }
    
    return (
        <>
        <div>
            <Form.Select onChange={handleChange}>
                <option value={0} >Select a Category</option>
                {categories?.map((category)=>{
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </Form.Select>
            <div className='my-3'>
                <Button className='mx-2' variant="primary" onClick={navigateToNewCategory}>
                    New Category
                </Button>
                <Button className='mx-2' variant="secondary" onClick={navigateToEditCategory}>
                    Edit Category
                </Button>
                <Button className='mx-2' variant="danger" onClick={deleteCategory}>
                    Delete Category
                </Button>
                <Button className='mx-2' variant="info text-light" onClick={navigateToNewMenu}>
                    New Dish
                </Button>
            </div>
            
        </div>
        <div>
        <Table striped bordered hover>
            <thead>
                <tr>
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
                            <td>{menu.name}</td>
                            <td>{menu.description}</td>
                            <td>{menu.price}</td>
                            <td>
                                <div className='row'>
                                    <div className='col-6'>
                                        <Form.Select size='sm' defaultValue={menu.status} onChange={selectStatus} >
                                            <option>Available</option>     
                                            <option>SoldOut</option>              
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>
                                        <Button variant='outline-primary' className='btn-sm' onClick={()=>changeStatus(menu.id)}>Change Status</Button>
                                    </div>
                                </div>
                                </td>
                            <td>{menu.category.name}</td>
                            <td><Button variant='outline-secondary' onClick={()=>handleShow(menu)} className='mx-2 btn-sm'>Edit</Button>
                            <Button className='mx-2 btn-sm' variant='outline-danger' onClick={()=>deleteMenu(menu.id)}>Delete</Button></td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        </div>
        </>
        
    )
}