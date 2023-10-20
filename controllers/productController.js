import Products from "../models/ProductModel.js"
import asyncHandler from 'express-async-handler'
import Product from "../models/ProductModel.js"


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async(req, res) => {
    const newProduct = new Products(req.body)
try {
    const savedProduct = await newProduct.save()

    res.status(200).json(savedProduct)
} catch (error) {
    res.status(500).json(error)
}
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
// const createProduct = asyncHandler(async (req, res) => {
//     const product = new Products({
//       title: 'Sample name',
//       price: 0,
//       user: req.user._id,
//       img: '/images/sample.jpg',
//       desc: "sample desc",
//       color: [],
//       size: [],
//       category: 'Sample category',
//       countInStock: 0,
//       numReviews: 0,
//     })
  
//     const createdProduct = await product.save()
//     res.status(201).json(createdProduct)
//   })

// @desc    Edit a product
// @route   PUT /api/products
// @access  Private/Admin

const editProduct = asyncHandler(
    async(req, res) => {
        
    // const editedProduct = await Products.findByIdAndUpdate(
    //             req.params.id, 
    //             {$set: req.body}, 
    //             {new: true}
    //         );
    // res.status(200).json(editedProduct)
    const product = await Product.findById(req.params.id);

    if(product){
        product.title = req.body.title || product.title
        product.desc = req.body.desc || product.desc
        product.img = req.body.img || product.img
        product.frontImg = req.body.frontImg || product.frontImg
        product.backImg = req.body.backImg || product.backImg
        product.video = req.body.video || product.video
        product.category = req.body.category || product.category
        product.size = req.body.size || product.size
        product.color = req.body.color || product.color
        product.price = req.body.price || product.price
        product.discoutPrice = req.body.discoutPrice || product.discoutPrice
        product.inStock = req.body.inStock || product.inStock
        product.countInStock = req.body.countInStock || product.countInStock
        product.discount = req.body.discount || product.discount
        product.reviews = req.body.reviews || product.reviews
        product.avgRating = req.body.avgRating || product.avgRating
        product.numReviews = req.body.numReviews || product.numReviews

        const updatedProduct = await product.save();

        res.status(200).json({
            status: "Success",
            message: "Product updated succefully",
            data:{
                _id: updatedProduct._id,
                ...updatedProduct
            }
        })
    }else{
                res.status(404).json({
                    status:"failed",
                    message: "product not found"
                })
                throw new Error("Product not found")
            }
        
    }
)


// delete a product

// const deleteProduct = async(req, res) => {
//     try {
//         await Products.findByIdAndDelete(req.params.id)
//         res.status(200).send('Product has been deleted!')
        
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
  
    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

// GET single product
const getProduct = async(req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        if(product){
            
           return res.status(200).json(product)

        }else{

        return res.status(404).json("Product not found!")

        }
       
    } catch (error) {
        res.status(500).json(error)
    }
    }

// @desc    GET all products
// @route   GET /api/products/
// @access  Public

const getAllProducts = async(req, res) => {
    const queryNew = req.query.new;
    const queryCat = req.query.category;
    try {
       let products;
        if(queryNew){
            products = await Products.find().sort({ createdAt: -1}).limit(10);
        }else if(queryCat){
            products = await Products.find({
                category : {
                    $eq:  queryCat,
                },
            })
        }else{
            products = await Products.find()
        }
        if(products) {
            return res.status(200).json(products)
        }else{
            return res.status(404).json("Products not found")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

// @desc    Get porpular products
// @route   GET /api/products/
// @access  Public
const getPorpularProducts = async(req, res) => {
    try {
        const porpularProducts = await Products.find().sort({ createdAt: -1}).limit(6);
        if(porpularProducts) {
            return res.status(200).json(porpularProducts)
        }else{
            return res.status(404).json("Products not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Products.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

  // @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Products.find({}).sort({ rating: -1 }).limit(3)
  
    res.json(products)
  })

export {
    createProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    getPorpularProducts,
    createProductReview ,
    getTopProducts
}