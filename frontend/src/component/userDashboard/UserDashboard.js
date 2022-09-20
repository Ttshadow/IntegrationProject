import SideBar from './SideBar';
import { Outlet } from "react-router-dom";
import Header from '../header/Header';
import {Container, Col, Row }from 'react-bootstrap';

function UserDashboard() {
    

    return(
        <>
        <Header />
        <Container>
            <Row>
                <Col className="col-3">
                    <SideBar />
                </Col>
                <Col className="col-9">
                    <Outlet />
                </Col>
            </Row>
        </Container>
        
        </>
        
    )
}

export default UserDashboard;