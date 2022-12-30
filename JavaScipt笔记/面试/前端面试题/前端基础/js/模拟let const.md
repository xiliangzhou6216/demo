## es5 写 const 和 let


### let

闭包的形式或者立即执行函数的形式来定义不会被污染的变量
```js

(function(){var a = 1;console.log(a)})();console.log(a)

```

### 模拟const

- 变量指向内存指针不能修改（基本类型和引用类型）


**注意**
- 不是挂载window
- 不能修改
- 不能删除


1. Object.defineProperty() 模拟

```js
function _const(key,value){
  window[key]=value
  let val=null
  Object.defineProperty(window,key,{
    configurable:false, //不能删除
    enumerable:false, // 不可枚举
    get(){
      val=value
      console.log('获取')
      return val
    },
    set(newValue){
      console.log('设置',value)
      if(val!==newValue){
        throw new Error('该值不能修改')
      }
    }
  })
}

_const('a',11)
console.log(a) // 11

delete a // false

a=22 // 报错

```

2. Object.freeze()模拟
>冻结一个对象，不能给这个对象 增加属性或者删除属性，修改已有属性的属性描述信息以及已有属性的值
```js
// 冻结对象、数组
const obj={a:1}

const  oo= Object.freeze(obj)

oo===obj // true


// 说明只能浅冻结   引用类型属性的值  是可以变化的
const obj1={
  o:{}
}

Object.freeze(obj1)
obj1.o.a=1

obj1.o.a // 1
```



