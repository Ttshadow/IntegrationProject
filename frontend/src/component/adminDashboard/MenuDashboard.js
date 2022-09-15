import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';


export function MenuDashboard(){

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        fetch('category', {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setCategories(json)})
    }, [])

    function navigateToNewCategory(){
        navigate('/newCategory')
    }

    return (
        <div>
            <Form.Select>
                {categories?.map((category)=>{
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </Form.Select>
            <Button variant="primary" onClick={navigateToNewCategory}>
                New Category
            </Button>
        
        </div>
    )
}