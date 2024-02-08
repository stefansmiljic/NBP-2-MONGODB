import { useState, useEffect } from "react";
import './Modal.css';

function EditUserModal(props) {
    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [username, setUsername] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState([]);

    var token = localStorage.getItem("token");

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
        })
      }, []);

    return (
        <div className="modal">
            <div className="editUserDiv">
                <h1>Измени податке</h1>
                <input type="text" placeholder="Име" defaultValue={user.ime} onChange={(e) => handleImeChange(e.target.value)}></input>
                <input type="text" placeholder="Презиме" defaultValue={user.prezime} onChange={(e) => handlePrezimeChange(e.target.value)}></input>
                {/*<input type="text" placeholder="Корисничко име" defaultValue={user.username} onChange={(e) => handleUsernameChange(e.target.value)}></input>*/}
                <input type="password" placeholder="Лозинка" onChange={(e) => handleLozinkaChange(e.target.value)}></input>
                <input type="email" placeholder="Имејл" defaultValue={user.email} onChange={(e) => handleEmailChange(e.target.value)}></input>
                <input type="button" value={"Сачувај измене"} ></input>
            </div>
        </div>
    );
}

export default EditUserModal;