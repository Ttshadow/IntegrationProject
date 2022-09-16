import React, { useState, useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

function OrderModal({ order, setOrderStatus }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const orderNumberRef = useRef();
    const orderStatusRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault()
        fetch(`/dashboard/orders/${orderNumberRef.current.value}/${orderStatusRef.current.value}`,{
            method:'PATCH',
        }).then(data => data.json()).then(order => { 
            setShow(false)
            setOrderStatus(order.status)
        })
    }
    const statusArr = ['Placed', 'Served', 'Paid']
    return (
        <div>
            <Button onClick={() => { handleShow() }}>Edit Status</Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <form>
                        <label htmlFor="orderNumber" className="form-label">Order Number</label>
                        <input type="text" value={order.id} disabled id="orderNumber" className="form-control" ref={orderNumberRef}></input>
                        <label htmlFor="orderStatus" className="form-label">Order Status</label>
                        <select id="orderStatus" className="form-select" defaultValue={order.status} ref={orderStatusRef}>
                            {statusArr.map((status, key) => {
                                return <option value={status} key={key}>{status}</option>
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