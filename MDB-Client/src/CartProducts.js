import CartProduct from "./CartProduct";
import { useState, useEffect } from "react";
import './Cart.css';

export default function CartProducts({handleRefresh, deleteFlag}) {
    const [korpaProizvodi, setKorpaProizvodi] = useState([]);
    
    var username = sessionStorage.getItem("username");

    useEffect(() => {
      async function getKorpa() {
        try {
            const data = await fetch("http://localhost:5099/api/Kupovina/GetKorpa?username=" + username, {
                method: "GET",
                mode: 'cors'
            });

            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`);
            }
            
            const returnData = await data.json();
            return returnData;
        }
        catch (error) {
            console.error("Greška prilikom dohvatanja podataka:", error);
            throw error;
        }
      }
        getKorpa().then((data) => {
            setKorpaProizvodi(data.proizvodiIds);
        });
      }, [deleteFlag]);

      

    return (
        <div className='cartProducts'>
                {korpaProizvodi.map((item, index) => {
                    return (
                        <CartProduct key={index} productId={item} handleRefresh={handleRefresh}/>
                    );
                })}
        </div>
    );
}