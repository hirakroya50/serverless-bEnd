import { Hono } from "hono";
import { authMiddleWare } from "./middlewares/auth";
import { PostService } from "./services/post.service";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

const postService = new PostService();

// Routes
app.post("/", postService.createPost);
app.get("/", postService.getPost);
app.delete("/", postService.deletePost);
app.put("/", postService.updatePost);

export default app;
