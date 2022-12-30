
  
  /**   
   * @description  Ajax请求 包含 get post 
   * @param {String} type 请求类型
   * @param {String} url 请求url
   * @param {Object} data 请求数据
   * @param {Function} success 请求成功函数
   * @param {Function} error 请求失败函数
   * @return { String } 无
   */
   Ajax('get','https://api.github.com/users/ruanyf',{foo:'bar',loop:'121'},function(data){
    console.log(data,111111111)
  },function(err){
    console.log(err,54444444444)
  })
   
  
 
   function Ajax(type,url,data,success,error) {
      if(success&&typeof success !='function' ){
        throw new Error(success+'is not function')
      }
      if(error&&typeof error !='function' ){
        throw new Error(error+'is not function')
      }
      var type =type.toLocaleUpperCase()
      if(window.XMLHttpRequest){
         //Firefox、 Opera、 IE7 和其它浏览器使用本地 JavaScript 对象
        var xhr = new XMLHttpRequest()
      }else{
         //IE 5 和 IE 6 使用 ActiveX 控件
        var xhr =new ActiveXObject("Microsoft.XMLHTTP");
      }

      //XMLHttpRequest.send() 方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null
      if(type==='GET'){
        xhr.open(type,url+'?'+handleParams(data))
        xhr.send(null)
      }

      if(type==='POST'){
        // 如果需要像 html 表单那样 POST 数据，使用 setRequestHeader() 来添加 http 头。
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhr.send('foo=bar&lorem=ipsum')
        xhr.open(type,url)
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.send(data)
      }

      xhr.onreadystatechange=function(){  // 当readystate状态变化，callback函数会被调用   这个方法只能用异步的XMLHttpRequest对象
        if (xhr.status===200&&xhr.readyState===XMLHttpRequest.DONE) {
          success?.(xhr.response)
        }else{
          error?.(xhr.response)   
        }
      }

      // 处理请求数据
      function handleParams(obj){
        var o=Object.keys(obj)
        var str=''
        for(var item in o){
              str+=o[item]+'='+obj[o[item]]+(o.length-1!=item?'&':'')
        }
        return str
      }
      
   }