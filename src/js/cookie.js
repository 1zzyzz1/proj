// function setCookie(key,value,expires){
//     const time=new Date()
//     time.setTime(time.getTime()-1000*60*60*8+expires*1000)
//     document.cookie=`${key}=${value};expries=${time}`
// }
function setCookie(name, value, day) {

    if (day !== 0) {
  
      var expires = day * 24 * 60 * 60 * 1000;//转化为秒
  
      var date = new Date(+new Date() + expires);
  
      document.cookie = name + '=' + value + ';expires=' + date.toUTCString();
  
    } else {
  
      document.cookie = name + "=" + escape(value);
  
    }
  
  }
function getCookie(key){
    const cookieArr=document.cookie.split(';')
    let value=''
    cookieArr.forEach(item=>{
        if(item.split('=')[0]===key){
            value=item.split('=')[1]
        }
    })
    return value;
}
function delCookie(key){
    setCookie(key,'',-1)
}