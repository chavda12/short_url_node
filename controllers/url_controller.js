const shortid = require("shortid");
const URL = require('../models/url_model')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    console.log(body['redirectURL']);
    if (!body['redirectURL']) return res.status(400).json({ error: "Url is required" });
    const shortID = shortid();
    await URL.create({ shortId: shortID, redirectUrl:body['redirectURL'], visitHistory: [] });
    return res.render('home', {
        id: shortID
    });

}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({

        totalClicks: result.visitHistory.length, analytics: result.visitHistory
    })
}


module.exports = {
    handleGenerateNewShortURL, handleGetAnalytics
}
