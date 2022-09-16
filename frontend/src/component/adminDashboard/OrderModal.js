import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

function OrderModal({ order }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const submitHandler = (e) => {
        e.preventDefault()
    }
    const statusArr = ['Preparing', 'Served', 'Paid']
    return (
        <div>
            <Button onClick={() => { handleShow() }}>Edit Status</Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <form>
                        <label htmlFor="orderNumber" className="form-label">Order Number</label>
                        <input type="text" value={order.id} disabled id="orderNumber" className="form-control"></input>
                        <label htmlFor="orderStatus" className="form-label">Order Status</label>
                        <select name="OrderStatus" id="orderStatus" className="form-select" defaultValue={order.status}>
                            {statusArr.map((status, key) => {
                                return <option valuealue={status} key={key}>{status}</option>
                            })}
                        </select>
                        <label htmlFor="orderDetails" className="form-label">Order Details</label>
                        <textarea className="form-control" id="orderDetails" disabled
                            defaultValue={
                                order.orderItemsList.map((obj)=>{
                                    return obj.menu.name
                                })
                            }>
                        </textarea>
                    </form>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" id="modalLoginBtn" onClick={submitHandler}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default OrderModal;