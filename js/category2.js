$(function() {
    //html加载完毕才执行
    // 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //发送ajax请求
    $.ajax({
        type: "post",
        url: '/category/queryTopCategory', //后台给的接口
        success: function(response) {
            //返回成功数据渲染页面
            var html = template("category-first", response);
            //往links里面追加
            $("#links").html(html);

            //判断
            if (response.rows.leight) { //如果数据中有这个数据的长度 第一次刷新页面的情况
                //给第一个添加选中状态
                $("#links").find("a").eq(0).addClass("active");
                //获取第一级id
                var id = response.rows[0].id;

                getSecondCategory(id);
            }
        }
    });

    //给一级元素添加点击事件
    $("#links").on("click", "a", function() { //采用事件委托  因为a标签是动态生成的

        //获取点击一级数据的id
        var id = $(this).attr("data-id"); //data-id 自定义id
        //点击当前的去掉其它的
        $(this).addClass("active").siblings().removeClass("active");
        getSecondCategory(id);
    })


    //封装多次使用的东西
    function getSecondCategory(id) {
        $.ajax({
            type: "post",
            url: '/category/querySecondCategory',
            data: {
                id: id //后台传的id数据
            },
            success: function(response) {
                //模板提供的方法收取数据
                var html = template('category-second', response);

                //ul里面追加
                $('.brand-list').html(html);
            }
        });
    }
})