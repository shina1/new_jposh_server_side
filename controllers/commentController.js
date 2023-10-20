import { body, validationResult } from "express-validator";
import BlogPost from "../models/BlogModel";
import Comment from "../models/CommentModel";

const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const postId = req.params.id;
  const { text } = req.body;

  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }
    const newComment = new Comment({ text, user: req.user.id });
    post.comments.push(newComment);

    await post.save();

    return res.status(201).json({
      status: "success",
      message: "Comment saved",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const createCommentReply = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "validation error",
      errors: errors.array(),
    });
  }
  const { text } = req.body;
  const commentId = req.params.id;
  try {
    const post = await BlogPost.findOne({ "comments._id": commentId });
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Post not found",
      });
    }
    const comment = post.comments.find(
      (comm) => comm._id.toString() === commentId
    );

    if (!comment) {
      return res.status(400).json({
        status: "failed",
        message: "Comment not found",
      });
    }

    const newReply = await new Comment({ text, user: req.user.id });
    Comment.replies.push(newReply);
    await post.save();

    return res.status(201).json({
      status: "success",
      message: "Reply created",
      data: newReply,
    });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

export { createComment, createCommentReply };
