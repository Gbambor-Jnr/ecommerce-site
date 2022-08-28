import React, { useState, useEffect } from "react";
import "./Product.css";
import { NavLink } from "react-router-dom";
import Login from "../auth/Signup";

const Product = ({ products }) => {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     setLoading(true);
  //     const res = await fetch("http://localhost:8099/getproducts");
  //     const data = await res.json();

  //     setProducts(data.product);

  //     setLoading(false);
  //   };
  //   getProducts();
  // }, []);
  // prod = product;

  const shownProducts = products.map((product) => (
    <div className="product" key={product._id}>
      <img src={product.imageUrl} alt={product.name} />
      <div className="product__info">
        <p className="info__name">{product.name}</p>
        <p className="info__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          quidem eum magni inventore quasi totam reprehenderit? Molestias, es
          dolorum eius velit? Dolorum,
        </p>
        <p className="info__price">${product.price}</p>
        <NavLink to={`/product/${product._id}`} className="info__button">
          View
        </NavLink>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && shownProducts}
    </>
  );
};

export default Product;
