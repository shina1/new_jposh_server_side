import express from "express";
import { authUsers, createUser, deleteUser, getAllUsers, getUserProfile, updateUserProfile, userStats } from "../controllers/userController.js";
import { shield, verifyToken, verifyTokenAndAdmin } from "../middleware/authMiddleware.js";

const router = express.Router()
router.route('/').post(createUser)
router.route('/login').post(authUsers)
router.route('/profile/:id').get(verifyToken ,getUserProfile)
router.route('/findall').get(verifyToken, getAllUsers)
router.route('/update/:id').put(verifyToken, updateUserProfile)
router.route('delete/:id').delete(verifyToken, deleteUser)
router.route('/stats').get(verifyToken, userStats)

// localhost:2600/api/v1/users/findall





export default router