const Product = require("../models/Product");

exports.createProducts = async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const countInStock = req.body.countInStock;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  try {
    const product = new Product({
      name,
      description,
      countInStock,
      imageUrl,
      price,
    });

    const response = await product.save();

    res.status(201).json({ message: "Product Created Succesfully" });
  } catch (err) {
    if (err) {
      err.statusCode = 500;
      console.log(err.message);
    }
  }
};
exports.getProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({ product: product });
  } catch (err) {
    if (err) {
      err.statusCode = 500;
      console.log(err.message);
    }
  }
};
exports.getProductById = async (req, res, next) => {
  const params = req.params;
  try {
    const product = await Product.findById(params.id);
    res.status(200).json({ product: product });
  } catch (err) {
    if (err) {
      err.statusCode = 500;
      console.log(err.message);
    }
  }
};
