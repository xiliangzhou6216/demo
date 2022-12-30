class Promise {
  constructor(executor) {
    // Promise存在三个状态（state） pending、fulfilled、rejected
    // 成功的值
    this.value = undefined
    // 拒绝的值
    this.reason = undefined
    // 初始化的状态
    this.state = 'pending'
    // 成功存放的数组
    this.onResolveCallbacks = []
    // 失败存放的数组
    this.onRejectCallbacks = []
    let resolve = (value) => {
      if (this.state === 'pending') {
        // 依次执行成功队列中的函数，并清空队列
        const runResolve=(value)=>{
          let cb;
          while (cb=this.onResolveCallbacks.shift()) {
            cb()
          }
        }
        // 依次执行失败队列中的函数，并清空队列
        const runReject=(value)=>{
          let cb;
          while (cb=this.onResolveCallbacks.shift()) {
            cb()
          }
        }

        if(value instanceof Promise){
          value.then(val=>{
            // resolve调用后，state转化为成功态
          this.state = 'fulfilled'
          // 储存成功的值
          this.value = val
          // 一旦resolve执行，调用成功数组的函数
          runResolve()
          },err=>{
            this.state = 'rejected'
            this.reason = reason
            runReject()
          })
        }else{
          this.state = 'fulfilled'
          this.value = value
          runResolve()
        }
      }
    }

    let reject = (reason) => {
      if (this.state === 'pending') {
        // 依次执行失败队列中的函数，并清空队列
        const runReject=(value)=>{
          let cb;
          // resolve调用后，state转化为失败
          this.state = 'rejected'
          // 储存失败的值
          this.reason = reason
          while (cb=this.onRejectCallbacks.shift()) {
            cb()
          }
        }
        runReject()
      }
    }
    // 如果 executor执行报错 ，直接执行reject
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onResolve, onReject) {
    // then方法可以调用多次 onResolve, onReject 不能同步调用  必须异步调用 setTimeout解决异步问题  也就是确保onResolve/onReject异步执行
    // 不异步调用会报`ReferenceError: Cannot access 'promise2' before initialization`，变量在初始化之前被访问  因为let声明是执行上下文阶段执行的，此时
    // new Promise（xxx）已经先执行了 类似 letfoo=(foo+5)
    onResolve = typeof onResolve === 'function' ? onResolve : (val) => val
    onReject = typeof onReject === 'function'  ? onReject : (err) => {  throw err  }
    let promise2 = new Promise((resolve, reject) => {

      if (this.state === 'fulfilled') { // 成功态
        setTimeout(() => {
          try {
            let x = onResolve(this.value) // onResolve函数没有返回值  onResolve(this.value)直接执行
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      if (this.state === 'rejected') { // 失败态
        setTimeout(() => {
          try {
            let x = onReject(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      // 当异步调用resolve/rejected时 将onResolve/onReject收集暂存到集合中
      
      if (this.state === 'pending') {  // 等待态
        this.onResolveCallbacks.push(() => {
          try {
            let x = onResolve(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })

        this.onRejectCallbacks.push(() => {
          try {
            let x = onResolve(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
    })

    return promise2
  }
  catch(fn){
   return this.then(null,fn)
  }
 
  finally(fn){
    return this.then(
        value  => Promise.resolve(fn()).then(() => value),
        err => Promise.resolve(fn()).then(() => { throw err })
      );
  }

  // resolve 方法
  static resolve(value){
    if(value instanceof Promise) return value
    return new Promise((resolve,reject)=>resolve(value))
  }

  // reject 方法
  static  reject(value){
    return new Promise((resolve,reject)=>reject(value))
  }

  // all 方法
  static  all(promises){
    let results =[]
    let promiseCount= 0
    return new Promise((resolve,reject)=>{
      if(promises.length===0) return resolve([])
      for (let iterator of promises) {
        Promise.resolve(iterator).then(data=>{
          promiseCount++
          results.push(data)
          if(promiseCount===promises.length){
            return  resolve(results)
          }
        },err=>{
          return reject(err)
        }) 
      }
    })
  }

  // race 方法
  static  race(promises){
    return new Promise((resolve,reject)=>{
      if(promises.length===0) return 
        promises.forEach(p=>{
          Promise.resolve(p).then(resolve,reject) //  resolve,reject是一个函数，不用做他处理
        })
    })
  }
}


function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // reject报错
    return reject(new TypeError('error 循环引用'))
  }

  // 防止多次调用
  let called

  // x不是null且函数或者对象
  if (x != null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      // 声明 x的then方法
      let then = x.then
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') {
        // 第一个参数是this,后面是成功的回调和失败的回调
        then.call(
          x,
          (y) => {
            // 成功和失败只能调用一个
            if (called) return
            called = true
            // resolve的结果依旧是promise 那就继续解析  这个y是返回的promise.resolve(y)
            resolvePromise(promise2, y, resolve, reject)
          },
          (err) => {
            // 成功和失败只能调用一个
            if (called) return
            called = true
            reject(err) // 失败了就失败了
          }
        )
      } else {
        // 有可能对象  直接调用
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      // 如果then出错了那就不要在继续执行了
      reject(error) // 失败了就失败了
    }
  } else {
    resolve(x)
  }
}



