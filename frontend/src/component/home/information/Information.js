import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {BsTelephoneOutbound,BsShop} from 'react-icons/bs';
import {AiTwotoneMail} from 'react-icons/ai';
import {GrRestaurant} from 'react-icons/gr';
import "./Information.css";

function Information() {
  return (
    <Container fluid className='contactInfoContainer'>
        <Row>
            <Col className='col-2 offset-2'>
            <BsTelephoneOutbound className='infoIcons mt-5'/>
                <h5 className='mt-2'>Telephone</h5>
                <p>
                    (123) 456 7890
                </p>
            </Col>
            <Col className='col-2'>
                <AiTwotoneMail className='infoIcons mt-5'/>
                <h5 className='mt-2'>Email</h5>
                <p>
                    email@yuki.com
                </p>
            </Col>
            <Col className='col-2'>
                <GrRestaurant className='infoIcons mt-5'/>
                <h5 className='mt-2'>Address</h5>
                <p>
                123 Street Name, Montreal, Canada
                </p>
            </Col>
            <Col className='col-2'>
                <BsShop className='infoIcons mt-5'/>
                <h5 className='mt-2'>Open Hours</h5>
                <p>
                    Monday - Friday | 11:00 - 21:00
                </p>
            </Col>
        </Row>
    </Container>
  )
}

export default Information