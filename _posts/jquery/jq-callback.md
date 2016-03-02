---
layout: default
title: callback回调函数
category: Jquery开发
author: ynchuan
---

#callback回调函数
　　jquery中callback回调机制以观察者模式为基础，通过传入初始化参数进行回调方式的控制。其中回调参数包括：once、memory、stopOnFalse、unique四个参数，进行4种不基础同方式的控制，因为可以通过组合实现复合功能。
###观察者模式
设计模式中常见也是使用比较多的代码组织方式，通过创建数组来实现队列方法的保存，其中配备add方法；通过fire触发遍历队列中存储的值，完成触发。

对应源码：

    //订阅方法
    add = function(args) {
		var i,
			length,
			elem,
			type,
			actual;
		for (i = 0, length = args.length; i < length; i++) {
			elem = args[i];
			type = jQuery.type(elem);
			if (type === "array") {
				add(elem);//递归遍历多维数组，最终将一维数组添加到队列中来
			} else if (type === "function") {
				// Add if not in unique mode and callback is not in
                //如果非唯一回调队列，则添加方法到队列中来；如果是唯一队列，
                //但是唯一队列中没有改方法，添加到队列中来。
				if (!flags.unique || !self.has(elem)) {
					list.push(elem);//传入参数为一维数组;ps：此处处理unique参数，
				}
			}
		}
	},
	// 执行方法
	fire = function(context, args) {
		args = args || [];
        //如果是记忆队列，回调一旦fire，就会记录fire参数作为下次记忆触发的参数
		memory = !flags.memory || [context, args]; 
		fired = true;
		firing = true;
		firingIndex = firingStart || 0;
		firingStart = 0;
		firingLength = list.length;
		for (; list && firingIndex < firingLength; firingIndex++) {
			if (list[firingIndex].apply(context, args) === false && flags.stopOnFalse) {
				memory = true; // Mark as halted
				break;
			}
		}
		firing = false;
        //对于非记忆队列，一次性队列，fire后队列会置为未定义，以后的方法将不能添加
		if (list) {
			if (!flags.once) {
				if (stack && stack.length) {
					memory = stack.shift();
					self.fireWith(memory[0], memory[1]);
				}
			} else if (memory === true) {
				self.disable();
			} else {
				list = [];
			}
		}
	}

###参数实现细节
once队列，只允许fire一次，后续的add以及fire将进入对应的函数；

memory队列，会在add的过程中通过记忆参数进行fire，无需再次手动fire；

unique队列，会在add的过程进行检查唯一性实现处理；

stopOnFalse则会在每次fire回调中检测回调返回值进行后续是否继续执行的判断，检测于fire中。
###常用之once+memory分析
此时队列中可以添加进回调方法，但是不能够被手动的fire了，触发执行的方法是memory记忆中的自动执行实现，通过回调索引进行执行。

    self = {
		// Add a callback or a collection of callbacks to the list
		add: function() {
			if (list) {
				var length = list.length;
				add(arguments);
				// Do we need to add the callbacks to the
				// current firing batch?
				if (firing) {
					firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away, unless previous
					// firing was halted (stopOnFalse)
				} else if (memory && memory !== true) {
					//如果是触发执行以后，则会在再次添加回调的时候执行函数
					//因为memory会在上次fire的时候被记录下fire的参数，用于再次添加的时候的执行
					firingStart = length;
					fire(memory[0], memory[1]);
				}
			}
			return this;
		},
        fireWith: function(context, args) {
			if (stack) {
				if (firing) {
					if (!flags.once) {
						stack.push([context, args]);
					}
				} else if (!(flags.once && memory)) {
                    //该处使得once回调后续只能发生一次fire，但是非once无此限制。
					fire(context, args);
				}
			}
			return this;
		}
    }