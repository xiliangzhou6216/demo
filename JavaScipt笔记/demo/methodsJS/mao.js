/*
 * @Description: 
 * @Version: 2.0
 * @Autor: xiliang
 * @Date: 2021-02-08 16:33:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-06 14:01:46
 */
var q = [10, 5, 1, 3]

function mao(source) {
  var myArr = []
  for (var i = 0; i < source.length - 1; i++) {
    var done=true;//排序已经完成了 设置个标志位
    //source.length - 1-i 减少内次循环次数
    for (var j = 0; j < source.length - 1-i; j++) {
      if (source[j] > source[j + 1]) {
        var tem = source[j]
        source[j] = source[j + 1]
        source[j + 1] = tem
        done=false
      }
    }
    if(done){
      break
    }
  }
  return source                                                              
}

function ss(myArr) {
  for (let i= 0; i < myArr.length - 1; i++) {
    for (let j = 0; j < myArr.length - 1; j++) {
      if (myArr[j] > myArr[j + 1]) {    
        [myArr[j], myArr[j + 1]] = [myArr[j + 1], myArr[j]]
      }
    }
  }
  return myArr
}



for (let index = 0; index < array.length; index++) {
  const element = array[index];
  
}


