(function($) {
  //simple line
  'use strict';
  if ($('#ct-chart-line').length) {
    new Chartist.Line('#ct-chart-line', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    });
  }

  //Line scatterer
  var times = function(n) {
    return Array.apply(null, new Array(n));
  };

  var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
    data.labels.push(index + 1);
    for (var i = 0; i < data.series.length; i++) {
      data.series[i].push(Math.random() * 100)
    }
    return data;
  }, {
    labels: [],
    series: times(4).map(function() {
      return new Array()
    })
  });

  var options = {
    showLine: false,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 13 === 0 ? 'W' + value : null;
      }
    }
  };

  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 4 === 0 ? 'W' + value : null;
        }
      }
    }]
  ];

  if ($('#ct-chart-line-scatterer').length) {
    new Chartist.Line('#ct-chart-line-scatterer', data, options, responsiveOptions);
  }

  //Stacked bar Chart
  if ($('#ct-chart-stacked-bar').length) {
    new Chartist.Bar('#ct-chart-stacked-bar', {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        ['800000', '1200000', '1400000', '1300000'],
        ['200000', '400000', '500000', '300000'],
        ['100000', '200000', '400000', '600000'],
        ['400000', '600000', '200000', '0000']
      ]
    }, {
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 1000) + 'k';
        }
      }
    }).on('draw', function(data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 30px'
        });
      }
    });
  }


  //Horizontal bar chart
  if ($('#ct-chart-horizontal-bar').length) {
    new Chartist.Bar('#ct-chart-horizontal-bar', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      series: [
        [5, 4, 3, 7, 5, 10, 3],
        [3, 2, 9, 5, 4, 6, 4],
        [2, 6, 7, 1, 3, 5, 9],
        [2, 6, 7, 1, 3, 5, 19],
      ]
    }, {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 20
      }
    });
  }

  //Pie
  if ($('#ct-chart-pie').length) {
    var data = {
      series: [5, 3, 4]
    };

    var sum = function(a, b) {
      return a + b
    };

    new Chartist.Pie('#ct-chart-pie', data, {
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });
  }

  //Donut
  var labels = ['safari', 'chrome', 'explorer', 'firefox'];
  var data = {
    series: [20, 40, 10, 30]
  };

  if ($('#ct-chart-donut').length) {
    new Chartist.Pie('#ct-chart-donut', data, {
      donut: true,
      donutWidth: 60,
      donutSolid: true,
      startAngle: 270,
      showLabel: true,
      labelInterpolationFnc: function(value, index) {
        var percentage = Math.round(value / data.series.reduce(sum) * 100) + '%';
        return labels[index] + ' ' + percentage;
      }
    });
  }



  //Dashboard Tickets Chart
  if ($('#ct-chart-dash-barChart').length) {
    new Chartist.Bar('#ct-chart-dash-barChart', {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      series: [
        [300, 140, 230, 140],
        [323, 529, 644, 230],
        [734, 539, 624, 334],
      ]
    }, {
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 100) + 'k';
        }
      }
    }).on('draw', function(data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 50px'
        });
      }
    });
  }

  //dashboard staked bar chart
  if ($('#ct-chart-vartical-stacked-bar').length) {
    new Chartist.Bar('#ct-chart-vartical-stacked-bar', {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'A'],
      series: [{
          "name": "Income",
          "data": [8, 4, 6, 3, 7, 3, 8]
        },
        {
          "name": "Outcome",
          "data": [2, 7, 4, 8, 4, 6, 1]
        },
        {
          "name": "Revenue",
          "data": [4, 3, 3, 6, 7, 2, 4]
        }
      ]
    }, {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: false,
      height: '280px',
      fullWidth: true,
      chartPadding: {
        top: 30,
        left: 0,
        right: 0,
        bottom: 0
      },
      plugins: [
        Chartist.plugins.legend()
      ]
    });
  }

})(jQuery);