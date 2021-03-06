/**
 * 入口模块
 */
import sourceMapSupport from "source-map-support";
import * as moment from "moment";
// import "moment/locale/zh-cn";
import "isomorphic-fetch";

sourceMapSupport.install();

// require("isomorphic-fetch");

// import * as Bluebird from "bluebird";
// global.Promise = Bluebird;

// import * as moment from "moment";
// import "moment/locale/zh-cn";

import main from "./main";
import config from "./constant/env.constant";

moment.locale("zh-cn");

main(config);
