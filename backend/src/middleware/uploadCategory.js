const multer = require('multer')
const path = require('path')

// Cấu hình lưu ảnh ở product
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/category")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }).single('categoryImage')
module.exports = upload