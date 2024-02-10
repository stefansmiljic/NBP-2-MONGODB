import { useEffect, useState } from 'react';
import './Modal.css';

function ProductModal({onCancel,product}) {
    console.log("ProductModal: " + product);

    return (
        <div className="modalAbout">
            <div className='aboutProduct'>
                <div className='aboutProduct01'>
                    <img className='aboutProductImg' src={product.urlSlike}></img>
                    <label style={{fontSize: '14px'}}>Име производа</label>
                    <label style={{fontWeight: 'bold'}}>{product.imeProizvoda}</label>
                    <label  style={{fontSize: '14px', marginTop: '15px'}}>Цена</label>
                    <label style={{fontWeight: 'bold'}}>{product.cena} дин.</label>
                </div>
                <div className='aboutProduct02'>
                    <h2 style={{color: '#37af33'}}>Више података о производу</h2>
                    <label>{product.info}</label>
                </div>
            </div>
            <div className="xproduct" onClick={onCancel}>
                    <ion-icon name="close"></ion-icon>
            </div>
        </div>
    );
}

export default ProductModal;