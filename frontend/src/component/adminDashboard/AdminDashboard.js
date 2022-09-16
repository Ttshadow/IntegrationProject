import { Col, Container,Row } from 'react-bootstrap';
import Order from './Order';
import SideBar from './SideBar';

function AdminDashboard() {

    return(
        <Container>
            <Row>
                <Col className='col-3'><SideBar /></Col>
                <Col className='col-9'><Order/></Col>
            </Row>
        </Container>
        
    )
}

export default AdminDashboard;