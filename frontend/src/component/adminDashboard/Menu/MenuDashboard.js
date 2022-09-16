import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';

export function MenuDashboard(){

    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        fetch('category', {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setCategories(json)})
    }, [refresh])

    useEffect(()=>{
        fetch('menu', {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setMenus(json)})
    },[refresh])

    function navigateToNewCategory(){
        navigate('../newCategory')
    }
    function navigateToEditCategory(event){ 
        navigate(`../editCategory/${selectCategory}`);
    }
    function handleChange(e){
        console.log(e.target.value)
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

    function changeStatus(){
        
    }
    
    return (
        <>
        <div>
            <Form.Select onChange={handleChange}>
                <option key={0} >Select a Category</option>
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
                            <Form.Select size='sm' defaultValue={menu.status}>
                                <option>Available</option>     
                                <option>SoldOut</option>              
                            </Form.Select>
                            <Button variant='outline-primary' className='btn-sm ms-auto mt-1' onClick={changeStatus}>Change Status</Button></td>
                            <td>{menu.category.name}</td>
                            <td><Button onClick={()=>handleShow(menu)} className='mx-2'>Edit</Button>
                            <Button className='mx-2' onClick={()=>deleteMenu(menu.id)}>Delete</Button></td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <div>
            {/* <EditMenuModal show={showModal} onHide={() => setShowModal(false)} selectMenu={selectMenu} ></EditMenuModal> */}
        </div>
        </div>
        </>
        
    )
}