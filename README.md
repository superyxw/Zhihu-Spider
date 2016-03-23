#知乎关系网爬虫

![DEMO](https://github.com/starkwang/Spider/blob/master/demo.png?raw=true)

------
#使用方法
```
git clone https://github.com/starkwang/Spider.git && cd Spider

npm install

node index.js // Server runs at localhost:3000
```
------
#配置
`config.js`中需填入自己在知乎上的cookie与_xsrf

###具体配置方法

打开知乎任意用户的关注者页，例如[https://www.zhihu.com/people/starkwei/followers](https://www.zhihu.com/people/starkwei/followers)

打开浏览器控制台，选择Network：

下拉页面，会自动加载更多关注者，可以看到对`/node/ProfileFollowersListV2`这个接口发起了多次请求：

打开请求详情，Cookie和_xsrf就在里面：



