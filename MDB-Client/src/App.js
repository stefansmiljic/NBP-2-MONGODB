import './App.css';
import Background from './Background';
import Home from './Home';
import Navbar from './Navbar';
import Products from './Products';
import Cart from './Cart';
import { useEffect, useState } from 'react';
import NotLoggedModal from './Modals/NotLoggedModal';
import Backdrop from './Modals/Backdrop';
import ProductModal from './Modals/ProductModal';

function App() {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [productTypeFlag, setProductTypeFlag] = useState(-1);
  const [NLModalIsOpen, setNLModalIsOpen] = useState(false);
  const [ProductModalIsOpen, setProductModalIsOpen] = useState(false);
  const [product, setProduct] = useState([]);

  var token = null;
  token = sessionStorage.getItem("token");

  const productType = pType => () => {
    setProductTypeFlag(pType);
    window.scrollTo({top:1000, behavior: "smooth"});
  }

  function handleRefresh() {
    setUpdateFlag(prevUpdateFlag => !prevUpdateFlag);
  };
  console.log(productTypeFlag);

  function openNLModalHandler() {
    setNLModalIsOpen(true);
  }

  function closeNLModalHandler() {
    setNLModalIsOpen(false);
  }

  
  function otvoriProductModal(proizvod) {
    openProductModalHandler(proizvod);
}

  function openProductModalHandler(product) {
    setProductModalIsOpen(true);
    setProduct(product);
  }

  function closeProductModalHandler() {
    setProductModalIsOpen(false);
  }

  function postaviProizvod() {
    
  }

  return (
    <div className="App">
      <Background />
      <Home productType={productType}/>
      <Products handleRefresh={handleRefresh} productTypeFlag={productTypeFlag} openNLModalHandler={openNLModalHandler} openProductModalHandler={otvoriProductModal} />
      <div hidden={token == null}><Cart updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/></div>
      <Navbar />
        {NLModalIsOpen && <NotLoggedModal onOk={closeNLModalHandler}/>}
        {NLModalIsOpen && <NotLoggedModal onCancel={closeNLModalHandler}/>}
        {NLModalIsOpen && <Backdrop onClick={closeNLModalHandler}/>}
        {ProductModalIsOpen && <ProductModal product={product}/>}
        {ProductModalIsOpen && <Backdrop onClick={closeProductModalHandler}/>}
    </div>
  );
}

export default App;