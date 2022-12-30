
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484500&idx=1&sn=83f4df1253f597898b2f74ea9dca9fd9&chksm=9bd7fa5caca0734ad182ba67651882647a71264938eaa98e49c5ff43369b807a094ad16efcd4&scene=178#rd

// LRU算法是一种 缓存淘汰策略     淘汰最久没有访问的数据 , 根据访问的时序来淘汰  例如 手机运行的后台程序、redis等缓存排序、vue keep-live
// LFU 策略  按照访问频率淘汰   
// FIFO是简单的队列，先进先出


//哈希链表  哈希表+双向链表
//好处   查找 删除 插入快 O(1)






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 最近最少使用算法，它是根据时间维度来选择将要淘汰的元素，
// 即删除掉最长时间没被访问的元素

//  hashmap(时间维度)+双向链表 映射
// 将cache理解一条链表（队列），从头到尾，头部最近使用的 ，尾部最少使用的
// 查找快，插入快，删除快，有顺序之分 

// 创建节点
const Node = function (key, value) {
  if (!(this instanceof Node)) {
    return new Node(key, value)
  }

  this.key = key
  this.value = value
  this.next = null
  this.pre = null
}

// 创建链表

const doubleList = function () {
  if (!(this instanceof doubleList)) {
    return new doubleList()
  }

  // 查找节点 迭代每个节点
  const find=function(node){
    const current= this.head
    while (current.key!==node.key) {
      current=node.next
    }
    return current
  }

  //  查找最后一个
  // const findLast=function (node){
  //   const current= this.head
  //   while(current.next!==null){
  //     current=node.next
  //   }
  //   return current
  // }
  // 头部添加节点
  const addFirst = function (node) {

    // node.next =this.head.next
    // this.head.next.pre=node
    // this.head.next=node
    // node.pre=this.head

    node.next = this.head.next
    this.head.next = node
    node.pre = this.head
    node.next.pre = node
    ++this.size
  }

  const remove = function (node) {
    node.pre.next=node.next
    node.next.pre=node.pre
    --this.size
  }

  const removeLast = function () {
    // 链表还没有节点插入
    if(this.tail.pre===this.head){
      return null
    }
    // 删除最后一个
    const last= this.tail.pre
    remove(last)
    return last

  }
  // 创建头节点
  this.head = Node(0, 0)
  // 创建尾部节点
  this.tail = Node(0, 0)
  this.head.next = this.tail
  this.tail.pre = this.head
  this.size = 0
  this.addFirst = addFirst
  this.remove = remove
  this.removeLast = removeLast
}

const LFUCache = function (capacity) {
  this.capacity = capacity
  this.hashMap=new Map()
  this.cache=doubleList()
}

// 读取缓存
LFUCache.prototype.get = function (key) {
  if(!this.hashMap.has(key)){
    return -1 
  }
  
  const value= this.hashMap.get(key).value
  this.put(key,value)
  return value

}

LFUCache.prototype.put = function (key, value) {
  const node = Node(key,value)
  if(this.hashMap.has(key)){
    // 删除链表的节点  一定是同一个引用节点
    this.cache.remove(this.hashMap.get(key))
    this.cache.addFirst(node)
    this.hashMap.set(key,node)

  }else{
    // 缓存容量 达到时，链表移除最后一个节点，hash也要移除
    if(this.capacity===this.cache.size){
      const lastKey =this.cache.removeLast().key
      this.hashMap.delete(lastKey)
    }
    this.cache.addFirst(node)
    this.hashMap.set(key,node)
  }

}

//  hashMap方案  模拟队列
//  hashMap 插入 是有序的    也可以判断key是否存在

class LRUCache {
  constructor(data) {
    this.num = data
    this.cacheMap = new Map()
  }
  get(key) {

    if (!this.cacheMap.has(key)) {
      return -1
    }
    // 获取key的值
    const val = this.cacheMap.get(key)
    this.cacheMap.delete(key)
    // 存入cacheMap
    this.cacheMap.set(key, val)
    return val
  }

  put(key, value) {
    // 判断是否存在
    if (this.cacheMap.has(key)) {
      this.cacheMap.delete(key)
    }
   
    // 超出容器体积，则移除队列首位
    if (this.cacheMap.size === this.num) {
      this.cacheMap.delete(this.cacheMap.keys().next().value)
    }
     // 存入cacheMap
    this.cacheMap.set(key, value)
    
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 数组方案 

class LRUCache {
  constructor(num) {
    this.max = num
    this.keys = []
    this.cacheMap = {}
  }
  get(key) {
    if (this.cacheMap[key]) {
      this.update(key)
      return this.cacheMap[key]
    } else {
      return -1
    }
  }
  update(key) {
    const index = this.keys.indexOf(key)
    if (index > -1) {
      this.keys.splice(index, 1)
    }
    this.keys.push(key)
  }
  put(key, value) {
    this.update(key)
    this.cacheMap[key] = value
    
    if (this.keys.length > this.max) {
      delete this.cacheMap[this.keys[0]]
      this.keys.shift()
    }
  }
}
///////////////////////////////////////////////////////////////////////

// 双向链表节点
var LinkNode = function (key, val) {
  if (!(this instanceof LinkNode)) {
    return new LinkNode(key, val)
  }
  this.key = key
  this.val = val
}
// 双向链表
var DoubleLink = (() => {
  var head
  var tail
  var size
  return function () {
    const addFirst = (node) => {
      node.next = head.next
      node.prev = head
      head.next = node
      node.next.prev = node
      ++size
    }
    const remove = (node) => {
      node.prev.next = node.next
      node.next.prev = node.prev
      --size
    }
    const removeLast = () => {
      if (tail.prev === head) {
        return null
      }
      var last = tail.prev
      remove(last)
      return last
    }
    // 初始化
    if (!(this instanceof DoubleLink)) {
      return new DoubleLink()
    }
    head = LinkNode(0, 0)
    tail = LinkNode(0, 0)
    head.next = tail
    tail.prev = head
    size = 0

    this.addFirst = addFirst
    this.remove = remove
    this.removeLast = removeLast
    this.size = () => size
  }
})()
// LRU
var LRUCache = (() => {
  var map
  var caches
  return function (capacity) {
    const get = (key) => {
      if (!map.has(key)) {
        return -1
      }
      var value = map.get(key).val
      put(key, value)
      return value
    }
    const put = (key, value) => {
      var node = LinkNode(key, value)
      if (map.has(key)) {
        caches.remove(map.get(key))
        caches.addFirst(node)
        map.set(key, node)
      } else {
        if (capacity === caches.size()) {
          var last = caches.removeLast()
          map.delete(last.key)
        }
        caches.addFirst(node)
        map.set(key, node)
      }
    }
    // 初始化
    map = new Map()
    caches = DoubleLink()
    this.get = get
    this.put = put
  }
})()
