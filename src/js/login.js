
let user = document.querySelector('#user');
let pwd = document.querySelector('#pwd');
let reg = /^\w{4,12}$/;
let flag1 = true;
let flag2 = true;
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
let reg2 = /^\d{6,12}$/;
pwd.onblur = function () {
    if (!this.value) {
        this.nextElementSibling.style.display = 'block';
        this.nextElementSibling.innerText = '*请输入';
        flag2 = false
        
    }
    else if (!reg2.test(pwd.value)) {
        this.nextElementSibling.style.display = 'block';
        this.nextElementSibling.innerText = '*格式不正确哦';
        this.style.border = '1px solid red'
        flag2 = false
        
    }
    else {
        this.style.border = '1px solid green'
        this.nextElementSibling.style.display = 'none';
        flag2 = true
    }
}
//验证格式错误与否
let btn = document.querySelector('.btn1')
btn.onclick = function (e) {
    e = e || window.event;
    e.preventDefault();
        if(!user.value){
            user.nextElementSibling.style='block'
            user.style.border = '1px solid red'
            user.nextElementSibling.innerHTML = '请输入'
            function $(id){ return document.getElementById(id);}
            $("user").focus();//自动获得焦点
            return
        }
        if(!pwd.value){
            pwd.nextElementSibling.style='block'
            pwd.nextElementSibling.innerHTML = '请输入'
            pwd.style.border = '1px solid red'
            function $(id){ return document.getElementById(id);}
            $("pwd").focus();//自动获得焦点
        }
    // 判断是否记住密码
    let remeber = document.querySelector('#remeber');
    if (remeber.checked) {
        var data = { username: user.value, password: pwd.value, remeber: 'on' }
        setCookie('name',user.value,7)
    } else {
        var data = { username: user.value, password: pwd.value }
        setCookie('name',user.value)
    }
    if (flag1 && flag2) {
        pAjax({
            url: '../lib/login.php',
            method: 'post',
            data: data,
            dataType: 'json'
        }).then(res => {
            let obj = res.meta
            console.log(obj);
            if (obj.status == 0) {
                alert(obj.msg)
                
                location.href = './index.html'
            } else {
                alert(obj.msg)
            }
        })
    }
}
