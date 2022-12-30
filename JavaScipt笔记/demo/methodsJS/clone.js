function cloneDeep(source,hash=new WeakMap()) {
  // 校验来源
  if (typeof source !== 'object' && source === null) {
    return source
  }
  // 拷贝数组
  var target = Array.isArray(source) ? [] : {}
  //新增哈希表
  if(hash.has(source)){
     return  hash.get(source)
   }
   hash.set(source,target)


  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof  source[key]=== 'object'&& source === !null) {
        target[key] = clone(source[key],hash)
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

