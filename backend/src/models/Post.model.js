import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  published_at: {
    type: Date,
  },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
