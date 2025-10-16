const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyUser = async(req, res, next) => {
    try {
        const token = req.cookies.token; // 👈 lấy token từ cookie

        if (!token) {
            return res.status(401).json({success: false, error: 'Không có token'})
        }

        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password'); // loại bỏ trường password
        if (!user) {
            return res.status(404).json({success: false, error: 'Không tìm thấy người dùng'})
        }

        req.user = user; // gán thông tin người dùng vào req
        next(); // chuyển sang middleware tiếp theo

    } catch (error) {
        return res.status(401).json({ success: false, error: "Token không hợp lệ hoặc hết hạn" });
    }
}

module.exports = verifyUser;
