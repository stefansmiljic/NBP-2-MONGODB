import './Products.css';
import { useEffect, useState } from 'react';

function Products({handleRefresh, productTypeFlag}) {
    const [proizvodi, setProizvodi] = useState([]);
    var username = localStorage.getItem("username");

    

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
      }, [productTypeFlag]);


      const handleAddProductToCart = pId => async () => {
        await fetch(
            "http://localhost:5099/api/Kupovina/DodajProizvodUKorpu?username=" + username + "&proizvodId=" + pId + "&count=" + 1,
            { method: "PUT" }
            );
            if (typeof handleRefresh === 'function') {
                handleRefresh();
              } else {
                console.error('setDeleteFlag is not a function' + typeof(setDeleteFlag));
              }
    };

    return (
        <div className="productsMain">
            <div className='productsSubDiv'>
            {productTypeFlag != null ? (proizvodi.filter(p=>p.tipProizvoda == productTypeFlag).map((proizvod, index) => {
                return (
                    <div className="productDiv" key={index}>
                        <img src={proizvod.urlSlike} className="productImage"/>
                        <label>{proizvod.imeProizvoda}</label>
                        <label>Цена: <b>{proizvod.cena} дин.</b></label>
                        <input type='button' value={"Додај у корпу"} onClick={handleAddProductToCart(proizvod.id)}></input>
                    </div>)
            })) : (proizvodi.map((proizvod, index) => {
                return (
                    <div className="productDiv" key={index}>
                        <img src={proizvod.urlSlike} className="productImage"/>
                        <label>{proizvod.imeProizvoda}</label>
                        <label>Цена: <b>{proizvod.cena} дин.</b></label>
                        <input type='button' value={"Додај у корпу"} onClick={handleAddProductToCart(proizvod.id)}></input>
                    </div>
                )
            }))}
            </div>
            <div class="pagination">
                <a href="#">&laquo;</a>
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
                <a href="#">&raquo;</a>
            </div>
        </div>
    );
}

export default Products;