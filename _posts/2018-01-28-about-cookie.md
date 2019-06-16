---
layout: post
title: cookie | domain | 跨域 记录
category: js
author: ynchuan
---
# cookie | domain | 跨域 记录

## cookie默认值

- domain: window.location.hostname
- path: path.resolve('../',window.location.pathname)
- expire: Session
- 值中不能有空格逗号分号等特殊符号，需要可以使用escape编码，取值用unescape解码，多个key|value用‘；’连接
- 默认存多值：`document.cookie="id=77; name=bill"`;
- 设置时间：`document.cookie="id=77;expires="+new Date(Date.now()+10*24*60*60*1000).toUTCString()`;
- 删除值：`document.cookie="id=77;expires="+new Date().toUTCString()`，即通过设置过期时间
- 设置domain和path: `document.cookie="id=78;domain=.v.baidu.com;path=/"`
- 可以在同域向其他的path写cookie供其他path页面使用；不能再本域向它域写cookie，不报错但是不生效

## cookie访问限制

- 同domain且 同path或上一层 可以访问到
- 同一个父级或祖先级域名不同根级域名的页面，可以通过设置document.domain为父级或祖先级域名，可以在不同根级域名访问不同cookie


## 跨域方式

- jsonp
- cores  access-control-allow-origin
- document.domain 获取cookie|同根域名可以修改为相同domain通过iframe.contentWindow访问
- parent.postMessage/window.onmessage实现iframe跨域通信
- window.name  通过iframe加载异域写入window.name的页面，加载后重新写入本域名空白页地址，而后可以获取iframe window句柄执行onload，吐出window.name

```javascript
    
    function fetch(opt) {
        var myIframe = document.createElement('iframe');
        myIframe.style.display = 'none';
        document.body.appendChild(myIframe);
        myIframe.src = opt.url;
        myIframe.onload = function() {
            myIframe.src = opt.domainProxy;
            myIframe.onload = function() {
                var name = myIframe.contentWindow.name;
                opt.succ && opt.succ(name);
                document.body.removeChild(myIframe);
            };
        }
    }
    fetch({
        url: 'http://wxx.v.baidu.com:8080/crossDomain/winNameData.html', // 异域下数据代理页面，其中完成window.name='data'
        domainProxy: './winName.html', // 任意本域下空白页即可
        succ: function(data) {
            alert(data);
        }
    });

```

- 其他