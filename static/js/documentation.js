(function($) {
  'use strict';
  $(function() {
    // The function actually applying the offset
    function offsetAnchor() {
        if (location.hash.length !== 0) {
            // window.scrollTo(window.scrollX, window.scrollY - 140);
            $("html").animate({ scrollTop: $(location.hash).offset().top - 140 }, 500);
        }
    }
    
    // Captures click events of all <a> elements with href starting with #
    $(document).on('click', 'a[href^="#"]', function(event) {
        // Click events are captured before hashchanges. Timeout
        // causes offsetAnchor to be called after the page jump.
        window.setTimeout(function() {
        offsetAnchor();
        }, 0);
    });
    
    // Set the offset when entering page with hash present in the url
    window.setTimeout(offsetAnchor, 0);
    });
})(jQuery);