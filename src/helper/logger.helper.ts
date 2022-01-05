import * as winston from "winston";

import { formatDate } from "./format.helper";
import config from "../constant/env.constant";

const DailyRotateFile = require("winston-daily-rotate-file");

function timestamp() {
  const { yyyy, m, d, h, mm, s } = formatDate(new Date());

  return `${yyyy}-${m}-${d} ${h}:${mm}:${s}`;
}

const fileOpt = {
  // @see https://github.com/winstonjs/winston/blob/master/docs/transports.md
  json: false,
  maxsize: "50m",
  maxFiles: "7d",
  // timestamp,
  // formatter: (options: any) =>
  //   `[${options.level.toUpperCase()}]${options.timestamp()} PID-${
  //     process.pid
  //   } ${options.message}`
};

let logger: winston.Logger;

export default function getLogger() {
  if (!logger) {
    logger = winston.createLogger({
      level: config.debug ? "debug" : "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: timestamp() }),
        winston.format.printf((options) => {
          return `[${options.level}] ${options.timestamp} [PID:${process.pid}] ${options.message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          name: "app",
          filename: "./logs/app.log",
          datePattern: "YYYY-MM-DD",
          handleExceptions: true,
          ...fileOpt,
        }),
      ],
    });
  }

  return logger;
}
