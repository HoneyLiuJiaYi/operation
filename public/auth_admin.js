$(function () {
    if(localStorage.length == 0 || localStorage.a_id === null){
        if (window.location.href.indexOf("admin_login.html") == -1){
            alert('请登录帅哥！');
            window.location.href = "./admin_login.html";
        }
    }
    if (localStorage.role_id == 2) {
        $('#role_auth').hide();
    }
    var title = $("#title").text();
    if (title == "享洗小组-性别统计") {
        sexStatic();
    }
    if (title == "享洗小组-商品列表页") {
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
    }if (title == "首页-区域统计") {
        areaStatic();
    }if (title == "享洗小组-管理员添加") {
        adminAdd();
    }if (title == "享洗小组-管理员列表管理页") {
        adminList();
    }if (title == "享洗小组-品类添加") {
        categoryAdd();
    }if (title == "享洗小组-品类编辑") {
        categoryEdit();
    }if (title == "享洗小组-品类列表页") {
        categoryList();
    }if (title == "享洗小组-优惠券建立") {
        couponCreate();
    }if (title == "享洗小组-优惠券展示页") {
        couponList();
    }if (title == "享洗小组-流水管理页") {
        logList();
    }if (title == "享洗小组-工厂审核") {
        merchantExamine();
    }if (title == "享洗小组-工厂列表") {
        merchantList();
    }if (title == "享洗小组-价格编辑") {
        priceEdit();
    }if (title == "享洗小组-产品添加") {
        productAdd();
    }if (title == "享洗小组-商品列表页") {
        productList();
    }if (title == "享洗小组-骑手审核") {
        riderExamine();
    }if (title == "享洗小组-骑士列表页") {
        riderList();
    }if (title == "享洗小组-站点建立") {
        stationAdd();
    }if (title == "享洗小组-站点列表页") {
        stationList();
    }if (title == "享洗小组-用户充钱") {
        userCard();
    }if (title == "享洗小组-首页") {
        welcome();
    }if (title == "享洗小组-用户列表页") {
        userList();
    }if (title == "享洗小组-用户优惠券") {
        userCoupon();
    }if (title == "享洗小组-优惠券排除页") {
        userNotCoupon();
    }if (title == "享洗小组-商户结算管理页") {
        settlement();
    }if (title == "享洗小组-角色管理页") {
        roleList();
    }if (title == "享洗小组-管理员修改") {
        adminEdit();
    }
    var a_id = localStorage.a_id;
    var a_nick = localStorage.a_nick;
    var is_del = localStorage.is_del;
    var role_id = localStorage.role_id;
    sidebar(role_id);
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

function sidebar(rid) {
    var header = '<section class="sidebar" style="height: auto;"><div class="user-panel"><div class="pull-left image"><img src="./public/1467940567994502.jpg" class="img-circle" alt="User Image"></div><div class="pull-left info"><p class="a_nick">xiangxi_bjtu</p><a href=""><i class="fa fa-circle text-success"></i> Online</a></div></div><!-- search form --><form action="" method="get" class="sidebar-form"><div class="input-group"><input type="text" name="q" class="form-control" placeholder="Search..."><span class="input-group-btn"><button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button></span></div></form><!-- /.search form --><!-- sidebar menu: : style can be found in sidebar.less --><ul class="sidebar-menu"><li class="header">主功能区</li>';
    var footer = '</ul></section>';
    $.ajax({
        url: "http://180.76.233.59:81/role/service",
        type: "post",
        data: "role_id=" + rid,
        dataType: "json",
        success: function (data) {
            var services = data.data.service;
            var ak = [];
            for (var i = 0 ; i < services.length ; i++){
                var child = services[i].child;
                var subheader = '<li class=" treeview"><a id="role_auth" href="./admin_list.html"><i class="fa fa-user-secret"></i> <span>' + services[i].root + '</span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu">';
                var arr = [];
                arr.push(subheader);
                for (var j = 0 ; j < child.length ; j++){
                    var subcontainer = '<li><a href="' + child[j].url + '"><i class="fa fa-users"></i> ' + child[j].root + '</a></li>';
                    arr.push(subcontainer);
                }
                var subfooter = '</ul></li>';
                arr.push(subfooter);
                ak.push(arr);
            }
            $(".main-sidebar").html(header + ak + footer);
        }
    });
}

function sexStatic() {
    var url = 'http://180.76.233.59:81/statistic/sex';
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
    pieChart.Doughnut(PieData, pieOptions);
}

function adminEdit(){


    $.ajax({
        url:"http://180.76.233.59:81/admin/single",
        type: "post",
        data: "admin_id=" + localStorage.update_admin_id,
        dataType: "json",
        error: function(request) {
            alert("Connection error");
        },
        success: function(data) {
            if (data.status == 0) {
                $('#nick').val(data.data.nick);
            }else{
                alert('获取信息失败！');
            }
        }
    });

    $('#edit_admin').click(function(){
        var newpassword = $('#newpassword').val();
        var newpassword2 = $('#newpassword2').val();
        if (newpassword != newpassword2){
            alert("新密码不相同");
            return;
        }
        var dataJson = {};
        dataJson.admin_id = localStorage.update_admin_id;
        dataJson.nick = $('#nick').val();
        dataJson.password = newpassword;
        dataJson.role_id = $('#role_id').val();
        $.ajax({
            url:"http://180.76.233.59:81/admin/single",
            type: "post",
            data: dataJson,
            dataType: "json",
            error: function(request) {
                alert("参数 error");
            },
            success: function(data) {
                if (data.status == 0) {
                    alert("修改成功!");
                    window.location.href = "./admin_list.html";
                }else{
                    alert('获取信息失败！');
                }
            }
        });
    });
}

function roleList(){
    $.ajax({
        url: 'http://180.76.233.59:81/role/list',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            var table = $("#container");
            var roles = data.data.role;//admins
            for (var i = 0; i < roles.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $("<td>" + roles[i].id + "</td>").appendTo(tr);
                $("<td>" + roles[i].nick + "</td>").appendTo(tr);
                $("<td>" + roles[i].comment + "</td>").appendTo(tr);
                $('<td><button class="btn btn-danger btn-xs have" data-toggle="modal" data-target="#myModal">已有权限</button>|<button class="btn btn-danger btn-xs not" data-toggle="modal" data-target="#myModal">未添加权限</button></td>').appendTo(tr);
            }
            $('.have').each(function (event) {
                $(this).click(function (event) {
                    var dataJson = {};
                    dataJson.role_id = $(this).parent().siblings(":first").text();
                    $('#role_id').val(dataJson.role_id);
                    $.ajax({
                        url: 'http://180.76.233.59:81/role/service',
                        type: 'post',
                        data: dataJson,
                        dataType: 'json',
                        success: function (data) {
                            $('#myModalLabel').text("角色已有权限");
                            var services = data.data.service;
                            $('#navt').text('');
                            for (var i = 0 ; i < services.length ; i++){
                                var child = services[i].child;
                                var li = $('<li data-toggle="collapse" data-target="#summary_' + services[i].id + '">' + services[i].root + '</li>');
                                li.appendTo($('#navt'));
                                var div = $('<div id="summary_' + services[i].id + '"></div>');
                                div.appendTo($('#navt'));
                                var table = $('<table class="table table-striped"><thead><tr><th>权限</th><th>地址</th><th>所属</th><th>操作</th></tr></thead><tbody id="tbody_' + services[i].id + '"></tbody></table>');
                                table.appendTo(div);
                                var tbody = $('#tbody_' + services[i].id + '');
                                for (var j = 0 ; j < child.length ; j++){
                                    var tr = $("<tr></tr>");
                                    tr.appendTo(tbody);
                                    $("<td>" + child[j].id + "</td>").appendTo(tr);
                                    $("<td>" + child[j].root + "</td>").appendTo(tr);
                                    $("<td>" + child[j].url + "</td>").appendTo(tr);
                                    $("<td>" + services[i].root + "</td>").appendTo(tr);
                                    $('<td><button class="btn btn-danger btn-xs deleteService">删除</button></td>').appendTo(tr);
                                }
                            }

                            $('.deleteService').each(function (event) {
                                $(this).click(function(event){
                                    var sid = $(this).parent().siblings(":first").text();
                                    var kk = $(this);
                                    $.ajax({
                                        url: 'http://180.76.233.59:81/role/service/delete',
                                        type: 'post',
                                        data: 'service_id=' + sid + '&role_id=' + $('#role_id').val(),
                                        dataType: 'json',
                                        success: function(data) {
                                            if (data.status == 0){
                                                alert("成功删除");
                                                kk.attr("disabled", "disabled");
                                            } else {
                                                alert("参数错误");
                                            }
                                        },
                                        error: function () {
                                            alert("error");
                                        }
                                    });
                                });
                            });

                        }, error: function () {
                            alert("网络不好");
                        }
                    });
                });
            });

            $('.not').each(function(event){
                $(this).click(function(event){
                    var dataJson = {};
                    dataJson.role_id = $(this).parent().siblings(":first").text();
                    $('#role_id').val(dataJson.role_id);
                    $.ajax({
                        url: 'http://180.76.233.59:81/role/not',
                        type: 'post',
                        data: dataJson,
                        dataType: 'json',
                        success: function (data) {
                            $('#myModalLabel').text("角色未有权限");
                            var services = data.data.service;
                            $('#navt').text('');
                            for (var i = 0 ; i < services.length ; i++){
                                var child = services[i].child;
                                var li = $('<li data-toggle="collapse" data-target="#summary_' + services[i].id + '">' + services[i].root + '</li>');
                                li.appendTo($('#navt'));
                                var div = $('<div id="summary_' + services[i].id + '"></div>');
                                div.appendTo($('#navt'));
                                var table = $('<table class="table table-striped"><thead><tr><th>ID</th><th>权限</th><th>地址</th><th>所属</th><th>操作</th></tr></thead><tbody id="tbody_' + services[i].id + '"></tbody></table>');
                                table.appendTo(div);
                                var tbody = $('#tbody_' + services[i].id + '');
                                for (var j = 0 ; j < child.length ; j++){
                                    var tr = $("<tr></tr>");
                                    tr.appendTo(tbody);
                                    $("<td>" + child[j].id + "</td>").appendTo(tr);
                                    $("<td>" + child[j].root + "</td>").appendTo(tr);
                                    $("<td>" + child[j].url + "</td>").appendTo(tr);
                                    $("<td>" + services[i].root + "</td>").appendTo(tr);
                                    $('<td><button class="btn btn-danger btn-xs addService">添加</button></td>').appendTo(tr);
                                }
                            }

                            $('.addService').each(function (event) {
                               $(this).click(function(event){
                                   var sid = $(this).parent().siblings(":first").text();
                                   var kk = $(this);
                                   $.ajax({
                                       url: 'http://180.76.233.59:81/role/add',
                                       type: 'post',
                                       data: 'service_id=' + sid + '&role_id=' + $('#role_id').val(),
                                       dataType: 'json',
                                       success: function(data) {
                                            if (data.status == 0){
                                                alert("成功更新");
                                                kk.attr("disabled", "disabled");
                                            } else {
                                                alert("参数错误");
                                            }
                                       },
                                       error: function () {
                                           alert("error");
                                       }
                                   });
                               });
                            });

                        }, error: function () {
                            alert("网络不好");
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

function userNotCoupon(){
    var dataJson = {};
    dataJson.user_id = localStorage.userId;
    $.ajax({
        url: 'http://180.76.233.59:81/coupon/not',
        type: 'post',
        data: dataJson,
        dataType: 'json',
        success: function (data) {
            var table = $("tbody")[0];
            var coupons = data.data.coupons;//admins
            for (var i = 0; i < coupons.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $("<td>" + coupons[i].id + "</td>").appendTo(tr);
                $("<td>" + coupons[i].name + "</td>").appendTo(tr);
                $("<td>" + coupons[i].from + "</td>").appendTo(tr);
                $("<td>" + coupons[i].to + "</td>").appendTo(tr);
                $("<td>" + coupons[i].price + "</td>").appendTo(tr);
                $("<td>" + coupons[i].discount + "</td>").appendTo(tr);
                $('<td><button class="btn  btn-xs success couponAdd" >添加</button></td>').appendTo(tr);
            }
            $(".stop").each(function(event){
                $(this).click(function(event){
                    var dataJson = {};
                    dataJson.coupon_id = $(this).parent().siblings(":first").text();
                    dataJson.user_id = localStorage.userId;
                    $.ajax({
                        url: 'http://180.76.233.59:81/coupon/catch',
                        type: 'post',
                        data: dataJson,
                        dataType: 'json',
                        success: function (data) {
                            if(data.status==0){
                                alert("添加成功");
                                window.location.href = "./user_coupon.html";
                            } else {
                                alert("添加失败");
                            }
                        },
                        error: function () {
                            alert("参数传递有误");
                        }
                    });
                });
            });
        },
        error: function () {
            alert("参数传递有误");
        }
    });
}

function userCoupon(){
    var dataJson = {};
    dataJson.user_id = localStorage.userId;
    $.ajax({
        url: 'http://180.76.233.59:81/coupon/user',
        type: 'post',
        data: dataJson,
        dataType: 'json',
        success: function (data) {
            var table = $("tbody")[0];
            var coupons = data.data.coupons;//admins
            for (var i = 0; i < coupons.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $("<td>" + coupons[i].id + "</td>").appendTo(tr);
                $("<td>" + coupons[i].name + "</td>").appendTo(tr);
                $("<td>" + coupons[i].from + "</td>").appendTo(tr);
                $("<td>" + coupons[i].to + "</td>").appendTo(tr);
                $("<td>" + coupons[i].price + "</td>").appendTo(tr);
                $("<td>" + coupons[i].discount + "</td>").appendTo(tr);
                $('<td><button class="btn  btn-xs success deleteCoupon" >删除</button></td>').appendTo(tr);
            }
            $('.deleteCoupon').click(function(){
                var id = $(this).parent().siblings(":first").text();
                var dataJson = {};
                dataJson.coupon_id = id;
                dataJson.user_id = localStorage.userId;
                $.ajax({
                    url: 'http://180.76.233.59:81/coupon/user/delete',
                    type: 'post',
                    data: dataJson,
                    dataType: 'json',
                    success: function (data) {
                        if(data.status==0){
                            alert("删除成功");
                            window.location.href = "./user_coupon.html";
                        } else {
                            alert("删除失败");
                        }
                    },
                    error: function () {
                        alert("error");
                    }
                });
            })
        },
        error: function () {
            alert("error");
        }
    });
}

function settlement() {

    $.ajax({
        url: 'http://180.76.233.59:81/settlement/get',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            $('#totalPrice').val(data.data.price);
            var table = $("tbody")[0];
            var settlements = data.data.settlement;//admins
            for (var i = 0; i < settlements.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $("<td>" + settlements[i].id + "</td>").appendTo(tr);
                $("<td>" + settlements[i].product + "</td>").appendTo(tr);
                $("<td>" + settlements[i].category + "</td>").appendTo(tr);
                $("<td>" + settlements[i].num + "</td>").appendTo(tr);
                $("<td>" + settlements[i].order_price + "</td>").appendTo(tr);
                $("<td>" + settlements[i].rider_price + "</td>").appendTo(tr);
                $("<td>" + settlements[i].merchant_price + "</td>").appendTo(tr);
                $("<td>" + settlements[i].operation_price + "</td>").appendTo(tr);
                $("<td>" + settlements[i].time + "</td>").appendTo(tr);
                if(settlements[i].withdraw == 0){
                    $('<td><button class="btn btn-danger btn-xs stop">已结算</button></td>').appendTo(tr);
                }else{
                    $('<td><button class="btn btn-danger btn-xs active">未结算</button></td>').appendTo(tr);
                }
            }
        },
        error: function () {
            alert("error");
        }
    });
    $('#from').datetimepicker();

    $('#make').click(function(){
        $('tbody').text('');
        var dataJson = {};
        if ($('.from').val() != null && $('.from').val() != "" && $('.from').val() != undefined){
            dataJson.data_from = $('.from').val();
        }
        $.ajax({
            url: 'http://180.76.233.59:81/settlement/get',
            type: 'post',
            data: dataJson,
            dataType: 'json',
            success: function (data) {
                $('#totalPrice').val(data.data.price);
                var table = $("tbody")[0];
                var settlements = data.data.settlement;//admins
                for (var i = 0; i < settlements.length; i++) {
                    var tr = $("<tr></tr>");
                    tr.appendTo(table);
                    $("<td>" + settlements[i].id + "</td>").appendTo(tr);
                    $("<td>" + settlements[i].product + "</td>").appendTo(tr);
                    $("<td>" + settlements[i].category + "</td>").appendTo(tr);
                    $("<td>" + settlements[i].num + "</td>").appendTo(tr);
                    $("<td>" + settlements[i].order_price + "</td>").appendTo(tr);
                    $("<td>" + settlements[i].rider_price + "</td>").appendTo(tr);
                    $("<td>" + settlements[i].merchant_price + "</td>").appendTo(tr);
                    $("<td>" + settlements[i].operation_price + "</td>").appendTo(tr);
                    $("<td>" + settlements[i].time + "</td>").appendTo(tr);
                    if(settlements[i].withdraw == 0){
                        $('<td><button class="btn btn-danger btn-xs stop">已结算</button></td>').appendTo(tr);
                    }else{
                        $('<td><button class="btn btn-danger btn-xs active">未结算</button></td>').appendTo(tr);
                    }
                }
            },
            error: function () {
                alert("error");
            }
        });
    });

    $('#download').click(function(){
        window.location.href="http://180.76.233.59:81/download";
    })

    $('#withdraw').click(function(){
        $.ajax({
            url:'http://180.76.233.59:81/withdraw',
            type:'post',
            dataType: 'json',
            success:function(data){
                if(data.status==0){
                    alert("成功结算" +　data.data.price + "元");
                    window.location.reload();
                }
            },
            error:function(){
                alert("error");
            }
        });
    })

}

function userList(){
    $.ajax({
        url: 'http://180.76.233.59:81/user/list',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var table = $("#example1 tbody")[0]
            var user_list = data.data.users;//admins
            for (var i = 0; i < user_list.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                //添加id
                var td_merchant_id = $("<td>" + user_list[i].id + "</td>");
                td_merchant_id.appendTo(tr);
                //nick
                $("<td>" + user_list[i].name + "</td>").appendTo(tr);
                $("<td>" + user_list[i].sex + "</td>").appendTo(tr);

                $("<td>" + user_list[i].mobile + "</td>").appendTo(tr);
                if(user_list[i].is_del==0){
                    $("<td>正常</td>").appendTo(tr);
                }else{
                    $("<td>异常</td>").appendTo(tr);
                }
                if(user_list[i].is_del==0){
                    $('<td><button class="btn btn-danger btn-xs stop">禁用</button>' + '<button class="btn  btn-xs success chong" style="margin-left:10px;" >充钱</button></td>').appendTo(tr);
                }else{
                    $('<td><button class="btn btn-danger btn-xs active">恢复</button>' + '<button class="btn  btn-xs success chong" style="margin-left:10px;" >充钱</button></td>').appendTo(tr);
                }
                $('<td><button class="btn  btn-xs success coupon" >查券</button></td>').appendTo(tr);
            }
            $(".stop").each(function(event){
                $(this).click(function(event){
                    var user_id = $(this).parent().siblings(":first").text();

                    $.ajax({
                        url:'http://180.76.233.59:81/user/stop',
                        type:'post',
                        dataType: 'json',
                        data: {"user_id": user_id},
                        success:function(data){
                            if(data.status==0){
                                alert("禁用成功");
                                window.location.href = "./user_list0.html";

                            }
                        },
                        error:function(){
                            alert("error");
                        }
                    });
                });
            });
            $(".chong").each(function(event){
                $(this).click(function(event){
                    localStorage.userId = $(this).parent().siblings(":first").text();
                    window.location.href="./user_card.html"
                });
            });
            $(".coupon").each(function(event){
                $(this).click(function(event){
                    localStorage.userId = $(this).parent().siblings(":first").text();
                    window.location.href = "./user_coupon.html";
                });
            });
            $(".active").each(function(event){
                $(this).click(function(event){

                    var user_id = $(this).parent().siblings(":first").text();

                    $.ajax({
                        url:'http://180.76.233.59:81/user/active',
                        type:'post',
                        dataType: 'json',
                        data: {"user_id": user_id},
                        success:function(data){
                            if(data.status==0){
                                alert("恢复成功");
                                window.location.href = "./user_list0.html";
                            }
                        },
                        error:function(){
                            alert("error");
                        }
                    });
                });
            });
        },
        error: function () {
            alert("error");
        }
    });

    var myAlert = $('#alert');
    setTimeout(function () {
        $("#info").slideUp(500);
    }, 3000);
}

function welcome(){
    var myAlert = $('#alert');
    setTimeout(function(){
        $("#info").slideUp(500);
    }, 3000);

    $('a[action="delete"]').on('click',function(){
        var id = $(this).attr('data');
        var me = $(this).parent().parent();
        $.ajax({
            url:''+id,
            type:'delete',
            dataType: 'json',
            success:function(data){
                console.log(typeof(data.code));
                switch(data.code){
                    case 0:
                        me.remove();
                        myAlert.removeClass('callout-danger');
                        myAlert.addClass('callout-success');
                        myAlert.find('p[name="content"]').html('删除成功');
                        break;
                    case 1:
                        myAlert.removeClass('callout-success');
                        myAlert.addClass('callout-danger');
                        myAlert.find('p[name="content"]').html('删除失败');
                        break;
                }
                myAlert.removeClass('hide');
                myAlert.stop(true,true).slideDown();
                setTimeout(function(){
                    myAlert.stop(true,true).slideUp(500);
                },1000);
            },
            error:function(){
                alert("error");
            }
        });
    });
}

function userCard(){
    var dataJson = {};
    dataJson.user_id = localStorage.userId;
    $.ajax({
        cache: false,
        type: "POST",
        url:"http://180.76.233.59:81/user/card",
        data: dataJson,
        async: true,
        error: function(request) {
            alert("Connection error");
        },
        success: function(data) {
            if (data.status=='0') {
                user_card = data.data.user_card;
                $('#id').val(user_card.id);
                $('#real_money').val(user_card.real_money);
                $('#fake_money').val(user_card.fake_money);
                $('#create').val(user_card.created_at);
                $('#update').val(user_card.updated_at);
            }else{
                alert('获取信息失败！');
            }
        }
    });
    $('#putMoney').click(function(){
        var dataJson = {};
        dataJson.user_id = localStorage.userId;
        dataJson.money = $('#money').val();
        $.ajax({
            cache: false,
            type: "POST",
            url:"http://180.76.233.59:81/user/input/money",
            data: dataJson,
            async: true,
            error: function(request) {
                alert("Connection error");
            },
            success: function(data) {
                if (data.status=='0') {
                    alert("充值成功");
                    window.location.reload();
                }else{
                    alert('获取信息失败！');
                }
            }
        })
    })
}

function stationList(){
    $.ajax({
        url: 'http://180.76.233.59:81/station/all',
        type: 'post',
        data: 'region_id=' + localStorage.admin_region_id,
        dataType: 'json',
        success: function (data) {
            var table = $("tbody")[0];
            var station_list = data.data.stations;//admins
            var adress_list = data.data.addresses;//admins
            for (var i = 0; i < station_list.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                //添加id
                var td_admin_id = $("<td>" + station_list[i].id + "</td>");
                td_admin_id.appendTo(tr);
                //nick
                $("<td>" + station_list[i].name + "</td>").appendTo(tr);
                //状态
                //创建时间
                $("<td>" + adress_list[i].lat + "</td>").appendTo(tr);
                $("<td>" + adress_list[i].lng + "</td>").appendTo(tr);
                $("<td>" + adress_list[i].comment + "</td>").appendTo(tr);
                $("<td>" + station_list[i].created_at + "</td>").appendTo(tr);
                //更新时间
                $("<td>" + station_list[i].updated_at + "</td>").appendTo(tr);
                 $('<td><a class="btn btn-danger btn-xs delete">删除</a>').appendTo(tr);

            }

            $(".delete").each(function(event){
                $(this).click(function(event){

                    var admin_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.233.59:81/station/destroy',
                        type:'post',
                        dataType: 'json',
                        data: {"station_id": admin_id},
                        success:function(data){
                            if(data.status==0){
                                window.location.href = "./station_list.html";
                                alert("删除成功");
                            }
                        },
                        error:function(){
                            alert("删除失败");
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

function stationAdd(){
    var city = [];
    $(document).ready(function(){
        $('#fr').attr("src", "./baidu_map.html");
    })
    function changeCity(){
        $.ajax({
            url: 'http://api.map.baidu.com/place/v2/suggestion',
            type: "get",
            data: "query=" + $('#tags').val() + "&region=" + $('#region').val() + "&city_limit=true&output=json&ak=MVX9n2erFcFAZIDp8yw3ICCpozbvmtwP",
            dataType: "jsonp",
            async: 'false',
            success: function(data){
                for (var i = 0 ; i < data.result.length ; i++){
                    city[i] = data.result[i].name;
                    console.log(city[i]);
                }
                $('#tags').autocomplete({
                    source: city,
                    select: function(event, data){
                        $.ajax({
                            url: 'http://api.map.baidu.com/place/v2/suggestion',
                            type: "get",
                            data: "query=" + data.item.value + "&region=" + $('#region').val() + "&city_limit=true&output=json&ak=MVX9n2erFcFAZIDp8yw3ICCpozbvmtwP",
                            dataType: "jsonp",
                            async: 'false',
                            success: function(data){
                                $('#lat').val(data.result[0].location.lat);
                                $('#lng').val(data.result[0].location.lng);
                            }
                        })
                    }
                });
            }
        });
    }
    $('#tags').blur(function(){
        var region = $('#region').val();
        var address = $('#tags').val();
        if (region == "" || region == undefined || region == null){
            alert("区域不能为空");
            return;
        } else if(address == "" || address == undefined || address == null){
            alert("具体地址不能为空");
        }
        $.ajax({
            url: "https://api.map.baidu.com/place/v2/suggestion",
            type: "get",
            data: "query=" + address + "&region=" + region + "&city_limit=true&output=json&ak=MVX9n2erFcFAZIDp8yw3ICCpozbvmtwP",
            dataType: "jsonp",
            async: false,
            success: function(data){
                $('#lat').val(data.result[0].location.lat);
                $('#lng').val(data.result[0].location.lng);
                $('#fr').attr('src', "./baidu_map.html?lat=" + $('#lat').val() + "&lng=" + $('#lng').val() +"&region=" + region + "&address=" + address);
            }
        });
    })
    $('#stationPut').click(function(){
        var lat = $('#lat').val();
        var lng = $('#lng').val();
        var comment = $('#comment').val();
        var region = $('#region').val();
        var merchant_id = 1;
        var name = $('#addressName').val();
        $.ajax({
            url: "http://180.76.233.59:81/station/create",
            type: "post",
            dataType: "json",
            data: {"lat": lat, "lng": lng, "comment": comment, "region_name": region, "name": name },
            async: "false",
            success: function(data){
                alert(data.msg);
                window.location.href = "./station_list.html";
            }
        });
    })
    var region = [];
    $.ajax({
        url: "http://180.76.141.171/station/first",
        type: "post",
        dataType: "json",
        async: "false",
        success: function (data) {
            for (var i = 0; i < data.data.regions.length; i++) {
                region[i] = data.data.regions[i].name;
            }
            $('#region').autocomplete({
                source: region
            });
        }
    });
}

function riderExamine(){
    $.ajax({
        url:'http://180.76.233.59:81/review/rider',
        type:'get',
        dataType: 'json',
        success:function(data){
            var table=$("tbody")[0];
            var riders=data.riders;
            for(var i=0;i<riders.length;i++)
            {
                var tr=$("<tr></tr>");
                tr.appendTo(table);
                $("<td align='center'>"+riders[i].id+"</td>").appendTo(tr);
                $("<td align='center'>"+riders[i].name+"</td>").appendTo(tr);
                $("<td align='center'>"+riders[i].mobile+"</td>").appendTo(tr);
                $("<td align='center'>"+riders[i].sex+"</td>").appendTo(tr);
                $('<td>'+riders[i].license_num+'</td>').appendTo(tr);
                $('<td>'+riders[i].created_at+'</td>').appendTo(tr);
                //操作
                $('<td><button class="btn btn-danger btn-xs examine">审核</button></td>').appendTo(tr);
            }
            $(".examine").each(function(event){
                $(this).click(function(event){
                    var rider_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.233.59:81/post/rider',
                        type:'post',
                        dataType: 'json',
                        data: {"rider_id": rider_id},
                        success:function(data){
                            if(data.status==0){
                                alert("审核成功");
                                window.location.reload();
                            }
                        },
                        error:function(){
                            alert("error");
                        }
                    });
                });
            });
        },
        error:function(){
            alert("error");
        }
    });
}

function riderList(){
    $.ajax({
        url:'http://180.76.233.59:81/manage/rider',
        type:'get',
        dataType: 'json',
        success:function(data){
            var table=$("#example1 tbody")[0]

            var rider_list=data.riders;//admins

            var tr=$("<tr></tr>");
            tr.appendTo(table);
            for(var i=0;i<rider_list.length;i++)
            {
                var tr=$("<tr></tr>");
                tr.appendTo(table);

                //添加id
                var td_rider_id=$("<td align='center'>"+rider_list[i].id+"</td>");
                td_rider_id.appendTo(tr);
                //name
                $("<td align='center'>"+rider_list[i].name+"</td>").appendTo(tr);
                //mobile
                $("<td align='center'>"+rider_list[i].mobile+"</td>").appendTo(tr);
                //sex
                $("<td align='center'>"+rider_list[i].sex+"</td>").appendTo(tr);
                //license_num
                $("<td align='center'>"+rider_list[i].license_num+"</td>").appendTo(tr);

                //card
                $('<td><img src="'+rider_list[i].id_front+'" width="30" height="30"></td>').appendTo(tr);
                //card
                $('<td><img src="'+rider_list[i].id_back+'" width="30" height="30"></td>').appendTo(tr);

                //操作
                if(rider_list[i].is_del==0){
                    $('<td><button class="btn btn-danger btn-xs stop">禁用</button>|<button class="btn btn-danger btn-xs  station">站点</button></td>').appendTo(tr);
                }else{
                    $('<td><button class="btn btn-danger btn-xs active">恢复</button>|<button class="btn btn-danger btn-xs  station">站点</button></td>').appendTo(tr);
                }
            }

            $(".stop").each(function(event){
                $(this).click(function(event){
                    var rider_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.233.59:81/stop/rider',
                        type:'post',
                        dataType: 'json',
                        data: {"rider_id": rider_id},
                        success:function(data){
                            if(data.status==0){
                                alert("禁用成功");
                                window.location.href = "./rider_list.html";
                            }
                        },
                        error:function(){
                            alert("error");
                        }
                    });
                });
            });
            $(".station").each(function(event){
                $(this).click(function(event){

                    var rider_id = $(this).parent().siblings(":first").text();
                    localStorage.update_rider_id = rider_id;
                    window.location.href = "./rider_stations_list.html";

                });
            });
            $(".active").each(function(event){
                $(this).click(function(event){
                    var rider_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.233.59:81/active/rider',
                        type:'post',
                        dataType: 'json',
                        data: {"rider_id": rider_id},
                        success:function(data){
                            if(data.status==0){
                                alert("恢复成功");
                                window.location.href = "./rider_list.html";

                            }
                        },
                        error:function(){
                            alert("error");
                        }
                    });
                });
            });
        },
        error:function(){
        }
    });
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
        }
    });
    var myAlert = $('#alert');
    setTimeout(function(){
        $("#info").slideUp(500);
    }, 3000);
}

function productAdd(){
    $("#add_product").click(function () {
        var category_id = localStorage.update_category_id;
        alert(category_id);
        var name = $("#name").val();
        var price = $("#price").val();
        $.ajax({
            type:"post",
            dataType:'json',
            url:"http://180.76.233.59:81/product/add",
            data: {"category_id":category_id, "name": name, "price": price},
            success:function(data){

                if(data.status == 0){
                    alert("修改成功！")
                    window.location.href = "./product_list0.html";
                }else{
                    alert("something wrong")
                }
            }
        });

        return false;
    });
}

function merchantList(){
    $.ajax({
        url: 'http://180.76.233.59:81/manage/merchant',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var table = $("#example1 tbody")[0]

            var merchant_list = data.merchants;//admins
            for (var i = 0; i < merchant_list.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);

                //添加id
                var td_merchant_id = $("<td>" + merchant_list[i].id + "</td>");
                td_merchant_id.appendTo(tr);
                //nick
                $("<td>" + merchant_list[i].nick + "</td>").appendTo(tr);
                $("<td>" + merchant_list[i].rename + "</td>").appendTo(tr);

                $("<td>" + merchant_list[i].mobile + "</td>").appendTo(tr);

                $("<td><img src='"+ merchant_list[i].card + "'  width='30' height='30'/></td>").appendTo(tr);

                $("<td>" + merchant_list[i].sex + "</td>").appendTo(tr);

                $("<td><img src='"+ merchant_list[i].logo + "'  width='30' height='30' /></td>").appendTo(tr);

                if(merchant_list[i].status==0){
                    $("<td>正常</td>").appendTo(tr);
                }else{
                    $("<td>异常</td>").appendTo(tr);
                }

                $("<td>" + merchant_list[i].comment + "</td>").appendTo(tr);


                if(merchant_list[i].is_delete==0){
                    $('<td><button class="btn btn-danger btn-xs stop">禁用</button>|<button class="btn btn-danger btn-xs station">站点</button></td>').appendTo(tr);
                }else{
                    $('<td><button class="btn btn-danger btn-xs active">恢复</button>|<button class="btn btn-danger btn-xs  station">站点</button></td>').appendTo(tr);
                }
                //
                //$('<td><a class="btn btn-primary btn-xs" href="./admin_edit.html?this_admin_id=' + merchant_list[i].id + '">编辑</a><a class="btn btn-danger btn-xs" data="1" action="delete">删除</a></td>').appendTo(tr);
            }
            $(".stop").each(function(event){
                $(this).click(function(event){

                    var merchant_id = $(this).parent().siblings(":first").text();

                    $.ajax({
                        url:'http://180.76.233.59:81/stop/merchant',
                        type:'post',
                        dataType: 'json',
                        data: {"merchant_id": merchant_id},
                        success:function(data){
                            if(data.status==0){
                                alert("禁用成功");
                                window.location.href = "./merchant_list.html";

                            }
                        },
                        error:function(){
                            alert("error");
                        }
                    });
                });
            });
            $(".station").each(function(event){
                $(this).click(function(event){

                    var merchant_id = $(this).parent().siblings(":first").text();
                    localStorage.update_merchant_id = merchant_id;
                    window.location.href = "./merchant_stations_list.html";

                });
            });
            $(".active").each(function(event){
                $(this).click(function(event){

                    var merchant_id = $(this).parent().siblings(":first").text();

                    $.ajax({
                        url:'http://180.76.233.59:81/active/merchant',
                        type:'post',
                        dataType: 'json',
                        data: {"merchant_id": merchant_id},
                        success:function(data){
                            if(data.status==0){
                                alert("恢复成功");
                                window.location.href = "./merchant_list.html";

                            }
                        },
                        error:function(){
                            alert("error");
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

function priceEdit(){
    var product_id = getURLQuery('product_id');
    $('#product_id').val(product_id);
    $.ajax({
        url: "http://180.76.233.59:81/product/price/show",
        type: "post",
        data: "product_id=" + product_id,
        dataType: "json",
        async: "false",
        success: function(data){
            if (data.status != 0){
                alert('暂时还没有商户定价');
                window.location.href="./product_list0.html";
            } else {
                var price = data.data.count;
                var name = data.data.product.name;
                $('#product_name').text(name);
                $('#middle_price').text(price);
                $('#price1').attr('placeholder', data.data.product.price1);
                $('#price2').attr('placeholder', data.data.product.price2);
                $('#price3').attr('placeholder', data.data.product.price3);
                $('#price4').attr('placeholder', data.data.product.price4);
                $('#price5').attr('placeholder', data.data.product.price5);
                $('#price6').attr('placeholder', data.data.product.price6);
            }
        }
    })

    $('button[name=save]').click(function(){
        var jsonData = {};
        jsonData.price1 = $('#price1').val();
        jsonData.price2 = $('#price2').val();
        jsonData.price3 = $('#price3').val();
        jsonData.price4 = $('#price4').val();
        jsonData.price5 = $('#price5').val();
        jsonData.price6 = $('#price6').val();
        jsonData.product_id = $('#product_id').val();
        $.ajax({
            url: "http://180.76.233.59:81/product/price/add",
            type: "post",
            data: jsonData,
            dataType: "json",
            async: "false",
            success: function(data){
                if (data.status == 0){
                    alert("添加成功");
                    window.location.reload();
                } else {
                    alert("添加失败");
                }
            }
        })
    })
}

function merchantExamine(){
    $.ajax({
        url:'http://180.76.233.59:81/review/merchant',
        type:'get',
        dataType: 'json',
        success:function(data){
            var table=$("#example1 tbody")[0]

            var merchant_list=data.merchants;//admins

            var tr=$("<tr></tr>");
            tr.appendTo(table);
            for(var i=0;i<merchant_list.length;i++)
            {
                var tr=$("<tr></tr>");
                tr.appendTo(table);
                //添加id
                var td_merchant_id=$("<td align='center'>"+merchant_list[i].id+"</td>");
                td_merchant_id.appendTo(tr);
                //nick
                $("<td align='center'>"+merchant_list[i].nick+"</td>").appendTo(tr);
                //mobile
                $("<td align='center'>"+merchant_list[i].mobile+"</td>").appendTo(tr);
                //mail
                $("<td align='center'>"+merchant_list[i].mail+"</td>").appendTo(tr);
                //license
                $('<td><img src="'+merchant_list[i].license+'" width="30" height="30"></td>').appendTo(tr);
                //card
                $('<td><img src="'+merchant_list[i].card+'" width="30" height="30"></td>').appendTo(tr);

                //操作
                $('<td><button class="btn btn-danger btn-xs examine">审核</button></td>').appendTo(tr);
            }

            $(".examine").each(function(event){
                $(this).click(function(event){

                    var merchant_id = $(this).parent().siblings(":first").text();

                    $.ajax({
                        url:'http://180.76.233.59:81/post/merchant',
                        type:'post',
                        dataType: 'json',
                        data: {"merchant_id": merchant_id},
                        success:function(data){
                            if(data.status==0){
                                alert("审核成功");
                                window.location.href = "./merchant_examine.html";
                            }
                        },
                        error:function(){
                            alert("error");
                        }
                    });
                });
            });
        },
        error:function(){
            alert("error");
        }
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
        }
    });
    var myAlert = $('#alert');
    setTimeout(function(){
        $("#info").slideUp(500);
    }, 3000);
    $(document).ready(function(){
        $(".examine").each(function(index, element){
            element.unbind("click"); // unbind binded event handler at first　
            element.bind("click", function(){alert("click");});
        });
    });
}

function logList(){
    $.ajax({
        url: 'http://180.76.233.59:81/logs',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            var table = $("tbody")[0];
            var logs = data.data.logs;//admins
            for (var i = 0; i < logs.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $("<td>" + logs[i].id + "</td>").appendTo(tr);
                $("<td>" + logs[i].user_card_id + "</td>").appendTo(tr);
                $("<td>" + logs[i].real_money + "</td>").appendTo(tr);
                $("<td>" + logs[i].fake_money + "</td>").appendTo(tr);
                $("<td>" + logs[i].method + "</td>").appendTo(tr);
                $("<td>" + logs[i].created_at + "</td>").appendTo(tr);
                $("<td>" + logs[i].updated_at + "</td>").appendTo(tr);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function couponList(){
    $.ajax({
        url: 'http://180.76.233.59:81/coupon/show',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            var table = $("tbody")[0];
            var coupons = data.data.coupons;//admins
            for (var i = 0; i < coupons.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                $("<td>" + coupons[i].id + "</td>").appendTo(tr);
                $("<td>" + coupons[i].name + "</td>").appendTo(tr);
                $("<td>" + coupons[i].from + "</td>").appendTo(tr);
                $("<td>" + coupons[i].to + "</td>").appendTo(tr);
                $("<td>" + coupons[i].price + "</td>").appendTo(tr);
                $("<td>" + coupons[i].discount + "</td>").appendTo(tr);
            }
        },
        error: function () {
            alert("error");
        }
    });
}

function categoryList(){
    $.ajax({
        url: 'http://180.76.233.59:81/category/list',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var table = $("#example1 tbody")[0]
            var category_list = data.data.categories;//admins
            for (var i = 0; i < category_list.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);
                var td_category_id = $("<td>" + category_list[i].id + "</td>");
                td_category_id.appendTo(tr);
                $("<td>" + category_list[i].name + "</td>").appendTo(tr);
                $('<td><img src="'+category_list[i].logo+'" width="30" height="30"></td>').appendTo(tr);
                $("<td>" + category_list[i].created_at + "</td>").appendTo(tr);
                $("<td>" + category_list[i].created_at + "</td>").appendTo(tr);
                if (category_list[i].is_delete == 0) {
                    $("<td>可用</td>").appendTo(tr);
                } else {
                    $("<td>不可用</td>").appendTo(tr);
                }
                $('<td><a class="btn btn-danger btn-xs delete">删除</a>|<a class="btn btn-success btn-xs update"> 修改</a>|<a class="btn btn-adn btn-xs product"> 产品</a></td>').appendTo(tr);
            }
            $(".delete").each(function(event){
                $(this).click(function(event){
                    var category_id = $(this).parent().siblings(":first").text();
                    $.ajax({
                        url:'http://180.76.233.59:81/category/stop',
                        type:'post',
                        dataType: 'json',
                        data: {"category_id": category_id},
                        success:function(data){
                            if(data.status==0){
                                alert("删除成功");
                                window.location.href = "./category_list0.html";
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
                    var category_id = $(this).parent().siblings(":first").text();
                    localStorage.update_category_id = category_id;
                    window.location.href = "./category_edit0.html";
                });
            });
            $(".product").each(function(event){
                $(this).click(function(event){
                    var category_id = $(this).parent().siblings(":first").text();
                    localStorage.update_category_id = category_id;
                    window.location.href = "./product_list0.html";
                });
            });
        },
        error: function () {
            alert("error");
        }
    });
}

function couponCreate(){
    $('#from').datetimepicker();
    $('#to').datetimepicker();
    $('#couponInput').click(function(){
        var dataJson = {};
        dataJson.name = $('#name').val();
        dataJson.from = $('.from').val();
        dataJson.to = $('.to').val();
        dataJson.price = $('#price').val();
        dataJson.discount = $('#discount').val();
        $.ajax({
            url:'http://180.76.233.59:81/coupon/create',
            type:'post',
            data: dataJson,
            dataType: 'json',
            success:function(data){
                if(data.status==0){
                    alert("建立成功");
                }
            },
            error:function(){
                alert("建立失败");
            }
        })
    });
}

function categoryEdit(){
    $("#edit_category").click(function () {
        var category_id = localStorage.update_category_id;
        alert(category_id);
        var name = $("#name").val();
        $.ajax({
            type:"post",
            dataType:'json',
            url:"http://180.76.233.59:81/category/edit",
            data: {"category_id":category_id, "name": name},
            success:function(data){
                if(data.status == 0){
                    alert("修改成功！")
                    window.location.href = "./category_list0.html";
                }else{
                    alert("something wrong")
                }
            }
        });
        return false;
    });
}

function categoryAdd(){
    var region = [];
    $.ajax({
        url: "http://180.76.141.171/station/first",
        type: "post",
        dataType: "json",
        async: "false",
        success: function (data) {
            for (var i = 0; i < data.data.regions.length; i++) {
                region[i] = data.data.regions[i].name;
            }
            $('#region1').autocomplete({
                source: region
            })
            $('#region2').autocomplete({
                source: region
            })
            $('#region3').autocomplete({
                source: region
            })
            $('#region4').autocomplete({
                source: region
            })
            $('#region5').autocomplete({
                source: region
            })
            $('#region6').autocomplete({
                source: region
            })
        }
    });

    $('#submitButton').click(function(){
        var url = 'http://180.76.233.59:81/category/add';
        $.ajax({
            cache: true,
            type: "POST",
            url:url,
            cache: false,
            data: new FormData($('#registerForm')[0]),
            processData: false,
            contentType: false,
            async: false,
            error: function(request) {
                alert("Connection error");
            },
            success: function(data) {
                alert(data.msg);
                if (data.status=='0') {
                    alert("添加成功！");
                    window.location.href = "./category_list0.html";
                }else{
                    alert('添加失败，重新来过！');
                }
            }
        });
        return false;
    });

}

//获取url中的参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function adminList(){
    $.ajax({
        url: 'http://180.76.233.59:81/show/admin',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var table = $("#example1 tbody")[0]

            var admin_list = data.data;//admins
            for (var i = 0; i < admin_list.length; i++) {
                var tr = $("<tr></tr>");
                tr.appendTo(table);

                //添加id
                var td_admin_id = $("<td>" + admin_list[i].id + "</td>");
                td_admin_id.appendTo(tr);
                //nick
                $("<td>" + admin_list[i].nick + "</td>").appendTo(tr);
                //状态
                if (admin_list[i].is_del == 0) {
                    $("<td>可用</td>").appendTo(tr);
                } else {
                    $("<td>不可用</td>").appendTo(tr);
                }
                //创建时间
                $("<td>" + admin_list[i].created_at + "</td>").appendTo(tr);
                //更新时间
                $("<td>" + admin_list[i].created_at + "</td>").appendTo(tr);
                //角色
                if (admin_list[i].role_id == 1) {
                    $("<td>超级管理员</td>").appendTo(tr);
                }else if (admin_list[i].role_id == 2) {
                    $("<td>运营</td>").appendTo(tr);
                } else {
                    $("<td>区域管理员</td>").appendTo(tr);
                }
                //
                //$('<td><a class="btn btn-primary btn-xs" href="./admin_edit.html?this_admin_id=' + admin_list[i].id + '">编辑</a><a class="btn btn-danger btn-xs" data="1" action="delete">删除</a></td>').appendTo(tr);
                $('<td><a class="btn btn-danger btn-xs delete">删除</a>|<a class="btn btn-success btn-xs update"> 修改</a></td>').appendTo(tr);

            }

            $(".delete").each(function(event){
                $(this).click(function(event){

                    var admin_id = $(this).parent().siblings(":first").text();

                    $.ajax({
                        url:'http://180.76.233.59:81/remove/admin',
                        type:'post',
                        dataType: 'json',
                        data: {"admin_id": admin_id},
                        success:function(data){
                            if(data.status==0){
                                window.location.href = "./admin_list.html";
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

                    var admin_id = $(this).parent().siblings(":first").text();
                    localStorage.update_admin_id = admin_id;
                    window.location.href = "./admin_edit.html";

                });
            });

        },
        error: function () {
            alert("error");
        }
    });
}

function adminAdd(){
    var region = [];
    $.ajax({
        url: "http://180.76.233.59/station/first",
        type: "post",
        dataType: "json",
        async: "false",
        success: function (data) {
            for (var i = 0; i < data.data.regions.length; i++) {
                region[i] = data.data.regions[i].name;
            }
            $('#region').autocomplete({
                source: region
            })
        }, error: function () {
            alert("无法获取地区信息");
        }
    });

    $("#add_admin").click(function () {
        var nick = $('#nick').val();
        var password = $("#password").val();
        var role_id = $("#role_id").val();
        var region_name = $("#region").val();
        $.ajax({
            type:"post",
            dataType:'json',
            url:"http://180.76.233.59:81/add/admin",
            data: {"nick": nick, "password": password, "role_id":role_id, "region_name":region_name},
            success:function(data){
                if(data.status == 0){
                    window.location.href = "welcome.html";
                }else{
                    alert("something wrong")
                }
            }
        });
        return false;
    });
}


function areaStatic() {
    var url = 'http://180.76.233.59:81/statistic/sex';
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
        url: 'http://180.76.233.59:81/product/list',
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
                        url:'http://180.76.233.59:81/product/stop',
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
            alert('error');
        }
    });
});
}

function riderStationList() {
    $.ajax({
        url: 'http://180.76.233.59:81/rider/station',
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
                        url:'http://180.76.233.59:81/rider/unbindRider',
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
        url: 'http://180.76.233.59:81/rider/unstation',
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
                        url:'http://180.76.233.59:81/rider/bind',
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
        url: 'http://180.76.233.59:81/merchant/unstation',
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
                        url:'http://180.76.233.59:81/merchant/bind',
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
        url: 'http://180.76.233.59:81/merchant/station',
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
                        url:'http://180.76.233.59:81/merchant/unbind',
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