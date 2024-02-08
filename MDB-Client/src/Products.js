import './Products.css';
import { useEffect, useState } from 'react';

function Products({handleRefresh, productTypeFlag}) {
    const [proizvodi, setProizvodi] = useState([]);
    const [pagesNumber, setPagesNumber] = useState([]);
    const [page, setPage] = useState(1);
    const [isActive, setIsActive] = useState(false);
    var activePageBtn;

    const pageSize = 5;

    var username = sessionStorage.getItem("username");

    //console.log("Iz products: " + productTypeFlag);

    async function getAllProducts() {
        try {
            const data = await fetch("http://localhost:5099/api/Proizvodi/GetProductsPaginated?page=" + page + "&pageSize=" + pageSize + "&type=" + productTypeFlag, {
                method: "GET",
                mode: 'cors',
            });

            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`);
            }
    
            const returnData = await data.json();
            return returnData;
        } catch (error) {
            console.error("Greška prilikom dohvatanja podataka:", error);
            throw error;
        }
    }

    useEffect(() => {
        getAllProducts().then((data) => {
            setProizvodi(data);
            //setPagesNumber(parseInt((data.length / 5) + ((data.length % 5) == 0 ? 0 : 1)));
        }).then(brojStranica(productTypeFlag))
      }, [productTypeFlag, page]);

    useEffect(() => {
        setPage(1);
    }, [productTypeFlag]);

       const brojStranica = tip => async () => {
        try {
        const data = await fetch("http://localhost:5099/api/Proizvodi/CountPages?pageSize=" + pageSize + "&type=" + tip, {
            method: "GET",
            mode: 'cors',
        });

        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }

        const returnData = await data.json();
        setPagesNumber(returnData);
        return returnData;
        } catch (error) {
            console.error("Greška prilikom dohvatanja podataka:", error);
            throw error;
        }
      }

      const handleAddProductToCart = pId => async () => {
        await fetch(
            "http://localhost:5099/api/Kupovina/DodajProizvodUKorpu?username=" + username + "&proizvodId=" + pId + "&count=" + 1,
            { method: "PUT" }
            );
            if (typeof handleRefresh === 'function') {
                handleRefresh();
              } else {
                console.error('setDeleteFlag is not a function' + typeof(setDeleteFlag));
              }
    };

    const postaviStranicu = (stranica) => () => {
        setPage(stranica);
        var prevActivePage = document.getElementsByClassName('active')[0];
        var activePageBtn = document.getElementById(stranica + "-pageBtn");
        if(!activePageBtn.classList.contains('active'))
        {
            prevActivePage.classList.remove('active');
            activePageBtn.classList.add('active')
        }
        console.log("Stranica: " + stranica);
    }

    return (
        <div className="productsMain">
            <div className='productsSubDiv'>
            {productTypeFlag != -1 ? (proizvodi.filter(p=>p.tipProizvoda == productTypeFlag).map((proizvod, index) => {
                return (
                    <div className="productDiv" key={index}>
                        <img src={proizvod.urlSlike} className="productImage"/>
                        <label>{proizvod.imeProizvoda}</label>
                        <label>Цена: <b>{proizvod.cena} дин.</b></label>
                        <input type='button' value={"Додај у корпу"} onClick={handleAddProductToCart(proizvod.id)}></input>
                    </div>)
            })) : (proizvodi.map((proizvod, index) => {
                return (
                    <div className="productDiv" key={index}>
                        <img src={proizvod.urlSlike} className="productImage"/>
                        <label>{proizvod.imeProizvoda}</label>
                        <label>Цена: <b>{proizvod.cena} дин.</b></label>
                        <input type='button' value={"Додај у корпу"} onClick={handleAddProductToCart(proizvod.id)}></input>
                    </div>
                )
            }))}
            </div>
            <h1>Изаберите здраво. Изаберите повољно!</h1>
            <div className="pagination">
                {pagesNumber.map((i,index) => {
                    return (
                        <a value={index + 1} id={index + 1 + "-pageBtn"} className={index == 0 ? 'active' : ''} onClick={postaviStranicu(index + 1)} >{index + 1}</a>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;