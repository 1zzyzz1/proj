
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
    let data = localStorage.getItem('data')//获取本地存储的数据
    let tbody = document.querySelector(".shop tbody")//获取表格标签
    if (!data || data.length == 0) {//进行判断，如果本地没有数据，
        document.querySelector('.shop').innerHTML = `<p>购物车空空如也，去 <span><a href="./list.html">产品中心</a></span> 看看吧</p>`
    } else {
        data = JSON.parse(data)//本地数据转json格式，得到一个伪数组
        // console.log(data);
        var ids = []//定义一个空数组用来接收商品id
         crr = data.map(v => {
            if (v.name === getCookie('name')) {
                return v.id
            }
        });
        var brr = []
        for (let i = 0; i < crr.length; i++) {//循环遍历数组长度，拿到每一个ID
            if(crr[i] != undefined){
                brr.push(crr[i])
            }
        }
        if(brr.length==0){
            document.querySelector('.shop').innerHTML=`
            <p>购物车空空如也，去 <span><a href="./list.html">产品中心</a></span> 看看吧</p>
            `
            return
        }
        var ids = brr.join(',') 
        // console.log(ids);
        pAjax({//发起ajax请求，从数据库通过ID拿到数据
            url: '../lib/cart.php',
            method: 'get',
            data: { ids },
            dataType: 'json'
        }).then(res => {
            console.log(res);
            let newData = res.data;//获取到的数据
            let newStr = ''//定义一个空字符串用来拼接
            for (let j = 0; j < newData.length; j++) {//遍历数组进行页面渲染
                newStr += `
                <tr lid="${newData[j].id}">
                <td><input type="checkbox" name="" id=""></td>
                <td><img src="${newData[j].imgpath.split('========')[0]}" alt=""></td>
                <td>${newData[j].name}</td>
                <td>${newData[j].price}</td>
                <td><button class="del">-</button><input class="tes" index="${newData[j].stock}" type="text" value="${data[j].num}"><button class="inc">+</button></td>
                <td class="tolprice">${newData[j].price * data[j].num}</td>
                <td><button class="remove">移除</button></td>
            </tr>
                `
            }
            tbody.innerHTML = newStr//页面渲染完成
            let tess = document.querySelectorAll('.tes')//中间那个文本框
            let tolprice = document.querySelectorAll('.tolprice')//所有的小计标签
            // console.log(tolprice);
            let adds = document.querySelectorAll('.inc')
            let dels = document.querySelectorAll('.del')
            var tolnum = 0//总数量
            var tolpri = 0//总价
            let checks = document.querySelectorAll('input[type=checkbox]')//获取所有的复选框
            for (let a = 0; a < adds.length; a++) {//遍历加号按钮
                adds[a].onclick = function () {//点击事件
                    let num = this.previousElementSibling.getAttribute('index') - 0//获取库存
                    //  console.log(num);
                    tolnum++
                    tolpri += (newData[a].price-0)
                    dels[a].removeAttribute('disabled')//点击加号后减号按钮可以点击
                    tess[a].value++//文本框值加1
                    if (tess[a].value >= num) {//判断如果文本框的值大于库存
                        tess[a].value = num
                        adds[a].setAttribute('disabled', 'true')
                        layer.msg('库存不足', { time: 800 })//提示库存不足
                    }

                    this.parentElement.nextElementSibling.innerHTML = `${(tess[a].value - 0) * newData[a].price}`//小计的值更改
                    document.querySelector('.tolnum').innerHTML = tolnum
                    document.querySelector('.priceAll').innerHTML = tolpri
                    
                    let id = this.parentElement.parentElement.getAttribute('lid')
                    console.log(data);
                    var obj = data.find(v=>v.name == getCookie('name')&&v.id == id)
                    obj.num = tess[a].value
                    localStorage.setItem('data',JSON.stringify(data))
                }
            }
            for (let b = 0; b < dels.length; b++) {//减号进行遍历
                dels[b].onclick = function () {
                    tess[b].value--
                    tolnum--
                    tolpri -= (newData[b].price-0)
                    adds[b].removeAttribute('disabled')
                    // console.log(dels[b]);
                    if (tess[b].value <= 0) {
                        tess[b].value = 0
                        dels[b].setAttribute('disabled', 'true')
                    }
                    this.parentElement.nextElementSibling.innerHTML = `${(tess[b].value - 0) * newData[b].price}`
                    document.querySelector('.tolnum').innerHTML = tolnum
                    document.querySelector('.priceAll').innerHTML = tolpri
                    let id = this.parentElement.parentElement.getAttribute('lid')
                    console.log(data);
                    var obj = data.find(v=>v.name == getCookie('name')&&v.id == id)
                    obj.num = tess[b].value
                    localStorage.setItem('data',JSON.stringify(data))
                }
            }
            var alln =0
            var allp = 0
            for(i=0;i<checks.length-2;i++){
                alln += (tess[i].value-0)
                allp += (tolprice[i].innerText-0)
            }
            // console.log(checks);
            var arr2 = []//定义数组用来接收商品前面的复选框
            var arr3 = []
            for (let c = 0; c < checks.length; c++) {//遍历所有复选框
                if (c > 0 && c < checks.length - 1) {//进行判断，加入商品前复选框
                    arr2.push(checks[c])
                }else{
                    arr3.push(checks[c])//加入全选复选框
                }
                // console.log(alln,allp);
                // console.log(arr2);
                checks[c].onclick = function () {
                    if (c == 0 || c == checks.length - 1) {//判断当点击为全选框时
                        if (checks[c].checked) {//当全选框处于选中状态
                            for(i=0;i<arr3.length;i++){
                                arr3[i].checked = true
                            }
                            for(j=0;j<arr2.length;j++){
                                arr2[j].checked = true
                                tolnum += (tess[j].value-0)
                                tolpri += (tolprice[j].innerText-0)
                            }
                            
                             
                            console.log(alln,allp);
                        } else {//当全选框处于非选中状态
                            for(i=0;i<arr2.length;i++){
                                arr2[i].checked = false
                            } 
                            for(i=0;i<arr3.length;i++){
                                arr3[i].checked = false
                            }
                            tolnum = 0
                            tolpri =0
                        }
                       
                    }else{//当点击的是商品前面的复选框
                        tolnum = (alln-0)
                        tolpri = (allp-0)
                        // console.log(alln,allp);
                        for(j=0;j<arr3.length;j++){
                            $(arr3[j]).prop("checked",false)
                        }
                        for(let i=0;i<arr2.length;i++){
                            var status = $(arr2[i]).prop("checked") 
                            // if($(arr2[i]).prop("checked") == true){  
                            //     tolnum += (tess[i].value-0)
                            //     tolpri += (tolprice[i].innerText-0)
                            // }
                            if($(arr2[i]).prop("checked") == false){
                                tolnum -= (tess[i].value-0)
                                tolpri -= (tolprice[i].innerText-0)
                            }
                            
                        }
                        
                    }
                    document.querySelector('.tolnum').innerHTML = tolnum
                    document.querySelector('.priceAll').innerHTML = tolpri
                }
            }
            
            //移除功能的实现
            let btns = document.querySelectorAll('.remove')
            // console.log(btns);
            for(i=0;i<btns.length;i++){
                btns[i].onclick=function(){
                    // console.log(this);
                    var id2 = this.parentElement.parentElement.getAttribute('lid')
                    layer.confirm('确认移除？',{
                        btn:['确认','取消']
                    },function(){
                        // console.log(id2);
                        // console.log(typeof data);
                        var index = data.findIndex(v=>v.name == getCookie('name')&&v.id == id2)
                        data.splice(index,1)
                        localStorage.setItem('data',JSON.stringify(data))
                        layer.msg('移除成功')
                        data = JSON.parse(localStorage.getItem('data'))
                        if(!data.length){
                            // console.log(111);
                            document.querySelector('.shop').innerHTML=`
                            <p>购物车空空如也，去 <span><a href="./list.html">产品中心</a></span> 看看吧</p>
                            `
                            return
                        }
                        location.reload()
                    },
                    function(){
                        layer.msg('已取消',{
                            time:500
                        })
    
                    })
                }
            }

            //结算功能实现
            // console.log(arr2);
            document.querySelector(".btn-warning").onclick=function(){
                for(let i=0;i<arr2.length;i++){
                    if($(arr2[i]).prop("checked") == true){
                        var id3 = (arr2[i].parentElement.parentElement.getAttribute('lid')-0)
                        console.log(id3);
                        data = JSON.parse(localStorage.getItem('data'))
                        console.log(data);
                        var index = data.findIndex(v=>v.name === getCookie('name')&&v.id == id3)
                        data.splice(index,1)
                    }
                    localStorage.setItem('data',JSON.stringify(data))
                    location.reload()
                }
            }

        })
    }

}