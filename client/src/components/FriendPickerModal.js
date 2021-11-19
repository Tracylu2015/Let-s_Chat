import React from 'react'
import UserContext from "../context/UserContext"
import Modal from 'react-modal';
import axios from 'axios'

const FriendPickerModal = ({ showModal, setShowModal, groups, setGroups }) => {
    const context = React.useContext(UserContext)
    const [friends, setFriends] = React.useState([])
    const [groupFriends, setGroupFriends] = React.useState(new Set())
    const [groupName, setGroupName] = React.useState('')

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    React.useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        axios.get(`http://localhost:8000/api/friend/getall?me=${context.currentUser.uid}`)
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => console.log(err))
    }, context.currentUser == null ? [] : [context.currentUser.uid])

    const pickFriend = (fuid) => {
        if (groupFriends.has(fuid)) {
            groupFriends.delete(fuid)
        } else {
            groupFriends.add(fuid)
        }
        setGroupFriends(new Set(groupFriends))
    }

    const createGroup = (e) => {
        e.preventDefault()
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        let selectedFriends = groupFriends
        selectedFriends.add(context.currentUser.uid)
        let users = Array.from(selectedFriends)
        axios.post(`http://localhost:8000/api/group/create`, { users, groupName })
            .then(res => {
                setGroups([...groups, res.data])
                setShowModal(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Modal style={customStyles} ariaHideApp={false} isOpen={showModal} onRequestClose={() => { setShowModal(!showModal) }} contentLabel="Select Friends to start group chat">
                <div>
                    <ul>
                        {friends.map((friend) => {
                            return (
                                <li key={friend._id} style={{ display: "flex", alignItems: "center" }}>
                                    <input style ={{marginLeft:"-10px"}}className="checkbox checkbox-lg checkbox-primary"onClick={() => pickFriend(friend._id)} type="checkbox" name="pick" defaultChecked={groupFriends.has(friend._id)} /> &nbsp;&nbsp;&nbsp;
                                    <img src={friend.avatar} width="50px" />&nbsp;&nbsp;
                                    <h5>{friend.name}</h5>
                                </li>)
                        })}
                    </ul>
                    <form>
                        <div>
                            <input className="input input-primary input-bordered form-control" type="text" name="groupName" placeholder="Group Chat Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                        </div>
                        <br />
                        <div>
                            <button className="btn btn-primary btn-active" onClick={() => setShowModal(!showModal)}>Cancel</button>&nbsp;&nbsp;
                            <button className="btn btn-primary btn-active" onClick={(e) => createGroup(e)}>Start chat</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default FriendPickerModal
