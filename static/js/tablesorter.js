(function($) {
  'use strict';
  $(function() {
    if ($('#sortable-table-1').length) {
      $('#sortable-table-1').tablesort();
    }
    if ($('#sortable-table-2').length) {
      $('#sortable-table-2').tablesort();
    }
  });
})(jQuery);