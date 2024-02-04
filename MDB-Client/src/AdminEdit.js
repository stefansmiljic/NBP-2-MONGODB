import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './AdminComponent.css'
import $ from 'jquery';

function AdminEdit() {
    //edit
const [proizvodi, setProizvodi] = useState([]);
const [updateProizvodId, setUpdateProizvodId] = useState("");
const [proizvodZaUpdate, setProizvodZaUpdate] = useState([]);
const [noviLink, setNoviLink] = useState("");
const [novoIme, setNovoIme] = useState("");
const [novaCena, setNovaCena] = useState(0);
const [noviTip, setNoviTip] = useState(-1)

    //edit
const handleUpdateProductIdChange = (value) => {
        setUpdateProizvodId(value.value);
        proizvodi.forEach((proizvod)=>{
        	if(proizvod.id == value.value) {
                setProizvodZaUpdate(proizvod)
                setNoviLink(proizvod.urlSlike)
                setNovaCena(proizvod.cena)
                setNovoIme(proizvod.imeProizvoda)
                setNoviTip(proizvod.tipProizvoda)
          }
        })
}

const handleNovaCenaChange = (value) => {
            setNovaCena(value)
}

const handleNovoImeChange = (value) => {
            setNovoIme(value)
}

const handleNoviLinkChange = (value) => {
            setNoviLink(value)
}

const handleUpdatedTipChange = (value) => {
    setNoviTip(value.value);
};

const options = [
    { value: '0', label: 'Чај' },
    { value: '1', label: 'Зачин' },
    { value: '2', label: 'Препарат' }
]

async function getAllProducts() {
    try {
        const data = await fetch("http://localhost:5099/api/Proizvodi/GetProducts", {
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
    getAllProducts().then((data) => {
        setProizvodi(data);
    });
  }, []);

let proizvodiData = [
    ...proizvodi.map((proizvod) => ({ value: proizvod.id, label: proizvod.imeProizvoda })),
];

const handleUpdate = () => {
    var model = {
        imeProizvoda: novoIme,
        urlSlike: noviLink,
        cena: novaCena,
        tipProizvoda: Number(noviTip)
    };

    $.ajax({
        type: "PUT",
        data: JSON.stringify(model),
        url: "http://localhost:5099/api/Proizvodi/UpdateProduct" + updateProizvodId,
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
    <div className="main">
        <div className='urediProizvod'>
            <h1>Изаберите производ за измене</h1>
            <Select 
                    options={proizvodiData}
                    onChange={handleUpdateProductIdChange}
            />
            {proizvodZaUpdate ? (
            <div className='urediInputs'>
            <input className='updInputName' type="text" placeholder="Унесите назив" onChange={(e) => handleNovoImeChange(e.target.value)} value={novoIme}></input>
            <input type="url" placeholder="Линк слике" onChange={(e) => handleNoviLinkChange(e.target.value)} value={noviLink}></input>
            <input type="number" placeholder="Цена производа" onChange={(e) => handleNovaCenaChange(e.target.value)} value={novaCena}></input>
            <Select
                className='selectTip' 
                options={options}
                onChange={handleUpdatedTipChange}
                placeholder="Изаберите тип"
                value={options[noviTip]}
            />
            <input type='button' value={"Ажурирај"} onClick={handleUpdate}></input>
            </div>
            ) : {}
        } 
        </div>
    </div>
);
}

export default AdminEdit;