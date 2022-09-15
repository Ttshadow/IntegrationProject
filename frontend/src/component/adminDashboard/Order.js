import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

export default function Order() {
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([]);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const submitHandler = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        fetch('/order', {
            method: "GET"
        }).then(data => data.json()).then(json => { 
            console.log(json)
            json.map((order)=>{
                let arr = order.date.split("T")
                let date = arr[0]
                let time = arr[1].slice(0,8)
                order.date = date + " " +  time
                return order
            })
            setOrders(json)
        })
    }, [])

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Table Number</th>
                        <th>Order Details</th>
                        <th>Order at</th>
                        <th>Status</th>
                        <th>Promotion</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, key) => {
                        return (
                        <tr key={key}>
                            <td>{order.id}</td>
                            <td>{order.table}</td>
                            <td>Miso soup, wakame salad, lamb skewers and beef sashimi</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>1</td>
                            <td>
                                <Button onClick={handleShow}>Edit Status</Button>
                                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                                    <Modal.Body>
                                        <form>
                                            <label htmlFor="orderNumber" className="form-label">Order Number</label>
                                            <input type="text" value={order.id} disabled id="orderNumber" className="form-control"></input>
                                            <label htmlFor="orderStatus" className="form-label">Order Status</label>
                                            <select name="OrderStatus" id="orderStatus" className="form-select">
                                                <option value="Preparing">Preparing</option>
                                                <option value="Served">Served</option>
                                                <option value="Paid">Paid</option>
                                            </select>
                                            <label htmlFor="orderDetails" className="form-label">Order Details</label>
                                            <textarea className="form-control" id="orderDetails"
                                                defaultValue=" 1. Miso soup 
                                            2. Wakame salad
                                            3. Lamb skewers
                                            4. Beef sashimi">
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
                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )
}