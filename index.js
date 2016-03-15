var Spider = require('./Spider');
var getUserHashID = require('./getUserHashID');
var Promise = require('bluebird');
getUserHashID('https://www.zhihu.com/people/avit4799')
    .then(function(hashID) {
        var works = [Spider().request({
            followees: true,
            hash_id: hashID
        }), Spider().request({
            hash_id: hashID
        })];
        return Promise.all(works);
    })
    .then(function(result) {
        console.log("fetch success!!!");
        var followees = result[0].data;
        var followers = result[1].data;
        var friends = [];
        followers.forEach(function(follower, index) {
            followees.forEach(function(followee, index) {
                if (follower.hash_id === followee.hash_id) {
                    friends.push(follower);
                }
            });
        });
        console.log(friends);
    });
