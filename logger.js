const { createLogger, transports, format } = require("winston");

const winstonLogger = createLogger({
    transports: [
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
