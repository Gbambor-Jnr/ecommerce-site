import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.cart.token);
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPaswword = passwordRef.current.value;

    try {
      const response = await fetch("http://localhost:8099/signup", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPaswword,
        }),
        headers: { "Content-Type": "Application/json" },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      console.log(data);
      history.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={loginHandler} className="signin__form">
      <label htmlFor="email">email</label>
      <input type="text" id="email" ref={emailRef} />
      <label htmlFor="password">password</label>
      <input type="text" id="password" ref={passwordRef} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
