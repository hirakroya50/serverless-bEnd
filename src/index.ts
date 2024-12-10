import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c) => {
  //db call
  // get req body , headers , query params , meddilewires
  const body = await c.req.json();
  console.log("body--", body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("params"));
  const params = c.req.query("params");
  return c.json({
    status: "on1",
    body,
    params: params,
  });
});
app.get("/", (c) => {
  return c.text("Hello Hono!--------get");
});
app.delete("/", (c) => {
  return c.text("Hello Hono!--------delete");
});
app.put("/", (c) => {
  return c.text("Hello Hono!--------put");
});

export default app;
