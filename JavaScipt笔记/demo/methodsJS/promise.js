
/*
*https://zhuanlan.zhihu.com/p/58428287
*https://mengera88.github.io/2017/05/18/Promise%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/
*创建 new NewPromise时 传给NewPromise的回调函数，接着会调用NewPromise的then方法  注册异步完成操作后的onFulfilled 回调函数，放在callback队列里
*当异步操作执行成功后 会调用resolve(value)方法,执行then方法 将callback队列里回调执行
*
**
*NewPromise里面的then函数仅仅是注册了后续需要执行的代码，真正的执行是在resolve方法里面执行的
*/

function NewPromise(fn){
  this.callbacks=[]
  this.value =''
  this.state ='pending'
 
  // resolve函数
  this.resolve=function(value){
      this.state = 'fulfilled';//改变状态
      this.value =value //保存结果
      this.callbacks.forEach(item => {
        item(value)
      });
      // setTimeout(() => {
       
      // }, 500);
  }
  // reject函数
  this.reject=function(value){    

  }
  fn(this.resolve.bind(this))  
}

 // then函数  可以用观察者模式 理解
 
NewPromise.prototype.then=function(onFulfilled){
  console.log(this.state)
  if(this.state==='pending'){ // 在调用resolve(value)之前，添加到callbacks队列中
    this.callbacks.push(onFulfilled)
  }else{ //在调用resolve(value)之后，直接执行回调，返回结果
    onFulfilled(this.value)
  }
  return this
}

var n= new NewPromise((resolve,rej)=>{
  resolve('5秒');
})
n.then(resolve=>{console.log('111',resolve)})
n.then(resolve=>{console.log('222',resolve)})

setTimeout(() => {
  n.then(resolve=>{console.log('3333',resolve)})
},1000);

//```````````````````````````````````````````````````````````````````````




function NewPromise(fn){
  this.callbacks=[]
  this.value =''
  this.state ='pending'
 
  // resolve函数
  this.resolve=function(value){

      if (value && (typeof value === 'object' || typeof value === 'function')) { // value是个NewPromise实例
        var then = value.then;
          if (typeof then === 'function') {
              then.call(value, this.resolve.bind(this));// 
              return;
          }
      }

      this.state = 'fulfilled';//改变状态
      this.value =value
      this.callbacks.forEach(item => {
        this.handle(item)
      });
  }
  // reject函数
  this.reject=function(error){    
    this.state = 'rejected';
    this.value =error
    this.callbacks.forEach(item => {
      this.handle(item)
    });

  }
  fn(this.resolve.bind(this),this.reject.bind(this))  
}

 // then函数
NewPromise.prototype.then=function(onFulfilled){
  return new NewPromise((resolve,rej)=>{
    this.handle({
      onFulfilled:onFulfilled||null,
      resolve:resolve
    })
  })
}


window.arr=[]
NewPromise.prototype.handle=function(fn){

  if(this.state==='pending'){
    this.callbacks.push(fn)
    arr.push(fn)
    return;
  }
  // then没有传递什么东西
  if(!fn.onFulfilled){
    fn.resolve(this.value)
    return;
  }

  const val=fn.onFulfilled(this.value) //当前的NewPromise的onFulfilled被执行   没有返回值 undefined
  // console.log(val,1111111111)
  fn.resolve(val); // 下一个NewPromise的值为空

}
new NewPromise((resolve,rej)=>{
  resolve('5秒')
 }).then(res=>{ return new NewPromise((resolve,rej)=>{
  console.log(res)
  setTimeout(()=>{  
    resolve('6秒') 
  },1000)
})}).then(resolve=>{console.log('66666',resolve)})

