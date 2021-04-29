const Cart = require('../model/cart');
//const Product = require('../model/products');


// check if user has open cart, if so refer to update cart
const addToCart = async (req, res) => {


  try {
    const username = req.session.username;
    const open = "Open"
    const check = await Cart.findOne({ username: username, cart_status: open });


    if (check) {
      res.status(400).send("user already has open cart, update cart instead.");
      return;

    } else {
      const products_inCart = req.body.products_inCart;

      const cart = new Cart({
        username,
        products_inCart

      });
      cart.save();
      return res.status(201).send(`New cart has been created: ${cart}`)

    }

  } catch (error) {
    res.status(400).send(error.message);
  }
};




// check if user has open cart, if not refer to add item
const updateCart = async (req, res) => {
  try {

    const username = req.session.username;
    const open = "Open"
    const check = await Cart.findOne({ username: username, cart_status: open });


    if (check) {
      const products_inCart = req.body.products_inCart;
      check.products_inCart = products_inCart;
      const updatedcart = await check.save();
      return res.status(201).send(`Cart has been updated: ${updatedcart}`);

    } else {
      res.status(400).send("user does not have open cart. add item to cart.");
      return;
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
};



const allCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.status(201).send(carts);

  } catch (error) {
    res.status(400).send(error.message);
  }
};


const userCarts = async (req, res) => {
  try {
    const username = req.session.username;
    const usercart = await Cart.find({ username: username });
    return res.status(201).send(usercart);

  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = { addToCart, allCarts, userCarts, updateCart }