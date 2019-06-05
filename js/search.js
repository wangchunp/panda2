$(function() {

    var keyArr = [];
    $("#search-btn").on("click", function() {
        //用户输入的值


        var keyword = $("#keyword").val();

        if (!keyword) {
            alert("请输入要搜索的商品");
            return;

        }

        //将用户输入的数据存入数组中

        keyArr.push(keyword);
        //将关键字存入本地
        localStorage.setItem('keyArr', JSON.stringify(keyArr));

        //拼接实现地址栏的数据
        location.href = "search-resurt.html?keyword=" + keyword;


        // 存储关键字的数组




        // var keyArr = [];

        // if (localStorage.getItem("keyArr")) { //有数据
        //     //将数据转换成数组
        //     keyArr = JSON.parse(localStorage.getItem("keyArr"));


        //     var html = template('historyTpl', { result: keyArr });

        //     // console.log(html);
        //     $('#history-box').html(html);
        // }

    })

    if (localStorage.getItem('keyArr')) { //有历史记录
        console.log("11111111111111");
        keyArr = JSON.parse(localStorage.getItem('keyArr'));

        var html = template('historyTpl', { result: keyArr })
        console.log(html);


        $('#history-box').html(html);

    }

    $("#clearBtn").on('click', function() {
        $("#history-box").html("");

        //清空本地储存
        localStorage.removeItem("keyArr");
    })



})


// $(function() {
//     $("#search-btn").on('click', function() {
//         var keyWords = $("#search-btn").siblings("input").val();
//         if (!keyWords) {
//             alert('输入为空！')
//             return;
//         }
//         keyArr.push(keyWords);
//         localStorage.setItem("keyArr", JSON.stringify(keyArr)); //string
//         location.href = 'search-result.html?keyword=' + keyWords;

//     })


//     var keyArr = [];
//     if (localStorage.getItem("keyArr")) {
//         keyArr = JSON.parse(localStorage.getItem("keyArr"));
//         var html = template('historyTpl', {
//             result: keyArr
//         });
//         $("#history-box").html(html);


//     }
//     // console.log(keyArr);


//     $("#clearBtn").on('click', function() {
//         $("#history-box").html("");
//         localStorage.removeItem("keyArr");
//     })




// });