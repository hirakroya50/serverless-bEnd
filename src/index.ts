import { Hono } from "hono";
import { authMiddleWare } from "./middlewares/auth";
import { PostService } from "./services/post.service";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

const postService = new PostService();

// CORS Middleware
app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow only your Next.js app
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") {
    return c.text("", 204); // Handle preflight request
  }

  await next();
});

// Routes
app.post("/", postService.createPost);
app.get("/", postService.getPost);
app.delete("/", postService.deletePost);
app.put("/", postService.updatePost);

export default app;
