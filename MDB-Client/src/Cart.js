import './Cart.css';
import { useState, useEffect } from 'react';
import CartProduct from './CartProduct';
import CartProducts from './CartProducts';

function Cart({updateFlag, setUpdateFlag}) {
    const [korpa, setKorpa] = useState([]);
    const [korpaProizvodi, setKorpaProizvodi] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);
    //const [token, setToken] = useState(null);

    var username = sessionStorage.getItem("username");
    var token = null;
    token = sessionStorage.getItem("token");

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
      useEffect(() => {
        if(username != null) {
            getKorpa().then((data) => {
                setKorpa(data);
                setKorpaProizvodi(data.proizvodiIds);
            });
        }
      }, [updateFlag, username]);

      //console.log("Iz carta: " + username);

      function handleRefresh() {
        setUpdateFlag(prevUpdateFlag => !prevUpdateFlag);
      };

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

    return (
        <div className='cartDiv'>
            <div>
            <span className='numberProducts'>{korpaProizvodi.length}</span>
            <button type='button' className='collapsible' onClick={onClick}><ion-icon name="cart"></ion-icon></button>
            </div>
            <div className='cartContent' style={{display: "none"}}>
                <CartProducts handleRefresh={handleRefresh} deleteFlag={updateFlag}/>
                <label>За плаћање укупно: {korpa.ukupanRacun} дин.</label>
            </div>
        </div>
    );
}

export default Cart;