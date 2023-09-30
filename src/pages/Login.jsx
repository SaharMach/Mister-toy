
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/action/user.action.js'
import { NavLink, useNavigate } from "react-router-dom"

import { useState } from 'react'

export function LoginSignup() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState([])
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        console.log('from submit',isSignupState);
        if (isSignupState) {
            try{
                const user = await signup(credentials)
                showSuccessMsg(`Welcome ${user.fullname}`)
                navigate('/')
            } catch (err) {
                showErrorMsg('Cannot signup, existing user!')
            }
        } else {
            try{
                const user = await login(credentials)
                console.log('user from login:', user)
                showSuccessMsg(`Hi again ${user.fullname}`)
                navigate('/')
            } catch (err) {
                showErrorMsg('Cannot login invalid username/password')
            }
        }
    }

    function onToggleSignupState() {
        setIsSignupState(isSignupState => !isSignupState)
    }

    const { username, password, fullname } = credentials

    return (
            
        <div className="login-page">
            <form className="login-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isSignupState && <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                <button>{isSignupState ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <button href="" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </button >
            </div>
        </div >
    )
}

