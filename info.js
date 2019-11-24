var express = require("express");
var request = require("request");
var syncReq = require("sync-request");
var users = require('./user')(syncReq);
// var url = "http://27.102.206.42/coin/botWallet.txt";
var url = "http://27.102.206.17/coin/botWallet.txt";
var app = express();

console.log(users.data.length);
var shareObj = users.data;

class Share {
	static create(name, base){
		return this.instances.push(new Share(name, base));
	}
	static cal(){
		for(let instance of this.instances){
			//console.log(instance, this.total);
			instance.share = instance.base/this.total;
		}
	}
	constructor(name, base){
		this.name = name;
		this.base = base;
		this.share;
	}
}
Share.total = shareObj.reduce((preV, curV, curIdx, array) => {
	return preV + Number(curV.base);
}, 0);
Share.instances = [];

shareObj.forEach(function(data){
	Share.create(data.name, data.base);
});
Share.cal();


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
	request(url, function(error, response, body) {  
		var content = body.split("\n");
		var startKRW = parseInt(content[1].split("=")[1]);
	  	var totalKRW = parseInt(content[2].split("=")[1]);
	  	var serviceKRW = parseInt(content[3].split("=")[1]);
		var useKRW = parseInt(content[4].split("=")[1]);
		var profitKRW = totalKRW - startKRW;
		var profitPercent = (((totalKRW / startKRW) - 1) * 100).toFixed(4);
		var fees = parseInt(profitKRW * 0.2);
		var realProfit = parseInt(profitKRW * 0.8);
		var realProfitPercent = ((( (totalKRW - fees) / startKRW) - 1) * 100).toFixed(4);
		var mine = 7.218/100 * startKRW;
		var start = parseInt(startKRW * 0.07218);
		var result = parseInt(start * (((profitPercent < 3.0 ? profitPercent : realProfitPercent)/100) + 1));

		if (error) throw error;
		  var krwInfo = {
		  	startKRW: startKRW,
		  	totalKRW: totalKRW,
		  	serviceKRW: serviceKRW,
			useKRW: useKRW,
			profitKRW: profitKRW,
			profitPercent: profitPercent,
			fees: profitPercent < 3.0 ? 0 : fees,
			realProfit: profitPercent < 3.0 ? profitKRW : realProfit,
			realProfitPercent: profitPercent < 3.0 ? profitPercent : realProfitPercent,
			BTC: parseFloat(content[6].split("=")[1].split("KRW")[0].split("-")[1]),
			ETH: parseFloat(content[7].split("=")[1].split("KRW")[0].split("-")[1]),
			BCH: parseFloat(content[8].split("=")[1].split("KRW")[0].split("-")[1]),
			DASH: parseFloat(content[9].split("=")[1].split("KRW")[0].split("-")[1]),
			ETC: parseFloat(content[10].split("=")[1].split("KRW")[0].split("-")[1]),
			LTC: parseFloat(content[11].split("=")[1].split("KRW")[0].split("-")[1]),
			QTUM: parseFloat(content[12].split("=")[1].split("KRW")[0].split("-")[1]),
			XMR: parseFloat(content[13].split("=")[1].split("KRW")[0].split("-")[1]),
			ZEC: parseFloat(content[14].split("=")[1].split("KRW")[0].split("-")[1]),
			EOS: parseFloat(content[15].split("=")[1].split("KRW")[0].split("-")[1]),
			BTC_VOL: parseFloat(content[6].split("=")[1].split("KRW")[1].split("-")[1]),
			ETH_VOL: parseFloat(content[7].split("=")[1].split("KRW")[1].split("-")[1]),
			BCH_VOL: parseFloat(content[8].split("=")[1].split("KRW")[1].split("-")[1]),
			DASH_VOL: parseFloat(content[9].split("=")[1].split("KRW")[1].split("-")[1]),
			ETC_VOL: parseFloat(content[10].split("=")[1].split("KRW")[1].split("-")[1]),
			LTC_VOL: parseFloat(content[11].split("=")[1].split("KRW")[1].split("-")[1]),
			QTUM_VOL: parseFloat(content[12].split("=")[1].split("KRW")[1].split("-")[1]),
			XMR_VOL: parseFloat(content[13].split("=")[1].split("KRW")[1].split("-")[1]),
			ZEC_VOL: parseFloat(content[14].split("=")[1].split("KRW")[1].split("-")[1]),
			EOS_VOL: parseFloat(content[15].split("=")[1].split("KRW")[1].split("-")[1]),
			//body: body
			objective: (realProfitPercent/5 * 100).toFixed(4) + "%",
			objective2: ((realProfitPercent/((20000000/mine-1)*100)) * 100).toFixed(4) + "%",
			start: numberWithCommas(start),
			current: numberWithCommas(result),
			myProfit: numberWithCommas(result - start),
			buyAmount: numberWithCommas(sum()),
			share: Share.instances,
		  }

		res.json(krwInfo);

		function sum(){
			var s = 0;
			for(var i=6; i<16; i++){
				s += parseFloat(content[i].split("=")[1].split("KRW")[0].split("-")[1]);
				//console.log(s);
			}
			return parseInt(s);
		}

		function numberWithCommas(x) {
			if(x > 0){
		    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    }else{
		    	return "-" + Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    }
		}
	});
});

app.listen(3333, () => {console.log("getInfo");});