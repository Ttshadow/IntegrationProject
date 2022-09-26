import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import useLocalStorage from '../../util/useLocalStorage';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
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

export default function PaymentForm(props) {
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const amount = props.amount;
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e)=>{
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
                        amount: amount
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }, 
                }) 
                .then((data)=>data.json())
                .then((json)=>{
                    console.log(json);
                    setSuccess(true);
                })
            }catch(error){
                console.log('Error', error);
            }
        }else{
            console.log(error.message);
        }
    }
  return (
    <div>
        {!success ?
        <form className="bg-dark" onSubmit={handleSubmit}>
        <Row >
            <Col className="">
                <CardElement options={CARD_OPTIONS}/>
            </Col>
        </Row>
        <Button size='sm'>Pay</Button>
    </form>
        :
        <div>
            <h2>Payment Successful!</h2>
        </div>
}
    </div>
  )
}
