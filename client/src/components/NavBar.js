import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import UserContext from '../context/UserContext'

const NavBar = ({onSelect}) => {
    const history = useHistory()
    const context = useContext(UserContext)
    // const [show, setShow]=useState(false)

    let auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user == null) {
            context.setCurrentUser(null)
            history.push('/user/signIn')
        } else {
            context.setCurrentUser(user)
        }
    });
    const Logout = () => {
        signOut(auth).then(() => {
            context.setCurrentUser(null)
            history.push('/')
        }).catch(e => console.log(e))
    }

    // const showNotification=()=>{
    //     setShow(!show)
    // }

    return (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-none hidden lg:flex">
                <button className="btn btn-square btn-ghost">
                    <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-1 hidden px-2 mx-2 lg:flex">
                <span className="text-lg font-bold" >
                    {context.currentUser != null ? <Link style={{ textDecoration: "none", color: "white" }} to="/" >Let's Chat</Link> : null}
                </span>
            </div>
            <div className="flex-1 lg:flex-none">
                <div className="form-control">
                    <input type="text" name="search" placeholder="Search" class="input input-ghost" />
                </div>
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                </button>
            </div>
            {
                context.currentUser !== null
                    ? <>
                        <div className="flex-none">
                            <Link to="/user/account"><button className="btn btn-ghost" style={{ color: 'white' }}>{context.currentUser.email}</button></Link>
                        </div>
                        <div className="flex-none">
                            <button onClick={Logout} style={{ color: 'white' }} className=" btn btn-ghost" role="button" aria-pressed="true">Sign Out</button>
                        </div>
                    </>
                    : <button className="btn btn-primary btn-active btn-sm">< Link style={{ color: "white", textDecoration: "none" }} to="/user/signIn">Sign In</Link></button>
            }
        </div >
    )
}

export default NavBar
