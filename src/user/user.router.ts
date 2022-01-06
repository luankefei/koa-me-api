import * as Router from "koa-router";
import { UserController } from "./user.controller";
// import { User } from "./user.entity";

export default async (router: Router) => {
  const userActions = new UserController();

  // http://localhost:8000/api/me/user/runrunrun
  router.get("/user/:username", async (ctx) => {
    const { username } = ctx.params;
    const user = await userActions.findOne(username);
    ctx.body = user;
  });

  // http://localhost:8000/api/me/users
  router.get("/users", async (ctx) => {
    const users = await userActions.findAll();
    ctx.body = users;
  });
};
