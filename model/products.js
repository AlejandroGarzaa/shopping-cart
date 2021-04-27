const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true
        
        },
        product_code: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            
        },
        price: {
            type: Number,

        },
        rating: {
            type: Number,

        },
        manufacturer: {
            type: String,

        },
        osType: {
            type: String,

        }
        
    },

);
autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, {
    model:'Product',
    field:'product_id',
    startAt: 100,
    incrementBy: 1
});
module.exports = mongoose.model('Product', productSchema);