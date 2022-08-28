import React, { useEffect, useState } from "react";
import "./ProductScreen.css";
// import products from "../components/data/product";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/CartSlice";
import { useHistory } from "react-router-dom";

const ProductScreen = ({ products }) => {
  const params = useParams();

  const [qty, setqty] = useState(1);
  const dispatch = useDispatch();
  const cartQty = useSelector((state) => state.cart.items);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.cart.token);

  const clickedProducts = products.find(
    (product) => product._id === params.prodId
  );

  const selectHandler = (e) => {
    setqty(e.target.value);
  };
  const addToCartHandler = () => {
    const item = { ...clickedProducts, quantity: Number(qty) };
    dispatch(
      cartActions.addToCart({
        id: clickedProducts._id,
        quantity: item.quantity,
        price: clickedProducts.price,
        name: clickedProducts.name,
        imageUrl: clickedProducts.imageUrl,
      })
    );

    if (token) {
      history.push("/cart");
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <div className="productscreen">
        <div className="productscreen__left">
          <div className="left__image">
            <img src={clickedProducts.imageUrl} alt="" />
          </div>
          <div className="left__info">
            <p className="left__name">Product 1</p>
            <p className="left__name">price: {clickedProducts.price}</p>
            <p>
              description: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. La
            </p>
          </div>
        </div>
        <div className="productcreen__right">
          <div className="right__info">
            <p>
              price: <span>$499</span>
            </p>
            <p>
              status: <span>In stock</span>
            </p>
            <p>
              quantity:
              <select name="" id="" onChange={selectHandler}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </p>
            <p>
              <button type="button" onClick={addToCartHandler}>
                Add to cart
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
