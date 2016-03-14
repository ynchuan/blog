---
layout: default
title: 前端代码编写的一些习惯
category: CSS开发
author: ynchuan
tags:
- css 
- js 
- html

---

# 关于前端代码编写的一些习惯
前端是什么？打来浏览器，输入一个网址，呈现在面前的就是前端。前端开发一部分就是网页开发，网页开发就是编写html、css以及js代码，来实现对用户的信息呈现。

跟所有的代码开发一样，前端代码也要做一些编码约定来规范我们的代码，目的就是使我们大家协作开发的代码更加规范、美观、可读，更重要的是便于项目管理，以及需求变更。

下面我们普及一些前端编码习惯，请大家养成，这也会使我们更方便的维护项目。网页代码的开发讲求内容、表现以及交互的分离，就是在项目中html代码文件负责页面的内容，css文件负责外观表现，js负责与用户的交互，三者项目结合给用户带来更好的前端体验。至于所谓分离，就是将代码分开放在各自对应 的文件里，实现代码整洁。下面我们就从css、js以及html的角度具体说说应该怎样规范。

## css部分
###  1、代码组织方式：

css是样式级联表，负责页面展示，该部分代码主要有三种写法：

- 属性式写法：
`<div style="width:20px;height:40px"></div>`
> 这种写法直接将样式写在标签的属性上，首先导致代码可复用度很低，其次属性式的样式也是css选择器中权重去高的方式，不方便样式在变更的时候修改样式，例如：通过jquery给该div addClass（"demo"），其中.demo{width:300px;height:700px},这样修改样式是不能修改成功的。所以该方式是应该较少的写的一种方式。

- 内联样式：
    `<style>.demo{width:200px;height:40px;} #id{width:300px;}</style>`

> 该写法是将样式代码放在html文件中，css代码很少的情况下可以使用，但是当该部分代码多的情况下，影响html代码整洁度和可读性，从性能优化上讲虽减少了css文件，降低了http请求但是不利于静态文件缓存。


- 外链样式：
    `<link rel="stylesheet" type="text/css" href="css/wfbase.css">`

> 该写法虽然增加了http请求数，但是利于代码维护和可读性，并通过缓存解决http数量过多问题，所以当css代码很多的情况下，要使用外链样式的形式，这也是我们项目中通常采用的代码编写方式。

小结：css的写法，在项目中请创建外链样式文件进行样式的编写。

### 2、css选择器
jquery的选择器是参考css来的，所以学会的了css的选择器就学会了jquery的。

css在添加样式的过程中，除了采用外链样式文件以外，在dom标签上请采用class属性进行样式的添加：
例如：`<div class="demo demo2 demo3"></div>`,class属性可以添加多个，最后将`.demo{}`、`.demo2{}`、`.demo3{}`定义在外链样式文件中。

请尽量少使用`#id{....}`定义样式以及`tag{}，例如div.li.a{}`等选择器。

同时样式class的定义可以层级嵌套的，常见写法为 `div.demo>.subdemo{}`,也可用来限制选择器选择的dom，但是层级嵌套不要太深。

### 3、选择器命名
选择器命名应小心重名，尤其为协作项目，如果出现重名可能会影响其他人定义的界面样式，所以可以为命名做唯一标识，或者添加命名空间的处理来降低重名概率。

唯一标识：例如潍坊项目上，class可以添加**wf_demo**的**wf**标识进行；

命名空间：通过在上层添加标识，在底层定义的时候添加标识限制，例如下例中的`.wf`：

    <header class="wf">
		<div class="wrap">
			<div class="wfh">
				您好，
				<a class="wfh_usr">SUPERADMIN</a>
				|
				<a class="wfh_logout">退出</a>
			</div>
		</div>
	</header>

    css部分:
    .wf .wrap{}
    .wf .wfh_usr{}
    .wf .wfh_logout{}

## js部分
### 1、减少全局变量污染
我们平时写的js代码是有执行环境的，所有的js代码都是执行在window环境中。例如我们新建一个js文件，其中直接定义一个变量arg，代码如下：

    var arg = "father scrop--window scope";
    
    console.log("father arg=" + arg); 
    console.log("this father arg=" + this.arg);
    console.log("window father arg=" + window.arg);

    result:
    father arg=father scope
    this father arg=father scope
    window father arg=father scope

代码结论：我们定义的arg变量是定义在window环境中的，如果大家都将变量定义在window中，导致window环境中变量重名的可能性很大，所以我们不建议这样写。（ps:this=window,此处涉及js的面向对象，属于进阶部分，请有兴趣的可以研究一下。）我们建议将该变量定义在window的局部环境中，其中涉及匿名自执行函数。
    
    (function() {
    	var arg = "children scope";
    	console.log("child arg=" + arg);
    })();
    console.log("  arg=" + arg); 
    console.log("this  arg=" + this.arg);
    console.log("window arg=" + window.arg);

    result:
    child arg=children scope
    Uncaught ReferenceError: arg is not defined
    at <anonymous>:6:28
    at Object.InjectedScript._evaluateOn (<anonymous>:895:140)
    at Object.InjectedScript._evaluateAndWrap (<anonymous>:828:34)
    at Object.InjectedScript.evaluate (<anonymous>:694:21)



    去掉console.log("  arg=" + arg):
    (function() {
    	var arg = "children scope";
    	console.log("child arg=" + arg);
    })();
    console.log("this  arg=" + this.arg);
    console.log("window arg=" + window.arg);
    child arg=children scope
    this  arg=undefined
    window arg=undefined
匿名函数：function(){}，就是一个没法再次调用的函数，没什么东西。

自执行匿名函数：（function(){}）（），此时即可以看到arg并没有在window环境中，可以将变量的作用范围设置在局部function中,这样的好处是不会产生各种各样的变量冲突，尤其是合作项目中，同时有助于js模块化，代码规范可读，如果删除该模块，自身不能工作，但是不会影响其他的模块部分，实现js代码的松耦合轻依赖。

## html部分
html中尽量只有标签以及标签属性，不要包含样式style，同时建议不强制dom标签上的事件响应不通过on**属性监听，采用jquery中的事件代理，使用办法请参见jquery文档中on方法，这样写dom可实现复用性，同时事件代理更节省浏览器性能。（此处为个人倾向推荐）

html代码请语义化，语义化可以参见
[html 语义化布局(一)](http://10.110.1.135:8888/?p=86)、（二）、[（三）](http://10.110.1.135:8888/?p=108)文章

后续会继续补充。