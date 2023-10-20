import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
// import { registerUser } from "../controllers/userController.js";

const notAuthorized = 'Not authorized, invalid token';

const shield = asyncHandler(async(req, res, next) =>{
    let token
    
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await User.findById(decoded.id).select('-password')
             next()
        } catch (error) {
           return res.status(401).json(notAuthorized)
        }
    }
    if(!token){
       return res.status(401).json(notAuthorized)
    }
        next()
    })

    const verifyToken = (req, res, next) => {
        const authHeader = req.headers.token || req.headers.authorization;
        if(authHeader) {
            const token = authHeader.split(" ")[1];
            
            jwt.verify(token , process.env.JWT_SECRET, (err, user) => {
                if(err) res.status(403).json("Token is not valid");
                req.user = user
                next();
            })
            
        }else {
            return res.status(401).json("You are not authenticated")
        }
    }
    const verifyTokenAndAuthorization = (req, res, next) => {
        verifyToken(req, res,  ()=>{
            if(req.user.id === req.params.id || req.user.isAdmin){
                next()
            }else{
                return res.status(403).json("You are not allowed to perform this operation!")
            }
        })
    }
    const verifyTokenAndAdmin = (req, res, next) =>  {
        verifyToken(req, res, () => {
            if(req.user.isAdmin){
                next()
            }else{
                res.status(403).json("You are not allowed to perform this operation!")
            }
        })
    }
    
    export{
        shield,
        verifyToken,
        verifyTokenAndAuthorization,
        verifyTokenAndAdmin
    }