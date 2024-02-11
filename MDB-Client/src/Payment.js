import { useState, useEffect } from "react";
import './Payment.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Payment() {
    const [korpa, setKorpa] = useState([]);
    const [korpaProizvodi, setKorpaProizvodi] = useState([]);
    const [proizvodi, setProizvodi] = useState([]);
    const [duzinaKorpe, setDuzinaKorpe] = useState(0);
    const [racun, setRacun] = useState(0);

    var username = localStorage.getItem("usernameForPay");

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
                setDuzinaKorpe(data.proizvodiIds.length);
                setRacun(data.ukupanRacun);
            });
        }
      }, [username]);
      console.log("Prava duzina korpe: " + duzinaKorpe)

      const getProduct = async (productid) =>  {
        const product = await fetch(
          "http://localhost:5099/api/Proizvodi/GetProduct" + productid
        );
      
        if (!product.ok) {
          return [];
        }
        
        return product.json();
      }

      useEffect(() => {
        if(korpaProizvodi.length != 0) {
            korpaProizvodi.forEach((proizvod) => {
                getProduct(proizvod).then((data) => {
                    setProizvodi(prev => [...prev, data]);
                })
            })
        }
      }, [korpaProizvodi])

      console.log("username: " + username) 
      console.log(korpa)
      console.log(korpaProizvodi)
      console.log(proizvodi)

      const paymentDone = () => toast("Куповина је успешно обављена!");
      const emptyCart = () => toast("Ваша корпа је празна!");

      const isprazniKorpu = async () => {
            if(racun != 0) {
                await fetch(
                    "http://localhost:5099/api/Kupovina/IsprazniKorpu?username=" + username,
                    { method: "PUT" }
                );
                paymentDone();
                
                setTimeout(() => {
                    window.location.reload()
                }, 5000)
            }
            else {
                emptyCart();
            }
      }

    return (
        <div className="paymentMain">
        <ToastContainer className={'Toastify__toast-container--bottom-center'}/>
            <div className="payOptions">
            <h1>Изаберите начин плаћања</h1>
            <section className="add-card page">
                <form className="form">
                    <label for="name" className="label">
                    <span className="title">Корисник платне картице</span>
                    <input
                        className="input-field"
                        type="text"
                        name="input-name"
                        title="Input title"
                        placeholder="Унесите име и презиме"
                    />
                    </label>
                    <label for="serialCardNumber" className="label">
                    <span className="title">Број картице</span>
                    <input
                        id="serialCardNumber"
                        className="input-field"
                        type="number"
                        name="input-name"
                        title="Input title"
                        placeholder="0000 0000 0000 0000"
                    />
                    </label>
                    <div className="split">
                    <label for="ExDate" className="label">
                        <span className="title">Датум истека</span>
                        <input
                        id="ExDate"
                        className="input-field"
                        type="text"
                        name="input-name"
                        title="Expiry Date"
                        placeholder="01/23"
                        />
                    </label>
                    <label for="cvv" className="label">
                        <span className="title"> CVV</span>
                        <input
                        id="cvv"
                        className="input-field"
                        type="number"
                        name="cvv"
                        title="CVV"
                        placeholder="CVV"
                        />
                    </label>
                    </div>
                    <input className="checkout-btn" type="button" value="Плати сада" onClick={isprazniKorpu}/>
                </form>
            </section>
            <div className="razdvajanje"></div>
            <a href='https://www.paypal.com/' target="_blank" className="paypal"><ion-icon name="logo-paypal"></ion-icon><label>PayPal</label></a>
            </div>
            <div className="rezimeKorpa">
                <h1>Ваша корпа</h1>
                { proizvodi.length != 0 ? (
                proizvodi.slice(0, duzinaKorpe).map((p, index) => {
                    return (
                    <div className="rezimeKorpaProizvod" key={index}>
                        <label>{p.imeProizvoda}</label>
                        <label>{p.cena} дин.</label>
                    </div>
                    )
                })
                ) : (<label style={{color: 'grey'}}>Ваша корпа је празна.</label>)
            }
            <h1>Укупно <b>{korpa.ukupanRacun}</b> дин.</h1>
            </div>
        </div>
    );
}

export default Payment;