import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './MapAndReservation.css'

function MapAndReservation() {
  return (
    <Container fluid className="mt-4 bg-light containerBox">
        <Row>
            <Col className='col-7'>
            <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.145381516555!2d-73.94391688425185!3d45.406407845318526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc938500caad3a7%3A0xd807d74a59dcffcf!2sJohn%20Abbott%20College!5e0!3m2!1sen!2sca!4v1655560889359!5m2!1sen!2sca"
                    width="100%" 
                    max-height="300"
                    frameBorder="0"
                    allowFullScreen
                    className='googleMap'
                />
            </Col>
            <Col className='col-5' id="restaurantReservation">
                <h2 className='reservationTitle mt-5'>All you can eat menu - Buffet</h2>
                <p className='reservationText'>Adult : $34.95</p>
                <p className='reservationText'>Kids 4-10 years old 1/2 price always</p>
                <p className='reservationText'>Over 10 years old full price</p>
                <p className='reservationText'>Under 4 years old it's free</p>
                <h2 className='reservationTitle mt-5'>Book A Table Online</h2>
                <p className='reservationText'>Call (123) 456–7890 daily, or book online below.<br/>
                    Reservations required for parties of 6 or more.</p>
                <button className='btn btn-warning'>Book Table Now</button>
            </Col>
        </Row>
    </Container>
  )
}

export default MapAndReservation