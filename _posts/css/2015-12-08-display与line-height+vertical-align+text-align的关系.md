---
layout: post
title: display与line-height+vertical-align+text-align的关系
category: CSS开发
author: ynchuan
---

## display
display属性为dom对象的布局属性，一般常用的包括inline（表示行级元素）、block（表示块级元素）、inline-block（表示行块级元素）属性，还有table、table-cell、flex等不常用的，暂不讨论。

下面我们讨论一下inline、block以及inline-block三个属性跟以下属性的关系。

## inline-heihgt
inline-heihgt表示行高，该属性表示office word中的行间距，即一行文字的高度,可以作用在行级和块级元素上。属性值为数字+单位。常见应用：一般而言对于block级元素，设置行高就是设置了高度，所以不用再次设置高度了，同时通过行高设置高度，还可以使得文字或者行级元素居中。
##vertical-align
vertial-align表示文字（display：inline）或者文本块（display:inline-block）在行间的**垂直方向**上的对齐方式,样式属性作用对象为行级或者行块级元素；属性作用在block级别的元素上没有效果。
其属性值常用的有top/middle/baseline/bottom/数字+单位

## text-align
表示文本**水平方向**上的对齐方式，作用在block级别的dom上，属性值有left/right/center


### 下面我们进行以上属性组合使用的一些讨论：
1、inline元素无法手动设置宽高，那么它的大小究竟由什么因素决定？

2、给定以下条件：

	<div class="b">
		<span class="inline">x</span>
		<div class="inline1">x inline</div>
		x
	</div>

	.inline{
		width:100px;
		line-height:40px;
		border:1px solid red; 
		display: inline; 
		font-size:16px;
	}
	.inline1{
		width:100px;
		line-height:30px;
		border:1px solid red; 
		display: inline; 
		font-size:16px;
	}
	.b{
		border:1px solid green;
	  }


[参见demo](http://codepen.io/ynchuan/pen/zveMNO)
![](/blog/images/inline.png)

已知以上条件，chrome环境下，问题的答案是多少？又有哪些因素来决定？

3、试着分别调整class=inline和inline1的盒子的vertical-align属性为middle/top，一次调整一个，观察变化。

4、调整class=inline的盒子的display属性为inline-block,观察绿色边框的变化。

ps：结果的验证请使用屏幕标尺进行验证，该处主要涉及css中的行级盒子模型

### 以上讨论答案以及个人理解分析：
1、inline元素盒子的**宽度**由该文本的字体决定，此处为汉字字体-宋体字，对于英文在font-size=16px的情况下其宽度大约为8px，但是不同字体宽度不同；

**高度**通过边框测量和推测应该是font-size的大小，应该也会和字体font-family有些关系，具体尚未研究清楚，注意，审查元素的时候为18px，是因为上下border存在2个像素。

2、通过审查元素可以推断出红绿线之间的空白都是12px；(lineHeight-fontSize)/2=12px；注意排除border影响。同时该值被定义为半间距，属于行级盒子中的一个重要的概念，所以引申出来一个垂直居中的办法就是height=lineHeight,当然可以直接定义lineHeight而不用定义height，对于块级盒子，其高度的产生是有lineHeight决定，而非内容撑起高度。

3、首先当一行中的行级盒子lineHeight不相等的时候，该行采用lineHeight最大的行级盒子的line-height作为该行高度。另，当font-size大于了line-height的时候，此时line-height属性就会失效，至于该处的实际的高度的计算就稍微复杂，**待议**。

行级盒子的模型可以理解为由汉语拼音练习册中的四线（分别为top/middle/baseline/bottom四线）加上下半间距构成，其中以英文字母X进行参考。
inline box 模型参考:

![](/blog/images/line-box.png)

问题中绿色边框表示是的就是四线的高度。

x的底部就是baseline线，当调整verticle-align时，也是调整该行级盒子的垂直位置，当为middle的时候会将该该盒子的lineHeight高度的垂直中线于字母x的垂直中线对齐，所以该盒子会适当下降，产生的效果就是x字母向上去，因为上面空了。

4、当盒子变成inline-blcok的时候会是行级盒子具有了块级盒子的一些属性，表现为高度就是lineHeight而不仅仅是四线的高度，所以绿色边框表示对的高度也变化了,高度为lineHeight(fontSize+行级盒子半间距，ps：半间距可正可负),注意去除边框上下高度的影响。


----------

补充：

1、对于inline-block元素，其具有bfc特性，它本身具有块状特性，所以高度为lineHeight*行数，但是这个整体又具有inline行级特性（即对内展示块状特性，对外展示行级特性），可以将这个整体看成一个行块元素，与其他行级文本（例如文本）相同特性展示。

其特性主要有：vertical-align在line-box中的表现：整体作为inline盒子位置移动。

注意：如果其中没有文字，其不会构成lineHeight盒子，因为没有字就没有高度，该盒子可以手动设置高度，但是内部没有lineHeihgt模型，跟img替换元素一样。

2、对于inline元素，它本身和文本一样，但是其跟着vertical-align进行山下移动的过程中是带着其本身的lineHeight盒子的。即top时是指该lineHeight盒子的上边沿与**向上最近块级祖先级盒子**的行模型的上边沿对齐。注意：baseline不带lineHeihgt盒子进行垂直方向的对齐。

[第三方测试demo](http://www.zhangxinxu.com/study/201005/verticle-align-test-demo.html)