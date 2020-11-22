const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String },
    isAvailable:{type:String},
    image:{type:String},   
     Date: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports.Category = Category;