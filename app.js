const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
    res.status(200).send();
});

app.get("/200", (req, res, next) => {
    res.status(200).send();
});

app.get("/400", (req, res, next) => {
    res.status(400).send();
});

app.get("/500", (req, res, next) => {
    res.status(500).send();
});

app.listen(3000);
