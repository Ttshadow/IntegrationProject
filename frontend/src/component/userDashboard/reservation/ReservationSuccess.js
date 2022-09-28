import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import "./Reservation.css";

function ReservationSuccess(props) {
    return (
        <div className='reservation-container text-light'>
        <br/>
        <Container>
        <Row>
            <Col className='col-lg-7'>
            <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.145381516555!2d-73.94391688425185!3d45.406407845318526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc938500caad3a7%3A0xd807d74a59dcffcf!2sJohn%20Abbott%20College!5e0!3m2!1sen!2sca!4v1655560889359!5m2!1sen!2sca"
                    width="100%" 
                    max-height="300"
                    frameBorder="0"
                    allowFullScreen
                    className='googleMap'
                />
            </Col>
            <Col className='col-lg-5'>
                <div className='transparentBg'>
                    <h1>Reservation Details</h1>
                    <p>Name: {props.user.firstName} {props.user.lastName}</p>
                    <p>Number of people: {props.numberOfParty}</p>
                    <p>Time slot: {props.startTime} {props.endTime}</p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col className='col-12 mt-3'>
                <div className='transparentBg'>
                    <h2>Note</h2>
                    <p>If your party has not arrived within 15 minutes of your reservation time, it will be cancelled.</p>
                </div>
            </Col>
        </Row>
        </Container>
    </div>
    )
};

export default ReservationSuccess;