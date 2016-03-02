---
layout: default
title: jquery代码组织结构
category: Jquery开发
author: ynchuan
---

#jquery代码组织结构

　　jquery源码结构采用jquery函数对象进行组织，将其中的静态方法挂载在jquery函数对象的属性上；同时基于dom对象创建的jquer对象，即每new一个jquery对象，其中存放了该参数选择器所选中的dom节点对象，并以数组的形式进行组织，其中的操作方法则是采用原型链的形式进行组织，实现方法的共享。

插入一个图来说明一下代码结构：

![](../images/jquery.png)

代码简写结构：

    (function(window) {
    	var conflict;
    	var jq = function(selectors) {
    		return new jq.prototype.init(selectors); //调用$方法，创建一个jquery对象，其中包含dom节点数组和一些属性
    	}
    	jq.fn=jq.prototype = {
    		constructor: jq,
    		init: function(selectors) {
    			var dom = document.querySelectorAll(selectors);
    			this.length = dom.length;
    			for (var i = 0; i < dom.length; i++) {
    				this[i] = dom.item(i);
    			}
    		},
    
    		each: function(fun) {
    			for (var i = 0; i < this.length; i++) {
    				fun.call(this[i], i, this[i]);
    			}
    			return this;
    		},
    		hide: function() {
    			this.each(function() {
    				this.style.display = "none";
    			});
    		},
    		length: 0,
    		splice: Array.prototype.splice,
    		toString: String.prototype.toString,
    		push: push,
    		sort: [].sort
    	}
    	
        //将jq的方法原型全部指向init原型，实现向jquery.prototype添加方法就是向init添加方法。
        jq.prototype.init.prototype = jq.prototype; 
    	jq.extends=jq.fn.extends = function(orgin, append) {
            //静态方法和原型对象的扩展方法
    	};
    	jq.callback = function() {
            //jq工具：回调队列
    	}
    
    	if (window.$) {
    		conflict = window.$;
    	}
    	jq.noConflict = function() {
    		window.$ = conflict;
    	}
    	window.$ = jq;
    	window.jq = jq;//向全局对象中释放调用接口
    })(window);

个人也将基于jquery的代码组织形式，将常用的dom操作方法以及js方法封装起来生成yc.js库，逐渐实现原生js编码。