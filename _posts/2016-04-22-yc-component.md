---
layout: post
title: 常用组件整理
category: Jquery开发
author: ynchuan
tags:
- 组件
- jquery
---


整理开发中常用组件、插件

为实现页面切图和交互效果快速实现，将项目中常用组件半封装，（**主要封装事件，可根据设计定制dom和样式**），实现快速个性化定制开发页面。

跟随项目需求增多，组件会持续积累，在未来最大提升开发效率。

样式与设计存在差别，可以拷贝对应目录/less下的样式到工程less目录下进行修改；对于dom的修改，可以修改对应js文件的渲染部分或者静态html标签，进行组件定制。关键是封装交互，对dom和style进行修改，实现冗余代码最小化，简化整洁代码。

## 使用说明（API） 

### 地址联想(address-link)


##### 说明
仿照淘宝收件地址交互组件，实现省市县联动选择输入。



##### 调用方法  

1、引入address-link.js，html布局中创建盒子，存放html标签：

    <div class="address-link">
        <div class="adr-input-area">
            <div class="adr-text-area">
            </div>
            <i class="icon-dw"></i>
            <i class="icon-mask"></i>
        </div>
        <div class="adr-select-area hide">
            <ul class="ul-tabs-tt">
                <li class="li-tab-tt active adr-tt-pro">省份</li>
                <li class="li-tab-tt adr-tt-city">城市</li>
                <li class="li-tab-tt adr-tt-area">县区</li>
                <li class="li-tab-tt adr-tt-street hide">街道</li>
            </ul>
            <ul class="ul-tabs-bd">
                <li class="li-tab-bd active">
                    <dl class="dl-adr dl-province">
                    </dl>
                </li>
                <li class="li-tab-bd">
                    <div class="adr-itms adr-itms-city">
                    </div>
                </li>
                <li class="li-tab-bd">
                    <div class="adr-itms adr-itms-area">
                    </div>
                </li>
                <li class="li-tab-bd">
                    <div class="adr-itms adr-itms-street hide">
                    </div>
                </li>
            </ul>
        </div>
    </div>
2、将页面less代码拷贝到工程less中，配置addressConfig参数，然后根据设计稿修改细节

    var addressConfig={
        street:true,//是否有街道
        getTargetAddress:function(code){//获取最后点中的区县的code
            alert(code);
        }

    }

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?address-link) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/address-link)


----------


### 轮播(carousel) 


##### 说明 

页面banner轮播

##### 调用方法  

1、引入jquery.carousel.js，html布局中创建盒子，存放html标签：

    <div class="grp_section_carousel">
        <div class="grp_carousel_box">
            <span class="grp_carousel_page grp_carousel_prev">上一张</span>
            <dl class="grp_carousel_imgcoll">
                <dd class="grp_carousel_img" id="g1">
                <img src="images/a.jpg" alt=""></dd>
                <dd class="grp_carousel_img" id="g2">
                <img src="images/b.jpg" alt=""></dd>
                <dd class="grp_carousel_img"  id="g3">
                <img src="images/c.jpg" alt=""></dd>
                <dd class="grp_carousel_img"  id="g4">
                <img src="images/d.jpg" alt=""></dd>
                <dd class="clear"></dd>
            </dl>
            <span class="grp_carousel_page grp_carousel_next">下一张</span>
            <div class="grp_carousel_index">
                <div>
                    <a href="#" class="grp_carousel_link active"></a>
                    <a href="#" class="grp_carousel_link"></a>
                    <a href="#" class="grp_carousel_link"></a>
                    <a href="#" class="grp_carousel_link"></a>
                </div>
            </div>
        </div>
    </div>

2、将页面less代码拷贝到工程less中，dom加载完成以后配置对应参数并调用下方法，然后根据设计稿修改细节 

    $(".grp_section_carousel").carousel({
        interval:3000
    });



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?address-link) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/address-link)


----------


###  文档目录(catalog-side)

##### 说明

仿照百度文库浏览位置目录 

##### 调用方法
1、引入catalog-side.js，html布局中创建盒子，存放html标签：

    <div class="container"> 
        <article class="article" >
            <h2 class="h2-tl">
            详细1
            </h2>
            <div class="div-content">
                
            </div>
        </article> 
        <article class="article" >
            <h2 class="h2-tl">
            详细5
            </h2>
            <div class="div-content">
                <h3 class="h3-tl">
                子详细1
                </h3>
                <div class="div-h3-detail">
                    
                </div>
                <h3 class="h3-tl">
                子详细2
                </h3>
                <div class="div-h3-detail"></div> 
            </div>
        </article> 
    </div>
    <div class="d-catalog"></div>
