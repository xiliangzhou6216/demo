// 用其他函数实现循环


var get=(target)=>target[Symbol.iterator]()//迭代器
var arr=[1,3]
var iterator=get(arr)
while (true) {
  var obj=iterator.next()
  if(obj.done){
    break
  }
  console.log(obj.value)
}

