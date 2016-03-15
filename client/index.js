var echarts = require('echarts');
var $ = require('jquery');
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表

$.get('/test', function(data) {
    console.log(data);
    option = {
        title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: data.data,
            links: data.links,
            roam: true,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}'
                }
            },
        }]
    };
    myChart.setOption(option);
})
