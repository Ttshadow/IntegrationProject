import React, { useContext, useEffect, useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap'
import SideBar from '../component/adminDashboard/SideBar';
import ReservationTable from '../component/userDashboard/reservation/ReservationTable';
import {useNavigate} from 'react-router-dom';

function UserReservation() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/newreservation');
    };
    return <Container>
    <Row>
        <Col className='col-9 mt-3'>
        <Button onClick={handleClick}>New reservation</Button>
        <ReservationTable/>
        </Col>
    </Row>
</Container>
};
export default UserReservation;