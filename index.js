var Spider = require('./Spider');
Spider().request({
    followees: true,
    hash_id: 'd965f32a168564f9e58ad3a48a1585a4'
}).then(function(result) {
    console.log("success!!!");
    console.log(result);
})