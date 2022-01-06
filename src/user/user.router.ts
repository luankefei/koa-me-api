import * as Router from "koa-router";
import { UserController } from "./user.controller";
// import { User } from "./user.entity";

export default async (router: Router) => {
  const userActions = new UserController();

  router.get("/users", async (ctx) => {
    const users = await userActions.findAll();
    console.log(users);
    ctx.body = users;
    // return;
  });
};
