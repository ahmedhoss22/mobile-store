const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user:{type : mongoose.Types.ObjectId , required: true , ref:"User"},
    product:{type : mongoose.Types.ObjectId , required: true , ref:"Product"}
});



const Order = mongoose.model("Order" , orderSchema)
module.exports = Order
