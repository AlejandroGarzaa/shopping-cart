const Order = require('../model/order');
const Cart = require('../model/cart');


const newOrder = async (
    username,
    cost,
    cart_id) => {
        try{
        const open = "Open"
    const order = await Cart.findOne({username: username, cart_status: open});
    if (order){
    cart_id = order.cart_id;

    const place = new Order({
        cost,
        cart_id
    
    });
    updateStatus(username);
    return place.save();
}
        }catch(err){
            console.log(err);
            console.log("Cant create cart, no items in cart");
        }

  };



  const updateStatus = async (username) => {
      const open = "Open" ;
    const update = await Cart.findOne({username: username, cart_status: open});
    if (update){
    update.cart_status = "Closed";
    return update.save();
    
  }return "no items in cart";
}


module.exports = {newOrder, updateStatus }