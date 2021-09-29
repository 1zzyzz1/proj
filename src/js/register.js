//获取标签
let user = document.querySelector('#user');//用户名
let pwd1 = document.querySelector('#pwd1');//密码
let pwd2 = document.querySelector('#pwd2');//密码确认
let pro = document.querySelector('#pro');//注册按钮
let email = document.querySelector('#email');//邮箱
let messin = document.querySelector('#messin')//验证码
let tel = document.querySelector('#tel')//手机号
let flag1 = true;
let flag2 = true;
let flag3 = true;
let flag4 = true;
let flag5 = true;
let flag6 = true;
let reg = /^\w{4,12}$/;
//用户名格式校验
user.onblur = function () {
    if (!user.value) {
        flag1 = false;
    }
    else if (!reg.test(user.value)) {
        this.nextElementSibling.style.display = 'block';
        this.nextElementSibling.innerText = '*格式不正确哦';
        this.style.border = '1px solid red'
        flag1 = false
    }
    else {
        this.style.border = '1px solid green'
        this.nextElementSibling.style.display = 'none';
        flag1 = true
    }
}
//邮箱格式校验
email.onblur = function(){
    let reg3 = /^[a-zA-Z0-9]\w{4,10}@\w{2,5}\.com$/;
    if(!email.value){
        email.style.border = '1px red solid'
        flag5 = false
        return
    }
    else if(!reg3.test(email.value)){
        email.nextElementSibling.style.display = 'block'
        email.nextElementSibling.innerText = '*邮箱格式错误'
        email.style.border = '1px red solid'
        flag5 = false
    }else{
        email.nextElementSibling.style.display = 'none'
        email.style.border = '1px green solid'
        flag5 = true
    }
    // console.log(111);
}
//获取随机验证码
document.querySelector('#getnew').onclick = function () {
    function getNum(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n);
    }
    let str = '1234567890qwertyuiopasdfghjklzxcvbnm'
    var newStr = ''
    for (i = 0; i < 4; i++) {
        newStr += str[getNum(0, str.length - 1)]
    }
    document.querySelector('.verifi').value=newStr
}
//验证码校验功能实现
messin.onblur = function () {
    if (!messin.value) {
        messin.style.border = '1px red solid'
        flag2 = false
        return
    }
    else if (messin.value != document.querySelector('.verifi').value) {
        messin.nextElementSibling.style.display = 'inline'
        document.querySelector('.verifi').style.margin = 0
        messin.nextElementSibling.innerText = '*验证码错误'
        messin.style.border = '1px red solid'
        flag2 = false
    } else {
        messin.nextElementSibling.style.display = 'none'
        messin.style.border = '1px green solid'
        flag2 = true
    }
}
//密码格式校验
pwd1.onblur = function () {
    let reg2 = /^\w{6,12}$/
    if (!pwd1.value) {
        pwd1.style.border = '1px red solid'
        flag3 = false
        return
    }
    else if (!reg2.test(pwd1.value)) {
        pwd1.nextElementSibling.style.display = 'block'
        pwd1.nextElementSibling.innerText = '*密码为6~12位的数字哦'
        pwd1.style.border = '1px red solid'
        flag3 = false
    } else {
        pwd1.nextElementSibling.style.display = 'none'
        pwd1.style.border = '1px green solid'
        flag3 = true
    }
    // console.log(111);
}
//密码再次校验
pwd2.onblur = function () {
    if (!pwd2.value) {
        pwd2.style.border = '1px red solid'
        flag4 = false
        return
    }
    else if (pwd2.value != pwd1.value) {
        pwd2.nextElementSibling.style.display = 'block'
        pwd2.nextElementSibling.innerText = '*密码不一致'
        pwd2.style.border = '1px red solid'
        flag4 = false
    } else {
        pwd2.nextElementSibling.style.display = 'none'
        pwd2.style.border = '1px green solid'
        flag4 = true
    }
}
// 手机格式校验
tel.onblur = function () {
    let reg4 = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ 
    if (!tel.value) {
        tel.style.border = '1px red solid'
        flag6 = false
        return
    }
    else if (!reg4.test(tel.value)) {
        tel.nextElementSibling.style.display = 'block'
        tel.nextElementSibling.innerText = '*请输入正确的手机号'
        tel.style.border = '1px red solid'
        flag6 = false
    } else {
        tel.nextElementSibling.style.display = 'none'
        tel.style.border = '1px green solid'
        flag6 = true
    }
}
//点击注册进行注册
document.querySelector('#pro').onclick = function (e) {
    e = e || window.event
    e.preventDefault();
    let flag6 = true
    function $(id) { return document.getElementById(id); }
    if (!user.value) {
        flag6 = false
        $("user").focus();//自动获得焦点
        layer.tips('还未输入用户名哦', '#user', {
            tips: [1, '#0FA6D8'] //还可配置颜色
        });
        return
    }
    if (!email.value) {
        flag6 = false
        $("email").focus();//自动获得焦点
        layer.tips('还未输入邮箱哦', '#email', {
            tips: [1, '#0FA6D8'] //还可配置颜色
        });
        return
    }
    if (!tel.value) {
        flag6 = false
        $("tel").focus();//自动获得焦点
        layer.tips('还未输入号码哦', '#tel', {
            tips: [1, '#0FA6D8'] //还可配置颜色
        });
        return
    }
    if (!pwd1.value) {
        flag6 = false
        $("pwd1").focus();//自动获得焦点
        layer.tips('还未输入密码哦', '#pwd1', {
            tips: [1, '#0FA6D8'] //还可配置颜色
        });
        return
    }
    if (!pwd2.value) {
        flag6 = false
        $("pwd2").focus();//自动获得焦点
        layer.tips('请确认密码', '#pwd2', {
            tips: [1, '#0FA6D8'] //还可配置颜色
        });
        return
    }
    if (!messin.value) {
        flag6 = false
        $("messin").focus();//自动获得焦点
        layer.tips('请填写验证码', '#messin', {
            tips: [1, '#0FA6D8'] //还可配置颜色
        });
        return
    }
    //发起Ajax请求
    if (flag1 && flag2 && flag3 && flag4 && flag5&&flag6) {
        pAjax({
            url:'../lib/register.php',
            method:'post',
            dataType:'json',
            data:{username:user.value,password:pwd1.value,email:email.value,tel:tel.value},
        }).then(res => {
            let obj = res.meta
            if(obj.status == 0){
                alert('注册成功')
                location.href = './login.html'
                return
            }
            else{
                alert('注册失败')
                return
            }
        })
    }

}