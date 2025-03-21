// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;


// const productSchema = new mongoose.Schema({
//     name: String,
//     code: String,
//     category: String,
//     price: Number,
//     imageUrl: String,
//     isVisible: { type: Boolean, default: true }
// }, { collection: 'sanpham' });  // Thêm tên collection chính xác


// module.exports = mongoose.model('Product', productSchema);
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    "Tên sản phẩm": { type: String, required: true },
    "Giá hiện tại": { type: String, required: true },
  "Mô tả": { type: String, required: true },
  "SKU":  { type: String, required: true },
  "Ảnh sản phẩm": { type: [String], default: [] }, // Lưu đường dẫn file ảnh
  isVisible: { type: Boolean, default: true }
}, { collection: "sanpham" });

const Product = mongoose.model("sanpham", productSchema);

module.exports = Product;
