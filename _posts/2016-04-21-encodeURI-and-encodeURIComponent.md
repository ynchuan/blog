---
layout: post
title: ecodeURI和ecodeURIComponent
category: JS技术
author: ynchuan
tags: 
- js 
---

# 比较encodeURI和encodeURIComponent

        var t="#0#%E5%B1%9E%E5%9C%B0%E5%88%86%E7%B1%BB" 
        decodeURI(t)
        "#0#属地分类"
        var m=decodeURI(t)
        undefined
        encodeURIComponent(m)
        "%230%23%E5%B1%9E%E5%9C%B0%E5%88%86%E7%B1%BB"
        encodeURIComponent(m+"980")
        "%230%23%E5%B1%9E%E5%9C%B0%E5%88%86%E7%B1%BB980"
        encodeURIComponent(m+"980abc")
        "%230%23%E5%B1%9E%E5%9C%B0%E5%88%86%E7%B1%BB980abc"
        decodeURIComponent("%230%23%E5%B1%9E%E5%9C%B0%E5%88%86%E7%B1%BB980abc")
        "#0#属地分类980abc"
        encodeURIComponent(m+"980%abc")
        "%230%23%E5%B1%9E%E5%9C%B0%E5%88%86%E7%B1%BB980%25abc"
        decodeURIComponent("%230%23%E5%B1%9E%E5%9C%B0%E5%88%86%E7%B1%BB980%25abc")
        "#0#属地分类980%abc"