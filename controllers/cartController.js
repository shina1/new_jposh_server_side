import Cart from "../models/CartModel.js"


// create cart
const createUserCart = async(req, res) => {
    const newCart = new Cart(req.body)
  try {
      const savedCart = await newCart.save();
      return res.status(200).json(savedCart)
  } catch (error) {
      res.status(500).json(error)
  }
}
// GET USER CART

const getUserCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
}

// UPDATE CART
const updateCart = async(req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
        {
            $set: req.body,
        },
        {
            new: true
        }
        );
        res.status(200).json(updatedCart)

    } catch (error) {
        res.status(500).json(error)
        
    }
}

// DELETE CART

const deleteCart = async(req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart deleted!")
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET ALL

const getAllCart = async(req, res) => {
    try {
        const allCarts = await Cart.find()
        res.status(200).json(allCarts)
    } catch (error) {
        res.status(500).json(error)
    }
}

export {
    createUserCart,
    getUserCart,
    updateCart,
    deleteCart,
    getAllCart
}