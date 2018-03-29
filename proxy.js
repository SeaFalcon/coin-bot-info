var proxy = require('express-http-proxy');
var app = require('express')();
var url = 'http://27.102.204.83/';

app.use('/proxy', proxy(url));
app.listen(8000)