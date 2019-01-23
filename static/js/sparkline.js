(function($) {
  'use strict';
  if ($("#sparkline-line-chart").length) {
    $("#sparkline-line-chart").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
      type: 'line',
      width: '100%',
      height: '100%'
    });
  }

  if ($("#sparkline-bar-chart").length) {
    $("#sparkline-bar-chart").sparkline([5, 6, 7, 2, 0, -4, 4], {
      type: 'bar',
      height: '100%',
      barWidth: '58.5%',
      barColor: '#58D8A3',
      negBarColor: '#e56e72',
      zeroColor: 'green'
    });
  }

  if ($("#sparkline-pie-chart").length) {
    $("#sparkline-pie-chart").sparkline([1, 1, 2, 4], {
      type: 'pie',
      sliceColors: ['#0CB5F9', '#58d8a3', '#F4767B', '#F9B65F'],
      borderColor: '#',
      width: '100%',
      height: '100%'
    });
  }

  if ($("#sparkline-bullet-chart").length) {
    $("#sparkline-bullet-chart").sparkline([10, 12, 12, 9, 7], {
      type: 'bullet',
      height: '238',
      width: '100%',
    });
  }

  if ($("#sparkline-composite-chart").length) {
    $("#sparkline-composite-chart").sparkline([5, 6, 7, 2, 0, 3, 6, 8, 1, 2, 2, 0, 3, 6], {
      type: 'line',
      width: '100%',
      height: '100%'
    });
  }

  if ($("#sparkline-composite-chart").length) {
    $("#sparkline-composite-chart").sparkline([5, 6, 7, 2, 0, 3, 6, 8, 1, 2, 2, 0, 3, 6], {
      type: 'bar',
      height: '150px',
      width: '100%',
      barWidth: 10,
      barSpacing: 5,
      barColor: '#60a76d',
      negBarColor: '#60a76d',
      composite: true
    });
  }

  if ($(".demo-sparkline").length) {
    $(".demo-sparkline").sparkline('html', {
      enableTagOptions: true,
      width: '100%',
      height: '30px',
      fillColor: false
    });
  }

  if ($(".top-seelling-dashboard-chart").length) {
    $(".top-seelling-dashboard-chart").sparkline('html', {
      enableTagOptions: true,
      width: '100%',
      barWidth: 30,
      fillColor: false
    });
  }

})(jQuery);