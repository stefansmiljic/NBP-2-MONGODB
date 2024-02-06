import './Home.css';
import Logo from './assets/mdb-logo.png'
import React, { useRef } from 'react';

function Home() {
    const ref = useRef(null);
    let productPage = document.getElementsByClassName("productsDiv");
    const handleClick = () => {
      window.scrollTo({top:1000, behavior: "smooth"});
      console.log("sakdaldjal");
    };

    return (
        <div className='home'>
            <div className='logoDiv'>
                <a href='#'><img src={Logo} className='logo'/></a>
            </div>
            <div className='header'>
                <h1>МОНГО ДОБРО БИЉЕ</h1>
                <p>
                    Продавница биљних препарата.
                </p>
            </div>
            <div className='buttons'>
                <button className='homeBtn'><span></span>ЧАЈЕВИ</button>
                <button className='homeBtn'><span></span>ЗАЧИНИ</button>
                <button className='homeBtn'><span></span>ПРЕПАРАТИ</button>
            </div>
            <div className='scrollDown' onClick={handleClick}><ion-icon name="chevron-down"></ion-icon></div>
            <label>Купите сада!</label>
        </div>
    );
}

export default Home;