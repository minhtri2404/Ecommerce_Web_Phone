const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/product");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
const authMiddleware = require("../middleware/authMiddleware")
const verifyRole = require("../middleware/verifyRole");
const productController = require("../controllers/productController")

router.post("/add", authMiddleware, upload.array('images', 100), verifyRole('admin'), productController.addProduct)


module.exports = router;
