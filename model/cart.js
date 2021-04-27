const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        
        },
        products_inCart: {
            type: String,
            required: true,
        },
        cart_status: {
            type: String,
            
        }
        
    },

);
autoIncrement.initialize(mongoose.connection);
cartSchema.plugin(autoIncrement.plugin, {
    model:'Cart',
    field:'cart_id',
    startAt: 1000,
    incrementBy: 1
});
module.exports = mongoose.model('Cart', cartSchema);