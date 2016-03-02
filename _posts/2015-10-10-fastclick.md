---
layout: default
title: fastclick执行机制
category: 移动开发
author: ynchuan
---

# fastclick执行机制
　　fastclick作为移动端解决click事件响应过慢问题的办法，采用touchend事件进行click事件的模拟。之所以click响应过慢，是因为在Android低版本中为了区分双击事件，所以对于单击事件进行了300ms左右的延时处理，依次来判断用户是否要执行双击。



2. [不需要使用fastclick的情况](http://amazeui.org/1.x/javascript/fastclick/)：
> - 桌面浏览器；
> - 如果 viewport meta 标签 中设置了 width=device-width， Android 上的 Chrome 32+ 会禁用 300ms 延时；
> - viewport meta 标签如果设置了 user-scalable=no，Android 上的 Chrome（所有版本）都会禁用 300ms 延迟。

2、使用方法：

	window.addEventListener('load', function() {
	  FastClick.attach(document.body);
	}, false); 

3、说明：

使用该方法，可以使该节点下的所有的子节点实现快速点击。

4、源码分析：






