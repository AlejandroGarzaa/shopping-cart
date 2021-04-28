const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const session = require('express-session');


router.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));

// add item to cart
router.post('/additem', async (req, res) => {
  try {
    const username = req.session.username;
    const products_inCart = req.body.products_inCart;
    

    const cartData = await cartController.addToCart(username, products_inCart,);

    return res.status(201).send(cartData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update items in cart
router.put('/updatecart', async (req, res) => {
  try {
    const username = req.session.username;
    const products_inCart = req.body.products_inCart;
    

    const cartData = await cartController.updateCart(username, products_inCart);

    return res.status(201).send(cartData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get all carts 
router.get('/carts', async (req, res) => {
  try {
    const carts  = await cartController.allCarts();

    return res.status(201).send(carts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get all carts for logged in user 
router.get('/carts/user', async (req, res) => {
  try {
    const username = req.session.username;

    const usercart  = await cartController.userCarts(username);

    return res.status(201).send(usercart);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;