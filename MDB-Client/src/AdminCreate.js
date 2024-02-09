import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './AdminComponent.css'
import $ from 'jquery';

function AdminCreate() {
    //create
const [naziv, setNaziv] = useState("");
const [linkSlike, setLinkSlike] = useState("");
const [cena, setCena] = useState(0);
const [tip, setTip] = useState(0);
const [info, setInfo] = useState("");

    //create
const handleNazivChange = (value) => {
    setNaziv(value);
};

const handleLinkChange = (value) => {
    setLinkSlike(value);
};

const handleCenaChange = (value) => {
    setCena(value);
};  

const handleTipChange = (value) => {
    setTip(value.value);
};

const handleInfoChange = (value) => {
    setInfo(value);
};

const options = [
    { value: '0', label: 'Чај' },
    { value: '1', label: 'Зачин' },
    { value: '2', label: 'Препарат' }
]

const handleCreate = () => {
    var model = {
        imeProizvoda: naziv,
        urlSlike: linkSlike,
        cena: cena,
        info: info,
        brojPosecenosti: 0,
        tipProizvoda: Number(tip)
    };

    $.ajax({
        type: "POST",
        data: JSON.stringify(model),
        url: "http://localhost:5099/api/Proizvodi/PostProduct",
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
        <div className='kreirajProizvod'>
            <h1>Креирај нови производ</h1>
            <input type="text" placeholder="Унесите назив" onChange={(e) => handleNazivChange(e.target.value)}></input>
            <input type="url" placeholder="Линк слике" onChange={(e) => handleLinkChange(e.target.value)}></input>
            <input type="number" placeholder="Цена производа" onChange={(e) => handleCenaChange(e.target.value)}></input>
            <input type="text" placeholder="О производу" onChange={(e) => handleInfoChange(e.target.value)}></input>
            <Select
                className='selectTip' 
                options={options}
                onChange={handleTipChange}
                placeholder="Изаберите тип"
            />
            <input type='button' value={"Креирај"} onClick={handleCreate}></input>
        </div>
);
}

export default AdminCreate;