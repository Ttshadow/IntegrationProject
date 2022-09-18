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
        .then((json) => {console.log(json);setMenus(json)})
    },[])

    return (
        <Row xs={1} md={5} className="g-4">
                
            {
                menus?.map((menu)=>{
                    return <Col>
                    <Card key={menu.id} className="h-100">
                    <Card.Img src={menu.image} width="100"/>
                    <Card.Body>
                        <Card.Title>{menu.name}</Card.Title>
                    </Card.Body>
                    <Card.Footer className="d-flex">
                        <Form.Control className="ms-auto me-1" type="number" defaultValue={0} ref={quantityRef}></Form.Control>
                        <Button className="btn-sm" variant="outline-primary">Add</Button>
                    </Card.Footer>
                    </Card>
                    </Col>     
                })
            }
        </Row>
    )
    
}
