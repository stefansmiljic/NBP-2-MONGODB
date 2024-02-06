import './Products.css';
import { useEffect, useState } from 'react';

function Products() {
    const [proizvodi, setProizvodi] = useState([]);

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
    return (
        <div className="productsMain">
            {proizvodi.map((proizvod, index) => {
                return (
                    <div className="productDiv" key={index}>
                        <img src={proizvod.urlSlike} className="productImage"/>
                        <label>{proizvod.imeProizvoda}</label>
                        <label>Цена: <b>{proizvod.cena} дин.</b></label>
                        <input type='button' value={"Додај у корпу"}></input>
                    </div>
                    )
            })}
        </div>
    );
}

export default Products;