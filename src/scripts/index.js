'use strict';

function isMobile() {
    return ($(window).width() <= 1024) ? true : false;
}

function footerplaceholder() {
    $('.footer_placeholder')
        .height($('.footer')
            .outerHeight());
}

function foundation() {
    $(document).foundation();
}

function navigation() {
    var toggle = '.menu-toggle';
    var navigation = '.navigation';
    var close = '.navigation-close';

    $(document).on('click', toggle, function(e) {
        e.preventDefault();
        $(navigation).addClass('active');
        $('body').prepend('<div class="overlay"></div>');
    });
    $(document).on('click', close, function(e) {
        e.preventDefault();
        $(close).addClass('animate');
        setTimeout(function() {
            $(close).removeClass('animate');
            $(navigation).removeClass('active');
            $('.overlay').remove();
        }, 300);
    });

    $('body').on({
        'mousewheel': function(e) {
            if (e.target.className == 'overlay') {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
}

function headerSearch() {
    var $input = $('.header-search input');
    $input.focus(function() {
        $(this).addClass('active');
    });
    $input.blur(function() {
        $(this).removeClass('active');
    });
}

function initSliders() {
    $('.detail-color').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        prevArrow: '<a href="#" class="slick-prev"><i class="fa fa-chevron-left"></i></a>',
        nextArrow: '<a href="#" class="slick-next"><i class="fa fa-chevron-right"></i></a>',
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 6
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 3
            }
        }]
    });

    $('.latest-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<a href="#" class="slick-prev"><i class="fa fa-angle-left"></i></a>',
        nextArrow: '<a href="#" class="slick-next"><i class="fa fa-angle-right"></i></a>',
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
                vertical: false
            }
        }, {
            breakpoint: 1252,
            settings: {
                slidesToShow: 3,
                vertical: false
            }
        }, {
            breakpoint: 780,
            settings: {
                slidesToShow: 2,
                vertical: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                vertical: false
            }
        }]
    });

    $('.detail-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.detail-slider-nav',
    });

    $('.detail-slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.detail-slider-for',
        focusOnSelect: true,
        arrows: false,
        vertical: true,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                vertical: false
            }
        }, {
            breakpoint: 780,
            settings: {
                slidesToShow: 5,
                vertical: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                vertical: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                vertical: false
            }
        }]
    });
}

function tabs(block) {
    if (typeof(block) === 'undefined') block = $('.tabs');
    block.each(function() {
        var $wrap = $(this);
        if (!$wrap.is('.tabs-done')) {
            $wrap.addClass('tabs-done');
            $($wrap).on('click', '[data-tabId]', function(event) {
                event.preventDefault();
                var tabid = $(this).data('tabid');
                $('[data-tabId]', $wrap).removeClass('active');
                $('[data-tabId="' + tabid + '"]', $wrap).addClass('active');
                $('[data-tab]', $wrap).removeClass('active').addClass('hidden');
                $('[data-tab="' + tabid + '"]', $wrap).addClass('active').removeClass('hidden');
            });
            if ($('.active[data-tabId]', $wrap).length > 0)
                $('.active[data-tabId]', $wrap).click();
            else
                $('[data-tabId]:eq(0)', $wrap).click();
        }
    });
}

function tabsResponsive() {
    if (isMobile()) {
        $('.tabs').each(function() {
            var panel = $(this);
            panel.find('.tabs-panel').each(function() {
                var tab = $(this).data('tab');
                var tabTitle = $('.tabs-title a[data-tabid="' + tab + '"]', panel);
                if (!tabTitle.siblings('.tabs-panel').length) {
                    var content = $(this).clone().addClass('responsive');
                    tabTitle.after(content);
                }
            });
        });
    } else {
        $('.tabs').each(function() {
            var panel = $(this);
            $('.tabs-title .tabs-panel', panel).remove();
        });
    }
}

function detailColor() {
    $(document).on('click', '.detail-color-item a', function(e) {
        e.preventDefault();
        $('.detail-color-item a').removeClass('active');
        $(this).addClass('active');

        //set color to smwhr for processing
        var color = $(this).data('color');
    });
}

