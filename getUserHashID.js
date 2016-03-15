var request = require('request');
var Promise = require('bluebird');
var config = require('./config');

function getUserHashID(userPageUrl) {
    return new Promise(function(resolve, reject) {
        request({
            method: 'GET',
            url: userPageUrl,
            headers: {
                'cookie': config.cookie
            }
        }, function(err, res, body) {
            if (err) {
                reject(err);
            } else {
                resolve(parseHashID(body));
            }
        })
    });
}

function parseHashID(html) {
    var reg = /data-name=\"current_people\">\[.*\"(\S*)\"\]<\/script>/g;
    reg.exec(html);
    return RegExp.$1;
}

module.exports = getUserHashID;
