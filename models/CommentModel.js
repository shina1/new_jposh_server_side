import mongoose from "mongoose";

const {Schema} = mongoose


const CommentSchema = Schema({
author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
},
content: {
    type: String,
    required: true,
},
date: {
    type: Date,
    default: Date.now,
},
parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
},
replies: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }
]

})

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment