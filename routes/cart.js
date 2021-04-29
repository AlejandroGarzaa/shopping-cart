const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const session = require('express-session');


router.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));

// add item to cart
router.post('/additem', cartController.addToCart);

// router.post('/additem', async (req, res) => {
//   try {
//     const username = req.session.username;
//     const products_inCart = req.body.products_inCart;
    

//     const cartData = await cartController.addToCart(username, products_inCart,);

//     return res.status(201).send(cartData);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });



// update items in cart
router.put('/updatecart', cartController.updateCart);



// get all carts 
router.get('/getall', cartController.allCarts);



// get all carts for logged in user 
router.get('/user', cartController.userCarts);



module.exports = router;