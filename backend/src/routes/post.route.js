import express from "express";
import {
  addPost,
  deleteProduct,
  getAllPosts,
  getPostById,
  updateProduct,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/add", addPost);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
