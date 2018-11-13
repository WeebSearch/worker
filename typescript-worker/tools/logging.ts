import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

// @ts-ignore
const fileTransport = new (transports.DailyRotateFile)({
  format: format.combine(
    format.label({ label: "worker" }),
    format.timestamp({
      format: "HH-MM:ss YYYY-MM-DD"
    }),
  ),
  json: true,
  filename: "log/%DATE%.log",
  datePattern: "YYYY--MM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d"
});

const logFormat = format.combine(
  format.label({ label: "worker" }),
  format.timestamp({
    format: 'HH-MM:ss YYYY-MM-DD'
  }),
  format.prettyPrint(),
  format.colorize(),
  format.align(),
  format.printf(info => {
    return `[${info.timestamp}] [${info.label}]@[${info.level}]: ${info.message}`;
  })
);

const consoleTransport = new transports.Console({
  format: logFormat,
  // level: process.env.LOG_LEVEL || "info"
  level: "info"
});

export const logger = createLogger({
  // format: logFormat,
  transports: [
    consoleTransport,
    fileTransport
  ],

});

fileTransport.on("rotate", (past, present) =>
  logger.info(`File rotated from "${past}" to "${present}"`)
);
