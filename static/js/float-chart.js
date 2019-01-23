(function($) {
  'use strict';
  var data = [{
      data: 18000,
      color: '#FABA66',
      label: 'Linda'
    },
    {
      data: 20000,
      color: '#F36368',
      label: 'John'
    },
    {
      data: 13000,
      color: '#76C1FA',
      label: 'Margaret'
    },
    {
      data: 15000,
      color: '#63CF72',
      label: 'Richard'
    }
  ];

  if ($("#pie-chart").length) {
    $.plot("#pie-chart", data, {
      series: {
        pie: {
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 3 / 4,
            formatter: labelFormatter,
            background: {
              opacity: 0.5
            }
          }
        }
      },
      legend: {
        show: false
      }
    });
  }

  function labelFormatter(label, series) {
    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
  }


  /*---------------------
   ----- LINE CHART -----
   ---------------------*/

  var d1 = [
    [0, 30],
    [1, 35],
    [2, 35],
    [3, 30],
    [4, 30]
  ];
  var d2 = [
    [0, 50],
    [1, 40],
    [2, 45],
    [3, 60],
    [4, 50]
  ];
  var d3 = [
    [0, 40],
    [1, 50],
    [2, 35],
    [3, 25],
    [4, 40]
  ];

  var stackedData = [{
      data: d1,
      color: "#76C1FA"
    },
    {
      data: d2,
      color: "#63CF72"
    },
    {
      data: d3,
      color: "#F36368"
    }
  ];
  /*---------------------------------------------------
      Make some random data for Recent Items chart
  ---------------------------------------------------*/


  var options = {
    series: {
      shadowSize: 0,
      lines: {
        show: true,
      },
    },
    grid: {
      borderWidth: 1,
      labelMargin: 10,
      mouseActiveRadius: 6,
      borderColor: '#eee',
      show: true,
      hoverable: true,
      clickable: true

    },
    xaxis: {
      tickColor: '#eee',
      tickDecimals: 0,
      font: {
        lineHeight: 15,
        style: "normal",
        color: "#000"
      },
      shadowSize: 0,
      ticks: [
        [0, "Jan"],
        [1, "Feb"],
        [2, "Mar"],
        [3, "Apr"],
        [4, "May"],
        [5, "Jun"],
        [6, "Jul"],
        [7, "Aug"],
        [8, "Sep"],
        [9, "Oct"],
        [10, "Nov"],
        [11, "Dec"]
      ]
    },

    yaxis: {
      tickColor: '#eee',
      tickDecimals: 0,
      font: {
        lineHeight: 15,
        style: "normal",
        color: "#000",
      },
      shadowSize: 0
    },

    legend: {
      container: '.flc-line',
      backgroundOpacity: 0.5,
      noColumns: 0,
      backgroundColor: "white",
      lineWidth: 0
    },
    colors: ["#F36368", "#63CF72", "#68B3C8"]
  };


  if ($("#line-chart").length) {
    $.plot($("#line-chart"), [{
        data: d1,
        lines: {
          show: true
        },
        label: 'Product A',
        stack: true,
        color: '#F36368'
      },
      {
        data: d2,
        lines: {
          show: true
        },
        label: 'Product B',
        stack: true,
        color: '#FABA66'
      },
      {
        data: d3,
        lines: {
          show: true
        },
        label: 'Product C',
        stack: true,
        color: '#68B3C8'
      }
    ], options);
  }




  /*---------------------------------
      Tooltips for Flot Charts
  ---------------------------------*/
  if ($(".flot-chart-line").length) {
    $(".flot-chart-line").on("bind", "plothover", function(event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2),
          y = item.datapoint[1].toFixed(2);
        $(".flot-tooltip").html(item.series.label + " Sales " + " : " + y).css({
          top: item.pageY + 5,
          left: item.pageX + 5
        }).show();
      } else {
        $(".flot-tooltip").hide();
      }
    });

    $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
  }




  /*---------------------
   ----- AREA CHART -----
   ---------------------*/


  var d1 = [
    [0, 0],
    [1, 35],
    [2, 35],
    [3, 30],
    [4, 30],
    [5, 5],
    [6, 32],
    [7, 37],
    [8, 30],
    [9, 35],
    [10, 30],
    [11, 5]
  ];


  var options = {
    series: {
      shadowSize: 0,
      curvedLines: { //This is a third party plugin to make curved lines
        apply: true,
        active: true,
        monotonicFit: true
      },
      lines: {
        show: false,
        fill: 0.98,
        lineWidth: 0,
      },
    },
    grid: {
      borderWidth: 0,
      labelMargin: 10,
      hoverable: true,
      clickable: true,
      mouseActiveRadius: 6,

    },
    xaxis: {
      tickDecimals: 0,
      tickLength: 0
    },

    yaxis: {
      tickDecimals: 0,
      tickLength: 0
    },

    legend: {
      show: false
    }
  };

  var curvedLineOptions = {
    series: {
      shadowSize: 0,
      curvedLines: { //This is a third party plugin to make curved lines
        apply: true,
        active: true,
        monotonicFit: true
      },
      lines: {
        show: false,
        lineWidth: 0,
      },
    },
    grid: {
      borderWidth: 0,
      labelMargin: 10,
      hoverable: true,
      clickable: true,
      mouseActiveRadius: 6,

    },
    xaxis: {
      tickDecimals: 0,
      ticks: false
    },

    yaxis: {
      tickDecimals: 0,
      ticks: false
    },

    legend: {
      noColumns: 4,
      container: $("#chartLegend")
    }
  };

  if ($("#area-chart").length) {
    $.plot($("#area-chart"), [{
      data: d1,
      lines: {
        show: true,
        fill: 0.6
      },
      label: 'Product 1',
      stack: true,
      color: '#76C1FA'
    }], options);
  }




  /*---------------------
   ----- COLUMN CHART -----
   ---------------------*/

  $(function() {

    var data = [
      ["January", 10],
      ["February", 8],
      ["March", 4],
      ["April", 13],
      ["May", 17],
      ["June", 9]
    ];

    if ($("#column-chart").length) {
      $.plot("#column-chart", [data], {
        series: {
          bars: {
            show: true,
            barWidth: 0.6,
            align: "center"
          }
        },
        xaxis: {
          mode: "categories",
          tickLength: 0
        },

        grid: {
          borderWidth: 0,
          labelMargin: 10,
          hoverable: true,
          clickable: true,
          mouseActiveRadius: 6,
        }

      });
    }
  });



  /*--------------------------------
   ----- STACKED CHART -----
   --------------------------------*/

  $(function() {

    var d1 = [];
    for (var i = 0; i <= 10; i += 1) {
      d1.push([i, parseInt(Math.random() * 30)]);
    }

    var d2 = [];
    for (var i = 0; i <= 10; i += 1) {
      d2.push([i, parseInt(Math.random() * 30)]);
    }

    var d3 = [];
    for (var i = 0; i <= 10; i += 1) {
      d3.push([i, parseInt(Math.random() * 30)]);
    }

    if ($("#stacked-bar-chart").length) {
      $.plot("#stacked-bar-chart", stackedData, {
        series: {
          stack: 0,
          lines: {
            show: false,
            fill: true,
            steps: false
          },
          bars: {
            show: true,
            fill: true,
            barWidth: 0.6
          },
        },
        grid: {
          borderWidth: 0,
          labelMargin: 10,
          hoverable: true,
          clickable: true,
          mouseActiveRadius: 6,
        }
      });
    }
  });

  /*--------------------------------
   ----- REALTIME CHART -----
   --------------------------------*/
  $(function() {

    // We use an inline data source in the example, usually data would
    // be fetched from a server

    var data = [],
      totalPoints = 300;

    function getRandomData() {

      if (data.length > 0)
        data = data.slice(1);

      // Do a random walk

      while (data.length < totalPoints) {

        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;

        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }

        data.push(y);
      }

      // Zip the generated y values with the x values

      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }

      return res;
    }

    // Set up the control widget

    var updateInterval = 30;
    if ($("#realtime-chart").length) {
      var plot = $.plot("#realtime-chart", [getRandomData()], {
        series: {
          shadowSize: 0 // Drawing is faster without shadows
        },
        yaxis: {
          min: 0,
          max: 100
        },
        xaxis: {
          show: false
        },
        grid: {
          borderWidth: 0,
          labelMargin: 10,
          hoverable: true,
          clickable: true,
          mouseActiveRadius: 6,
        }

      });

      function update() {

        plot.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        plot.draw();
        setTimeout(update, updateInterval);
      }

      update();
    }

  });
  /*--------------------------------
   ----- CURVED LINE CHART -----
   --------------------------------*/

  $(function() {

    var d1 = [
      [0, 6],
      [1, 14],
      [2, 10],
      [3, 14],
      [4, 5]
    ];
    var d2 = [
      [0, 6],
      [1, 7],
      [2, 11],
      [3, 8],
      [4, 11]
    ];
    var d3 = [
      [0, 6],
      [1, 5],
      [2, 6],
      [3, 10],
      [4, 5]
    ];

    if ($("#curved-line-chart").length) {
      $.plot($("#curved-line-chart"), [{
          data: d1,
          lines: {
            show: true,
            fill: 0.98
          },
          label: 'Plans',
          stack: true,
          color: '#5E50F9'
        },
        {
          data: d2,
          lines: {
            show: true,
            fill: 0.98
          },
          label: 'Purchase',
          stack: true,
          color: '#8C95FC'
        },
        {
          data: d3,
          lines: {
            show: true,
            fill: 0.98
          },
          label: 'Services',
          stack: true,
          color: '#A8B4FD'
        }
      ], curvedLineOptions);
    }

  });

})(jQuery);
