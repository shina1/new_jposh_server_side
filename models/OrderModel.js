// import mongoose from "mongoose";

// const {Schema} = mongoose;

// const OrderSchema = Schema(
// {
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "User",
//       },
//   products: [
//       {
//           productId: {type: String},
//           quantity: {type:Number, default: 1}
//       }
//   ],
//   amount: {
//       type: Number,
//   },
//   address: {type: Object,},
//   status: {type: String, default: 'pending'},
//   paymentMethod: {
//       type: String,
//       required: true
//   },
//   paymentResult: {
//     id: { type: String },
//     status: { type: String },
//     update_time: { type: String },
//     email_address: { type: String },
//   },
//   discountPrice: {
//       type:Number,
//       default: 0.0,
//   },
//   isPaid: {
//     type: Boolean,
//     deafault: false,
//   },
//   paidAt: {
//     type: Date,
//   },
//   isDelivered: {
//     type: Boolean,
//     deafault: false,
//   },
//   deliveredAt: {
//     type: Date,
//   },
// },
// {
//     timestamps: true
// }
// )

// const Order = mongoose.model('Order', OrderSchema)

// export default Order

import mongoose from 'mongoose'

const {Schema} = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: false,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
