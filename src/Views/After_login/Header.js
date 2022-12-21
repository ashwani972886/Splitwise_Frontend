import { logoWhite, avatar } from '../Utils/img/';
import React from 'react';

export default function Header() {

    const toggleDropdown = e => {
        e.preventDefault();
        const dropdownMenu = document.getElementById('dropdown-header');
        if( dropdownMenu.style.display ===  'none'  || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    };

  return (
        <nav className='navbar-after-login '>
            <div className="nav-container-after-login flex justify-between align-items-center">
                
                {/* Logo */}
                <a href="#">
                    <img className="nav-brand-white" src={ logoWhite } alt="Splitwise" />
                </a>

                {/* User Profile */}
                <div className="avatar-container avatar flex justify-center align-items-center" onClick={ toggleDropdown }>
                    <a href='' className="user-profile-btn flex justify-center align-items-center">
                        <img src={ avatar }  className="user-avatar" />
                        Ashwani Goyal
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
                            <a href="">Fairness calculators</a>
                        </li>
                        <li>
                            <a href="">Contact support</a>
                        </li>
                        <li>
                            <a href="">Log out</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
  )
};
