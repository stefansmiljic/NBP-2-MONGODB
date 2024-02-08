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
  const [user, setUser] = useState([]);

  var token = localStorage.getItem("token");
  console.log("Token: " + token);

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
        "http://localhost:5099/api/Auth/Logout?token=" + token,
        { method: "DELETE" }
    );
    localStorage.removeItem("token");
    window.location.reload();
  };

  async function getUserByToken() {
    if(token!=null)
    {
      try {
          const data = await fetch("http://localhost:5099/api/Auth/GetUserByToken?token=" + token, {
              method: "GET",
              mode: 'cors',
          });
  
          if (!data.ok) {
              throw new Error(`HTTP error! Status: ${data.status}`);
          }
  
          const returnData = await data.json();
          return returnData;
      } catch (error) {
          console.error("Greška prilikom dohvatanja podataka:", error);
          throw error;
      }
    }
    else
    {
      return;
    }
}

useEffect(() => {
    getUserByToken().then((data) => {
        setUser(data);
    });
  }, [token]);

  return (
      <div className='navbar'>
        <div>
            <a href='http://localhost:3000/' className='logoRef'><img className='mdbLogo' src={Logo}/></a>
        </div>
        <ul className='navbarList'>
          <li hidden={user? !user.isAdmin : true} className='menuItem'><a href="/admin"><span className='menuIcon'><ion-icon name="settings"></ion-icon></span>Админ</a></li>
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
        {LogInModalIsOpen && <Backdrop onClick={closeLogInModalHandler}/>}
        {AboutUserModalIsOpen && <AboutUserModal onOk={closeLogInModalHandler}/>}
        {AboutUserModalIsOpen && <Backdrop onClick={closeAboutUserModalHandler}/>}
        {EditUserModalIsOpen && <EditUserModal onOk={closeEditUserModalHandler}/>}
        {EditUserModalIsOpen && <Backdrop onClick={closeEditUserModalHandler}/>}
      </div>
  );
}

export default Navbar;
