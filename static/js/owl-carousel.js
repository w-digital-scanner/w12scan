(function($) {
  'use strict';
  $.fn.andSelf = function() {
    return this.addBack.apply(this, arguments);
  }

  if ($('.example-1').length) {
    $('.example-1').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      autoplay: true,
      autoplayTimeout: 4500,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  }

  if ($('.full-width').length) {
    $('.full-width').owlCarousel({
      loop: true,
      margin: 10,
      items: 1,
      nav: true,
      autoplay: true,
      autoplayTimeout: 5500,
      navText: ["<i class='icon-arrow-left'></i>", "<i class='icon-arrow-right'></i>"]
    });
  }

  if ($('.loop').length) {
    $('.loop').owlCarousel({
      center: true,
      items: 2,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 8500,
      responsive: {
        600: {
          items: 4
        }
      }
    });
  }

  if ($('.nonloop').length) {
    $('.nonloop').owlCarousel({
      items: 5,
      loop: false,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 6000,
      responsive: {
        600: {
          items: 4
        }
      }
    });
  }

  if ($('.auto-width').length) {
    $('.auto-width').owlCarousel({
      items: 2,
      margin: 10,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3500,
      autoWidth: true,
    });
  }

  if ($('.lazy-load').length) {
    $('.lazy-load').owlCarousel({
      items: 4,
      lazyLoad: true,
      loop: true,
      margin: 10,
      auto: true,
      autoplay: true,
      autoplayTimeout: 2500,
    });
  }

  if ($('.rtl-carousel').length) {
    $('.rtl-carousel').owlCarousel({
      rtl: true,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  }

  if ($('.video-carousel').length) {
    $('.video-carousel').owlCarousel({
      loop: false,
      margin: 10,
      video: true,
      lazyLoad: true,
      autoplay: true,
      autoplayTimeout: 7000,
      responsive: {
        480: {
          items: 4
        },
        600: {
          items: 4
        }
      }
    });
  }

  if ($('.slide-banners').length) {
    $('.slide-banners').owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      nav: false,
      dotsContainer: ".nav-container",
      autoplay: true,
      autoplayTimeout: 3000
    });
  }

})(jQuery);