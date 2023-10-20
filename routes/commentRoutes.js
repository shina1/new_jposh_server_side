import { check } from 'express-validator';
import express from "express";
import { createComment } from '../controllers/commentController';
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router()

router.post('/comment', [
    check('text', 'Text is required').notEmpty(),
  ],verifyToken, createComment)