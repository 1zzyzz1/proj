//如果已经登录，显示登录信息
window.onload = function () {
    var index = layer.load(2, {
        shade: [0.5,'#fff'], //0.1透明度的白色背景
        time:500
      });
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
        url: '../lib/scenics.php',
        method: 'get',
        detaType: 'json',
        data: { pid: 2 }
    }).then(res => {
        let obj = JSON.parse(res)
        // console.log(obj);
        let arr = obj.data
        // console.log(arr);
        var footCon2 = document.querySelector('.foot-con2')
        var str = ''
        for (var i = 0; i < arr.length; i++) {
            str += `
            <div class="box">
            <img src="${arr[i].imgpath}" alt="">
            <h3>${arr[i].name}</h3>
            <p>${arr[i].introduce}</p>
            </div> 
            `
            footCon2.innerHTML = str
        }

    }

    )

}
//回到顶部功能实现
$(window).scroll(function () {
    let timer;
    if ($(window).scrollTop() >= 1000) {
        $('.totop').animate({
            right: -20
        }, 100, 'swing')
            .click(function () {
                let n = $(window).scrollTop();
                timer = setInterval(function () {
                    n -= 50;
                    $(window).scrollTop(n);
                    if ($(window).scrollTop() <= 0) {
                        clearInterval(timer);
                    }
                }, 10)
            })

    } else {
        $('.totop').animate({
            right: -80
        }, 100, 'swing')
    }
})

