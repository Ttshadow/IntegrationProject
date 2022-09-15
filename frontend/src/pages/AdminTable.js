import {Container, Row, Col} from 'react-bootstrap'
import Table from '../component/adminDashboard/Table';
import SideBar from '../component/adminDashboard/SideBar';

function AdminTable() {
    return <Container>
        <Row>
            <Col className='col-3'>
                <SideBar />
            </Col>
            <Col className='col-9'>
            <h1>Table management</h1>
            <Table />
            </Col>
        </Row>
        
    </Container>
}
export default AdminTable;