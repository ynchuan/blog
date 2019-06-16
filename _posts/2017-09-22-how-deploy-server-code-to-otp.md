---
layout: post
title: 利用fis3将服务端代码部署到测试机器上
category: 开发工具
author: ynchuan
---
# 服务端代码部署到otp方法

## 利用fis3

- 安装对应版本node  [下载](https://nodejs.org/en/download/)
- 行安装fis3  打开item2，执行命令：`npm install fis3 -g`
- 安装fis3-deploy插件 执行命令： `npm install fis3-deploy-http-push -g`
- 在项目根目录创建fis-conf.js文件，并复制以下代码到fis-conf.js

```javascript 
    fis.match('./*/*.php', {
        deploy: fis.plugin('http-push', {
            receiver: 'http://xunxun.video.otp.baidu.com/receiver.php',
            to: '/home/work/orp/test'
        })
    });
    ps: ./*/*.php表示上传的文件,receiver表示接受服务，需要换成你的otp环境；to表示文件上传后存储到的目录，即覆盖文件的目录
```

- otp机器上传文件receiver.php到/home/work/orp/webroot目录下，receiver.php获取地址(复制文本保存到otp即可)[查看](https://github.com/ustbhuangyi/receiver.php/blob/master/receiver.php), 测试是否可以访问到：http://xunxun.video.otp.baidu.com/receiver.php 显示‘I'm ready for that, you know.’，说明接受代码部署成功。
- 发送文件  命令行进入文件fis-conf.js所在目录，执行 `fis3 release `，完成发送，也可以添加-w参数，监控文件随改随发，其他配置可以参见[fis3文档](http://fis.baidu.com/fis3/docs/api/config-commonly-used.html)

## 利用git

- 登录otp环境[配置git](http://wiki.baidu.com/pages/viewpage.action?pageId=190527017)
- otp环境创建目录workspace, `cd workspace  git clone icode 代码`
- 本地或者开发机开发完成后提交icode，登录otp，git pull 你的分支
- cp /home/work/workspace/你的修改目录或文件   /home/work/orp/webroot/希望替换目录或文件

## 总结

利用git或者fis3都会由于otp环境的过期而重新申请机器并部署一些文件，相对来说fis3只需要部署receiver.php，所以推荐使用fis3