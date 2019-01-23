(function($) {
  'use strict';

  // Horizontal slider
  if ($("#ul-slider-1").length) {
    var startSlider = document.getElementById('ul-slider-1');
    noUiSlider.create(startSlider, {
      start: [72],
      connect: [true, false],
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }
  if ($("#ul-slider-2").length) {
    var startSlider = document.getElementById('ul-slider-2');
    noUiSlider.create(startSlider, {
      start: [92],
      connect: [true, false],
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }
  if ($("#ul-slider-3").length) {
    var startSlider = document.getElementById('ul-slider-3');
    noUiSlider.create(startSlider, {
      start: [43],
      connect: [true, false],
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }
  if ($("#ul-slider-4").length) {
    var startSlider = document.getElementById('ul-slider-4');
    noUiSlider.create(startSlider, {
      start: [20],
      connect: [true, false],
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }
  if ($("#ul-slider-5").length) {
    var startSlider = document.getElementById('ul-slider-5');
    noUiSlider.create(startSlider, {
      start: [75],
      connect: [true, false],
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }

  // Vertical slider
  if ($("#ul-slider-6").length) {
    var startSlider = document.getElementById('ul-slider-6');
    noUiSlider.create(startSlider, {
      start: [72],
      connect: [true, false],
      orientation: "vertical",
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }
  if ($("#ul-slider-7").length) {
    var startSlider = document.getElementById('ul-slider-7');
    noUiSlider.create(startSlider, {
      start: [92],
      connect: [true, false],
      orientation: "vertical",
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }
  if ($("#ul-slider-8").length) {
    var startSlider = document.getElementById('ul-slider-8');
    noUiSlider.create(startSlider, {
      start: [43],
      connect: [true, false],
      orientation: "vertical",
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }
  if ($("#ul-slider-9").length) {
    var startSlider = document.getElementById('ul-slider-9');
    noUiSlider.create(startSlider, {
      start: [20],
      connect: [true, false],
      orientation: "vertical",
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }
  if ($("#ul-slider-10").length) {
    var startSlider = document.getElementById('ul-slider-10');
    noUiSlider.create(startSlider, {
      start: [75],
      connect: [true, false],
      orientation: "vertical",
      range: {
        'min': [0],
        'max': [100]
      }
    });
  }

  // Range Slider
  if ($("#value-range").length) {
    var bigValueSlider = document.getElementById('value-range'),
      bigValueSpan = document.getElementById('huge-value');

    noUiSlider.create(bigValueSlider, {
      start: 1,
      step: 0,
      range: {
        min: 0,
        max: 14
      }
    });

    var range = [
      '0', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'
    ];
    bigValueSlider.noUiSlider.on('update', function(values, handle) {
      console.log(range[Math.floor(values)]);

      bigValueSpan.innerHTML = range[Math.floor(values)];
    });
  }
  if ($("#skipstep").length) {
    var skipSlider = document.getElementById('skipstep');
    noUiSlider.create(skipSlider, {
      range: {
        'min': 0,
        '10%': 10,
        '20%': 20,
        '30%': 30,
        // Nope, 40 is no fun.
        '50%': 50,
        '60%': 60,
        '70%': 70,
        // I never liked 80.
        '90%': 90,
        'max': 100
      },
      snap: true,
      start: [20, 90]
    });
    var skipValues = [
      document.getElementById('skip-value-lower'),
      document.getElementById('skip-value-upper')
    ];

    skipSlider.noUiSlider.on('update', function(values, handle) {
      skipValues[handle].innerHTML = values[handle];
    });
  }

  // Connected Slider
  if ($("#skipstep-connect").length) {
    $(function() {
      var skipSlider = document.getElementById('skipstep-connect');
      noUiSlider.create(skipSlider, {
        connect: true,
        range: {
          'min': 0,
          '10%': 10,
          '20%': 20,
          '30%': 30,
          // Nope, 40 is no fun.
          '50%': 50,
          '60%': 60,
          '70%': 70,
          // I never liked 80.
          '90%': 90,
          'max': 100
        },
        snap: true,
        start: [20, 90]
      });
      var skipValues = [
        document.getElementById('skip-value-lower-2'),
        document.getElementById('skip-value-upper-2')
      ];

      skipSlider.noUiSlider.on('update', function(values, handle) {
        skipValues[handle].innerHTML = values[handle];
      });
    });
  }
  if ($("#skipstep-connect-3").length) {
    $(function() {
      var skipSlider = document.getElementById('skipstep-connect-3');
      noUiSlider.create(skipSlider, {
        connect: true,
        range: {
          'min': 0,
          '10%': 10,
          '20%': 20,
          '30%': 30,
          // Nope, 40 is no fun.
          '50%': 50,
          '60%': 60,
          '70%': 70,
          // I never liked 80.
          '90%': 90,
          'max': 100
        },
        snap: true,
        start: [20, 90]
      });
      var skipValues = [
        document.getElementById('skip-value-lower-3'),
        document.getElementById('skip-value-upper-3')
      ];

      skipSlider.noUiSlider.on('update', function(values, handle) {
        skipValues[handle].innerHTML = values[handle];
      });
    });
  }

  // Tooltip Slider
  if ($("#soft-limit").length) {
    var softSlider = document.getElementById('soft-limit');

    noUiSlider.create(softSlider, {
      start: [24, 50],
      tooltips: true,
      connect: true,
      range: {
        min: 0,
        max: 100
      },
      pips: {
        mode: 'values',
        values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        density: 10
      }
    });
  }
  if ($("#soft-limit-2").length) {
    var softSlider = document.getElementById('soft-limit-2');

    noUiSlider.create(softSlider, {
      start: [24, 50],
      tooltips: [true, true],
      connect: true,
      range: {
        min: 0,
        max: 100
      },
      pips: {
        mode: 'values',
        values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        density: 10
      }
    });
  }
  if ($("#soft-limit-3").length) {
    var softSlider = document.getElementById('soft-limit-3');

    noUiSlider.create(softSlider, {
      start: [24, 82],
      tooltips: [true, true],
      connect: true,
      range: {
        min: 0,
        max: 100
      },
      pips: {
        mode: 'values',
        values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        density: 10
      }
    });
  }
})(jQuery);