2、将页面less代码拷贝到工程less中，dom加载完成后调用如下方法，然后根据设计稿修改细节


    $(".d-catalog").catalogBar()

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?catalog-side) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/catalog-side)


----------

###  点击轮播(click-slide)



##### 说明 

点击按钮进行横向类似轮播的切换

##### 调用方法 
1、引入click-slide.js，html布局中创建盒子，存放html标签：

         <div class="container">
            <div class="div-base-photo" data-srcoll-horizontal>
                <i class="icon-page icon-toggle-left"></i>
                <ul class="ul-base-photos">
                    <li class="li-base-photo">
                        <img src="images/a.jpg" alt="人员头像" class="img-photo">
                    </li>
                    <li class="li-base-photo">
                        <img src="images/d.jpg" alt="人员头像" class="img-photo">
                    </li>
                    <li class="li-base-photo">
                        <img src="images/c.jpg" alt="人员头像" class="img-photo">
                    </li>
                </ul>
                <i class="icon-page icon-toggle-right"></i>
            </div>
        </div>

2、将页面less代码拷贝到工程less中，在目标节点添加 **data-srcoll-horizontal** 属性，然后根据设计稿修改细节



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?click-slide) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/click-slide)


----------


###  折叠页(collapse)

##### 说明 

折叠目录，点击折叠条进行对应折叠和对应操作

##### 调用方法  

1、引入jquery.collapse.js，html布局中创建盒子，存放html标签：

    <div class="div-collapse"></div>

2、将页面less代码拷贝到工程less中，dom加载完成以后配置对应参数并调用如下方法，然后根据设计稿修改细节

    var data=[{
            title: "通知公告1",
            uid: "notice1",
            sublist: [{
                title: "信息查看",
                uid: "noti-read1",
                sublist: []
            }]
        },{
            title: "通知公告2",
            uid: "notice2",
            sublist: [{
                title: "信息查看",
                uid: "noti-read2",
                sublist: []
            }]
        }];
     $(".div-collapse").collapse({
            data: data,
            isHidePre: true,
            clickEvent: function(event, data) {
                console.log("点击item的uid为：" + $(this).data("uid")); //当点击折叠页内部的item时候会触发该方法
            }
            }).collapse("notice1"); //该方法初始化选中notice1
        });



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?collapse) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/collapse)


----------


###  联想输入(context-input)

##### 说明 

根据输入关键字关联用户想要输入的文本

##### 调用方法  

1、引入context-input.js，html布局中创建盒子，存放html标签：

    <div class="d-context-input">
        <div class="d-c-i">
            <input type="text" class="ipt-c-i">
            <span class="s-c-t">搜 索</span>
        </div>
        <ul class="ul-c-i hide">
        </ul>
    </div>

2、将页面less代码拷贝到工程less中，修改context-input.js中的getContext获取联想数据源的方法，然后根据设计稿修改细节




##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?context-input) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/context-input)


----------


###  日期选择(datepicker)

##### 说明 

日期选择器

##### 调用方法  

1、引入datepicker.js，html布局中创建盒子，存放html标签：

    <div class="d-dp">
        <input type="text" class="test-input">
        <div class="date-pannel" id="datePicker"></div>
    </div>

2、将页面less代码拷贝到工程less中，dom加载完成以后添加如下方法，然后根据设计稿修改细节
     
    var datePicker=new DatePicker("#datePicker",".test-input");
    datePicker.init();

         

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?datepicker) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/datepicker)


----------


###  下拉框(droplist)

##### 说明 

点击展示下拉条

##### 调用方法  

1、引入jquery.droplist.js，html布局中创建盒子，存放html标签：
    
     <div class="downlist-menu">
        <a class="a-t">
            产品导航
        </a>
    </div>

2、将页面less代码拷贝到工程less中，dom加载完成以后添加如下方法，然后根据设计稿修改细节

    $(".downlist-menu").eq(0).droplist({
        data: [{
            "name": "数据资源",
            "href": "http://www.baidu.com"//下拉条显示和下拉链接地址
            }, {
            "name": "服务资源",
            "href": "http://www.sina.com"
            }, {
            "name": "服务资源",
            "href": "http://www.qq.com"
            }]
        })；



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?droplist) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/droplist)


