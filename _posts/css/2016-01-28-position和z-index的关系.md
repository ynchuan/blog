---
layout: default
title: position与z-index关系小记
category: CSS开发
author: ynchuan
---

ie7+、chrome、firefox等浏览器在标签为pa(position为absolute)的时候会跟周边的正常流元素产生堆叠层次关系，但是对于多个同级pa的标签放在一起的时候，他们之间并不会产生层叠上下层级关系，一旦添加z-index属性的时候，会产生层叠关系，即z-index相同的时候，会根据标签的上下关系产生层叠关系，此时再操作pa标签内部标签的pa或者pv（position为relative）标签的z-index的时候是不会改变层叠效果的。

ie7-则是在pa或者pv的时候会和周边正常流产生层叠关系，胆识会在多个同级pa或者pv标签一起的时候，同时没有z-index属性的时候，就会产生层叠关系。