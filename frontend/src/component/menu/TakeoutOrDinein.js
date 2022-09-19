import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function TakeoutOrDinein(){
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [tables, setTables] = useState([]);
    const [fetchTable, setFetchTable] = useState(false);

    function selectDinein(){
        setShowModal(true);
        setFetchTable(true? false: true)
        sessionStorage.setItem("isTakeout", false);
    }
    function selectTakeout(){
        sessionStorage.setItem("isTakeout", true);
        navigate(`menu`);
    }
    function handleSelectChange(e){
        sessionStorage.setItem('table', e.targe.value)
    }

    useEffect(()=>{
        fetch('diningtable', {
            method: 'GET',
        })
        .then((data) => data.json())
        .then((json) => {setTables(JSON.parse(JSON.stringify(json)))
        },[fetchTable])});

    function handleYes(){
        navigate(`menu`);
    }

    function handleCancel(){
        sessionStorage.removeItem("table");
        setShowModal(false);
    }
    return (
        <div className="row">
                <h2 className="text-center">Start Your Order</h2>
                <div className="text-center">
                    <Button className="btn btn-dark btn-lg me-2 col-5" onClick={selectDinein}>DINE-IN</Button>
                    <Button className="btn btn-dark btn-lg col-5" onClick={selectTakeout}>TAKE-OUT</Button>
                </div>
            
                {/* <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={handleShow} onHide={handleClose}
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Please select your table
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Select onChange={(e)=>handleSelectChange(e)}>
                        <option value={0} >Select a Table</option>
                        {tables?.map((table)=>{
                            return <option key={table.id} value={table.id}>{table.name}</option>
                        })}
                    </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="warning" onClick={handleYes}>Yes</Button>
                    <Button variant="warning" onClick={handleCancel}>Cancel</Button>
                    </Modal.Footer>
                </Modal> */}
        </div>
        
    )
}