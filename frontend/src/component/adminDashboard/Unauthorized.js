import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';
import "./Unauthorized.css";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Unauthorized = () => {
    const navigate = useNavigate()
    const [countDown,setCountDown] = useState(5);

    useEffect(()=>{
        setInterval(()=>{
            if(countDown > 1){
                setCountDown(countDown-1)
            }else{
                navigate('/')
            }
        },1000)
    },[countDown]);

    return (
        <div id="redirect-container">
            <Container>
            <Row className="mb-4"><AiOutlineLoading3Quarters id="redirect-logo"/></Row>
            <Row id="redirecting">
                <p className="text-center">Redirecting...</p>
            </Row>
            <Row id="redirect-time" className="mx-auto">
                <p className='text-center'>This page is Unauthorized for you, we will redirect you to Home page in {countDown} seconds...</p>
            </Row>
        </Container>
        </div>
        
    );
};

export default Unauthorized;