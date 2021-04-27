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
        // quantity: {
        //     type: Number,
        //     required: true,
        //     default: 1

        // },
        cart_status: {
            type: String,
            default: "Open"
            
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