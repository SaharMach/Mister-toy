import { NavLink, useNavigate } from "react-router-dom"
import { UserMsg } from './UserMsg.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { logout } from "../store/action/user.action.js"


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const navigate = useNavigate()




    async function onLogout() {
        try{
            navigate('/')
            const loggedOut = await logout()   
            console.log('Logout successfully')
            showSuccessMsg('Logout successfully')
        }catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }


return (
    <header className="app-header">
        <nav className="main-nav-links">    
            <div className="nav-links">
            <img className="main-nav-links-logo" 
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/56fd5bfe-8531-44a0-8d21-3ebf5ba97c32/de0p3se-fba8b1d4-841d-4a5a-97c6-326840a8eb0e.png/v1/fill/w_847,h_305/2003_knick_knack_toy_story_logo_by_incredicar2004_de0p3se-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzA1IiwicGF0aCI6IlwvZlwvNTZmZDViZmUtODUzMS00NGEwLThkMjEtM2ViZjViYTk3YzMyXC9kZTBwM3NlLWZiYThiMWQ0LTg0MWQtNGE1YS05N2M2LTMyNjg0MGE4ZWIwZS5wbmciLCJ3aWR0aCI6Ijw9ODQ3In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.T6ZFu2vC_i8JJdeQ_lAVMi7StNJtG2gHkZ4NmdITJ7M" alt="" />
                {!user && <NavLink to="/login">Login</NavLink>}
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                {/* {user && <NavLink to="/user/profile">Profile</NavLink>} */}
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
            {user && <section className="user-section">
                <span>Hello {user.fullname}</span>
                <button onClick={onLogout} className="btn-logout">Logout</button>
            </section>}
        </nav>
        <UserMsg />

        </header>
)

}

