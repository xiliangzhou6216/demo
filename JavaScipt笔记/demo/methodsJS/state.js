let memoizedStates = [] // 存储state
let index = 0

function useState(initialState) {
  // 判断memoizedStates有没有缓存值，没有则还是个初始化的useState
  memoizedStates[index] = memoizedStates[index] || initialState
  let currentIndex = index
  debugger

  function setState(newState) {
    memoizedStates[currentIndex] = newState // 直接替换
    // render() // 进行视图更新
  }

  return [memoizedStates[index++], setState]
}
const [state, setState] = useState(0)
console.log(state)
setState(2)

console.log(state)

