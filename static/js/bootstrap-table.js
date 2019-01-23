(function($) {
  'use strict';

  function monthSorter(a, b) {
    if (a.month < b.month) return -1;
    if (a.month > b.month) return 1;
    return 0;
  }

  function buildTable($el, cells, rows) {
    var i, j, row,
      columns = [],
      data = [];

    for (i = 0; i < cells; i++) {
      columns.push({
        field: 'field' + i,
        title: 'Cell' + i
      });
    }
    for (i = 0; i < rows; i++) {
      row = {};
      for (j = 0; j < cells; j++) {
        row['field' + j] = 'Row-' + i + '-' + j;
      }
      data.push(row);
    }
    $el.bootstrapTable('destroy').bootstrapTable({
      columns: columns,
      data: data
    });
  }

  $(function() {
    buildTable($('#table'), 50, 50);
  });

  function actionFormatter(value, row, index) {
    return [
      '<a class="like" href="javascript:void(0)" title="Like">',
      '<i class="glyphicon glyphicon-heart"></i>',
      '</a>',
      '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
      '<i class="glyphicon glyphicon-edit"></i>',
      '</a>',
      '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
      '<i class="glyphicon glyphicon-remove"></i>',
      '</a>'
    ].join('');
  }

  window.actionEvents = {
    'click .like': function(e, value, row, index) {
      alert('You click like icon, row: ' + JSON.stringify(row));
      console.log(value, row, index);
    },
    'click .edit': function(e, value, row, index) {
      alert('You click edit icon, row: ' + JSON.stringify(row));
      console.log(value, row, index);
    },
    'click .remove': function(e, value, row, index) {
      alert('You click remove icon, row: ' + JSON.stringify(row));
      console.log(value, row, index);
    }
  };
})(jQuery);