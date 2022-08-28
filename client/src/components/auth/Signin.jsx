import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Signin.css";
import Signup from "./Signup";
import { Link, useHistory } from "react-router-dom";
import { cartActions } from "../../store/CartSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.cart.token);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPaswword = passwordRef.current.value;

    try {
      const res = await fetch("http://localhost:8099/login", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPaswword,
        }),
        headers: { "Content-Type": "Application/json" },
      });
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      dispatch(cartActions.getToken(data.token));
      history.replace("/frontpage");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(token);

  return (
    <div className="signin">
      <form onSubmit={loginHandler} className="signin__form">
        <label htmlFor="email">email</label>
        <input type="text" id="email" ref={emailRef} />
        <label htmlFor="password">password</label>
        <input type="text" id="password" ref={passwordRef} />

        <button type="submit">login</button>
      </form>
      <p>
        dont have an account?
        <Link to="/signup">signup</Link>
      </p>
    </div>
  );
};

export default Signin;
