const Product = require('../models/productModel')

class ProductController {
    addProduct = async(req, res) => {
        try {
            const dataImages = req.files
            const {name, price, category, brand} = req.body

            if(!name || !price || !category || !brand || dataImages.length === 0){
                return res.status(400).json({success: false, message: 'Thiếu thông tin sản phẩm'})
            }

            let images = dataImages.map(file => file.filename);
            
            const newProduct = new Product({
                name,
                price,
                category,
                brand,
                images
            })
            await newProduct.save()
            return res.status(200).json({success: true, message: 'Thêm sản phẩm thành công', product:newProduct})

        } catch (error) {
            return res.status(500).json({success: false, message: 'Server Error'})
        }
    } 
}

module.exports = new ProductController()