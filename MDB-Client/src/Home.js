import './Home.css';
import Logo from './assets/mdb-logo.png'

function Home() {
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
        </div>
    );
}

export default Home;