##什么是事件代理
JavaScript事件代理是一种简单的技巧，通过它你可以把事件处理器添加到一个父级元素上，这样就避免了把事件处理器添加到多个子级元素上。
##事件代理的原理
事件代理用到了两个在DOM事件中特性：**事件冒泡**和**目标元素**。

当一个元素上的事件被触发的时候，比如说鼠标点击了一个按钮，该事件将会在那个元素的所有祖先元素中被触发，这一过程被称为事件冒泡，这个事件从原始元素开始一直冒泡到DOM树的最上层。

对任何一个事件来说，其目标元素就是原始元素，目标元素在我们的事件对象中以属性的形式出现，可以使用event.target||event.srcElement进行获取事件**触发源头**，即目标元素。

使用事件代理就是把事件处理函数添加到一个祖先元素上，等待事件从它的子级元素里冒泡上来，通过判断该事件是从哪个元素开始开始，并执行对应的事件处理函数。
##事件代理有什么好处和缺点

好处：

- 假如我们页面有很多个功能不同的按钮，你希望在用户点击某一单元格的时候执行响应的函数，如果使用onclick属性或者使用jquery的click方法一个一个绑定，代码是不有点太多太乱呢？使用事件代理就可以很简单的解决事件问题并且解决代码混乱的问题。
- 使用事件代理可以减少驻留在内存中的事件处理函数，节省浏览器内存，提升性能降低崩溃的风险；
- 在DOM更新后无须重新绑定事件处理器了（前提是代理节点即祖先节点不是动态生成的），如果你的页面是动态生成的，不需要在子孙节点生成和删除的时候进行事件的绑定和卸载。

存在问题：

- 一个祖先节点代理的事件执行函数不能太多太长，代理节点也不能太大，太多太长也会出现性能问题。
- 频繁发生的事件，比如mousemove事件，因为该事件太容易发生，频繁发生导致代理事件频繁进入处理事件，一般代理的处理函数比较长，会使浏览器“太累”。
- 事件代理用于会发生冒泡的事件，如果事件不冒泡，例如mouseover、mouseout，这不能使用事件代理


##案例

![](../images/delegate.png)


这是一个页面的首页，上面要触发事件的地方有好几处，怎样组织事件处理函数才是合理性和可读性更高的写法呢？

该页面对应的html代码：

	<div class="header">
		<div class="wrap">
			<div class="title"></div>
			<div class="search">
			<div class="drop-list">
				<div class="drop-list-result">
					<span class="drop-sele">综合</span>
					<span class="down-arrow"></span>
				</div>
				<ul class="drop-ul hide">
					<li class="drop-li">综合</li>
					<li class="drop-li">**</li>
					<li class="drop-li">车辆</li>
				</ul>
			</div>
				<input class="search-input"></input>
				<div class="search-btn"></div>
			</div>
			<div class="search_gj"><a>高级搜索</a></div>
			<div class="logout"></div>
			<div class="user">
				<a>**局**支队</a><spa****n>管理员</span><a>，您好！</a>
			</div>
			<div class="clear"></div>
		</div>
	</div>


##怎样写事件代理

原生代码编写：

	//ie9+，chrome
	document.querySelector(".header").addEventListener("click", function(event) {
		var tar = event.target || event.srcElement;//该处得到的是事件的目标节点，即源头节点
		//点击综合下拉三角
		tar.classList.contains("down-arrow") && (function() {
			console.log("1");
		}) {};
		// 点击搜索按钮
		tar.classList.contains("search-btn") && (function() {
			console.log("2");
		}) {};
		// 点击登出按钮 
		tar.classList.contains("logout") && (function() {
			console.log("3");
		}) {};
		//点击下拉条
		tar.classList.contains("drop-li") && (function() {
			console.log("4");
		}) {};
});
##jquery中怎样使用事件代理

    	$(document).on("click", ".logout,.search-btn", function(event) {
			var tar = $(this);//此处的this指的dom节点，并不一定是触发源头节点，但是是代理节点
			tar.hasClass("logout") && (function() {
				alert("注销");
			})();
			tar.hasClass("search-btn") && (function() {
				var key = $(".search-input").val();
				alert("查询关键字=" + key)
			})();
			//....可以添加其他的代理事件
			event.stopPropagation();
		});