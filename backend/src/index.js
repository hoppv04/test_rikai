import express from "express";
import postRoutes from "./routes/post.route.js";
import dotenv from "dotenv";
import connectMongoDB from "./configs/connectMongoDB.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/posts", postRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
  connectMongoDB();
});
