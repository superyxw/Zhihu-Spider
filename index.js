var Spider = require('./Spider');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('fetch start', function(data) {
        Spider(data.url, socket);
    });
});
server.listen(3001);


app.use(bodyParser());
app.use('/js', express.static('./client/build'));
app.use('/css', express.static('./client/build'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

var appinfo = app.listen(3000,function(){
	console.log('server start at :%s',appinfo.address().port)
});
