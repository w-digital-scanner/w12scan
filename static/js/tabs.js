(function($) {
  'use strict';
  $(function() {
    if ($('.demo-tabs').length) {
      $('.demo-tabs').pwstabs({
        effect: 'none'
      });
    }

    if ($('.hello_world').length) {
      $('.hello_world').pwstabs();
    }

    if ($('#rtl-tabs-1').length) {
      $('#rtl-tabs-1').pwstabs({
        effect: 'slidedown',
        defaultTab: 2,
        rtl: true
      });
    }

    if ($('#vertical-left').length) {
      $('#vertical-left').pwstabs({
        effect: 'slideleft',
        defaultTab: 1,
        containerWidth: '600px',
        tabsPosition: 'vertical',
        verticalPosition: 'left'
      });
    }

    if ($('#horizontal-left').length) {
      $('#horizontal-left').pwstabs({
        effect: 'slidedown',
        defaultTab: 2,
        containerWidth: '600px',
        horizontalPosition: 'bottom'
      });
    }

    if ($('.tickets-tab').length) {
      $('.tickets-tab').pwstabs({
        effect: 'none'
      });
    }

  });
})(jQuery);