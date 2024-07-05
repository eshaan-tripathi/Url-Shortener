const express = require('express');
const app = express();
const connect = require('./connect');
const bodyParser = require('body-parser');
const urlgenerate = require('./Routes/urlgenerate');
const shortUrl = require('./Routes/shortUrl');
const path = require('path');

require('dotenv').config();
connect(process.env.MONGODB_URI);

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Middleware
app.use(express.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.use('/urlgenerate', urlgenerate); 
app.use('/:shortUrl', shortUrl); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
