var a = { name: 1, age: 18 }
var b = {
  name: 'muyiy',
  book: {
    title: "You Don't Know JS",
    price: '45',
  },
}
a.__proto__.qaz=123
// var c=Object.assign(a,b)
b.book.price = "1111111111";
// b.name= "666666666";

if (typeof Object.assign2 !='function'){
  Object.defineProperty(Object,'assign2',{
    value:function (target,...args){
      if(!target){
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to=Object(target)
        for (let index = 0; index < args.length; index++) {
          const element = args[index];
          if(element){
            //遍历出可枚举的所有属性（自身和原型）
            for (const key in element) {
              //考虑到有的对象没有原型  Object.create(null) 这种情况下  element.hasOwnProperty(..) 是有问题的  
              if (Object.prototype.hasOwnProperty.call(element,key)) {
                to[key]=element[key]
              }
            }
          }  
      }
      return to
    },
    // enumerable:false, 默认不可枚举的
    writable:true,
    configurable:true
  })

}



console.log(Object.assign2(a,b,'azzx'),typeof Object.assign2)