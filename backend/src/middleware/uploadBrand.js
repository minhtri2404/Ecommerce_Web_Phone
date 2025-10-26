const multer = require('multer')
const path = require('path')

// Cấu hình lưu ảnh ở thương hiệu
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/brand")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }).single('image')
module.exports = upload