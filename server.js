const express = require("express");
// require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const { mongoUser, password, database } = require("./config");

const productRoute = require("./route/product");
const authRoute = require("./route/login");
const stripeRoute = require("./route/stripe");
const cors = require("cors");

// mongoose
//   .connect(
//     `mongodb+srv://${mongoUser}:${password}@cluster0.kytwgsm.mongodb.net/${database}?retryWrites=true`
//   )

//   .then((result) => app.listen(process.env.PORT || 8080))

//   .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use(authRoute);
app.use(productRoute);
app.use(stripeRoute);

mongoose
  .connect(
    "mongodb+srv://ikenna:Cornelik@cluster0.kytwgsm.mongodb.net/ecommerce?retryWrites=true"
  )
  .then((result) => {
    app.listen(8099);
  });
