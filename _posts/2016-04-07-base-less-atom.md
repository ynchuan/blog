---
layout: post
title: 常用less原子样式简写
category: CSS开发
author: ynchuan
tags: 
- less 
- css
---

该库为个人页面切图[常用less库](https://github.com/ynchuan/base-less-atom)，为实现快速的样式表编写，将常用的样式表属性、常用样式代码段进行了总结，封装和实践，满足快速切图样式表编写的需求。

该库文件名为base.less,其中包含三类样式表：**基础样式、组合样式、页面布局样式**。其主要基于less中函数嵌套原理实现，特点为：

- 样式表单词过长实现简写，例如：`.m(0)`表示`margin：0;``.ff`表示:`font-familay:"Microsoft YaHei"`,减少单词的长度，降低出错可能

- 样式组合简写：例如`.line-height(30px)`;表示`{line-height:30px;height:30px;}`（ps:此处添加height为兼容ie input高度而考量）

- 页面样式表封装：例如.wrap,.main-flow,.main-full为页面整体布局样式

- 其中包含了一些兼容ie6|7的hack（很**,因为我们有些项目要兼容ie6、7）

以上的使用在工作中可以快速编写样式表，提高编写速度和工作效率。 

该常用样式库为项目中常用样式表的总结，未来会根据需求进行修改补充和完善。

##使用举例说明：
1. 创建切图页面，例如test.html，并创建对应的test.less文件
2. test.less中引入base.less文件，并将test.less编译成test.css
3. 开始定制页面样式：
		
		//test.html
		<!DOCTYPE html>
		<html>
			<head>
				<title>base less atom</title>
				<link rel="stylesheet" href="css/test.css">
			</head>
			<body>
				<h1 class="h1-tt">base less atom 使用说明</h1>
				<p class="p-c"></p> 
			</body>
		</html>

		//test.less
		@import (reference) "../../src/base.less";
		//通过reference会导致生成的test.css中不包含base.less中定义的样式，只满足引用
		.h1-tt{
			.line-height(30px);
			.fs(16px);
			.ff;
			.color(#ccc);
			.bb(#eee);
			.fw(lighter);
		}
		.p-c{
			.m(0);
			.line-height(25px);
			.fs(14px);
		} 

以上实现了快速定义样式表，减少代码的敲入量以及单词书写失误。[查看demo](https://github.com/ynchuan/base-less-atom/tree/master/test/less/test.less)

##less库说明

####基础less样式表
基础样式的简写命名一般是**属性名的第一个字母**加上**属性值的第一个字母**，个别重复的地方切换其他相关字母，或者是**属性名的第一个单词的第一个字母**加上**属性名第二个单词的第一个字母**，具体根据实际情况而定，实现简写。

- 定位（position）：pv -(relative),pa -（absolute）,pf -（fixed）
- vertial-align:.vm-(middle),.vb-(bottom),.vt-（top）
- 外边距（margin）：.m-(margin简写，默认为5px,如果要定义其他像素，可以.m(**px)，其他同理),.mt-（margin-top）,.mb-(margin-bottom),.ml-(marigin-left),.mr-(marigin-right)
- 内边距（padding，同理margin）：.p,.pl(),.pt(),.pr,.pb()
- 边框 （border）：.b-(border简写，默认为border:1px solid #ccc,如果要定义其他颜色，可以.b(#eee)，如果要扩展宽度，可以border-width：3px),.bl,.bt,.bb,.br,.bn-(border:none;outline:none)
- 字体（font）:.fs-(font-size，默认16px;可自定义大小:fs(18px)),.fw-（font-weight,默认为blod，也可以自定义.fw(lighter)）,.ff-(font-family,默认"Microsoft Yahei",可以自定义)
- cursor：.poi-(pointer),.def-(default)
- overflow: .ovh-(hidden),.ova-(auto)
- visibility:.vh-（hidden）,.vv-(visible)
- 显隐（display）:.show-(block),.hide-(none)
- 浮动（float）：.fl-(left),.fr-(right)
- 文本位置（text-align）:.tr-(right),tc-(center),.tl-(left)
- 清理浮动（clear）:.cl-(left),.cr-(right),.cb-(both)
- 背景色(background-color)： .bgcolor(#***)
- 动画多度(transition)：.trans
####组合less样式表
该部分命名偏功能语义化

- 块级格式化上下文：.bfc
- 文本不换行，超出省略：.txto
- 居中：.center
- 行块级元素：.inline-block 
- 背景图平铺:bgimgs(@url, @pos)，@url为背景文件路径，@pos为图片,positonbackground-size为cover
- 背景图适应：bgimg(@url, @pos),是bgimgs中不含background-size
- 行高：.line-height(**px);
- 透明：.opactity(0.4);
- 清除浮动：.clearfix，.fix都可以
- 三角形：.triangle-down-(下三角)，.triangle-up-(上三角)，.triangle-left-(左三角)，.triangle-right-(右三角),可以传入颜色值，默认三角宽度为5px，例如灰色向下三角：.triangle-down(#ccc)
- 绝对定位隐藏：.abs-out,.abs-clip
- 按钮禁用：.disabled
####页面基础布局less样式表
该部分为页面整体定义一些基本的样式，添加在body的子盒子中

- 流体页面：.main-flow
- 满屏页面：.main-full
- 中心包裹：.wrap

##写在最后
本less简写经过实践可以提高编写样式表的效率，但是前提要熟练记忆，至少记忆一些常用的。也可以按照个人习惯修改其中的常用的样式的简写，工具而已，只要能够正常使用即可。less编译工具可以使用koala

###License
BSD





