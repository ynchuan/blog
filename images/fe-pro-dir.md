# fe-pro-dir

## css

### normalize.css

跨浏览器初始化页面样式，并非所有样式重置，只是修补各款浏览器的差异和bug，该样式表开源，MIT协议，国外大牛总结，随意使用

### base.css

该文件存放页面结构以及通用部分的样式表，比如header|wrap，也可以存放原子式样式表

### common.css

该文件存放通用样式表文件，主要存放插件的样式表，实现插件的热插拔

### page-业务.css

该样式表存放该页面的特有样式，主要是业务相关的样式

## js

### jquery.js

跨浏览器兼容javascript库

### json2.js

解决IE8以及IE8-浏览器不支持JSON相关的API的javascript库，浏览器能力补偿库，一般采用
<!--[if lt IE 9]>
<script type="text/javascript"src="js/json2.js"></script>
<![endif]-->
形式添加，这是浏览器hack的方式

### html5shiv.js

解决IE8以及IE8-浏览器不支持HTML5（例如header|section|article|footer）标签的javascript库，浏览器能力补偿库，一般采用
<!--[if lt IE 9]>
<script type="text/javascript"src="js/html5shiv.js"></script>
<![endif]-->
形式添加，浏览器hack的方式

### 业务.js

编写该业务界面的javascript

## less

### base.less

### common.less

### page-业务.less

## images

### 如果兼容IE7+，使用sprite图标（合并图标，节约带宽）

IE7以及IE7+支持background-posiiton属性，所以使用该属性可以实现图标的局部显示，也是雪碧图（sprite）的实现原理

## 业务1.html

## 业务2.html

## ....
