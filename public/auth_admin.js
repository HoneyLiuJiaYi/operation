$(function () {
    if(localStorage.length == 0 || localStorage.a_id === null){
        alert('请登录帅哥！');
        window.location.href = "./admin_login.html";
    }
    if (localStorage.role_id == 2) {
        $('#role_auth').hide();
    }
    var title = $("#title").text();
    if (title == "首页-享洗小组") {
        sexStatic();
    }
    if (title == "享洗小组-管理员管理页") {
        productList();
    }
    if (title == "享洗小组-骑手站点管理页") {
        riderStationList();
    }
    if (title == "享洗小组-工厂站点管理页") {
        merchantStationList();
    }
    if (title == "享洗小组-骑手站点添加") {
        riderStationAdd();
    }
    if (title == "享洗小组-工厂站点添加") {
        merchantStationAdd();
    }
    if (title == "首页-区域统计") {
         areaStatic();
    }
    if (title == "享洗小组-管理员编辑"){
        managerEdit();
    }
    sidebar();

    var a_id = localStorage.a_id;
    var a_nick = localStorage.a_nick;
    var is_del = localStorage.is_del;
    var role_id = localStorage.role_id;
    if (role_id == '1') {
        role_id = '超级管理员';
    }else {
        role_id = '运营';
    }
    $('.a_nick').text(a_nick);
});

function logout() {
    localStorage.clear();
    window.location.href = "./admin_login.html";
}

function sidebar() {
    var sidebar = '<section class="sidebar" style="height: auto;"><div class="user-panel"><div class="pull-left image"><img src="./public/1467940567994502.jpg" class="img-circle" alt="User Image"></div><div class="pull-left info"><p class="a_nick">xiangxi_bjtu</p><a href=""><i class="fa fa-circle text-success"></i> Online</a></div></div><!-- search form --><form action="" method="get" class="sidebar-form"><div class="input-group"><input type="text" name="q" class="form-control" placeholder="Search..."><span class="input-group-btn"><button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button></span></div></form><!-- /.search form --><!-- sidebar menu: : style can be found in sidebar.less --><ul class="sidebar-menu"><li class="header">主功能区</li><li class=" treeview"><a id="role_auth" href="./admin_list.html"><i class="fa fa-user-secret"></i> <span>管理员管理</span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu"><li class="active"><a href="./admin_list.html"><i class="fa fa-users"></i> 管理员列表</a></li><li><a href="./admin_add.html"><i class="fa fa-user-plus"></i> 添加管理员</a></li></ul></li><li class=" treeview"><a href=""><i class="fa fa-user"></i> <span>用户管理</span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu"><li class="active"><a href="./user_list0.html"><i class="fa fa-users"></i> 用户列表</a></li></ul></li><li class=" treeview"><a href=""><i class="fa fa-group"></i> <span>骑手管理</span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu"><li class="active"><a href="./rider_list.html"><i class="fa fa-users"></i> 骑手列表</a></li><li class="active"><a href="./rider_examine.html"><i class="fa fa-users"></i> 骑手审核</a></li></ul></li>' +
        '<li class=" treeview"><a href=""><i class="fa fa-group"></i> <span>工厂管理</span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu"><li class="active"><a href="./merchant_list.html"><i class="fa fa-users"></i> 工厂列表</a></li><li class="active"><a href="./merchant_examine.html"><i class="fa fa-users"></i> 工厂审核</a></li></ul></li>' +
        '<li class=" treeview"><a href=""><i class="fa fa-group"></i> <span>优惠券</span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu"><li class="active"><a href="./coupon_create.html"><i class="fa fa-users"></i> 优惠券建立</a></li><li class="active"><a href="./coupon_show.html"><i class="fa fa-users"></i> 优惠券查看</a></li></ul></li>' +
        '<li class=" treeview"><a href=""><i class="fa fa-group"></i> <span>商品管理</span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu"><li class="active"><a href="./category_list0.html"><i class="fafa-shopping-cart"></i> 品类列表 </a></li></ul></li><li class=" treeview"><a href=""><i class="fa fa-group"></i><span>站点管理</span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu"><li class="active"><a href="./station_add.html"><i class="fafa-shopping-cart"></i> 创建站点 </a></li><li class="active"><a href="./station_list.html"><i class="fafa-shopping-cart"></i> 站点列表 </a></li></ul></li><li class=" treeview"><a href=""><i class="fa fa-group"></i> <span>统计</span> <i class="fa fa-angle-left pull-right"></i></a>' +
        '<ul class="treeview-menu"><li class="active"><a href="./sex_static.html"><i class="fa fa-users"></i> 性别统计</a></li></ul>' +
        '<ul class="treeview-menu"><li class="active"><a href="./log_list.html"><i class="fa fa-users"></i> 流水统计</a></li></ul>' +
        '<ul class="treeview-menu"><li class="active"><a href="./area_static.html"><i class="fa fa-users"></i> 区域统计</a></li></ul></li></ul></section>';
    $(".main-sidebar").html(sidebar);
}

