import './Products.css';
import { useEffect, useState } from 'react';

function Products({handleRefresh, productTypeFlag, openNLModalHandler, openProductModalHandler}) {
    const [proizvodi, setProizvodi] = useState([]);
    const [pagesNumber, setPagesNumber] = useState([]);
    const [page, setPage] = useState(1);
    const [apiProducts, setApiProducts] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [clicks, setClicks] = useState(0);
    const [tempProizvod, setTempProizvod] = useState([]);
    const [isActive, setIsActive] = useState(false);
    var activePageBtn;

    const pageSize = 5;

    var username = sessionStorage.getItem("username");

    //console.log("Iz products: " + productTypeFlag);

    async function getAllProductsMain() {
        try {
            const data = await fetch("http://localhost:5099/api/Proizvodi/GetProducts", {
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
            getAllProductsMain().then((data) => {
                setApiProducts(data);
                setFilteredProducts(data);
            })
        }, []);

        useEffect(() => {
            getAllProducts().then((data) => {
                setProizvodi(data);
                //setPagesNumber(parseInt((data.length / 5) + ((data.length % 5) == 0 ? 0 : 1)));
            }).then(brojStranica(productTypeFlag))
        }, [productTypeFlag, page]);

        useEffect(() => {
            setPage(1);
            if(productTypeFlag != -1)
                postaviNaPrvuStranu();
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

      console.log("Products: " + username);
      const handleAddProductToCart = pId => async (event) => {
        event.stopPropagation();
        if(username != null) {
            await fetch(
                "http://localhost:5099/api/Kupovina/DodajProizvodUKorpu?username=" + username + "&proizvodId=" + pId + "&count=" + 1,
                { method: "PUT" }
                );
                if (typeof handleRefresh === 'function') {
                    handleRefresh();
                } else {
                    console.error('setDeleteFlag is not a function' + typeof(setDeleteFlag));
                }
        }
        else {
            openNLModalHandler();
        }
    };

    const postaviNaPrvuStranu = async () => {
        var prevActivePage = document.getElementsByClassName('active')[0];
        prevActivePage.classList.remove('active');
        var activePageBtn = document.getElementById(1 + "-pageBtn");
        activePageBtn.classList.add('active');
    }

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

    const postaviProizvod = (product) => async () => {
        //localStorage.setItem("product", product);
        openProductModalHandler(product);
        if(username != null) {
            proizvodPosecen(product.id, username);
            dodajPoseceniProizvod(username, product.id);
            /*getUser(username).then((data) => {
                sessionStorage.setItem("poseceniProizvodi", JSON.stringify(data.najskorijePoseceniProizvodi));
                console.log(data.najskorijePoseceniProizvodi)
            })*/
        }
        console.log(product.id);
    }

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    
        // filter the items using the apiUsers state
        const filteredItems = apiProducts.filter((product) =>
            product.imeProizvoda.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setFilteredProducts(filteredItems);
        /*let duzina = parseInt((filteredItems.length / 5) + ((filteredItems.length % 5) == 0 ? 0 : 1));
        var niz = filteredItems.slice(0, duzina-1);
        setPagesNumber(niz);*/
      }

      const options = [
        { value: '0', label: 'Чај' },
        { value: '1', label: 'Зачин' },
        { value: '2', label: 'Препарат' }
    ]

    const dodajPoseceniProizvod = async (username, productid) => {
        await fetch(
            "http://localhost:5099/api/Kupovina/DodajPosecenProizvod?username=" + username + "&proizvodId=" + productid,
            { method: "PUT" }
            );
        getUser(username).then((data) => {
            sessionStorage.setItem("poseceniProizvodi", JSON.stringify(data.najskorijePoseceniProizvodi));
        });
    }

    const getUser = async (username) => {
        const user = await fetch(
          "http://localhost:5099/api/Auth/GetUserByUsername?username=" + username
        );
      
        if (!user.ok) {
          return [];
        }
        
        return user.json();
      }

    const proizvodPosecen = async (productid, username) => {
        await fetch(
            "http://localhost:5099/api/Proizvodi/ProizvodPosecen?id=" + productid + "&username=" + username,
            { method: "PUT" }
            );
    }

    return (
        <div className="productsMain">
            <div className='filtersDiv'>
                <input
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder='Претражите производ'
                    className='inputFilterProduct'
                />
                {productTypeFlag != -1 ? (<a className='clearProductTypeFilter' href='http://localhost:3000/'><ion-icon name="close"></ion-icon>{options[productTypeFlag].label}</a>) : (<label></label>)}
            </div>
            { searchItem == '' ?  (
            <div className='productsSubDiv'>
            {productTypeFlag != -1 ? (proizvodi.filter(p=>p.tipProizvoda == productTypeFlag).map((proizvod, index) => {
                return (
                    <div className="productDiv" key={index} onClick={postaviProizvod(proizvod)}>
                        <img src={proizvod.urlSlike} className="productImage"/>
                        <label>{proizvod.imeProizvoda}</label>
                        <label>Цена: <b>{proizvod.cena} дин.</b></label>
                        <input type='button' value={"Додај у корпу"} onClick={handleAddProductToCart(proizvod.id)}></input>
                    </div>)
            })) : (proizvodi.map((proizvod, index) => {
                return (
                    <div className="productDiv" key={index} onClick={postaviProizvod(proizvod)}>
                        <img src={proizvod.urlSlike} className="productImage"/>
                        <label>{proizvod.imeProizvoda}</label>
                        <label>Цена: <b>{proizvod.cena} дин.</b></label>
                        <input type='button' value={"Додај у корпу"} onClick={handleAddProductToCart(proizvod.id)}></input>
                    </div>
                )
            }))}
            </div>
            ) : (
                <div className='productsFilteredDiv'>
                {productTypeFlag != -1 ? (filteredProducts.filter(p=>p.tipProizvoda == productTypeFlag).map((proizvod, index) => {
                    return (
                        <div className="productDiv" key={index} onClick={postaviProizvod(proizvod)}>
                            <img src={proizvod.urlSlike} className="productImage"/>
                            <label>{proizvod.imeProizvoda}</label>
                            <label>Цена: <b>{proizvod.cena} дин.</b></label>
                            <input type='button' value={"Додај у корпу"} onClick={handleAddProductToCart(proizvod.id)}></input>
                        </div>)
                })) : (filteredProducts.map((proizvod, index) => {
                    return (
                        <div className="productDiv" key={index} onClick={postaviProizvod(proizvod)}>
                            <img src={proizvod.urlSlike} className="productImage"/>
                            <label>{proizvod.imeProizvoda}</label>
                            <label>Цена: <b>{proizvod.cena} дин.</b></label>
                            <input type='button' value={"Додај у корпу"} onClick={handleAddProductToCart(proizvod.id)}></input>
                        </div>
                    )
                }))}
                </div>
                )
        } 
            <h1>Изаберите здраво. Изаберите повољно!</h1>
            { searchItem == '' ? (
            <div className="pagination">
                {pagesNumber.map((i,index) => {
                    return (
                        <a value={index + 1} id={index + 1 + "-pageBtn"} className={index == 0 ? 'active' : ''} onClick={postaviStranicu(index + 1)} >{index + 1}</a>
                    );
                })}
            </div>
            ) : (<label></label>)
            }
        </div>
    );
}

export default Products;