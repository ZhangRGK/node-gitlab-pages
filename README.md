# node-gitlab-pages

基于gitlab-api,nodegit,markdown-js的类github-pages应用。

## 依赖

[express](http://expressjs.jser.us/)

[jade](http://expressjs.jser.us/jade.html)

[gitlab-api](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api)

[markdown-js](https://github.com/evilstreak/markdown-js)

**bcrypt**

## 安装(ubuntu)

    npm install

## gitlab-webhook

在gitlab中配置 push events : `http://ip:8081/hooks/doc[| proto]`

## 文档


## TODO

- web hooks(待测试)
- 登录后写入cookies保持登录状态(待测试)
- 登出按钮(待测试)
- project 页面手机展示
- 修改ui与gitlab相近
- 检索功能