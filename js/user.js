var userInfo = null;
$.ajax({
    type: "get",
    url: '/user/queryUserMessage',
    //把异步转换为同步
    async: false,
    success: function(response) {
        console.log(response);

        //用户没有登陆
        if (response.error && response.error == 400) {
            location.href = "login.html";
        }

        userInfo = response;

        if (userInfo) {
            var html = template("userTpl", userInfo);
            $('#userInfoBox').html(html);
        }
    }
});



$(function() {
    $("#logout").on('click', function() {
        $.ajax({
            type: "get",
            url: '/user/logout', //后台给的接口
            success: function(response) {

                if (response.success) {
                    mui.toast("退出登录成功");
                    setTimeout(function() {
                        location.href = 'index.html';
                    }, 2000)
                }
            }
        });
    })
})