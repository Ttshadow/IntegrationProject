import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';
import useLocalStorage from '../../util/useLocalStorage';
import './TakeOutOrder.css';
import { v4 as uuidv4 } from "uuid";
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "24px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const TakeOutOrder = () => {
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const [userId, setUserId] = useLocalStorage('', 'userId');
    const [user,setUser] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [promotionDesc, setPromotionDesc] = useState('');
    const promotionRef = useRef();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch(`../order/${(userId)}`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(response => response.json())
            .then(items => {
                let totalPrice = 0;
                items.map((item) => {
                    totalPrice += item.menu.price * item.quantity
                    return item
                })
                setTotalPrice(totalPrice)
                setOrderItems(items)
            })
        fetch(`../order/getuserinfo/${(userId)}`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data);
            })
    }, []);

    const applyPromotion = (e) => {
        e.preventDefault()
        if (!promotionDesc) {
            fetch(`../validatepromotion?promotion=${promotionRef.current.value}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.isValid) {
                        setTotalPrice(totalPrice * data.discount)
                        setPromotionDesc(data.description)
                    } else {
                        alert('Promotion code is not valid')
                    }
                })
        } else {
            alert('The discount has been applied')
        }
    }

    const submitOrder = async(e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
    })

        if(!error){
            try{
                const {id} = paymentMethod;
                fetch('/order/payment',{
                    method: "POST",
                    body: JSON.stringify({
                        id: id,
                        amount: totalPrice * 1.1475 * 100
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }, 
                }) 
                .then((data)=>{
                    return data.text();
                })
                .then((text)=>{
                    alert(text);
                })
            }catch(error){
                console.log('Error', error);
            }
        }else{
            alert(error.message)
        }
    }

    return (
        <div className="customer_order_container">
            <div className="customer_order_container-body">
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
                                <Row>
                                    <Col md={6}>
                                        <Label htmlFor='first_name'>First Name:</Label>
                                        <input placeholder="" id='first_name' type='text' required defaultValue={user.firstName ? user.firstName : ''}/>
                                    </Col>
                                    <Col md={6}>
                                        <Label htmlFor='last_name'>Last Name:</Label>
                                        <input placeholder="" id='last_name' type='text' required defaultValue={user.lastName ? user.lastName : ''}/>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col md={6}>
                                        <Label htmlFor='email'>Email:</Label>
                                        <input placeholder="" id='email' type='text' required defaultValue={user.email ? user.email : ''}/>
                                    </Col>
                                    <Col md={6}>
                                        <Label htmlFor='telephone'>Telephone:</Label>
                                        <input placeholder="" id='telephone' type='text' required defaultValue={user.tel ? user.tel : ''}/>
                                    </Col>
                                </Row>
                                {/* <Row className='mt-3'>
                                    <Col md={6}>
                                        <Label htmlFor='cardHolder'>Cardholder's name:</Label>
                                        <input placeholder="Linda Williams" id='cardHolder' type='text' />
                                    </Col>
                                    <Col md={6}>
                                        <Label htmlFor='cardNumber'>Cart Number:</Label>
                                        <input placeholder="0125 6780 4567 9909" id='cardNumber' type='text' />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Label className='mb-3' htmlFor='expiration'>Expiry date:</Label>
                                        <input placeholder="YY/MM" id='expiration' type='text' />
                                    </Col>
                                    <Col md={6}>
                                        <Label className='mb-3' htmlFor='cvv'>CVV:</Label>
                                        <input id="cvv" type='text' />
                                    </Col>
                                </Row> */}
                                <Row className="mt-5">
                                    <Label className='mb-3'><strong>Bank Information:</strong></Label>
                                    <CardElement className='text-dark border border-primary' options={CARD_OPTIONS}/>
                                </Row>
                            </form>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="right border">
                            <div className="header mb-4">Order Summary</div>
                            {orderItems.map((item, index) => {
                                return (
                                    <Row className='my-4' key={uuidv4()}>
                                        <Col md={{ span: 2, offset: 1 }}>
                                            <img className="img-fluid" src={item.menu.image} alt='' />
                                        </Col>
                                        <Col md={{ span: 6, offset: 2 }} style={{ position: 'relative' }}>
                                            <Row className="text-muted mb-3 text-start">
                                                <Col className='text-start'>{item.menu.name}</Col>
                                                <Col className='text-end'>{item.menu.price}</Col>
                                            </Row>
                                            <Row>
                                                <Col className='text-start'>Quantity:</Col>
                                                <Col className='text-end'>{item.quantity}</Col>
                                            </Row>
                                            <div className='price text-end mt-2'><b>{item.quantity * item.menu.price}</b></div>
                                        </Col>
                                    </Row>
                                )
                            })}
                            <hr />
                            <Row className="lower mt-5">
                                <Col className="text-left">Subtotal</Col>
                                <Col className="text-right">{totalPrice.toFixed(2)}</Col>
                            </Row>
                            <Row className="lower">
                                <Col className="text-left">Tax</Col>
                                <Col className="text-right">14.75%</Col>
                            </Row>
                            {
                                promotionDesc ? (<Row className="lower">
                                    <Col className="text-left">Discount</Col>
                                    <Col className="text-right">{promotionDesc}</Col>
                                </Row>) : ''
                            }

                            <Row className="lower mt-4">
                                <Col className="text-left"><b>Total to pay</b></Col>
                                <Col className="text-right"><b>{(totalPrice * 1.1475).toFixed(2)}</b></Col>
                            </Row>
                            <Row className="lower mt-5">
                                <Col md={{ span: 4, offset: 4 }}>
                                    <Label htmlFor='promo_code'>Promotion Code</Label>
                                    <Row>
                                        <Col><input type='text' id='promo_code' ref={promotionRef} /></Col>
                                        <Col><Button onClick={applyPromotion}>Apply</Button></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Button className="order_btn" onClick={submitOrder}>Place order</Button>
                        </div>
                    </Col>
                </Row>
            </div>

            <div>
            </div>
        </div>
    );
};

export default TakeOutOrder;