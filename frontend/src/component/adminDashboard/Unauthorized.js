import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            This page is Unauthorized for you, we will redirect you to Home page in {countDown} seconds
        </div>
    );
};

export default Unauthorized;