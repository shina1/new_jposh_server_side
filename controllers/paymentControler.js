import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';

import User from "../models/UserModel.js";

const idempotencyKey = uuidv4();
const stripe = new Stripe(`${process.env.STRIPE_KEY}`, {maxNetworkRetries: 1})

const stripePayment = async(req, res) => {
  const {headers, stripeToken, amount, product} = req.body
  
  return stripe.customers.create({
      email: stripeToken.email,
      source: stripeToken.id,
  }).then(customer => {
    stripe.charges.create({
      amount: amount * 100,
      currency: "gbp",
      customer: customer.id,
      receipt_email: stripeToken.email,
      description: `Purchase of product successful`,
      shipping: {
        name: stripeToken.card.name,
        address: {
          city: stripeToken.card.address_city,
          country: stripeToken.card.address_city
        }
      }
    }, {idempotencyKey})
  }).then(result => {
    
      res.status(200).json(result)
    
  }
    )
  .catch(err => {
    throw new Error(err)
  })
}


// const stripePayment = async(req, res) => {
//   const {headers, stripeToken, amount, product, customerId} = req.body
  
   

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount * 100,
//         currency: "gbp",
//         customer: customerId,
//     });

//     return res.json({
//         checkoutSecret: paymentIntent.client_secret,
//         product,
//     });

  
// }








export{
    stripePayment
}

