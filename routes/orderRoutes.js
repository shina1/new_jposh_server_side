import express from "express";
import { addOrderItems, deleteOrder, getAllOrder, getMonthlyIncome, getOrderById, getUserOrder, updateOrder, updateOrderToDelivered, updateOrderToPaid } from "../controllers/orderController.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/', verifyToken, addOrderItems)
router.put("/update/:id", verifyToken, updateOrder)
router.delete("/delete/:id", verifyToken, deleteOrder)
router.get("/userorder/:userId", verifyToken
, getUserOrder)
router.get("/findall", verifyToken, getAllOrder)
router.get("/income", verifyToken, getMonthlyIncome)
router.get('/:id', verifyToken, getOrderById )
// router.get('/neworders', verifyToken, getAllNewOrder)
router.put('/:id/deliver', verifyToken, updateOrderToDelivered)
router.put('/:id/pay', verifyToken, updateOrderToPaid)




export default router