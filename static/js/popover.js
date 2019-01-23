(function($) {
  'use strict';
  $(function() {
    /* Code for attribute data-custom-class for adding custom class to tooltip */
    if (typeof $.fn.popover.Constructor === 'undefined') {
      throw new Error('Bootstrap Popover must be included first!');
    }

    var Popover = $.fn.popover.Constructor;

    // add customClass option to Bootstrap Tooltip
    $.extend(Popover.Default, {
      customClass: ''
    });

    var _show = Popover.prototype.show;

    Popover.prototype.show = function() {

      // invoke parent method
      _show.apply(this, Array.prototype.slice.apply(arguments));

      if (this.config.customClass) {
        var tip = this.getTipElement();
        $(tip).addClass(this.config.customClass);
      }

    };

    $('[data-toggle="popover"]').popover()
  });
})(jQuery);