import React, { useState } from "react";
import "./Navbar.css";
import { NavLink, useHistory } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Signup from "../auth/Signup";
import { useSelector } from "react-redux";
import { cartActions } from "../../store/CartSlice";
import { useDispatch } from "react-redux";

const Navbar = ({ sideHandler, sideToggle, onCart }) => {
  const history = useHistory();
  const [showCart, setshowcart] = useState(false);
  const token = useSelector((state) => state.cart.token);
  const dispatch = useDispatch();

  const sideToggleHandler = () => {
    sideHandler(!sideToggle);
  };
  const cartHandler = () => {
    setshowcart(!showCart);
  };

  const logoutHandler = () => {
    dispatch(cartActions.removeToken());
    history.replace("/");
  };
  return (
    <nav className="navbar">
      <div className="nav__logo">
        <h2>GBAMBOR JNR's ONLINE SHOP</h2>
      </div>

      <ul className="navbar__links">
        {token && (
          <li className="cart__link" onClick={onCart}>
            <NavLink to="/cart" activeClassName="nav__active">
              <ShoppingCartIcon />
              Cart
              <span className="cartlogo">0</span>
            </NavLink>
          </li>
        )}

        {token && (
          <li>
            <NavLink to="/frontpage" activeClassName="nav__activ">
              Shop
            </NavLink>
          </li>
        )}
        {!token && (
          <li>
            <NavLink to="/login" activeClassName="nav__activ">
              Login
            </NavLink>
          </li>
        )}

        {token && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
      <div className="hamburger__menu" onClick={sideToggleHandler}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
