import './Navbar.css';
import Logo from './assets/mdb-horizontal-logo-white.png'
import React, { useState, useEffect } from 'react';
import LogInModal from './Modals/LogInModal';
import RegisterModal from './Modals/RegisterModal';
import Backdrop from './Modals/Backdrop';
import AboutUserModal from './Modals/AboutUserModal';
import EditUserModal from './Modals/EditUserModal';


function Navbar() {
  const [LogInModalIsOpen, setLogInModalIsOpen] = useState(false);
  const [AboutUserModalIsOpen, setAboutUserModalIsOpen] = useState(false);
  const [EditUserModalIsOpen, setEditUserModalIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState([]);

  var username = sessionStorage.getItem("username");

  console.log("Token: " + token);
  useEffect(() =>{
    setIsAdmin(sessionStorage.getItem("isAdmin"));
    setToken(sessionStorage.getItem("token"));
  }, [token, isAdmin]);

  useEffect(() => {
    if(username != null) {
      getUser(username).then((data) => {
        setUser(data);
      })
    }
  }, [username]);
  

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

  const getUser = async (username) => {
    const user = await fetch(
      "http://localhost:5099/api/Auth/GetUserByUsername?username=" + username
    );
  
    if (!user.ok) {
      return [];
    }
    
    return user.json();
  }

  return (
      <div className='navbar'>
        <div>
            <a href='http://localhost:3000/' className='logoRef'><img className='mdbLogo' src={Logo}/></a>
        </div>
        <ul className='navbarList'>
          {isAdmin == "true" && <li className='menuItem'><a href="/admin"><span className='menuIcon'><ion-icon name="settings"></ion-icon></span>Админ</a></li>}
          {username ? (<li className='photoLi'><img className='userPhoto' src={'data:image/jpeg;base64, ' + btoa(user.slika)}/></li>) : (<label></label>)}
          <li hidden={token != null} className='menuItem'><a href="#" onClick={openLogInModalHandler}><span className='menuIcon'><ion-icon name="person"></ion-icon></span>Улогуј се</a></li>
          <li hidden={token == null} className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="person"></ion-icon></span>Мој налог<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a>
          <ul className='dropdown'>
            <li><a href='#' onClick={openAboutUserModalHandler}>Моји подаци</a></li>
            <li><a href='#' onClick={openEditUserModalHandler}>Измени податке</a></li>
            <li><a href='#' onClick={handleLogOut}>Одјави се</a></li>
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
        {EditUserModalIsOpen && <EditUserModal onCancel={closeEditUserModalHandler}/>}
      </div>
  );
}

export default Navbar;
