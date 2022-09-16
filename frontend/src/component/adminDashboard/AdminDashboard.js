import SideBar from './SideBar';
import Header from '../header/Header';
import {Container, Col, Row }from 'react-bootstrap';
import Comment from './Comment';

function AdminDashboard() {

    return(
        <>
        <Header />
        <Container>
            <Row>
                <Col>
                    <SideBar />
                </Col>
                <Col>
                    <Comment />
                </Col>
            </Row>
        </Container>
        
        </>
        
    )
}

export default AdminDashboard;