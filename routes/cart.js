const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const session = require('express-session');

router.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));

// add item to cart
router.post('/additem', cartController.addToCart);

// update items in cart
router.put('/updatecart', cartController.updateCart);

// get all carts 
router.get('/getall', cartController.allCarts);

// get all carts for logged in user 
router.get('/user', cartController.userCarts);

module.exports = router;