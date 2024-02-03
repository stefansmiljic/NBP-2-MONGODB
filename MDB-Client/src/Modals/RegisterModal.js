import "./Modal.css"
import { useState } from "react";
import $ from 'jquery';

function RegisterModal(props) {
    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [username, setUsername] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [email, setEmail] = useState("");

    const handleImeChange = (value) => {
        setIme(value);
    };

    const handlePrezimeChange = (value) => {
        setPrezime(value);
    };

    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handleLozinkaChange = (value) => {
        setLozinka(value);
    };

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    function cancelHandler() {
        props.onCancel();
      }

    const handleRegister = () => {
        var model = {
            ime: ime,
            prezime: prezime,
            username: username,
            password: lozinka,
            email: email,
            isAdmin: false
        };
    
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            url: "http://localhost:5099/api/Auth/Register",
            contentType: "application/json",
            success: function(res) {
                console.log("Success: ", res);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error("Error: ", errorThrown);
                console.log("Response Text: ", xhr.responseText); // Log the response text for more details
            }
        });
        window.location.reload();
    };

    return (
        <div className="modal">
            <div className="registerDiv">
                <div className="x" onClick={cancelHandler}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <h1>Региструј се</h1>
                <input type="text" placeholder="Име" onChange={(e) => handleImeChange(e.target.value)}></input>
                <input type="text" placeholder="Презиме" onChange={(e) => handlePrezimeChange(e.target.value)}></input>
                <input type="text" placeholder="Корисничко име" onChange={(e) => handleUsernameChange(e.target.value)}></input>
                <input type="password" placeholder="Лозинка" onChange={(e) => handleLozinkaChange(e.target.value)}></input>
                <input type="email" placeholder="Имејл" onChange={(e) => handleEmailChange(e.target.value)}></input>
                <input type="button" value={"Региструј се"} onClick={handleRegister}></input>
            </div>
        </div>
    );
}

export default RegisterModal;