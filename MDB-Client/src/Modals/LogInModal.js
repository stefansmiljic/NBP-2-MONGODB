import "./Modal.css"
import RegisterModal from './RegisterModal';
import Backdrop from "./Backdrop";
import React, { useState } from 'react';

function LogInModal() {
    const [RegisterModalIsOpen, setRegisterModalIsOpen] = useState(false);

    function openRegisterModalHandler() {
        setRegisterModalIsOpen(true);
    }

    function closeRegisterModalHandler() {
        setRegisterModalIsOpen(false);
    }

    return (
        <div className="modal">
            <div className="logInDiv" hidden={RegisterModalIsOpen}>
                <input type="text" placeholder="Корисничко име"></input>
                <input type="password" placeholder="Лозинка"></input>
                <input type="button" value={"Пријави се"}></input>
                <label>Немате налог? <a className="registerRef" onClick={openRegisterModalHandler}>Регуструјте се већ сада!</a></label>
            </div>
        {RegisterModalIsOpen && <RegisterModal onOk={closeRegisterModalHandler} hidden={!RegisterModalIsOpen}/>}
        {RegisterModalIsOpen && <RegisterModal onCancel={closeRegisterModalHandler}/>}
        </div>
    );
}

export default LogInModal;