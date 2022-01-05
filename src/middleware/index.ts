import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";
import * as staticServer from "koa-static";

import getLogger from "../helper/logger.helper";
import { IMainOptions } from "../interface/index";

const helmet = require("koa-helmet");
const morgan = require("koa-morgan");
const convert = require("koa-convert");
const cors = require("koa-cors");

const logger = getLogger();

// -----------------------------------------------------------------------------

export async function httpLogger(ctx: Koa.Context | Router.IRouterContext, next: () => Promise<any>) {
  const start = Date.now();

  await next();

  const ms = Date.now() - start;
  const http = `[HTTP] ${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;
  logger.info(http);
}

// -----------------------------------------------------------------------------

export default function middleware(app: Koa, options: IMainOptions) {
  if (options.debug) {
    // @see: https://github.com/evert0n/koa-cors
    app.use(convert(cors({ origin: true })));
    logger.info("cors.enable");
  }
  app.use(helmet());
  app.use(httpLogger);
  // @see: https://github.com/expressjs/morgan
  app.use(morgan(options.env === "development" ? "dev" : "combined"));
  app.use(bodyParser() as any);
  app.use(
    staticServer("/static", {
      // tslint:disable-next-line
      maxAge: 365 * 24 * 60 * 60,
    }) as any
  );
  // app.use(swStats.getMiddleware({}))
}
