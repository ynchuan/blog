---
layout: post
title: ZT:浏览器的渲染机制
category: 浏览器
author: ynchuan
---

## “[JS一定要放在Body的最底部么？聊聊浏览器的渲染机制](http://delai.me/code/js-and-performance/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)”简记

### 页面渲染出来
- stepA：没有图片的首屏
- stepB：有图片的首屏
- stepC：页面完成加载出来

### stepA和完整DOM树的关系
完整dom树一定可以得到stepA；
但是stepA不能得到完成dom树；

即DOM树只要具备了某些条件就可以进行无图首屏渲染，不一定**DOM树要完整**

### 浏览器渲染机制
DOM-->CSSOM-->Render Tree-->layout-->painting

页面的首屏时间的影响因素应该为css的下载速度，因为生成CSSDOM以后才能继续进行后续的painting；同时script标签不放在底部并不影响首屏时间，而是有可能影响首屏渲染的内容量。

**因为**script会截断html标签的读取进而生成DOM树，当CSSDOM完成以后就会对已有的DOM树进行首屏渲染。


### 总结

- 通过浏览器timeline工具可以查看浏览器页面渲染过程
- 页面首屏影响因素为css下载速度
- 将script放在body底部并不会影响首屏（第一次painting）的时间或者时机，只是会影响首屏内容量
- script会截断（或者叫做阻塞）页面dom的解析，影响dom树的大小（即内容的多少）
- 为了首屏内容更好，同时页面更节省浏览器性能（减少painting次数，因为如果没有绘制完成，后续会继续painting），将script防在页面底部


