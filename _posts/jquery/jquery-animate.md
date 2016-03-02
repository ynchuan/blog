---
layout: default
title: jquery动画机制
category: Jquery开发
author: ynchuan
---

#jquery动画机制

jquery的动画为使用者提供了跨浏览器兼容的设计，通过样式动作的帧模拟实现跨浏览器，并跟css3中的anmiate有着近似的效果。但是jquery中的动画属性只支持数值属性的动画，例如：margin、opacity、width、height等数值属性的样式。
###细节记录

- 首先，一个动画（animate方法）中可以包含多个动作，例如：`div.animate({"margin-left":'150px','opacity':'0.5'},10000)`，其中包含两个动作：marginLeft和Opacity，如果继续添加动画，例如` div.animate({"margin-left":'300px'},5000)`，则视为下一个动画，其中包含一个动作：marginLeft，并会在上一个动画完成以后才会启动该动画；并且在动画执行的动作的过程中会将一个动作分解成动作帧，通过定时器进行样式的定时更新渲染，最终完成该动作以及该动画。另：多个动作在一个动画中执行的时候，会交替进行多个动作执行。


- 其次jquery中动画也是采用数据缓存的形式进行保存数据于fx中。


- 再者，动画执行引擎中两类计四个重要方法：同步方法--doAnimate，进行动画的添加和启动；同步方法--custom方法进行动作的定制；异步方法--tick方法，定时函数执行方法，进行一个动画中多个动作的遍历；异步方法--step方法，进行动作的帧的分解以及动画到时的时候下一个动画的启动

jquery动画引擎的执行流程：

将animate添加到$.cache.{dom}.fx上---查看fx中[1]的inpogress，检测动画是否已经启动--未启动则调动queue-dequeue-doAnimate，启动动画--调用custom进行动画中动作的分解定制并添加定时setInterval方法，完成启动，等待异步执行时间的到来---继续执行后续的animate方法将方法压栈到在fx的数组中-----------异步定时时间到时，调用tick方法遍历custom中定制的动作---每一个动作都要调用step方法，实现动作帧的计算并更新该帧，当最后一个动作完成以后启动下一个动画。


###代码部分：

        //同步部分:
        animate: function(prop, speed, easing, callback) {
			var optall = jQuery.speed(speed, easing, callback);

			if (jQuery.isEmptyObject(prop)) {
				return this.each(optall.complete, [false]);
			}

			// Do not change referenced properties as per-property easing will be lost
			prop = jQuery.extend({}, prop);

			function doAnimation() { 

				if (optall.queue === false) {
					jQuery._mark(this);
				}

				var opt = jQuery.extend({}, optall),
					isElement = this.nodeType === 1,
					hidden = isElement && jQuery(this).is(":hidden"),
					name, val, p, e, hooks, replace,
					parts, start, end, unit,
					method;
 
				opt.animatedProperties = {};

                ......
                                            
				for (p in prop) {
					e = new jQuery.fx(this, opt, p); //(一个动画属性看做一个动作)对每一个动作创建一个fx对象，但是一个动画里的动作拥有相同的opt，即拥有相同的complete方法。
					val = prop[p];

					if (rfxtypes.test(val)) {

						// Tracks whether to show or hide based on private
						// data attached to the element
						method = jQuery._data(this, "toggle" + p) || (val === "toggle" ? hidden ? "show" : "hide" : 0);
						if (method) {
							jQuery._data(this, "toggle" + p, method === "show" ? "hide" : "show");
							e[method]();
						} else {
							e[val]();
						}

					} else {
						parts = rfxnum.exec(val);
						start = e.cur();

						if (parts) {
							end = parseFloat(parts[2]);
							unit = parts[3] || (jQuery.cssNumber[p] ? "" : "px");

							// We need to compute starting value
							if (unit !== "px") {
								jQuery.style(this, p, (end || 1) + unit);
								start = ((end || 1) / e.cur()) * start;
								jQuery.style(this, p, start + unit);
							}

							// If a +=/-= token was provided, we're doing a relative animation
							if (parts[1]) {
								end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
							}

							e.custom(start, end, unit);

						} else {
							e.custom(start, val, "");
						}
					}
				}

				// For JS strict compliance
				return true;
			}

			return optall.queue === false ?
				this.each(doAnimation) :
				this.queue(optall.queue, doAnimation);
		},


        //异步部分:

    	// 动作帧的实现
		step: function(gotoEnd) {
			var p, n, complete,
				t = fxNow || createFxNow(),
				done = true,
				elem = this.elem,
				options = this.options;

			if (gotoEnd || t >= options.duration + this.startTime) {
				//当动作在动画执行规定时间外完成的时候将样式置为最终样式，并启动下一个动画
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();

				options.animatedProperties[this.prop] = true;

				for (p in options.animatedProperties) {
					if (options.animatedProperties[p] !== true) {
						done = false;
					}
				}

				if (done) {
					// Reset the overflow
					if (options.overflow != null && !jQuery.support.shrinkWrapBlocks) {

						jQuery.each(["", "X", "Y"], function(index, value) {
							elem.style["overflow" + value] = options.overflow[index];
						});
					}

					// Hide the element if the "hide" operation was done
					if (options.hide) {
						jQuery(elem).hide();
					}

					// Reset the properties, if the item has been hidden or shown
					if (options.hide || options.show) {
						for (p in options.animatedProperties) {
							jQuery.style(elem, p, options.orig[p]);
							jQuery.removeData(elem, "fxshow" + p, true);
							// Toggle data is no longer needed
							jQuery.removeData(elem, "toggle" + p, true);
						}
					}

					// Execute the complete function
					// in the event that the complete function throws an exception
					// we must ensure it won't be called twice. #5684

					complete = options.complete;
					if (complete) {

						options.complete = false;
						complete.call(elem); //启动下一个动画
					}
				}

				return false;

			} else {
				// classical easing cannot be used with an Infinity duration
				if (options.duration == Infinity) {
					this.now = t;
				} else {
					//动画帧计算，根据当前动画启动时间间隔在动画总历时的比重进行帧的计算
					n = t - this.startTime;
					this.state = n / options.duration;

					// Perform the easing function, defaults to swing
					this.pos = jQuery.easing[options.animatedProperties[this.prop]](this.state, n, 0, 1, options.duration);
					this.now = this.start + ((this.end - this.start) * this.pos);
				}
				// Perform the next step of the animation
				this.update();
			}

			return true;
		}
	};
    //异步动作执行，该部分方法会在所有的同步jquery方法执行以后才启动。
    tick: function() {
			var timer,
				timers = jQuery.timers, //其中存储了本次动画的所有动作
				i = 0;

			for (; i < timers.length; i++) {
				timer = timers[i]; //执行动作i，如果执行动作的时间在规定时间以外，返回false
				// Checks the timer has not already been removed
				if (!timer() && timers[i] === timer) {// !timer() 动画执行启动动作1
					//动作执行超时以后返回false会将执行动作的队列的对应动作删除
					timers.splice(i--, 1);
				}
			}

			if (!timers.length) {
				jQuery.fx.stop();//该动画完成，即该定时将结束，调用stop完成定时清空，可以开启下一个定时。
			}
		},



###总结
jquery中动画机制的设置相对较复杂，要理解动画、动作、动作帧的模型，然后配合队列和异步的概念，实现了动画引擎的设计。