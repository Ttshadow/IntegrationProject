import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../util/useLocalStorage";

export function TakeoutOrDinein(){
    const [jwt, setJwt] = useLocalStorage('', 'jwt');

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [tables, setTables] = useState([]);
    const [fetchTable, setFetchTable] = useState(false);

    function selectDinein(){
        sessionStorage.setItem("isTakeout", false);
        setShowModal(true);
        setFetchTable(true? false: true)
    }
    function selectTakeout(){
        sessionStorage.setItem("isTakeout", true);
        navigate(`menu`);
    }
    function handleSelectChange(e){
        console.log(e)
        sessionStorage.setItem('table', e.target.value)
    }

    useEffect(()=>{
        fetch('/admindashboard/diningtable', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data) => data.json())
        .then((json) => {setTables(JSON.parse(JSON.stringify(json)))},[fetchTable])}
        , [fetchTable]);

    function handleYes(){
        navigate(`menu`);
    }

    function handleCancel(){
        sessionStorage.removeItem("takeout")
        sessionStorage.removeItem("table");
        setShowModal(false);
    }

    return (
        <div className="row login-container">
            <div className="login-form">
                <h2 className="text-center text-light mb-5">Start Your Order</h2>
                <div className="text-center">
                    <Button className="btn btn-dark btn-lg me-2 col-5" onClick={selectDinein}>DINE-IN</Button>
                    <Button className="btn btn-dark btn-lg col-5" onClick={selectTakeout}>TAKE-OUT</Button>
                </div>
            
                <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showModal} onHide={showModal}
                >
                    <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Please select your table
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Select onChange={handleSelectChange}>
                            <option value={0} >Select a Table</option>
                            {tables?.map((table)=>{
                                return <option key={table.id} value={table.id}>{table.name}</option>
                            })}
                        </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="dark" onClick={handleYes}>Yes</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                </div>
        </div>
        
    )
}