
function Super(){
  this.name=[1,23]

}
Super.prototype.run=function(){
  return this.name
}

function Children(name){
  Super.call(this,name)
}

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function  proto(Super,Children){
  var prototype=Object.create(Super.prototype)
  prototype.constructor=Children
  Children.prototype=prototype
}
// 将父类原型指向子类
proto(Super,Children)
// 新增子类原型属性
Children.prototype.sayAge = function(){
  
}

var newObj= new Children(121212)


// 这个例子的高效率体现在它只调用了一次Super 构造函数  并且因此避免了在Children.prototype 上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用instanceof 和isPrototypeOf()
// 引用类型属性不会被篡改
