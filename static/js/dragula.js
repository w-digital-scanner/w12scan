(function($) {
  'use strict';
  var iconTochange;
  dragula([document.getElementById("dragula-left"), document.getElementById("dragula-right")]);
  dragula([document.getElementById("profile-list-left"), document.getElementById("profile-list-right")]);
  dragula([document.getElementById("dragula-event-left"), document.getElementById("dragula-event-right")])
    .on('drop', function(el) {
      console.log($(el));
      iconTochange = $(el).find('i');
      if (iconTochange.hasClass('icon-check')) {
        iconTochange.removeClass('icon-check text-primary').addClass('icon-close text-success');
      } else if (iconTochange.hasClass('icon-close')) {
        iconTochange.removeClass('icon-close text-success').addClass('icon-check text-primary');
      }
    })
})(jQuery);