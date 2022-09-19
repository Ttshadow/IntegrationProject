import {Container, Row, Col} from 'react-bootstrap'
import SideBar from '../component/adminDashboard/SideBar';
import ReservationTable from '../component/reservation/ReservationTable';

function AdminReservation() {
    return <Container>
    <Row>
        <Col className='col-3'>
            <SideBar />
        </Col>
        <Col className='col-9'>
        <h1>Admin Reservations</h1>
        <ReservationTable/>
        </Col>
    </Row>
</Container>
};
export default AdminReservation;