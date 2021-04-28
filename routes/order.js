const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');
const session = require('express-session');


router.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));

// create order
router.put('/new', async (req, res) => {
    try {
      const username = req.session.username;
      const cost = req.body.cost;
      const cart_id = req.body.cart_id;
      
         
      const order = await orderController.newOrder(
          username,
          cost,
          cart_id
        
          );

  
      return res.status(201).send(`New order has been placed: ${order}, \n Cart ${order.cart_id} has been closed`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });



module.exports = router;