function sexStatic() {
    var url = 'http://180.76.141.171:81/statistic/sex';
    $.ajax({
        cache: false,
        type: "GET",
        url:url,
        async: true,
        error: function(request) {
            alert("Connection error");
        },
        success: function(data) {

            if (data.status=='0') {
                var male = data.data.male;
                var female = data.data.female;
                localStorage.male = male;
                localStorage.female = female;

            }else{
                alert('获取信息失败！');
            }
        }
    });

    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas);
    var PieData = [
        {
            value: localStorage.male,
            color: "#f56954",
            highlight: "#f56954",
            label: "男性"
        },
        {
            value: localStorage.female,
            color: "#00a65a",
            highlight: "#00a65a",
            label: "女性"
        },

    ];
    var pieOptions = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",
        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        //Number - Amount of animation steps
        animationSteps: 100,
        //String - Animation easing effect
        animationEasing: "easeOutBounce",
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);
    // barChartOptions.datasetFill = false;
    // barChart.Bar(barChartData, barChartOptions);
}

function managerEdit() {
    
}

function areaStatic() {
    var url = 'http://180.76.141.171:81/statistic/sex';
    $.ajax({
        cache: false,
        type: "GET",
        url:url,
        async: true,
        error: function(request) {
            alert("Connection error");
        },
        success: function(data) {

            if (data.status=='0') {
                var male = data.data.male;
                var female = data.data.female;
                localStorage.male = male;
                localStorage.female = female;

            }else{
                alert('获取信息失败！');
            }
        }
    });
    var areaChartData = {
        labels: ["北京市", "河北省", "广东省", "陕西省", "湖北省", "山西省", "天津市"],
        datasets: [
            {
                label: "Electronics",
                fillColor: "rgba(210, 214, 222, 1)",
                strokeColor: "rgba(210, 214, 222, 1)",
                pointColor: "rgba(210, 214, 222, 1)",
                pointStrokeColor: "#c1c7d1",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "Digital Goods",
                fillColor: "rgba(60,141,188,0.9)",
                strokeColor: "rgba(60,141,188,0.8)",
                pointColor: "#3b8bba",
                pointStrokeColor: "rgba(60,141,188,1)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(60,141,188,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas);
    var barChartData = areaChartData;
    barChartData.datasets[1].fillColor = "#00a65a";
    barChartData.datasets[1].strokeColor = "#00a65a";
    barChartData.datasets[1].pointColor = "#00a65a";
    var barChartOptions = {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,
        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - If there is a stroke on each bar
        barShowStroke: true,
        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,
        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,
        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        //Boolean - whether to make the chart responsive
        responsive: true,
        maintainAspectRatio: true
    };

    barChartOptions.datasetFill = false;
    barChart.Bar(barChartData, barChartOptions);
}
function productList() {
    $.ajax({
        url: 'http://180.76.141.171:81/product/list',
        type: 'post',
        dataType: 'json',
        data: {"category_id": localStorage.update_category_id},
        success: function (data) {
            var table = $("#example1 tbody")[0]
            var product_list = data.data.products;//admins
            for (var i = 0; i < product_list.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                //添加id
                var td_product_id = $("<td>" + product_list[i].id + "</td>");
                td_product_id.appendTo(tr);
                //nick
                $("<td>" + product_list[i].name + "</td>").appendTo(tr);
                $('<td><img src="'+product_list[i].logo+'" width="30" height="30"></td>').appendTo(tr);
                //创建时间
                $("<td>" + product_list[i].created_at + "</td>").appendTo(tr);
                //更新时间
                $("<td>" + product_list[i].created_at + "</td>").appendTo(tr);
                //状态
                if (product_list[i].is_delete == 0) {
                    $("<td>可用</td>").appendTo(tr);
                } else {
                    $("<td>不可用</td>").appendTo(tr);
                }
                //
                //$('<td><a class="btn btn-primary btn-xs" href="./admin_edit.html?this_category_id=' + product_list[i].id + '">编辑</a><a class="btn btn-danger btn-xs" data="1" action="delete">删除</a></td>').appendTo(tr);
                $('<td><a class="btn btn-danger btn-xs delete">删除</a>|<a class="btn btn-success btn-xs update"> 修改</a>|<a class="btn btn-adn btn-xs price">价格</a></td>').appendTo(tr);

            }

            $(".delete").each(function(event){
                $(this).click(function(event){

                    var product_id = $(this).parent().siblings(":first").text();

                    $.ajax({
                        url:'http://180.76.141.171:81/product/stop',
                        type:'post',
                        dataType: 'json',
                        data: {"product_id": product_id},
                        success:function(data){
                            if(data.status==0){
                                window.location.href = "./product_list0.html";
                                alert("删除成功");
                            }
                        },
                        error:function(){
                            alert("删除失败");
                        }
                    });
                });
            });
            $(".update").each(function(event){
                $(this).click(function(event){
                    var product_id = $(this).parent().siblings(":first").text();
                    localStorage.update_product_id = product_id;
                    window.location.href = "./product_edit0.html";

                });
            });
            $('.price').each(function(event){
               $(this).click(function(event){
                  var id = $(this).parent().siblings(":first").text();
                  window.location.href="./price_edit.html?product_id=" + id;
               });
            });

        },
        error: function () {
            alert("error");
        }
    });


$('a[action="delete"]').on('click', function () {
    var id = $(this).attr('data');
    var me = $(this).parent().parent();

    $.ajax({
        url: './manager/user',
        type: 'get',
        dataType: 'json',
        success: function (data) {

            var product_list = data.admins;
            alert(product_list.length);
            for (var i = 0; i < product_list.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);

                //添加id
                var td_category_id = $("<td>" + product_list[i].id + "</td>");
                td_category_id.appendTo(tr);
                //
                $("<td>" + product_list[i].nick + "</td>").appendTo(tr);

            }
        },
        error: function () {

        }
    });
});
}

function riderStationList() {
    $.ajax({
        url: 'http://180.76.141.171:81/rider/station',
        type: 'post',
        dataType: 'json',
        data: {"rider_id": localStorage.update_rider_id},
        success: function (data) {
            var table = $("#example1 tbody")[0];
            var stations = data.data.stations;//admins
            for (var i = 0; i < stations.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $('<td>' + stations[i].station_id + '</td>').appendTo(tr);
                $('<td>' + stations[i].station_name + '</td>').appendTo(tr);
                $('<td>' + stations[i].address_lat + '</td>').appendTo(tr);
                $('<td>' + stations[i].address_lng + '</td>').appendTo(tr);
                $('<td><a class="btn btn-danger btn-xs delete">解绑</a>').appendTo(tr);
            }
            $(".delete").each(function(event){
                $(this).click(function(event){
                    var station_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.141.171:81/rider/unbindRider',
                        type:'post',
                        dataType: 'json',
                        data: {"rider_id": localStorage.update_rider_id, "station_id": station_id},
                        success:function(data){
                            if(data.status==0){
                                window.location.href = "rider_stations_list.html";
                                alert("解绑成功");
                            }
                        },
                        error:function(){
                            alert("解绑失败");
                        }
                    });
                });
            });
            $(".update").each(function(event){
                $(this).click(function(event){

                    var product_id = $(this).parent().siblings(":first").text();
                    localStorage.update_product_id = product_id;
                    window.location.href = "./product_edit0.html";

                });
            });


        },
        error: function () {
            alert("error");
        }
    });
}
function riderStationAdd() {
    $.ajax({
        url: 'http://180.76.141.171:81/rider/unstation',
        type: 'post',
        dataType: 'json',
        data: {"rider_id": localStorage.update_rider_id},
        success: function (data) {
            var table = $("#example1 tbody")[0]
            var stations = data.data.stations;
            for (var i = 0; i < stations.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $('<td>' + stations[i].station_id + '</td>').appendTo(tr);
                $('<td>' + stations[i].station_name + '</td>').appendTo(tr);
                $('<td>' + stations[i].address_lat + '</td>').appendTo(tr);
                $('<td>' + stations[i].address_lng + '</td>').appendTo(tr);
                $('<td><a class="btn btn-danger btn-xs bind">绑定</a>').appendTo(tr);
            }
            $(".bind").each(function(event){
                $(this).click(function(event){

                    var station_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.141.171:81/rider/bind',
                        type:'post',
                        dataType: 'json',
                        data: {"rider_id": localStorage.update_rider_id, "station_id": station_id},
                        success:function(data){
                            if(data.status==0){
                                window.location.href = "rider_stations_list.html";
                                alert("绑定成功");
                            }
                        },
                        error:function(){
                            alert("绑定失败");
                        }
                    });
                });
            });

        },
        error: function () {
            alert("error");
        }
    });

}
function merchantStationAdd() {
    $.ajax({
        url: 'http://180.76.141.171:81/merchant/unstation',
        type: 'post',
        dataType: 'json',
        data: {"merchant_id": localStorage.update_merchant_id},
        success: function (data) {
            var table = $("#example1 tbody")[0]
            var stations = data.data.stations;//admins
            for (var i = 0; i < stations.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $('<td>' + stations[i].id + '</td>').appendTo(tr);
                $('<td>' + stations[i].name + '</td>').appendTo(tr);
                $('<td>' + stations[i].lat + '</td>').appendTo(tr);
                $('<td>' + stations[i].lng + '</td>').appendTo(tr);
                $('<td><a class="btn btn-danger btn-xs bind">绑定</a>').appendTo(tr);
            }
            $(".bind").each(function(event){
                $(this).click(function(event){

                    var station_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.141.171:81/merchant/bind',
                        type:'post',
                        dataType: 'json',
                        data: {"merchant_id": localStorage.update_merchant_id, "station_id": station_id},
                        success:function(data){
                            if(data.status==0){
                                window.location.href = "merchant_stations_list.html";
                                alert("绑定成功");
                            }
                        },
                        error:function(){
                            alert("绑定失败");
                        }
                    });
                });
            });

        },
        error: function () {
            alert("error");
        }
    });

}
function merchantStationList() {
    $.ajax({
        url: 'http://180.76.141.171:81/merchant/station',
        type: 'post',
        dataType: 'json',
        data: {"merchant_id": localStorage.update_merchant_id},
        success: function (data) {
            var table = $("#example1 tbody")[0];
            var stations = data.data.stations;//admins
            for (var i = 0; i < stations.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $('<td>' + stations[i].id + '</td>').appendTo(tr);
                $('<td>' + stations[i].name + '</td>').appendTo(tr);
                $('<td>' + stations[i].lat + '</td>').appendTo(tr);
                $('<td>' + stations[i].lng + '</td>').appendTo(tr);
                $('<td><a class="btn btn-danger btn-xs delete">解绑</a>').appendTo(tr);
            }
            $(".delete").each(function(event){
                $(this).click(function(event){
                    var station_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.141.171:81/merchant/unbind',
                        type:'post',
                        dataType: 'json',
                        data: {"merchant_id": localStorage.update_merchant_id, "station_id": station_id},
                        success:function(data){
                            if(data.status==0){
                                window.location.href = "merchant_stations_list.html";
                                alert("解绑成功");
                            }
                        },
                        error:function(){
                            alert("解绑失败");
                        }
                    });
                });
            });
            $(".update").each(function(event){
                $(this).click(function(event){
                    var product_id = $(this).parent().siblings(":first").text();
                    localStorage.update_product_id = product_id;
                    window.location.href = "./product_edit0.html";

                });
            });
        },
        error: function () {
            alert("error");
        }
    });
    $('a[action="delete"]').on('click', function () {
        var id = $(this).attr('data');
        var me = $(this).parent().parent();
        $.ajax({
            url: './manager/user',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                var product_list = data.admins;
                alert(product_list.length);
                for (var i = 0; i < product_list.length; i++) {
                    var tr = $("<tr></tr>");
                    tr.appendTo(table);

                    //添加id
                    var td_category_id = $("<td>" + product_list[i].id + "</td>");
                    td_category_id.appendTo(tr);
                    //
                    $("<td>" + product_list[i].nick + "</td>").appendTo(tr);

                }
            },
            error: function () {
                alert('error');
            }
        });
    });
}