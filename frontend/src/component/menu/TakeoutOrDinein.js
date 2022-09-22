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
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedTableId, setSelectedTableId] = useState(0);
    sessionStorage.setItem("table", 0);

    function selectDinein(){
        sessionStorage.setItem("isTakeout", false);
        setShowModal(true);
        setFetchTable(true? false: true)
    }
    function selectTakeout(){
        sessionStorage.setItem("isTakeout", true);
        sessionStorage.setItem("table", 1);
        navigate(`menu`);
    }
    function handleSelectChange(e){
        sessionStorage.setItem('table', e.target.value)
        setErrorMessage('');
        
    }

    useEffect(()=>{
        fetch('/admindashboard/getavailabletable', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data) => data.json())
        .then((json) => {setTables(JSON.parse(JSON.stringify(json)))},[fetchTable])}
        , [fetchTable]);

    function handleYes(){
        if(sessionStorage.getItem("table") === "0"){
            setErrorMessage("Please select a table.")
        }
        else{
            navigate(`menu`);
         }
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
                            <option value={0}>Select a table</option>
                            {tables?.map((table)=>{
                                return <option key={table.id} value={table.id}>{table.name}</option>
                            })}
                        </Form.Select>
                        <p className="text-danger">{errorMessage}</p>
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