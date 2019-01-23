(function($) {
  'use strict';
  if ($(".circle-progress-1").length) {
    $('.circle-progress-1').circleProgress({}).on('circle-animation-progress', function(event, progress, stepValue) {
      $(this).find('.value').html(Math.round(100 * stepValue.toFixed(2).substr(1)) + '<i>%</i>');
    });
  }
})(jQuery);