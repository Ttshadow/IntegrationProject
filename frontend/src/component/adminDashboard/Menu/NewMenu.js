import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { options, UseFetchCategories } from "./UseFetchCategories";

function NewMenu(){

    const categories = UseFetchCategories('category', options);

    const nameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const priceRef = useRef();
    const statusRef = useRef();
    const [categoryId, setCategoryId] = useState(0);
    const navigate = useNavigate();

    function saveMenu(e){
        e.preventDefault();
        // console.log(categoryRef.current.value);

        fetch('menu/add_menu',{
            method: 'POST',
            body: JSON.stringify({    
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                price: priceRef.current.value,
                category: 
                {
                    id: categoryId,
                },
                image: imageRef.current.value,
                status: statusRef.current.value

           }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'  
            }
        })
        .then((data) => {
            if(data.status == 200){
                navigate('../menuDashboard');
            } 
        })  
    }

    function handleChange(e){
        setCategoryId(e.target.value);
    }


    return (
        <div>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label >ID</Form.Label>
                    <Form.Control type="text"  disabled/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label >Name</Form.Label>
                    <Form.Control type="text" ref={nameRef}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label >Description</Form.Label>
                    <Form.Control type="text" ref={descriptionRef}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label >Price</Form.Label>
                    <Form.Control type="number" step="0.01" ref={priceRef}/>
                </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label >Category</Form.Label>
                    <Form.Select onChange={handleChange}>
                        <option value={0}>Select a category</option>
                        {categories?.map((category)=>{
                            return <option key={category.id} value={category.id} >{category.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label >Status</Form.Label>
                    <Form.Select ref={statusRef}>
                        <option value="Available">Available</option>
                        <option value="SoldOut">SoldOut</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label >Image</Form.Label>
                    <Form.Control type="file" onChange={(event)=>{}}/>
                </Form.Group>
                <Button type="submit" variant="warning" className="mt-3 mb-3" onClick={saveMenu}>Save</Button>
            </Form>
        </div>
    )
}
export default NewMenu;