import { useState } from "react"
import { Button, Form, Table } from "react-bootstrap"

export function Cart(){

    const [carts, useCarts] = useState([]);

    function handleRemove(){
        
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