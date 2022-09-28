import React from "react";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import useLocalStorage from "../../util/useLocalStorage";
import 'react-toastify/dist/ReactToastify.css';


export function MenuCardGroup(props){
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const selectCategory = props.selectCategory;
    const [menus, setMenus] = useState();
    const [quantity, setQuantity] = useState(1);
    const userId = localStorage.getItem('userId');

    useEffect(()=>{
        let url = '';
        if (selectCategory === 0){
            url = '/admindashboard/menu/available_menu'
        }
        else{
            url = `/admindashboard/menu/available_by_category/${selectCategory}`
        }
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data) => data.json())
        .then((json) => {setMenus(json)})
    },[])

    function addToCart(menu){
        fetch('/cart/add_to_cart', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    id: userId,
                },
                table: {
                    id: Number(sessionStorage.getItem("table"))
                },
                takeout: sessionStorage.getItem('isTakeout') === 'true'? true: false,
                menu: {
                    id: menu.id
                },
                quantity: quantity
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`            
            }, 
        })
        .then(()=>{
            toast.success("Added to your cart.")
        })
    }
    return (
        <>
        <ToastContainer hideProgressBar={true} theme="colored" position="top-center" autoClose={1000} closeOnClick />

    <Row xs={1} md={4} className="g-4">

    {
        menus?.map((menu)=>{
            return <Col key={menu.id} >
            <Card className= "h-100 w-75">
            <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <Card.Img src={menu.image} className=""/>
            </Card.Body>
            <Card.Footer className="d-flex">
                quantity: <Form.Control size="sm" className="ms-auto me-1" type="number" defaultValue={1} onChange={(e)=>{setQuantity(e.target.value)}}></Form.Control>
                {sessionStorage.getItem("isTakeout") === 'true'? <Card.Text className="mx-2">${menu.price}</Card.Text>: ``}
                <Button className="btn-sm" variant="outline-primary" onClick={()=>addToCart(menu)}>Add</Button>
            </Card.Footer>
            </Card>
            </Col>     
        })
    }
    
        </Row>
        
        </>)}