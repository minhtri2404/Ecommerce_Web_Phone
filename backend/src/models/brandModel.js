//Brand
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
})

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
