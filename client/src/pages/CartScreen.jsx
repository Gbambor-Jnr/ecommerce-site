import React from "react";
import CartItem from "../components/Cart/CartItem";
import "./CartScreen.css";
import { useSelector, useDispatch } from "react-redux";
import PayButton from "../components/PayButton";

const CartScreen = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalItems = useSelector((state) => state.cart.items);
  const item = totalItems.reduce(
    (currNumber, item) => currNumber + item.quantity,
    0
  );

  console.log(item);
  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <h2>{item > 0 ? "Shopping Cart" : "Shopping Cart is Empty"}</h2>
        <CartItem />
      </div>
      <div className="cartscreen__right">
        <div className="cartitem__checkout">
          <p>Subtotal: ({item}) items</p>
          <p>${totalAmount}</p>
        </div>
        <button>Proceed to checkout</button>
        <PayButton cartItems={totalItems} />
      </div>
    </div>
  );
};

export default CartScreen;
