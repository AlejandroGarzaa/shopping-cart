const Cart = require('../model/cart');
//const Product = require('../model/products');


const addToCart = async (
    username,
    products_inCart
    ) => {
        
    
    const cart = new Cart({
        username,
        products_inCart
    
    });
    return cart.save();
  };

  const updateCart = async (
    username,
    products_inCart
   
    ) => {
        
        const update = await Cart.findOne({username: username});
        update.products_inCart = products_inCart;
        

        const updatedcart = await update.save();
    return updatedcart;
  };

  const allCarts = async () => {
        
    const carts = await Cart.find();
    return carts;
  };

  const userCarts = async (username) => {
        
    const usercarts = await Cart.find({username: username});
    return usercarts;
  };
  module.exports = {addToCart, allCarts, userCarts, updateCart}