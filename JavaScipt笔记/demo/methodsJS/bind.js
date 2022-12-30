Function.prototype.mybind=function(argthis,...args){
  var self=this
  if(!argthis){
    return self
  }
  var fBound =function (){
    return self.apply(argthis,[...args,...arguments])
  }

  return  fBound
}

var obj={a:1}
function test(a,b){
  console.log(this)
  return a+'-------------'+b
}
console.log(test.mybind(obj,123)(12))

switch (key) {
  case value:
    
    break;

  default:
    break;
}





