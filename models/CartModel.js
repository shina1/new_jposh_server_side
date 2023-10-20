import mongoose from "mongoose";

const {Schema} = mongoose

const CartSchema = Schema(
    {
        userId: {type: String, required: true},
        products: [
            {
                productId: {type: String},
                quantity: {type: Number, default: 1}
            }
        ]
    },
    {
        timestamps:  true
    }
)

const Cart = mongoose.model('Cart', CartSchema)

export default Cart