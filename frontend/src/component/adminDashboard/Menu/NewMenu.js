import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../util/useLocalStorage";
import { UseFetchCategories } from "./UseFetchCategories";

function NewMenu(){

    const categories = UseFetchCategories('/admindashboard/category');
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const nameRef = useRef();
    const descriptionRef = useRef();
    const [selectImage, setSelectImage] = useState('');
    const priceRef = useRef();
    const statusRef = useRef();
    const [categoryId, setCategoryId] = useState(0);
    let imageSrc = '';
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const saveMenu = async (e) => {
        e.preventDefault();
        if(nameRef.current.value === ""){
            setErrorMessage("Please enter a name for the dish.")
        }
        else if(categoryId == 0){
            setErrorMessage("Please select a category.")
        }
        else{
            setErrorMessage("");
            await uploadImage();
            await fetch('/admindashboard/menu/add_menu',{
                method: 'POST',
                body: JSON.stringify({    
                    name: nameRef.current.value,
                    description: descriptionRef.current.value,
                    price: priceRef.current.value,
                    category: 
                    {
                        id: categoryId,
                    },
                    image: imageSrc,
                    status: statusRef.current.value
            }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
    
                }
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
            })}
    }

    function handleChange(e){
        setCategoryId(e.target.value);
        if(categoryId != 0){
            setErrorMessage("");
        }
    }

    async function uploadImage(){
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
    return (
        <div>
            <h2>Add A New Dish</h2>
            <hr/>
            <Form>
                <Form.Group className="mb-3" hidden>
                    <Form.Label >ID</Form.Label>
                    <Form.Control type="text" />
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
                    <Form.Control type="file" onChange={(event)=>{setSelectImage(event.target.files[0])}}/>
                </Form.Group>
                <p className='text-danger' defaultValue={''}>{errorMessage}</p>
                <Button type="submit" variant="warning" className="mt-3 mb-3" onClick={saveMenu}>Save</Button>
            </Form>
        </div>
    )
}
export default NewMenu;