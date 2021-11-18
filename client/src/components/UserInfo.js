import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import UserContext from "../context/UserContext"

const UserInfo = () => {
    const context = useContext(UserContext)
    const [user, setUser] = useState()

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        axios.get(`http://localhost:8000/api/user/info?me=${context.currentUser.uid}`)
            .then(res => {
                console.log('user ', res.data)
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, context.currentUser == null ? [] : [context.currentUser.uid])

    return (
        <div>
            <h4>User Information</h4>
            <p><b>Avatar:</b> <img src={user ? user.avatar : ''} width="80px" /></p>
            <p><b>Name:</b> {user ? user.name : ''}</p>
            <p><b>Email: </b>{user ? user.email : ''}</p>
        </div>
    )
}

export default UserInfo
