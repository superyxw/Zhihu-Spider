var fetchFollwerOrFollwee = require('./fetchFollwerOrFollwee');
var getUser = require('./getUser');
var Promise = require('bluebird');

module.exports = Spider;

function Spider(userPageUrl) {
    //getUser('https://www.zhihu.com/people/xu-xin-yu-17')
    return getUser(userPageUrl)
        .then(function(user) {
            return getFriends(user);
        })
        .then(function(myFriends) {
            //return searchSameFriend(myFriends[20], myFriends)
            return Promise.map(myFriends, function(myFriend) {
                return getUser(myFriend.url);
            }, { concurrency: 3 });
        })
        .then(function(myFriends) {
            console.log(myFriends);
            return Promise.map(myFriends, function(myFriend) {
                return searchSameFriend(myFriend, myFriends);
            }, { concurrency: 2 });
        })
        // .then(function(result){
        //     result.forEach(function(item, index){
        //         item.id = index;
        //     })
        //     return result;
        // })
        .catch(function(err) {
            console.log(err);
        })
}



function getFriends(user) {
    var works = [fetchFollwerOrFollwee({
        isFollowees: true,
        user: user
    }), fetchFollwerOrFollwee({
        user: user
    })];
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

function searchSameFriend(aFriend, myFriends) {
    console.log("searchSameFriend with " + aFriend.name + "......");
    return getFriends(aFriend)
        .then(function(targetFriends) {
            var sameFriends = [];
            targetFriends.forEach(function(targetFriend) {
                myFriends.forEach(function(myFriend) {
                    if (targetFriend.hash_id === myFriend.hash_id) {
                        sameFriends.push(targetFriend);
                    }
                })
            })
            console.log("\n\n==============\n Same Friends with " + aFriend.name + "\n");
            console.log(sameFriends);
            console.log("\n\n");

            return {
                user: aFriend,
                sameFriends: sameFriends
            };
        })
}
