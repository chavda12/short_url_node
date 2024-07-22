const URL = require("../models/url_model");
const express = require("express");
const router = require("./url_route");

const app = express.Router();

router.get('/',async (req,res)=>{
    const allurls = await URL.find({})
    return res.render('home', {
        urls: allurls
    });
})

router.get("/signup",(req,res) => {
    return res.render("signup")
});

module.exports = router ;

/* <h1>Hello from Server</h1>
<% urls.forEach(url => { %>
 <li><%= url.shortId  %></li>
<% }) %> */