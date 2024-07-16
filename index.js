const express = require('express');
const app = express();
const { connectToMongoDB } = require('./connect')
const PORT = 8001;
const urlRoute = require('./routes/url_route');
const path = require('path')
const userRoute = require("./routes/user_route");
const staticRoute = require("./routes/static_route");
const URL = require("./models/url_model");

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("mongodb connect"));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
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
    // res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log('Server Started at PORT '))