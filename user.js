module.exports = function(request){
  var res = request('GET', 'http://27.102.204.83/coindori/BotUserInfo.php');
  return JSON.parse(res.getBody('utf8')); 
}
