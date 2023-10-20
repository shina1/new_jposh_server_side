import mongoose from "mongoose";

const {Schema} = mongoose

const reviewSchema = Schema(
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      comment: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const ProductSchema = Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User"
        },
       title: {
           type: String,
           required: true,
           unique: true
       } ,
       desc: {
           type: String,
           required: true,
       },
       img: {type: String, required: true,},
       frontImg: {type: String,},
       backImg: {type: String,},
       video: {type: String, required: false},
       category: {type: String, required: true},
       size: {type: Array},
       color: {type: Array},
       price: {type: Number, required: true},
       discoutPrice: {type: Number},
       inStock: {type: Boolean, default: true},
       countInStock: {
        type: Number,
        required: true,
        default: 0,
      },
       discount: {type: Boolean, default: false},
       reviews: [reviewSchema],
       avgRating: {
           type: Number,
           required: true,
           default: 0,
       },
       numReviews: {
           type: Number,
           required: true,
           default: 0,
       }
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product