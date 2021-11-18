import React, { useState, useEffect, useContext } from 'react'
import UserContext from "../context/UserContext"
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const FriendsList = ({ onFriendClicked }) => {
    const [friends, setFriends] = useState([])
    const [loaded, setLoaded] = useState(false)
    const context = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        axios.get(`http://localhost:8000/api/friend/getall?me=${context.currentUser.uid}`)
            .then(res => {
                setFriends(res.data)
                console.log(friends)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, context.currentUser == null ? [] : [context.currentUser.uid])

    return (
        <div>
            <h4>My Friends</h4>
            <ListGroup as="ul" style={{display:"flex"}}>
                {friends.map(friend =>
                    <button key={friend._id} onClick={() => onFriendClicked(friend)}>
                        <ListGroup.Item as="li" key={friend._id}  style={{display:'flex'}}>
                            <div className="avatar">
                                <div className="mb-8 rounded-full w-14 h-14 ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={friend.avatar} />
                                </div>
                            </div> &#160; &#160;
                            <h3 className="mb-5 text-2xl">{friend.name}</h3>
                            {/* <div className="badge ml-2 success">num</div> */}
                        </ListGroup.Item>
                    </button>
                )}
            </ListGroup>
        </div>
    )
}

export default FriendsList




