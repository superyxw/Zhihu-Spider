var Spider = require('./Spider');
var getUserHashID = require('./getUserHashID');
var Promise = require('bluebird');
getUserHashID('https://www.zhihu.com/people/avit4799')
    .then(function(hashID){
        return getFriends(hashID);
    }).then(function(myFriends){
        //console.log(myFriends);

        return searchSameFriend('fc3d841ce5b084b7550c0cc85364c448', myFriends)
    }).then(function(result){
        console.log(result);
    })

function getFriends(hashID) {
    var works = [Spider().request({
        followees: true,
        hash_id: hashID
    }), Spider().request({
        hash_id: hashID
    })];
    return Promise.all(works).then(function(result) {
        console.log("fetch success!!!");
        var followees = result[0].data;
        var followers = result[1].data;
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

function searchSameFriend(targetHashID, myFriends){
    return getFriends(targetHashID).then(function(targetFriends){
        var sameFriends = [];
        targetFriends.forEach(function(targetFriend){
            myFriends.forEach(function(myFriend){
                if(targetFriend.hash_id === myFriend.hash_id){
                    sameFriends.push(targetFriend);
                }
            })
        })
        return sameFriends;
    })
}
