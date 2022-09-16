import React, { useState, useEffect } from "react";
import OrderModal from "./OrderModal";

export default function Order() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('dashboard/orders', {
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
                            <td>{order.diningTable.id}</td>
                            <td>{order.orderItemsList.map((obj,index)=>{
                                return index === order.orderItemsList.length - 1 ? obj.menu.name : obj.menu.name + ", "
                            })}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>{order.promotion.code}</td>
                            <td>
                                <OrderModal order={order}></OrderModal>
                            </td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )
}