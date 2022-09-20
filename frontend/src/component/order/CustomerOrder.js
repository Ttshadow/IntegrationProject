import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';
import './CustomerOrder.css'

const CustomerOrder = () => {
    return (
        <div className="card">
            <div className="card-body">
                <Row>
                    <Col md={7}>
                        <div className="left border">
                            <div className="row">
                                <span className="header col-8 text-start">Payment</span>
                                <span className="icons col-4 text-end">
                                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt='' />
                                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt='' />
                                    <img src="https://img.icons8.com/color/48/000000/maestro.png" alt='' />
                                </span>
                            </div>
                            <form className='mt-4'>
                                <div>
                                    <Label htmlFor='cardHolder'>Cardholder's name:</Label>
                                    <input placeholder="Linda Williams" id='cardHolder' type='text' />
                                </div>
                                <div className='mt-4'>
                                    <Label htmlFor='cardNumber'>Cart Number:</Label>
                                    <input placeholder="0125 6780 4567 9909" id='cardNumber' type='text' />
                                </div>
                                <Row className="mt-4">
                                    <Col md={6}>
                                        <Label className='mb-3' htmlFor='expiration'>Expiry date:</Label>
                                        <input placeholder="YY/MM" id='expiration' type='text'/>
                                    </Col>
                                    <Col md={6}>
                                        <Label className='mb-3' htmlFor='cvv'>CVV:</Label>
                                        <input id="cvv" type='text'/>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="right border">
                            <div className="header">Order Summary</div>
                            <Row className="item">
                                <Col md={4} className="productImgContainer">
                                    <img className="img-fluid" src="https://i.imgur.com/79M6pU0.png" alt='' />
                                </Col>
                                <Col md={8}>
                                    <Row className="text-muted">Be Legandary Lipstick-Nude rose</Row>
                                    <Row>Qty:1</Row>
                                    <Row><b>$ 26.99</b></Row>
                                </Col>
                            </Row>
                            <Row className="item">
                                <Col md={4} className="productImgContainer">
                                    <img className="img-fluid" src="https://i.imgur.com/Ew8NzKr.jpg" alt='' />
                                </Col>
                                <Col md={8}>
                                    <Row className="text-muted">Be Legandary Lipstick-Sheer Navy Cream</Row>
                                    <Row>Qty:1</Row>
                                    <Row><b>$ 19.99</b></Row>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="lower">
                                <Col className="text-left">Subtotal</Col>
                                <Col className="text-right">$ 46.98</Col>
                            </Row>
                            <Row className="lower">
                                <Col className="text-left">Delivery</Col>
                                <Col className="text-right">Free</Col>
                            </Row>
                            <Row className="lower">
                                <Col className="text-left"><b>Total to pay</b></Col>
                                <Col className="text-right"><b>$ 46.98</b></Col>
                            </Row>
                            <Row className="lower">
                                <Col className="text-left">
                                    <Button className='promoCodeBtn'>Add Promo code</Button>
                                </Col>
                            </Row>
                            <Button className="btn">Place order</Button>
                        </div>
                    </Col>
                </Row>
            </div>

            <div>
            </div>
        </div>
    );
};

export default CustomerOrder;