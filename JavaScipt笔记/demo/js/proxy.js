/*
 * @Description: 
 * @Version: 2.0
 * @Autor: xiliang
 * @Date: 2021-06-01 17:01:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-30 10:12:09
 */
var obj = {
  name:'码不停息',
  age:18,
  haha:{
    name:'xxx',
  },
  love:['吃饭','睡觉','打豆豆']
}

/**
* @description:  监听对象的变化
* @param {object|function} obj
* @return void
* @author: xiliang
*/

function observe(obj) {
  if(typeof obj !== 'object'||obj==null){
    return
  }
  
  // 监听数组变化
  if(Array.isArray(obj)){
     Object.setPrototypeOf(obj,newProto)

    for (const value of obj) {
      observe(value)
    }
  }else{
  // 监听对象变化
    for (const key in obj) {
      definePropertyHandle(obj,key,obj[key]) 
    }

  }

}


/**
* @description: 修改对象可以监听
* @param { object } obj
* @param { string } key
* @param { any } val
* @return void
* @author: xiliang
*/

// 直接在set里面 obj[key]=newval 又会触发set 会陷入无限循环

function definePropertyHandle(obj,key,val) {
observe(val)
Object.defineProperty(obj,key,{
  get(){
    console.log('读取')
    return  val
  },
  set(newval){
    console.log('监听赋值成功',newval)
    if (newval === val) return
    observe(newval)
    val=newval
  }
})
}


/**
* @description: 给对象新增属性
* @param { object } obj
* @param { string } key
* @param { any } val
* @return void
* @author: xiliang
*/

function set(obj,key,val) {
definePropertyHandle(obj,key,val)
}



const originProto=Array.prototype

const newProto=Object.create(originProto) // 先克隆一份Array的原型出来
const methodsToPatch=['push','pop','shift','unshift','splice','sort','reverse']

methodsToPatch.forEach(item=>{
newProto[item]=function (){
  console.log('监听赋值成功',item)
  // 执行原始操作
  originProto[item].apply(this,arguments)
}

})

observe(obj)
console.log(obj.love.push(121212))