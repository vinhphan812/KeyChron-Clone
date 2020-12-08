const express = require("express");
const router = express.Router();
const DataBase = require("../Control/dataBase");

const db = new DataBase();

module.exports = router;
