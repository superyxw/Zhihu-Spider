var request = require('request');
var Promise = require('bluebird');
var config = require('./config');

var Spider = function() {
    return {
        counter: 0,
        store: [],
        request: function(options) {
            if (!options) {
                var options = {};
            }
            var _this = this;
            return new Promise(function(resolve, reject) {
                request({
                    method: 'POST',
                    url: options.followees ? 'https://www.zhihu.com/node/ProfileFolloweesListV2' : 'https://www.zhihu.com/node/ProfileFollowersListV2',
                    form: {
                        method: "next",
                        params: "{\"offset\":{{counter}},\"order_by\":\"created\",\"hash_id\":\"{{hash_id}}\"}".replace(/{{counter}}/, _this.counter).replace(/{{hash_id}}/, options.hash_id),
                        _xsrf: "44f011b01f29816fc257fae1770a9ece"
                    },
                    headers: {
                        'cookie': config.cookie,
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'cache-control': 'no-cache',
                        'x-requested-with': 'XMLHttpRequest'
                    }
                }, function(err, res, body) {
                    var tmp = JSON.parse(body).msg.map(parseCard);
                    _this.store = _this.store.concat(tmp);
                    console.log(_this.counter + '  complete');
                    if (tmp.length > 0) {
                        _this.counter = _this.counter + 20;
                        resolve(_this.request(options));
                    } else {
                        resolve({
                            data: _this.store
                        });
                    };
                })
            })
        }
    }
}

function parseCard(text) {
    var result = {};
    var re1 = /data-id=\"(\S*)\"/g;
    var re2 = /<h2 class=\"zm-list-content-title\">.*>(.*)<\/a><\/h2>/g
    var re3 = /href=\"(https:\/\/www\.zhihu\.com\/people\/\S*)\"/g;
    re1.exec(text);
    result.hash_id = RegExp.$1;
    re2.exec(text);
    result.name = RegExp.$1;
    re3.exec(text);
    result.url = RegExp.$1;
    return result;
}

function consoleLog(x) {
    console.log(x);
    return x;
}

module.exports = Spider;
