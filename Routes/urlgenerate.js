// Routes/urlgenerate.js
const express = require('express');
const router = express.Router();
const urlConverter = require('../Controllers/url');

router.post('/', async (req, res) => {
    const input = req.body.link;

    try {
        const resp = await urlConverter(input);

        if (resp && resp.shortUrl) {
            res.render('result.ejs', { shortUrl: resp.shortUrl });
        } else {
            res.render('error.ejs', { message: 'Failed to generate short URL.' });
        }
    } catch (error) {
        console.error('Error generating short URL:', error);
        res.render('error.ejs', { message: 'An error occurred while generating short URL.' });
    }
});

module.exports = router;
