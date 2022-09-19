import { useEffect, useState } from "react"
import { Button, Form, Table } from "react-bootstrap"
import useLocalStorage from "../../util/useLocalStorage";

export function Cart(){
    const [jwt, setJwt] = useLocalStorage('', 'jwt');
    const [carts, setCarts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      fetch(`../cart/2`, { // 1 for userid for now.
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`
          }
      })
      .then((data)=> data.json())
      .then((json)=>setCarts(json))
    }, [refresh])
    
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

    return <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Dish</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    carts?.map((cart)=>{
                        return <tr key={cart.id}>
                            <td><img alt='' src={cart.menu.image} width="90"></img></td>
                            <td>{cart.menu.name}</td>
                            <td>{cart.quantity}</td>
                            <td><Button variant='outline-secondary' onClick={()=>handleRemove(cart)} className='me-1 btn-sm'>Remove</Button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    </div>
}