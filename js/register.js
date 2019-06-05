$(function() {
    $("#getCode").on('click', function() {
        $.ajax({
            type: "get",
            url: '/user/vCode',
            success: function(response) {
                console.log(response.vCode);
            }
        });
    });

    //注册点击
    $("#register-btn").on('tap', function() {
        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var againPass = $('[name="againPass"]').val();
        var vCode = $('[name="vCode"]').val();

        if (!username) {
            mui.toast("请输入用户名");
            return;
        }

        if (mobile.length < 11) {
            mui.toast("请输入合法的手机号");
            return;
        }
        //判断两次密码是否一致
        if (password != againPass) {
            mui.toast("密码不一致");
            return;
        }

        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(response) {
                // console.log(response);
                alert("注册成功");
                //用计时器给缓冲时间 用户体验更好
                setTimeout(function() {
                    location.href = "login.html";
                }, 2000)
            }
        });
    })
})