import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import CartScreen from "./pages/CartScreen";
import ProductScreen from "./pages/ProductScreen";
import Navbar from "./components/navbar/Navbar";
import Backdrop from "./components/backdrop/Backdrop";
import Sidedraw from "./components/sidedraw/Sidedraw";
import { useState, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [sideToggle, setsideToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.cart.token);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:8099/getproducts");
      const data = await res.json();

      setProducts(data.product);

      setLoading(false);
    };
    getProducts();
  }, []);

  console.log(token);

  return (
    <div className="App">
      {/* {showcart && <Cart onCart={cartHandler} />} */}
      <Navbar
        sideHandler={setsideToggle}
        sideToggle={sideToggle}
        // onCart={cartHandler}
      />

      <Sidedraw show={sideToggle} click={() => setsideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setsideToggle(false)} />
      <Switch>
        <Route path="/" exact>
          <HomeScreen products={products} />
        </Route>
        <Route path="/product/:prodId">
          <ProductScreen products={products} />
        </Route>
        <Route path="/login">
          <Signin />
        </Route>

        {/* <>
          <Route path="/" exact>
            <HomeScreen products={products} />
          </Route>
          <Route path="/login">
            <Signin />
          </Route>
          <Route path="/signup"> 
            <Signup />
          </Route>
        </>

        {token && (
          <>
            <Route path="/" exact>
              <HomeScreen products={products} />
            </Route>
            <Route path="/product/:prodId">
              <ProductScreen products={products} />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/cart">
              <CartScreen />
            </Route>
          </>
        )} */}
        {token && (
          <>
            <Route path="/frontpage" exact>
              <HomeScreen products={products} />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/" exact>
              <HomeScreen products={products} />
            </Route>
            <Route path="/product/:prodId">
              <ProductScreen products={products} />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/cart">
              <CartScreen />
            </Route>
          </>
        )}
      </Switch>
    </div>
  );
}

export default App;
