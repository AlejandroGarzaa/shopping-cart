const Cart = require('../model/cart');
const Product = require('../model/products');


const addToCart = async (
    username,
    products_inCart,
    quantity
    ) => {
        // const products = await Product.findOne({product_id: productId})
        // const products_inCart = products;
    
    const cart = new Cart({
        username,
        products_inCart,
        quantity
    });
    return cart.save();
  };

  module.exports = {addToCart}