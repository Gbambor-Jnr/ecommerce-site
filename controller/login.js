const User = require("../models/login");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });

      return user.save();
    })
    .then((user) =>
      res.status(201).json({ message: "User created Succesfully" })
    );
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;
  let newUser;
  if (!errors.isEmpty()) {
    const error = new Error("invalid credentials");
    error.statusCode = 422;
    throw error;
  }

  try {
    return User.findOne({ email: email }).then((user) => {
      newUser = user;
      if (!user) {
        const error = new Error("no user found");
        error.statusCode = 401;
        throw error;
      }
      bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          const error = new Error("wrong password");
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign(
          {
            email: newUser.email,
            userId: newUser._id.toString(),
          },
          "gbamborJnrStrongMan",
          {
            expiresIn: "1hr",
          }
        );
        return res
          .status(200)
          .json({ token: token, loadedUser: newUser._id.toString() });
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
