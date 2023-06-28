const express = require("express");
const expressWinston = require("express-winston");
// const { transports } = require("express-winston");
const { transports, format } = require("winston");

const app = express();

// winston
app.use(
    expressWinston.logger({
        transports: [
            new transports.Console(),
            new transports.File({
                // all/info
                filename: "log/all.log",
            }),
            new transports.File({
                level: 'warn',
                filename: "log/warning.log",
            }),
            new transports.File({
                level: 'error',
                filename: "log/error.log",
            }),
        ],
        format: format.combine(
            format.json(),
            format.timestamp(),
            format.prettyPrint()
        ),
        statusLevels: true
    })
);

// Routes
app.get("/", (req, res, next) => {
    res.status(200).send();
});

app.get("/200", (req, res, next) => {
    res.status(200).send();
});

app.get("/400", (req, res, next) => {
    res.status(400).send();
});

app.get("/403", (req, res, next) => {
    res.status(403).send();
});

app.get("/500", (req, res, next) => {
    res.status(500).send();
});

app.listen(3000);
