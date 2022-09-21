import { Row, Col} from 'react-bootstrap'
import Table from '../component/adminDashboard/Table';
import AddTable from '../component/adminDashboard/AddTable';
import EditAllStatus from '../component/adminDashboard/EditAllStatus';
function AdminTable() {
    return <Row>
        <Col className="col-12">
            <AddTable/>
        </Col>
        <Col className="col-12">
            <Table />
        </Col>
        <Col className="col-12">
            <EditAllStatus/>
        </Col>
        
    </Row>
}
export default AdminTable;