function detailSize() {
    $(document).on('click', '.detail-size-item', function(e) {
        e.preventDefault();
        $('.detail-size-item').removeClass('active');
        $(this).addClass('active');

        //set size to smwhr for processing
        var size = $(this).data('size');
    });
}

function checkoutItem() {
    $('.checkout-item').not('.active').find('.checkout-body').slideUp(0);

    $(document).on('click', '.checkout-title a', function() {
        var checkout = $(this).parent();
        var item = $(this).closest('.checkout-item');

        $('.checkout-body').stop().slideUp();
        $('.checkout-item').not(item).stop().removeClass('active');

        if (item.hasClass('active')) {
            item.stop().removeClass('active');
            checkout.siblings('.checkout-body').stop().slideUp();
        } else {
            item.stop().addClass('active');
            checkout.siblings('.checkout-body').stop().slideDown();
        }
    });
}

function skrollrHandler() {
    if (isMobile()) {
        var s = skrollr.init();
        s.destroy();
    } else {
        var s = skrollr.init({
            forceHeight: false
        });
    }
}

function previewScroll() {
    $(document).on('click', '.preview-scroll', function(e) {
        e.preventDefault();
        var target = $('.preview-main').offset().top;
        $('body, html')
            .animate({
                scrollTop: target
            }, 500);
    });
}

function accountOrder() {
    $('.account-order-list').slideUp(0);

    $('.account-order-link').on('click', function(e) {
        e.preventDefault();
        var parent = $(this).closest('.account-order-item');
        parent.toggleClass('active')
        parent.find('.account-order-list').stop().slideToggle();
    });
}

function simpleMenu() {
    $('.simple-menu li').each(function(e) {
        if ($(this).hasClass('active')) {
            var target = $(this).find('a').attr('href');
            $('.account-content').hide();
            $(target).show();
        }
    });

    $(document).on('click', '.simple-menu a', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('.simple-menu li').removeClass('active');
        $(this).closest('li').addClass('active');
        $('.account-content').hide();
        $(target).show();
    });
}

function mgGlitcher(glitch, timeToStop, timeToRestart) {
    var self = this;
    this.delayTime = 1000;
    this.glitch = glitch;
    this.stopTime = timeToStop;
    this.restartTime = timeToRestart;

    this.initGlitcher = function() {
        setTimeout(function() {
            $(glitch).mgGlitch({
                destroy: false,
                glitch: true,
                scale: true,
                blend: true,
                blendModeType: 'hue',
                glitch1TimeMin: 200,
                glitch1TimeMax: 400,
                glitch2TimeMin: 10,
                glitch2TimeMax: 100
            });
            self.stopGlitcher();
        }, self.delayTime);
    };

    this.stopGlitcher = function() {
        setTimeout(function() {
            $(glitch).mgGlitch({
                destroy: true
            });
            self.restartGlitcher();
        }, self.stopTime);
    };

    this.restartGlitcher = function() {
        setTimeout(function() {
            self.initGlitcher();
        }, self.restartTime)
    }
}

function filterToggle() {
    var filter = $('.filter');
    $(document).on('click', '.filter-toggle', function(e) {
        e.preventDefault();
        filter.toggleClass('active');
    });

    if ($('#filter').length) {
        var hammertime = new Hammer(document.getElementById('filter'));
        hammertime.on('swipeleft', function() {
            filter.removeClass('active');
        });
    }
}

function projectsGrid() {
    $('.grid').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.grid-item',
        // use element for option
        columnWidth: '.grid-sizer',
        percentPosition: true
    })
}

$(document).ready(function() {
    foundation();
    footerplaceholder();
    skrollrHandler();
    previewScroll();
    navigation();
    headerSearch();
    initSliders();
    tabs();
    tabsResponsive();
    detailColor();
    detailSize();
    checkoutItem();
    accountOrder();
    simpleMenu();
    filterToggle();
    var glitch = new mgGlitcher('.glitch-img', 2000, 3000);
    glitch.initGlitcher();

    $('form').each(function() {
        $(this).validate();
    });

    $(window).on('load', function() {
        projectsGrid()
    });

    $(window).resize(function() {
        footerplaceholder();
        tabsResponsive();
        skrollrHandler();
    });
});