var express = require('express');
var app = express()
var routes = require('./routes');

app.use(express.favicon());
app.use(express.static( __dirname + '/templates' ));
app.use(express.logger());
app.use(express.json());
app.use(express.bodyParser());

app.get('/search_string', routes.tweets);



app.listen(8888);
