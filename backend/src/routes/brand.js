const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController")
const authMiddleware = require("../middleware/authMiddleware")
const verifyRole = require("../middleware/verifyRole");


router.post("/add", authMiddleware,verifyRole('admin'), brandController.addBrand)
router.get("/", brandController.getAllBrand)
router.get('/:id', authMiddleware, brandController.getBrand)
router.put('/:id', authMiddleware, verifyRole('admin'), brandController.updateBrand)
router.delete('/:id', authMiddleware, verifyRole('admin'), brandController.deleteBrand)

module.exports = router;
