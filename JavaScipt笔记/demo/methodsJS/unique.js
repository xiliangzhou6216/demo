
// var arr = [ 1, 2, 1, 2, '1', '11',NaN,NaN] 

/**
 * 
 * 高效方法
 */
[...new Set(arr)]

Array.from(new Set(arr))

/**
 * 返回所有的字符串的数组
 * 针对于数组是字符串 去重
 * [1,2,'1'] // ['1','2']
 */
(function unique(){
  if(!Array.isArray(arr)) return []
  var obj={}
  arr.forEach(item=>{
    if(!obj[item]){
      obj[item]=item
      }
  })
  return Object.keys(obj)
}(arr))

/**
 * 
 * 利用 Map对象键可以任意值 
 * 可以去重数组所有的任意的元素
 */

(function unique(){
  var obj=new Map()
  arr.forEach(item=>{
    if(!obj.has(item)){
          obj.set(item,item)
      }
  })
  return Array.from(obj.keys())
}(arr))

/**
 * 
 * 利用 数组includes
 * 
 */

(function unique(){
  var newArr=[]
  arr.forEach(item=>{
    if(!newArr.includes(item)){
      newArr.push(item)
    }
  })
  return newArr
}(arr))

/**
 * 
 * 利用 reduces+includes
 * 
 */

(function unique(){
  return arr.reduce((acc,item)=>{
    !acc.includes(item)?acc.push(item):''
  return  acc
  },[])
}(arr))
