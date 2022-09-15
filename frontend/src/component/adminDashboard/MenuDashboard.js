import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';


export function MenuDashboard(){

    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        fetch('category', {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setCategories(json)})
    }, [refresh])

    function navigateToNewCategory(){
        navigate('../newCategory')
    }
    function navigateToEditCategory(event){ 
        navigate(`../editCategory/${selectCategory}`);
    }
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

    return (
        <div>
            <Form.Select onChange={handleChange}>
                <option key={0} >Select a Category</option>
                {categories?.map((category)=>{
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </Form.Select>
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
    )
}