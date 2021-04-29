const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');


// create order
router.put('/new', orderController.newOrder);

// view all orders
router.get('/getall', orderController.getAll);



module.exports = router;