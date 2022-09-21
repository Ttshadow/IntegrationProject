import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './DineInOrder.css'

const DineInOrder = () => {
    const GoBackToMenu = () => {
        window.location.href = '/dine/menu'
    }
    return (
        <div id="redirect-container">
            <Container>
                <Row className="mb-4"><AiOutlineLoading3Quarters id="redirect-logo" /></Row>
                <Row id="redirecting">
                    <p className="text-center">Order Placed!</p>
                </Row>
                <Row id="redirect-time" className="mx-auto">
                    <p className='text-center'>Please wait our waiter to serve you. </p>
                    <p><b>Bon appétit</b></p>
                </Row>
                <Row className='mt-3'>
                    <Col md={{ span: 4, offset: 4 }} >
                        <Button className='btn-light' onClick={GoBackToMenu}>Go Back To Menu</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DineInOrder;