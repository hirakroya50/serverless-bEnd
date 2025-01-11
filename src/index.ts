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
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://d2yq29g6vw6zn5.cloudfront.net",
  ];
  const origin = c.req.header("Origin");

  console.log({
    origin,
  });

  if (origin && allowedOrigins.includes(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
  } else {
    c.header("Access-Control-Allow-Origin", "null");
  }

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
