const Category = require('../models/categoryModel')
const upload = require('../middleware/uploadCategory')

class CategoryController{
    // Chức năng thêm danh mục
    addCategory = async(req, res) => {
       upload(req, res, async(err) => {
            if (err) {
                return res.status(500).json({success: false, message: "Tải ảnh không thành công", error: err.message})
            }
            try {
                const {categoryName, categoryDescription} = req.body

                // Kiểm tra xem là các trường có bị lỗi hay không
                if (!categoryName || !categoryDescription) {
                    return res.status(400).json({success: false, message: "Tất cả trường không được bỏ trống"})
                }

                // Kiểm tra xem danh mục có tồn tại hay không
                const existingCategory = await Category.findOne({ categoryName})
                if (existingCategory) {
                    return res.status(400).json({success: false, message: "Danh mục đã tồn tại!"})
                }

                const imagePath = req.file.filename;

                const newCategory = new Category({
                    categoryName, 
                    categoryDescription,
                    categoryImage: imagePath
                })
                await newCategory.save()

                return res.status(200).json({success: true, message: "Thêm mới danh mục thành công", category: newCategory})
            } catch (error) {
                return res.status(500).json({success: false, message: 'Server Error'})
            }
       })
    }

    // Hiển thị tất cả danh mục
    getAllCategories = async(req, res) => {
        try {
            const category = await Category.find()
            return res.status(200).json({success: true, category})
        } catch (error) {
            return res.status(500).json({success: false, message: "Server Error"})
        }
    }
}

module.exports = new CategoryController()