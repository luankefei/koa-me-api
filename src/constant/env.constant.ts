import * as path from "path";
import { EnvMode, EnvNodeEnv } from "../interface";

const NODE_ENV = process.env.NODE_ENV !== "production" ? "development" : "production";
const MODE = process.env.MODE === "dev" ? "dev" : "prod";
const DEBUG = MODE !== "prod";

export default {
  root: path.resolve("../"),
  env: NODE_ENV as EnvNodeEnv,
  mode: MODE as EnvMode,
  debug: DEBUG,
  port: parseInt(process.env.PORT || "", 10) || 8371,
  route: {
    prefix: "/api/m/node",
    articleH5Path: "/article/h5",
    wxH5Path: "/wx/h5",
    canvasApi: "/canvas",
    aliyun: "/oss",
  },
};
