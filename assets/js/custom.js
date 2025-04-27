(function($) {
  "use strict";

  var WEA = {};
  var plugin_track = 'assets/vendor/';

  // Utility function to check if an element exists
  $.fn.exists = function() {
    return this.length > 0;
  };

  /* ---------------------------------------------- */
  /* Preload */
  /* ---------------------------------------------- */
  WEA.PreLoad = function() {
    document.getElementById("loading").style.display = "none";
  };

  /* ---------------------------------------------- */
  /* Menu Close */
  /* ---------------------------------------------- */
  WEA.MenuClose = function() {
    $('.navbar-nav a').on('click', function() {
      var toggle = $('.navbar-toggler').is(':visible');
      if (toggle) {
        $('.navbar-collapse').collapse('hide');
      }
    });
  };

  /* ---------------------------------------------- */
  /* Menu Toggler */
  /* ---------------------------------------------- */
  WEA.MenuTogglerClose = function() {
    $(".toggler-menu").on('click', function() {
      $(this).toggleClass('open');
      $('.header-left').stop().toggleClass('menu-open menu-open-desk');
    });

    $('.header-left a').on('click', function() {
      if ($('.toggler-menu').is(':visible')) {
        $('.header-left').removeClass('menu-open');
        $('.toggler-menu').removeClass('open');
      }
    });
  };

  /* ---------------------------------------------- */
  /* Header Fixed */
  /* ---------------------------------------------- */
  WEA.HeaderFixd = function() {
    var HscrollTop = $(window).scrollTop();
    $('body').toggleClass('fixed-header', HscrollTop >= 100);
  };

  /* ---------------------------------------------- */
  /* OwlSlider */
  /* ---------------------------------------------- */
  WEA.Owl = function() {
    var owlslider = $("div.owl-carousel");
    if (owlslider.length > 0) {
      loadScript(plugin_track + 'owl-carousel/js/owl.carousel.min.js', function() {
        owlslider.each(function() {
          var $this = $(this),
              settings = {
                items: $this.data('items') || 1,
                loop: $this.data('loop') !== undefined ? $this.data('loop') : true,
                navdots: $this.data('nav-dots') || false,
                navarrow: $this.data('nav-arrow') || false,
                autoplay: $this.data('autoplay') !== undefined ? $this.data('autoplay') : true,
                autospeed: $this.data('autospeed') || 5000,
                smartspeed: $this.data('smartspeed') || 1000,
                autoheight: $this.data('autoheight') || false,
                center: $this.data('center') || false,
                space: $this.data('space') || 30
              };

          $(this).owlCarousel({
            loop: settings.loop,
            items: settings.items,
            responsive: {
              0: { items: $this.data('xs-items') || 1 },
              480: { items: $this.data('sm-items') || 1 },
              768: { items: $this.data('md-items') || 1 },
              980: { items: $this.data('lg-items') || 1 },
              1200: { items: settings.items }
            },
            dots: settings.navdots,
            autoplayTimeout: settings.autospeed,
            smartSpeed: settings.smartspeed,
            autoHeight: settings.autoheight,
            center: settings.center,
            margin: settings.space,
            nav: settings.navarrow,
            navText: ["<i class='ti-arrow-left'></i>", "<i class='ti-arrow-right'></i>"],
            autoplay: settings.autoplay,
            autoplayHoverPause: true
          });
        });
      });
    }
  };

  /* ---------------------------------------------- */
  /* Lightbox Gallery */
  /* ---------------------------------------------- */
  WEA.Gallery = function() {
    if ($(".lightbox-gallery").exists() || $(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
      loadScript(plugin_track + 'magnific/jquery.magnific-popup.min.js', function() {
        if ($(".lightbox-gallery").exists()) {
          $('.lightbox-gallery').magnificPopup({
            delegate: '.gallery-link',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade',
            fixedContentPos: true,
            closeBtnInside: false,
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1] // Preload current and next image
            }
          });
        }

        if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
          $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
          });
        }
      });
    }
  };

  /* ---------------------------------------------- */
  /* Masonry */
  /* ---------------------------------------------- */
  WEA.masonry = function() {
    var portfolioWork = $('.portfolio-content');
    if ($(".portfolio-content").exists()) {
      loadScript(plugin_track + 'isotope/isotope.pkgd.min.js', function() {
        portfolioWork.isotope({
          resizable: false,
          itemSelector: '.grid-item',
          layoutMode: 'masonry',
          filter: '*'
        });

        // Filtering items on portfolio.html
        var portfolioFilter = $('.filter li');
        portfolioFilter.on('click', function() {
          var filterValue = $(this).attr('data-filter');
          portfolioWork.isotope({ filter: filterValue });
          $(this).addClass('active').siblings().removeClass('active');
        });
      });
    }
  };

  /* ---------------------------------------------- */
  /* Progress Bar */
  /* ---------------------------------------------- */
  WEA.ProgressBar = function() {
    $(".skill-bar .skill-bar-in").each(function() {
      var bottom_object = $(this).offset().top + $(this).outerHeight();
      var bottom_window = $(window).scrollTop() + $(window).height();
      if (bottom_window > bottom_object) {
        $(this).css({ width: $(this).attr('aria-valuenow') + '%' });
      }
    });
  };

  /* ---------------------------------------------- */
  /* Particles */
  /* ---------------------------------------------- */
  WEA.particles = function() {
    if ($("#particles-box").exists()) {
      loadScript(plugin_track + 'particles/particles.min.js');
      loadScript(plugin_track + 'particles/particles-app.js');
    }
  };

  /* ---------------------------------------------- */
  /* Type It */
  /* ---------------------------------------------- */
  WEA.mTypeIt = function() {
    if ($("#type-it").exists()) {
      loadScript(plugin_track + 'typeit-master/typeit.js', function() {
        new TypeIt('#type-it', {
          speed: 200,
          loop: true,
          strings: ['Designer', 'Developer'],
          breakLines: false
        });
      });
    }
  };

  /* ---------------------------------------------- */
  /* One Page Navigation */
  /* ---------------------------------------------- */
  WEA.one_page = function() {
    var $one_page_nav = $('.one-page-nav');
    if ($one_page_nav.length > 0) {
      $one_page_nav.each(function() {
        $.scrollIt({
          upKey: 38,
          downKey: 40,
          easing: 'linear',
          scrollTime: 600,
          activeClass: 'active',
          topOffset: -70
        });
      });
    }
  };

  /* ---------------------------------------------- */
  /* Load Script */
  /* ---------------------------------------------- */
  var _arr = {};
  function loadScript(scriptName, callback) {
    if (!_arr[scriptName]) {
      _arr[scriptName] = true;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptName;
      script.onload = callback;
      document.body.appendChild(script);
    } else if (callback) {
      callback();
    }
  }

  /* ---------------------------------------------- */
  /* Window on Load */
  /* ---------------------------------------------- */
  $(window).on("load", function() {
    WEA.masonry();
    WEA.PreLoad();
  });

  /* ---------------------------------------------- */
  /* Document Ready */
  /* ---------------------------------------------- */
  $(document).ready(function() {
    WEA.particles();
    WEA.HeaderFixd();
    WEA.MenuClose();
    WEA.MenuTogglerClose();
    WEA.Gallery();
    WEA.ProgressBar();
    WEA.mTypeIt();
    WEA.one_page();
    WEA.Owl();
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
  });

  /* ---------------------------------------------- */
  /* Scroll & Resize */
  /* ---------------------------------------------- */
  $(window).on("scroll", function() {
    WEA.ProgressBar();
    WEA.HeaderFixd();
  });

})(jQuery);