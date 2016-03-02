---
layout: default
title: jquery源码学习目录
category: Jquery开发
author: ynchuan
---

#jQuery源码学习
　　jquery作为跨浏览器操作DOM的优良工具，使我们可以方便的进行跨浏览器兼容编码，其API使用方便，封装良好，链式操作等等特性，使得基本成为了前端开发的标准工具库。但是长期在jquery之上进行编码，无法进行底层操作是无法用好jquery，也是无法做好前端开发的。学习源码也是前端进阶的一部分，其中的设计思路的学习一定会让前端开发者获益匪浅。

以下为个人学习顺序，也是jquery库的模块结构：

- [jquery代码组织结构](jq-structure.md)

- [jquery核心方法](jq-core.md)

- [callback回调函数](jq-callback.md)

- [defer异步对象](jq-defer.md)

- [sizzle选择器](jq-sizzle.md)

- [数据缓存](jq-data-cache.md)

- [动画队列+效果函数](jq-animate.md)

- [dom节点属性](jq-dom-attr.md)

- [event](jq-event.md)

- [dom操作（crud节点）](jq-dom-crud.md)

- [ajax](jq-ajax.md)

- [位置函数](jq-position.md)

- [常用方法](jq.md)

以上为个人学习记录，重点在于库的结构设计和基于标准的原生DOM操作API的学习，学习代码为jquery-1.7.2版本。