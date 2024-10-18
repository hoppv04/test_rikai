import Post from "../models/Post.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newPost = new Post({
      title,
      content,
      published_at: Date.now(),
    });
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Added post successfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    let post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Updated product successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted post successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
