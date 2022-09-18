import React from "react";
import { useEffect, useRef, useState } from "react";
import { Button, Card, CardGroup, Col, Form, Row } from "react-bootstrap";

export function MenuCardGroup(props){

    const selectCategory = props.selectCategory;
    const [menus, setMenus] = useState();
    const quantityRef = useRef();

    useEffect(()=>{
        let url = '';
        if (selectCategory === 0){
            url = '../admindashboard/menu'
        }
        else{
            url = `../admindashboard/menu/category/${selectCategory}`
        }
        fetch(url, {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setMenus(json)})
    },[])

    function addToCart(){

    }
    return (
    <Row xs={1} md={3} className="g-4">
    {
        menus?.map((menu)=>{
            return <Col key={menu.id} >
            <Card className= "h-100 w-75">
            <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <Card.Img src={menu.image} className=""/>
            </Card.Body>
            <Card.Footer className="d-flex">
                <Form.Control size="sm" className="ms-auto me-1" type="number" defaultValue={1} ref={quantityRef}></Form.Control>
                {sessionStorage.getItem("isTakeout") == 'true'? <Card.Text className="mx-2">${menu.price}</Card.Text>: ``}
                <Button className="btn-sm" variant="outline-primary" onClick={addToCart}>Add</Button>
            </Card.Footer>
            </Card>
            </Col>     
        })
    }
    
        </Row>
        )}
 