----------


###  hover延时(hoverdelay) 

##### 说明 

hover事件的函数节流

##### 调用方法  

1、引入jquery.hoverdelay.js：

2、在目标需要hover事件的dom上调用方法：

    $(dom).hoverdelay({
        hoverEvent: function() {
           console.log("hover on");
        },
        outEvent: function() {
           console.log("hover leave");
        }

    });

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?hoverdelay) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/hoverdelay)


----------


###  图片懒加载(lazyload)

##### 说明 

判断图片当前是否展示在窗口进行加载，节省带宽提高体验

##### 调用方法  

1、引入lazyload.js，添加img元素将src属性替换为asrc，例如：

    <ul class="ul-load-items">
        <li class="li-item">
            <img alt="hello" asrc="images/a.jpg"/>
        </li>
        <li class="li-item">
            <img alt="hello" asrc="images/b.jpg"/>
        </li>
        <li class="li-item">
            <img alt="hello" asrc="images/c.jpg"/>
        </li>
        <li class="li-item">
            <img alt="hello" asrc="images/d.jpg"/>
        </li>
        <li class="li-item">
            <img alt="hello" asrc="images/a.jpg"/>
        </li>  
    </ul>


2、将页面less代码拷贝到工程less中，然后根据设计稿修改细节即可

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?lazyload) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/lazyload)


----------


###  分页(page)

##### 说明 

仿照百度搜索结果的分页组件

##### 调用方法  

1、引入page.js，html布局中创建盒子，存放html标签：

    <div class="pages" id="page1">
    </div>

2、将页面less代码拷贝到工程less中，DOM加载后调用如下方法，然后根据设计稿修改分页细节设计
    
    new Page({
        "container":$("#page1")//分页DOM容器
    }).init();



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?page) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/page)


----------


###  弹窗(popup)

##### 说明 

简单弹窗，主要封装事件。

##### 调用方法  

1、引入popup.js，html布局中创建盒子，存放html标签，例如：

    <div class="popup-main" id="popup-main1">
        <div class="popup-titile">
            <div class="pop-close"></div>
        </div>
        <div class="popup-body">
            <div>
                <div class="float-three">1</div>
                <div class="float-three">2</div>
                <div class="float-three">3</div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="popup-footer">
            <div class="popup-btns">
                <button class="popup-btn">取消</button>
                <button class="popup-btn">确定</button>
            </div>
        </div>
    </div>
    <div class="popup-main" id="popup-main2">
        <div class="popup-titile">
            <div class="pop-close"></div>
        </div>
        <div class="popup-body">
            <div>
                <div class="float-three">4</div>
                <div class="float-three">5</div>
                <div class="float-three">6</div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="popup-footer">
            <div class="popup-btns">
                <button class="popup-btn">取消</button>
                <button class="popup-btn">确定</button>
            </div>
        </div>
    </div>
    <button id="btn1">弹窗1</button>
    <button id="btn2">弹窗2</button>

其中popup-main为两个弹窗内容区

2、将页面less代码拷贝到工程less中，DOM加载后调用如下方法完成弹窗事件的监听，，然后根据设计稿修改细节

    new Popup(document.getElementById("btn1"),document.getElementById("popup-main1")).init();
    new Popup(document.getElementById("btn2"),document.getElementById("popup-main2")).init();    

完成绑定弹窗和触发弹窗。



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?popup) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/popup)


----------


###  模拟滚动(scroll-emulate)

##### 说明 

仿百度地图搜索后结果展示的滚动条。即重写滚动条

##### 调用方法
1、引入scroll-emulate-jq.js，html布局中创建盒子，存放html标签：
    
    <div class="scroll-emulate">
        <div class="scroll-emulate-area">
             
        </div>
        <div class="scroll-bar">
            <div class="scroll-bg">
                <div class="scroll-up-point"></div>
                <div class="scroll-bar-up"></div>
                <div class="scroll-down-point"></div>
            </div>
        </div>
    </div>

2、将页面less代码拷贝到工程less中，dom加载后调用如下方法，然后根据设计稿修改细节

    var scroll=Scroll.getSingleInstance($(".scroll-emulate")).init();

如果模拟滚动条内容动态刷新，要重复调用该方法`scroll.init()`，更新滚动参数。



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?scroll-emulate) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/scroll-emulate)


----------


###  搜索(search)

##### 说明 

