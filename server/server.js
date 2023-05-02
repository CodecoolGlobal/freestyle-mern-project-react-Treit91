const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.listen(3001)

mongoose.connect("mongodb+srv://treit91:S4e12ipFD5hG18qa@cluster0.zjzcwnl.mongodb.net/test")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    next();
});

app.use(express.json());