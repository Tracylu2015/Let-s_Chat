import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignInForm = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signInError, setSignInError] = useState('')

    const SignIn = (e) => {
        e.preventDefault()
        setSignInError('')
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((credential) => {
            const user = credential.user
            let _id = user.uid
            axios.post('http://localhost:8000/api/user/signIn', { email, password, _id })
                .then(res => {
                    history.push('/')
                })
        }).catch((err) => {
            setSignInError(err.message)
        })
    }
    return (
        <div>
            <h2>Sign In </h2>
            {signInError
                ? <div><p>{signInError}</p></div>
                : null}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={SignIn} className="form-control mt-6">
                        <input className="input input-primary input-bordered form-control mt-6" type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                        <input className="input input-primary input-bordered form-control mt-6" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-active btn-sm form-control mt-6" role="button" aria-pressed="true">Sign In</button>
                        </div>
                        <br />
                        <Link to="/user/register">Not have an account yet?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInForm
