import React, { useState } from "react";
import products from "../data/product";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartItem.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/CartSlice";
import DeleteModal from "../modal/DeleteModal";
import { useHistory } from "react-router-dom";

const CartItem = () => {
  const dispatch = useDispatch();
  const [clickedId, setId] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);

  const [showModal, setmodal] = useState(false);

  const cartProducts = cartItems.map((item) => {
    return (
      <div className="cartitem" key={item._id}>
        <div className="classitem__image">
          <img src={item.imageUrl} alt="prod name" />
        </div>

        <Link to={`/product/${item.id}`} className="cartitem__name">
          <p>{item.name}</p>
        </Link>
        <p className="caretitem__price">{item.price}</p>

        <p>{item.quantity}</p>
        <button
          onClick={() => dispatch(cartActions.increseItemInCart(item.id))}
          className="agree__btn"
        >
          +
        </button>
        <button
          onClick={() => dispatch(cartActions.removeFromCart(item.id))}
          className="agree__btn"
        >
          -
        </button>

        <button className="cartitem__deleteBtn">
          <DeleteIcon
            onClick={() => {
              setmodal(true);
              setId(item.id);
            }}
          />
        </button>
      </div>
    );
  });
  return (
    <>
      {showModal && (
        <DeleteModal>
          <p> Are you sure you want to delete this Item</p>
          <button
            onClick={() => {
              dispatch(cartActions.deleteFromCart(clickedId));
              setmodal(false);
            }}
            className="agree__btn"
          >
            yes
          </button>
          <button onClick={() => setmodal(false)} className="agree__btn">
            no
          </button>
        </DeleteModal>
      )}
      {cartProducts}
    </>
  );
};

export default CartItem;
