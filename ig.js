var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var url = "https://coinmarketcap.com/currencies/ignis/";
var app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.get("/", (req, res) => {
	request(url, function(error, response, body) {  
		if (error) {
			console.log(error);
			//throw error;
		}

		var $ = cheerio.load(body, {
		    decodeEntities: false
		});

		//quote_price
		var ignisPrice = $(`div.col-xs-6.col-sm-8.col-md-4.text-left`);
		var ig = [];

		ignisPrice.each(function() {
		  ig.push($(this).find("span#quote_price").children("span.text-large2").text())
		  ig.push($(this).find("span.text-gray.details-text-medium").eq(0).text())
		  //or .first()
	    });

	    res.send(ig);
		
	})
});

app.listen(3000);