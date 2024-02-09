import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './AdminComponent.css'
import $ from 'jquery';

function AdminDelete() {
    //delete
    const [proizvodi, setProizvodi] = useState([]);
    const [proizvodId, setProizvodId] = useState("");

		//delete
    const handleProductIdChange = (value) => {
        setProizvodId(value.value);
    }

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

    const handleDeleteProduct = async () => {
        await fetch(
            "http://localhost:5099/api/Proizvodi/DeleteProduct" + proizvodId,
            { method: "DELETE" }
        );
        window.location.reload();
    };

    return (
            <div className='obrisiProizvod'>
                <h1>Обриши производ</h1>
                <Select 
                    options={proizvodiData}
                    onChange={handleProductIdChange}
                />
                <input type='button' value={"Обриши"} onClick={handleDeleteProduct}></input>
            </div>
    );
}

export default AdminDelete;