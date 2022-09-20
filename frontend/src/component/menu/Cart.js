import { useEffect, useState } from "react"
import { Button, Form, Table } from "react-bootstrap"
import useLocalStorage from "../../util/useLocalStorage";

export function Cart(){
    const isTakeout = sessionStorage.getItem("isTakeout");
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const [carts, setCarts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [quantity, setQuantity] = useState();
    const userId = localStorage.getItem('userId');
    let total = 0;
    const [totalPrice, setTotalPrice] = useState(total);

    useEffect(() => {
      fetch(`../cart/${userId}`, { // 1 for userid for now.
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`
          }
      })
      .then((data)=> data.json())
      .then((json)=>setCarts(json))
      
    }, [refresh])
    
    useEffect(()=>{
        carts.forEach(cart => {
            total += cart.menu.price * cart.quantity
          });
          setTotalPrice(total);
    }, [carts])
    useEffect(()=>{
        setRefresh(false)
    },[carts])

    function handleRemove(cart){
        fetch(`../cart/remove_item/${cart.id}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then(()=>{
            setRefresh(true);
        })
    }
    function handleMinus(cart){
        if(cart.quantity - 1 === 0){
            handleRemove(cart);
        }
        else{
            fetch(`../cart/update_quantity/${cart.id}`, {
                method: 'PUT',
                body: cart.quantity - 1,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${jwt}`
                  }
            })
            .then(()=>setRefresh(true))
        }
        
    }
    function handlePlus(cart){
        fetch(`../cart/update_quantity/${cart.id}`, {
            method: 'PUT',
            body: cart.quantity + 1,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${jwt}`
              }
        })
        .then(()=>setRefresh(true))
    }
    // function handlePlaceOrder(){
    //     fetch('orders',{
    //         method: 'POST',
    //         body: JSON.stringify({
    //             takeout: sessionStorage.getItem('isTakeout'),
    //             status: "Placed",
    //             totalPrice: 
    //             date: 
    //             diningTable: {
    //                 id: sessionStorage.getItem('table'),
    //             },
    //             user: {
    //                 id: 
    //             }
    //             promotion: {
    //                 id: 
    //             }
    //             orderItemsList:
    //         }),
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${jwt}`
    //         }
    //     })
    // }
    return <div className="container">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Dish</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    carts?.map((cart)=>{
                        return <tr key={cart.id}>
                            <td><img alt='' src={cart.menu.image} width="90"></img></td>
                            <td>{cart.menu.name}</td>
                            <td><Button onClick={()=>handleMinus(cart)} variant="outline-primary" size="sm" className="me-1">-</Button>{cart.quantity}<Button onClick={()=>handlePlus(cart)} className="ms-1" size="sm" variant="outline-primary">+</Button></td>
                            <td>${isTakeout === 'true' ? (cart.menu.price * cart.quantity).toFixed(2) : 0}</td>
                            <td><Button variant='outline-danger' onClick={()=>handleRemove(cart)} className='me-1 btn-sm'>Remove</Button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <h3>${totalPrice.toFixed(2)}</h3>
        <Button className="float-end" /*onClick={handlePlaceOrder}*/>Place Order</Button>
    </div>
}