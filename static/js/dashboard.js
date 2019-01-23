(function($) {
  'use strict';
  
  if ($("#chart-activity").length) {
    var areaData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [{
          data: [95, 136, 116, 139, 119, 150, 87],
          backgroundColor: [
            '#fdbab1'
          ],
          borderColor: [
            '#fdbab1'
          ],
          borderWidth: 0,
          fill: 'origin',
        },
        {
          data: [143, 250, 179, 220, 185, 240, 122],
          backgroundColor: [
            '#439aff'
          ],
          borderColor: [
            '#439aff'
          ],
          borderWidth: 0,
          fill: 'origin',
        }
      ]
    };
    var areaOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        filler: {
          propagate: false
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            lineWidth: 0,
            color: "rgba(0,0,0,0)"
          }
        }],
        yAxes: [{
          display: false,
          ticks: {
            display: false,
            autoSkip: false,
            maxRotation: 0,
            stepSize: 15,
            min: 0,
            max: 250
          }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      },
      elements: {
        line: {
          tension: 0
        },
        point: {
          radius: 0
        }
      }
    }
    var activityChartCanvas = $("#chart-activity").get(0).getContext("2d");
    var activityChart = new Chart(activityChartCanvas, {
      type: 'line',
      data: areaData,
      options: areaOptions
    });
  }
  if ($('#sales-chart').length) {
    var lineChartCanvas = $("#sales-chart").get(0).getContext("2d");
    var data = {
      labels: ["2013", "2014", "2014", "2015", "2016", "2017", "2018"],
      datasets: [
        {
          label: 'Support',
          data: [1500, 7030, 1050, 2300, 3510, 6800, 4500],
          borderColor: [
            '#fdbab1'
          ],
          borderWidth: 3,
          fill: false
        },
        {
          label: 'Product',
          data: [5500, 4080, 3050, 5600, 4510, 5300, 2400],
          borderColor: [
            '#439aff'
          ],
          borderWidth: 3,
          fill: false
        }
      ]
    };
    var options = {
      scales: {
        yAxes: [{
          display: false,
          gridLines: {
            drawBorder: false,
            lineWidth: 0,
            color: "rgba(0,0,0,0)"
          },
          ticks: {
            stepSize: 2000,
            fontColor: "#686868"
          }
        }],
        xAxes: [{
          gridLines: {
            drawBorder: false,
            lineWidth: 0,
            color: "rgba(0,0,0,0)"
          }
        }]
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 0
        }
      },
      stepsize: 1
    };
    var lineChart = new Chart(lineChartCanvas, {
      type: 'line',
      data: data,
      options: options
    });
  }
  if ($("#inline-datepicker-example").length) {
    $('#inline-datepicker-example').datepicker({
      enableOnReadonly: true,
      todayHighlight: true,
    });
  }
})(jQuery);
