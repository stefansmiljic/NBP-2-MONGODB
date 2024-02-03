import './Navbar.css';
import Logo from './assets/mdb-horizontal-logo-white.png'
import React, { useState } from 'react';
import LogInModal from './Modals/LogInModal';
import RegisterModal from './Modals/RegisterModal';
import Backdrop from './Modals/Backdrop';

function Navbar() {
  const [token, setToken] = useState(null);
  const [LogInModalIsOpen, setLogInModalIsOpen] = useState(false);

  function openLogInModalHandler() {
    setLogInModalIsOpen(true);
  }

  function closeLogInModalHandler() {
    setLogInModalIsOpen(false);
  }

  return (
      <div className='navbar'>
        <div>
            <a href='http://localhost:3000/' className='logoRef'><img className='mdbLogo' src={Logo}/></a>
        </div>
        <ul className='navbarList'>
          <li className='photoLi'><img className='userPhoto'/></li>
          <li hidden={token != null} className='menuItem'><a href="#" onClick={openLogInModalHandler}><span className='menuIcon'><ion-icon name="person"></ion-icon></span>Улогуј се</a></li>
          <li hidden={token == null} className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="person"></ion-icon></span>Мој налог</a></li>
          <li className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="leaf"></ion-icon></span>Препарати<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a></li>
          <li className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="restaurant"></ion-icon></span>Зачини<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a></li>
          <li className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="cafe"></ion-icon></span>Чајеви<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a>
          <ul className='dropdown'>
            <li><a href='#'>Нана</a></li>
            <li><a href='#'>Хибискус</a></li>
            <li><a href='#'>Камилица</a></li>
          </ul>
          </li>
        </ul>
        {LogInModalIsOpen && <LogInModal onOk={closeLogInModalHandler}/>}
        {LogInModalIsOpen && <Backdrop onClick={closeLogInModalHandler}/>}
      </div>
  );
}

export default Navbar;
