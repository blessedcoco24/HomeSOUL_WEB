const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const multer = require('multer');


// const multer = require('multer'); 
const path = require('path');
router.get('/',(req,res)=>{
    res.send('OK')
})

//===import model
const Product = require('../models/Product')




// 🔹 Cấu hình Multer: Định nghĩa storage TRƯỚC KHI sử dụng
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'H:/HOC TK WEB/DoAn/HomeSoul/src/assets/img/'); // Thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file
    }
  });
  const upload = multer({ storage });





//----------------------------------------
// ========get all products
router.get("/sanpham",async(req,res)=>{
    try{
        let products = await Product.find()
        res.json(products)
    } catch (err){
        res.json({message: err.message})
    }
})




// // GET sản phẩm theo ID

router.get('/sanpham/:id', async (req, res) => {
    try {
        console.log("Received raw ID:", req.params.id);

        if (!mongoose.Types.ObjectId.isValid(req.params.id.trim())) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const productId = new mongoose.Types.ObjectId(req.params.id.trim());
        console.log("Converted ObjectId:", productId);

        const product = await Product.findById(productId);
        console.log("Product found:", product);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: err.message });
    }
});

router.put("/sanpham/:id", async (req, res) => {
    console.log("🛠 Nhận request PUT, ID:", req.params.id);
    console.log("📥 Dữ liệu nhận được:", req.body);

    try {
        const productId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "❌ Invalid product ID" });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "❌ Request body trống!" });
        }

        // Chỉ cập nhật các field có trong DB
        const updateFields = {};
        const allowedFields = ["Tên sản phẩm", "Giá hiện tại", "Mô tả", "Kích thước & Chất liệu", "SKU", "Đánh giá", "Ảnh sản phẩm"];

        for (let key of allowedFields) {
            if (req.body[key] !== undefined) {
                updateFields[key] = req.body[key];
            }
        }

        console.log("✅ Cập nhật với:", updateFields);

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "❌ Product not found" });
        }

        res.json({ message: "✅ Cập nhật thành công!", data: updatedProduct });
    } catch (err) {
        console.error("❌ Lỗi cập nhật sản phẩm:", err);
        res.status(500).json({ message: "Lỗi server: " + err.message });
    }
});



router.patch("/sanpham/:id", async (req, res) => {
    try {
        const productId = req.params.id.trim()
        await Product.updateOne(
            
            { _id: req.params.id },
            {
                $set: {
                    "Tên sản phẩm": req.body["Tên sản phẩm"],
                    "Giá hiện tại": req.body["Giá hiện tại"],
                    "Mô tả": req.body["Mô tả"],
                    "Kích thước & Chất liệu": req.body["Kích thước & Chất liệu"],
                    "SKU": req.body["SKU"]
                }
            }
        );
        res.json({ message: "success" });
    } catch (err) {
        res.json({ message: err.message });
    }
});




// ======= post product
router.post('/them-san-pham', async (req, res) => {
    try {
        console.log("📩 Dữ liệu nhận từ client:", req.body); // Kiểm tra dữ liệu gửi lên

        const { productName, productPrice, productDescription, productSKU, isVisible, productImage } = req.body;

        if (!productName || !productPrice || !productDescription || !productSKU) {
            return res.status(400).json({ message: "❌ Vui lòng nhập đầy đủ thông tin sản phẩm!" });
        }

        const newProduct = new Product({
            "Tên sản phẩm": productName,
            "Giá hiện tại": productPrice,
            "Mô tả": productDescription,
            "SKU": productSKU,
            isVisible: isVisible ?? true,
            "Ảnh sản phẩm": productImage || "" // Tránh lỗi khi ảnh chưa có
        });

        await newProduct.save();
        res.status(201).json({ message: "✅ Sản phẩm đã được thêm!", product: newProduct });
    } catch (error) {
        console.error("🔥 LỖI SERVER:", error);
        res.status(500).json({ message: "❌ Lỗi khi thêm sản phẩm", error: error.message });
    }
});

// router.post('/them-san-pham', async (req, res) => {
//     try {
//         const { productName, productPrice, productDescription, productSKU, isVisible } = req.body;

//         // Kiểm tra dữ liệu đầu vào
//         if (!productName || !productPrice || !productDescription || !productSKU) {
//             return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin sản phẩm!" });
//         }

//         // Tạo sản phẩm mới
//         const newProduct = new Product({
//             "Tên sản phẩm": productName,
//             "Giá hiện tại": productPrice,
//             "Mô tả": productDescription,
//             "SKU": productSKU,
//             isVisible: isVisible ?? true,
//             "Ảnh sản phẩm": productImage 
//         });

//         // Lưu vào MongoDB
//         await newProduct.save();
//         res.status(201).json({ message: "Sản phẩm đã được thêm!", product: newProduct });
//     } catch (error) {
//         res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error });
//     }
// });

//=================ảnh

// ✅ API UPLOAD ẢNH
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file nào được tải lên!' });
  }
  const imageUrl = `assets/img/${req.file.filename}`; // Đường dẫn tươ
  res.json({
    message: 'Tải ảnh lên thành công!',
    imageUrl: imageUrl // Trả về đường dẫn ảnh
  });
});

// router.post("/product", async (req,res)=>{
//     console.log(req.body)
//     const product = new Product({
//         name: req.body.name,
//         price: req.body.price,
//     })

// try {
//     const saveProduct = await product.save()
//     console.log(saveProduct)
//     // res.send("Server receive data")
//     res.json({message: "success"})
// } catch (err){
//     res.json({message: err.message})
// }
// })




// -----------------------------------------
// ======update product
// router.patch("/:id", async (req,res)=>{
//     //console.log(req.body)
//     try {
//         await Product.updateOne(
//             {_id: req.params.id},
//             {$set: {name: req.body.name, price: req.body.price}}
//         )
//         res.json({message:"success"})
//     } catch (err){
//         res.json({message: err.message})
//     }
// })

//-------------------------------
// //==========delete product
// router.delete("/:id", async (req,res)=>{
//     try {
//         await Product.deleteOne(
//             {_id: req.params.id},
//             // {$set: {name: req.body.name, price: req.body.price}}
//         )
//         res.json({message:"success"})
//     } catch (err){
//         res.json({message: err.message})
//     }
// })
// // ---------------
// router.put("/:id", async (req, res) => {
//     try {
//       const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true } // Trả về sản phẩm sau khi cập nhật
//       );
//       if (!updatedProduct) {
//         return res.status(404).json({ message: "Product not found" });
//       }
//       res.json(updatedProduct);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  




// ==NHỚ EXPORT ROUTER====
module.exports = router