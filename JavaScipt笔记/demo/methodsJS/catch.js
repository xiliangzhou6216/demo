async function ss(){
console.log(1)
}
console.log(ss())


function ceshi(){

  return new Promise((resolve)=>{

     new Promise(res=>{
       setTimeout(()=>res(1111),2000)
     }).then(res=>{
        // console.log(res)
        resolve(res)
      })
    
  })

}