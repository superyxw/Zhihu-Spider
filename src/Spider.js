var fetchFollwerOrFollwee = require('./fetchFollwerOrFollwee');
var getUser = require('./getUser');
var Promise = require('bluebird');
var config = require('../config');
module.exports = Spider;

function Spider(userPageUrl, socket) {
    socket.emit('notice', '抓取用户信息......');
    return getUser(userPageUrl)
        .then(function(user) {
            socket.emit('notice', '抓取用户信息成功');
            socket.emit('get user', user);
            return getFriends(user, socket);
        })
        .then(function(myFriends) {
            return Promise.map(myFriends, function(myFriend) {
                return getUser(myFriend.url);
            }, { concurrency: config.concurrency ? config.concurrency : 3 });
        })
        .then(function(myFriends) {
            var input = [];
            myFriends.forEach(function(friend) {
                input.push({
                    "user": friend,
                    "sameFriends": []
                })
            });
            socket.emit('data', input);

            console.log(myFriends);
            return Promise.map(myFriends, function(myFriend) {
                return searchSameFriend(myFriend, myFriends, socket);
            }, { concurrency: config.concurrency ? config.concurrency : 3 });
        })
        .then(function(result) {
            var data = result;
            socket.emit('data', data);

        })
        .catch(function(err) {
            console.log(err);
        })
}



function getFriends(user, socket) {
    var works = [fetchFollwerOrFollwee({
        isFollowees: true,
        user: user
    }, socket), fetchFollwerOrFollwee({
        user: user
    }, socket)];
    return Promise.all(works).then(function(result) {
        var followees = result[0];
        var followers = result[1];
        var friends = [];
        followers.forEach(function(follower) {
            followees.forEach(function(followee) {
                if (follower.hash_id === followee.hash_id) {
                    friends.push(follower);
                }
            });
        });
        return friends;
    });
}

function searchSameFriend(aFriend, myFriends, socket) {
    socket.emit("notice", "searchSameFriend with " + aFriend.name + "......");
    console.log("searchSameFriend with " + aFriend.name + "......");
    return getFriends(aFriend, socket)
        .then(function(targetFriends) {
            var sameFriends = [];
            console.log('counting for ' + aFriend.name + '......')
            targetFriends.forEach(function(targetFriend) {
                myFriends.forEach(function(myFriend) {
                    if (targetFriend.hash_id === myFriend.hash_id) {
                        sameFriends.push(targetFriend);
                    }
                })
            })
            console.log("\n\n==============\n Same Friends with " + aFriend.name + "\n");
            socket.emit('same friend', {
                hash_id: aFriend.hash_id,
                sameFriends: sameFriends
            })
            console.log(sameFriends);
            console.log("\n\n");

            return {
                user: aFriend,
                sameFriends: sameFriends
            };
        })
}