仿百度的搜索框模式

##### 调用方法  

1、该模块为样式模块，没有js引入，html布局中创建盒子，存放html标签：

    <div class="search">
        <div class="search-class">
            <ul class="up">
                <li class="fsl active">
                    <a href="#">要素</a>
                </li>
                <li class="fsl">
                    <a href="#">网页</a>
                </li>
                <li class="fsl">
                    <a href="#">地图</a>
                </li>
                <li class="fsl">
                    <a href="#">文库</a>
                </li>
                <li class="fsl">
                    <a href="#">应用</a>
                </li>
                <li class="fsl">
                    <a href="#">法律法规</a>
                </li>
                <div class="clear"></div>
            </ul>
        </div>
        <div class="search-key">
            <div class="fsr fsr-logo"></div>
            <div class="fsr fsr-input">
                <input type="text" id="searchkey" class="searchkey"/>
                <div class="fsr fsr-btn">搜 索</div>
            </div>
        </div> 
    

2、将页面less代码拷贝到工程less中，然后根据设计稿修改细节

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?search) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/search)


----------


###  模拟select(select-radio)

##### 说明

重谢浏览器的select组件 

##### 调用方法  

1、引入jquery.resetselect.js，html布局中创建盒子，存放html标签：
    
    <select name="brandq" data-reset="select">
        <option value="中国">中国</option>
        <option value="韩国">韩国</option>
        <option value="印度" selected>印度</option>
        <option value="澳大利亚">澳大利亚</option>
    </select>

2、将页面less代码拷贝到工程less中，dom加载后对应dom添加`data-reset="select"`属性即可，然后根据设计稿修改细节

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?select-radio) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/select-radio)


----------


###  树形(sitemap)

##### 说明 

一个展示层级结构的树形组件

##### 调用方法  

1、引入jquery.sitemap.js，html布局中创建盒子，存放html标签：
    
    <div id="sitediv">
    </div>

2、将页面less代码拷贝到工程less中，dom加载后调用如下方法，然后根据设计稿修改细节
    
    var src={
        "title": "首页",
        "url": "home.htm",
        "isChildUrl": false,
        "class": "r1",
        "childList": [{
            "title": "平台管理",
            "url": "od/admin/adminIndex.htm",
            "isChildUrl": false,
            "class": "r2",
            "childList": [{
                "title": "数据资源管理",
                "url": "od/index.htm",
                "isChildUrl": false,
                "class": "r3",
                "childList": []
            }]
        }]
    }
    $("#sitediv").siteMap({
            data: src
        })
    });



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?sitemap) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/sitemap)


----------


###  滑动条(slidebar)

##### 说明

仿照html5中input[type=range]范围选择器的组件，但是可以实现双向范围选择

##### 调用方法  

1、引入slidebar-jq.js，html布局中创建盒子，存放html标签：

    <div class="slider">
        <div class="slidebar">
            <div class="slidebar-emulate">
                <div class="slidebar-round-l"></div>
                <div class="slidebar-left"></div>
                <div class="slidebar-range"></div>
                <div class="slidebar-right"></div>
                <div class="slidebar-tip">
                    <div class="down-arrow"></div>
                </div>
                <div class="slidebar-round-r"></div>
            </div>
            <div class="slidetxt">
                <div class="slideage">&nbsp;
                </div>
                <div class="slideage">10岁</div>
                <div class="slideage">20岁</div>
                <div class="slideage">30岁</div>
                <div class="slideage">40岁</div>
                <div class="slideage">50岁</div>
                <div class="slideage">60岁</div>
                <div class="slideage">70岁</div>
                <div class="clear"></div>
            </div>
        </div>
    </div>

2、将页面less代码拷贝到工程less中，dom加载后调用如下方法，然后根据设计稿修改细节

    $(".slidebar").slide( {
        callback:function(left, right) {
            console.log("年龄起始："+left);
            console.log("年龄结束："+right);
        }
    });



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?slidebar) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/slidebar)


----------


###  tab切换页(tab)

##### 说明 

简单tab切换，封装动作，dom和样式可以定制

##### 调用方法  

