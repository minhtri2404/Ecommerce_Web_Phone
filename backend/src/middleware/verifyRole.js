const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Chưa xác thực người dùng' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ success: false, message: 'Bạn không có quyền truy cập chức năng này' });
        }

        next();
    };
};

module.exports = verifyRole;