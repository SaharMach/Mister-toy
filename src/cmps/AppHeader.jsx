import { NavLink, useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
return (
    <header className="app-header">
        <nav>
            <h1>Toy App</h1>
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                {/* {user && <NavLink to="/user/profile">Profile</NavLink>} */}
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        </nav>
        <UserMsg />

        </header>
)

}