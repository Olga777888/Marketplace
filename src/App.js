import { useState, useEffect } from "react";
import "./App.css";
import ProductList from "./Components/ProductList/ProductList";
import FetchProducts from "./Components/FetchProducts/FetchProducts";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Registration } from "./Pages/Registration";
import { Login } from "./Pages/Login";
import Product from "./Components/Product/Product";

function App() {
  const isAuth = true;

  const [products, setProducts] = useState([]);

 
  const [searchValue, setSearchValue] = useState("");

 
  const [foundedProducts, setFoundedProducts] = useState([]);

 
  useEffect(() => {
    setFoundedProducts(products);
  }, [products]);

  
  const titles = [];
 
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      titles.push({
        title: products[i].title.toLowerCase(),
        id: products[i].id,
      });
    }
  }

  const foundSearchIds = [];
  if (searchValue.length >= 3) {
    titles.forEach((item) => {
      if (item.title.includes(searchValue.toLowerCase())) {
        foundSearchIds.push(item.id);
      }
    });
  }

  let tempFoundProducts = [];
  products.forEach((item) => {
    if (foundSearchIds.includes(item.id)) {
      tempFoundProducts.push(item);
    }
  });

 
  useEffect(() => {
    if (searchValue.length >= 3) {
      setFoundedProducts([...tempFoundProducts]);
    } else {
      setFoundedProducts(products);
    }
  }, [searchValue]);


  const categories = ["Все товары"];
 
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      if (!categories.includes(products[i].category)) {
        categories.push(products[i].category);
      }
    }
  }
  
  const [selectValue, setSelectValue] = useState("Все товары");

  let tempFoundProductsFromSelect = [];
  products.forEach((item) => {
    if (item.category === selectValue) {
      tempFoundProductsFromSelect.push(item);
    }
  });
  useEffect(() => {
    if (selectValue !== "Все товары") {
      setFoundedProducts([...tempFoundProductsFromSelect]);
    } else {
      setFoundedProducts(products);
    }
  }, [selectValue]);

  return (
    <div className="App">
      <FetchProducts setProducts={setProducts} />

      <hr />

      <Routes>
        <Route
          path="/product/:id"
          element={
            isAuth ? <Product allProducts={products} /> : <Registration />
          }
        ></Route>

        {/* <Route
          path="/basket"
          element={isAuth ? <Basket /> : <Registration />}
        ></Route> */}

        <Route
          path="/products"
          element={
            isAuth ? (
              <ProductList
                products={foundedProducts}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                categories={categories}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                allProducts={products}
              />
            ) : (
              <Registration />
            )
          }
        ></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<Registration />}></Route>
      </Routes>
    </div>
  );
}

export default App;
 
   