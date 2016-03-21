var input = [{
    "user": {
        "hash_id": "d965f32a168564f9e58ad3a48a1585a4",
        "followeeAmount": 91,
        "followerAmount": 370,
        "name": "Stark伟"
    },
    "sameFriends": []
}, {
    "user": {
        "hash_id": "4408b66aa5134567ad5591528d214c49",
        "followeeAmount": 85,
        "followerAmount": 50,
        "name": "张凌祺"
    },
    "sameFriends": [{
        "hash_id": "aed1cb0287a43c8aaa493cad5951b9e0",
        "name": "符植煜",
        "url": "https://www.zhihu.com/people/fu-zhi-yu-76"
    }]
}, {
    "user": {
        "hash_id": "5d620c9af458e02062bdd4bf8ea11db2",
        "followeeAmount": 15,
        "followerAmount": 4,
        "name": "谢箴"
    },
    "sameFriends": [{
        "hash_id": "aed1cb0287a43c8aaa493cad5951b9e0",
        "name": "符植煜",
        "url": "https://www.zhihu.com/people/fu-zhi-yu-76"
    }]
}, {
    "user": {
        "hash_id": "aed1cb0287a43c8aaa493cad5951b9e0",
        "followeeAmount": 194,
        "followerAmount": 158,
        "name": "符植煜"
    },
    "sameFriends": [{
        "hash_id": "4408b66aa5134567ad5591528d214c49",
        "name": "张凌祺",
        "url": "https://www.zhihu.com/people/zhang-ling-qi-64"
    }, {
        "hash_id": "5d620c9af458e02062bdd4bf8ea11db2",
        "name": "谢箴",
        "url": "https://www.zhihu.com/people/xie-zhen-94"
    }]
}]

function echartParser(input) {
    console.log(input);
    var hash_id_to_common_id = {}
    input.forEach(function(item, index) {
        if (item.user.hash_id) {
            hash_id_to_common_id[item.user.hash_id] = index + 1;
            console.log(item.user.hash_id, index + 1, item);
        }
    });
    var data = [];
    data.push({
        "id": 0,
        "name": "我",
        "symbolSize": 20, //item.user.followerAmount,
        "label": {
            "normal": { "show": true }
        }
    })
    input.forEach(function(item, index) {
        if (item.user.hash_id) {
            data.push({
                "id": hash_id_to_common_id[item.user.hash_id],
                "name": item.user.name,
                "symbolSize": 10, //item.user.followerAmount,
                "label": {
                    "normal": { "show": true }
                },
                draggable: true
            })
        }
    });

    var links = [];
    input.forEach(function(item) {
        if (item.user.hash_id) {
            links.push({
                source: 0,
                target: hash_id_to_common_id[item.user.hash_id]
            })
            item.sameFriends.forEach(function(item2) {
                links.push({
                    source: hash_id_to_common_id[item.user.hash_id],
                    target: hash_id_to_common_id[item2.hash_id]
                })
            })
        }
    });
    console.log("data:" + data);
    return {
        data: data,
        links: links
    }
}

module.exports = echartParser;
