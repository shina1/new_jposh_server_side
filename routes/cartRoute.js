import express from "express";
import { createUserCart, deleteCart, getAllCart, getUserCart, updateCart } from "../controllers/cartController.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/authMiddleware.js";




const router = express.Router()

router.post('/', verifyToken, createUserCart)

router.get('/find/:userId', verifyTokenAndAuthorization, getUserCart)

router.get('/findAll', verifyTokenAndAdmin, getAllCart)

router.put('/update/:id', verifyTokenAndAuthorization, updateCart)

router.delete('/delete/:id', verifyTokenAndAuthorization, deleteCart)



export default router