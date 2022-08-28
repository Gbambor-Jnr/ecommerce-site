import axios from "axios";
import React from "react";

const PayButton = ({ cartItems }) => {
  const checkoutHandler = () => {};
  return <button onClick={checkoutHandler}>Check Out</button>;
};

export default PayButton;
