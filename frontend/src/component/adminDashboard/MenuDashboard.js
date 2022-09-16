import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';

export function MenuDashboard(){

    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [selectMenu, setSelectMenu] = useState();
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

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
    },[])

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
    function handleShow(menu){
        setSelectMenu(menu);
        setShowModal(true);
        navigate(`../editMenu/${menu.id}`)
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
                            <td>{menu.status}</td>
                            <td>{menu.category.name}</td>
                            <td><Button onClick={()=>handleShow(menu)} className='mx-2'>Edit</Button><Button className='mx-2'>Delete</Button></td>
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