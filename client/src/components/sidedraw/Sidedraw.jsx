import React from "react";
import "./Sidedraw.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";
const Sidedraw = ({ show, click }) => {
  return (
    <div className={`sidedraw ${show ? "show" : " "}`}>
      <ul className="sidedraw__links" onClick={click}>
        <li className="sidedraw__link">
          <NavLink to="/cart" activeClassName="sidedraw__active">
            <ShoppingCartIcon />
            Cart
            <span className="sidedraw__badge">0</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" activeClassName="sidedraw__activ">
            Shop
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidedraw;
