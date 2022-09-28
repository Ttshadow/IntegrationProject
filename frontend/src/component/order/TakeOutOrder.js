import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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
    const [user, setUser] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [promotionTitle, setPromotionTitle] = useState('');
    const [moneySaved, setMoneySaved] = useState(0);
    const promotionRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const telRef = useRef();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [firstNameErrMessage, setFirstNameErrMessage] = useState('');
    const [lastNameErrMessage, setLastNameErrMessage] = useState('');
    const [emailErrMessage, setEmailErrMessage] = useState('');
    const [telErrMessage, setTelErrMessage] = useState('');

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
                setUser(data);
            })
    }, []);

    const applyPromotion = (e) => {
        e.preventDefault()
        if (!promotionTitle) {
            fetch(`../validatepromotion?promotionCode=${promotionRef.current.value}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        setMoneySaved(totalPrice * (1 - data.discount))
                        setTotalPrice(totalPrice * data.discount)
                        setPromotionTitle(data.title)
                    } else {
                        alert('Promotion code is not valid')
                    }
                })
        } else {
            alert('The discount has been applied')
        }
    }

    const submitOrder = async (e) => {
        e.preventDefault();
        if(firstNameErrMessage || lastNameErrMessage || emailErrMessage || telErrMessage) return
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod;
                fetch('/order/payment', {
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
                    .then((data) => {
                        if (data.status === 200) {
                            editUser();
                            saveOrder();
                        }
                    })
            } catch (error) {
                console.log('Error', error);
            }
        } else {
            alert(error.message)
        }
    }

    const editUser = () => {
        fetch('../order/edituser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                id: userId,
                email: emailRef.current.value,
                tel: telRef.current.value,
                firstName: firstNameRef.current.value.trim(),
                lastName: lastNameRef.current.value.trim()
            }),
        })
    }

    const saveOrder = () => {
        fetch('../order/saveorder', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                takeout: sessionStorage.getItem('isTakeout') === 'true' ? true : false,
                totalPrice: (totalPrice * 1.1475).toFixed(2),
                orderItemsList: orderItems,
                user: {
                    id: userId
                },
                promotion: {
                    description: promotionTitle
                }
            }),
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            }
        }).then(data => {
            navigate('/paymentsuccess', { state: { orderId: data.id } })
        })
    }

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        return specialChars.test(str);
    }

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    function validEmail(str){
        const emailExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailExp.test(str);
    }

    function validPhoneNumber(str){
        const phoneExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return phoneExp.test(str);
    }

    const firstNameCheck = () => {
        let input = firstNameRef.current.value.trim();
        if (input === '') {
            setFirstNameErrMessage('The first name can not be empty')
        } else if (containsSpecialChars(input)) {
            setFirstNameErrMessage('Special characters are not allowed here')
        } else if (hasNumber(input)) {
            setFirstNameErrMessage('Numbers are not allowed here')
        } else {
            setFirstNameErrMessage('')
        }
    }

    const lastNameCheck = () => {
        let input = lastNameRef.current.value.trim();
        if (input === '') {
            setLastNameErrMessage('The first name can not be empty')
        } else if (containsSpecialChars(input)) {
            setLastNameErrMessage('Special characters are not allowed here')
        } else if (hasNumber(input)) {
            setLastNameErrMessage('Numbers are not allowed here')
        } else {
            setLastNameErrMessage('')
        }
    }

    const emailCheck = () => {
        let input = emailRef.current.value.trim()
        if(!validEmail(input)){
            setEmailErrMessage('Invalid email address')
        }else{
            setEmailErrMessage('')
        }
    }

    const phoneCheck = () => {
        let input = telRef.current.value.trim()
        if(!validPhoneNumber(input)){
            setTelErrMessage('Invalid phone number')
        }else{
            setTelErrMessage('')
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
                                        <Label htmlFor='first_name'>First Name: {firstNameErrMessage ? <span style={{ color: 'red' }}>{firstNameErrMessage}</span> : ''}</Label>
                                        <input placeholder="" id='first_name' type='text' defaultValue={user.firstName ? user.firstName : ''} ref={firstNameRef} onChange={firstNameCheck} />
                                    </Col>
                                    <Col md={6}>
                                        <Label htmlFor='last_name'>Last Name: {lastNameErrMessage ? <span style={{ color: 'red' }}>{lastNameErrMessage}</span> : ''}</Label>
                                        <input placeholder="" id='last_name' type='text' defaultValue={user.lastName ? user.lastName : ''} ref={lastNameRef} onChange={lastNameCheck}/>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col md={6}>
                                        <Label htmlFor='email'>Email: {emailErrMessage ? <span style={{ color: 'red' }}>{emailErrMessage}</span> : ''}</Label>
                                        <input placeholder="" id='email' type='text' defaultValue={user.email ? user.email : ''} ref={emailRef} onChange={emailCheck}/>
                                    </Col>
                                    <Col md={6}>
                                        <Label htmlFor='telephone'>Telephone: {telErrMessage ? <span style={{ color: 'red' }}>{telErrMessage}</span> : ''}</Label>
                                        <input placeholder="" id='telephone' type='text' defaultValue={user.tel ? user.tel : ''} ref={telRef} onChange={phoneCheck}/>
                                    </Col>
                                </Row>
                                <Row className="mt-5">
                                    <Label className='mb-3'><strong>Bank Information:</strong></Label>
                                    <CardElement className='text-dark border border-primary' options={CARD_OPTIONS} />
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
                                promotionTitle ? (<Row className="lower">
                                    <Col className="text-left">Discount</Col>
                                    <Col className="text-right">{promotionTitle}</Col>
                                </Row>) : ''
                            }
                            {
                                promotionTitle ? (<Row className="lower">
                                    <Col className="text-left">Money Saved</Col>
                                    <Col className="text-right bold" style={{ color: 'red' }}><b>- {moneySaved.toFixed(2)}</b></Col>
                                </Row>) : ''
                            }
                            <Row className="lower mt-4">
                                <Col className="text-left"><b>Total to pay</b></Col>
                                <Col className="text-right"><b>{(totalPrice * 1.1475).toFixed(2)}</b></Col>
                            </Row>
                            <hr />
                            <Row className="lower mt-4">
                                <Col>
                                    <Row className='my-4'>
                                        <Col style={{ lineHeight: '40px' }}>Promotion Code</Col>
                                        <Col><input type='text' id='promo_code' ref={promotionRef} /></Col>
                                    </Row>
                                    <Button onClick={applyPromotion}>Apply</Button>
                                </Col>
                            </Row>
                            <Button className="order_btn mt-5" onClick={submitOrder}>Place order</Button>
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