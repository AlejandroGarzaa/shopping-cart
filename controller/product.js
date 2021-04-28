const express = require('express');
const router = express.Router();
const Product = require('../model/products');
const session = require('express-session');

router.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));



const addProduct = async (req, res) => {
  const product_name = req.body.product_name;
  const product_code = req.body.product_code;
  const description = req.body.description;
  const price = req.body.price;
  const rating = req.body.rating;
  const manufacturer = req.body.manufacturer;
  const osType = req.body.osType;
  try {
    const product = new Product({
      product_name,
      product_code,
      description,
      price,
      rating,
      manufacturer,
      osType
    });
    product.save();
    return res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const findProduct = async (req, res) => {
  try {
    const osType = req.params.osType;
       
    const products = await Product.find({ osType: osType })
  
    return res.status(201).send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};



module.exports = { addProduct, findProduct};