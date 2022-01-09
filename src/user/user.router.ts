import { Context } from "koa";
import * as Router from "koa-router";
import { UserController } from "./user.controller";

export default async (router: Router) => {
  const userActions = new UserController();

  router.post("/auth/login", async (ctx: Context) => {
    const { username, password } = ctx.request.body;
    console.log("ctx.request.body", ctx.request.body);
    const userNameHash = await userActions.login(username, password);

    ctx.cookies.set("me_signed_username", userNameHash, {
      domain: "192.168.50.165:3000",
      maxAge: 30 * 3600 * 24 * 1000,
      httpOnly: true,
    });

    console.log("maxage", 30 * 3600 * 24);

    ctx.body = userNameHash;
  });

  router.post("/user", async (ctx: Context) => {
    const params = ctx.request.body;
    const user = await userActions.createUser(params);
    ctx.body = user;
  });

  // http://localhost:8000/api/me/user/runrunrun
  router.get("/user/:username", async (ctx: Context) => {
    const { username } = ctx.params;
    console.log("find user router", username);
    const user = await userActions.findOne(username);
    ctx.body = user;
  });

  // http://localhost:8000/api/me/users
  router.get("/users", async (ctx: Context) => {
    const users = await userActions.findAll();
    ctx.body = users;
  });
};
