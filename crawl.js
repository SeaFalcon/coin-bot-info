var express = require("express");
var request = require("request");  
//var url = "http://27.102.206.42/coin/botWallet.txt";
var url = "http://27.102.206.17/coin/botWallet.txt";
var app = express();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
 
/*var allowCORS = function(req, res, next) {
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  (req.method === 'OPTIONS') ?
    res.send(200) :
    next();
};
app.use(allowCORS);*/

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

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
		  startKRW = parseInt(body.slice(20, 29));
		  totalKRW = parseInt(body.slice(42, 52)); //70005686; //74812046; 

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
								<!--<br><br><span style="font-size: 50;">수익률 색상</span><br>
								<span style="font-size: 50; color: #1e88e5">+ 1 ~ 5%</span><br>
								<span style="font-size: 50; color: #1976d2">+ 6 ~ 11%</span><br>
								<span style="font-size: 50; color: #1565c0">+ 11 ~ 21%</span><br>
								<span style="font-size: 50; color: #0d47a1">+ 21%~</span><br>
								<span style="font-size: 50; color: #e53935">&nbsp;- 0%~</span><br>
								<br><br>-->
								<p style="font-size: 30;">
									<br>＆12.26 입출금관련 공지사항
<br> - 매주 목요일 봇 정산시 지분 재산정
<br> - 입금시 리플로 입금 원칙 고수(입금완료시 즉시 판매하여 원화로 지분 반영)
<br> - 매주 추가 입금 최소 100만원 ~ 1500만원
<br> - 출금시엔 모든 원화 출금 가능(출금 단위 최소 10만원)
<br>   -> 지분을 남길경우 최소 100만원 지분 보유 or 전액 출금
<br> - 입금 신청자 최종 입금 완료 시 그 이후 봇 가동
<br> - 입금 및 출금 신청시간 준수
<br> - 건의사항은 단톡방 문의 및 알고계신 번호로 문의
<br>※ 입금 지갑주소는 문자&이메일로 목요일 PM5:00 ~ PM7:00에 알려 드립니다. ※
<br>
<br>
<br>＆입금 및 출금
<br> - 신청시간 : 매주 수요일 ~ 매주 목요일 오후 2시
<br> - 일시 : 매주 목요일 (변동사항 잇을시 사전공지)
<br> - 봇 정산 시간 : PM5:00 ~ PM7:00
<br> 
<br> - 출금
<br>   출금시간 : PM7:00 ~ PM8:00
<br>    
<br> - 입금
<br>   입금시간(신규/추가입금) : PM8:00 ~ PM9:00
<br>
<br>
<br>＆출금양식 (메일문의 : coindori271@gmail.com)
<br>   1. 제목 : [출금신청]
<br>   2. 카톡 닉네임 / 이름
<br>   3. 환급 받을 금액(KRW)
<br>   4. 환급 받을 코인종류 (BTC, ETH, ETC, LTC, XRP, DASH, BCH)
<br>   5. 환급 받을 코인 지갑 주소 (여러번 확인 후 전송 부탁 드립니다.)
<br>
<br>
<br>＆입금양식 (메일문의 : coindori271@gmail.com)
<br>   1. 제목 : [입금신청]
<br>   2. 카톡 닉네임 / 이름
<br>   3. 핸드폰 번호
<br>   4. 입금 예정인 KRW (입금 시간에 맞춰 구매 후 입금)
<br>      -> 인수과정에서 소량의 금액 변동이 있을수 있습니다.
<br>   ※ 입금 완료 후 반드시 거래번호 문자 or E-mail 로 전송 부탁드립니다.
<br>           -> 미전송시 확인이 어렵습니다.
<br>
<br>
<br>＆수수료
<br> - 매주 정산일에 맞춰 20%의 수수료는 공제하여 기말자산을 평가.(차주의 기초자산)
<br> - 정산 시 수익이 3%미만일때는 수수료를 공제하지 않습니다.
<br> - 원금의 손실에 대해서는 책임지지 않습니다.
								</p>
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
	if(parseFloat(profitPercent) >= 0 && 6 > parseFloat(profitPercent)){
  	color = "#1e88e5";
  }else if(parseFloat(profitPercent) >= 6 && 11 > parseFloat(profitPercent)){
  	color = "#1976d2";
  }else if(parseFloat(profitPercent) >= 11 && 21 > parseFloat(profitPercent)){
  	color = "#1565c0";
  }else if(parseFloat(profitPercent) >= 21){
  	color = "#0d47a1";
  // 마이너스 일 때
  }else{
  	color = "#e53935";
  }
  return color;
}