(function($) {
  'use strict';
  if ($('.grid').length) {
    var colcade = new Colcade('.grid', {
      columns: '.grid-col',
      items: '.grid-item'
    });
  }
})(jQuery);