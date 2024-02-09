import "./Modal.css"
import RegisterModal from './RegisterModal';
import Backdrop from "./Backdrop";
import React, { useState, useEffect } from 'react';

function AboutUserModal() {
    var token = sessionStorage.getItem("token");
    var niz = JSON.parse(sessionStorage.getItem("poseceniProizvodi"));
    console.log(token);

    return (
        <div className="modal">
            {token != null ? ( 
            <div className="aboutDiv">
                <h1>О мени</h1>
                <label>{sessionStorage.getItem("ime")}</label>
                <label>{sessionStorage.getItem("prezime")}</label>
                <label>{sessionStorage.getItem("username")}</label>
                <label>{sessionStorage.getItem("email")}</label>
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