import React, {useEffect, useState} from 'react';
import {Table } from 'react-bootstrap';
import useLocalStorage from "../../util/useLocalStorage";
import moment from 'moment';

export default function OrderHistory(){
    const [jwt,setJwt] = useLocalStorage("","jwt");
    const [userId, setUserId] = useLocalStorage("","userId");
    const [orders, setOrders] = useState([]);

    let id = Number(localStorage.getItem('userId'));
    useEffect(() =>{
        fetch('../userdashboard/order/'+id, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data)=> data.json())
        .then((json)=> {
            setOrders(JSON.parse(JSON.stringify(json)))
        });
    }, []);

    return(
        <>
            <br/>
            <h3>Order History</h3>
            <br/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Order Type</th>
                        <th>Order Details</th>
                        <th>Time</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) =>{
                        return <tr key={order.id}>
                            <td>{order.diningTable.id}</td>
                            <td>{order.takeout? 'Take out' : 'Dine in'}</td>
                            <td>{order.orderItemsList.map((obj,index)=>{
                                return index === order.orderItemsList.length - 1 ? obj.menu.name : obj.menu.name + ", "
                            })}</td>
                            <td>{moment(order.date).format("YYYY-MM-DD HH:mm")}</td>
                            <td>{order.totalPrice ? order.totalPrice : '0.00'}</td>
                            </tr>
                    })}
                    
                </tbody>
            </Table>
        </>
    )
}