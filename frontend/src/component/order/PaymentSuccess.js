import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PaymentSuccess.css'
import { BsCheckLg } from "react-icons/bs";

const PaymentSuccess = () => {
    const { state } = useLocation()
    const { orderId } = state
    return (
        <div className="payment_container">
            <div className="row">
                <div className="col-md-6 mx-auto mt-5">
                    <div className="payment">
                        <div className="payment_header">
                            <div className="check"><BsCheckLg style={{fontSize:"2em",marginTop:'10px',color:'green'}}/></div>
                        </div>
                        <div className="content">
                            <h1>Payment Success !</h1>
                            <p className='mt-4'>Thank you for purchasing with Yuki Restaurent !</p>
                            <p className='mt-4'>Your order number is #{orderId}</p>
                            <div className='mt-5'>
                                <Link to='/'>Go back to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;