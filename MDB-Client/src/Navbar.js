import './Navbar.css';
import Logo from './assets/mdb-horizontal-logo-white.png'
import React, { useState, useEffect } from 'react';
import LogInModal from './Modals/LogInModal';
import RegisterModal from './Modals/RegisterModal';
import Backdrop from './Modals/Backdrop';
import AboutUserModal from './Modals/AboutUserModal';
import EditUserModal from './Modals/EditUserModal';


function Navbar() {
  //const [token, setToken] = useState(null);
  const [LogInModalIsOpen, setLogInModalIsOpen] = useState(false);
  const [AboutUserModalIsOpen, setAboutUserModalIsOpen] = useState(false);
  const [EditUserModalIsOpen, setEditUserModalIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  //var token = localStorage.getItem("token");
  console.log("Token: " + token);
  useEffect(() =>{
    setIsAdmin(sessionStorage.getItem("isAdmin"));
    console.log("JELI ADMIN??: " + typeof(isAdmin));
    setToken(sessionStorage.getItem("token"));
  }, [token, isAdmin]);
  

  function openLogInModalHandler() {
    setLogInModalIsOpen(true);
  }

  function closeLogInModalHandler() {
    setLogInModalIsOpen(false);
  }

  function openAboutUserModalHandler() {
    setAboutUserModalIsOpen(true);
  }

  function closeAboutUserModalHandler() {
    setAboutUserModalIsOpen(false);
  }

  function openEditUserModalHandler() {
    setEditUserModalIsOpen(true);
  }

  function closeEditUserModalHandler() {
    setEditUserModalIsOpen(false);
  }

  const handleLogOut = async () => {
    await fetch(
        "http://localhost:5099/api/Auth/Logout?token=" + sessionStorage.getItem("token"),
        { method: "DELETE" }
    );
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isAdmin");
    setIsAdmin(false);
    window.location.reload();
  };

  return (
      <div className='navbar'>
        <div>
            <a href='http://localhost:3000/' className='logoRef'><img className='mdbLogo' src={Logo}/></a>
        </div>
        <ul className='navbarList'>
          {isAdmin == "true" && <li className='menuItem'><a href="/admin"><span className='menuIcon'><ion-icon name="settings"></ion-icon></span>Админ</a></li>}
          <li className='photoLi'><img className='userPhoto'/></li>
          <li hidden={token != null} className='menuItem'><a href="#" onClick={openLogInModalHandler}><span className='menuIcon'><ion-icon name="person"></ion-icon></span>Улогуј се</a></li>
          <li hidden={token == null} className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="person"></ion-icon></span>Мој налог<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a>
          <ul className='dropdown'>
            <li><a href='#' onClick={openAboutUserModalHandler}>Моји подаци</a></li>
            <li><a href='#' onClick={openEditUserModalHandler}>Измени податке</a></li>
            <li><a href='#' onClick={handleLogOut}>Одјави се</a></li>
          </ul>
          </li>
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
        {LogInModalIsOpen && <LogInModal onCancel={closeLogInModalHandler}/>}
        {LogInModalIsOpen && <Backdrop onClick={closeLogInModalHandler}/>}
        {AboutUserModalIsOpen && <AboutUserModal onOk={closeLogInModalHandler}/>}
        {AboutUserModalIsOpen && <Backdrop onClick={closeAboutUserModalHandler}/>}
        {EditUserModalIsOpen && <EditUserModal onOk={closeEditUserModalHandler}/>}
        {EditUserModalIsOpen && <Backdrop onClick={closeEditUserModalHandler}/>}
      </div>
  );
}

export default Navbar;
