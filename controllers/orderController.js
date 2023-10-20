import asyncHandler from "express-async-handler"
import Cart from "../models/CartModel.js"
import Order from "../models/OrderModel.js"

// @desc Create new Order
//  @route Post/api/v1/orders
// @access Private

const addOrderItems = asyncHandler(async(req, res) => {
    const {taxPrice, totalPrice, shippingPrice, orderItems, shippingAddress, paymentMethod } = req.body
    if(orderItems && orderItems.length === 0){
        throw new Error('Your cart is empty')
    }else{
        const newOrder = new Order({
            taxPrice, 
            totalPrice, 
            shippingPrice, 
            orderItems,
            shippingAddress, 
            paymentMethod,
            user: req.user.id
        });
        const createdOrder = await newOrder.save()
        return res.status(201).json(createdOrder)
    };
})


// @desc Update Order
//  @route Post/api/v1/orders/update/${id}
// @access Private
const updateOrder = asyncHandler(async(req, res) => {
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        {new: true}
        )
        res.status(200).json(updatedOrder)
    } catch (error) {
        
    }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'id email')

    if(order) {
        res.status(200).json(order)
    }else {
        res.status(404).json('Order not found')
    }
})

// @desc Delete Order
//  @route Post/api/v1/orders/update/${id}
// @access Private

const deleteOrder = asyncHandler(async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted!")
    } catch (error) {
        res.status(500).json(error)
    }
})

// @desc Get user order by id
//  @route GET /api/orders/${id}
// @access Private

const getUserOrder = async(req, res) => {
    try {
        const userOrders = await Order.find({userId: req.params.userId}).sort({_id : -1})
        res.status(200).json(userOrders)
    } catch (error) {
        res.status(500).json(error)
    }
}

// @desc Get All Orders
//  @route Post/api/v1/orders/update/${id}
// @access Private/Admin
const getAllOrder = async(req, res) => {
    const query = req.query.new;
    try {
        const allOrders =   query ? await Order.find({}).populate('user', 'id name').sort({_id : -1}).limit(5) : await Order.find({}).populate('user', 'id name')
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(500).json(error)
    }
}



// STATS
// @desc Get Monthly Income
//  @route Post/api/v1/orders/update/${id}
// @access Private

const getMonthlyIncome = async(req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: {
                createdAt : { $gte: previousMonth},}
        },
            {
                $project : {
                    month : {$month: "$createdAt"},
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum : "$sales"},
                }
            }
        ]);
       return res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
}

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        // email_address: req.body.payer.email_address,
      }
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  
  // @desc    Update order to delivered
  // @route   GET /api/orders/:id/deliver
  // @access  Private/Admin
  const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      return res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })


export {
    addOrderItems,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrder,
    getOrderById,
    getMonthlyIncome,
    updateOrderToPaid,
    updateOrderToDelivered,
    // getAllNewOrder
}


