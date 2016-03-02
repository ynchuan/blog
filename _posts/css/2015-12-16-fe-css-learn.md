---
layout: default
title: css学习资料
category: CSS开发
author: ynchuan
---

# 前端样式基础

前端学习分为html标签、css样式表和javascript三部分，为满足后端开发者根据业务对页面调整的基本需求，现针对页面**切图css（重构）**部分，提供一些学习资料推荐。
> 切图：利用css和html制作静态页面，使用js完成页面交互
> 
> 重构：采用css和html制作静态页面

css是浏览器的排版标记，浏览器跟office word软件功能相同，都是解析文档并向用户呈现内容，包含 **布局**和**装饰** 两个部分，布局主要指页面节点**位置排布**，装饰则指**字体、字号、边框，背景色等等**，其中布局部分是我们平时遇到问题最多的，下面也着重介绍布局。

>布局中涉及到css属性常用的有：
>
>dispalay：inline|block|inline-block（常用）[html元素按照display属性的分类](http://10.110.1.135:8888/?p=95)*（公司内网环境）*
>
>float:left|right
>
>position:absolute|fixed|relative
>
>理解好以上单个属性的含义以及属性之间组合的使用就可以解决页面布局排版常出现的问题

### 页面文档流

布局文档流主要分为3类，有正常流布局、浮动布局（float:left|right）、绝对布局（position:absolute|fixed|relative）。
理解该三类布局即可解决日常的开发问题。

- 正常流布局：正常流布局的position的值为static，也是position的第四个属性值，页面按照流式布局。流式布局，即从上向下、从左向右的顺序进行流式的排版。流式的换行和左右布局，涉及到的是css中的行级元素和块级元素两类元素，该两类又基本涉及两类盒子模型，它们之间的区别之一就是盒子彼此之间是否会换行显示，其他的区别，随着学习的深入会有深入的理解。

- 浮动流布局：浮动流即是脱离正常流而存在，但是浮动流还是会占据正常流的空间（占据的是其中文本的空间），即影响它后面的正常流空间，这也是浮动流和绝对流的区别。

- 绝对布局：绝对流即是脱离正常流而存在，但是不影响后面正常流的布局；绝对布局要注意绝对布局的参考节点，其参考节点就是父级或者祖先节点中position为非static的元素节点，在js中可以通过offsetParent查看参考节点。

### css中的盒子模型

css中的盒子模型主要分为两类：块级盒子和行级盒子

- 块级盒子是指由margin+border+padding+content组成的盒子，一般为盒子的对外模型

- 行级盒子指配合line-height以及vertiacl-align两个属性组成的盒子，指的是盒子的内部模型；

	参考文章：

	[盒子模型](http://www.cnblogs.com/wangfupeng1988/p/4287292.html)
	
	[CSS行高——line-height](http://www.cnblogs.com/dolphinX/p/3236686.html)
	
	[我对CSS vertical-align的一些理解与认识](http://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/)

### css布局实例应用以及涉及的特性
在开发中，我们常遇到的问题一般有标签的**两栏或多栏布局**和**水平居中或竖直居中**的问题，该两类问题也是css属性的组合应用的实现。
> css的布局的单个属性并不是很多，由上可知，但是却可以实现多种多样的布局，其关键之处在于属性之间的排列组合会产生许多不同的效果，这也是样式表的特性和难点。

##### 两栏或者多栏布局
两栏和多栏布局方案 [点击查看](http://10.110.1.135:8888/?p=123)*（公司内网环境，涉及源码可以跟我要）*

其中涉及的概念：BFC（[百度关键词：css bfc](https://www.baidu.com/s?wd=css%20bfc&rsv_spt=1&rsv_iqid=0xb811c04f00094bec&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=7&rsv_sug1=5&rsv_sug2=0&rsv_sug7=100&inputT=3186&rsv_sug4=5149)），理解该概念可以解决许多前端布局问题。

相关文章：

- [深入理解BFC和Margin Collapse](http://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html)
- [我对BFC的理解](http://www.cnblogs.com/dojo-lzz/p/3999013.html)
- [前端精选文摘：BFC 神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

##### 水平居中或竖直居中

- [解读CSS布局之-水平垂直居中](http://f2e.souche.com/blog/jie-du-cssbu-ju-zhi-shui-ping-chui-zhi-ju-zhong/)
- [CSS元素水平垂直居中方法总结](http://www.cnblogs.com/Dudy/p/4085292.html)

### 最后
页面重构需要对css有深入的理解，同时对于css的理解也是一个反复颠覆过去理解重新认识的过程。

另附上：

css官方文档:[w3c官方文档](http://www.w3.org/TR/) --查看css权威规范

mozilla官网：[查看](https://developer.mozilla.org/zh-CN/) --浏览器厂商firefox的css实现情况

[css查询手册](http://css.doyoe.com/)--可以查看兼容和样式含义


----------
以上是个人对前端开发基础的总结和理解，有不对或者错误之处请包涵并指出，谢谢。
