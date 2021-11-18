import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from "../context/UserContext"

const EditUserForm = ({onSelect}) => {
    const context = useContext(UserContext)
    const [editName, setEditName] = useState()
    const [editEmail, setEditEmail] = useState()
    const [editAvatar, setEditAvatar] = useState()
    const history = useHistory()

    useEffect(() => {
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        let uid = context.currentUser.uid
        axios.get(`http://localhost:8000/api/user/info?me=${uid}`)
            .then(res => {
                if (res.data._id !== uid) {
                    history.push('/user/signIn')
                } else {
                    setEditName(res.data.name)
                    setEditEmail(res.data.email)
                    setEditAvatar(res.data.avatar)
                }
            })
    }, [])

    const UpdateUser = (e) => {
        e.preventDefault()
        let name = editName
        let email = editEmail
        let avatar = editAvatar
        if (context.currentUser == null || context.currentUser.uid == null) {
            return
        }
        let uid = context.currentUser.uid
        axios.put(`http://localhost:8000/api/user/edit/${uid}`, { name, email, avatar })
            .then(res => {
                onSelect(0)
            })
            .catch(err => console.log(err))
    }

    return (

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <h2>Edit Information</h2>
                <form className="form-control mt-6" onSubmit={UpdateUser}>
                    <input onChange={(e) => setEditName(e.target.value)} value={editName} className="input input-primary input-bordered form-control mt-6" type="text" name="name" placeholder="Change a username" />
                    <input onChange={(e) => setEditEmail(e.target.value)} value={editEmail} className="input input-primary input-bordered form-control mt-6" type="text" name="email" placeholder="Change an Email" />
                    <input onChange={(e) => setEditAvatar(e.target.value)} value={editAvatar} className="input input-primary input-bordered form-control mt-6" type="text" name="avatar" placeholder="Change an avatar" />
                    <div>
                        <button className="btn btn-primary btn-active btn-sm form-control mt-6" >Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserForm
