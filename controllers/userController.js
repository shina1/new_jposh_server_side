// import catchAsync from "../utils/catchAsync.js";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js"


// REGISTER 
const registerUser = async(req, res) => {

    const {name, email, password} = req.body
   
    const existingUser = await User.findOne({email})
    if(existingUser){
       return res.status(404).json({
            message: "user already exist"
        })
    }
    const newUser = new User({
        name: name,
        email: email,
        password: password,
    })
    try {
        const savedUser = await newUser.save()
        return res.status(200).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id, newUser.isAdmin)
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// LOGIN
const loginUser = asyncHandler(async(req, res) => {
   
        const {email, password} = req.body
        let passwordCheck
        const user = await User.findOne({email})
        if(user){
            passwordCheck = await user.matchPassword(password);
        }
         
        
        if(user && passwordCheck !== null && passwordCheck !== undefined){
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin : user.isAdmin,
                token: generateToken(user._id, user.isAdmin)
            })
        }
        res.status(500).json('Wrong credentials')
    
})


// UPDATE USER

const updateUser = async(req, res) => {
  try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
       return res.status(200).json({
        updatedUser
       })
    } catch (error) {
       return res.status(500).json(error)
    }
}

// DELETE USER
const deleteUser = async(req, res)=>{
try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send('User has been deleted!')
} catch (error) {
    return res.status(500).json(error)
}
}


// GET single user
const getUser = async(req, res) => {
try {
    const user = await User.findById(req.params.id)
    if(user){
        const {password, ...others} = user._doc;
       return res.status(200).json({...others})
    }else{
    return res.status(404).json("User not found!")
    }
   
} catch (error) {
    res.status(500).json(error)
}
}

// GET ALL USERS

const getAllUsers = async(req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({_id : -1}).limit(5) : await User.find()

        if(users) {
            return res.status(200).json(users)
        }else{
            return res.status(404).json("Users not found")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET USER STATS

const userStats = async(req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const userStatsData = await User.aggregate([
            {$match: {createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            },
            
        ])

        // db.articles.aggregate(
        //     { $limit : 5 }
        // );

        res.status(200).json(userStatsData)
    } catch (error) {
        res.status(500).json(error)
    }
}


export{
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    userStats
}