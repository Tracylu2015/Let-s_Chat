import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UserContext from "../context/UserContext"

const NotificationList = () => {
    const context = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)
    const [pendingFriends, setPendingFriends] = useState([])

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        axios.get(`http://localhost:8000/api/friend/pendinginvite?me=${context.currentUser.uid}`)
            .then(res => {
                setPendingFriends(res.data)
            })
            .catch(err => console.log(err))
    }, context.currentUser == null ? [] : [context.currentUser.uid])

    const sendRequest = (fuid, accepted) => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        let sender_id = fuid
        let receiver_id = context.currentUser.uid
        let data = pendingFriends.filter(f => f._id !== fuid)
        setPendingFriends(data)

        axios.put(`http://localhost:8000/api/friend/acceptinvite`, { accepted, sender_id, receiver_id })
            .then(res => {
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <ul>
                {pendingFriends.map((friend) => {
                    return (
                        <li key={friend._id}>
                            <img src={friend.avatar} width="40px" />
                            {friend.name} &nbsp;
                            <button className="btn btn-primary btn-active btn-sm" onClick={() => sendRequest(friend._id, true)}>Accept</button> &nbsp;
                            <button className="btn btn-primary btn-active btn-sm" onClick={() => sendRequest(friend._id, false)}>Reject</button>
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default NotificationList
