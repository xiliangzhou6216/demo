[TOC]

# js和node.js都是采用事件驱动

建立在发布-订阅或观察者模式之上


## 事件驱动在js中 的应用


借助引擎，JavaScript 可以运行在你的浏览器中。


HTML元素是事件发送器（发布者）    注册监听函数是观察者

```js
document.addEventListener('click',function(){

})
```

## 事件驱动在node.js中 的应用

大部分工作也是基于事件的。总是会有一个发送者对象，一些观察者在监听消息

事件主题是 来自进程、 网络的交互、文件

>Node.js 中的所有事件驱动模块都扩展了一个名为 EventEmitter 的根类,EventEmitter 有两种基本方法：on 和 emit


