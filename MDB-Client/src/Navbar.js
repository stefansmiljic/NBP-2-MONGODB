import './Navbar.css';
import Logo from './assets/mdb-horizontal-logo-white.png'

function Navbar() {
  return (
      <div className='navbar'>
        <div>
            <a href='http://localhost:3000/' className='logoRef'><img className='mdbLogo' src={Logo}/></a>
        </div>
        <ul className='navbarList'>
          <li className='photoLi'><img className='userPhoto'/></li>
          <li className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="person"></ion-icon></span>Мој налог<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a></li>
          <li className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="leaf"></ion-icon></span>Препарати<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a></li>
          <li className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="restaurant"></ion-icon></span>Зачини<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a></li>
          <li className='menuItem'><a href="#"><span className='menuIcon'><ion-icon name="cafe"></ion-icon></span>Чајеви<span className='menuIcon'><ion-icon name="caret-down-outline"></ion-icon></span></a>
          <ul className='dropdown'>
            <li><a href='#'>Нана</a></li>
            <li><a href='#'>Хибискус</a></li>
            <li><a href='#'>Камилица</a></li>
          </ul>
          </li>
        </ul>
      </div>
    
  );
}

export default Navbar;
