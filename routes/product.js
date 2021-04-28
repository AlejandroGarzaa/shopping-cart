const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const session = require('express-session');


router.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));

//add product

router.post('/add', productController.addProduct);


// get phone by OS 
router.get('/find/:osType', productController.findProduct);

 
// delete droduct by product id


module.exports = router;