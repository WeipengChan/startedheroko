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

app.get('/wechat', function(request, response) {
//检验 token
  console.log('Node app is running on wechat');

  wechat.checkSignature(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


