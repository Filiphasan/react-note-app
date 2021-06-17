import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const handleClick = () => {
        localStorage.removeItem("token")
    }
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Not Uygulaması</h1>
            <Link to="/" className="navbar-logout" onClick={handleClick}><i className="fas fa-sign-out-alt"></i> Çıkış Yap</Link>
        </nav>
    )
}

export default Navbar
