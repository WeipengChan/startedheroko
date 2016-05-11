var express = require('express');
var app = express();
var wechat = require('wechat');

app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

var config = {
 token: 'mytoken',
 appid: 'wx84997a56559d622d',
 encodingAESKey: 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG'
};

app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上


  var message = req.weixin;
  if (message.MsgType === 'event') 
  {
     res.reply('欢迎您关注陈小鹏的公众号');
     return;
  };

  if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


