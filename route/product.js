const express = require("express");

const router = express.Router();
const productController = require("../controller/Product");

router.post("/postproducts", productController.createProducts);
router.get("/getproducts", productController.getProducts);
router.get("/getproduct/:id", productController.getProductById);

module.exports = router;
