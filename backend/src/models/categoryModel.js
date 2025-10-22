//Category
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {type: String, required: true},
    categoryDescription: {type: String, required: true},
    categoryImage: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
