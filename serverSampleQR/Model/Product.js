const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ProductName: { type: String },
    categoryID:{type:String},
    isAvailable:{type:String},
    Price:{type:Number},
    Description:{type:String},
    Rating:{type:Number},
    Veg:{type:Boolean,default:true},
    Date: { type: Date, default: Date.now },
    image:{type:String},
    Ingredients:{type:String}
});

const Product = mongoose.model('Product', ProductSchema);

module.exports.Product = Product;