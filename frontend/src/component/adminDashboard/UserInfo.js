import React, {useEffect, useState} from 'react';
import {Table } from 'react-bootstrap';
import useLocalStorage from "../../util/useLocalStorage";


function UserInfo(){

    const [jwt,setJwt] = useLocalStorage("","jwt");
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [searchRes, setSearchRes] = useState([]);

    const searchForUser = (searchValue) =>{
        setSearchUser(searchValue);
        //console.log(searchValue);
        if(searchUser !== ""){
            const filterData = users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchUser.toLowerCase());
            })
            setSearchRes(filterData);
        }else{
            setSearchRes(users);
        }
    }

    useEffect(() =>{
        fetch('../admindashboard/users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data)=> data.json())
        .then((json)=> {
            console.log(json)
            setUsers(JSON.parse(JSON.stringify(json)))

        });
    }, []);


    return(
        <>
            <br/>
            <h3>User Page</h3>
            <div style = {{margin: '0 auto', marginTop: '5%'}}>
                <label>Search</label>
                <input type="text" onChange={(e) => searchForUser(e.target.value)} />
            </div>
            
            <hr/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>User Image</th>
                    </tr>
                </thead>
                <tbody>
                    {searchUser.length>1 ? (
                        searchRes.map((item) =>{
                            return <tr key={item.id}>
                            <td>{item.firstName} </td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.tel}</td>
                            <td><img src={item.image} alt='' width='100' /></td>
                            </tr>
                        })
                    ) : (
                        users.map((user) =>{
                            return <tr key={user.id}>
                                <td>{user.firstName} </td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.tel}</td>
                                <td><img src={user.image} alt='' width='100' /></td>
                                </tr>
                        })
                    )}
                    
                    
                </tbody>
            </Table>
        </>
    )
}

export default UserInfo;