import mongoose from "mongoose";
import Comment from "./CommentModel.js";

const {Schema} = mongoose

const BlogSchemma = Schema(
    {
        title: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
          imageUrl: {
            type: String,
            required: true,
          },
          shortDescription: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            default: Date.now,
          },
          comments: [Comment.schema]
    }
    ,
    {
        timestamps: true,
    }
)

const BlogPost = mongoose.model('BlogPost', BlogSchemma)

export default BlogPost