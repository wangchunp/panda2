$(function() {
    var id = getParamsByUrl(location.href, 'id');
    //库存数量
    var kucunNum = 0;
    //产品id
    var productId = 0;

    $.ajax({
        type: "get",
        url: '/product/queryProductDetail',
        data: {
            id: id,
        },
        success: function(response) {
            // console.log(response);
            //库存总数
            kucunNum = num;

            //产品id
            productId = id;
            var html = template("detailTpl", response);

            $("#product-box").html(html);

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    //尺码选中状态
    var size = null;

    $('#product-box').on('click', '.size span', function() {

        $(this).addClass('active').siblings('span').removeClass('active');

        //用户选择的尺码
        size = $(this).html();
    });

    //加减操作
    var oInp = $("#inp");
    $("#increase").on('tap', function() {
        //获取iput 每轻敲一下加加
        var num = oInp.val();
        num++;
        //如果加的数量大于总数就等于它
        if (num > kucunNum) {
            num = kucunNum;
        }
        oInp.val(num);

    });

    $("#reduce").on('tap', function() {

        var num = oInp.val();

        num--;
        if (num < 1) {
            num = 1
        }
        oInp.val(num);
    })


    $("#addCart").on('tap', function() {
        if (!size) {
            alert('请输入尺码');
            return;
        }

        $.ajax({
            type: "post",
            url: '/cart/addCart',
            data: {
                productId: productId,
                num: kucunNum,
                size: size
            },
            success: function(response) {
                if (response.success) {
                    mui.confirm('加入购物车成功，跳转到购物车？', function(message) {
                        if (message.index) {
                            //跳转到购物车
                            location.href = 'cart.html';
                        }
                    })
                }
            }
        });
    })
})