import axios from 'axios'
import React, { useEffect, useState, useContext, useRef } from 'react'
import UserContext from "../context/UserContext"
import io from 'socket.io-client';
import '../message.css'
import '../emoji.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


const GroupBubble = ({ chatGroup }) => {
    const context = useContext(UserContext)
    const [localGroup, setLocalGroup] = useState()
    const [newMsg, setNewMsg] = useState('')
    const [msgs, setMsgs] = useState([])
    const [me, setMe] = useState([])
    const [groupMembers, setGroupMembers] = useState([])
    const [emojiPicker, setEmojiPicker] = useState(false)
    const [socket] = useState(() => io('localhost:8000'))

    if (chatGroup != null && (localGroup == null || localGroup._id !== chatGroup._id)) {
        setLocalGroup(chatGroup)
        setMsgs([])
        setNewMsg('')
    }

    socket.on("connect", () => {
        socket.emit('join', context.currentUser.uid);
    });

    socket.on('on_group_message', data => {
        console.log('on_group_message', data)
        if (chatGroup != null && data.group._id === chatGroup._id) {
            setMsgs([...msgs, data])
        }
    })

    useEffect(() => {
        return () => socket.disconnect(true);
    }, []);

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null || chatGroup == null) {
            return
        }
        axios.get(`http://localhost:8000/api/groupchat/findAll?me=${context.currentUser.uid}&group_id=${chatGroup._id}`)
            .then(res => {
                //may have bugs
                setMe(res.data.me)
                setGroupMembers(res.data.groupMembers)
                setMsgs([...msgs, ...res.data.messages])
            })
            .catch(e => console.log(e))
    }, [chatGroup])

    const SendMsg = (e) => {
        e.preventDefault()

        let sender = context.currentUser.uid
        let group = chatGroup
        let msg = newMsg

        socket.emit('group_chat', { msg, sender, group })
        setMsgs([...msgs, { msg, sender, group }])
        setNewMsg('')
    }
    const msgsEndRef = useRef(null)

    const toggleEmoji = (e) => {
        e.preventDefault()
        setEmojiPicker(!emojiPicker)
    }
    const addEmoji = (e) => {
        let emoji = e.native;
        setNewMsg(newMsg + emoji)
        setEmojiPicker(!emojiPicker)
    }

    return (
        <div>
            {chatGroup ? <h4>Chat with {groupMembers.map(g => g.name).join(', ')}</h4> : null}
            <ScrollToBottom>
                <div class="card-body height3" style={{ height: "700px" }}>
                    <ul className="chat-list">
                        {
                            msgs.map((msg, i) => {
                                <div ref={msgsEndRef} />
                                if (msg.sender == me._id) {
                                    return (<li key={i} className="out">
                                        <div className="chat-img">
                                            <img src={me.avatar} width='40px' />
                                        </div>
                                        <div className="chat-body">
                                            <div className="chat-message">
                                                <h5>{me.name}</h5>
                                                <p style={{ display: "flex", justifyContent: "right" }}>{msg.msg}</p>
                                            </div>
                                        </div>
                                    </li>)
                                } else {
                                    return (
                                        <li key={i} className="in">
                                            <div className="chat-img">
                                                <img src={groupMembers.filter(m => m._id === msg.sender)[0].avatar} width='40px' />
                                            </div> &#160;
                                            <div className="chat-body">
                                                <div className="chat-message">
                                                    <h5>{groupMembers.filter(m => m._id === msg.sender)[0].name}</h5>
                                                    <p>{msg.msg}</p>
                                                </div>
                                            </div>
                                        </li>)
                                }
                            })
                        }
                    </ul>
                </div>
            </ScrollToBottom>
            <form style={{
                display: "flex", alignItems: "baseline"
            }}>
                <input className="input input-primary input-bordered form-control" onChange={e => setNewMsg(e.target.value)} type="text" name="msg" placeholder="input message" value={newMsg} /> &#160;&#160;
                <button onClick={(e) => toggleEmoji(e)}><img src="https://images.vexels.com/media/users/3/223241/isolated/lists/1c99826e2f69c802555032c6954bc2ed-laughing-emoji-icon.png" alt="emoji" width="60px" style={{ display: "inline-block", verticalAlign: "middle", height: "100%" }} /></button>&#160;&#160;
                <button onClick={SendMsg} className="btn btn-primary btn-active">Send</button>

            </form>
            <span style={{ display: emojiPicker ? "block" : "none", position: "absolute", top: "35%", right: "5%" }}>
                <Picker onSelect={addEmoji} />
            </span>
        </div >
    )
}

export default GroupBubble
