// Stock Market Portfolio App By CSY

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// use body parser middlware
app.use(bodyParser.urlencoded({extended: false}));


// API KEY pk_edc1793fe80145f4bede334f26018d10 
// Create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_edc1793fe80145f4bede334f26018d10', { json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
        console.log(body);
    if (res.statusCode===200) {
        //console.log(body);
        finishedAPI(body);
    }
});

};

// Set Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherstuff = 'Hello, I am feeling guuuud today';

// Set Handlebar index GET routes
app.get('/', function(req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        });
    }, 'fb');
});

// Set Handlebar index POST routes
app.post('/', function(req, res) {
    call_api(function(doneAPI) {
            // posted_stuff = req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI,

        });
    }, req.body.stock_ticker);
});

// create about page route
app.get('/about.html', function(req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, '.../public')));
app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));
