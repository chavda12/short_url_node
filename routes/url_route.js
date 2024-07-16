const express = require ('express');
const {handleGenerateNewShortURL,handleGetAnalytics} = require('../controllers/url_controller')
const router = express.Router();

router.post('/',handleGenerateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;