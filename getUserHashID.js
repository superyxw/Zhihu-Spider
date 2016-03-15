var request = require('request');
var Promise = require('bluebird');

function getUserHashID(userPageUrl) {
    return new Promise(function(resolve, reject) {
        request({
            method: 'GET',
            url: userPageUrl,
            headers: {
                'cookie': '_za=c392e6c0-5bdb-4b01-a06d-84ffb9836a61; _ga=GA1.2.378714859.1433690880; _xsrf=44f011b01f29816fc257fae1770a9ece; q_c1=fb660ee5c15b4c97ae2b4b075373e5b6|1457189679000|1433392648000; udid="AIAAQIMSlAmPTohRXib_bmZtsg_JbPW-tC8=|1457502059"; cap_id="MGE2NDZmOTY3MDY1NDdlZmJiNDk4NjBmOGY2ZjhiMTY=|1457847388|27a0720e2f3c9580f52f982b99a7a34d4d902bee"; z_c0="QUFBQTFuTWRBQUFYQUFBQVlRSlZUWHFKREZjQXItUVVZRkRhV0k0TEpUV182SUp5TlA1UUtBPT0=|1457847418|d5d52a10b95375f90c3c34c1393314cf323aca84"; n_c=1; __utmt=1; __utma=51854390.378714859.1433690880.1457863920.1457863920.1; __utmb=51854390.12.9.1457864042502; __utmc=51854390; __utmz=51854390.1457863920.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100-1|2=registration_date=20130824=1^3=entry_date=20130824=1',
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