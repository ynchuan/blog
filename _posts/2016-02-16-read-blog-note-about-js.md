---
layout: post
title: 博客笔记
category: 学习笔记
author: ynchuan
---

MVC requirejs/AMD 

### js面试题围观
[ 源文](http://www.codeceo.com/article/one-javascript-interview.html)

	function Foo() {
	    getName = function () { alert (1); };
	    return this;
	}
	Foo.getName = function () { alert (2);};
	Foo.prototype.getName = function () { alert (3);};
	var getName = function () { alert (4);};
	function getName() { alert (5);}
	
	//答案：
	Foo.getName();//2
	getName();//4
	Foo().getName();//1
	getName();//1
	new Foo.getName();//2
	new Foo().getName();//3
	new new Foo().getName();//3

### [CRASH THE BROWSER THROUGH JS](http://www.codeceo.com/article/12-line-code-browser-die.html)

	var total="";
	for (var i=0;i<1000000;i++)
	{
	    total= total+i.toString ();
	    history.pushState (0,0,total);
	}