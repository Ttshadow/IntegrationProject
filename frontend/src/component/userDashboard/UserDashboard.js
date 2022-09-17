import SideBar from './SideBar';
import Header from '../header/Header';
import {Container, Col, Row }from 'react-bootstrap';
import LeaveComment from './LeaveComment';

function UserDashboard() {
    

    return(
        <>
        <Header />
        <Container>
            <Row>
                <Col>
                    <SideBar />
                </Col>
                <Col>
                    <LeaveComment />
                </Col>
            </Row>
        </Container>
        
        </>
        
    )
}

export default UserDashboard;