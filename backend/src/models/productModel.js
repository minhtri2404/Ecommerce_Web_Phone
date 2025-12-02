const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  // --- Thông tin cơ bản ---
  name: { type: String, required: true },             // Tên sản phẩm
  price: { type: Number, required: true },            // Giá bán
  images: [{ type: String }],                         // Danh sách ảnh

  // --- Liên kết danh mục & thương hiệu ---
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },


  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
