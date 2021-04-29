const Order = require('../model/order');
const Cart = require('../model/cart');






const newOrder = async (req, res) => {
    const username = req.session.username;
    const cost = req.body.cost;
    //const cart_id = req.body.cart_id;
    try {
        const open = "Open"

        const order = await Cart.findOne({ username: username, cart_status: open });
        if (order) {
            const cart_id = order.cart_id;
            order.cart_status = "Closed";

            const place = new Order({
                cost,
                cart_id

            });
            order.save();
            place.save();
            res.status(201).send(`New order has been placed: ${order}, \n Order information: ${place}`);

        } else {
            res.status(400).send("Cant create cart, no items in cart")
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }

};

const getAll = async (req, res) => {
    
    try {
        const order = await Order.find();
        return res.status(201).send(order);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }

};





module.exports = { newOrder, getAll}