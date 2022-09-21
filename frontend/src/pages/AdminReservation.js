import {Container, Row, Col} from 'react-bootstrap'
import SideBar from '../component/adminDashboard/SideBar';
import ReservationTable from '../component/reservation/ReservationTable';

function AdminReservation() {
    return <>
        <h1>Admin Reservations</h1>
        <ReservationTable/>
    </>
};
export default AdminReservation;