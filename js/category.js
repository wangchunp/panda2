$(function() {
    // 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


    //第一次渲染页面
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function(response) {
            console.log(response);
            // 所谓模板引擎 作用就是用来帮我们将数据和html拼接好 将拼接好的结果 返回给我们

            // 将数据和html做拼接
            // 1) html模板ID
            // 2) 数据
            // 3) 告诉模板引擎 html模板和数据怎样进行拼接
            var html = template('category-first', response);

            $('#links').html(html);

            // 如果一级分类有数据的话
            if (response.rows.length) {

                // 给第一个一级分类添加选中状态
                $('#links').find('a').eq(0).addClass('active');

                // 获取第一个一级分类的ID
                var id = response.rows[0].id;

                // 根据一级分类ID获取二级分类
                getSecondCategory(id);
            }

        }
    });

    // 根据一级分类ID获取二级分类


    //对一级分类设置点击事件 获取而级数据分类数据
    $("#links").on("click", "a", function() {
        //获取点击的一级分类id
        var id = $(this).attr("data-id");

        //排他思想
        $(this).addClass("active").siblings().removeClass("active");
        //调用接口
        getSecondCategory(id);
    })

    //封装的一个函数
    function getSecondCategory(id) {
        $.ajax({
            type: "get",
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function(response) {
                //  console.log(response);
                var html = template('category-second', response);


                $('.brand-list').html(html);

            }
        });
    }









})