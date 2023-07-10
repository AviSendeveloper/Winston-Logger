# Winstone-Logger
Log error and request in console and as well as save on files

----------------------------

### app.js

```js
const express = require("express");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
...
const logger = require("./logger");

// For response logger
app.use(
    expressWinston.logger({
        winstonInstance: logger.routeLoger,
        statusLevels: true,
    })
);

// All Routes
...

// Error logger
app.use(
    expressWinston.errorLogger({
        winstonInstance: logger.internalErrorLoger,
    })
);

app.listen(3000);
```

## logger.js

> Config for winston

```js
const { createLogger, transports, format } = require("winston");
require("winston-daily-rotate-file");

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/rotate-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
});

const winstonRouteLogger = createLogger({
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

const logFormat = format.printf(({ label, level, timestamp, meta }) => {
    return `${label} ${level} ${timestamp} ${meta.message}`;
});

const winstonInternalErrorLogger = createLogger({
    transports: [
        new transports.File({
            level: "error",
            filename: "log/internalerror.log",
        }),
    ],
    format: format.combine(
        format.label({ label: "[LOGGER]" }),
        format.json(),
        format.timestamp(),
        logFormat
    ),
});

module.exports.routeLoger = winstonRouteLogger;
module.exports.internalErrorLoger = winstonInternalErrorLogger;
```
