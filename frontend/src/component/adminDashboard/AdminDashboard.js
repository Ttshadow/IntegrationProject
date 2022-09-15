import { Outlet } from "react-router-dom";
import SideBar from './SideBar';
import { Col, Container, Row } from "react-bootstrap";

function AdminDashboard() {

    return(
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
        
    )
}
export default AdminDashboard;