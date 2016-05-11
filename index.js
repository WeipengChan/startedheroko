var express = require('express');
var app = express();
var  wechat = require('node-wechat')('mytoken');


app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.all('/wechat', function (req, res, next) {
  wechat.checkSignature(req, res);

  next(); // pass control to the next handler
});

app.get('/wechat', function(request, response) 
{
//检验 token
  console.log('Node app is running on wechat');
  wechat.checkSignature(request, response);
});

app.post('/wechat', function(request, response) {
//检验 token
  wechat.checkSignature(request, response);

    wechat.handler(request, response);

 //监听文本信息
  wechat.text(function (data) {

    //console.log(data.ToUserName);
    //console.log(data.FromUserName);
    //console.log(data.CreateTime);
    //console.log(data.MsgType);
    //...

    var msg = {
      FromUserName : data.ToUserName,
      ToUserName : data.FromUserName,
      //MsgType : "music",
      Title : "宋冬野",
      Description : "宋冬野——摩登天空7",
      MusicUrl : "http://zhangmenshiting.baidu.com/data2/music/71272862/44897031226800128.mp3?xcode=8c25fcb0e8157c1d4ee014e7c541cba8c3b34145ef4199ad",
      //HQMusicUrl : "http://zhangmenshiting.baidu.com/data2/music/71272862/44897031226800128.mp3?xcode=8c25fcb0e8157c1d4ee014e7c541cba8c3b34145ef4199ad",
      //FuncFlag : 0
    }

    //回复信息
    wechat.send(msg);
  });


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


