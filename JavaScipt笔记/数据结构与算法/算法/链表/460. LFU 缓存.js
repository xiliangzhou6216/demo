



//  两个hashmap+N双向链表
//  lfu  通过频率和时间维度 去淘汰数据 优先频率
// 时间复杂度 O(1)



// 使用场景


// 创建节点
const Node = function (key, value) {
  if (!(this instanceof Node)) {
    return new Node(key, value)
  }

  this.key = key
  this.value = value
  this.next = null
  this.pre = null
  this.freq = 1
}

// 创建链表

const doubleList = function () {
  if (!(this instanceof doubleList)) {
    return new doubleList()
  }

  // 头部添加节点
  const addFirst = function (node) {
    node.next = this.head.next
    this.head.next = node
    node.pre = this.head
    node.next.pre = node
  }

  // 移除节点
  const remove = function (node) {
    node.pre.next = node.next
    node.next.pre = node.pre
  }

  // 创建头节点
  this.head = Node()
  // 创建尾部节点
  this.tail = Node()
  this.head.next = this.tail
  this.tail.pre = this.head
  this.addFirst = addFirst
  this.remove = remove
}

const LFUCache = function (capacity) {
  // 容量
  this.capacity = capacity
  // key-value hash表
  this.hashMap = new Map()
  // 频率 hash表
  this.freqMap = new Map()

  // 最小频率链表  用于容量满了后  删除频率哈希表中 最小频率对应得链表
  this.minFreq = 0
  this.size = 0
}

// 读取缓存
LFUCache.prototype.get = function (key) {
  if (!this.hashMap.has(key)) {
    return -1
  }

  const node = this.hashMap.get(key)
  this.incFreq(node)
  return node.value
}

LFUCache.prototype.put = function (key, value) {
  if (this.capacity === 0) {
    return
  }
  // key -value表
  const node = this.hashMap.get(key)
  if (node) {
    node.value = value
    this.incFreq(node)
  } else {
     // 如果容量已被使用完，则需要移除 最不经常使用 的节点，以空出容量
    if (this.capacity === this.size) {
      const minFreqList = this.freqMap.get(this.minFreq)
      this.hashMap.delete(minFreqList.tail.pre.key)
      // 将该链表的尾节点的前一个节点移除(尾节点的前一个节点才是有效节点，尾节点充当哨兵作用)
      minFreqList.remove(minFreqList.tail.pre)
      this.size--
    }
    const newNode = Node(key, value)
    this.hashMap.set(key, newNode)
    // 新元素都是频率为1
    let curList = this.freqMap.get(1)
    // 频率为1 双向链表不存在时 需要创建
    if (!curList) {
      curList = doubleList()
      // 添加链表
      this.freqMap.set(1, curList)
    }
     // 将新节点放入双向链表中，同时更新 size / minFreq
    curList.addFirst(newNode)
    this.minFreq = 1
    this.size++
  }
}

// 更新节点的频率
LFUCache.prototype.incFreq = function (node) {
  let freq = node.freq
  // 在频率哈希表中找到改节点 对应的链表
  let freqList = this.freqMap.get(freq)

  // 将节点从 freq对应的链表中删除
  freqList.remove(node)

  // 不在频率哈希表，该链表是空链表
  if (this.minFreq === freq && freqList.head.next === freqList.tail) {
    this.minFreq = freq + 1
  }
  // 该节点频率增加
  node.freq++

  // 将节点增加到freq+1对应的链表中
  let lastList = this.freqMap.get(freq + 1)
  // 是否有对应freq+1对应的链表
  if (!lastList) {
    lastList = doubleList()
    // 添加链表
    this.freqMap.set(freq + 1, lastList)
  }

  lastList.addFirst(node)
}
