import React, { useState, useEffect } from "react";
import OrderModal from "./OrderModal";
import './Order.css'
import useLocalStorage from "../../util/useLocalStorage";
import moment from 'moment';

export default function Order() {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    const [orders, setOrders] = useState([]);
    const [orderStatus,setOrderStatus] = useState('');
    useEffect(() => {
        fetch('../admindashboard/orders', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        }).then(data => data.json()).then(json => { 
            json.reverse()
            json.map((order)=>{
                order.date = moment(order.date).format("YYYY-MM-DD HH:mm ")
                return order
            })
            setOrders(json)
        })
    }, [orderStatus])

    return (
        <div>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Table</th>
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
                            <td>{order.diningTable.id}</td>
                            <td>{order.orderItemsList.map((obj,index)=>{
                                return index === order.orderItemsList.length - 1 ? obj.menu.name : obj.menu.name + ", "
                            })}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>{order.promotion ? order.promotion.code : ''}</td>
                            <td>
                                <OrderModal order={order} setOrderStatus={setOrderStatus}></OrderModal>
                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )
}