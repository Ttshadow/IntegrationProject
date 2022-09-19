import { Outlet } from "react-router-dom";
import { Col, Container,Row } from 'react-bootstrap';
import useLocalStorage from '../../util/useLocalStorage';
import Order from './Order';
import SideBar from './SideBar';
import { Col, Container, Row } from "react-bootstrap";
import Unauthorized from './Unauthorized';

function AdminDashboard() {
    const [authority,setAuthority] = useLocalStorage('','authority');

    return(


        authority === 'ROLE_ADMIN' ?
        (<Container>
            <Row>
                <Col className="col-3">
                    <SideBar />
                </Col>
                <Col className="col-9">
                    <Outlet />
                </Col>
            </Row>
        </Container>) : <Unauthorized></Unauthorized>

    )
}

export default AdminDashboard;