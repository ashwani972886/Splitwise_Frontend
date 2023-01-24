import { logo, logoWhite, avatar } from '../Utils/img';
import React, { useContext, useEffect, useState } from 'react';
import {  Link, useLocation  } from "react-router-dom";
import UserContext from '../../context/user/UserContext';

export default function Header() {
    let location = useLocation();
    // const [user, setUser] = useState({});
    const auth = localStorage.getItem('auth');
    const {setIsAuthenticated, setError, setUser, user, fetchUser, setFriends} = useContext(UserContext);

    // Toggle Dropdown
    const toggleDropdown = e => {
        e.preventDefault();
        const dropdownMenu = document.getElementById('dropdown-header');
        if( dropdownMenu.style.display ===  'none'  || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    };

    // Logout User Function
    const logout = () => {
        setIsAuthenticated(false);
        setUser([]);
        setFriends([]);
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
    };

    useEffect( () => {
        
        if(auth) {
            setError([]);
            fetchUser();
        }

    }, [setError, auth]);
    
  return (
    <>
        {localStorage.getItem('auth') ? 
            <>
                {location.pathname !== "/groups/new" ? 
                    <nav className='navbar-after-login '>
                        <div className="nav-container-after-login flex justify-between align-items-center">
                            {/* Logo */}
                            <Link to="dashboard">
                                <img className="nav-brand-white" src={ logoWhite } alt="Splitwise" />
                            </Link>
            
                            {/* User Profile */}
                            <div className="avatar-container avatar flex justify-center align-items-center" onClick={ toggleDropdown }>
                                <a href='' className="user-profile-btn flex justify-center align-items-center">
                                    <img src={ avatar }  className="user-avatar" />
                                    {/* Name of user from database */}
                                    {user.name} 
                                    <b className="caret avatar"></b>
                                </a>
            
                                {/* Dropdown menu */}
                                <ul className="dropdown-menu" id="dropdown-header">
                                    <li>
                                        <a href="">Your account</a>
                                    </li>
                                    <li>
                                        <a href="">Create a group</a>
                                    </li>
                                    <li>
                                        <a href="" target="_blank" rel="noreferrer">Fairness calculators</a>
                                    </li>
                                    <li>
                                        <a href="">Contact support</a>
                                    </li>
                                    <li>
                                        <Link to="/" onClick={logout}>Log out</Link>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </nav> : 
                    ""
                }
            </>
            :
            <nav className='navbar '>
                <div className="nav-container flex justify-between align-items-center">
                    {/* Logo */}
                    <Link to="/">
                        <img className="nav-brand" src={ logo} alt="Splitwise" />
                    </Link>
                    {/* Login/Signup action buttons */}
                    <div className="btn-container flex justify-center align-items-center">
                        <Link to='/login' className="btn login">Log in</Link>
                        <Link to='/signup' className="btn signUp">Sign up</Link>
                    </div>
                </div>
            </nav>
        }
    </>
  )
};
