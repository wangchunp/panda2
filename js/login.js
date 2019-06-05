$(function() {

    $('#login-btn').on('click', function() {

        var username = $.trim($("[name='username']").val());
        var password = $.trim($("[name='password']").val());

        if (!username) {
            mui.toast("请输入用户名");
            return;
        }

        if (!password) {
            mui.toast("请输入密码");
            return;
        }

        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            beforeSend: function() {
                $('#login-btn').html("正在登录...");
            },
            success: function(res) {
                if (res.success) {
                    mui.toast("登录成功");

                    $('#login-btn').html("登录");

                    setTimeout(function() {
                        location.href = "user.html";
                    }, 2000);
                } else {
                    mui.toast("登陆失败");
                    $('#login-btn').html('登陆');
                }
            }
        })


    });
})