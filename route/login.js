const express = require("express");
const { body } = require("express-validator");
const loginController = require("../controller/login");
const User = require("../models/login");

const router = express.Router();

router.post(
  "/signup",
  [
    body("password").trim().isLength({ min: 5 }),
    body("email")
      .isEmail()
      .withMessage("enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists");
          }
        });
      })

      .normalizeEmail(),
  ],
  loginController.createUser
);

router.post("/login", loginController.login);

module.exports = router;
