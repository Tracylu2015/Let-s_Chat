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
        <>
            <div className="card text-center shadow-xl" style={{width:"60%"}}>
                <div style={{paddingTop:"20px",margin: "auto",display: "block"}}>
                    <img src={user ? user.avatar : ''} width="120px" className="rounded-xl" />
                </div>
                <div className="card-body">
                    <p><b>Name:</b> {user ? user.name : ''}</p>
                    <p><b>Email: </b>{user ? user.email : ''}</p>
                    <div className="justify-center card-actions" style={{marginTop:"-5px"}} >
                        <button className="btn btn-primary btn-active">More info</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo
