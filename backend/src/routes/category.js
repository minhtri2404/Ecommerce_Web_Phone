const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController")
const authMiddleware = require("../middleware/authMiddleware")
const verifyRole = require("../middleware/verifyRole");


router.post("/add", authMiddleware,verifyRole('admin'), categoryController.addCategory)
router.get("/", categoryController.getAllCategories)
router.get('/:id', authMiddleware, categoryController.getCategories)
router.put('/:id', authMiddleware, verifyRole('admin'), categoryController.updateCategory)
router.delete('/:id', authMiddleware, verifyRole('admin'), categoryController.deleteCategory)

module.exports = router;
