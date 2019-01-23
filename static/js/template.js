(function($) {
  'use strict';
  $(function() {
    var body = $('body');
    var footer = $('.footer');

    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.navbar.horizontal-layout .nav-bottom .page-navigation .nav-item').each(function() {
      var $this = $(this);
      if (current === "") {
        //for root url
        if ($this.find(".nav-link").attr('href').indexOf("index.html") !== -1) {
          $(this).find(".nav-link").parents('.nav-item').last().addClass('active');
          $(this).addClass("active");
        }
      } else {
        //for other url
        if ($this.find(".nav-link").attr('href').indexOf(current) !== -1) {
          $(this).find(".nav-link").parents('.nav-item').last().addClass('active');
          $(this).addClass("active");
        }
      }
    })

    $(".navbar.horizontal-layout .navbar-menu-wrapper .navbar-toggler").on("click", function() {
      $(".navbar.horizontal-layout .nav-bottom").toggleClass("header-toggled");
    });

    // Navigation in mobile menu on click
    var navItemClicked = $('.page-navigation >.nav-item');
    navItemClicked.on("click", function(event) {
      if(window.matchMedia('(max-width: 991px)').matches) {
        if(!($(this).hasClass('show-submenu'))) {
          navItemClicked.removeClass('show-submenu');
        }
        $(this).toggleClass('show-submenu');
      }        
    })
    

    //checkbox and radios
    $(".form-check .form-check-label,.form-radio .form-check-label").not(".todo-form-check .form-check-label").append('<i class="input-helper"></i>');

    $(window).scroll(function() {
      if(window.matchMedia('(min-width: 992px)').matches) {
        var header = '.navbar.horizontal-layout';
        if ($(window).scrollTop() >= 70) {
          $(header).addClass('fixed-on-scroll');
        } else {
          $(header).removeClass('fixed-on-scroll');
        }
      }
    });
  });
})(jQuery);