1、引入jquery.tab.js，html布局中创建盒子，存放html标签：

    <div class="grp_tab_1">
        <ul class="yc_tab_ul">
            <li class="yc_tab_li active">
                <span class="hosticon icon">tab1</span>
            </li>
            <li class="yc_tab_li">
                <span class="dataicon icon">tab2</span>
            </li>
            <li class="yc_tab_li">
                <span class="servicon icon">tab3</span>
            </li>
        </ul>
        <div class="yc_tab_container">
            tab1
        </div>
        <div class="yc_tab_container yc-tab-hide">tab2</div>
        <div class="yc_tab_container yc-tab-hide">tab3</div>
    </div>

2、将页面less代码拷贝到工程less中，dom加载后调用方法如下，然后根据设计稿修改细节

    $(".grp_tab_1").tab({
        proxy: ".yc_tab_li" //点击item的dom代理名称，可修改对应其他dom名称，但是位置要正确，参数可省略，默认为yc_tab_li
    });



##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?tab) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/tab)


----------


###  表格(table)

##### 说明

通用表格，主要为实现快速切图提供修改模板。 

##### 调用方法  

1、html布局中创建盒子，存放html标签：

    <table class="yc_list">
        <tr class="yc-list-li yc-li-head">
            <td class="yc-list-cell cell-1">排名</td>
            <td class="yc-list-cell cell-2">姓名</td>
            <td class="yc-list-cell cell-3">访问次数</td>
            <td class="yc-list-cell cell-4">单位</td>
        </tr>
        <tr class="yc-list-li">
            <td class="yc-list-cell">
                <span class="yc-cell-num first">1</span>
            </td>
            <td class="yc-list-cell">王楠</td>
            <td class="yc-list-cell">1232</td>
            <td class="yc-list-cell">济南市***</td>
        </tr>
        <tr class="yc-list-li">
            <td class="yc-list-cell">
                <span class="yc-cell-num second">2</span>
            </td>
            <td class="yc-list-cell">黎明</td>
            <td class="yc-list-cell">3213</td>
            <td class="yc-list-cell">济宁市***</td>
        </tr>
        <tr class="yc-list-li">
            <td class="yc-list-cell">
                <span class="yc-cell-num third">3</span>
            </td>
            <td class="yc-list-cell">周铭</td>
            <td class="yc-list-cell">3212</td>
            <td class="yc-list-cell">泰安市***稽查队</td>
        </tr>
        <tr class="yc-list-li">
            <td class="yc-list-cell">
                <span class="yc-cell-num">4</span>
            </td>
            <td class="yc-list-cell">李晨</td>
            <td class="yc-list-cell">2222</td>
            <td class="yc-list-cell">东营市***</td>
        </tr> 
    </table>

2、将页面less代码拷贝到工程less中，然后根据设计稿修改细节

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?table) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/table)


----------


###  时间轴(timeAxis)

##### 说明 

时间轴组件

##### 调用方法  

1、引入jquery.timeAxis.js，html布局中创建盒子，存放html标签：

    <div id="timeaxis"></div>
2、将页面less代码拷贝到工程less中，dom加载后配置对应参数调用方法如下，然后根据设计稿修改细节

    var data = [{
        "date": "2014-05-02",//日期
        "event": "今2014-05-02，你好今天！"//事件
    }, {
        "date": "2015-09-03",
        "event": "昨天2015-09-03，你好昨天！"
    }, {
        "date": "2015-03-04",
        "event": "前天2015-03-04，你好前天！"
    }, {
        "date": "2013-02-05",
        "event": "今天2013-02-05，你好今天！"
    }];
    $("#timeaxis").timeAxis({
        data:data

    });

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?timeAxis) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/timeAxis)


----------


###  提示框(tipbox)

##### 说明 

仿照标签的title属性重写该组件。

##### 调用方法  

1、引入jquery.tipbox.js，html布局中创建盒子，存放html标签：
    
    <div class="d-tipbox">
        <h4 class="cdtn_num">
            <span class="cdtn_abst">已经添加条件:****人员</span> 条件组1
        </h4>
    </div>
2、将页面less代码拷贝到工程less中，dom加载后调用方法如下，然后根据设计稿修改细节
    
    $(".cdtn_num").hover(function() {
        $(this).tipbox({
            msg: "123"//提示文字
        });
    }, function() {
        $(this).tipbox("close");
    });

    

##### 代码

[查看演示](http://ynchuan.github.io/yc-components/?tipbox) 
[查看源码](https://github.com/ynchuan/yc-components/tree/master/src/tipbox)


----------


## 结尾
以上组件主要实现半封装目的，为了实现业务代码冗余最小和快速切图，总结了以上代码块、js插件以及轻量级可修改less样式表。