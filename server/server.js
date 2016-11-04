var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var contacts = require('./routes/contact');
var products = require('./routes/product');
var quotes = require('./routes/quote');
var mfr = require('./routes/manufacturer');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/contact', contacts);
app.use('/product', products);
app.use('/quote', quotes);
app.use('/manufacturer', mfr);



console.log("listening on port 3000");
app.listen(3000);