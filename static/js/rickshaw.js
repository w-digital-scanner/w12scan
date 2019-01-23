(function($) {
  'use strict';

  //Simple graph
  if ($("#rickshaw-simple").length) {
    var rickshawSimple = new Rickshaw.Graph({
      element: document.getElementById("rickshaw-simple"),
      renderer: 'line',
      series: [{
        data: [{
          x: 0,
          y: 40
        }, {
          x: 1,
          y: 49
        }, {
          x: 2,
          y: 38
        }, {
          x: 3,
          y: 30
        }, {
          x: 4,
          y: 32
        }],
        color: 'steelblue'
      }, {
        data: [{
          x: 0,
          y: 19
        }, {
          x: 1,
          y: 22
        }, {
          x: 2,
          y: 32
        }, {
          x: 3,
          y: 20
        }, {
          x: 4,
          y: 21
        }],
        color: 'lightblue'
      }, {
        data: [{
          x: 0,
          y: 39
        }, {
          x: 1,
          y: 32
        }, {
          x: 2,
          y: 12
        }, {
          x: 3,
          y: 5
        }, {
          x: 4,
          y: 12
        }],
        color: 'steelblue',
        strokeWidth: 10,
        opacity: 0.5
      }]
    });
    rickshawSimple.render();
  }

  //Timescale
  if ($("#rickshaw-time-scale").length) {
    var seriesData = [
      [],
      []
    ];
    var random = new Rickshaw.Fixtures.RandomData(1500000);

    for (var i = 0; i < 30; i++) {
      random.addData(seriesData);
    }

    var timeScaleGraph = new Rickshaw.Graph({
      element: document.getElementById("rickshaw-time-scale"),
      width: 400,
      height: 200,
      stroke: true,
      strokeWidth: 0.5,
      renderer: 'area',
      xScale: d3.time.scale(),
      yScale: d3.scale.sqrt(),
      series: [{
          color: '#2796E9',
          data: seriesData[0]
        },
        {
          color: '#05BDFE',
          data: seriesData[1]
        }
      ]
    });

    timeScaleGraph.render();

    var xAxis = new Rickshaw.Graph.Axis.X({
      graph: timeScaleGraph,
      tickFormat: timeScaleGraph.x.tickFormat()
    });

    xAxis.render();

    var yAxis = new Rickshaw.Graph.Axis.Y({
      graph: timeScaleGraph
    });

    yAxis.render();

    var slider = new Rickshaw.Graph.RangeSlider.Preview({
      graph: timeScaleGraph,
      element: document.getElementById('slider')
    });
  }

  //Bar chart
  if ($("#rickshaw-bar").length) {
    var seriesData = [
      [],
      [],
      []
    ];
    var random = new Rickshaw.Fixtures.RandomData(150);

    for (var i = 0; i < 15; i++) {
      random.addData(seriesData);
    }

    var rickshawBar = new Rickshaw.Graph({
      element: document.getElementById("rickshaw-bar"),
      width: 400,
      height: 300,
      renderer: 'bar',
      series: [{
        color: "#2796E9",
        data: seriesData[0],
      }, {
        color: "#05BDFE",
        data: seriesData[1],
      }, {
        color: "#05BDFE",
        data: seriesData[2],
        opacity: 0.4
      }]
    });

    rickshawBar.render();
  }

  //Line chart

  if ($("#rickshaw-line").length) {
    // set up our data series with 50 random data points

    var seriesData = [
      [],
      [],
      []
    ];
    var random = new Rickshaw.Fixtures.RandomData(150);

    for (var i = 0; i < 30; i++) {
      random.addData(seriesData);
    }

    // instantiate our graph!

    var rickshawLine = new Rickshaw.Graph({
      element: document.getElementById("rickshaw-line"),
      width: 400,
      height: 300,
      renderer: 'line',
      series: [{
        color: "#2796E9",
        data: seriesData[0],
        name: 'New York',
        strokeWidth: 5,
        opacity: 0.3
      }, {
        color: "#05BDFE",
        data: seriesData[1],
        name: 'London'
      }, {
        color: "#05BDFE",
        data: seriesData[2],
        name: 'Tokyo',
        opacity: 0.4
      }]
    });

    rickshawLine.render();

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: rickshawLine
    });
  }

  //scatter plot

  if ($("#rickshaw-scatter").length) {
    // set up our data series with 50 random data points

    var seriesData = [
      [],
      [],
      []
    ];
    var random = new Rickshaw.Fixtures.RandomData(150);

    for (var i = 0; i < 30; i++) {
      random.addData(seriesData);
      seriesData[0][i].r = 0 | Math.random() * 2 + 8
      seriesData[1][i].r = 0 | Math.random() * 5 + 5
      seriesData[2][i].r = 0 | Math.random() * 8 + 2
    }

    // instantiate our graph!

    var rickshawScatter = new Rickshaw.Graph({
      element: document.getElementById("rickshaw-scatter"),
      width: 400,
      height: 300,
      renderer: 'scatterplot',
      series: [{
        color: "#2796E9",
        data: seriesData[0],
        opacity: 0.5
      }, {
        color: "#f7981c",
        data: seriesData[1],
        opacity: 0.3
      }, {
        color: "#36af47",
        data: seriesData[2],
        opacity: 0.6
      }]
    });

    rickshawScatter.renderer.dotSize = 6;
    new Rickshaw.Graph.HoverDetail({
      graph: rickshawScatter
    });
    rickshawScatter.render();
  }


  //Multiple renderer

  if ($("#rickshaw-multiple").length) {
    var seriesData = [
      [],
      [],
      [],
      [],
      []
    ];
    var random = new Rickshaw.Fixtures.RandomData(50);

    for (var i = 0; i < 15; i++) {
      random.addData(seriesData);
    }

    var rickshawMultiple = new Rickshaw.Graph({
      element: document.getElementById("rickshaw-multiple"),
      renderer: 'multi',
      width: 400,
      height: 300,
      dotSize: 5,
      series: [{
        name: 'temperature',
        data: seriesData.shift(),
        color: '#2796E9',
        renderer: 'stack',
        opacity: 0.4,
      }, {
        name: 'heat index',
        data: seriesData.shift(),
        color: '#f7981c',
        renderer: 'stack',
        opacity: 0.4,
      }, {
        name: 'dewpoint',
        data: seriesData.shift(),
        color: '#36af47',
        renderer: 'scatterplot',
        opacity: 0.4,
      }, {
        name: 'pop',
        data: seriesData.shift().map(function(d) {
          return {
            x: d.x,
            y: d.y / 4
          }
        }),
        color: '#ed1c24',
        opacity: 0.4,
        renderer: 'bar'
      }, {
        name: 'humidity',
        data: seriesData.shift().map(function(d) {
          return {
            x: d.x,
            y: d.y * 1.5
          }
        }),
        renderer: 'line',
        color: 'rgba(0, 0, 127, 0.25)',
        opacity: 0.4
      }]
    });

    var slider = new Rickshaw.Graph.RangeSlider.Preview({
      graph: rickshawMultiple,
      element: document.querySelector('#multiple-slider')
    });

    rickshawMultiple.render();
    var detail = new Rickshaw.Graph.HoverDetail({
      graph: rickshawMultiple
    });
  }

})(jQuery);