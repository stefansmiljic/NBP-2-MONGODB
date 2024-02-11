import "./Modal.css"
import RegisterModal from './RegisterModal';
import Backdrop from "./Backdrop";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AboutUserModal() {
    const [user, setUser] = useState([]);
    const [password, setPassword] = useState("");
    
    const handlePasswordChange = (value) => {
        setPassword(value.value);
    };

    var username = sessionStorage.getItem("username");
    var token = sessionStorage.getItem("token");
    var niz = JSON.parse(sessionStorage.getItem("poseceniProizvodi"));
    console.log(token);

    function openDeleteAccountModalHandler() {
      var dokument = document.getElementsByClassName("deleteAccountDiv");
      dokument[0].classList.add("active");
  }

    const getUser = async (username) => {
        const user = await fetch(
          "http://localhost:5099/api/Auth/GetUserByUsername?username=" + username
        );
      
        if (!user.ok) {
          return [];
        }
        
        return user.json();
      }

      useEffect(() => {
        if(username != null) {
          getUser(username).then((data) => {
            setUser(data);
          })
        }
      }, [username]);

      const noPassword = () => toast("Нисте унели лозинку!");
      const pleaseWait = () => toast("Молимо сачекајте...");

      const handleDeleteAccount = async () => {
        if(password != "") {
        await fetch(
            "http://localhost:5099/api/Auth/DeleteAccount?username=" + sessionStorage.getItem("username") + "&password=" + password,
            { method: "DELETE" }
        );
        pleaseWait();
        setTimeout(() => {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("isAdmin");
          sessionStorage.removeItem("ime");
          sessionStorage.removeItem("prezime");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("poseceniProizvodi");
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        noPassword();
      }
    }
    

    return (
        <div className="modal" >
            {token != null ? ( 
            <div className="aboutDiv">
                <h1>О мени</h1>
                <ToastContainer className={'Toastify__toast-container--bottom-center'}/>
                <div className="aboutProfilnaDiv"><img src={'data:image/jpeg;base64, ' + btoa(user.slika)} className="aboutProfilna"></img></div>
                <label title="Име">{sessionStorage.getItem("ime")}</label>
                <label title="Презиме">{sessionStorage.getItem("prezime")}</label>
                <label title="Корисничко име">{sessionStorage.getItem("username")}</label>
                <label title="Имејл">{sessionStorage.getItem("email")}</label>
                <input className="deleteAccountBtn" type="button" value={"Обриши налог"} style={{color: 'white', border: 'none'}} onClick={openDeleteAccountModalHandler}></input>
                <div className="deleteAccountDiv"><input type='password' onChange={(e) => handlePasswordChange(e.target)} placeholder="Унесите лозинку"></input>
                <input onClick={handleDeleteAccount} type='button' value={"Потврди"} className="deleteAccountBtn2" style={{color: 'white', border: 'none'}}></input></div>
            </div>
            ): {}} 
            <div className="poseceniProizvodi">
            <label className="poseceniNaslov">Ваши најскорије посећени производи:</label>
            {niz.map(p => {
                return (
                <label>{p}</label>
                )
            })}
            </div>
        </div>
    );
}

export default AboutUserModal;