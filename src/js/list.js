
window.onload = function () {
    if (!getCookie('name')) {
        document.querySelector('.shower').innerHTML = `
        <div class="register"><a href="./register.html">注册 &nbsp;|</a></div>
                <div class="login"> <a href="./login.html">登录</a></div>
        `
    }
    else {
        document.querySelector('.shower').innerHTML = `
         <div>欢迎 用户<span>${getCookie('name')}</span></div>
         <div class="goout">退出</div> 
        `
        //点击退出按钮退出账号
        var goout = document.querySelector('.goout')
        goout.onclick = function () {
            layer.confirm('确定要退出登录吗？', { btn: ['确认', '取消'] },
                function () {
                    delCookie('name')
                    document.querySelector('.shower').innerHTML = `
            <div class="register"><a href="./register.html">注册 &nbsp;|</a></div>
                <div class="login"> <a href="./login.html">登录</a></div>
            `
                    layer.msg('退出成功', { icon: 1, timer: 500 })
                }, function () {
                    layer.msg('已取消', { icon: 1, timer: 500 })
                    return false
                });
        }
    }
    pAjax({
        url: '../lib/list.php',
        dataType: 'json',
        method:'get'
    }).then(res => {
        var data = res.data
        // console.log(data)
        // console.log(arr);
        
        // var str = ''
        // for (var i = 0; i < arr.length; i++) {
        //     console.log(arr[i].name);
        //     // str += `
        //     // <div class="box">
        //     // <img src="${arr[i].imgpath.split('==========')[0]}" alt="">
        //     // <h3>${arr[i].name}</h3>
        //     // <p>${arr[i].introduce}</p>
        //     // <button>查看详情</button>
        //     // </div>
        //     //     `
        //         // document.querySelector('.test1-con').innerHTML = str
        // }
        var pageSize = 4;
          new Page("page", {
              language: {
                  first: '首页',
                  prev: '上一页',
                  next: '下一页',
                  last: '尾页'
              },
              pageData: {
                  pageSize,
                  total: data.length
              },
              show: function(currentPage) {
                  var tmp = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                //   console.log(tmp);
                  var html = '';
                  tmp.forEach(v => {
                      html += `
                            <div class="box">
                            <img src="${v.imgpath.split('==========')[0]}" alt="">
                            <h3>${v.name}</h3>
                            <p>${v.introduce}</p>
                            <button><a href="./detail.html?id=${v.id}">查看详情</a></button>
                            </div>
                      `
                      document.querySelector('.test1-con').innerHTML=html
                  })
              }
          })
    })
}


