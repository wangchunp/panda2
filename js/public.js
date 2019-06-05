$(function() {

    // 恢复A元素的跳转
    $('body').on('tap', 'a', function() {

        mui.openWindow({
            url: $(this).attr('href')
        });

    });

});