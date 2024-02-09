import { useState, useEffect } from "react";
import './Modal.css';
import $ from 'jquery';

function EditUserModal(props) {
    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [email, setEmail] = useState("");

    var niz = JSON.parse(sessionStorage.getItem("poseceniProizvodi"));

  console.log("poseceni: " + sessionStorage.getItem("poseceniProizvodi"));
  console.log(niz[1]);

    const handleImeChange = (value) => {
        setIme(value);
    };

    const handlePrezimeChange = (value) => {
        setPrezime(value);
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

      const handleUpdate = () => {
        var model = {
            id: sessionStorage.getItem("id"),
            ime: ime != "" ? ime : sessionStorage.getItem("ime"),
            prezime: prezime != "" ? prezime : sessionStorage.getItem("prezime"),
            password: lozinka,
            email: email != "" ? email : sessionStorage.getItem("email"),
            isAdmin: sessionStorage.getItem("isAdmin") == "false" ? false : true,
            najskorijePoseceniProizvodi: JSON.parse(sessionStorage.getItem("poseceniProizvodi"))
        };
    
        $.ajax({
            type: "PUT",
            data: JSON.stringify(model),
            url: "http://localhost:5099/api/Auth/UpdateUser?username=" + sessionStorage.getItem("username"),
            contentType: "application/json",
            success: function(res) {
                console.log("Success: ", res);
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error("Error: ", errorThrown);
                console.log("Response Text: ", xhr.responseText); // Log the response text for more details
            }
        });
        sessionStorage.setItem("ime", model.ime);
        sessionStorage.setItem("prezime", model.prezime);
        sessionStorage.setItem("email", model.email);
        //window.location.reload();
    };

    return (
        <div className="modal">
            <div className="editUserDiv">
                <h1>Измени податке</h1>
                <input type="text" placeholder="Име" defaultValue={sessionStorage.getItem("ime")} onChange={(e) => handleImeChange(e.target.value)}></input>
                <input type="text" placeholder="Презиме" defaultValue={sessionStorage.getItem("prezime")} onChange={(e) => handlePrezimeChange(e.target.value)}></input>
                <input type="password" placeholder="Лозинка" onChange={(e) => handleLozinkaChange(e.target.value)}></input>
                <input type="email" placeholder="Имејл" defaultValue={sessionStorage.getItem("email")} onChange={(e) => handleEmailChange(e.target.value)}></input>
                <input type="button" value={"Сачувај измене"} onClick={handleUpdate}></input>
            </div>
        </div>
    );
}

export default EditUserModal;