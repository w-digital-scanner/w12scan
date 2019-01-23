(function($) {
  'use strict';

  if ($('#pagination-demo').length) {
    $('#pagination-demo').twbsPagination({
      totalPages: 35,
      visiblePages: 7,
      onPageClick: function(event, page) {
        $('#page-content').text('Page ' + page);
      }
    });
  }

  if ($('.sync-pagination').length) {
    $('.sync-pagination').twbsPagination({
      totalPages: 20,
      onPageClick: function(evt, page) {
        $('#content').text('Page ' + page);
      }
    });
  }

})(jQuery);