import './Modal.css';
import LogInModal from './LogInModal';
import RegisterModal from './RegisterModal';
import Backdrop from './Backdrop';
import { useState } from 'react';

function NotLoggedModal(props) {
    const [LogInModalIsOpen, setLogInModalIsOpen] = useState(false);
    const [RegisterModalIsOpen, setRegisterModalIsOpen] = useState(false);

    function openLogInModalHandler() {
        setLogInModalIsOpen(true);
    }
    
    function closeLogInModalHandler() {
        setLogInModalIsOpen(false);
    }

    function openRegisterModalHandler() {
        setRegisterModalIsOpen(true);
    }

    function closeRegisterModalHandler() {
        setRegisterModalIsOpen(false);
    }

    function cancelHandler() {
        props.onCancel();
    }

    return (
        <div className="modal">
        <div className="x" onClick={cancelHandler}>
                <ion-icon name="close"></ion-icon>
        </div>
            <div className='nlmodal'>
                <label className='nlInfo'>Морате бити корисник <b>Монго добро биље</b> продавнице како бисте обављали куповине.</label>
                <label><a onClick={openLogInModalHandler}>Пријавите се</a>, или ако немате налог <a onClick={openRegisterModalHandler}>региструјте се</a> већ сада!</label>
            </div>
            {LogInModalIsOpen && <LogInModal onOk={closeLogInModalHandler}/>}
            {LogInModalIsOpen && <LogInModal onCancel={closeLogInModalHandler}/>}
            {RegisterModalIsOpen && <RegisterModal onOk={closeRegisterModalHandler} hidden={!RegisterModalIsOpen}/>}
            {RegisterModalIsOpen && <RegisterModal onCancel={closeRegisterModalHandler}/>}
        </div>
    );
}

export default NotLoggedModal;