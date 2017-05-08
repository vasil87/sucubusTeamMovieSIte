var express = require('express'),
    bodyParser = require('body-parser'),
    low = require('lowdb');

var app = express();

app.use(bodyParser.json());
app.use(express.static('./'));

var port = process.env.PORT || 3013;

app.listen(port, function() {});