const express = require('express');
const app = express();
const { connectToMongoDB } = require('./connect')
const PORT = 8001;
const urlRoute = require('./routes/url_route');
const path = require('path')
const userRoute = require("./routes/user_route");
const staticRoute = require("./routes/static_route");
const URL = require("./models/url_model");
const { url } = require('inspector');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("mongodb connect"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/test",async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home',{
       urls:  allUrls
    }); 
})

app.use('/url', urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute)


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    });
});

app.listen(PORT, () => console.log('Server Started at PORT '))