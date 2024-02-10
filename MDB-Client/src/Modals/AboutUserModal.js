import "./Modal.css"
import RegisterModal from './RegisterModal';
import Backdrop from "./Backdrop";
import React, { useState, useEffect } from 'react';

function AboutUserModal() {
    const [user, setUser] = useState([]);
    var username = sessionStorage.getItem("username");
    var token = sessionStorage.getItem("token");
    var niz = JSON.parse(sessionStorage.getItem("poseceniProizvodi"));
    console.log(token);

    const handleDeleteAccount = async () => {
        await fetch(
            "http://localhost:5099/api/Auth/DeleteAccount?username=" + sessionStorage.getItem("username"),
            { method: "DELETE" }
        );
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("ime");
        sessionStorage.removeItem("prezime");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("poseceniProizvodi");
        window.location.reload();
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
      

    return (
        <div className="modal">
            {token != null ? ( 
            <div className="aboutDiv">
                <h1>О мени</h1>
                <div className="aboutProfilnaDiv"><img src={'data:image/jpeg;base64, ' + btoa(user.slika)} className="aboutProfilna"></img></div>
                <label title="Име">{sessionStorage.getItem("ime")}</label>
                <label title="Презиме">{sessionStorage.getItem("prezime")}</label>
                <label title="Корисничко име">{sessionStorage.getItem("username")}</label>
                <label title="Имејл">{sessionStorage.getItem("email")}</label>
                <input className="deleteAccountBtn" type="button" value={"Обриши налог"} style={{color: 'white', border: 'none'}} onClick={handleDeleteAccount}></input>
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