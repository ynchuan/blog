---
layout: post
title: 高级程序设计笔记--Event
category: 学习笔记
author: ynchuan
---
# 高级程序设计笔记--Event

### event属性备注
1. event.currentTarget 事件处理程序正在处理的元素，其值为this
2. event.bubbles|cancelable只读属性，事件是否冒泡|是否可以取消事件的默认行为，属性值为true的时候，可以执行stopPropergation|preventDefault方法
3. event.stopImmdiatePropagation可以阻止当前dom回调方法以及该dom的冒泡事件

### event事件的传播过程

事件传播过程包括捕获（event.eventPhase=1）、执行（event.eventPhase=3），冒泡（event.eventPhase=3），

注：事件通过属性形式添加的形式，例如`on**=function(){}`，事件发生于捕获阶段（3）。

对于IE8-，只有2和3，没有1阶段。

### IE event 备注
可以通过attacheEvent添加事件，但是通过btn.onclick=function(e){}外添执行函数的方式无法通过e进行获取事件对象，`var e=e||window.event`;

取消冒泡：event.cancelBubble=true;

取消默认：event.returnValue=false;

target对应：event.srcElement;


### 事件类型
1. UI事件：用户与页面元素交互触发；eg:load|unload|abort|error|select|resize|scroll(以上也被称为html事件)
2. 焦点事件：元素触发或者失去焦点触发；eg:blur|focus
3. 鼠标事件: eg:click(键盘或者鼠标,由mousedown+mouseup共同组成)|dbclick|mousedown|mouseup|mousemove|mouseenter|mouseleave（不冒泡,套层元素都会触发leave，进入后代不触发leave）            mouseover|mouseout（冒泡，进入子触发）  
    **事件过程dbclick**:mousedown-mouseup-click-mousedown-mouseup-click-dbclick
4. 滚轮事件:mouseWheel(event.wheelDelta,上正下负120)
5. 文本事件：文档中输入文本时触发
6. 键盘事件：keyup|keydown|keypress ev.keycode|ev.



### Event 坐标
1. 客户区坐标（相对于浏览器坐标）：(所有浏览器都支持)ev.clientX|clientY
2. 页面坐标：ev.pageX|pageY (ie8+) (ie8-采用document.body.scroll~~||document.documentElememt.scroll~~+ev.client~来计算)
3. 屏幕坐标（相当于显示器坐标）：ev.screenX|screenY

### 事件委托


### 模拟事件