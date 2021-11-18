import axios from 'axios'
import React, { useEffect, useState, useContext, useRef } from 'react'
import UserContext from "../context/UserContext"
import io from 'socket.io-client';
import '../message.css'
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatBubble = ({ chatUser }) => {
    const context = useContext(UserContext)
    const [localChatUser, setLocalChatUser] = useState()
    const [newMsg, setNewMsg] = useState('')
    const [msgs, setMsgs] = useState([])
    const [me, setMe] = useState([])
    const [socket] = useState(() => io('localhost:8000'))

    if (chatUser != null && (localChatUser == null || localChatUser._id !== chatUser._id)) {
        setLocalChatUser(chatUser)
        setMsgs([])
        setNewMsg('')
    }

    socket.on("connect", () => {
        if (context.currentUser != null) {
            socket.emit('join', context.currentUser.uid);
        }
    });

    socket.on('on_message', data => {
        setMsgs([...msgs, data])
    })

    useEffect(() => {
        return () => socket.disconnect(true);
    }, []);

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null || chatUser == null) {
            return
        }
        axios.get(`http://localhost:8000/api/chat/findAll?me=${context.currentUser.uid}&friend_id=${chatUser._id}`)
            .then(res => {
                //may have bugs
                setMe(res.data.me)
                setMsgs([...msgs, ...res.data.messages])
            })
            .catch(e => console.log(e))
    }, [chatUser])

    const SendMsg = (e) => {
        e.preventDefault()

        let sender = context.currentUser.uid
        let receiver = chatUser._id
        let msg = newMsg
        setNewMsg('')
        setMsgs([...msgs, { msg, sender, receiver }])
        socket.emit('friend_chat', { msg, sender, receiver })
    }
    const msgsEndRef = useRef(null)
    const Messages = ({ msgs }) => {
        const scrollToBottom = () => {
            msgsEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
        useEffect(scrollToBottom, [msgs]);
    }

    return (
        <div>
            {chatUser ? <h4>Chat with {chatUser.name}</h4> : null}
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
                                            <img src={chatUser.avatar} width='40px' />
                                        </div> &#160;
                                        <div className="chat-body">
                                            <div className="chat-message">
                                                <h5>{chatUser.name}</h5>
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

            <form onSubmit={SendMsg} style={{
                display: "flex", alignItems: "baseline"
            }}>
                <input className="input input-primary input-bordered form-control" onChange={e => setNewMsg(e.target.value)} type="text" name="msg" placeholder="input message" value={newMsg} /> &#160;
                <button className="btn btn-primary btn-active">Send</button>
            </form>
        </div >
    )
}

export default ChatBubble
