var express = require('express');
var path = require('path')
var app = express();

var proxy = require('express-http-proxy');

var urls = {
	coinBotApi: 'http://27.102.204.83/',
	coinMarketCap: 'https://coinmarketcap.com/',
}
app.use('/proxy', proxy(urls.coinBotApi));
app.use('/ignis', proxy(urls.coinMarketCap));


app.get('/', function(req, res){
	res.sendFile(__dirname + "\\content.html");
});

app.listen('5000', () => {console.log("NewInfo");})