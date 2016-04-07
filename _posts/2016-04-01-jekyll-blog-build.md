---
layout: post
title: 基于jekyll的blog环境搭建记录
category: CSS开发
author: ynchuan
tags: 
- jekyll 
---

 最近在了解jekyll，知道gitpage使用jekyll搭建个人博客的，所以决定基于jekyll搭建一个博客，将自己的一些知识积累整理到这里，希望能够督促自己常于总结，并将搭建过程（ps：windows环境）记录一下。

###关于jekyll
我了解到的是jekyll是基于ruby语言一个静态网站生成工具，可以将html、markdown文件以静态页的形式展示，因为个人博客使用了markdown文件，所以jekyll恰好满足需求

###搭建jekyll静态站
- 安装ruby以及DevKit：jekyll是基于ruby的工具，所以先安装ruby环境；[下载对应ruby版本](http://rubyinstaller.org/downloads/)，手动点击安装，建议安装到c盘根目录下，防止出现一些奇怪问题，注意安装中打钩，将ruby的路径安装到环境变量中，方便使用命令行执行程序
- 安装devkit：DevKit是开发包，同样在上面的路径下载对应版本，解压到c根目录，cmd命令进入devkit文件夹，执行`ruby dk.rb init`命令，在该目录下创建config.yml,文件中编辑为`- C:\Ruby200-x64`，即将ruby的路径告诉devkit，保存退出文件编辑，继续执行命令`ruby dk.rb install`
- 检验安装：命令行执行`gem -v`,查看版本，无误后执行gem install jekyll；如果出现证书错误，下载`http://curl.haxx.se/ca/cacert.pem`保存到ruby安装目录下的bin目录中；如果出现问gem版本低的问题，采用`gem update --system`升级一下；如果出现网络问题，则有可能gem库被墙，此时可以试着更换gem source，

        gem sources --remove https://rubygems.org/ // 删除官方链接
        gem sources -a https://ruby.taobao.org/   // 添加淘宝镜像链接
        gem sources -l                           // 查询是否替换成功

- 此时再次执行`gem install jekyll`,安装完成后创建jekyll应用。
应用的创建可以参考http://jekyllthemes.org/，克隆一个项目然后进入目录目录，输入命令`jekyll serve`，启动服务，然后可以访问,关于具体怎样基于jekyll编写静态站，参考文档 [http://jekyllrb.com/docs/home/](http://jekyllrb.com/docs/home/)。


###可能遇到的问题记录
- 访问文件路径中出现中文则访问失败：寻找并修改文件对应代码：C:\Ruby200-x64\lib\ruby\2.0.0\webrick\httpservlet\filehandler.rb中的两个部分。

		1)
		path = req.path_info.dup.force_encoding(Encoding.find("filesystem"))
		> path.force_encoding("UTF-8") #加入编码
		if trailing_pathsep?(req.path_info)
		
		2)
		while base = path_info.first
		break if base == "/"
		> base.force_encoding("UTF-8") #加入编码
		break unless File.directory?(File.expand_path(res.filename + base))





###参考
- [http://blog.csdn.net/qiujuer/article/details/44620019](http://blog.csdn.net/qiujuer/article/details/44620019)
- [http://www.mrfangge.com/jekyll-install-in-windows/](http://www.mrfangge.com/jekyll-install-in-windows/)
- [https://www.douban.com/note/497241105/](https://www.douban.com/note/497241105/)
- [http://jekyllrb.com/docs/home/](http://jekyllrb.com/docs/home/)