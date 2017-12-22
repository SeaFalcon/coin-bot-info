var express = require("express");
var request = require("request");  
var url = "http://27.102.204.83/coin/botWallet.txt";
var app = express();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

app.get('/', function(req, res){
		//res.sendFile(__dirname + "\\content.html");
		//console.log("유저접속!");

		request(url, function(error, response, body) {  

		var startKRW;
		var totalKRW;
		var profitKRW;
		var profitPercent;
		var fees;
		var realProfit;
		var realProfitPercent;

		var color;

		if (error) throw error;
		  startKRW = parseInt(body.slice(20, 28));
		  totalKRW = parseInt(body.slice(42, 50));

		  profitKRW = totalKRW - startKRW;
		  profitPercent = (((totalKRW / startKRW) - 1) * 100).toFixed(4);
		  fees = parseInt(profitKRW * 0.2);
		  realProfit = parseInt(profitKRW * 0.8);
		  realProfitPercent = ((( (totalKRW - fees) / startKRW) - 1) * 100).toFixed(4);

		  //console.log(`시작금액: ${startKRW} \n현재금액: ${totalKRW} \n수익금  : ${profitKRW} \n수익률  : ${profitPercent}%`);
		  res.send(`<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
		  					<div style="font-size: 50;">
			  					시작금액: ${numberWithCommas(startKRW)}원 <br>
			  				  현재금액: ${numberWithCommas(totalKRW)}원 <br>
			  				  수익금  : ${numberWithCommas(profitKRW)}원 <br>
			  				  <span style="color: ${setColor(profitPercent)}"> 총 수익률  : ${profitPercent}%</span><br>
			  				  수수료  : ${numberWithCommas(fees)}원 <br>
			  					실수익금: <span id="realP">${numberWithCommas(realProfit)}원 </span><br>
			  					<span style="color: ${setColor(realProfitPercent)}"> 실수익률  : ${realProfitPercent}%</span><br>
			  					<span id="mine"></span><br>
			  					<span id="mineP"></span><br>
			  					<span id="mineM"></span>
		  					</div><br>
		  					
		  					<input style="width: 500; height: 80; font-size: 40;" id="don" type="number" placeholder="자신의 지분(%)을 입력하세요">
								<button style="width: 200; height: 80; font-size: 50;" id="btn" type="button">계산</button><br>
								<br><br><span style="font-size: 50;">수익률 색상</span><br>
								<span style="font-size: 50; color: #1e88e5">+ 1 ~ 5%</span><br>
								<span style="font-size: 50; color: #1976d2">+ 6 ~ 11%</span><br>
								<span style="font-size: 50; color: #1565c0">+ 11 ~ 21%</span><br>
								<span style="font-size: 50; color: #0d47a1">+ 21%~</span><br>
								<span style="font-size: 50; color: #e53935">&nbsp;- 0%~</span><br>
								<br><br>
								<span id="medi" style="font-size: 50;"></span><br>
								<span id="rail-btc" style="font-size: 50;"></span><br>


		  					<script type="text/javascript">
		  							//console.log(${(realProfitPercent * 0.01) + 1});
			  						$('#btn').click(function(){
			  							var startTemp = parseInt( (${startKRW} * ($('#don').val() * 0.01) + 1) );
			  							var lastTemp = parseInt(( ${startKRW} * ($('#don').val() * 0.01) + 1) * ${(realProfitPercent * 0.01) + 1} );
			  							console.log(startTemp, lastTemp);
											$('#mine').html("(내)시작금액  : " + numberWithCommas(startTemp) + "원" );
											$('#mineP').html("(내)최종금액  : " + numberWithCommas(lastTemp) + "원" );
											$('#mineM').html("(내)최종수익  : " + numberWithCommas(lastTemp - startTemp) + "원" );
										});

									function numberWithCommas(num){
									    var len, point, str; 
									       
									    num = num + ""; 
									    point = num.length % 3 ;
									    len = num.length; 
									   
									    str = num.substring(0, point); 
									    while (point < len) { 
									        if (str != "") str += ","; 
									        str += num.substring(point, point + 3); 
									        point += 3; 
									    } 
									    return str;
									}

									$.get("https://api.coinrail.co.kr/public/last/order?currency=med-btc", (med) =>{
										$.get("https://api.coinrail.co.kr/public/last/order?currency=btc-krw", (btc) =>{
											console.log(btc.last_price, med.last_price, btc.last_price * med.last_price);
											$('#medi').html("무인도 메디: " + med.last_price + " 사토시 (" + (btc.last_price * med.last_price).toFixed(4)  + "원)")
											$('#rail-btc').html("무인도 비트: " + numberWithCommas(btc.last_price) + " 원")
										});
									});

									/*$.get("http://luka7.net", function(data) {
										console.log(data);
									});*/
									
			  				</script>`);

			});
});

app.listen(1234, function(){ console.log("Server Start") });

function setColor(profitPercent){
	if(parseInt(profitPercent) >= 1 && 6 > parseInt(profitPercent)){
  	color = "#1e88e5";
  }else if(parseInt(profitPercent) >= 6 && 11 > parseInt(profitPercent)){
  	color = "#1976d2";
  }else if(parseInt(profitPercent) >= 11 && 21 > parseInt(profitPercent)){
  	color = "#1565c0";
  }else if(parseInt(profitPercent) >= 21){
  	color = "#0d47a1";
  // 마이너스 일 때
  }else if(parseInt(profitPercent) <= -1){
  	color = "#e53935";
  }
  return color;
}