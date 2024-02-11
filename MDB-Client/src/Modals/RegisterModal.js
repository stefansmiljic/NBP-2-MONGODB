import "./Modal.css";
import { useState } from "react";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterModal(props) {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [username, setUsername] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [repeatLozinka, setRepeatLozinka] = useState("");
  const [email, setEmail] = useState("");
  const [slika, setSlika] = useState("");
  const [poseceniProizvodi, setPoseceniProizvodi] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

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

  const handleRepeatLozinkaChange = (value) => {
    setRepeatLozinka(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  function cancelHandler() {
    props.onCancel();
  }

  function uploadPhoto(inputElement) {
    var file = inputElement.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      var data = reader.result.split(",")[1];
      var binaryBlob = atob(data);
      setSlika(binaryBlob);
      console.log(binaryBlob);
    };
    reader.readAsDataURL(file);
  }

  const uncorrectRepeatPassword = () => toast("Лозинке се не поклапају!");
  const fillAllFields = () => toast("Нисте попунили сва поља!");

  const handleLogIn = async (username, password) => {
    if (username != "" && password != "") {
      var formData = await fetch(
        "http://localhost:5099/api/Auth/Login?username=" +
          username +
          "&password=" +
          password,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          console.log(jsonResponse.user.najskorijePoseceniProizvodi);
          sessionStorage.setItem("token", jsonResponse.token);
          sessionStorage.setItem("username", jsonResponse.user.username);
          sessionStorage.setItem("isAdmin", jsonResponse.user.isAdmin);
          sessionStorage.setItem("ime", jsonResponse.user.ime);
          sessionStorage.setItem("prezime", jsonResponse.user.prezime);
          sessionStorage.setItem("email", jsonResponse.user.email);
          sessionStorage.setItem("id", jsonResponse.user.id);
          sessionStorage.setItem(
            "poseceniProizvodi",
            JSON.stringify(jsonResponse.user.najskorijePoseceniProizvodi)
          );
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (username == "" || password == "") {
      fillAllFields();
    }
  };

  const handleRegister = () => {
    if (
      lozinka == repeatLozinka &&
      ime != "" &&
      prezime != "" &&
      username != "" &&
      lozinka != "" &&
      repeatLozinka != "" &&
      email != "" &&
      slika != ""
    ) {
      var model = {
        ime: ime,
        prezime: prezime,
        username: username,
        password: lozinka,
        email: email,
        isAdmin: false,
        najskorijePoseceniProizvodi: poseceniProizvodi,
        slika: slika,
      };

      $.ajax({
        type: "POST",
        data: JSON.stringify(model),
        url: "http://localhost:5099/api/Auth/Register",
        contentType: "application/json",
        success: function (res) {
          console.log("Success: ", res);
          handleLogIn(username, lozinka);
        },
        error: function (xhr, textStatus, errorThrown) {
          console.error("Error: ", errorThrown);
          console.log("Response Text: ", xhr.responseText);
        },
      });
    } else if (
      (ime != "" &&
        prezime != "" &&
        username != "" &&
        lozinka != "" &&
        repeatLozinka != "" &&
        email != "" &&
        slika != "") == false
    ) {
      fillAllFields();
    } else {
      uncorrectRepeatPassword();
    }
  };

  return (
    <div className="modal">
      <div className="registerDiv">
        <div className="x" onClick={cancelHandler}>
          <ion-icon name="close"></ion-icon>
        </div>
        <h1>Региструј се</h1>
        <ToastContainer
          className={"Toastify__toast-container--bottom-center"}
        />
        <input
          type="text"
          placeholder="Име"
          onChange={(e) => handleImeChange(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Презиме"
          onChange={(e) => handlePrezimeChange(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Корисничко име"
          onChange={(e) => handleUsernameChange(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Лозинка"
          onChange={(e) => handleLozinkaChange(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Поновите лозинку"
          onChange={(e) => handleRepeatLozinkaChange(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Имејл"
          onChange={(e) => handleEmailChange(e.target.value)}
        ></input>
        <label style={{fontSize: '14px'}}>Профилна слика:</label>
        <input
          type="file"
          accept="image/*"
          className="uploadPhoto"
          onChange={(e) => uploadPhoto(e.target)}
          id="myFileInput"
        ></input>
        <input
          type="button"
          value={"Региструј се"}
          onClick={handleRegister}
        ></input>
      </div>
    </div>
  );
}

export default RegisterModal;
