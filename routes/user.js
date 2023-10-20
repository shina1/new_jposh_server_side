import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser, userStats } from "../controllers/userController.js";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middleware/authMiddleware.js";


const router = express.Router()

router.put('/update/:id',verifyTokenAndAuthorization, updateUser)

router.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser)
router.get('/find/:id', verifyTokenAndAdmin, getUser)


router.get('/findall',verifyTokenAndAdmin, getAllUsers)


router.get('/userStats', verifyTokenAndAdmin, userStats)

export default router