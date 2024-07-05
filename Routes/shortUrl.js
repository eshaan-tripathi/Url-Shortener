const express = require('express');
const router = express.Router();
const Url = require('../Models/url'); // Ensure correct path

router.get('/', async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        const url = await Url.findOne({ shortUrl: shortUrl });
        
        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).render('error', { error: 'URL not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).render('error', { error: 'Server error' });
    }
});

module.exports = router;
