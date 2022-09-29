import React, {useEffect, useState} from 'react';
import {Table } from 'react-bootstrap';
import useLocalStorage from "../../util/useLocalStorage";
import moment from 'moment';

function Comment(){

    const [jwt,setJwt] = useLocalStorage("","jwt")
    const [comments, setComments] = useState([])

    useEffect(() =>{
        fetch('../admindashboard/review', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
              }
        })
        .then((data)=> data.json())
        .then((json)=> {
            setComments(JSON.parse(JSON.stringify(json)))
        });
    }, []);

    return(
        <>
            <br/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>User</th>
                    <th>Review</th>
                    <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment) =>{
                        return <tr key={comment.id}>
                            <td>{comment.user.firstName} {comment.user.lastName}</td>
                            <td>{comment.content}</td>
                            <td>{moment(comment.createDate).format("YYYY-MM-DD HH:mm")}</td>
                            </tr>
                    })}
                    
                </tbody>
            </Table>
        </>
    )
}

export default Comment;