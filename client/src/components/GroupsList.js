import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserContext from "../context/UserContext"
import FriendPickerModal from './FriendPickerModal'
import ListGroup from 'react-bootstrap/ListGroup'

const GroupsList = ({onGroupClicked}) => {
    const [groups, setGroups] = useState([])
    const [showModal, setShowModal] = useState(false)
    const context = React.useContext(UserContext)

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        axios.get(`http://localhost:8000/api/groups?me=${context.currentUser.uid}`)
            .then(res => {
                setGroups(res.data)
            })
            .catch(err => console.log(err))
    }, context.currentUser == null ? [] : [context.currentUser.uid])

    const showFriendPicker = () => {
        console.log('showFriendPicker')
        setShowModal(true)
    }

    return (
        <div>
            <button className="btn btn-primary btn-active" onClick={showFriendPicker}>Start group chat</button >
            <div>
                <FriendPickerModal showModal={showModal} setShowModal={setShowModal} setGroups={setGroups} groups={groups}/>
            </div>
            <ListGroup as="ul" style={{display:"flex"}}>
                {groups.map(group =>
                    <button key={group._id} onClick={() => onGroupClicked(group)}>
                        <ListGroup.Item as="li" key={group._id}  style={{display:'flex',alignItems:"center"}}>
                            <div className="avatar">
                                <div className="mb-8 rounded-full w-14 h-14 ring ring-primary ring-offset-base-100 ring-offset-2" >
                                    <img src="https://cdn4.vectorstock.com/i/thumb-large/26/28/group-of-people-icon-vector-15262628.jpg" />
                                </div>
                            </div> &#160; &#160;
                            <h2 className="mb-5 text-2xl">{group.groupName}</h2>
                        </ListGroup.Item>
                    </button>
                )}
            </ListGroup>
        </div >
    )
}

export default GroupsList
