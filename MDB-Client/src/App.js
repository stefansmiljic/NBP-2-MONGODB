import './App.css';
import Background from './Background';
import Home from './Home';
import Navbar from './Navbar';
import Products from './Products';
import Cart from './Cart';
import { useState } from 'react';

function App() {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [productTypeFlag, setProductTypeFlag] = useState(-1);

  const productType = pType => () => {
    setProductTypeFlag(pType);
    window.scrollTo({top:1000, behavior: "smooth"});
  }

  function handleRefresh() {
    setUpdateFlag(prevUpdateFlag => !prevUpdateFlag);
  };
  console.log(productTypeFlag);

  return (
    <div className="App">
      <Background />
      <Home productType={productType}/>
      <Products handleRefresh={handleRefresh} productTypeFlag={productTypeFlag}/>
      <Cart updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/>
      <Navbar />
    </div>
  );
}

export default App;