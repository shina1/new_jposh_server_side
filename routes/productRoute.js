import express from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, getPorpularProducts, getProduct, createProductReview, getTopProducts } from "../controllers/productController.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/authMiddleware.js";



const router = express.Router()

router.post('/create', verifyTokenAndAdmin, createProduct)
router.put('/edit/:id', verifyTokenAndAdmin, editProduct)
router.delete('/delete/:id', deleteProduct)
router.get('/find/:id', getProduct)
router.get('/', getAllProducts)
router.get('/porpular', getPorpularProducts)
router.post('/:id/reviews', verifyToken, createProductReview)
router.get('/top', getTopProducts)


export default router