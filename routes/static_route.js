const URL = require("../models/url_model");
const express = require("express");
const router = require("./url_route");

const app = express.Router();

router.get("/signup",(req,res) => {
    return res.render("signup")
});

module.exports = router ;