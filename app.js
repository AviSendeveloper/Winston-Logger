const express = require("express");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
require("dotenv").config();
const logger = require("./logger");

const app = express();
app.use(express.urlencoded({ extended: false }));

// winston for request
app.use(
    expressWinston.logger({
        winstonInstance: logger.routeLoger,
        statusLevels: true,
    })
);

// Routes
app.get("/", (req, res, next) => {
    res.status(200).send();
});

app.post("/200", (req, res, next) => {
    logger.info(res.body);
    res.status(200).send();
});

app.get("/400", (req, res, next) => {
    res.status(400).send();
});

app.get("/403", (req, res, next) => {
    res.status(403).send();
});

app.get("/500", (req, res, next) => {
    logger.error("Custom error log in route");
    res.status(500).send();
});

app.get("/error", (req, res, next) => {
    throw new Error("Custom error");
});

// winston for intetnal error
app.use(
    expressWinston.errorLogger({
        winstonInstance: logger.internalErrorLoger,
    })
);

app.listen(3000);
