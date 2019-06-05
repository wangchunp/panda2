import { setTimeout } from "timers";

$(function() {
    $("#getCode").on('tap', function() {
        $.ajax({
            type: "get",
            url: '/user/vCodeForUpdatePassword',
            success: function(response) {
                //将认证码打印到控制台上
                console.log(response.vCode);
            }
        });
    });

    $("#modify-btn").on('tap', function() {
        var originPass = $.trim($('[name="originPass"]')).val();
        var newPass = $.trim($('[name="newPass"]')).val();
        var confirmNewPass = $.trim($('[name="confirmNewPass"]')).val();
        var vCode = $.trim($('[name="vCode"]')).val();

        if (!originPass) {
            mui.toast('请输入原密码');
            return;
        }

        if (newPass != confirmNewPass) {
            mui.toast('两次密码不一致');
            return;
        }

        $.ajax({
            type: "post",
            url: '/user/updatePassword',
            data: {
                originPass: originPass,
                newPass: confirmNewPass,
                vCode: vCode
            },
            success: function(response) {
                if (response.success) {
                    mui.toast('修改成功');
                    setTimeout(function() {
                        location.href = 'login.html';
                    }, 2000)
                }
            }
        });
    });
})