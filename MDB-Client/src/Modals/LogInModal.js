import "./Modal.css"
import RegisterModal from './RegisterModal';
import Backdrop from "./Backdrop";
import React, { useState } from 'react';

function LogInModal(props) {
    const [RegisterModalIsOpen, setRegisterModalIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    function openRegisterModalHandler() {
        setRegisterModalIsOpen(true);
    }

    function closeRegisterModalHandler() {
        setRegisterModalIsOpen(false);
    }

    function cancelHandler() {
      props.onCancel();
    }
    
    const handleLogIn = async () => {
        var formData = await fetch("http://localhost:5099/api/Auth/Login?username=" + username + "&password=" + password, {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            console.log(jsonResponse.user.najskorijePoseceniProizvodi);
            sessionStorage.setItem("token", jsonResponse.token);
            sessionStorage.setItem("username", jsonResponse.user.username);
            sessionStorage.setItem("isAdmin", jsonResponse.user.isAdmin);
            sessionStorage.setItem("ime", jsonResponse.user.ime);
            sessionStorage.setItem("prezime", jsonResponse.user.prezime);
            sessionStorage.setItem("email", jsonResponse.user.email);
            sessionStorage.setItem("id", jsonResponse.user.id);
            sessionStorage.setItem("poseceniProizvodi", JSON.stringify(jsonResponse.user.najskorijePoseceniProizvodi));
          }).catch (error => {
            console.log(error)
          })
        window.location.reload();
    };

    return (
        <div className="modal">
            <div className="logInDiv" hidden={RegisterModalIsOpen}>
                <div className="x" onClick={cancelHandler}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <h1>Пријави се</h1>
                <input type="text" placeholder="Корисничко име" onChange={(e) => handleUsernameChange(e.target.value)}></input>
                <input type="password" placeholder="Лозинка" onChange={(e) => handlePasswordChange(e.target.value)}></input>
                <input type="button" value={"Пријави се"} onClick={handleLogIn}></input>
                <label>Немате налог? <a className="registerRef" onClick={openRegisterModalHandler}>Регуструјте се већ сада!</a></label>
            </div>
        {RegisterModalIsOpen && <RegisterModal onOk={closeRegisterModalHandler} hidden={!RegisterModalIsOpen}/>}
        {RegisterModalIsOpen && <RegisterModal onCancel={closeRegisterModalHandler}/>}
        </div>
    );
}

export default LogInModal;