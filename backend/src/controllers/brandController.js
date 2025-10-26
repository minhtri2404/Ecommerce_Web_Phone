const Brand = require('../models/brandModel')
const upload = require('../middleware/uploadBrand')
const fs = require('fs')
const path = require('path')

class BrandController{
    // Chức năng thêm thương hiệu
    addBrand = async(req, res) => {
       upload(req, res, async(err) => {
            if (err) {
                return res.status(500).json({success: false, message: "Tải ảnh không thành công", error: err.message})
            }
            try {
                const {name} = req.body
                // Kiểm tra xem là các trường có bị thiếu hay không
                if (!name) {
                    return res.status(400).json({success: false, message: "Tên thương hiệu không được bỏ trống"})
                }

                // Kiểm tra xem tên thương hiệu có tồn tại hay không
                const existingBrand = await Brand.findOne({ name })
                if (existingBrand) {
                    return res.status(400).json({success: false, message: "Tên thương hiệu đã tồn tại!"})
                }

                const imagePath = req.file.filename;

                const newBrand = new Brand({
                    name,
                    image: imagePath
                })
                await newBrand.save()

                return res.status(200).json({success: true, message: "Thêm mới thương hiệu thành công", brand: newBrand})
            } catch (error) {
                return res.status(500).json({success: false, message: 'Server Error'})
            }
       })
    }

    // Hiển thị tất cả thương hiệu
    getAllBrand = async(req, res) => {
        try {
            const brand = await Brand.find()
            return res.status(200).json({success: true, brand})
        } catch (error) {
            return res.status(500).json({success: false, message: "Server Error"})
        }
    }

    // Hiển thị thương hiệu theo ID
    getBrand = async(req, res) => {
        try {
            const {id} = req.params
            const brand = await Brand.findById(id)

            return res.status(200).json({success: true, brand})
        } catch (error) {
            return res.status(500).json({success: false, message: "Server Error"})
        }
    }

    // Cập nhật thương hiệu
    updateBrand = async(req, res) => {
        upload(req, res, async(err) => {
            if (err) {
                return res.status(500).json({success: false, message: "Tải ảnh không thành công", error: err.message})
            }
            try {
                const {id} = req.params

                const {name} = req.body
                // Kiểm tra xem là các trường có bị thiếu hay không
                if (!name) {
                    return res.status(400).json({success: false, message: "Tên thương hiệu không được bỏ trống"})
                }

                // Kiểm tra thương hiệu trước khi cập nhật
                const oldBrand = await Brand.findById(id)
                if (!oldBrand) {
                    return res.status(400).json({success: false, message: "Không tìm thấy thương hiệu"})
                }

                const updateData = {name}
                // Nếu có ảnh mới thì update
                if (req.file && req.file.filename) {
                    //Xóa ảnh cũ nếu tồn tại
                    if (oldBrand.image) {
                        const oldPath = path.join(__dirname, '..', '..', 'public', 'uploads/brand', oldBrand.image)
                        if (fs.existsSync(oldPath)) {
                            fs.unlinkSync(oldPath)
                        }
                    }
                    updateData.image = req.file.filename
                }

                const updateBrand = await Brand.findByIdAndUpdate(id, updateData, {new: true})
                return res.status(200).json({success: true, message: 'Cập nhật thành công', brand: updateBrand})

            } catch (error) {
                return res.status(500).json({success: false, message: "Server Error"})
            }
        })
    }

    // Xóa thương hiệu
    deleteBrand = async(req, res) => {
        try {
            const {id} = req.params

            const deleteBrand = await Brand.findByIdAndDelete(id)
            if (!deleteBrand) {
                return res.status(404).json({success: false, message: 'Không tìm thấy thương hiệu'})
            }

            //Nếu có hình ảnh thì xóa
            if (deleteBrand.image) {
                const imagePath = path.join(__dirname, '..', '..', 'public', 'uploads/brand', deleteBrand.image)
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            }

            return res.status(200).json({success: true, message: 'Xóa thành công'})
        } catch (error) {
            return res.status(500).json({success: false, message: "Server Error"})
        }
    }
}

module.exports = new BrandController()