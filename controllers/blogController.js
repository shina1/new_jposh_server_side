import { body, validationResult } from "express-validator";

import BlogPost from "../models/BlogModel.js";

// Define validation rules for create post request
export const createPostRules = [
  body("title").notEmpty(),
  body("content").notEmpty(),
  body("category").notEmpty(),
  body("imageUrl").isURL(),
  body("shortDescription").notEmpty(),
];

const createBlog = async (req, res) => {
  // validate request
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const reqBody = req.body;
  const newBlogPost = new BlogPost({
    title: reqBody.title,
    content: reqBody.content,
    category: reqBody.category,
    imageUrl: reqBody.imageUrl,
    shortDescription: reqBody.shortDescription,
  });

  try {
    const savedPost = await newBlogPost.save();
    return res.status(201).json({
      status: "success",
      message: "blog post created successfully",
      content: savedPost,
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

export const editPostRules = [
  body("title").notEmpty(),
  body("content").notEmpty(),
  body("category").notEmpty(),
  body("imageUrl").isURL(),
  body("shortDescription").notEmpty(),
];

// Update post request handler function
const updatePostHandler = async (req, res) => {
  const blogId = req.params.id;
  try {
    // Find post by ID
    const post = await BlogPost.findById(blogId);

    // Check if post exists
    if (!post) {
      return res.status(404).send({
        status: "failed",
        message: "Post not found",
      });
    }

    // Update post properties with new values from request body
    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.category) post.category = req.body.category;
    if (req.body.imageUrl) post.imageUrl = req.body.imageUrl;
    if (req.body.shortDescription)
      post.shortDescription = req.body.shortDescription;

    // Save updated post to database
    const updatedPost = await post.save();

    // Return updated post
    return res.json({
      status: "success",
      message: "Post updated succefully",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(500).send("Internal Server error");
  }
};

const getBlogPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return res.status(404).json({
        status: "error",
        message: `Blog post with ID ${postId} not found`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "blog post found",
      data: blogPost,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the blog post",
    });
  }
};

const getBlogPostByCategory = async (req, res) => {
  const postCategory = req.params.category;
  try {
    const blogPost = await BlogPost.find(postCategory);

    if (!blogPost) {
      return res.status(404).json({
        status: "error",
        message: `Blog post with category ${postCategory} not found`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "blog post found",
      data: blogPost,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the blog post",
    });
  }
};

const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    if (!blogPosts || blogPosts.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No blog posts found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "blog posts found",
      data: blogPosts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the blog posts",
    });
  }
};

const deleteABlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blogpost = await BlogPost.findByIdAndDelete(blogId);
    if (!blogpost) {
      return res.status(404).json({
        status: "failed",
        message: `Blog post with id ${blogId} does not eist`,
      });
    }

    await blogpost.remove();

    return res.status(204).json({
      status: "success",
      message: "Blog post deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

export {
  createBlog,
  updatePostHandler,
  getBlogPostById,
  getAllBlogPosts,
  deleteABlog,
  getBlogPostByCategory,
};
