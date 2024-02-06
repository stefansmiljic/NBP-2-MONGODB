import { useState, useEffect } from "react";
import './Cart.css'

function CartProduct({productId, handleRefresh}) {
    const [productData, setProductData] = useState([]);
    const [updated, setUpdated] = useState(null);

    var product1 = JSON.stringify(productId);
    console.log(handleRefresh);
    var product2 = JSON.parse(product1);
    var product3 = product2.productId;
    console.log(product3);
    var username = localStorage.getItem("username");
    console.log(product3);
    async function getProduct() {
      const product = await fetch(
        "http://localhost:5099/api/Proizvodi/GetProduct" + productId
      );
    
      if (!product.ok) {
        return [];
      }
      
      return product.json();
    }
    useEffect(() => {
        getProduct().then((data) => {
            setProductData(data);
        });
    }, [productId]);

    console.log("STAMPAM IZ CART PRODUCT, PRODUCt: " + productData);

    const handleDeleteCartProduct = async () => {
        await fetch(
            "http://localhost:5099/api/Kupovina/UkloniProizvodIzKorpe?username=" + username + "&proizvodId=" + productData.id,
            { method: "PUT" }
            );
            if (typeof handleRefresh === 'function') {
                handleRefresh();
              } else {
                console.error('setDeleteFlag is not a function' + typeof(setDeleteFlag));
              }
    };

    return (
        <div className="cartProduct">
            <img src={productData.urlSlike} className="cartProductImg"></img>
            <label>{productData.imeProizvoda}</label>
            <label>{productData.cena} дин.</label>
            <input type="button" value={"Уклони из корпе"} onClick={handleDeleteCartProduct}></input>
        </div>
    );
}

export default CartProduct;