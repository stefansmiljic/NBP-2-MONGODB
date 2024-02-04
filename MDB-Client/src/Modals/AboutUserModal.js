import "./Modal.css"
import RegisterModal from './RegisterModal';
import Backdrop from "./Backdrop";
import React, { useState, useEffect } from 'react';

function AboutUserModal() {
    const [user, setUser] = useState([]);
    var token = localStorage.getItem("token");

    async function getUserByToken() {
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

    useEffect(() => {
        getUserByToken().then((data) => {
            setUser(data);
        });
      }, []);

    return (
        <div className="modal">
            <div className="aboutDiv">
                <h1>О мени</h1>
                <label>{user.ime}</label>
                <label>{user.prezime}</label>
                <label>{user.username}</label>
                <label>{user.email}</label>
            </div>
        </div>
    );
}

export default AboutUserModal;