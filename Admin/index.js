const express = require("express")
const mongoose = require("mongoose"); // Import mongoose
const app = express()
const port =3000

app.use('assets', express.static('assets'));

// frontend ở bất kỳ domain nào cũng có thể gọi API mà không bị chặn bởi trình duyệt.
const cors = require("cors")
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route
const Route = require("./routes/router.js")
app.use('/',Route)

app.use(express.json());
//------------------------------------------


// =============KẾT NỐI ĐẾN DB===============
//connect mongodb
const db = require('./config/db')
db.connect()

// Import model Product, được định nghĩa trong file models/Product.js.
const Product = require('./models/Product')




//===s
app.get("/sanpham", cors(), async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//==============================
// Cấu hình lưu file ảnh
// const storage = multer.diskStorage({
//     destination: 'assets/img/',
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));
//     }
//   });






// -------------------------------------------

// thêm routes cho dễ quản lý khi có nhiều function

// cần cái này
app.listen(port, ()=>{
    console.log(`My server listening on port:  ${port}`)
})

//--------------------------









