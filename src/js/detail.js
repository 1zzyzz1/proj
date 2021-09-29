
window.onload = function () {
    //判断是否登录
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
    // console.log(typeof location.search);

    let str = location.search//获取传过来的ID
    // console.log(str.match(/\d/)[0]-0);
    var id = str.split('=')[1]
    pAjax({//发起ajax请求
        url: '../lib/detail.php',
        method: 'get',
        dataType: 'json',
        data: { id }
    }).then(res => {
        // console.log(res);
        var data = res.data;
        var stock = data.stock - 0
        // console.log(data.stock);
        var imgpath = data.imgpath.split('========')//获取图片地址
        // console.log(imgpath);
        document.querySelector('.box').innerHTML = `
        <img src="${data.imgpath.split('==========')[0]}" alt="" >
        <div class="showd"></div>
        `
        document.querySelector('.box').setAttribute('index', `${stock}`)
        var str = ''
        for (var j = 0; j < imgpath.length; j++) {
            str += `
            <img src="${data.imgpath.split('========')[j]}" alt="">
            `
        }
        document.querySelector('.smimg').innerHTML = str
        document.querySelector('.right>p').innerHTML = `${data.name}`
        document.querySelector('.right>h3').innerHTML = `${data.introduce}`
        document.querySelector('.right>i>span').innerHTML = `${data.price}`
        var inp = document.querySelector('input[type=text]')
        // console.log(inp);
        var sto = document.querySelector('.box').getAttribute('index') - 0;//获取库存值
        // var sto = $('.box').prop('index')
        // console.log(sto);
        var nodelist = document.querySelectorAll('.smimg>img')
        for (let i = 0; i < nodelist.length; i++) {
            nodelist[i].onclick = function () {
                var urls = this.getAttribute('src')
                // console.log(111);
                // console.log(urls);
                // document.querySelector('.box>img').setAttribute('src',`${urls}`)
                $('.box>img').prop('src', urls)
            }
        }
        var i = 0;
        //点击+按钮增加
        document.querySelector('.incerse').onclick = function () {
            i++;
            document.querySelector('.del').removeAttribute('disabled')
            if (i >= sto) {
                i = sto//当大于库存时+禁用
                layer.msg('库存不足', {
                    time: 800
                })
                document.querySelector('.incerse').setAttribute('disabled', 'true')
            }
            inp.value = i
        }
        document.querySelector('.del').onclick = function () {
            i--;
            document.querySelector('.incerse').removeAttribute('disabled')
            if (i <= 0) {
                i = 0//当大于库存时+禁用
                document.querySelector('.del').setAttribute('disabled', 'true')
            }
            inp.value = i
        }

        var box = document.querySelector('.box')
        var showd = document.querySelector('.showd')
        var bigger = document.querySelector('.bigger')
        box.addEventListener('mouseenter', function () {
            showd.style.display = 'block'
            bigger.style.display = 'block'
        })
        //鼠标离开隐藏遮挡层与大图片
        box.addEventListener('mouseleave', function () {
            showd.style.display = 'none'
            bigger.style.display = 'none'
        })
        box.addEventListener('mousemove', function (e) {
            //鼠标相对于box盒子的位置
            var x = e.pageX - 100
            var y = e.pageY - 225
            // console.log(x,y);
            // console.log(x,y);
            var x1 = x - showd.offsetWidth / 2
            var y1 = y - showd.offsetHeight / 2
            //进行判断，让遮挡层不会跟随鼠标出去
            var maxWid = box.offsetWidth - showd.offsetWidth
            if (x1 < 0) {
                x1 = 0
            }
            else if (x1 > maxWid) {
                x1 = maxWid
            }
            if (y1 < 0) {
                y1 = 0
            }
            else if (y1 >= maxWid) {
                y1 = maxWid
            }
            var seturl = document.querySelector('.box>img').getAttribute('src')
            // console.log(seturl);
            $('.bigger').css('background', `url(${seturl}) no-repeat`)
            $('.bigger').css("backgroundSize", `800px 800px`)
            //遮挡层跟随鼠标移动
            showd.style.left = x1 + 'px'
            showd.style.top = y1 + 'px'
            //遮挡层最大移动距离：maxWid
            //大图片最大移动距离
            let xpercent = parseInt(showd.style.left) / box.offsetWidth
            let ypercent = parseInt(showd.style.top) / box.offsetHeight
            let bigmovex = 800 * xpercent
            let bigmovey = 800 * ypercent
            // console.log(bigmovex);
            bigger.style.backgroundPosition = `-${bigmovex}px -${bigmovey}px`;
        })
        document.querySelector('.btn-primary').onclick = function () {
            let name = getCookie('name')
            let num = inp.value-0
            // console.log(num);
            if (!getCookie('name')) {
                alert('请先登录')
                location.href = './login.html'
            } else {
                //先进行判断是否已经有数据          
                var data = localStorage.getItem('data')
                if (data) {
                    data = JSON.parse(data)
                    // console.log(data);
                    //判断本地数据中是否有符合条件的那一条数据
                    let arr2 = data.filter(item => {
                        return (getCookie('name') == item.name && id == item.id)
                    })
                    // console.log(arr2);
                    //如果数据存在，则num增加
                    if (arr2.length) {
                        data.forEach(item => {
                            if (getCookie('name') == item.name && id == item.id) {
                                item.num = (arr2[0].num - 0)+num
                            }
                        });
                    }
                    else {
                        data.push({ name, id, num })
                    }
                    localStorage.setItem("data", JSON.stringify(data))
                }
                //如果本地存储中没有这条数据
                else{
                    localStorage.setItem('data',JSON.stringify([{name,id,num}]))
                    console.log(111);
                }                
                layer.msg('加入成功',{
                    icon:1,
                    time:500
                })
            }
        }
    })
}
