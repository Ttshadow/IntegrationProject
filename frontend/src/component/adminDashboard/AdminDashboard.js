import SideBar from './SideBar';
import Header from '../header/Header';
import {Container, Col, Row }from 'react-bootstrap';

function AdminDashboard() {

    return(
        <>
        <Header />
        <Container>
            <Row>
                <Col>
                    <SideBar />
                </Col>
            </Row>
        </Container>
        
        </>
        
    )
}

export default AdminDashboard;