import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UserContext from "../context/UserContext"

const UserList = () => {
    const context = useContext(UserContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        axios.get(`http://localhost:8000/api/friend/findFrinds?me=${context.currentUser.uid}`)
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }, context.currentUser == null ? [] : [context.currentUser.uid])

    const sendRequest = (fuid) => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        let data = { 'sender_id': context.currentUser.uid, 'receiver_id': fuid }
        axios.post(`http://localhost:8000/api/friend`, data)
            .then(res => {
                data = []
                for (let user of users) {
                    if (user._id === fuid) {
                        user.status = 'pending'
                    }
                    data.push(user)
                }
                setUsers(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h4>Add More Friends</h4>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user._id} style={{display:"flex"}}>
                            <img src={user.avatar} width="60px" />&nbsp;&nbsp;
                            {user.name}&nbsp;&nbsp;
                            <button className="btn btn-primary btn-active btn-sm" disabled={user.status === 'pending'} onClick={() => sendRequest(user._id)}>Send Request</button>
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default UserList
