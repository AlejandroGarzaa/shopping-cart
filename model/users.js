const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,

        },
        password: {
            type: String,
            required: true,
        },
        phone_number: {
            type: Number,
            required: true
           
        },
        email: {
            type: String,

        }
    },

);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
    model:'User',
    field:'_id',
    startAt: 1,
    incrementBy: 1
});
module.exports = mongoose.model('User', userSchema);