---
layout: post
title: Object的属性
category: JS技术
author: ynchuan
---

## 关于Object的属性
- 定义属性 

		var obj = {};
		Object.defineProperty(obj, "key1", {
			value: "123",
			writable: false,
			enumerable: false,
			configurable: false
		});
		
		obj.key1;
		obj.key1 = "456"; //进行值的修改，但是会修改失败
		obj.key1;
		Object.defineProperty(obj, "key2", {
			get: function() {
				console.log("value getting");
				return 456;
			},
			set: function(val) {
				console.log("value setting=" + val);
			}
		});
		obj.key2;
		obj.key2 = "789";
		obj.key2;

 
 
说明：该方法实现对象obj的属性定义,其中对于某一个get/set和value/writable不能重复设置，  因为二者功能一样，只能设置一次完成属性值的设置。

例如：key1属性通过value/writable设置，key2通过get/set进行设置。

writable：如果为false，属性的值就不能被重写,只能为只读了

configurable：总开关，一旦为false，就不能再设置他的（value，writable，configurable)

enumerable：是否能在for...in循环中遍历出来或在Object.keys中列举出来。

