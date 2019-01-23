(function($) {
  'use strict';

  // Jquery Tag Input Starts
  $('#tags').tagsInput({
    'width': '100%',
    'height': '75%',
    'interactive': true,
    'defaultText': 'Add More',
    'removeWithBackspace': true,
    'minChars': 0,
    'maxChars': 20, // if not provided there is no limit
    'placeholderColor': '#666666'
  });

  // Jquery Tag Input Ends
  // Jquery Bar Rating Starts

  $(function() {
    function ratingEnable() {
      $('#example-1to10').barrating('show', {
        theme: 'bars-1to10'
      });

      $('#example-movie').barrating('show', {
        theme: 'bars-movie'
      });

      $('#example-movie').barrating('set', 'Mediocre');

      $('#example-square').barrating('show', {
        theme: 'bars-square',
        showValues: true,
        showSelectedRating: false
      });

      $('#example-pill').barrating('show', {
        theme: 'bars-pill',
        initialRating: 'A',
        showValues: true,
        showSelectedRating: false,
        allowEmpty: true,
        emptyValue: '-- no rating selected --',
        onSelect: function(value, text) {
          alert('Selected rating: ' + value);
        }
      });

      $('#example-reversed').barrating('show', {
        theme: 'bars-reversed',
        showSelectedRating: true,
        reverse: true
      });

      $('#example-horizontal').barrating('show', {
        theme: 'bars-horizontal',
        reverse: true,
        hoverState: false
      });

      $('#example-fontawesome').barrating({
        theme: 'fontawesome-stars',
        showSelectedRating: false
      });

      $('#example-css').barrating({
        theme: 'css-stars',
        showSelectedRating: false
      });

      $('#example-bootstrap').barrating({
        theme: 'bootstrap-stars',
        showSelectedRating: false
      });

      var currentRating = $('#example-fontawesome-o').data('current-rating');

      $('.stars-example-fontawesome-o .current-rating')
        .find('span')
        .html(currentRating);

      $('.stars-example-fontawesome-o .clear-rating').on('click', function(event) {
        event.preventDefault();

        $('#example-fontawesome-o')
          .barrating('clear');
      });

      $('#example-fontawesome-o').barrating({
        theme: 'fontawesome-stars-o',
        showSelectedRating: false,
        initialRating: currentRating,
        onSelect: function(value, text) {
          if (!value) {
            $('#example-fontawesome-o')
              .barrating('clear');
          } else {
            $('.stars-example-fontawesome-o .current-rating')
              .addClass('hidden');

            $('.stars-example-fontawesome-o .your-rating')
              .removeClass('hidden')
              .find('span')
              .html(value);
          }
        },
        onClear: function(value, text) {
          $('.stars-example-fontawesome-o')
            .find('.current-rating')
            .removeClass('hidden')
            .end()
            .find('.your-rating')
            .addClass('hidden');
        }
      });
    }

    function ratingDisable() {
      $('select').barrating('destroy');
    }

    $('.rating-enable').on("click", function(event) {
      event.preventDefault();

      ratingEnable();

      $(this).addClass('deactivated');
      $('.rating-disable').removeClass('deactivated');
    });

    $('.rating-disable').on("click", function(event) {
      event.preventDefault();

      ratingDisable();

      $(this).addClass('deactivated');
      $('.rating-enable').removeClass('deactivated');
    });

    ratingEnable();
  });


  // Jquery Bar Rating Ends

})(jQuery);