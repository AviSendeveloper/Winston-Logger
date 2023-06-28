const { createLogger, transports, format } = require("winston");
require("winston-daily-rotate-file");

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/rotate-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
});

const winstonLogger = createLogger({
    transports: [
        fileRotateTransport,
        new transports.Console(),
        new transports.File({
            // all/info
            filename: "log/all.log",
        }),
        new transports.File({
            level: "warn",
            filename: "log/warning.log",
        }),
        new transports.File({
            level: "error",
            filename: "log/error.log",
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
});

module.exports = winstonLogger;
