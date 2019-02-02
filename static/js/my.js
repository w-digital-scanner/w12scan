$(document).ready(function () {
    $(".zc-create").click(function () {
        var name = $("#exampleModal-4 #recipient-name").val();
        var desc = $("#exampleModal-4 #recipient-desc").val();
        var domains = $("#exampleModal-4 #domain-text").val();
        var ips = $("#exampleModal-4 #ip-text").val();
        var data = {
            name: name,
            desc: desc,
            ips: ips,
            domains: domains
        }
        console.log(data);
        var aj = $.ajax({
            url: '/api/v1/zichan',// 跳转到 action
            data: data,
            type: 'post',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                $('#exampleModal-4').modal('hide');
                if (data.msg == "ok") {
                    // view("修改成功！");
                    swal({
                        title: '添加成功!',
                        text: '您添加的资产已经加入到数据库，请刷新页面后查看',
                        icon: 'success',
                        button: {
                            text: "Continue",
                            value: true,
                            visible: true,
                            className: "btn btn-primary"
                        }
                    })
                    // window.location.reload();
                } else {
                    swal({
                        title: '再试一次?',
                        text: data.msg,
                        button: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary"
                        }
                    })
                }
            },
            error: function () {
                // view("异常！");
                alert("异常！");
            }
        });

    });

    $(".zc-table .zc-view").click(function () {
        var _id = $(this).attr("data-id");
        var aj = $.ajax({
            url: '/api/v1/zichan?id=' + _id,// 跳转到 action
            dataType: "json",
            success: function (data) {
                console.log(data)
                $("#zc-update-modal #recipient-name").val(data.msg.name);
                $("#zc-update-modal #recipient-desc").val(data.msg.desc);
                $("#zc-update-modal #domain-text").val(data.msg.domains);
                $("#zc-update-modal #ip-text").val(data.msg.ips);
                $("#zc-update-modal #zc-id").val(data.msg.id);
                $('#zc-update-modal').modal('show')
            }
        })
    });

    $(".zc-table .zc-delete").click(function () {
        var _id = $(this).attr("data-id");
        var aj = $.ajax({
            url: '/api/v1/zichan?id=' + _id,// 跳转到 action
            dataType: "json",
            type:"delete",
            success: function (data) {
                console.log(data)
                window.location.reload()
            }
        })
    });

    $(".zc-update").click(function () {
        var name = $("#zc-update-modal #recipient-name").val();
        var desc = $("#zc-update-modal #recipient-desc").val();
        var domains = $("#zc-update-modal #domain-text").val();
        var ips = $("#zc-update-modal #ip-text").val();
        var id = $("#zc-update-modal #zc-id").val();
        var data = {
            id:id,
            name: name,
            desc: desc,
            ips: ips,
            domains: domains
        }
        console.log(data);
        var aj = $.ajax({
            url: '/api/v1/zichan',// 跳转到 action
            data: data,
            type: 'put',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                $('#zc-update-modal').modal('hide');
                window.location.reload()
            },
            error: function () {
                // view("异常！");
                alert("异常！");
            }
        });

    });

});