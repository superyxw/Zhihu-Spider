var Spider = require('./Spider');
var gexf = require('gexf');

Spider('https://www.zhihu.com/people/xu-xin-yu-17')
    .then(function(result) {
        console.log(result);
    })

