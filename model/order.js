const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        cart_id: {
            type: Number,
            
        
        },
        cost: {
            type: Number,
            required: true
        }
        
    },

);
autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, {
    model:'Order',
    field:'order_id',
    startAt: 0,
    incrementBy: 1
});
module.exports = mongoose.model('Order', orderSchema);