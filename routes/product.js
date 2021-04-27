const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const session = require('express-session');


router.use(session({ secret: 'secret', saveUninitialized: false, resave: false }));

//add product

router.post('/add', async (req, res) => {
  try {
    const product_name = req.body.product_name;
    const product_code = req.body.product_code;
    const description = req.body.description;
    const price = req.body.price;
    const rating = req.body.rating;
    const manufacturer = req.body.manufacturer;
    const osType = req.body.osType;
       
    const product = await productController.addProduct(
        product_name,
        product_code,
        description,
        price,
        rating,
        manufacturer,
        osType);

    return res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// get phone by OS 
router.get('/find/:osType', async (req, res) => {
    try {
      const osType = req.params.osType;
         
      const type  = await productController.findProduct(
          osType);
  
      return res.status(201).send(type);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });


  


module.exports = router;