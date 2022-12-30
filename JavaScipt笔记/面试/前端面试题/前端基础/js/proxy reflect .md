  ## Reflect(反射对象)

>通过反射（Reflection）机制，可以访问、检测和修改对象的内容状态和行为

 ES5中Object的一些方法统一重构到ES6的Reflect对象上，保持Object的简洁，各司其职；

 ## Proxy(代理对象)

 >Proxy类可以代理目标对象的全部行为，和Reflect对象的常用方法一一对应


 ### 


 ```js

let obj = {
  a: '1'
};

let handler = {
  //下一行中的set是Proxy支持的操作，意思是需要拦截target的设置值的操作，
  set(target, key, value, receiver) {
    console.log("set");
    //下一行执行的是Reflect的set函数，是它最终执行了对target对象属性的操作。
    Reflect.set(target, key, 100, receiver)
  }
};

let objProxy = new Proxy(obj, handler);
objProxy.a = '2';

 ```