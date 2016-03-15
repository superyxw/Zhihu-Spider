var Spider = require('./Spider');
var express = require('express');
var echartParser = require('./echartParser');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser());
app.use('/js', express.static('./client'));
app.use('/css', express.static('./client'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/test', function(req, res) {
    Spider('https://www.zhihu.com/people/starkwei')
        .then(function(result) {
            var data = echartParser(result);
            console.log(data);
            res.send(data);
        })
});

app.listen(3000);
