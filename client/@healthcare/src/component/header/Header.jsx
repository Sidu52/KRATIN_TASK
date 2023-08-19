import React from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    function handleClick(req, res) {
        navigate('/user/login')
    }
    return (
        <header className='header'>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="links">
                <div className="nav_link">
                    <Link to='/'>Home</Link>
                    <Link to='/'>About</Link>
                    <Link to='/doctor'>Doctor</Link>
                    <Link to='/routine'>Daily-Routine</Link>
                    <Link to='/'>Contact</Link>
                </div>
                <div onClick={handleClick} className="login">
                    <FaUserCircle />
                    Login
                </div>
            </div>

        </header>
    )
}

export default Header;
