const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController{
    // Chức năng đăng kí
    register = async(req, res) => {
        try {
            const {name, email, password, role} = req.body

            // Kiểm tra xem email có tồn tại không
            const existingUser = await User.findOne({ email})
            if (existingUser) {
                return res.status(400).json({success: false, message: "Email đã tồn tại"})
            }

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10)

            // Tạo người dùng mới
            const newUser = new User({ name, email, password: hashedPassword, role });
            await newUser.save();

            // Tạo JWT
            const token = jwt.sign(
                {id: newUser._id, role: newUser.role},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRATION}
            )

            // Gửi token qua cookie
            res.cookie('token', token, {
                httpOnly: true, // không truy cập được bằng JS (bảo mật)
                secure: process.env.NODE_ENV === 'production', // chỉ bật HTTPS trong production
                sameSite: 'strict', // chống CSRF
                maxAge: 3600000, // 1h (tùy chỉnh theo JWT_EXPIRATION)
            })

            return res.status(201).json({
                success: true,
                message: "Đăng kí thành công",
                user: {id: newUser._id, name: newUser.name, role: newUser.role}
            })
        } catch (error) {
           return res.status(500).json({success: false, error: error.message})
        }
    }

    // Chức năng dăng nhập
    login = async(req, res) => {
        try {
            const {email, password} = req.body

            // Kiểm tra xem email có tồn tại hay không
            const user = await User.findOne({ email})
            if (!user) {
                return res.status(400).json({success: false, message: "Email không tồn tại"})
            }

            // So sánh mật khẩu
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(404).json({success: false, message: "Sai mật khẩu"})
            }

             // Tạo JWT
            const token = jwt.sign(
                {id: user._id, role: user.role},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRATION}
            )

            // Gửi token qua cookie
            res.cookie('token', token, {
                httpOnly: true, // không truy cập được bằng JS (bảo mật)
                secure: process.env.NODE_ENV === 'production', // chỉ bật HTTPS trong production
                sameSite: 'strict', // chống CSRF
                maxAge: 3600000, // 1h (tùy chỉnh theo JWT_EXPIRATION)
            })

            return res.status(200).json({
                success: true,
                message: "Đăng nhập thành công",
                user: {
                    id: user._id, 
                    name: user.name, 
                    role: user.role
                }
            })

        } catch (error) {
            return res.status(500).json({success: false, error: error.message})
        }
    }

    // Chức năng dăng xuất
    logout = async(req, res) => {
        try {
           res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });
            return res.status(200).json({success: true, message: "Đăng xuất thành công"})
        } catch (error) {
            return res.status(500).json({success: false, error: error.message})
        }
    }
}

module.exports = new AuthController()