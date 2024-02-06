import './Cart.css';
import { useState, useEffect } from 'react';
import CartProduct from './CartProduct';
import CartProducts from './CartProducts';

function Cart() {
    const [korpa, setKorpa] = useState([]);
    const [korpaProizvodi, setKorpaProizvodi] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);
    var username = localStorage.getItem("username");

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
            //console.log("Stampanje iz Cart, korpa-data: " + returnData);
            return returnData;
        }
        catch (error) {
            console.error("Greška prilikom dohvatanja podataka:", error);
            throw error;
        }
      }
      useEffect(() => {
        getKorpa().then((data) => {
            setKorpa(data);
            setKorpaProizvodi(data.proizvodiIds);
        });
      }, [deleteFlag]);

      function handleRefresh() {
        setDeleteFlag(prevDeleteFlag => !prevDeleteFlag);
        console.log("razlicit random")
      };

      console.log(korpaProizvodi);

    const onClick = () => {
        var content = document.getElementsByClassName("cartContent")[0];
        if(content.style.display == "none")
            content.style.display = "block";
        else
            content.style.display = "none";
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    console.log("Stampanje iz carta, korpa: " + JSON.stringify(korpa));

    return (
        <div className='cartDiv'>
            <button type='button' className='collapsible' onClick={onClick}><ion-icon name="cart"></ion-icon></button>
            <div className='cartContent' style={{display: "none"}}>
                <CartProducts handleRefresh={handleRefresh} deleteFlag={deleteFlag}/>
                <label>За плаћање укупно: {korpa.ukupanRacun} дин.</label>
            </div>
        </div>
    );
}

export default Cart;