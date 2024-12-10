import { Hono } from "hono";
import { authMiddleWare } from "./middlewares/auth";
import { getPrisma } from "./prisma-connect/prismaFunction";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    // console.log("body--", body);
    // console.log(c.req.header("Authorization"));
    // console.log(c.req.query("params"));
    // const params = c.req.query("params");
    const prisma = getPrisma(c.env.DATABASE_URL);

    if (!body.postname)
      return c.json({
        status: "failed",
        msg: "please provide postname in the req body",
      });

    const post = await prisma.post.create({
      data: {
        name: body.postname,
      },
    });
    return c.json({
      status: 1,
      post,
    });
  } catch (error) {}
});
app.get("/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const post = await prisma.post.findMany();
    return c.json({ post });
  } catch (error) {
    console.log(error);
  }
});
app.delete("/", (c) => {
  return c.text("Hello Hono!--------delete");
});
app.put("/", (c) => {
  return c.text("Hello Hono!--------put");
});

export default app;
