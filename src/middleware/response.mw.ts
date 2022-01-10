import { Context, Router } from "koa";

/**
 * modification middleware
 */

// @see https://stackoverflow.com/questions/56558386/how-to-create-koa2-middleware-which-will-modify-response-body-and-run-last-in-a
export default async (ctx: Context | Router.IRouterContext, next: () => Promise<any>) => {
  await next();

  if (ctx.body && typeof ctx.body.error !== "undefined") return (ctx.body.data = null);

  ctx.body = {
    error: {
      error_code: 0,
      error_detail: "",
    },
    data: ctx.body,
  };
};
