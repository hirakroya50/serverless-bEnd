import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";

export async function authMiddleWare(
  c: Context<BlankEnv, "/", BlankInput>,
  next: any
) {
  console.log("request comming here");
  const auth = c.req.header("Authorization");
  if (auth) {
    console.log(c.req.header("Authorization"));
    next();
  } else {
    console.log("request is not varied pass any sting in Authorization header");
    return;
  }
}
