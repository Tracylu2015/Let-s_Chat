import React, { useState, useEffect,useContext } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import UserContext from "../context/UserContext"

const ManageFriends = ({ onFriendClicked }) => {
    const [friends, setFriends] = useState([])
    const context = useContext(UserContext)

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        axios.get(`http://localhost:8000/api/friend/getall?me=${context.currentUser.uid}`)
            .then(res => {
                setFriends(res.data)
                console.log(friends)
            })
            .catch(err => console.log(err))
    }, context.currentUser == null ? [] : [context.currentUser.uid])

    return (
        <div>
            <h4>Manage Friends</h4>
            <ListGroup as="ul" style={{ display: "flex" }}>
                {friends.map(friend =>
                    <button key={friend._id} onClick={() => onFriendClicked(friend)}>
                        <ListGroup.Item as="li" key={friend._id} style={{ display: 'flex' }}>
                            <div className="avatar">
                                <div className="mb-8 rounded-full w-14 h-14 ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={friend.avatar} />
                                </div>
                            </div> &#160; &#160;
                            <h3 className="mb-5 text-2xl">{friend.name}</h3>&#160;&#160;
                            <button className="btn btn-primary btn-active btn-sm">Delete A Friend</button>
                        </ListGroup.Item>
                    </button>
                )}
            </ListGroup>
        </div>
    )
}

export default ManageFriends
