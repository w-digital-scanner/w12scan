$(document).ready(function () {
    $(".show-left a").click(function () {
        var keyword = $(this).attr("data-search");
        console.log(keyword);
        var form_search = $('#recent-search');
        var current = form_search.val();
        if (current === "") {
            form_search.val(keyword)
        } else {
            form_search.val(current + " " + keyword);
        }
    })

    $(".words .words-close").click(function () {
        var parent = $(this).parent();
        var keyword = parent.text();
        var search_keyword = $("#recent-search").val().replace(/'/g,'"');
        var build = search_keyword.replace(keyword, "");
        location.href = "/?q=" + build
    })

    function getNodeLog() {
        $.ajax({
            url: '/api/v1/node?name=' + nodename,// 跳转到 action
            type: 'get',
            success: function (data) {
                $("#node-modal #shell-mode").val(data.msg);
            },
            error: function () {
                alert("异常！");
            }
        })
    }

    var dingshi, nodename;

    $(".running-node .btn-logs").click(function () {
        nodename = $(this).attr("data-target");
        console.log(nodename);
        getNodeLog();
        $('#node-modal').modal('show');
    })

    $(".running-node .btn-delete").click(function () {
        nodename = $(this).attr("data-target");
        $.ajax({
            url: '/api/v1/node?name=' + nodename,
            type: "delete",
            success: function (data) {
                swal({
                    title: '删除成功!',
                    text: data.msg,
                    icon: 'success',
                    button: {
                        text: "Continue",
                        value: true,
                        visible: true,
                        className: "btn btn-primary"
                    }
                })
            },
            error: function () {
                alert("error");
            }
        })
    })

    $('#node-modal').on('show.bs.modal', function (e) {
        dingshi = setInterval(getNodeLog, 2000);
    })

    $('#node-modal').on('hidden.bs.modal', function (e) {
        window.clearInterval(dingshi);
    })

    $(".task-create").click(function () {
        var content = $("#task-modal #content-modal").val();
        $.ajax({
            url: '/api/v1/scan',// 跳转到 action
            data: content,
            type: 'post',
            success: function (data) {
                console.log(data)
                $('#task-modal').modal('hide');
                if (data.status == 200) {
                    swal({
                        title: '添加成功!',
                        text: data.msg,
                        icon: 'success',
                        button: {
                            text: "Continue",
                            value: true,
                            visible: true,
                            className: "btn btn-primary"
                        }
                    })
                }
            },
            error: function () {
                alert("异常！");
            }
        })
    });

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
                        title: '添加失败',
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
            type: "delete",
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
            id: id,
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

    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: true
        },
        elements: {
            point: {
                radius: 0
            }
        }

    };

    var doughnutPieOptions = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    if ($("#lineChart").length) {
        console.log(chart_labels, chart_data);
        var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
        var data = {
            labels: chart_labels,
            datasets: [{
                label: '# 任务量',
                data: chart_data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: data,
            options: options
        });
    }

    if ($("#barChart").length) {
        var barChartCanvas = $("#barChart").get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var data = {
            labels: bar_labels,
            datasets: [{
                label: '# 数量',
                data: bar_data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };
        var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: data,
            options: options
        });


    }

    if ($("#pieChart").length) {
        var doughnutPieData = {
            datasets: [{
                data: pip_data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: pie_labels
        };

        var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
        var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: doughnutPieData,
            options: doughnutPieOptions
        });
    }

    if ($("#doughnutChart").length) {
        var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
        var doughnutPieData2 = {
            datasets: [{
                data: doughnut_data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: doughnut_labels
        };

        var doughnutChart = new Chart(doughnutChartCanvas, {
            type: 'doughnut',
            data: doughnutPieData2,
            options: doughnutPieOptions
        });
    }


});