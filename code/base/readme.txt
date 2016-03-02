v1.0

1、IE6 做到了基本的适配，但是细节适配不完善;
2、提供了各个按钮的选中方法接口，接口部分见demo中的js的console部分;
3、折叠菜单部分采用了基于jquery的插件，可实现数据的配置，调用方法：
 $(".grp_aside_list").grpcollapse({"data":data,"isHidePre":true,"clickEvent":function(event){
        console.log("点击item的uid为："+$(this).data("uid"));
    }});
});
-->data:要呈现的菜单层级的数据结构：
例如：
 var data = [{
            icon: "images/leftMenu1a.png",
            activeicon: "images/leftMenu1b.png",
            title: "我的申请",
            uid: "myappl",
            sublist: [{
                icon: "",
                activeicon: "",
                title: "待审核",
                uid: "myapplicatonchck",
                sublist: []
            }]
	        }, {
	            icon: "images/leftMenu3a.png",
	            activeicon: "images/leftMenu3b.png",
	            title: "服务申请方",
	            uid: "serviceappl",
	            sublist: []
	        }];
-->isHidePre：为true表示当前折叠页打开时上一个打开的折叠页关闭；false表示当前折叠页打开上一个折叠页保持原来状态。
-->clickEvent:表示点击某一个子item时，触发的事件，其中通过$(this)可以获取该item的dom元素。
4、提供了footerFix()和setActive(grp_nav_item, target_aside_li)两个全局方法：
-->footerFix():实现页面的footer在内容无法填充满屏的情况下，放在浏览器的底部；当能够填充满屏高度的情况下这放在dom的底部； 所以当dom异步加载的情况下，如果产生页面的高度的变化，在异步处理方法的结尾调用一下该函数。
-->setActive(grp_nav_item, target_aside_li)：由于系统采用webset框架，当界面进行点击链接跳转的时，各个不同的界面的导航菜单和二级菜单在不同的链接下要进行不同的选中，该方法要求作者根据各自的链接路径判断如何进行菜单选中并提供dom选择器以实现。