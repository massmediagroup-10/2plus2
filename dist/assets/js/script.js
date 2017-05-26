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

/*!
 * mgGlitch : little jquery helper to glitch everything
 * (c) 2016 Hadrien Mongouachon
 * MIT Licensed.
 *
 * Author URI: http://hmongouachon.com
 * Plugin URI: http://hmongouachon.com
 * Date : 06/2016
 * Version: 1.0.0
 */

! function(t, e, s, i) {
    "use strict";

    function n(e, s) {
        this.element = e, this.settings = t.extend({}, a, s), this._defaults = a, this._name = r, this.init()
    }
    var r = "mgGlitch",
        a = {
            destroy: !1,
            glitch: !0,
            scale: !0,
            blend: !0,
            blendModeType: "hue",
            glitch1TimeMin: 600,
            glitch1TimeMax: 900,
            glitch2TimeMin: 10,
            glitch2TimeMax: 115,
            zIndexStart: 5
        };
    t.extend(n.prototype, {
        init: function() {
            this.glitch()
        },
        glitch: function() {
            function e(t, e) {
                return Math.floor(Math.random() * (e - t + 1)) + t
            }

            function s() {
                var i = e(10, 1900),
                    n = 9999,
                    a = e(10, 1300),
                    o = 0,
                    h = e(0, 16),
                    f = e(0, 16),
                    d = e(c, l);
                t(r).css({
                    clip: "rect(" + i + "px, " + n + "px, " + a + "px," + o + "px)",
                    right: f,
                    left: h
                }), setTimeout(s, d)
            }

            function i() {
                var s = e(10, 1900),
                    n = 9999,
                    c = e(10, 1300),
                    l = 0,
                    f = e(0, 40),
                    d = e(0, 40),
                    m = e(o, h);
                if (a === !0) var x = (Math.random() * (1.1 - .9) + .9).toFixed(2);
                else if (a === !1) var x = 1;
                t(r).next().css({
                    clip: "rect(" + s + "px, " + n + "px, " + c + "px," + l + "px)",
                    left: f,
                    right: d,
                    "-webkit-transform": "scale(" + x + ")",
                    "-ms-transform": "scale(" + x + ")",
                    transform: "scale(" + x + ")"
                }), setTimeout(i, m)
            }

            function n() {
                var s = e(10, 1900),
                    i = 9999,
                    c = e(10, 1300),
                    l = 0,
                    f = e(0, 40),
                    d = e(0, 40),
                    m = e(o, h);
                if (a === !0) var x = (Math.random() * (1.1 - .9) + .9).toFixed(2);
                else if (a === !1) var x = 1;
                t(r).next().next().css({
                    clip: "rect(" + s + "px, " + i + "px, " + c + "px," + l + "px)",
                    left: f,
                    right: d,
                    "-webkit-transform": "scale(" + x + ")",
                    "-ms-transform": "scale(" + x + ")",
                    transform: "scale(" + x + ")"
                }), setTimeout(n, m)
            }
            var r = this.element,
                a = this.settings.scale,
                c = this.settings.glitch1TimeMin,
                l = this.settings.glitch1TimeMax,
                o = this.settings.glitch2TimeMin,
                h = this.settings.glitch2TimeMax,
                f = this.settings.zIndexStart;
            if (this.settings.destroy === !0)(t(r).hasClass("el-front-1") || t(r).hasClass("front-3") || t(r).hasClass("front-2")) && t(".front-1, .front-2, .front-3").remove(), t(".back").removeClass("back");
            else if (this.settings.destroy === !1) {
                var d = t(r).clone();
                if (d.insertBefore(r).addClass("back").css({
                        "z-index": f
                    }), this.settings.blend === !0) {
                    var d = t(r).clone();
                    d.insertAfter(r).addClass("front-3").css({
                        "z-index": f + 3,
                        "mix-blend-mode": this.settings.blendModeType
                    }), n()
                }
                if (this.settings.glitch === !0) {
                    var d = t(r).clone();
                    d.insertAfter(r).addClass("front-2").css({
                        "z-index": f + 2
                    }), t(".back").next().addClass("front-1").css({
                        "z-index": f + 1
                    }), s(), i()
                }
            }
        }
    }), t.fn[r] = function(t) {
        return this.each(function() {
            new n(this, t)
        })
    }
}(jQuery, window, document);
/*! jQuery Validation Plugin - v1.16.0 - 12/2/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return!c.settings.submitHandler||(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(null!=j&&null!=j.form){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr.pseudos||a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){!this.form&&this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]);var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]),!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);if("function"==typeof f.normalizer){if(i=f.normalizer.call(b,i),"string"!=typeof i)throw new TypeError("The normalizer should return a string value.");delete f.normalizer}for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e<=d},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};return a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a});
!function($) {

"use strict";

var FOUNDATION_VERSION = '6.2.4';

// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation = {
  version: FOUNDATION_VERSION,

  /**
   * Stores initialized plugins.
   */
  _plugins: {},

  /**
   * Stores generated unique ids for plugin instances
   */
  _uuids: [],

  /**
   * Returns a boolean for RTL support
   */
  rtl: function(){
    return $('html').attr('dir') === 'rtl';
  },
  /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
  plugin: function(plugin, name) {
    // Object key to use when adding to global Foundation object
    // Examples: Foundation.Reveal, Foundation.OffCanvas
    var className = (name || functionName(plugin));
    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
    // Examples: data-reveal, data-off-canvas
    var attrName  = hyphenate(className);

    // Add to the Foundation object and the plugins list (for reflowing)
    this._plugins[attrName] = this[className] = plugin;
  },
  /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
  registerPlugin: function(plugin, name){
    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
    plugin.uuid = this.GetYoDigits(6, pluginName);

    if(!plugin.$element.attr(`data-${pluginName}`)){ plugin.$element.attr(`data-${pluginName}`, plugin.uuid); }
    if(!plugin.$element.data('zfPlugin')){ plugin.$element.data('zfPlugin', plugin); }
          /**
           * Fires when the plugin has initialized.
           * @event Plugin#init
           */
    plugin.$element.trigger(`init.zf.${pluginName}`);

    this._uuids.push(plugin.uuid);

    return;
  },
  /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
  unregisterPlugin: function(plugin){
    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
    plugin.$element.removeAttr(`data-${pluginName}`).removeData('zfPlugin')
          /**
           * Fires when the plugin has been destroyed.
           * @event Plugin#destroyed
           */
          .trigger(`destroyed.zf.${pluginName}`);
    for(var prop in plugin){
      plugin[prop] = null;//clean up script to prep for garbage collection.
    }
    return;
  },

  /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
   reInit: function(plugins){
     var isJQ = plugins instanceof $;
     try{
       if(isJQ){
         plugins.each(function(){
           $(this).data('zfPlugin')._init();
         });
       }else{
         var type = typeof plugins,
         _this = this,
         fns = {
           'object': function(plgs){
             plgs.forEach(function(p){
               p = hyphenate(p);
               $('[data-'+ p +']').foundation('_init');
             });
           },
           'string': function(){
             plugins = hyphenate(plugins);
             $('[data-'+ plugins +']').foundation('_init');
           },
           'undefined': function(){
             this['object'](Object.keys(_this._plugins));
           }
         };
         fns[type](plugins);
       }
     }catch(err){
       console.error(err);
     }finally{
       return plugins;
     }
   },

  /**
   * returns a random base-36 uid with namespacing
   * @function
   * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
   * @param {String} namespace - name of plugin to be incorporated in uid, optional.
   * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
   * @returns {String} - unique id
   */
  GetYoDigits: function(length, namespace){
    length = length || 6;
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1) + (namespace ? `-${namespace}` : '');
  },
  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function(elem, plugins) {

    // If plugins is undefined, just grab everything
    if (typeof plugins === 'undefined') {
      plugins = Object.keys(this._plugins);
    }
    // If plugins is a string, convert it to an array with one item
    else if (typeof plugins === 'string') {
      plugins = [plugins];
    }

    var _this = this;

    // Iterate through each plugin
    $.each(plugins, function(i, name) {
      // Get the current plugin
      var plugin = _this._plugins[name];

      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
      var $elem = $(elem).find('[data-'+name+']').addBack('[data-'+name+']');

      // For each plugin found, initialize it
      $elem.each(function() {
        var $el = $(this),
            opts = {};
        // Don't double-dip on plugins
        if ($el.data('zfPlugin')) {
          console.warn("Tried to initialize "+name+" on an element that already has a Foundation plugin.");
          return;
        }

        if($el.attr('data-options')){
          var thing = $el.attr('data-options').split(';').forEach(function(e, i){
            var opt = e.split(':').map(function(el){ return el.trim(); });
            if(opt[0]) opts[opt[0]] = parseValue(opt[1]);
          });
        }
        try{
          $el.data('zfPlugin', new plugin($(this), opts));
        }catch(er){
          console.error(er);
        }finally{
          return;
        }
      });
    });
  },
  getFnName: functionName,
  transitionend: function($elem){
    var transitions = {
      'transition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'otransitionend'
    };
    var elem = document.createElement('div'),
        end;

    for (var t in transitions){
      if (typeof elem.style[t] !== 'undefined'){
        end = transitions[t];
      }
    }
    if(end){
      return end;
    }else{
      end = setTimeout(function(){
        $elem.triggerHandler('transitionend', [$elem]);
      }, 1);
      return 'transitionend';
    }
  }
};

Foundation.util = {
  /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
  throttle: function (func, delay) {
    var timer = null;

    return function () {
      var context = this, args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }
};

// TODO: consider not making this a jQuery function
// TODO: need way to reflow vs. re-initialize
/**
 * The Foundation jQuery method.
 * @param {String|Array} method - An action to perform on the current jQuery object.
 */
var foundation = function(method) {
  var type = typeof method,
      $meta = $('meta.foundation-mq'),
      $noJS = $('.no-js');

  if(!$meta.length){
    $('<meta class="foundation-mq">').appendTo(document.head);
  }
  if($noJS.length){
    $noJS.removeClass('no-js');
  }

  if(type === 'undefined'){//needs to initialize the Foundation object, or an individual plugin.
    Foundation.MediaQuery._init();
    Foundation.reflow(this);
  }else if(type === 'string'){//an individual method to invoke on a plugin or group of plugins
    var args = Array.prototype.slice.call(arguments, 1);//collect all the arguments, if necessary
    var plugClass = this.data('zfPlugin');//determine the class of plugin

    if(plugClass !== undefined && plugClass[method] !== undefined){//make sure both the class and method exist
      if(this.length === 1){//if there's only one, call it directly.
          plugClass[method].apply(plugClass, args);
      }else{
        this.each(function(i, el){//otherwise loop through the jQuery collection and invoke the method on each
          plugClass[method].apply($(el).data('zfPlugin'), args);
        });
      }
    }else{//error for no class or no method
      throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
    }
  }else{//error for invalid argument type
    throw new TypeError(`We're sorry, ${type} is not a valid parameter. You must use a string representing the method you wish to invoke.`);
  }
  return this;
};

window.Foundation = Foundation;
$.fn.foundation = foundation;

// Polyfill for requestAnimationFrame
(function() {
  if (!Date.now || !window.Date.now)
    window.Date.now = Date.now = function() { return new Date().getTime(); };

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                 || window[vp+'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
                          nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
  /**
   * Polyfill for performance.now, required by rAF
   */
  if(!window.performance || !window.performance.now){
    window.performance = {
      start: Date.now(),
      now: function(){ return Date.now() - this.start; }
    };
  }
})();
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// Polyfill to get the name of a function in IE9
function functionName(fn) {
  if (Function.prototype.name === undefined) {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = (funcNameRegex).exec((fn).toString());
    return (results && results.length > 1) ? results[1].trim() : "";
  }
  else if (fn.prototype === undefined) {
    return fn.constructor.name;
  }
  else {
    return fn.prototype.constructor.name;
  }
}
function parseValue(str){
  if(/true/.test(str)) return true;
  else if(/false/.test(str)) return false;
  else if(!isNaN(str * 1)) return parseFloat(str);
  return str;
}
// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

}(jQuery);

'use strict';

!function($) {

// Default set of media queries
const defaultQueries = {
  'default' : 'only screen',
  landscape : 'only screen and (orientation: landscape)',
  portrait : 'only screen and (orientation: portrait)',
  retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
    'only screen and (min--moz-device-pixel-ratio: 2),' +
    'only screen and (-o-min-device-pixel-ratio: 2/1),' +
    'only screen and (min-device-pixel-ratio: 2),' +
    'only screen and (min-resolution: 192dpi),' +
    'only screen and (min-resolution: 2dppx)'
};

var MediaQuery = {
  queries: [],

  current: '',

  /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
  _init() {
    var self = this;
    var extractedStyles = $('.foundation-mq').css('font-family');
    var namedQueries;

    namedQueries = parseStyleToObject(extractedStyles);

    for (var key in namedQueries) {
      if(namedQueries.hasOwnProperty(key)) {
        self.queries.push({
          name: key,
          value: `only screen and (min-width: ${namedQueries[key]})`
        });
      }
    }

    this.current = this._getCurrentSize();

    this._watcher();
  },

  /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
  atLeast(size) {
    var query = this.get(size);

    if (query) {
      return window.matchMedia(query).matches;
    }

    return false;
  },

  /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
  get(size) {
    for (var i in this.queries) {
      if(this.queries.hasOwnProperty(i)) {
        var query = this.queries[i];
        if (size === query.name) return query.value;
      }
    }

    return null;
  },

  /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
  _getCurrentSize() {
    var matched;

    for (var i = 0; i < this.queries.length; i++) {
      var query = this.queries[i];

      if (window.matchMedia(query.value).matches) {
        matched = query;
      }
    }

    if (typeof matched === 'object') {
      return matched.name;
    } else {
      return matched;
    }
  },

  /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
  _watcher() {
    $(window).on('resize.zf.mediaquery', () => {
      var newSize = this._getCurrentSize(), currentSize = this.current;

      if (newSize !== currentSize) {
        // Change the current media query
        this.current = newSize;

        // Broadcast the media query change on the window
        $(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
      }
    });
  }
};

Foundation.MediaQuery = MediaQuery;

// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
window.matchMedia || (window.matchMedia = function() {
  'use strict';

  // For browsers that support matchMedium api such as IE 9 and webkit
  var styleMedia = (window.styleMedia || window.media);

  // For those that don't support matchMedium
  if (!styleMedia) {
    var style   = document.createElement('style'),
    script      = document.getElementsByTagName('script')[0],
    info        = null;

    style.type  = 'text/css';
    style.id    = 'matchmediajs-test';

    script && script.parentNode && script.parentNode.insertBefore(style, script);

    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
    info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

    styleMedia = {
      matchMedium(media) {
        var text = `@media ${media}{ #matchmediajs-test { width: 1px; } }`;

        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        }

        // Test if media query is true or false
        return info.width === '1px';
      }
    }
  }

  return function(media) {
    return {
      matches: styleMedia.matchMedium(media || 'all'),
      media: media || 'all'
    };
  }
}());

// Thank you: https://github.com/sindresorhus/query-string
function parseStyleToObject(str) {
  var styleObject = {};

  if (typeof str !== 'string') {
    return styleObject;
  }

  str = str.trim().slice(1, -1); // browsers re-quote string style values

  if (!str) {
    return styleObject;
  }

  styleObject = str.split('&').reduce(function(ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = parts[0];
    var val = parts[1];
    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});

  return styleObject;
}

Foundation.MediaQuery = MediaQuery;

}(jQuery);

/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/

'use strict';

!function($) {

const keyCodes = {
  9: 'TAB',
  13: 'ENTER',
  27: 'ESCAPE',
  32: 'SPACE',
  37: 'ARROW_LEFT',
  38: 'ARROW_UP',
  39: 'ARROW_RIGHT',
  40: 'ARROW_DOWN'
}

var commands = {}

var Keyboard = {
  keys: getKeyCodes(keyCodes),

  /**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */
  parseKey(event) {
    var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();
    if (event.shiftKey) key = `SHIFT_${key}`;
    if (event.ctrlKey) key = `CTRL_${key}`;
    if (event.altKey) key = `ALT_${key}`;
    return key;
  },

  /**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */
  handleKey(event, component, functions) {
    var commandList = commands[component],
      keyCode = this.parseKey(event),
      cmds,
      command,
      fn;

    if (!commandList) return console.warn('Component not defined!');

    if (typeof commandList.ltr === 'undefined') { // this component does not differentiate between ltr and rtl
        cmds = commandList; // use plain list
    } else { // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
        if (Foundation.rtl()) cmds = $.extend({}, commandList.ltr, commandList.rtl);

        else cmds = $.extend({}, commandList.rtl, commandList.ltr);
    }
    command = cmds[keyCode];

    fn = functions[command];
    if (fn && typeof fn === 'function') { // execute function  if exists
      var returnValue = fn.apply();
      if (functions.handled || typeof functions.handled === 'function') { // execute function when event was handled
          functions.handled(returnValue);
      }
    } else {
      if (functions.unhandled || typeof functions.unhandled === 'function') { // execute function when event was not handled
          functions.unhandled();
      }
    }
  },

  /**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */
  findFocusable($element) {
    return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function() {
      if (!$(this).is(':visible') || $(this).attr('tabindex') < 0) { return false; } //only have visible elements and those that have a tabindex greater or equal 0
      return true;
    });
  },

  /**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */

  register(componentName, cmds) {
    commands[componentName] = cmds;
  }
}

/*
 * Constants for easier comparing.
 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
 */
function getKeyCodes(kcs) {
  var k = {};
  for (var kc in kcs) k[kcs[kc]] = kcs[kc];
  return k;
}

Foundation.Keyboard = Keyboard;

}(jQuery);

'use strict';

!function($) {

Foundation.Box = {
  ImNotTouchingYou: ImNotTouchingYou,
  GetDimensions: GetDimensions,
  GetOffsets: GetOffsets
}

/**
 * Compares the dimensions of an element to a container and determines collision events with container.
 * @function
 * @param {jQuery} element - jQuery object to test for collisions.
 * @param {jQuery} parent - jQuery object to use as bounding container.
 * @param {Boolean} lrOnly - set to true to check left and right values only.
 * @param {Boolean} tbOnly - set to true to check top and bottom values only.
 * @default if no parent object passed, detects collisions with `window`.
 * @returns {Boolean} - true if collision free, false if a collision in any direction.
 */
function ImNotTouchingYou(element, parent, lrOnly, tbOnly) {
  var eleDims = GetDimensions(element),
      top, bottom, left, right;

  if (parent) {
    var parDims = GetDimensions(parent);

    bottom = (eleDims.offset.top + eleDims.height <= parDims.height + parDims.offset.top);
    top    = (eleDims.offset.top >= parDims.offset.top);
    left   = (eleDims.offset.left >= parDims.offset.left);
    right  = (eleDims.offset.left + eleDims.width <= parDims.width + parDims.offset.left);
  }
  else {
    bottom = (eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top);
    top    = (eleDims.offset.top >= eleDims.windowDims.offset.top);
    left   = (eleDims.offset.left >= eleDims.windowDims.offset.left);
    right  = (eleDims.offset.left + eleDims.width <= eleDims.windowDims.width);
  }

  var allDirs = [bottom, top, left, right];

  if (lrOnly) {
    return left === right === true;
  }

  if (tbOnly) {
    return top === bottom === true;
  }

  return allDirs.indexOf(false) === -1;
};

/**
 * Uses native methods to return an object of dimension values.
 * @function
 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
 * @returns {Object} - nested object of integer pixel values
 * TODO - if element is window, return only those values.
 */
function GetDimensions(elem, test){
  elem = elem.length ? elem[0] : elem;

  if (elem === window || elem === document) {
    throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
  }

  var rect = elem.getBoundingClientRect(),
      parRect = elem.parentNode.getBoundingClientRect(),
      winRect = document.body.getBoundingClientRect(),
      winY = window.pageYOffset,
      winX = window.pageXOffset;

  return {
    width: rect.width,
    height: rect.height,
    offset: {
      top: rect.top + winY,
      left: rect.left + winX
    },
    parentDims: {
      width: parRect.width,
      height: parRect.height,
      offset: {
        top: parRect.top + winY,
        left: parRect.left + winX
      }
    },
    windowDims: {
      width: winRect.width,
      height: winRect.height,
      offset: {
        top: winY,
        left: winX
      }
    }
  }
}

/**
 * Returns an object of top and left integer pixel values for dynamically rendered elements,
 * such as: Tooltip, Reveal, and Dropdown
 * @function
 * @param {jQuery} element - jQuery object for the element being positioned.
 * @param {jQuery} anchor - jQuery object for the element's anchor point.
 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
 * TODO alter/rewrite to work with `em` values as well/instead of pixels
 */
function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
  var $eleDims = GetDimensions(element),
      $anchorDims = anchor ? GetDimensions(anchor) : null;

  switch (position) {
    case 'top':
      return {
        left: (Foundation.rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width : $anchorDims.offset.left),
        top: $anchorDims.offset.top - ($eleDims.height + vOffset)
      }
      break;
    case 'left':
      return {
        left: $anchorDims.offset.left - ($eleDims.width + hOffset),
        top: $anchorDims.offset.top
      }
      break;
    case 'right':
      return {
        left: $anchorDims.offset.left + $anchorDims.width + hOffset,
        top: $anchorDims.offset.top
      }
      break;
    case 'center top':
      return {
        left: ($anchorDims.offset.left + ($anchorDims.width / 2)) - ($eleDims.width / 2),
        top: $anchorDims.offset.top - ($eleDims.height + vOffset)
      }
      break;
    case 'center bottom':
      return {
        left: isOverflow ? hOffset : (($anchorDims.offset.left + ($anchorDims.width / 2)) - ($eleDims.width / 2)),
        top: $anchorDims.offset.top + $anchorDims.height + vOffset
      }
      break;
    case 'center left':
      return {
        left: $anchorDims.offset.left - ($eleDims.width + hOffset),
        top: ($anchorDims.offset.top + ($anchorDims.height / 2)) - ($eleDims.height / 2)
      }
      break;
    case 'center right':
      return {
        left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
        top: ($anchorDims.offset.top + ($anchorDims.height / 2)) - ($eleDims.height / 2)
      }
      break;
    case 'center':
      return {
        left: ($eleDims.windowDims.offset.left + ($eleDims.windowDims.width / 2)) - ($eleDims.width / 2),
        top: ($eleDims.windowDims.offset.top + ($eleDims.windowDims.height / 2)) - ($eleDims.height / 2)
      }
      break;
    case 'reveal':
      return {
        left: ($eleDims.windowDims.width - $eleDims.width) / 2,
        top: $eleDims.windowDims.offset.top + vOffset
      }
    case 'reveal full':
      return {
        left: $eleDims.windowDims.offset.left,
        top: $eleDims.windowDims.offset.top
      }
      break;
    case 'left bottom':
      return {
        left: $anchorDims.offset.left,
        top: $anchorDims.offset.top + $anchorDims.height
      };
      break;
    case 'right bottom':
      return {
        left: $anchorDims.offset.left + $anchorDims.width + hOffset - $eleDims.width,
        top: $anchorDims.offset.top + $anchorDims.height
      };
      break;
    default:
      return {
        left: (Foundation.rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width : $anchorDims.offset.left + hOffset),
        top: $anchorDims.offset.top + $anchorDims.height + vOffset
      }
  }
}

}(jQuery);

'use strict';

!function($) {

const MutationObserver = (function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
  for (var i=0; i < prefixes.length; i++) {
    if (`${prefixes[i]}MutationObserver` in window) {
      return window[`${prefixes[i]}MutationObserver`];
    }
  }
  return false;
}());

const triggers = (el, type) => {
  el.data(type).split(' ').forEach(id => {
    $(`#${id}`)[ type === 'close' ? 'trigger' : 'triggerHandler'](`${type}.zf.trigger`, [el]);
  });
};
// Elements with [data-open] will reveal a plugin that supports it when clicked.
$(document).on('click.zf.trigger', '[data-open]', function() {
  triggers($(this), 'open');
});

// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
$(document).on('click.zf.trigger', '[data-close]', function() {
  let id = $(this).data('close');
  if (id) {
    triggers($(this), 'close');
  }
  else {
    $(this).trigger('close.zf.trigger');
  }
});

// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
$(document).on('click.zf.trigger', '[data-toggle]', function() {
  triggers($(this), 'toggle');
});

// Elements with [data-closable] will respond to close.zf.trigger events.
$(document).on('close.zf.trigger', '[data-closable]', function(e){
  e.stopPropagation();
  let animation = $(this).data('closable');

  if(animation !== ''){
    Foundation.Motion.animateOut($(this), animation, function() {
      $(this).trigger('closed.zf');
    });
  }else{
    $(this).fadeOut().trigger('closed.zf');
  }
});

$(document).on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', function() {
  let id = $(this).data('toggle-focus');
  $(`#${id}`).triggerHandler('toggle.zf.trigger', [$(this)]);
});

/**
* Fires once after all other scripts have loaded
* @function
* @private
*/
$(window).on('load', () => {
  checkListeners();
});

function checkListeners() {
  eventsListener();
  resizeListener();
  scrollListener();
  closemeListener();
}

//******** only fires this function once on load, if there's something to watch ********
function closemeListener(pluginName) {
  var yetiBoxes = $('[data-yeti-box]'),
      plugNames = ['dropdown', 'tooltip', 'reveal'];

  if(pluginName){
    if(typeof pluginName === 'string'){
      plugNames.push(pluginName);
    }else if(typeof pluginName === 'object' && typeof pluginName[0] === 'string'){
      plugNames.concat(pluginName);
    }else{
      console.error('Plugin names must be strings');
    }
  }
  if(yetiBoxes.length){
    let listeners = plugNames.map((name) => {
      return `closeme.zf.${name}`;
    }).join(' ');

    $(window).off(listeners).on(listeners, function(e, pluginId){
      let plugin = e.namespace.split('.')[0];
      let plugins = $(`[data-${plugin}]`).not(`[data-yeti-box="${pluginId}"]`);

      plugins.each(function(){
        let _this = $(this);

        _this.triggerHandler('close.zf.trigger', [_this]);
      });
    });
  }
}

function resizeListener(debounce){
  let timer,
      $nodes = $('[data-resize]');
  if($nodes.length){
    $(window).off('resize.zf.trigger')
    .on('resize.zf.trigger', function(e) {
      if (timer) { clearTimeout(timer); }

      timer = setTimeout(function(){

        if(!MutationObserver){//fallback for IE 9
          $nodes.each(function(){
            $(this).triggerHandler('resizeme.zf.trigger');
          });
        }
        //trigger all listening elements and signal a resize event
        $nodes.attr('data-events', "resize");
      }, debounce || 10);//default time to emit resize event
    });
  }
}

function scrollListener(debounce){
  let timer,
      $nodes = $('[data-scroll]');
  if($nodes.length){
    $(window).off('scroll.zf.trigger')
    .on('scroll.zf.trigger', function(e){
      if(timer){ clearTimeout(timer); }

      timer = setTimeout(function(){

        if(!MutationObserver){//fallback for IE 9
          $nodes.each(function(){
            $(this).triggerHandler('scrollme.zf.trigger');
          });
        }
        //trigger all listening elements and signal a scroll event
        $nodes.attr('data-events', "scroll");
      }, debounce || 10);//default time to emit scroll event
    });
  }
}

function eventsListener() {
  if(!MutationObserver){ return false; }
  let nodes = document.querySelectorAll('[data-resize], [data-scroll], [data-mutate]');

  //element callback
  var listeningElementsMutation = function(mutationRecordsList) {
    var $target = $(mutationRecordsList[0].target);
    //trigger the event handler for the element depending on type
    switch ($target.attr("data-events")) {

      case "resize" :
      $target.triggerHandler('resizeme.zf.trigger', [$target]);
      break;

      case "scroll" :
      $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
      break;

      // case "mutate" :
      // console.log('mutate', $target);
      // $target.triggerHandler('mutate.zf.trigger');
      //
      // //make sure we don't get stuck in an infinite loop from sloppy codeing
      // if ($target.index('[data-mutate]') == $("[data-mutate]").length-1) {
      //   domMutationObserver();
      // }
      // break;

      default :
      return false;
      //nothing
    }
  }

  if(nodes.length){
    //for each element that needs to listen for resizing, scrolling, (or coming soon mutation) add a single observer
    for (var i = 0; i <= nodes.length-1; i++) {
      let elementObserver = new MutationObserver(listeningElementsMutation);
      elementObserver.observe(nodes[i], { attributes: true, childList: false, characterData: false, subtree:false, attributeFilter:["data-events"]});
    }
  }
}

// ------------------------------------

// [PH]
// Foundation.CheckWatchers = checkWatchers;
Foundation.IHearYou = checkListeners;
// Foundation.ISeeYou = scrollListener;
// Foundation.IFeelYou = closemeListener;

}(jQuery);

// function domMutationObserver(debounce) {
//   // !!! This is coming soon and needs more work; not active  !!! //
//   var timer,
//   nodes = document.querySelectorAll('[data-mutate]');
//   //
//   if (nodes.length) {
//     // var MutationObserver = (function () {
//     //   var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
//     //   for (var i=0; i < prefixes.length; i++) {
//     //     if (prefixes[i] + 'MutationObserver' in window) {
//     //       return window[prefixes[i] + 'MutationObserver'];
//     //     }
//     //   }
//     //   return false;
//     // }());
//
//
//     //for the body, we need to listen for all changes effecting the style and class attributes
//     var bodyObserver = new MutationObserver(bodyMutation);
//     bodyObserver.observe(document.body, { attributes: true, childList: true, characterData: false, subtree:true, attributeFilter:["style", "class"]});
//
//
//     //body callback
//     function bodyMutation(mutate) {
//       //trigger all listening elements and signal a mutation event
//       if (timer) { clearTimeout(timer); }
//
//       timer = setTimeout(function() {
//         bodyObserver.disconnect();
//         $('[data-mutate]').attr('data-events',"mutate");
//       }, debounce || 150);
//     }
//   }
// }

'use strict';

!function($) {

/**
 * Reveal module.
 * @module foundation.reveal
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion if using animations
 */

class Reveal {
  /**
   * Creates a new instance of Reveal.
   * @class
   * @param {jQuery} element - jQuery object to use for the modal.
   * @param {Object} options - optional parameters.
   */
  constructor(element, options) {
    this.$element = element;
    this.options = $.extend({}, Reveal.defaults, this.$element.data(), options);
    this._init();

    Foundation.registerPlugin(this, 'Reveal');
    Foundation.Keyboard.register('Reveal', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ESCAPE': 'close',
      'TAB': 'tab_forward',
      'SHIFT_TAB': 'tab_backward'
    });
  }

  /**
   * Initializes the modal by adding the overlay and close buttons, (if selected).
   * @private
   */
  _init() {
    this.id = this.$element.attr('id');
    this.isActive = false;
    this.cached = {mq: Foundation.MediaQuery.current};
    this.isMobile = mobileSniff();

    this.$anchor = $(`[data-open="${this.id}"]`).length ? $(`[data-open="${this.id}"]`) : $(`[data-toggle="${this.id}"]`);
    this.$anchor.attr({
      'aria-controls': this.id,
      'aria-haspopup': true,
      'tabindex': 0
    });

    if (this.options.fullScreen || this.$element.hasClass('full')) {
      this.options.fullScreen = true;
      this.options.overlay = false;
    }
    if (this.options.overlay && !this.$overlay) {
      this.$overlay = this._makeOverlay(this.id);
    }

    this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'data-yeti-box': this.id,
        'data-resize': this.id
    });

    if(this.$overlay) {
      this.$element.detach().appendTo(this.$overlay);
    } else {
      this.$element.detach().appendTo($('body'));
      this.$element.addClass('without-overlay');
    }
    this._events();
    if (this.options.deepLink && window.location.hash === ( `#${this.id}`)) {
      $(window).one('load.zf.reveal', this.open.bind(this));
    }
  }

  /**
   * Creates an overlay div to display behind the modal.
   * @private
   */
  _makeOverlay(id) {
    var $overlay = $('<div></div>')
                    .addClass('reveal-overlay')
                    .appendTo('body');
    return $overlay;
  }

  /**
   * Updates position of modal
   * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
   * @private
   */
  _updatePosition() {
    var width = this.$element.outerWidth();
    var outerWidth = $(window).width();
    var height = this.$element.outerHeight();
    var outerHeight = $(window).height();
    var left, top;
    if (this.options.hOffset === 'auto') {
      left = parseInt((outerWidth - width) / 2, 10);
    } else {
      left = parseInt(this.options.hOffset, 10);
    }
    if (this.options.vOffset === 'auto') {
      if (height > outerHeight) {
        top = parseInt(Math.min(100, outerHeight / 10), 10);
      } else {
        top = parseInt((outerHeight - height) / 4, 10);
      }
    } else {
      top = parseInt(this.options.vOffset, 10);
    }
    this.$element.css({top: top + 'px'});
    // only worry about left if we don't have an overlay or we havea  horizontal offset,
    // otherwise we're perfectly in the middle
    if(!this.$overlay || (this.options.hOffset !== 'auto')) {
      this.$element.css({left: left + 'px'});
      this.$element.css({margin: '0px'});
    }

  }

  /**
   * Adds event handlers for the modal.
   * @private
   */
  _events() {
    var _this = this;

    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': (event, $element) => {
        if ((event.target === _this.$element[0]) ||
            ($(event.target).parents('[data-closable]')[0] === $element)) { // only close reveal when it's explicitly called
          return this.close.apply(this);
        }
      },
      'toggle.zf.trigger': this.toggle.bind(this),
      'resizeme.zf.trigger': function() {
        _this._updatePosition();
      }
    });

    if (this.$anchor.length) {
      this.$anchor.on('keydown.zf.reveal', function(e) {
        if (e.which === 13 || e.which === 32) {
          e.stopPropagation();
          e.preventDefault();
          _this.open();
        }
      });
    }

    if (this.options.closeOnClick && this.options.overlay) {
      this.$overlay.off('.zf.reveal').on('click.zf.reveal', function(e) {
        if (e.target === _this.$element[0] || 
          $.contains(_this.$element[0], e.target) || 
            !$.contains(document, e.target)) { 
              return; 
        }
        _this.close();
      });
    }
    if (this.options.deepLink) {
      $(window).on(`popstate.zf.reveal:${this.id}`, this._handleState.bind(this));
    }
  }

  /**
   * Handles modal methods on back/forward button clicks or any other event that triggers popstate.
   * @private
   */
  _handleState(e) {
    if(window.location.hash === ( '#' + this.id) && !this.isActive){ this.open(); }
    else{ this.close(); }
  }


  /**
   * Opens the modal controlled by `this.$anchor`, and closes all others by default.
   * @function
   * @fires Reveal#closeme
   * @fires Reveal#open
   */
  open() {
    if (this.options.deepLink) {
      var hash = `#${this.id}`;

      if (window.history.pushState) {
        window.history.pushState(null, null, hash);
      } else {
        window.location.hash = hash;
      }
    }

    this.isActive = true;

    // Make elements invisible, but remove display: none so we can get size and positioning
    this.$element
        .css({ 'visibility': 'hidden' })
        .show()
        .scrollTop(0);
    if (this.options.overlay) {
      this.$overlay.css({'visibility': 'hidden'}).show();
    }

    this._updatePosition();

    this.$element
      .hide()
      .css({ 'visibility': '' });

    if(this.$overlay) {
      this.$overlay.css({'visibility': ''}).hide();
      if(this.$element.hasClass('fast')) {
        this.$overlay.addClass('fast');
      } else if (this.$element.hasClass('slow')) {
        this.$overlay.addClass('slow');
      }
    }


    if (!this.options.multipleOpened) {
      /**
       * Fires immediately before the modal opens.
       * Closes any other modals that are currently open
       * @event Reveal#closeme
       */
      this.$element.trigger('closeme.zf.reveal', this.id);
    }
    // Motion UI method of reveal
    if (this.options.animationIn) {
      var _this = this;
      function afterAnimationFocus(){
        _this.$element
          .attr({
            'aria-hidden': false,
            'tabindex': -1
          })
          .focus();
      }
      if (this.options.overlay) {
        Foundation.Motion.animateIn(this.$overlay, 'fade-in');
      }
      Foundation.Motion.animateIn(this.$element, this.options.animationIn, () => {
        this.focusableElements = Foundation.Keyboard.findFocusable(this.$element);
        afterAnimationFocus();
      });
    }
    // jQuery method of reveal
    else {
      if (this.options.overlay) {
        this.$overlay.show(0);
      }
      this.$element.show(this.options.showDelay);
    }

    // handle accessibility
    this.$element
      .attr({
        'aria-hidden': false,
        'tabindex': -1
      })
      .focus();

    /**
     * Fires when the modal has successfully opened.
     * @event Reveal#open
     */
    this.$element.trigger('open.zf.reveal');

    if (this.isMobile) {
      this.originalScrollPos = window.pageYOffset;
      $('html, body').addClass('is-reveal-open');
    }
    else {
      $('body').addClass('is-reveal-open');
    }

    setTimeout(() => {
      this._extraHandlers();
    }, 0);
  }

  /**
   * Adds extra event handlers for the body and window if necessary.
   * @private
   */
  _extraHandlers() {
    var _this = this;
    this.focusableElements = Foundation.Keyboard.findFocusable(this.$element);

    if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
      $('body').on('click.zf.reveal', function(e) {
        if (e.target === _this.$element[0] || 
          $.contains(_this.$element[0], e.target) || 
            !$.contains(document, e.target)) { return; }
        _this.close();
      });
    }

    if (this.options.closeOnEsc) {
      $(window).on('keydown.zf.reveal', function(e) {
        Foundation.Keyboard.handleKey(e, 'Reveal', {
          close: function() {
            if (_this.options.closeOnEsc) {
              _this.close();
              _this.$anchor.focus();
            }
          }
        });
      });
    }

    // lock focus within modal while tabbing
    this.$element.on('keydown.zf.reveal', function(e) {
      var $target = $(this);
      // handle keyboard event with keyboard util
      Foundation.Keyboard.handleKey(e, 'Reveal', {
        tab_forward: function() {
          _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
          if (_this.$element.find(':focus').is(_this.focusableElements.eq(-1))) { // left modal downwards, setting focus to first element
            _this.focusableElements.eq(0).focus();
            return true;
          }
          if (_this.focusableElements.length === 0) { // no focusable elements inside the modal at all, prevent tabbing in general
            return true;
          }
        },
        tab_backward: function() {
          _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
          if (_this.$element.find(':focus').is(_this.focusableElements.eq(0)) || _this.$element.is(':focus')) { // left modal upwards, setting focus to last element
            _this.focusableElements.eq(-1).focus();
            return true;
          }
          if (_this.focusableElements.length === 0) { // no focusable elements inside the modal at all, prevent tabbing in general
            return true;
          }
        },
        open: function() {
          if (_this.$element.find(':focus').is(_this.$element.find('[data-close]'))) {
            setTimeout(function() { // set focus back to anchor if close button has been activated
              _this.$anchor.focus();
            }, 1);
          } else if ($target.is(_this.focusableElements)) { // dont't trigger if acual element has focus (i.e. inputs, links, ...)
            _this.open();
          }
        },
        close: function() {
          if (_this.options.closeOnEsc) {
            _this.close();
            _this.$anchor.focus();
          }
        },
        handled: function(preventDefault) {
          if (preventDefault) {
            e.preventDefault();
          }
        }
      });
    });
  }

  /**
   * Closes the modal.
   * @function
   * @fires Reveal#closed
   */
  close() {
    if (!this.isActive || !this.$element.is(':visible')) {
      return false;
    }
    var _this = this;

    // Motion UI method of hiding
    if (this.options.animationOut) {
      if (this.options.overlay) {
        Foundation.Motion.animateOut(this.$overlay, 'fade-out', finishUp);
      }
      else {
        finishUp();
      }

      Foundation.Motion.animateOut(this.$element, this.options.animationOut);
    }
    // jQuery method of hiding
    else {
      if (this.options.overlay) {
        this.$overlay.hide(0, finishUp);
      }
      else {
        finishUp();
      }

      this.$element.hide(this.options.hideDelay);
    }

    // Conditionals to remove extra event listeners added on open
    if (this.options.closeOnEsc) {
      $(window).off('keydown.zf.reveal');
    }

    if (!this.options.overlay && this.options.closeOnClick) {
      $('body').off('click.zf.reveal');
    }

    this.$element.off('keydown.zf.reveal');

    function finishUp() {
      if (_this.isMobile) {
        $('html, body').removeClass('is-reveal-open');
        if(_this.originalScrollPos) {
          $('body').scrollTop(_this.originalScrollPos);
          _this.originalScrollPos = null;
        }
      }
      else {
        $('body').removeClass('is-reveal-open');
      }

      _this.$element.attr('aria-hidden', true);

      /**
      * Fires when the modal is done closing.
      * @event Reveal#closed
      */
      _this.$element.trigger('closed.zf.reveal');
    }

    /**
    * Resets the modal content
    * This prevents a running video to keep going in the background
    */
    if (this.options.resetOnClose) {
      this.$element.html(this.$element.html());
    }

    this.isActive = false;
     if (_this.options.deepLink) {
       if (window.history.replaceState) {
         window.history.replaceState("", document.title, window.location.pathname);
       } else {
         window.location.hash = '';
       }
     }
  }

  /**
   * Toggles the open/closed state of a modal.
   * @function
   */
  toggle() {
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  };

  /**
   * Destroys an instance of a modal.
   * @function
   */
  destroy() {
    if (this.options.overlay) {
      this.$element.appendTo($('body')); // move $element outside of $overlay to prevent error unregisterPlugin()
      this.$overlay.hide().off().remove();
    }
    this.$element.hide().off();
    this.$anchor.off('.zf');
    $(window).off(`.zf.reveal:${this.id}`);

    Foundation.unregisterPlugin(this);
  };
}

Reveal.defaults = {
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @example 'slide-in-left'
   */
  animationIn: '',
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @example 'slide-out-right'
   */
  animationOut: '',
  /**
   * Time, in ms, to delay the opening of a modal after a click if no animation used.
   * @option
   * @example 10
   */
  showDelay: 0,
  /**
   * Time, in ms, to delay the closing of a modal after a click if no animation used.
   * @option
   * @example 10
   */
  hideDelay: 0,
  /**
   * Allows a click on the body/overlay to close the modal.
   * @option
   * @example true
   */
  closeOnClick: true,
  /**
   * Allows the modal to close if the user presses the `ESCAPE` key.
   * @option
   * @example true
   */
  closeOnEsc: true,
  /**
   * If true, allows multiple modals to be displayed at once.
   * @option
   * @example false
   */
  multipleOpened: false,
  /**
   * Distance, in pixels, the modal should push down from the top of the screen.
   * @option
   * @example auto
   */
  vOffset: 'auto',
  /**
   * Distance, in pixels, the modal should push in from the side of the screen.
   * @option
   * @example auto
   */
  hOffset: 'auto',
  /**
   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
   * @option
   * @example false
   */
  fullScreen: false,
  /**
   * Percentage of screen height the modal should push up from the bottom of the view.
   * @option
   * @example 10
   */
  btmOffsetPct: 10,
  /**
   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
   * @option
   * @example true
   */
  overlay: true,
  /**
   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
   * @option
   * @example false
   */
  resetOnClose: false,
  /**
   * Allows the modal to alter the url on open/close, and allows the use of the `back` button to close modals. ALSO, allows a modal to auto-maniacally open on page load IF the hash === the modal's user-set id.
   * @option
   * @example false
   */
  deepLink: false
};

// Window exports
Foundation.plugin(Reveal, 'Reveal');

function iPhoneSniff() {
  return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent);
}

function androidSniff() {
  return /Android/.test(window.navigator.userAgent);
}

function mobileSniff() {
  return iPhoneSniff() || androidSniff();
}

}(jQuery);

'use strict';

!function($) {

/**
 * Dropdown module.
 * @module foundation.dropdown
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 */

class Dropdown {
  /**
   * Creates a new instance of a dropdown.
   * @class
   * @param {jQuery} element - jQuery object to make into a dropdown.
   *        Object should be of the dropdown panel, rather than its anchor.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  constructor(element, options) {
    this.$element = element;
    this.options = $.extend({}, Dropdown.defaults, this.$element.data(), options);
    this._init();

    Foundation.registerPlugin(this, 'Dropdown');
    Foundation.Keyboard.register('Dropdown', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ESCAPE': 'close',
      'TAB': 'tab_forward',
      'SHIFT_TAB': 'tab_backward'
    });
  }

  /**
   * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
   * @function
   * @private
   */
  _init() {
    var $id = this.$element.attr('id');

    this.$anchor = $(`[data-toggle="${$id}"]`).length ? $(`[data-toggle="${$id}"]`) : $(`[data-open="${$id}"]`);
    this.$anchor.attr({
      'aria-controls': $id,
      'data-is-focus': false,
      'data-yeti-box': $id,
      'aria-haspopup': true,
      'aria-expanded': false

    });

    this.options.positionClass = this.getPositionClass();
    this.counter = 4;
    this.usedPositions = [];
    this.$element.attr({
      'aria-hidden': 'true',
      'data-yeti-box': $id,
      'data-resize': $id,
      'aria-labelledby': this.$anchor[0].id || Foundation.GetYoDigits(6, 'dd-anchor')
    });
    this._events();
  }

  /**
   * Helper function to determine current orientation of dropdown pane.
   * @function
   * @returns {String} position - string value of a position class.
   */
  getPositionClass() {
    var verticalPosition = this.$element[0].className.match(/(top|left|right|bottom)/g);
        verticalPosition = verticalPosition ? verticalPosition[0] : '';
    var horizontalPosition = /float-(\S+)/.exec(this.$anchor[0].className);
        horizontalPosition = horizontalPosition ? horizontalPosition[1] : '';
    var position = horizontalPosition ? horizontalPosition + ' ' + verticalPosition : verticalPosition;

    return position;
  }

  /**
   * Adjusts the dropdown panes orientation by adding/removing positioning classes.
   * @function
   * @private
   * @param {String} position - position class to remove.
   */
  _reposition(position) {
    this.usedPositions.push(position ? position : 'bottom');
    //default, try switching to opposite side
    if(!position && (this.usedPositions.indexOf('top') < 0)){
      this.$element.addClass('top');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }else if(position === 'left' && (this.usedPositions.indexOf('right') < 0)){
      this.$element.removeClass(position)
          .addClass('right');
    }else if(position === 'right' && (this.usedPositions.indexOf('left') < 0)){
      this.$element.removeClass(position)
          .addClass('left');
    }

    //if default change didn't work, try bottom or left first
    else if(!position && (this.usedPositions.indexOf('top') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.$element.addClass('left');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.$element.removeClass(position)
          .addClass('left');
    }else if(position === 'left' && (this.usedPositions.indexOf('right') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }else if(position === 'right' && (this.usedPositions.indexOf('left') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }
    //if nothing cleared, set to bottom
    else{
      this.$element.removeClass(position);
    }
    this.classChanged = true;
    this.counter--;
  }

  /**
   * Sets the position and orientation of the dropdown pane, checks for collisions.
   * Recursively calls itself if a collision is detected, with a new position class.
   * @function
   * @private
   */
  _setPosition() {
    if(this.$anchor.attr('aria-expanded') === 'false'){ return false; }
    var position = this.getPositionClass(),
        $eleDims = Foundation.Box.GetDimensions(this.$element),
        $anchorDims = Foundation.Box.GetDimensions(this.$anchor),
        _this = this,
        direction = (position === 'left' ? 'left' : ((position === 'right') ? 'left' : 'top')),
        param = (direction === 'top') ? 'height' : 'width',
        offset = (param === 'height') ? this.options.vOffset : this.options.hOffset;



    if(($eleDims.width >= $eleDims.windowDims.width) || (!this.counter && !Foundation.Box.ImNotTouchingYou(this.$element))){
      this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
        'width': $eleDims.windowDims.width - (this.options.hOffset * 2),
        'height': 'auto'
      });
      this.classChanged = true;
      return false;
    }

    this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, position, this.options.vOffset, this.options.hOffset));

    while(!Foundation.Box.ImNotTouchingYou(this.$element, false, true) && this.counter){
      this._reposition(position);
      this._setPosition();
    }
  }

  /**
   * Adds event listeners to the element utilizing the triggers utility library.
   * @function
   * @private
   */
  _events() {
    var _this = this;
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'resizeme.zf.trigger': this._setPosition.bind(this)
    });

    if(this.options.hover){
      this.$anchor.off('mouseenter.zf.dropdown mouseleave.zf.dropdown')
      .on('mouseenter.zf.dropdown', function(){
            if($('body[data-whatinput="mouse"]').is('*')) {
              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function(){
                _this.open();
                _this.$anchor.data('hover', true);
              }, _this.options.hoverDelay);
            }
          }).on('mouseleave.zf.dropdown', function(){
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function(){
              _this.close();
              _this.$anchor.data('hover', false);
            }, _this.options.hoverDelay);
          });
      if(this.options.hoverPane){
        this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown')
            .on('mouseenter.zf.dropdown', function(){
              clearTimeout(_this.timeout);
            }).on('mouseleave.zf.dropdown', function(){
              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function(){
                _this.close();
                _this.$anchor.data('hover', false);
              }, _this.options.hoverDelay);
            });
      }
    }
    this.$anchor.add(this.$element).on('keydown.zf.dropdown', function(e) {

      var $target = $(this),
        visibleFocusableElements = Foundation.Keyboard.findFocusable(_this.$element);

      Foundation.Keyboard.handleKey(e, 'Dropdown', {
        tab_forward: function() {
          if (_this.$element.find(':focus').is(visibleFocusableElements.eq(-1))) { // left modal downwards, setting focus to first element
            if (_this.options.trapFocus) { // if focus shall be trapped
              visibleFocusableElements.eq(0).focus();
              e.preventDefault();
            } else { // if focus is not trapped, close dropdown on focus out
              _this.close();
            }
          }
        },
        tab_backward: function() {
          if (_this.$element.find(':focus').is(visibleFocusableElements.eq(0)) || _this.$element.is(':focus')) { // left modal upwards, setting focus to last element
            if (_this.options.trapFocus) { // if focus shall be trapped
              visibleFocusableElements.eq(-1).focus();
              e.preventDefault();
            } else { // if focus is not trapped, close dropdown on focus out
              _this.close();
            }
          }
        },
        open: function() {
          if ($target.is(_this.$anchor)) {
            _this.open();
            _this.$element.attr('tabindex', -1).focus();
            e.preventDefault();
          }
        },
        close: function() {
          _this.close();
          _this.$anchor.focus();
        }
      });
    });
  }

  /**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */
  _addBodyHandler() {
     var $body = $(document.body).not(this.$element),
         _this = this;
     $body.off('click.zf.dropdown')
          .on('click.zf.dropdown', function(e){
            if(_this.$anchor.is(e.target) || _this.$anchor.find(e.target).length) {
              return;
            }
            if(_this.$element.find(e.target).length) {
              return;
            }
            _this.close();
            $body.off('click.zf.dropdown');
          });
  }

  /**
   * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
   * @function
   * @fires Dropdown#closeme
   * @fires Dropdown#show
   */
  open() {
    // var _this = this;
    /**
     * Fires to close other open dropdowns
     * @event Dropdown#closeme
     */
    this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
    this.$anchor.addClass('hover')
        .attr({'aria-expanded': true});
    // this.$element/*.show()*/;
    this._setPosition();
    this.$element.addClass('is-open')
        .attr({'aria-hidden': false});

    if(this.options.autoFocus){
      var $focusable = Foundation.Keyboard.findFocusable(this.$element);
      if($focusable.length){
        $focusable.eq(0).focus();
      }
    }

    if(this.options.closeOnClick){ this._addBodyHandler(); }

    /**
     * Fires once the dropdown is visible.
     * @event Dropdown#show
     */
    this.$element.trigger('show.zf.dropdown', [this.$element]);
  }

  /**
   * Closes the open dropdown pane.
   * @function
   * @fires Dropdown#hide
   */
  close() {
    if(!this.$element.hasClass('is-open')){
      return false;
    }
    this.$element.removeClass('is-open')
        .attr({'aria-hidden': true});

    this.$anchor.removeClass('hover')
        .attr('aria-expanded', false);

    if(this.classChanged){
      var curPositionClass = this.getPositionClass();
      if(curPositionClass){
        this.$element.removeClass(curPositionClass);
      }
      this.$element.addClass(this.options.positionClass)
          /*.hide()*/.css({height: '', width: ''});
      this.classChanged = false;
      this.counter = 4;
      this.usedPositions.length = 0;
    }
    this.$element.trigger('hide.zf.dropdown', [this.$element]);
  }

  /**
   * Toggles the dropdown pane's visibility.
   * @function
   */
  toggle() {
    if(this.$element.hasClass('is-open')){
      if(this.$anchor.data('hover')) return;
      this.close();
    }else{
      this.open();
    }
  }

  /**
   * Destroys the dropdown.
   * @function
   */
  destroy() {
    this.$element.off('.zf.trigger').hide();
    this.$anchor.off('.zf.dropdown');

    Foundation.unregisterPlugin(this);
  }
}

Dropdown.defaults = {
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @example 250
   */
  hoverDelay: 250,
  /**
   * Allow submenus to open on hover events
   * @option
   * @example false
   */
  hover: false,
  /**
   * Don't close dropdown when hovering over dropdown pane
   * @option
   * @example true
   */
  hoverPane: false,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @example 1
   */
  vOffset: 1,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @example 1
   */
  hOffset: 1,
  /**
   * Class applied to adjust open position. JS will test and fill this in.
   * @option
   * @example 'top'
   */
  positionClass: '',
  /**
   * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
   * @option
   * @example false
   */
  trapFocus: false,
  /**
   * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
   * @option
   * @example true
   */
  autoFocus: false,
  /**
   * Allows a click on the body to close the dropdown.
   * @option
   * @example false
   */
  closeOnClick: false
}

// Window exports
Foundation.plugin(Dropdown, 'Dropdown');

}(jQuery);

/*!
 * skrollr core
 *
 * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr
 *
 * Free to use under terms of MIT license
 */
(function(window, document, undefined) {
	'use strict';

	/*
	 * Global api.
	 */
	var skrollr = {
		get: function() {
			return _instance;
		},
		//Main entry point.
		init: function(options) {
			return _instance || new Skrollr(options);
		},
		VERSION: '0.6.26'
	};

	//Minify optimization.
	var hasProp = Object.prototype.hasOwnProperty;
	var Math = window.Math;
	var getStyle = window.getComputedStyle;

	//They will be filled when skrollr gets initialized.
	var documentElement;
	var body;

	var EVENT_TOUCHSTART = 'touchstart';
	var EVENT_TOUCHMOVE = 'touchmove';
	var EVENT_TOUCHCANCEL = 'touchcancel';
	var EVENT_TOUCHEND = 'touchend';

	var SKROLLABLE_CLASS = 'skrollable';
	var SKROLLABLE_BEFORE_CLASS = SKROLLABLE_CLASS + '-before';
	var SKROLLABLE_BETWEEN_CLASS = SKROLLABLE_CLASS + '-between';
	var SKROLLABLE_AFTER_CLASS = SKROLLABLE_CLASS + '-after';

	var SKROLLR_CLASS = 'skrollr';
	var NO_SKROLLR_CLASS = 'no-' + SKROLLR_CLASS;
	var SKROLLR_DESKTOP_CLASS = SKROLLR_CLASS + '-desktop';
	var SKROLLR_MOBILE_CLASS = SKROLLR_CLASS + '-mobile';

	var DEFAULT_EASING = 'linear';
	var DEFAULT_DURATION = 1000;//ms
	var DEFAULT_MOBILE_DECELERATION = 0.004;//pixel/ms²

	var DEFAULT_SMOOTH_SCROLLING_DURATION = 200;//ms

	var ANCHOR_START = 'start';
	var ANCHOR_END = 'end';
	var ANCHOR_CENTER = 'center';
	var ANCHOR_BOTTOM = 'bottom';

	//The property which will be added to the DOM element to hold the ID of the skrollable.
	var SKROLLABLE_ID_DOM_PROPERTY = '___skrollable_id';

	var rxTouchIgnoreTags = /^(?:input|textarea|button|select)$/i;

	var rxTrim = /^\s+|\s+$/g;

	//Find all data-attributes. data-[_constant]-[offset]-[anchor]-[anchor].
	var rxKeyframeAttribute = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/;

	var rxPropValue = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi;

	//Easing function names follow the property in square brackets.
	var rxPropEasing = /^(@?[a-z\-]+)\[(\w+)\]$/;

	var rxCamelCase = /-([a-z0-9_])/g;
	var rxCamelCaseFn = function(str, letter) {
		return letter.toUpperCase();
	};

	//Numeric values with optional sign.
	var rxNumericValue = /[\-+]?[\d]*\.?[\d]+/g;

	//Used to replace occurences of {?} with a number.
	var rxInterpolateString = /\{\?\}/g;

	//Finds rgb(a) colors, which don't use the percentage notation.
	var rxRGBAIntegerColor = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g;

	//Finds all gradients.
	var rxGradient = /[a-z\-]+-gradient/g;

	//Vendor prefix. Will be set once skrollr gets initialized.
	var theCSSPrefix = '';
	var theDashedCSSPrefix = '';

	//Will be called once (when skrollr gets initialized).
	var detectCSSPrefix = function() {
		//Only relevant prefixes. May be extended.
		//Could be dangerous if there will ever be a CSS property which actually starts with "ms". Don't hope so.
		var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;

		//Detect prefix for current browser by finding the first property using a prefix.
		if(!getStyle) {
			return;
		}

		var style = getStyle(body, null);

		for(var k in style) {
			//We check the key and if the key is a number, we check the value as well, because safari's getComputedStyle returns some weird array-like thingy.
			theCSSPrefix = (k.match(rxPrefixes) || (+k == k && style[k].match(rxPrefixes)));

			if(theCSSPrefix) {
				break;
			}
		}

		//Did we even detect a prefix?
		if(!theCSSPrefix) {
			theCSSPrefix = theDashedCSSPrefix = '';

			return;
		}

		theCSSPrefix = theCSSPrefix[0];

		//We could have detected either a dashed prefix or this camelCaseish-inconsistent stuff.
		if(theCSSPrefix.slice(0,1) === '-') {
			theDashedCSSPrefix = theCSSPrefix;

			//There's no logic behind these. Need a look up.
			theCSSPrefix = ({
				'-webkit-': 'webkit',
				'-moz-': 'Moz',
				'-ms-': 'ms',
				'-o-': 'O'
			})[theCSSPrefix];
		} else {
			theDashedCSSPrefix = '-' + theCSSPrefix.toLowerCase() + '-';
		}
	};

	var polyfillRAF = function() {
		var requestAnimFrame = window.requestAnimationFrame || window[theCSSPrefix.toLowerCase() + 'RequestAnimationFrame'];

		var lastTime = _now();

		if(_isMobile || !requestAnimFrame) {
			requestAnimFrame = function(callback) {
				//How long did it take to render?
				var deltaTime = _now() - lastTime;
				var delay = Math.max(0, 1000 / 60 - deltaTime);

				return window.setTimeout(function() {
					lastTime = _now();
					callback();
				}, delay);
			};
		}

		return requestAnimFrame;
	};

	var polyfillCAF = function() {
		var cancelAnimFrame = window.cancelAnimationFrame || window[theCSSPrefix.toLowerCase() + 'CancelAnimationFrame'];

		if(_isMobile || !cancelAnimFrame) {
			cancelAnimFrame = function(timeout) {
				return window.clearTimeout(timeout);
			};
		}

		return cancelAnimFrame;
	};

	//Built-in easing functions.
	var easings = {
		begin: function() {
			return 0;
		},
		end: function() {
			return 1;
		},
		linear: function(p) {
			return p;
		},
		quadratic: function(p) {
			return p * p;
		},
		cubic: function(p) {
			return p * p * p;
		},
		swing: function(p) {
			return (-Math.cos(p * Math.PI) / 2) + 0.5;
		},
		sqrt: function(p) {
			return Math.sqrt(p);
		},
		outCubic: function(p) {
			return (Math.pow((p - 1), 3) + 1);
		},
		//see https://www.desmos.com/calculator/tbr20s8vd2 for how I did this
		bounce: function(p) {
			var a;

			if(p <= 0.5083) {
				a = 3;
			} else if(p <= 0.8489) {
				a = 9;
			} else if(p <= 0.96208) {
				a = 27;
			} else if(p <= 0.99981) {
				a = 91;
			} else {
				return 1;
			}

			return 1 - Math.abs(3 * Math.cos(p * a * 1.028) / a);
		}
	};

	/**
	 * Constructor.
	 */
	function Skrollr(options) {
		documentElement = document.documentElement;
		body = document.body;

		detectCSSPrefix();

		_instance = this;

		options = options || {};

		_constants = options.constants || {};

		//We allow defining custom easings or overwrite existing.
		if(options.easing) {
			for(var e in options.easing) {
				easings[e] = options.easing[e];
			}
		}

		_edgeStrategy = options.edgeStrategy || 'set';

		_listeners = {
			//Function to be called right before rendering.
			beforerender: options.beforerender,

			//Function to be called right after finishing rendering.
			render: options.render,

			//Function to be called whenever an element with the `data-emit-events` attribute passes a keyframe.
			keyframe: options.keyframe
		};

		//forceHeight is true by default
		_forceHeight = options.forceHeight !== false;

		if(_forceHeight) {
			_scale = options.scale || 1;
		}

		_mobileDeceleration = options.mobileDeceleration || DEFAULT_MOBILE_DECELERATION;

		_smoothScrollingEnabled = options.smoothScrolling !== false;
		_smoothScrollingDuration = options.smoothScrollingDuration || DEFAULT_SMOOTH_SCROLLING_DURATION;

		//Dummy object. Will be overwritten in the _render method when smooth scrolling is calculated.
		_smoothScrolling = {
			targetTop: _instance.getScrollTop()
		};

		//A custom check function may be passed.
		_isMobile = ((options.mobileCheck || function() {
			return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
		})());

		if(_isMobile) {
			_skrollrBody = document.getElementById('skrollr-body');

			//Detect 3d transform if there's a skrollr-body (only needed for #skrollr-body).
			if(_skrollrBody) {
				_detect3DTransforms();
			}

			_initMobile();
			_updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_MOBILE_CLASS], [NO_SKROLLR_CLASS]);
		} else {
			_updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS], [NO_SKROLLR_CLASS]);
		}

		//Triggers parsing of elements and a first reflow.
		_instance.refresh();

		_addEvent(window, 'resize orientationchange', function() {
			var width = documentElement.clientWidth;
			var height = documentElement.clientHeight;

			//Only reflow if the size actually changed (#271).
			if(height !== _lastViewportHeight || width !== _lastViewportWidth) {
				_lastViewportHeight = height;
				_lastViewportWidth = width;

				_requestReflow = true;
			}
		});

		var requestAnimFrame = polyfillRAF();

		//Let's go.
		(function animloop(){
			_render();
			_animFrame = requestAnimFrame(animloop);
		}());

		return _instance;
	}

	/**
	 * (Re)parses some or all elements.
	 */
	Skrollr.prototype.refresh = function(elements) {
		var elementIndex;
		var elementsLength;
		var ignoreID = false;

		//Completely reparse anything without argument.
		if(elements === undefined) {
			//Ignore that some elements may already have a skrollable ID.
			ignoreID = true;

			_skrollables = [];
			_skrollableIdCounter = 0;

			elements = document.getElementsByTagName('*');
		} else if(elements.length === undefined) {
			//We also accept a single element as parameter.
			elements = [elements];
		}

		elementIndex = 0;
		elementsLength = elements.length;

		for(; elementIndex < elementsLength; elementIndex++) {
			var el = elements[elementIndex];
			var anchorTarget = el;
			var keyFrames = [];

			//If this particular element should be smooth scrolled.
			var smoothScrollThis = _smoothScrollingEnabled;

			//The edge strategy for this particular element.
			var edgeStrategy = _edgeStrategy;

			//If this particular element should emit keyframe events.
			var emitEvents = false;

			//If we're reseting the counter, remove any old element ids that may be hanging around.
			if(ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
				delete el[SKROLLABLE_ID_DOM_PROPERTY];
			}

			if(!el.attributes) {
				continue;
			}

			//Iterate over all attributes and search for key frame attributes.
			var attributeIndex = 0;
			var attributesLength = el.attributes.length;

			for (; attributeIndex < attributesLength; attributeIndex++) {
				var attr = el.attributes[attributeIndex];

				if(attr.name === 'data-anchor-target') {
					anchorTarget = document.querySelector(attr.value);

					if(anchorTarget === null) {
						throw 'Unable to find anchor target "' + attr.value + '"';
					}

					continue;
				}

				//Global smooth scrolling can be overridden by the element attribute.
				if(attr.name === 'data-smooth-scrolling') {
					smoothScrollThis = attr.value !== 'off';

					continue;
				}

				//Global edge strategy can be overridden by the element attribute.
				if(attr.name === 'data-edge-strategy') {
					edgeStrategy = attr.value;

					continue;
				}

				//Is this element tagged with the `data-emit-events` attribute?
				if(attr.name === 'data-emit-events') {
					emitEvents = true;

					continue;
				}

				var match = attr.name.match(rxKeyframeAttribute);

				if(match === null) {
					continue;
				}

				var kf = {
					props: attr.value,
					//Point back to the element as well.
					element: el,
					//The name of the event which this keyframe will fire, if emitEvents is
					eventType: attr.name.replace(rxCamelCase, rxCamelCaseFn)
				};

				keyFrames.push(kf);

				var constant = match[1];

				if(constant) {
					//Strip the underscore prefix.
					kf.constant = constant.substr(1);
				}

				//Get the key frame offset.
				var offset = match[2];

				//Is it a percentage offset?
				if(/p$/.test(offset)) {
					kf.isPercentage = true;
					kf.offset = (offset.slice(0, -1) | 0) / 100;
				} else {
					kf.offset = (offset | 0);
				}

				var anchor1 = match[3];

				//If second anchor is not set, the first will be taken for both.
				var anchor2 = match[4] || anchor1;

				//"absolute" (or "classic") mode, where numbers mean absolute scroll offset.
				if(!anchor1 || anchor1 === ANCHOR_START || anchor1 === ANCHOR_END) {
					kf.mode = 'absolute';

					//data-end needs to be calculated after all key frames are known.
					if(anchor1 === ANCHOR_END) {
						kf.isEnd = true;
					} else if(!kf.isPercentage) {
						//For data-start we can already set the key frame w/o calculations.
						//#59: "scale" options should only affect absolute mode.
						kf.offset = kf.offset * _scale;
					}
				}
				//"relative" mode, where numbers are relative to anchors.
				else {
					kf.mode = 'relative';
					kf.anchors = [anchor1, anchor2];
				}
			}

			//Does this element have key frames?
			if(!keyFrames.length) {
				continue;
			}

			//Will hold the original style and class attributes before we controlled the element (see #80).
			var styleAttr, classAttr;

			var id;

			if(!ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
				//We already have this element under control. Grab the corresponding skrollable id.
				id = el[SKROLLABLE_ID_DOM_PROPERTY];
				styleAttr = _skrollables[id].styleAttr;
				classAttr = _skrollables[id].classAttr;
			} else {
				//It's an unknown element. Asign it a new skrollable id.
				id = (el[SKROLLABLE_ID_DOM_PROPERTY] = _skrollableIdCounter++);
				styleAttr = el.style.cssText;
				classAttr = _getClass(el);
			}

			_skrollables[id] = {
				element: el,
				styleAttr: styleAttr,
				classAttr: classAttr,
				anchorTarget: anchorTarget,
				keyFrames: keyFrames,
				smoothScrolling: smoothScrollThis,
				edgeStrategy: edgeStrategy,
				emitEvents: emitEvents,
				lastFrameIndex: -1
			};

			_updateClass(el, [SKROLLABLE_CLASS], []);
		}

		//Reflow for the first time.
		_reflow();

		//Now that we got all key frame numbers right, actually parse the properties.
		elementIndex = 0;
		elementsLength = elements.length;

		for(; elementIndex < elementsLength; elementIndex++) {
			var sk = _skrollables[elements[elementIndex][SKROLLABLE_ID_DOM_PROPERTY]];

			if(sk === undefined) {
				continue;
			}

			//Parse the property string to objects
			_parseProps(sk);

			//Fill key frames with missing properties from left and right
			_fillProps(sk);
		}

		return _instance;
	};

	/**
	 * Transform "relative" mode to "absolute" mode.
	 * That is, calculate anchor position and offset of element.
	 */
	Skrollr.prototype.relativeToAbsolute = function(element, viewportAnchor, elementAnchor) {
		var viewportHeight = documentElement.clientHeight;
		var box = element.getBoundingClientRect();
		var absolute = box.top;

		//#100: IE doesn't supply "height" with getBoundingClientRect.
		var boxHeight = box.bottom - box.top;

		if(viewportAnchor === ANCHOR_BOTTOM) {
			absolute -= viewportHeight;
		} else if(viewportAnchor === ANCHOR_CENTER) {
			absolute -= viewportHeight / 2;
		}

		if(elementAnchor === ANCHOR_BOTTOM) {
			absolute += boxHeight;
		} else if(elementAnchor === ANCHOR_CENTER) {
			absolute += boxHeight / 2;
		}

		//Compensate scrolling since getBoundingClientRect is relative to viewport.
		absolute += _instance.getScrollTop();

		return (absolute + 0.5) | 0;
	};

	/**
	 * Animates scroll top to new position.
	 */
	Skrollr.prototype.animateTo = function(top, options) {
		options = options || {};

		var now = _now();
		var scrollTop = _instance.getScrollTop();

		//Setting this to a new value will automatically cause the current animation to stop, if any.
		_scrollAnimation = {
			startTop: scrollTop,
			topDiff: top - scrollTop,
			targetTop: top,
			duration: options.duration || DEFAULT_DURATION,
			startTime: now,
			endTime: now + (options.duration || DEFAULT_DURATION),
			easing: easings[options.easing || DEFAULT_EASING],
			done: options.done
		};

		//Don't queue the animation if there's nothing to animate.
		if(!_scrollAnimation.topDiff) {
			if(_scrollAnimation.done) {
				_scrollAnimation.done.call(_instance, false);
			}

			_scrollAnimation = undefined;
		}

		return _instance;
	};

	/**
	 * Stops animateTo animation.
	 */
	Skrollr.prototype.stopAnimateTo = function() {
		if(_scrollAnimation && _scrollAnimation.done) {
			_scrollAnimation.done.call(_instance, true);
		}

		_scrollAnimation = undefined;
	};

	/**
	 * Returns if an animation caused by animateTo is currently running.
	 */
	Skrollr.prototype.isAnimatingTo = function() {
		return !!_scrollAnimation;
	};

	Skrollr.prototype.isMobile = function() {
		return _isMobile;
	};

	Skrollr.prototype.setScrollTop = function(top, force) {
		_forceRender = (force === true);

		if(_isMobile) {
			_mobileOffset = Math.min(Math.max(top, 0), _maxKeyFrame);
		} else {
			window.scrollTo(0, top);
		}

		return _instance;
	};

	Skrollr.prototype.getScrollTop = function() {
		if(_isMobile) {
			return _mobileOffset;
		} else {
			return window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0;
		}
	};

	Skrollr.prototype.getMaxScrollTop = function() {
		return _maxKeyFrame;
	};

	Skrollr.prototype.on = function(name, fn) {
		_listeners[name] = fn;

		return _instance;
	};

	Skrollr.prototype.off = function(name) {
		delete _listeners[name];

		return _instance;
	};

	Skrollr.prototype.destroy = function() {
		var cancelAnimFrame = polyfillCAF();
		cancelAnimFrame(_animFrame);
		_removeAllEvents();

		_updateClass(documentElement, [NO_SKROLLR_CLASS], [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS, SKROLLR_MOBILE_CLASS]);

		var skrollableIndex = 0;
		var skrollablesLength = _skrollables.length;

		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {
			_reset(_skrollables[skrollableIndex].element);
		}

		documentElement.style.overflow = body.style.overflow = '';
		documentElement.style.height = body.style.height = '';

		if(_skrollrBody) {
			skrollr.setStyle(_skrollrBody, 'transform', 'none');
		}

		_instance = undefined;
		_skrollrBody = undefined;
		_listeners = undefined;
		_forceHeight = undefined;
		_maxKeyFrame = 0;
		_scale = 1;
		_constants = undefined;
		_mobileDeceleration = undefined;
		_direction = 'down';
		_lastTop = -1;
		_lastViewportWidth = 0;
		_lastViewportHeight = 0;
		_requestReflow = false;
		_scrollAnimation = undefined;
		_smoothScrollingEnabled = undefined;
		_smoothScrollingDuration = undefined;
		_smoothScrolling = undefined;
		_forceRender = undefined;
		_skrollableIdCounter = 0;
		_edgeStrategy = undefined;
		_isMobile = false;
		_mobileOffset = 0;
		_translateZ = undefined;
	};

	/*
		Private methods.
	*/

	var _initMobile = function() {
		var initialElement;
		var initialTouchY;
		var initialTouchX;
		var currentElement;
		var currentTouchY;
		var currentTouchX;
		var lastTouchY;
		var deltaY;

		var initialTouchTime;
		var currentTouchTime;
		var lastTouchTime;
		var deltaTime;

		_addEvent(documentElement, [EVENT_TOUCHSTART, EVENT_TOUCHMOVE, EVENT_TOUCHCANCEL, EVENT_TOUCHEND].join(' '), function(e) {
			var touch = e.changedTouches[0];

			currentElement = e.target;

			//We don't want text nodes.
			while(currentElement.nodeType === 3) {
				currentElement = currentElement.parentNode;
			}

			currentTouchY = touch.clientY;
			currentTouchX = touch.clientX;
			currentTouchTime = e.timeStamp;

			if(!rxTouchIgnoreTags.test(currentElement.tagName)) {
				e.preventDefault();
			}

			switch(e.type) {
				case EVENT_TOUCHSTART:
					//The last element we tapped on.
					if(initialElement) {
						initialElement.blur();
					}

					_instance.stopAnimateTo();

					initialElement = currentElement;

					initialTouchY = lastTouchY = currentTouchY;
					initialTouchX = currentTouchX;
					initialTouchTime = currentTouchTime;

					break;
				case EVENT_TOUCHMOVE:
					//Prevent default event on touchIgnore elements in case they don't have focus yet.
					if(rxTouchIgnoreTags.test(currentElement.tagName) && document.activeElement !== currentElement) {
						e.preventDefault();
					}

					deltaY = currentTouchY - lastTouchY;
					deltaTime = currentTouchTime - lastTouchTime;

					_instance.setScrollTop(_mobileOffset - deltaY, true);

					lastTouchY = currentTouchY;
					lastTouchTime = currentTouchTime;
					break;
				default:
				case EVENT_TOUCHCANCEL:
				case EVENT_TOUCHEND:
					var distanceY = initialTouchY - currentTouchY;
					var distanceX = initialTouchX - currentTouchX;
					var distance2 = distanceX * distanceX + distanceY * distanceY;

					//Check if it was more like a tap (moved less than 7px).
					if(distance2 < 49) {
						if(!rxTouchIgnoreTags.test(initialElement.tagName)) {
							initialElement.focus();

							//It was a tap, click the element.
							var clickEvent = document.createEvent('MouseEvents');
							clickEvent.initMouseEvent('click', true, true, e.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
							initialElement.dispatchEvent(clickEvent);
						}

						return;
					}

					initialElement = undefined;

					var speed = deltaY / deltaTime;

					//Cap speed at 3 pixel/ms.
					speed = Math.max(Math.min(speed, 3), -3);

					var duration = Math.abs(speed / _mobileDeceleration);
					var targetOffset = speed * duration + 0.5 * _mobileDeceleration * duration * duration;
					var targetTop = _instance.getScrollTop() - targetOffset;

					//Relative duration change for when scrolling above bounds.
					var targetRatio = 0;

					//Change duration proportionally when scrolling would leave bounds.
					if(targetTop > _maxKeyFrame) {
						targetRatio = (_maxKeyFrame - targetTop) / targetOffset;

						targetTop = _maxKeyFrame;
					} else if(targetTop < 0) {
						targetRatio = -targetTop / targetOffset;

						targetTop = 0;
					}

					duration = duration * (1 - targetRatio);

					_instance.animateTo((targetTop + 0.5) | 0, {easing: 'outCubic', duration: duration});
					break;
			}
		});

		//Just in case there has already been some native scrolling, reset it.
		window.scrollTo(0, 0);
		documentElement.style.overflow = body.style.overflow = 'hidden';
	};

	/**
	 * Updates key frames which depend on others / need to be updated on resize.
	 * That is "end" in "absolute" mode and all key frames in "relative" mode.
	 * Also handles constants, because they may change on resize.
	 */
	var _updateDependentKeyFrames = function() {
		var viewportHeight = documentElement.clientHeight;
		var processedConstants = _processConstants();
		var skrollable;
		var element;
		var anchorTarget;
		var keyFrames;
		var keyFrameIndex;
		var keyFramesLength;
		var kf;
		var skrollableIndex;
		var skrollablesLength;
		var offset;
		var constantValue;

		//First process all relative-mode elements and find the max key frame.
		skrollableIndex = 0;
		skrollablesLength = _skrollables.length;

		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {
			skrollable = _skrollables[skrollableIndex];
			element = skrollable.element;
			anchorTarget = skrollable.anchorTarget;
			keyFrames = skrollable.keyFrames;

			keyFrameIndex = 0;
			keyFramesLength = keyFrames.length;

			for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
				kf = keyFrames[keyFrameIndex];

				offset = kf.offset;
				constantValue = processedConstants[kf.constant] || 0;

				kf.frame = offset;

				if(kf.isPercentage) {
					//Convert the offset to percentage of the viewport height.
					offset = offset * viewportHeight;

					//Absolute + percentage mode.
					kf.frame = offset;
				}

				if(kf.mode === 'relative') {
					_reset(element);

					kf.frame = _instance.relativeToAbsolute(anchorTarget, kf.anchors[0], kf.anchors[1]) - offset;

					_reset(element, true);
				}

				kf.frame += constantValue;

				//Only search for max key frame when forceHeight is enabled.
				if(_forceHeight) {
					//Find the max key frame, but don't use one of the data-end ones for comparison.
					if(!kf.isEnd && kf.frame > _maxKeyFrame) {
						_maxKeyFrame = kf.frame;
					}
				}
			}
		}

		//#133: The document can be larger than the maxKeyFrame we found.
		_maxKeyFrame = Math.max(_maxKeyFrame, _getDocumentHeight());

		//Now process all data-end keyframes.
		skrollableIndex = 0;
		skrollablesLength = _skrollables.length;

		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {
			skrollable = _skrollables[skrollableIndex];
			keyFrames = skrollable.keyFrames;

			keyFrameIndex = 0;
			keyFramesLength = keyFrames.length;

			for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
				kf = keyFrames[keyFrameIndex];

				constantValue = processedConstants[kf.constant] || 0;

				if(kf.isEnd) {
					kf.frame = _maxKeyFrame - kf.offset + constantValue;
				}
			}

			skrollable.keyFrames.sort(_keyFrameComparator);
		}
	};

	/**
	 * Calculates and sets the style properties for the element at the given frame.
	 * @param fakeFrame The frame to render at when smooth scrolling is enabled.
	 * @param actualFrame The actual frame we are at.
	 */
	var _calcSteps = function(fakeFrame, actualFrame) {
		//Iterate over all skrollables.
		var skrollableIndex = 0;
		var skrollablesLength = _skrollables.length;

		for(; skrollableIndex < skrollablesLength; skrollableIndex++) {
			var skrollable = _skrollables[skrollableIndex];
			var element = skrollable.element;
			var frame = skrollable.smoothScrolling ? fakeFrame : actualFrame;
			var frames = skrollable.keyFrames;
			var framesLength = frames.length;
			var firstFrame = frames[0];
			var lastFrame = frames[frames.length - 1];
			var beforeFirst = frame < firstFrame.frame;
			var afterLast = frame > lastFrame.frame;
			var firstOrLastFrame = beforeFirst ? firstFrame : lastFrame;
			var emitEvents = skrollable.emitEvents;
			var lastFrameIndex = skrollable.lastFrameIndex;
			var key;
			var value;

			//If we are before/after the first/last frame, set the styles according to the given edge strategy.
			if(beforeFirst || afterLast) {
				//Check if we already handled this edge case last time.
				//Note: using setScrollTop it's possible that we jumped from one edge to the other.
				if(beforeFirst && skrollable.edge === -1 || afterLast && skrollable.edge === 1) {
					continue;
				}

				//Add the skrollr-before or -after class.
				if(beforeFirst) {
					_updateClass(element, [SKROLLABLE_BEFORE_CLASS], [SKROLLABLE_AFTER_CLASS, SKROLLABLE_BETWEEN_CLASS]);

					//This handles the special case where we exit the first keyframe.
					if(emitEvents && lastFrameIndex > -1) {
						_emitEvent(element, firstFrame.eventType, _direction);
						skrollable.lastFrameIndex = -1;
					}
				} else {
					_updateClass(element, [SKROLLABLE_AFTER_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_BETWEEN_CLASS]);

					//This handles the special case where we exit the last keyframe.
					if(emitEvents && lastFrameIndex < framesLength) {
						_emitEvent(element, lastFrame.eventType, _direction);
						skrollable.lastFrameIndex = framesLength;
					}
				}

				//Remember that we handled the edge case (before/after the first/last keyframe).
				skrollable.edge = beforeFirst ? -1 : 1;

				switch(skrollable.edgeStrategy) {
					case 'reset':
						_reset(element);
						continue;
					case 'ease':
						//Handle this case like it would be exactly at first/last keyframe and just pass it on.
						frame = firstOrLastFrame.frame;
						break;
					default:
					case 'set':
						var props = firstOrLastFrame.props;

						for(key in props) {
							if(hasProp.call(props, key)) {
								value = _interpolateString(props[key].value);

								//Set style or attribute.
								if(key.indexOf('@') === 0) {
									element.setAttribute(key.substr(1), value);
								} else {
									skrollr.setStyle(element, key, value);
								}
							}
						}

						continue;
				}
			} else {
				//Did we handle an edge last time?
				if(skrollable.edge !== 0) {
					_updateClass(element, [SKROLLABLE_CLASS, SKROLLABLE_BETWEEN_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_AFTER_CLASS]);
					skrollable.edge = 0;
				}
			}

			//Find out between which two key frames we are right now.
			var keyFrameIndex = 0;

			for(; keyFrameIndex < framesLength - 1; keyFrameIndex++) {
				if(frame >= frames[keyFrameIndex].frame && frame <= frames[keyFrameIndex + 1].frame) {
					var left = frames[keyFrameIndex];
					var right = frames[keyFrameIndex + 1];

					for(key in left.props) {
						if(hasProp.call(left.props, key)) {
							var progress = (frame - left.frame) / (right.frame - left.frame);

							//Transform the current progress using the given easing function.
							progress = left.props[key].easing(progress);

							//Interpolate between the two values
							value = _calcInterpolation(left.props[key].value, right.props[key].value, progress);

							value = _interpolateString(value);

							//Set style or attribute.
							if(key.indexOf('@') === 0) {
								element.setAttribute(key.substr(1), value);
							} else {
								skrollr.setStyle(element, key, value);
							}
						}
					}

					//Are events enabled on this element?
					//This code handles the usual cases of scrolling through different keyframes.
					//The special cases of before first and after last keyframe are handled above.
					if(emitEvents) {
						//Did we pass a new keyframe?
						if(lastFrameIndex !== keyFrameIndex) {
							if(_direction === 'down') {
								_emitEvent(element, left.eventType, _direction);
							} else {
								_emitEvent(element, right.eventType, _direction);
							}

							skrollable.lastFrameIndex = keyFrameIndex;
						}
					}

					break;
				}
			}
		}
	};

	/**
	 * Renders all elements.
	 */
	var _render = function() {
		if(_requestReflow) {
			_requestReflow = false;
			_reflow();
		}

		//We may render something else than the actual scrollbar position.
		var renderTop = _instance.getScrollTop();

		//If there's an animation, which ends in current render call, call the callback after rendering.
		var afterAnimationCallback;
		var now = _now();
		var progress;

		//Before actually rendering handle the scroll animation, if any.
		if(_scrollAnimation) {
			//It's over
			if(now >= _scrollAnimation.endTime) {
				renderTop = _scrollAnimation.targetTop;
				afterAnimationCallback = _scrollAnimation.done;
				_scrollAnimation = undefined;
			} else {
				//Map the current progress to the new progress using given easing function.
				progress = _scrollAnimation.easing((now - _scrollAnimation.startTime) / _scrollAnimation.duration);

				renderTop = (_scrollAnimation.startTop + progress * _scrollAnimation.topDiff) | 0;
			}

			_instance.setScrollTop(renderTop, true);
		}
		//Smooth scrolling only if there's no animation running and if we're not forcing the rendering.
		else if(!_forceRender) {
			var smoothScrollingDiff = _smoothScrolling.targetTop - renderTop;

			//The user scrolled, start new smooth scrolling.
			if(smoothScrollingDiff) {
				_smoothScrolling = {
					startTop: _lastTop,
					topDiff: renderTop - _lastTop,
					targetTop: renderTop,
					startTime: _lastRenderCall,
					endTime: _lastRenderCall + _smoothScrollingDuration
				};
			}

			//Interpolate the internal scroll position (not the actual scrollbar).
			if(now <= _smoothScrolling.endTime) {
				//Map the current progress to the new progress using easing function.
				progress = easings.sqrt((now - _smoothScrolling.startTime) / _smoothScrollingDuration);

				renderTop = (_smoothScrolling.startTop + progress * _smoothScrolling.topDiff) | 0;
			}
		}

		//That's were we actually "scroll" on mobile.
		if(_isMobile && _skrollrBody) {
			//Set the transform ("scroll it").
			skrollr.setStyle(_skrollrBody, 'transform', 'translate(0, ' + -(_mobileOffset) + 'px) ' + _translateZ);
		}

		//Did the scroll position even change?
		if(_forceRender || _lastTop !== renderTop) {
			//Remember in which direction are we scrolling?
			_direction = (renderTop > _lastTop) ? 'down' : (renderTop < _lastTop ? 'up' : _direction);

			_forceRender = false;

			var listenerParams = {
				curTop: renderTop,
				lastTop: _lastTop,
				maxTop: _maxKeyFrame,
				direction: _direction
			};

			//Tell the listener we are about to render.
			var continueRendering = _listeners.beforerender && _listeners.beforerender.call(_instance, listenerParams);

			//The beforerender listener function is able the cancel rendering.
			if(continueRendering !== false) {
				//Now actually interpolate all the styles.
				_calcSteps(renderTop, _instance.getScrollTop());

				//Remember when we last rendered.
				_lastTop = renderTop;

				if(_listeners.render) {
					_listeners.render.call(_instance, listenerParams);
				}
			}

			if(afterAnimationCallback) {
				afterAnimationCallback.call(_instance, false);
			}
		}

		_lastRenderCall = now;
	};

	/**
	 * Parses the properties for each key frame of the given skrollable.
	 */
	var _parseProps = function(skrollable) {
		//Iterate over all key frames
		var keyFrameIndex = 0;
		var keyFramesLength = skrollable.keyFrames.length;

		for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
			var frame = skrollable.keyFrames[keyFrameIndex];
			var easing;
			var value;
			var prop;
			var props = {};

			var match;

			while((match = rxPropValue.exec(frame.props)) !== null) {
				prop = match[1];
				value = match[2];

				easing = prop.match(rxPropEasing);

				//Is there an easing specified for this prop?
				if(easing !== null) {
					prop = easing[1];
					easing = easing[2];
				} else {
					easing = DEFAULT_EASING;
				}

				//Exclamation point at first position forces the value to be taken literal.
				value = value.indexOf('!') ? _parseProp(value) : [value.slice(1)];

				//Save the prop for this key frame with his value and easing function
				props[prop] = {
					value: value,
					easing: easings[easing]
				};
			}

			frame.props = props;
		}
	};

	/**
	 * Parses a value extracting numeric values and generating a format string
	 * for later interpolation of the new values in old string.
	 *
	 * @param val The CSS value to be parsed.
	 * @return Something like ["rgba(?%,?%, ?%,?)", 100, 50, 0, .7]
	 * where the first element is the format string later used
	 * and all following elements are the numeric value.
	 */
	var _parseProp = function(val) {
		var numbers = [];

		//One special case, where floats don't work.
		//We replace all occurences of rgba colors
		//which don't use percentage notation with the percentage notation.
		rxRGBAIntegerColor.lastIndex = 0;
		val = val.replace(rxRGBAIntegerColor, function(rgba) {
			return rgba.replace(rxNumericValue, function(n) {
				return n / 255 * 100 + '%';
			});
		});

		//Handle prefixing of "gradient" values.
		//For now only the prefixed value will be set. Unprefixed isn't supported anyway.
		if(theDashedCSSPrefix) {
			rxGradient.lastIndex = 0;
			val = val.replace(rxGradient, function(s) {
				return theDashedCSSPrefix + s;
			});
		}

		//Now parse ANY number inside this string and create a format string.
		val = val.replace(rxNumericValue, function(n) {
			numbers.push(+n);
			return '{?}';
		});

		//Add the formatstring as first value.
		numbers.unshift(val);

		return numbers;
	};

	/**
	 * Fills the key frames with missing left and right hand properties.
	 * If key frame 1 has property X and key frame 2 is missing X,
	 * but key frame 3 has X again, then we need to assign X to key frame 2 too.
	 *
	 * @param sk A skrollable.
	 */
	var _fillProps = function(sk) {
		//Will collect the properties key frame by key frame
		var propList = {};
		var keyFrameIndex;
		var keyFramesLength;

		//Iterate over all key frames from left to right
		keyFrameIndex = 0;
		keyFramesLength = sk.keyFrames.length;

		for(; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
			_fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);
		}

		//Now do the same from right to fill the last gaps

		propList = {};

		//Iterate over all key frames from right to left
		keyFrameIndex = sk.keyFrames.length - 1;

		for(; keyFrameIndex >= 0; keyFrameIndex--) {
			_fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);
		}
	};

	var _fillPropForFrame = function(frame, propList) {
		var key;

		//For each key frame iterate over all right hand properties and assign them,
		//but only if the current key frame doesn't have the property by itself
		for(key in propList) {
			//The current frame misses this property, so assign it.
			if(!hasProp.call(frame.props, key)) {
				frame.props[key] = propList[key];
			}
		}

		//Iterate over all props of the current frame and collect them
		for(key in frame.props) {
			propList[key] = frame.props[key];
		}
	};

	/**
	 * Calculates the new values for two given values array.
	 */
	var _calcInterpolation = function(val1, val2, progress) {
		var valueIndex;
		var val1Length = val1.length;

		//They both need to have the same length
		if(val1Length !== val2.length) {
			throw 'Can\'t interpolate between "' + val1[0] + '" and "' + val2[0] + '"';
		}

		//Add the format string as first element.
		var interpolated = [val1[0]];

		valueIndex = 1;

		for(; valueIndex < val1Length; valueIndex++) {
			//That's the line where the two numbers are actually interpolated.
			interpolated[valueIndex] = val1[valueIndex] + ((val2[valueIndex] - val1[valueIndex]) * progress);
		}

		return interpolated;
	};

	/**
	 * Interpolates the numeric values into the format string.
	 */
	var _interpolateString = function(val) {
		var valueIndex = 1;

		rxInterpolateString.lastIndex = 0;

		return val[0].replace(rxInterpolateString, function() {
			return val[valueIndex++];
		});
	};

	/**
	 * Resets the class and style attribute to what it was before skrollr manipulated the element.
	 * Also remembers the values it had before reseting, in order to undo the reset.
	 */
	var _reset = function(elements, undo) {
		//We accept a single element or an array of elements.
		elements = [].concat(elements);

		var skrollable;
		var element;
		var elementsIndex = 0;
		var elementsLength = elements.length;

		for(; elementsIndex < elementsLength; elementsIndex++) {
			element = elements[elementsIndex];
			skrollable = _skrollables[element[SKROLLABLE_ID_DOM_PROPERTY]];

			//Couldn't find the skrollable for this DOM element.
			if(!skrollable) {
				continue;
			}

			if(undo) {
				//Reset class and style to the "dirty" (set by skrollr) values.
				element.style.cssText = skrollable.dirtyStyleAttr;
				_updateClass(element, skrollable.dirtyClassAttr);
			} else {
				//Remember the "dirty" (set by skrollr) class and style.
				skrollable.dirtyStyleAttr = element.style.cssText;
				skrollable.dirtyClassAttr = _getClass(element);

				//Reset class and style to what it originally was.
				element.style.cssText = skrollable.styleAttr;
				_updateClass(element, skrollable.classAttr);
			}
		}
	};

	/**
	 * Detects support for 3d transforms by applying it to the skrollr-body.
	 */
	var _detect3DTransforms = function() {
		_translateZ = 'translateZ(0)';
		skrollr.setStyle(_skrollrBody, 'transform', _translateZ);

		var computedStyle = getStyle(_skrollrBody);
		var computedTransform = computedStyle.getPropertyValue('transform');
		var computedTransformWithPrefix = computedStyle.getPropertyValue(theDashedCSSPrefix + 'transform');
		var has3D = (computedTransform && computedTransform !== 'none') || (computedTransformWithPrefix && computedTransformWithPrefix !== 'none');

		if(!has3D) {
			_translateZ = '';
		}
	};

	/**
	 * Set the CSS property on the given element. Sets prefixed properties as well.
	 */
	skrollr.setStyle = function(el, prop, val) {
		var style = el.style;

		//Camel case.
		prop = prop.replace(rxCamelCase, rxCamelCaseFn).replace('-', '');

		//Make sure z-index gets a <integer>.
		//This is the only <integer> case we need to handle.
		if(prop === 'zIndex') {
			if(isNaN(val)) {
				//If it's not a number, don't touch it.
				//It could for example be "auto" (#351).
				style[prop] = val;
			} else {
				//Floor the number.
				style[prop] = '' + (val | 0);
			}
		}
		//#64: "float" can't be set across browsers. Needs to use "cssFloat" for all except IE.
		else if(prop === 'float') {
			style.styleFloat = style.cssFloat = val;
		}
		else {
			//Need try-catch for old IE.
			try {
				//Set prefixed property if there's a prefix.
				if(theCSSPrefix) {
					style[theCSSPrefix + prop.slice(0,1).toUpperCase() + prop.slice(1)] = val;
				}

				//Set unprefixed.
				style[prop] = val;
			} catch(ignore) {}
		}
	};

	/**
	 * Cross browser event handling.
	 */
	var _addEvent = skrollr.addEvent = function(element, names, callback) {
		var intermediate = function(e) {
			//Normalize IE event stuff.
			e = e || window.event;

			if(!e.target) {
				e.target = e.srcElement;
			}

			if(!e.preventDefault) {
				e.preventDefault = function() {
					e.returnValue = false;
					e.defaultPrevented = true;
				};
			}

			return callback.call(this, e);
		};

		names = names.split(' ');

		var name;
		var nameCounter = 0;
		var namesLength = names.length;

		for(; nameCounter < namesLength; nameCounter++) {
			name = names[nameCounter];

			if(element.addEventListener) {
				element.addEventListener(name, callback, false);
			} else {
				element.attachEvent('on' + name, intermediate);
			}

			//Remember the events to be able to flush them later.
			_registeredEvents.push({
				element: element,
				name: name,
				listener: callback
			});
		}
	};

	var _removeEvent = skrollr.removeEvent = function(element, names, callback) {
		names = names.split(' ');

		var nameCounter = 0;
		var namesLength = names.length;

		for(; nameCounter < namesLength; nameCounter++) {
			if(element.removeEventListener) {
				element.removeEventListener(names[nameCounter], callback, false);
			} else {
				element.detachEvent('on' + names[nameCounter], callback);
			}
		}
	};

	var _removeAllEvents = function() {
		var eventData;
		var eventCounter = 0;
		var eventsLength = _registeredEvents.length;

		for(; eventCounter < eventsLength; eventCounter++) {
			eventData = _registeredEvents[eventCounter];

			_removeEvent(eventData.element, eventData.name, eventData.listener);
		}

		_registeredEvents = [];
	};

	var _emitEvent = function(element, name, direction) {
		if(_listeners.keyframe) {
			_listeners.keyframe.call(_instance, element, name, direction);
		}
	};

	var _reflow = function() {
		var pos = _instance.getScrollTop();

		//Will be recalculated by _updateDependentKeyFrames.
		_maxKeyFrame = 0;

		if(_forceHeight && !_isMobile) {
			//un-"force" the height to not mess with the calculations in _updateDependentKeyFrames (#216).
			body.style.height = '';
		}

		_updateDependentKeyFrames();

		if(_forceHeight && !_isMobile) {
			//"force" the height.
			body.style.height = (_maxKeyFrame + documentElement.clientHeight) + 'px';
		}

		//The scroll offset may now be larger than needed (on desktop the browser/os prevents scrolling farther than the bottom).
		if(_isMobile) {
			_instance.setScrollTop(Math.min(_instance.getScrollTop(), _maxKeyFrame));
		} else {
			//Remember and reset the scroll pos (#217).
			_instance.setScrollTop(pos, true);
		}

		_forceRender = true;
	};

	/*
	 * Returns a copy of the constants object where all functions and strings have been evaluated.
	 */
	var _processConstants = function() {
		var viewportHeight = documentElement.clientHeight;
		var copy = {};
		var prop;
		var value;

		for(prop in _constants) {
			value = _constants[prop];

			if(typeof value === 'function') {
				value = value.call(_instance);
			}
			//Percentage offset.
			else if((/p$/).test(value)) {
				value = (value.slice(0, -1) / 100) * viewportHeight;
			}

			copy[prop] = value;
		}

		return copy;
	};

	/*
	 * Returns the height of the document.
	 */
	var _getDocumentHeight = function() {
		var skrollrBodyHeight = (_skrollrBody && _skrollrBody.offsetHeight || 0);
		var bodyHeight = Math.max(skrollrBodyHeight, body.scrollHeight, body.offsetHeight, documentElement.scrollHeight, documentElement.offsetHeight, documentElement.clientHeight);

		return bodyHeight - documentElement.clientHeight;
	};

	/**
	 * Returns a string of space separated classnames for the current element.
	 * Works with SVG as well.
	 */
	var _getClass = function(element) {
		var prop = 'className';

		//SVG support by using className.baseVal instead of just className.
		if(window.SVGElement && element instanceof window.SVGElement) {
			element = element[prop];
			prop = 'baseVal';
		}

		return element[prop];
	};

	/**
	 * Adds and removes a CSS classes.
	 * Works with SVG as well.
	 * add and remove are arrays of strings,
	 * or if remove is ommited add is a string and overwrites all classes.
	 */
	var _updateClass = function(element, add, remove) {
		var prop = 'className';

		//SVG support by using className.baseVal instead of just className.
		if(window.SVGElement && element instanceof window.SVGElement) {
			element = element[prop];
			prop = 'baseVal';
		}

		//When remove is ommited, we want to overwrite/set the classes.
		if(remove === undefined) {
			element[prop] = add;
			return;
		}

		//Cache current classes. We will work on a string before passing back to DOM.
		var val = element[prop];

		//All classes to be removed.
		var classRemoveIndex = 0;
		var removeLength = remove.length;

		for(; classRemoveIndex < removeLength; classRemoveIndex++) {
			val = _untrim(val).replace(_untrim(remove[classRemoveIndex]), ' ');
		}

		val = _trim(val);

		//All classes to be added.
		var classAddIndex = 0;
		var addLength = add.length;

		for(; classAddIndex < addLength; classAddIndex++) {
			//Only add if el not already has class.
			if(_untrim(val).indexOf(_untrim(add[classAddIndex])) === -1) {
				val += ' ' + add[classAddIndex];
			}
		}

		element[prop] = _trim(val);
	};

	var _trim = function(a) {
		return a.replace(rxTrim, '');
	};

	/**
	 * Adds a space before and after the string.
	 */
	var _untrim = function(a) {
		return ' ' + a + ' ';
	};

	var _now = Date.now || function() {
		return +new Date();
	};

	var _keyFrameComparator = function(a, b) {
		return a.frame - b.frame;
	};

	/*
	 * Private variables.
	 */

	//Singleton
	var _instance;

	/*
		A list of all elements which should be animated associated with their the metadata.
		Exmaple skrollable with two key frames animating from 100px width to 20px:

		skrollable = {
			element: <the DOM element>,
			styleAttr: <style attribute of the element before skrollr>,
			classAttr: <class attribute of the element before skrollr>,
			keyFrames: [
				{
					frame: 100,
					props: {
						width: {
							value: ['{?}px', 100],
							easing: <reference to easing function>
						}
					},
					mode: "absolute"
				},
				{
					frame: 200,
					props: {
						width: {
							value: ['{?}px', 20],
							easing: <reference to easing function>
						}
					},
					mode: "absolute"
				}
			]
		};
	*/
	var _skrollables;

	var _skrollrBody;

	var _listeners;
	var _forceHeight;
	var _maxKeyFrame = 0;

	var _scale = 1;
	var _constants;

	var _mobileDeceleration;

	//Current direction (up/down).
	var _direction = 'down';

	//The last top offset value. Needed to determine direction.
	var _lastTop = -1;

	//The last time we called the render method (doesn't mean we rendered!).
	var _lastRenderCall = _now();

	//For detecting if it actually resized (#271).
	var _lastViewportWidth = 0;
	var _lastViewportHeight = 0;

	var _requestReflow = false;

	//Will contain data about a running scrollbar animation, if any.
	var _scrollAnimation;

	var _smoothScrollingEnabled;

	var _smoothScrollingDuration;

	//Will contain settins for smooth scrolling if enabled.
	var _smoothScrolling;

	//Can be set by any operation/event to force rendering even if the scrollbar didn't move.
	var _forceRender;

	//Each skrollable gets an unique ID incremented for each skrollable.
	//The ID is the index in the _skrollables array.
	var _skrollableIdCounter = 0;

	var _edgeStrategy;


	//Mobile specific vars. Will be stripped by UglifyJS when not in use.
	var _isMobile = false;

	//The virtual scroll offset when using mobile scrolling.
	var _mobileOffset = 0;

	//If the browser supports 3d transforms, this will be filled with 'translateZ(0)' (empty string otherwise).
	var _translateZ;

	//Will contain data about registered events by skrollr.
	var _registeredEvents = [];

	//Animation frame id returned by RequestAnimationFrame (or timeout when RAF is not supported).
	var _animFrame;

	//Expose skrollr as either a global variable or a require.js module
	if(typeof define === 'function' && define.amd) {
		define('skrollr', function () {
			return skrollr;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = skrollr;
	} else {
		window.skrollr = skrollr;
	}

}(window, document));

/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.7",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map
/*!
 * Masonry PACKAGED v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwibWdnbGl0Y2guanMiLCJqcXVlcnkudmFsaWRhdGUubWluLmpzIiwiZm91bmRhdGlvbi5jb3JlLmpzIiwiZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnkuanMiLCJmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQuanMiLCJmb3VuZGF0aW9uLnV0aWwuYm94LmpzIiwiZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzLmpzIiwiZm91bmRhdGlvbi5yZXZlYWwuanMiLCJmb3VuZGF0aW9uLmRyb3Bkb3duLmpzIiwic2tyb2xsci5qcyIsImhhbW1lci5taW4uanMiLCJtYXNvbnJ5LnBrZ2QubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ROQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdmtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzdURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG4gICAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8PSAxMDI0KSA/IHRydWUgOiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9vdGVycGxhY2Vob2xkZXIoKSB7XHJcbiAgICAkKCcuZm9vdGVyX3BsYWNlaG9sZGVyJylcclxuICAgICAgICAuaGVpZ2h0KCQoJy5mb290ZXInKVxyXG4gICAgICAgICAgICAub3V0ZXJIZWlnaHQoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvdW5kYXRpb24oKSB7XHJcbiAgICAkKGRvY3VtZW50KS5mb3VuZGF0aW9uKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5hdmlnYXRpb24oKSB7XHJcbiAgICB2YXIgdG9nZ2xlID0gJy5tZW51LXRvZ2dsZSc7XHJcbiAgICB2YXIgbmF2aWdhdGlvbiA9ICcubmF2aWdhdGlvbic7XHJcbiAgICB2YXIgY2xvc2UgPSAnLm5hdmlnYXRpb24tY2xvc2UnO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRvZ2dsZSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKG5hdmlnYXRpb24pLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCdib2R5JykucHJlcGVuZCgnPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj48L2Rpdj4nKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgY2xvc2UsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJChjbG9zZSkuYWRkQ2xhc3MoJ2FuaW1hdGUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKGNsb3NlKS5yZW1vdmVDbGFzcygnYW5pbWF0ZScpO1xyXG4gICAgICAgICAgICAkKG5hdmlnYXRpb24pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLm92ZXJsYXknKS5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKHtcclxuICAgICAgICAnbW91c2V3aGVlbCc6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGVhZGVyU2VhcmNoKCkge1xyXG4gICAgdmFyICRpbnB1dCA9ICQoJy5oZWFkZXItc2VhcmNoIGlucHV0Jyk7XHJcbiAgICAkaW5wdXQuZm9jdXMoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuICAgICRpbnB1dC5ibHVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRTbGlkZXJzKCkge1xyXG4gICAgJCgnLmRldGFpbC1jb2xvcicpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgIGZhZGU6IGZhbHNlLFxyXG4gICAgICAgIHByZXZBcnJvdzogJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzbGljay1wcmV2XCI+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+PC9hPicsXHJcbiAgICAgICAgbmV4dEFycm93OiAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNsaWNrLW5leHRcIj48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+PC9hPicsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcubGF0ZXN0LXNsaWRlcicpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDUsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgIHByZXZBcnJvdzogJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzbGljay1wcmV2XCI+PGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1sZWZ0XCI+PC9pPjwvYT4nLFxyXG4gICAgICAgIG5leHRBcnJvdzogJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzbGljay1uZXh0XCI+PGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT48L2E+JyxcclxuICAgICAgICByZXNwb25zaXZlOiBbe1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiAxNDAwLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyNTIsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNzgwLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5kZXRhaWwtc2xpZGVyLWZvcicpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICBmYWRlOiB0cnVlLFxyXG4gICAgICAgIGFzTmF2Rm9yOiAnLmRldGFpbC1zbGlkZXItbmF2JyxcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5kZXRhaWwtc2xpZGVyLW5hdicpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuZGV0YWlsLXNsaWRlci1mb3InLFxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcclxuICAgICAgICByZXNwb25zaXZlOiBbe1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxyXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc4MCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhYnMoYmxvY2spIHtcclxuICAgIGlmICh0eXBlb2YoYmxvY2spID09PSAndW5kZWZpbmVkJykgYmxvY2sgPSAkKCcudGFicycpO1xyXG4gICAgYmxvY2suZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJHdyYXAgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmICghJHdyYXAuaXMoJy50YWJzLWRvbmUnKSkge1xyXG4gICAgICAgICAgICAkd3JhcC5hZGRDbGFzcygndGFicy1kb25lJyk7XHJcbiAgICAgICAgICAgICQoJHdyYXApLm9uKCdjbGljaycsICdbZGF0YS10YWJJZF0nLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciB0YWJpZCA9ICQodGhpcykuZGF0YSgndGFiaWQnKTtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRhYklkXScsICR3cmFwKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10YWJJZD1cIicgKyB0YWJpZCArICdcIl0nLCAkd3JhcCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtdGFiXScsICR3cmFwKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtdGFiPVwiJyArIHRhYmlkICsgJ1wiXScsICR3cmFwKS5hZGRDbGFzcygnYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCQoJy5hY3RpdmVbZGF0YS10YWJJZF0nLCAkd3JhcCkubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICQoJy5hY3RpdmVbZGF0YS10YWJJZF0nLCAkd3JhcCkuY2xpY2soKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtdGFiSWRdOmVxKDApJywgJHdyYXApLmNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhYnNSZXNwb25zaXZlKCkge1xyXG4gICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgICAkKCcudGFicycpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwYW5lbCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHBhbmVsLmZpbmQoJy50YWJzLXBhbmVsJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWIgPSAkKHRoaXMpLmRhdGEoJ3RhYicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhYlRpdGxlID0gJCgnLnRhYnMtdGl0bGUgYVtkYXRhLXRhYmlkPVwiJyArIHRhYiArICdcIl0nLCBwYW5lbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhYlRpdGxlLnNpYmxpbmdzKCcudGFicy1wYW5lbCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJCh0aGlzKS5jbG9uZSgpLmFkZENsYXNzKCdyZXNwb25zaXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiVGl0bGUuYWZ0ZXIoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcudGFicycpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwYW5lbCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICQoJy50YWJzLXRpdGxlIC50YWJzLXBhbmVsJywgcGFuZWwpLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRhaWxDb2xvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZGV0YWlsLWNvbG9yLWl0ZW0gYScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLmRldGFpbC1jb2xvci1pdGVtIGEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIC8vc2V0IGNvbG9yIHRvIHNtd2hyIGZvciBwcm9jZXNzaW5nXHJcbiAgICAgICAgdmFyIGNvbG9yID0gJCh0aGlzKS5kYXRhKCdjb2xvcicpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRldGFpbFNpemUoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmRldGFpbC1zaXplLWl0ZW0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5kZXRhaWwtc2l6ZS1pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAvL3NldCBzaXplIHRvIHNtd2hyIGZvciBwcm9jZXNzaW5nXHJcbiAgICAgICAgdmFyIHNpemUgPSAkKHRoaXMpLmRhdGEoJ3NpemUnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja291dEl0ZW0oKSB7XHJcbiAgICAkKCcuY2hlY2tvdXQtaXRlbScpLm5vdCgnLmFjdGl2ZScpLmZpbmQoJy5jaGVja291dC1ib2R5Jykuc2xpZGVVcCgwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNoZWNrb3V0LXRpdGxlIGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2hlY2tvdXQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuY2hlY2tvdXQtaXRlbScpO1xyXG5cclxuICAgICAgICAkKCcuY2hlY2tvdXQtYm9keScpLnN0b3AoKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgJCgnLmNoZWNrb3V0LWl0ZW0nKS5ub3QoaXRlbSkuc3RvcCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0uaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uc3RvcCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgY2hlY2tvdXQuc2libGluZ3MoJy5jaGVja291dC1ib2R5Jykuc3RvcCgpLnNsaWRlVXAoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVtLnN0b3AoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGNoZWNrb3V0LnNpYmxpbmdzKCcuY2hlY2tvdXQtYm9keScpLnN0b3AoKS5zbGlkZURvd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2tyb2xsckhhbmRsZXIoKSB7XHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICAgIHZhciBzID0gc2tyb2xsci5pbml0KCk7XHJcbiAgICAgICAgcy5kZXN0cm95KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBzID0gc2tyb2xsci5pbml0KHtcclxuICAgICAgICAgICAgZm9yY2VIZWlnaHQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXZpZXdTY3JvbGwoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnByZXZpZXctc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gJCgnLnByZXZpZXctbWFpbicpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdib2R5LCBodG1sJylcclxuICAgICAgICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXRcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhY2NvdW50T3JkZXIoKSB7XHJcbiAgICAkKCcuYWNjb3VudC1vcmRlci1saXN0Jykuc2xpZGVVcCgwKTtcclxuXHJcbiAgICAkKCcuYWNjb3VudC1vcmRlci1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYWNjb3VudC1vcmRlci1pdGVtJyk7XHJcbiAgICAgICAgcGFyZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgIHBhcmVudC5maW5kKCcuYWNjb3VudC1vcmRlci1saXN0Jykuc3RvcCgpLnNsaWRlVG9nZ2xlKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2ltcGxlTWVudSgpIHtcclxuICAgICQoJy5zaW1wbGUtbWVudSBsaScpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5maW5kKCdhJykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAkKCcuYWNjb3VudC1jb250ZW50JykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKHRhcmdldCkuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2ltcGxlLW1lbnUgYScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICQoJy5zaW1wbGUtbWVudSBsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJy5hY2NvdW50LWNvbnRlbnQnKS5oaWRlKCk7XHJcbiAgICAgICAgJCh0YXJnZXQpLnNob3coKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtZ0dsaXRjaGVyKGdsaXRjaCwgdGltZVRvU3RvcCwgdGltZVRvUmVzdGFydCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5kZWxheVRpbWUgPSAxMDAwO1xyXG4gICAgdGhpcy5nbGl0Y2ggPSBnbGl0Y2g7XHJcbiAgICB0aGlzLnN0b3BUaW1lID0gdGltZVRvU3RvcDtcclxuICAgIHRoaXMucmVzdGFydFRpbWUgPSB0aW1lVG9SZXN0YXJ0O1xyXG5cclxuICAgIHRoaXMuaW5pdEdsaXRjaGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJChnbGl0Y2gpLm1nR2xpdGNoKHtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3k6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZ2xpdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBibGVuZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJsZW5kTW9kZVR5cGU6ICdodWUnLFxyXG4gICAgICAgICAgICAgICAgZ2xpdGNoMVRpbWVNaW46IDIwMCxcclxuICAgICAgICAgICAgICAgIGdsaXRjaDFUaW1lTWF4OiA0MDAsXHJcbiAgICAgICAgICAgICAgICBnbGl0Y2gyVGltZU1pbjogMTAsXHJcbiAgICAgICAgICAgICAgICBnbGl0Y2gyVGltZU1heDogMTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLnN0b3BHbGl0Y2hlcigpO1xyXG4gICAgICAgIH0sIHNlbGYuZGVsYXlUaW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zdG9wR2xpdGNoZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKGdsaXRjaCkubWdHbGl0Y2goe1xyXG4gICAgICAgICAgICAgICAgZGVzdHJveTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5yZXN0YXJ0R2xpdGNoZXIoKTtcclxuICAgICAgICB9LCBzZWxmLnN0b3BUaW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZXN0YXJ0R2xpdGNoZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZWxmLmluaXRHbGl0Y2hlcigpO1xyXG4gICAgICAgIH0sIHNlbGYucmVzdGFydFRpbWUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlclRvZ2dsZSgpIHtcclxuICAgIHZhciBmaWx0ZXIgPSAkKCcuZmlsdGVyJyk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZpbHRlci10b2dnbGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGZpbHRlci50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoJCgnI2ZpbHRlcicpLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBoYW1tZXJ0aW1lID0gbmV3IEhhbW1lcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyJykpO1xyXG4gICAgICAgIGhhbW1lcnRpbWUub24oJ3N3aXBlbGVmdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmaWx0ZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0c0dyaWQoKSB7XHJcbiAgICAkKCcuZ3JpZCcpLm1hc29ucnkoe1xyXG4gICAgICAgIC8vIHNldCBpdGVtU2VsZWN0b3Igc28gLmdyaWQtc2l6ZXIgaXMgbm90IHVzZWQgaW4gbGF5b3V0XHJcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLmdyaWQtaXRlbScsXHJcbiAgICAgICAgLy8gdXNlIGVsZW1lbnQgZm9yIG9wdGlvblxyXG4gICAgICAgIGNvbHVtbldpZHRoOiAnLmdyaWQtc2l6ZXInLFxyXG4gICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZVxyXG4gICAgfSlcclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBmb3VuZGF0aW9uKCk7XHJcbiAgICBmb290ZXJwbGFjZWhvbGRlcigpO1xyXG4gICAgc2tyb2xsckhhbmRsZXIoKTtcclxuICAgIHByZXZpZXdTY3JvbGwoKTtcclxuICAgIG5hdmlnYXRpb24oKTtcclxuICAgIGhlYWRlclNlYXJjaCgpO1xyXG4gICAgaW5pdFNsaWRlcnMoKTtcclxuICAgIHRhYnMoKTtcclxuICAgIHRhYnNSZXNwb25zaXZlKCk7XHJcbiAgICBkZXRhaWxDb2xvcigpO1xyXG4gICAgZGV0YWlsU2l6ZSgpO1xyXG4gICAgY2hlY2tvdXRJdGVtKCk7XHJcbiAgICBhY2NvdW50T3JkZXIoKTtcclxuICAgIHNpbXBsZU1lbnUoKTtcclxuICAgIGZpbHRlclRvZ2dsZSgpO1xyXG4gICAgdmFyIGdsaXRjaCA9IG5ldyBtZ0dsaXRjaGVyKCcuZ2xpdGNoLWltZycsIDIwMDAsIDMwMDApO1xyXG4gICAgZ2xpdGNoLmluaXRHbGl0Y2hlcigpO1xyXG5cclxuICAgICQoJ2Zvcm0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudmFsaWRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHByb2plY3RzR3JpZCgpXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvb3RlcnBsYWNlaG9sZGVyKCk7XHJcbiAgICAgICAgdGFic1Jlc3BvbnNpdmUoKTtcclxuICAgICAgICBza3JvbGxySGFuZGxlcigpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCIvKiFcclxuICogbWdHbGl0Y2ggOiBsaXR0bGUganF1ZXJ5IGhlbHBlciB0byBnbGl0Y2ggZXZlcnl0aGluZ1xyXG4gKiAoYykgMjAxNiBIYWRyaWVuIE1vbmdvdWFjaG9uXHJcbiAqIE1JVCBMaWNlbnNlZC5cclxuICpcclxuICogQXV0aG9yIFVSSTogaHR0cDovL2htb25nb3VhY2hvbi5jb21cclxuICogUGx1Z2luIFVSSTogaHR0cDovL2htb25nb3VhY2hvbi5jb21cclxuICogRGF0ZSA6IDA2LzIwMTZcclxuICogVmVyc2lvbjogMS4wLjBcclxuICovXHJcblxyXG4hIGZ1bmN0aW9uKHQsIGUsIHMsIGkpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGZ1bmN0aW9uIG4oZSwgcykge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGUsIHRoaXMuc2V0dGluZ3MgPSB0LmV4dGVuZCh7fSwgYSwgcyksIHRoaXMuX2RlZmF1bHRzID0gYSwgdGhpcy5fbmFtZSA9IHIsIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcbiAgICB2YXIgciA9IFwibWdHbGl0Y2hcIixcclxuICAgICAgICBhID0ge1xyXG4gICAgICAgICAgICBkZXN0cm95OiAhMSxcclxuICAgICAgICAgICAgZ2xpdGNoOiAhMCxcclxuICAgICAgICAgICAgc2NhbGU6ICEwLFxyXG4gICAgICAgICAgICBibGVuZDogITAsXHJcbiAgICAgICAgICAgIGJsZW5kTW9kZVR5cGU6IFwiaHVlXCIsXHJcbiAgICAgICAgICAgIGdsaXRjaDFUaW1lTWluOiA2MDAsXHJcbiAgICAgICAgICAgIGdsaXRjaDFUaW1lTWF4OiA5MDAsXHJcbiAgICAgICAgICAgIGdsaXRjaDJUaW1lTWluOiAxMCxcclxuICAgICAgICAgICAgZ2xpdGNoMlRpbWVNYXg6IDExNSxcclxuICAgICAgICAgICAgekluZGV4U3RhcnQ6IDVcclxuICAgICAgICB9O1xyXG4gICAgdC5leHRlbmQobi5wcm90b3R5cGUsIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5nbGl0Y2goKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2xpdGNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZSh0LCBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGUgLSB0ICsgMSkpICsgdFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSBlKDEwLCAxOTAwKSxcclxuICAgICAgICAgICAgICAgICAgICBuID0gOTk5OSxcclxuICAgICAgICAgICAgICAgICAgICBhID0gZSgxMCwgMTMwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgbyA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaCA9IGUoMCwgMTYpLFxyXG4gICAgICAgICAgICAgICAgICAgIGYgPSBlKDAsIDE2KSxcclxuICAgICAgICAgICAgICAgICAgICBkID0gZShjLCBsKTtcclxuICAgICAgICAgICAgICAgIHQocikuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBjbGlwOiBcInJlY3QoXCIgKyBpICsgXCJweCwgXCIgKyBuICsgXCJweCwgXCIgKyBhICsgXCJweCxcIiArIG8gKyBcInB4KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBmLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGhcclxuICAgICAgICAgICAgICAgIH0pLCBzZXRUaW1lb3V0KHMsIGQpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGkoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGUoMTAsIDE5MDApLFxyXG4gICAgICAgICAgICAgICAgICAgIG4gPSA5OTk5LFxyXG4gICAgICAgICAgICAgICAgICAgIGMgPSBlKDEwLCAxMzAwKSxcclxuICAgICAgICAgICAgICAgICAgICBsID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBmID0gZSgwLCA0MCksXHJcbiAgICAgICAgICAgICAgICAgICAgZCA9IGUoMCwgNDApLFxyXG4gICAgICAgICAgICAgICAgICAgIG0gPSBlKG8sIGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGEgPT09ICEwKSB2YXIgeCA9IChNYXRoLnJhbmRvbSgpICogKDEuMSAtIC45KSArIC45KS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gITEpIHZhciB4ID0gMTtcclxuICAgICAgICAgICAgICAgIHQocikubmV4dCgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpcDogXCJyZWN0KFwiICsgcyArIFwicHgsIFwiICsgbiArIFwicHgsIFwiICsgYyArIFwicHgsXCIgKyBsICsgXCJweClcIixcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmLFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBkLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjogXCJzY2FsZShcIiArIHggKyBcIilcIixcclxuICAgICAgICAgICAgICAgICAgICBcIi1tcy10cmFuc2Zvcm1cIjogXCJzY2FsZShcIiArIHggKyBcIilcIixcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwic2NhbGUoXCIgKyB4ICsgXCIpXCJcclxuICAgICAgICAgICAgICAgIH0pLCBzZXRUaW1lb3V0KGksIG0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG4oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGUoMTAsIDE5MDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSA5OTk5LFxyXG4gICAgICAgICAgICAgICAgICAgIGMgPSBlKDEwLCAxMzAwKSxcclxuICAgICAgICAgICAgICAgICAgICBsID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBmID0gZSgwLCA0MCksXHJcbiAgICAgICAgICAgICAgICAgICAgZCA9IGUoMCwgNDApLFxyXG4gICAgICAgICAgICAgICAgICAgIG0gPSBlKG8sIGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGEgPT09ICEwKSB2YXIgeCA9IChNYXRoLnJhbmRvbSgpICogKDEuMSAtIC45KSArIC45KS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gITEpIHZhciB4ID0gMTtcclxuICAgICAgICAgICAgICAgIHQocikubmV4dCgpLm5leHQoKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaXA6IFwicmVjdChcIiArIHMgKyBcInB4LCBcIiArIGkgKyBcInB4LCBcIiArIGMgKyBcInB4LFwiICsgbCArIFwicHgpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogZixcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogZCxcclxuICAgICAgICAgICAgICAgICAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwic2NhbGUoXCIgKyB4ICsgXCIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCItbXMtdHJhbnNmb3JtXCI6IFwic2NhbGUoXCIgKyB4ICsgXCIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInNjYWxlKFwiICsgeCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgICB9KSwgc2V0VGltZW91dChuLCBtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciByID0gdGhpcy5lbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgYSA9IHRoaXMuc2V0dGluZ3Muc2NhbGUsXHJcbiAgICAgICAgICAgICAgICBjID0gdGhpcy5zZXR0aW5ncy5nbGl0Y2gxVGltZU1pbixcclxuICAgICAgICAgICAgICAgIGwgPSB0aGlzLnNldHRpbmdzLmdsaXRjaDFUaW1lTWF4LFxyXG4gICAgICAgICAgICAgICAgbyA9IHRoaXMuc2V0dGluZ3MuZ2xpdGNoMlRpbWVNaW4sXHJcbiAgICAgICAgICAgICAgICBoID0gdGhpcy5zZXR0aW5ncy5nbGl0Y2gyVGltZU1heCxcclxuICAgICAgICAgICAgICAgIGYgPSB0aGlzLnNldHRpbmdzLnpJbmRleFN0YXJ0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kZXN0cm95ID09PSAhMCkodChyKS5oYXNDbGFzcyhcImVsLWZyb250LTFcIikgfHwgdChyKS5oYXNDbGFzcyhcImZyb250LTNcIikgfHwgdChyKS5oYXNDbGFzcyhcImZyb250LTJcIikpICYmIHQoXCIuZnJvbnQtMSwgLmZyb250LTIsIC5mcm9udC0zXCIpLnJlbW92ZSgpLCB0KFwiLmJhY2tcIikucmVtb3ZlQ2xhc3MoXCJiYWNrXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLmRlc3Ryb3kgPT09ICExKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZCA9IHQocikuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkLmluc2VydEJlZm9yZShyKS5hZGRDbGFzcyhcImJhY2tcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ6LWluZGV4XCI6IGZcclxuICAgICAgICAgICAgICAgICAgICB9KSwgdGhpcy5zZXR0aW5ncy5ibGVuZCA9PT0gITApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IHQocikuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBkLmluc2VydEFmdGVyKHIpLmFkZENsYXNzKFwiZnJvbnQtM1wiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInotaW5kZXhcIjogZiArIDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWl4LWJsZW5kLW1vZGVcIjogdGhpcy5zZXR0aW5ncy5ibGVuZE1vZGVUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIG4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2xpdGNoID09PSAhMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gdChyKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQuaW5zZXJ0QWZ0ZXIocikuYWRkQ2xhc3MoXCJmcm9udC0yXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiei1pbmRleFwiOiBmICsgMlxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCB0KFwiLmJhY2tcIikubmV4dCgpLmFkZENsYXNzKFwiZnJvbnQtMVwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInotaW5kZXhcIjogZiArIDFcclxuICAgICAgICAgICAgICAgICAgICB9KSwgcygpLCBpKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pLCB0LmZuW3JdID0gZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG5ldyBuKHRoaXMsIHQpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpOyIsIi8qISBqUXVlcnkgVmFsaWRhdGlvbiBQbHVnaW4gLSB2MS4xNi4wIC0gMTIvMi8yMDE2XG4gKiBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgSsO2cm4gWmFlZmZlcmVyOyBMaWNlbnNlZCBNSVQgKi9cbiFmdW5jdGlvbihhKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcImpxdWVyeVwiXSxhKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1hKHJlcXVpcmUoXCJqcXVlcnlcIikpOmEoalF1ZXJ5KX0oZnVuY3Rpb24oYSl7YS5leHRlbmQoYS5mbix7dmFsaWRhdGU6ZnVuY3Rpb24oYil7aWYoIXRoaXMubGVuZ3RoKXJldHVybiB2b2lkKGImJmIuZGVidWcmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLndhcm4oXCJOb3RoaW5nIHNlbGVjdGVkLCBjYW4ndCB2YWxpZGF0ZSwgcmV0dXJuaW5nIG5vdGhpbmcuXCIpKTt2YXIgYz1hLmRhdGEodGhpc1swXSxcInZhbGlkYXRvclwiKTtyZXR1cm4gYz9jOih0aGlzLmF0dHIoXCJub3ZhbGlkYXRlXCIsXCJub3ZhbGlkYXRlXCIpLGM9bmV3IGEudmFsaWRhdG9yKGIsdGhpc1swXSksYS5kYXRhKHRoaXNbMF0sXCJ2YWxpZGF0b3JcIixjKSxjLnNldHRpbmdzLm9uc3VibWl0JiYodGhpcy5vbihcImNsaWNrLnZhbGlkYXRlXCIsXCI6c3VibWl0XCIsZnVuY3Rpb24oYil7Yy5zZXR0aW5ncy5zdWJtaXRIYW5kbGVyJiYoYy5zdWJtaXRCdXR0b249Yi50YXJnZXQpLGEodGhpcykuaGFzQ2xhc3MoXCJjYW5jZWxcIikmJihjLmNhbmNlbFN1Ym1pdD0hMCksdm9pZCAwIT09YSh0aGlzKS5hdHRyKFwiZm9ybW5vdmFsaWRhdGVcIikmJihjLmNhbmNlbFN1Ym1pdD0hMCl9KSx0aGlzLm9uKFwic3VibWl0LnZhbGlkYXRlXCIsZnVuY3Rpb24oYil7ZnVuY3Rpb24gZCgpe3ZhciBkLGU7cmV0dXJuIWMuc2V0dGluZ3Muc3VibWl0SGFuZGxlcnx8KGMuc3VibWl0QnV0dG9uJiYoZD1hKFwiPGlucHV0IHR5cGU9J2hpZGRlbicvPlwiKS5hdHRyKFwibmFtZVwiLGMuc3VibWl0QnV0dG9uLm5hbWUpLnZhbChhKGMuc3VibWl0QnV0dG9uKS52YWwoKSkuYXBwZW5kVG8oYy5jdXJyZW50Rm9ybSkpLGU9Yy5zZXR0aW5ncy5zdWJtaXRIYW5kbGVyLmNhbGwoYyxjLmN1cnJlbnRGb3JtLGIpLGMuc3VibWl0QnV0dG9uJiZkLnJlbW92ZSgpLHZvaWQgMCE9PWUmJmUpfXJldHVybiBjLnNldHRpbmdzLmRlYnVnJiZiLnByZXZlbnREZWZhdWx0KCksYy5jYW5jZWxTdWJtaXQ/KGMuY2FuY2VsU3VibWl0PSExLGQoKSk6Yy5mb3JtKCk/Yy5wZW5kaW5nUmVxdWVzdD8oYy5mb3JtU3VibWl0dGVkPSEwLCExKTpkKCk6KGMuZm9jdXNJbnZhbGlkKCksITEpfSkpLGMpfSx2YWxpZDpmdW5jdGlvbigpe3ZhciBiLGMsZDtyZXR1cm4gYSh0aGlzWzBdKS5pcyhcImZvcm1cIik/Yj10aGlzLnZhbGlkYXRlKCkuZm9ybSgpOihkPVtdLGI9ITAsYz1hKHRoaXNbMF0uZm9ybSkudmFsaWRhdGUoKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtiPWMuZWxlbWVudCh0aGlzKSYmYixifHwoZD1kLmNvbmNhdChjLmVycm9yTGlzdCkpfSksYy5lcnJvckxpc3Q9ZCksYn0scnVsZXM6ZnVuY3Rpb24oYixjKXt2YXIgZCxlLGYsZyxoLGksaj10aGlzWzBdO2lmKG51bGwhPWomJm51bGwhPWouZm9ybSl7aWYoYilzd2l0Y2goZD1hLmRhdGEoai5mb3JtLFwidmFsaWRhdG9yXCIpLnNldHRpbmdzLGU9ZC5ydWxlcyxmPWEudmFsaWRhdG9yLnN0YXRpY1J1bGVzKGopLGIpe2Nhc2VcImFkZFwiOmEuZXh0ZW5kKGYsYS52YWxpZGF0b3Iubm9ybWFsaXplUnVsZShjKSksZGVsZXRlIGYubWVzc2FnZXMsZVtqLm5hbWVdPWYsYy5tZXNzYWdlcyYmKGQubWVzc2FnZXNbai5uYW1lXT1hLmV4dGVuZChkLm1lc3NhZ2VzW2oubmFtZV0sYy5tZXNzYWdlcykpO2JyZWFrO2Nhc2VcInJlbW92ZVwiOnJldHVybiBjPyhpPXt9LGEuZWFjaChjLnNwbGl0KC9cXHMvKSxmdW5jdGlvbihiLGMpe2lbY109ZltjXSxkZWxldGUgZltjXSxcInJlcXVpcmVkXCI9PT1jJiZhKGopLnJlbW92ZUF0dHIoXCJhcmlhLXJlcXVpcmVkXCIpfSksaSk6KGRlbGV0ZSBlW2oubmFtZV0sZil9cmV0dXJuIGc9YS52YWxpZGF0b3Iubm9ybWFsaXplUnVsZXMoYS5leHRlbmQoe30sYS52YWxpZGF0b3IuY2xhc3NSdWxlcyhqKSxhLnZhbGlkYXRvci5hdHRyaWJ1dGVSdWxlcyhqKSxhLnZhbGlkYXRvci5kYXRhUnVsZXMoaiksYS52YWxpZGF0b3Iuc3RhdGljUnVsZXMoaikpLGopLGcucmVxdWlyZWQmJihoPWcucmVxdWlyZWQsZGVsZXRlIGcucmVxdWlyZWQsZz1hLmV4dGVuZCh7cmVxdWlyZWQ6aH0sZyksYShqKS5hdHRyKFwiYXJpYS1yZXF1aXJlZFwiLFwidHJ1ZVwiKSksZy5yZW1vdGUmJihoPWcucmVtb3RlLGRlbGV0ZSBnLnJlbW90ZSxnPWEuZXh0ZW5kKGcse3JlbW90ZTpofSkpLGd9fX0pLGEuZXh0ZW5kKGEuZXhwci5wc2V1ZG9zfHxhLmV4cHJbXCI6XCJdLHtibGFuazpmdW5jdGlvbihiKXtyZXR1cm4hYS50cmltKFwiXCIrYShiKS52YWwoKSl9LGZpbGxlZDpmdW5jdGlvbihiKXt2YXIgYz1hKGIpLnZhbCgpO3JldHVybiBudWxsIT09YyYmISFhLnRyaW0oXCJcIitjKX0sdW5jaGVja2VkOmZ1bmN0aW9uKGIpe3JldHVybiFhKGIpLnByb3AoXCJjaGVja2VkXCIpfX0pLGEudmFsaWRhdG9yPWZ1bmN0aW9uKGIsYyl7dGhpcy5zZXR0aW5ncz1hLmV4dGVuZCghMCx7fSxhLnZhbGlkYXRvci5kZWZhdWx0cyxiKSx0aGlzLmN1cnJlbnRGb3JtPWMsdGhpcy5pbml0KCl9LGEudmFsaWRhdG9yLmZvcm1hdD1mdW5jdGlvbihiLGMpe3JldHVybiAxPT09YXJndW1lbnRzLmxlbmd0aD9mdW5jdGlvbigpe3ZhciBjPWEubWFrZUFycmF5KGFyZ3VtZW50cyk7cmV0dXJuIGMudW5zaGlmdChiKSxhLnZhbGlkYXRvci5mb3JtYXQuYXBwbHkodGhpcyxjKX06dm9pZCAwPT09Yz9iOihhcmd1bWVudHMubGVuZ3RoPjImJmMuY29uc3RydWN0b3IhPT1BcnJheSYmKGM9YS5tYWtlQXJyYXkoYXJndW1lbnRzKS5zbGljZSgxKSksYy5jb25zdHJ1Y3RvciE9PUFycmF5JiYoYz1bY10pLGEuZWFjaChjLGZ1bmN0aW9uKGEsYyl7Yj1iLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFx7XCIrYStcIlxcXFx9XCIsXCJnXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIGN9KX0pLGIpfSxhLmV4dGVuZChhLnZhbGlkYXRvcix7ZGVmYXVsdHM6e21lc3NhZ2VzOnt9LGdyb3Vwczp7fSxydWxlczp7fSxlcnJvckNsYXNzOlwiZXJyb3JcIixwZW5kaW5nQ2xhc3M6XCJwZW5kaW5nXCIsdmFsaWRDbGFzczpcInZhbGlkXCIsZXJyb3JFbGVtZW50OlwibGFiZWxcIixmb2N1c0NsZWFudXA6ITEsZm9jdXNJbnZhbGlkOiEwLGVycm9yQ29udGFpbmVyOmEoW10pLGVycm9yTGFiZWxDb250YWluZXI6YShbXSksb25zdWJtaXQ6ITAsaWdub3JlOlwiOmhpZGRlblwiLGlnbm9yZVRpdGxlOiExLG9uZm9jdXNpbjpmdW5jdGlvbihhKXt0aGlzLmxhc3RBY3RpdmU9YSx0aGlzLnNldHRpbmdzLmZvY3VzQ2xlYW51cCYmKHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQmJnRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQuY2FsbCh0aGlzLGEsdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyksdGhpcy5oaWRlVGhlc2UodGhpcy5lcnJvcnNGb3IoYSkpKX0sb25mb2N1c291dDpmdW5jdGlvbihhKXt0aGlzLmNoZWNrYWJsZShhKXx8IShhLm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWQpJiZ0aGlzLm9wdGlvbmFsKGEpfHx0aGlzLmVsZW1lbnQoYSl9LG9ua2V5dXA6ZnVuY3Rpb24oYixjKXt2YXIgZD1bMTYsMTcsMTgsMjAsMzUsMzYsMzcsMzgsMzksNDAsNDUsMTQ0LDIyNV07OT09PWMud2hpY2gmJlwiXCI9PT10aGlzLmVsZW1lbnRWYWx1ZShiKXx8YS5pbkFycmF5KGMua2V5Q29kZSxkKSE9PS0xfHwoYi5uYW1lIGluIHRoaXMuc3VibWl0dGVkfHxiLm5hbWUgaW4gdGhpcy5pbnZhbGlkKSYmdGhpcy5lbGVtZW50KGIpfSxvbmNsaWNrOmZ1bmN0aW9uKGEpe2EubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZD90aGlzLmVsZW1lbnQoYSk6YS5wYXJlbnROb2RlLm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWQmJnRoaXMuZWxlbWVudChhLnBhcmVudE5vZGUpfSxoaWdobGlnaHQ6ZnVuY3Rpb24oYixjLGQpe1wicmFkaW9cIj09PWIudHlwZT90aGlzLmZpbmRCeU5hbWUoYi5uYW1lKS5hZGRDbGFzcyhjKS5yZW1vdmVDbGFzcyhkKTphKGIpLmFkZENsYXNzKGMpLnJlbW92ZUNsYXNzKGQpfSx1bmhpZ2hsaWdodDpmdW5jdGlvbihiLGMsZCl7XCJyYWRpb1wiPT09Yi50eXBlP3RoaXMuZmluZEJ5TmFtZShiLm5hbWUpLnJlbW92ZUNsYXNzKGMpLmFkZENsYXNzKGQpOmEoYikucmVtb3ZlQ2xhc3MoYykuYWRkQ2xhc3MoZCl9fSxzZXREZWZhdWx0czpmdW5jdGlvbihiKXthLmV4dGVuZChhLnZhbGlkYXRvci5kZWZhdWx0cyxiKX0sbWVzc2FnZXM6e3JlcXVpcmVkOlwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIixyZW1vdGU6XCJQbGVhc2UgZml4IHRoaXMgZmllbGQuXCIsZW1haWw6XCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiLHVybDpcIlBsZWFzZSBlbnRlciBhIHZhbGlkIFVSTC5cIixkYXRlOlwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZS5cIixkYXRlSVNPOlwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZSAoSVNPKS5cIixudW1iZXI6XCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXIuXCIsZGlnaXRzOlwiUGxlYXNlIGVudGVyIG9ubHkgZGlnaXRzLlwiLGVxdWFsVG86XCJQbGVhc2UgZW50ZXIgdGhlIHNhbWUgdmFsdWUgYWdhaW4uXCIsbWF4bGVuZ3RoOmEudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBubyBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnMuXCIpLG1pbmxlbmd0aDphLnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIpLHJhbmdlbGVuZ3RoOmEudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0gY2hhcmFjdGVycyBsb25nLlwiKSxyYW5nZTphLnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9LlwiKSxtYXg6YS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIiksbWluOmEudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIpLHN0ZXA6YS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgbXVsdGlwbGUgb2YgezB9LlwiKX0sYXV0b0NyZWF0ZVJhbmdlczohMSxwcm90b3R5cGU6e2luaXQ6ZnVuY3Rpb24oKXtmdW5jdGlvbiBiKGIpeyF0aGlzLmZvcm0mJnRoaXMuaGFzQXR0cmlidXRlKFwiY29udGVudGVkaXRhYmxlXCIpJiYodGhpcy5mb3JtPWEodGhpcykuY2xvc2VzdChcImZvcm1cIilbMF0pO3ZhciBjPWEuZGF0YSh0aGlzLmZvcm0sXCJ2YWxpZGF0b3JcIiksZD1cIm9uXCIrYi50eXBlLnJlcGxhY2UoL152YWxpZGF0ZS8sXCJcIiksZT1jLnNldHRpbmdzO2VbZF0mJiFhKHRoaXMpLmlzKGUuaWdub3JlKSYmZVtkXS5jYWxsKGMsdGhpcyxiKX10aGlzLmxhYmVsQ29udGFpbmVyPWEodGhpcy5zZXR0aW5ncy5lcnJvckxhYmVsQ29udGFpbmVyKSx0aGlzLmVycm9yQ29udGV4dD10aGlzLmxhYmVsQ29udGFpbmVyLmxlbmd0aCYmdGhpcy5sYWJlbENvbnRhaW5lcnx8YSh0aGlzLmN1cnJlbnRGb3JtKSx0aGlzLmNvbnRhaW5lcnM9YSh0aGlzLnNldHRpbmdzLmVycm9yQ29udGFpbmVyKS5hZGQodGhpcy5zZXR0aW5ncy5lcnJvckxhYmVsQ29udGFpbmVyKSx0aGlzLnN1Ym1pdHRlZD17fSx0aGlzLnZhbHVlQ2FjaGU9e30sdGhpcy5wZW5kaW5nUmVxdWVzdD0wLHRoaXMucGVuZGluZz17fSx0aGlzLmludmFsaWQ9e30sdGhpcy5yZXNldCgpO3ZhciBjLGQ9dGhpcy5ncm91cHM9e307YS5lYWNoKHRoaXMuc2V0dGluZ3MuZ3JvdXBzLGZ1bmN0aW9uKGIsYyl7XCJzdHJpbmdcIj09dHlwZW9mIGMmJihjPWMuc3BsaXQoL1xccy8pKSxhLmVhY2goYyxmdW5jdGlvbihhLGMpe2RbY109Yn0pfSksYz10aGlzLnNldHRpbmdzLnJ1bGVzLGEuZWFjaChjLGZ1bmN0aW9uKGIsZCl7Y1tiXT1hLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlKGQpfSksYSh0aGlzLmN1cnJlbnRGb3JtKS5vbihcImZvY3VzaW4udmFsaWRhdGUgZm9jdXNvdXQudmFsaWRhdGUga2V5dXAudmFsaWRhdGVcIixcIjp0ZXh0LCBbdHlwZT0ncGFzc3dvcmQnXSwgW3R5cGU9J2ZpbGUnXSwgc2VsZWN0LCB0ZXh0YXJlYSwgW3R5cGU9J251bWJlciddLCBbdHlwZT0nc2VhcmNoJ10sIFt0eXBlPSd0ZWwnXSwgW3R5cGU9J3VybCddLCBbdHlwZT0nZW1haWwnXSwgW3R5cGU9J2RhdGV0aW1lJ10sIFt0eXBlPSdkYXRlJ10sIFt0eXBlPSdtb250aCddLCBbdHlwZT0nd2VlayddLCBbdHlwZT0ndGltZSddLCBbdHlwZT0nZGF0ZXRpbWUtbG9jYWwnXSwgW3R5cGU9J3JhbmdlJ10sIFt0eXBlPSdjb2xvciddLCBbdHlwZT0ncmFkaW8nXSwgW3R5cGU9J2NoZWNrYm94J10sIFtjb250ZW50ZWRpdGFibGVdLCBbdHlwZT0nYnV0dG9uJ11cIixiKS5vbihcImNsaWNrLnZhbGlkYXRlXCIsXCJzZWxlY3QsIG9wdGlvbiwgW3R5cGU9J3JhZGlvJ10sIFt0eXBlPSdjaGVja2JveCddXCIsYiksdGhpcy5zZXR0aW5ncy5pbnZhbGlkSGFuZGxlciYmYSh0aGlzLmN1cnJlbnRGb3JtKS5vbihcImludmFsaWQtZm9ybS52YWxpZGF0ZVwiLHRoaXMuc2V0dGluZ3MuaW52YWxpZEhhbmRsZXIpLGEodGhpcy5jdXJyZW50Rm9ybSkuZmluZChcIltyZXF1aXJlZF0sIFtkYXRhLXJ1bGUtcmVxdWlyZWRdLCAucmVxdWlyZWRcIikuYXR0cihcImFyaWEtcmVxdWlyZWRcIixcInRydWVcIil9LGZvcm06ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGVja0Zvcm0oKSxhLmV4dGVuZCh0aGlzLnN1Ym1pdHRlZCx0aGlzLmVycm9yTWFwKSx0aGlzLmludmFsaWQ9YS5leHRlbmQoe30sdGhpcy5lcnJvck1hcCksdGhpcy52YWxpZCgpfHxhKHRoaXMuY3VycmVudEZvcm0pLnRyaWdnZXJIYW5kbGVyKFwiaW52YWxpZC1mb3JtXCIsW3RoaXNdKSx0aGlzLnNob3dFcnJvcnMoKSx0aGlzLnZhbGlkKCl9LGNoZWNrRm9ybTpmdW5jdGlvbigpe3RoaXMucHJlcGFyZUZvcm0oKTtmb3IodmFyIGE9MCxiPXRoaXMuY3VycmVudEVsZW1lbnRzPXRoaXMuZWxlbWVudHMoKTtiW2FdO2ErKyl0aGlzLmNoZWNrKGJbYV0pO3JldHVybiB0aGlzLnZhbGlkKCl9LGVsZW1lbnQ6ZnVuY3Rpb24oYil7dmFyIGMsZCxlPXRoaXMuY2xlYW4oYiksZj10aGlzLnZhbGlkYXRpb25UYXJnZXRGb3IoZSksZz10aGlzLGg9ITA7cmV0dXJuIHZvaWQgMD09PWY/ZGVsZXRlIHRoaXMuaW52YWxpZFtlLm5hbWVdOih0aGlzLnByZXBhcmVFbGVtZW50KGYpLHRoaXMuY3VycmVudEVsZW1lbnRzPWEoZiksZD10aGlzLmdyb3Vwc1tmLm5hbWVdLGQmJmEuZWFjaCh0aGlzLmdyb3VwcyxmdW5jdGlvbihhLGIpe2I9PT1kJiZhIT09Zi5uYW1lJiYoZT1nLnZhbGlkYXRpb25UYXJnZXRGb3IoZy5jbGVhbihnLmZpbmRCeU5hbWUoYSkpKSxlJiZlLm5hbWUgaW4gZy5pbnZhbGlkJiYoZy5jdXJyZW50RWxlbWVudHMucHVzaChlKSxoPWcuY2hlY2soZSkmJmgpKX0pLGM9dGhpcy5jaGVjayhmKSE9PSExLGg9aCYmYyxjP3RoaXMuaW52YWxpZFtmLm5hbWVdPSExOnRoaXMuaW52YWxpZFtmLm5hbWVdPSEwLHRoaXMubnVtYmVyT2ZJbnZhbGlkcygpfHwodGhpcy50b0hpZGU9dGhpcy50b0hpZGUuYWRkKHRoaXMuY29udGFpbmVycykpLHRoaXMuc2hvd0Vycm9ycygpLGEoYikuYXR0cihcImFyaWEtaW52YWxpZFwiLCFjKSksaH0sc2hvd0Vycm9yczpmdW5jdGlvbihiKXtpZihiKXt2YXIgYz10aGlzO2EuZXh0ZW5kKHRoaXMuZXJyb3JNYXAsYiksdGhpcy5lcnJvckxpc3Q9YS5tYXAodGhpcy5lcnJvck1hcCxmdW5jdGlvbihhLGIpe3JldHVybnttZXNzYWdlOmEsZWxlbWVudDpjLmZpbmRCeU5hbWUoYilbMF19fSksdGhpcy5zdWNjZXNzTGlzdD1hLmdyZXAodGhpcy5zdWNjZXNzTGlzdCxmdW5jdGlvbihhKXtyZXR1cm4hKGEubmFtZSBpbiBiKX0pfXRoaXMuc2V0dGluZ3Muc2hvd0Vycm9ycz90aGlzLnNldHRpbmdzLnNob3dFcnJvcnMuY2FsbCh0aGlzLHRoaXMuZXJyb3JNYXAsdGhpcy5lcnJvckxpc3QpOnRoaXMuZGVmYXVsdFNob3dFcnJvcnMoKX0scmVzZXRGb3JtOmZ1bmN0aW9uKCl7YS5mbi5yZXNldEZvcm0mJmEodGhpcy5jdXJyZW50Rm9ybSkucmVzZXRGb3JtKCksdGhpcy5pbnZhbGlkPXt9LHRoaXMuc3VibWl0dGVkPXt9LHRoaXMucHJlcGFyZUZvcm0oKSx0aGlzLmhpZGVFcnJvcnMoKTt2YXIgYj10aGlzLmVsZW1lbnRzKCkucmVtb3ZlRGF0YShcInByZXZpb3VzVmFsdWVcIikucmVtb3ZlQXR0cihcImFyaWEtaW52YWxpZFwiKTt0aGlzLnJlc2V0RWxlbWVudHMoYil9LHJlc2V0RWxlbWVudHM6ZnVuY3Rpb24oYSl7dmFyIGI7aWYodGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodClmb3IoYj0wO2FbYl07YisrKXRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQuY2FsbCh0aGlzLGFbYl0sdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLFwiXCIpLHRoaXMuZmluZEJ5TmFtZShhW2JdLm5hbWUpLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyk7ZWxzZSBhLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcykucmVtb3ZlQ2xhc3ModGhpcy5zZXR0aW5ncy52YWxpZENsYXNzKX0sbnVtYmVyT2ZJbnZhbGlkczpmdW5jdGlvbigpe3JldHVybiB0aGlzLm9iamVjdExlbmd0aCh0aGlzLmludmFsaWQpfSxvYmplY3RMZW5ndGg6ZnVuY3Rpb24oYSl7dmFyIGIsYz0wO2ZvcihiIGluIGEpYVtiXSYmYysrO3JldHVybiBjfSxoaWRlRXJyb3JzOmZ1bmN0aW9uKCl7dGhpcy5oaWRlVGhlc2UodGhpcy50b0hpZGUpfSxoaWRlVGhlc2U6ZnVuY3Rpb24oYSl7YS5ub3QodGhpcy5jb250YWluZXJzKS50ZXh0KFwiXCIpLHRoaXMuYWRkV3JhcHBlcihhKS5oaWRlKCl9LHZhbGlkOmZ1bmN0aW9uKCl7cmV0dXJuIDA9PT10aGlzLnNpemUoKX0sc2l6ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVycm9yTGlzdC5sZW5ndGh9LGZvY3VzSW52YWxpZDpmdW5jdGlvbigpe2lmKHRoaXMuc2V0dGluZ3MuZm9jdXNJbnZhbGlkKXRyeXthKHRoaXMuZmluZExhc3RBY3RpdmUoKXx8dGhpcy5lcnJvckxpc3QubGVuZ3RoJiZ0aGlzLmVycm9yTGlzdFswXS5lbGVtZW50fHxbXSkuZmlsdGVyKFwiOnZpc2libGVcIikuZm9jdXMoKS50cmlnZ2VyKFwiZm9jdXNpblwiKX1jYXRjaChiKXt9fSxmaW5kTGFzdEFjdGl2ZTpmdW5jdGlvbigpe3ZhciBiPXRoaXMubGFzdEFjdGl2ZTtyZXR1cm4gYiYmMT09PWEuZ3JlcCh0aGlzLmVycm9yTGlzdCxmdW5jdGlvbihhKXtyZXR1cm4gYS5lbGVtZW50Lm5hbWU9PT1iLm5hbWV9KS5sZW5ndGgmJmJ9LGVsZW1lbnRzOmZ1bmN0aW9uKCl7dmFyIGI9dGhpcyxjPXt9O3JldHVybiBhKHRoaXMuY3VycmVudEZvcm0pLmZpbmQoXCJpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW2NvbnRlbnRlZGl0YWJsZV1cIikubm90KFwiOnN1Ym1pdCwgOnJlc2V0LCA6aW1hZ2UsIDpkaXNhYmxlZFwiKS5ub3QodGhpcy5zZXR0aW5ncy5pZ25vcmUpLmZpbHRlcihmdW5jdGlvbigpe3ZhciBkPXRoaXMubmFtZXx8YSh0aGlzKS5hdHRyKFwibmFtZVwiKTtyZXR1cm4hZCYmYi5zZXR0aW5ncy5kZWJ1ZyYmd2luZG93LmNvbnNvbGUmJmNvbnNvbGUuZXJyb3IoXCIlbyBoYXMgbm8gbmFtZSBhc3NpZ25lZFwiLHRoaXMpLHRoaXMuaGFzQXR0cmlidXRlKFwiY29udGVudGVkaXRhYmxlXCIpJiYodGhpcy5mb3JtPWEodGhpcykuY2xvc2VzdChcImZvcm1cIilbMF0pLCEoZCBpbiBjfHwhYi5vYmplY3RMZW5ndGgoYSh0aGlzKS5ydWxlcygpKSkmJihjW2RdPSEwLCEwKX0pfSxjbGVhbjpmdW5jdGlvbihiKXtyZXR1cm4gYShiKVswXX0sZXJyb3JzOmZ1bmN0aW9uKCl7dmFyIGI9dGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLnNwbGl0KFwiIFwiKS5qb2luKFwiLlwiKTtyZXR1cm4gYSh0aGlzLnNldHRpbmdzLmVycm9yRWxlbWVudCtcIi5cIitiLHRoaXMuZXJyb3JDb250ZXh0KX0scmVzZXRJbnRlcm5hbHM6ZnVuY3Rpb24oKXt0aGlzLnN1Y2Nlc3NMaXN0PVtdLHRoaXMuZXJyb3JMaXN0PVtdLHRoaXMuZXJyb3JNYXA9e30sdGhpcy50b1Nob3c9YShbXSksdGhpcy50b0hpZGU9YShbXSl9LHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5yZXNldEludGVybmFscygpLHRoaXMuY3VycmVudEVsZW1lbnRzPWEoW10pfSxwcmVwYXJlRm9ybTpmdW5jdGlvbigpe3RoaXMucmVzZXQoKSx0aGlzLnRvSGlkZT10aGlzLmVycm9ycygpLmFkZCh0aGlzLmNvbnRhaW5lcnMpfSxwcmVwYXJlRWxlbWVudDpmdW5jdGlvbihhKXt0aGlzLnJlc2V0KCksdGhpcy50b0hpZGU9dGhpcy5lcnJvcnNGb3IoYSl9LGVsZW1lbnRWYWx1ZTpmdW5jdGlvbihiKXt2YXIgYyxkLGU9YShiKSxmPWIudHlwZTtyZXR1cm5cInJhZGlvXCI9PT1mfHxcImNoZWNrYm94XCI9PT1mP3RoaXMuZmluZEJ5TmFtZShiLm5hbWUpLmZpbHRlcihcIjpjaGVja2VkXCIpLnZhbCgpOlwibnVtYmVyXCI9PT1mJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgYi52YWxpZGl0eT9iLnZhbGlkaXR5LmJhZElucHV0P1wiTmFOXCI6ZS52YWwoKTooYz1iLmhhc0F0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiKT9lLnRleHQoKTplLnZhbCgpLFwiZmlsZVwiPT09Zj9cIkM6XFxcXGZha2VwYXRoXFxcXFwiPT09Yy5zdWJzdHIoMCwxMik/Yy5zdWJzdHIoMTIpOihkPWMubGFzdEluZGV4T2YoXCIvXCIpLGQ+PTA/Yy5zdWJzdHIoZCsxKTooZD1jLmxhc3RJbmRleE9mKFwiXFxcXFwiKSxkPj0wP2Muc3Vic3RyKGQrMSk6YykpOlwic3RyaW5nXCI9PXR5cGVvZiBjP2MucmVwbGFjZSgvXFxyL2csXCJcIik6Yyl9LGNoZWNrOmZ1bmN0aW9uKGIpe2I9dGhpcy52YWxpZGF0aW9uVGFyZ2V0Rm9yKHRoaXMuY2xlYW4oYikpO3ZhciBjLGQsZSxmPWEoYikucnVsZXMoKSxnPWEubWFwKGYsZnVuY3Rpb24oYSxiKXtyZXR1cm4gYn0pLmxlbmd0aCxoPSExLGk9dGhpcy5lbGVtZW50VmFsdWUoYik7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZi5ub3JtYWxpemVyKXtpZihpPWYubm9ybWFsaXplci5jYWxsKGIsaSksXCJzdHJpbmdcIiE9dHlwZW9mIGkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBub3JtYWxpemVyIHNob3VsZCByZXR1cm4gYSBzdHJpbmcgdmFsdWUuXCIpO2RlbGV0ZSBmLm5vcm1hbGl6ZXJ9Zm9yKGQgaW4gZil7ZT17bWV0aG9kOmQscGFyYW1ldGVyczpmW2RdfTt0cnl7aWYoYz1hLnZhbGlkYXRvci5tZXRob2RzW2RdLmNhbGwodGhpcyxpLGIsZS5wYXJhbWV0ZXJzKSxcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIj09PWMmJjE9PT1nKXtoPSEwO2NvbnRpbnVlfWlmKGg9ITEsXCJwZW5kaW5nXCI9PT1jKXJldHVybiB2b2lkKHRoaXMudG9IaWRlPXRoaXMudG9IaWRlLm5vdCh0aGlzLmVycm9yc0ZvcihiKSkpO2lmKCFjKXJldHVybiB0aGlzLmZvcm1hdEFuZEFkZChiLGUpLCExfWNhdGNoKGope3Rocm93IHRoaXMuc2V0dGluZ3MuZGVidWcmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLmxvZyhcIkV4Y2VwdGlvbiBvY2N1cnJlZCB3aGVuIGNoZWNraW5nIGVsZW1lbnQgXCIrYi5pZCtcIiwgY2hlY2sgdGhlICdcIitlLm1ldGhvZCtcIicgbWV0aG9kLlwiLGopLGogaW5zdGFuY2VvZiBUeXBlRXJyb3ImJihqLm1lc3NhZ2UrPVwiLiAgRXhjZXB0aW9uIG9jY3VycmVkIHdoZW4gY2hlY2tpbmcgZWxlbWVudCBcIitiLmlkK1wiLCBjaGVjayB0aGUgJ1wiK2UubWV0aG9kK1wiJyBtZXRob2QuXCIpLGp9fWlmKCFoKXJldHVybiB0aGlzLm9iamVjdExlbmd0aChmKSYmdGhpcy5zdWNjZXNzTGlzdC5wdXNoKGIpLCEwfSxjdXN0b21EYXRhTWVzc2FnZTpmdW5jdGlvbihiLGMpe3JldHVybiBhKGIpLmRhdGEoXCJtc2dcIitjLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Muc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpfHxhKGIpLmRhdGEoXCJtc2dcIil9LGN1c3RvbU1lc3NhZ2U6ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLnNldHRpbmdzLm1lc3NhZ2VzW2FdO3JldHVybiBjJiYoYy5jb25zdHJ1Y3Rvcj09PVN0cmluZz9jOmNbYl0pfSxmaW5kRGVmaW5lZDpmdW5jdGlvbigpe2Zvcih2YXIgYT0wO2E8YXJndW1lbnRzLmxlbmd0aDthKyspaWYodm9pZCAwIT09YXJndW1lbnRzW2FdKXJldHVybiBhcmd1bWVudHNbYV19LGRlZmF1bHRNZXNzYWdlOmZ1bmN0aW9uKGIsYyl7XCJzdHJpbmdcIj09dHlwZW9mIGMmJihjPXttZXRob2Q6Y30pO3ZhciBkPXRoaXMuZmluZERlZmluZWQodGhpcy5jdXN0b21NZXNzYWdlKGIubmFtZSxjLm1ldGhvZCksdGhpcy5jdXN0b21EYXRhTWVzc2FnZShiLGMubWV0aG9kKSwhdGhpcy5zZXR0aW5ncy5pZ25vcmVUaXRsZSYmYi50aXRsZXx8dm9pZCAwLGEudmFsaWRhdG9yLm1lc3NhZ2VzW2MubWV0aG9kXSxcIjxzdHJvbmc+V2FybmluZzogTm8gbWVzc2FnZSBkZWZpbmVkIGZvciBcIitiLm5hbWUrXCI8L3N0cm9uZz5cIiksZT0vXFwkP1xceyhcXGQrKVxcfS9nO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGQ/ZD1kLmNhbGwodGhpcyxjLnBhcmFtZXRlcnMsYik6ZS50ZXN0KGQpJiYoZD1hLnZhbGlkYXRvci5mb3JtYXQoZC5yZXBsYWNlKGUsXCJ7JDF9XCIpLGMucGFyYW1ldGVycykpLGR9LGZvcm1hdEFuZEFkZDpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMuZGVmYXVsdE1lc3NhZ2UoYSxiKTt0aGlzLmVycm9yTGlzdC5wdXNoKHttZXNzYWdlOmMsZWxlbWVudDphLG1ldGhvZDpiLm1ldGhvZH0pLHRoaXMuZXJyb3JNYXBbYS5uYW1lXT1jLHRoaXMuc3VibWl0dGVkW2EubmFtZV09Y30sYWRkV3JhcHBlcjpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5zZXR0aW5ncy53cmFwcGVyJiYoYT1hLmFkZChhLnBhcmVudCh0aGlzLnNldHRpbmdzLndyYXBwZXIpKSksYX0sZGVmYXVsdFNob3dFcnJvcnM6ZnVuY3Rpb24oKXt2YXIgYSxiLGM7Zm9yKGE9MDt0aGlzLmVycm9yTGlzdFthXTthKyspYz10aGlzLmVycm9yTGlzdFthXSx0aGlzLnNldHRpbmdzLmhpZ2hsaWdodCYmdGhpcy5zZXR0aW5ncy5oaWdobGlnaHQuY2FsbCh0aGlzLGMuZWxlbWVudCx0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzKSx0aGlzLnNob3dMYWJlbChjLmVsZW1lbnQsYy5tZXNzYWdlKTtpZih0aGlzLmVycm9yTGlzdC5sZW5ndGgmJih0aGlzLnRvU2hvdz10aGlzLnRvU2hvdy5hZGQodGhpcy5jb250YWluZXJzKSksdGhpcy5zZXR0aW5ncy5zdWNjZXNzKWZvcihhPTA7dGhpcy5zdWNjZXNzTGlzdFthXTthKyspdGhpcy5zaG93TGFiZWwodGhpcy5zdWNjZXNzTGlzdFthXSk7aWYodGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodClmb3IoYT0wLGI9dGhpcy52YWxpZEVsZW1lbnRzKCk7YlthXTthKyspdGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodC5jYWxsKHRoaXMsYlthXSx0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzKTt0aGlzLnRvSGlkZT10aGlzLnRvSGlkZS5ub3QodGhpcy50b1Nob3cpLHRoaXMuaGlkZUVycm9ycygpLHRoaXMuYWRkV3JhcHBlcih0aGlzLnRvU2hvdykuc2hvdygpfSx2YWxpZEVsZW1lbnRzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY3VycmVudEVsZW1lbnRzLm5vdCh0aGlzLmludmFsaWRFbGVtZW50cygpKX0saW52YWxpZEVsZW1lbnRzOmZ1bmN0aW9uKCl7cmV0dXJuIGEodGhpcy5lcnJvckxpc3QpLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzLmVsZW1lbnR9KX0sc2hvd0xhYmVsOmZ1bmN0aW9uKGIsYyl7dmFyIGQsZSxmLGcsaD10aGlzLmVycm9yc0ZvcihiKSxpPXRoaXMuaWRPck5hbWUoYiksaj1hKGIpLmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIpO2gubGVuZ3RoPyhoLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKSxoLmh0bWwoYykpOihoPWEoXCI8XCIrdGhpcy5zZXR0aW5ncy5lcnJvckVsZW1lbnQrXCI+XCIpLmF0dHIoXCJpZFwiLGkrXCItZXJyb3JcIikuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKS5odG1sKGN8fFwiXCIpLGQ9aCx0aGlzLnNldHRpbmdzLndyYXBwZXImJihkPWguaGlkZSgpLnNob3coKS53cmFwKFwiPFwiK3RoaXMuc2V0dGluZ3Mud3JhcHBlcitcIi8+XCIpLnBhcmVudCgpKSx0aGlzLmxhYmVsQ29udGFpbmVyLmxlbmd0aD90aGlzLmxhYmVsQ29udGFpbmVyLmFwcGVuZChkKTp0aGlzLnNldHRpbmdzLmVycm9yUGxhY2VtZW50P3RoaXMuc2V0dGluZ3MuZXJyb3JQbGFjZW1lbnQuY2FsbCh0aGlzLGQsYShiKSk6ZC5pbnNlcnRBZnRlcihiKSxoLmlzKFwibGFiZWxcIik/aC5hdHRyKFwiZm9yXCIsaSk6MD09PWgucGFyZW50cyhcImxhYmVsW2Zvcj0nXCIrdGhpcy5lc2NhcGVDc3NNZXRhKGkpK1wiJ11cIikubGVuZ3RoJiYoZj1oLmF0dHIoXCJpZFwiKSxqP2oubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFxiXCIrdGhpcy5lc2NhcGVDc3NNZXRhKGYpK1wiXFxcXGJcIikpfHwoais9XCIgXCIrZik6aj1mLGEoYikuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIixqKSxlPXRoaXMuZ3JvdXBzW2IubmFtZV0sZSYmKGc9dGhpcyxhLmVhY2goZy5ncm91cHMsZnVuY3Rpb24oYixjKXtjPT09ZSYmYShcIltuYW1lPSdcIitnLmVzY2FwZUNzc01ldGEoYikrXCInXVwiLGcuY3VycmVudEZvcm0pLmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsaC5hdHRyKFwiaWRcIikpfSkpKSksIWMmJnRoaXMuc2V0dGluZ3Muc3VjY2VzcyYmKGgudGV4dChcIlwiKSxcInN0cmluZ1wiPT10eXBlb2YgdGhpcy5zZXR0aW5ncy5zdWNjZXNzP2guYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5zdWNjZXNzKTp0aGlzLnNldHRpbmdzLnN1Y2Nlc3MoaCxiKSksdGhpcy50b1Nob3c9dGhpcy50b1Nob3cuYWRkKGgpfSxlcnJvcnNGb3I6ZnVuY3Rpb24oYil7dmFyIGM9dGhpcy5lc2NhcGVDc3NNZXRhKHRoaXMuaWRPck5hbWUoYikpLGQ9YShiKS5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiKSxlPVwibGFiZWxbZm9yPSdcIitjK1wiJ10sIGxhYmVsW2Zvcj0nXCIrYytcIiddICpcIjtyZXR1cm4gZCYmKGU9ZStcIiwgI1wiK3RoaXMuZXNjYXBlQ3NzTWV0YShkKS5yZXBsYWNlKC9cXHMrL2csXCIsICNcIikpLHRoaXMuZXJyb3JzKCkuZmlsdGVyKGUpfSxlc2NhcGVDc3NNZXRhOmZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoLyhbXFxcXCFcIiMkJSYnKCkqKywuLzo7PD0+P0BcXFtcXF1eYHt8fX5dKS9nLFwiXFxcXCQxXCIpfSxpZE9yTmFtZTpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5ncm91cHNbYS5uYW1lXXx8KHRoaXMuY2hlY2thYmxlKGEpP2EubmFtZTphLmlkfHxhLm5hbWUpfSx2YWxpZGF0aW9uVGFyZ2V0Rm9yOmZ1bmN0aW9uKGIpe3JldHVybiB0aGlzLmNoZWNrYWJsZShiKSYmKGI9dGhpcy5maW5kQnlOYW1lKGIubmFtZSkpLGEoYikubm90KHRoaXMuc2V0dGluZ3MuaWdub3JlKVswXX0sY2hlY2thYmxlOmZ1bmN0aW9uKGEpe3JldHVybi9yYWRpb3xjaGVja2JveC9pLnRlc3QoYS50eXBlKX0sZmluZEJ5TmFtZTpmdW5jdGlvbihiKXtyZXR1cm4gYSh0aGlzLmN1cnJlbnRGb3JtKS5maW5kKFwiW25hbWU9J1wiK3RoaXMuZXNjYXBlQ3NzTWV0YShiKStcIiddXCIpfSxnZXRMZW5ndGg6ZnVuY3Rpb24oYixjKXtzd2l0Y2goYy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKXtjYXNlXCJzZWxlY3RcIjpyZXR1cm4gYShcIm9wdGlvbjpzZWxlY3RlZFwiLGMpLmxlbmd0aDtjYXNlXCJpbnB1dFwiOmlmKHRoaXMuY2hlY2thYmxlKGMpKXJldHVybiB0aGlzLmZpbmRCeU5hbWUoYy5uYW1lKS5maWx0ZXIoXCI6Y2hlY2tlZFwiKS5sZW5ndGh9cmV0dXJuIGIubGVuZ3RofSxkZXBlbmQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4hdGhpcy5kZXBlbmRUeXBlc1t0eXBlb2YgYV18fHRoaXMuZGVwZW5kVHlwZXNbdHlwZW9mIGFdKGEsYil9LGRlcGVuZFR5cGVzOntcImJvb2xlYW5cIjpmdW5jdGlvbihhKXtyZXR1cm4gYX0sc3RyaW5nOmZ1bmN0aW9uKGIsYyl7cmV0dXJuISFhKGIsYy5mb3JtKS5sZW5ndGh9LFwiZnVuY3Rpb25cIjpmdW5jdGlvbihhLGIpe3JldHVybiBhKGIpfX0sb3B0aW9uYWw6ZnVuY3Rpb24oYil7dmFyIGM9dGhpcy5lbGVtZW50VmFsdWUoYik7cmV0dXJuIWEudmFsaWRhdG9yLm1ldGhvZHMucmVxdWlyZWQuY2FsbCh0aGlzLGMsYikmJlwiZGVwZW5kZW5jeS1taXNtYXRjaFwifSxzdGFydFJlcXVlc3Q6ZnVuY3Rpb24oYil7dGhpcy5wZW5kaW5nW2IubmFtZV18fCh0aGlzLnBlbmRpbmdSZXF1ZXN0KyssYShiKS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLnBlbmRpbmdDbGFzcyksdGhpcy5wZW5kaW5nW2IubmFtZV09ITApfSxzdG9wUmVxdWVzdDpmdW5jdGlvbihiLGMpe3RoaXMucGVuZGluZ1JlcXVlc3QtLSx0aGlzLnBlbmRpbmdSZXF1ZXN0PDAmJih0aGlzLnBlbmRpbmdSZXF1ZXN0PTApLGRlbGV0ZSB0aGlzLnBlbmRpbmdbYi5uYW1lXSxhKGIpLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MucGVuZGluZ0NsYXNzKSxjJiYwPT09dGhpcy5wZW5kaW5nUmVxdWVzdCYmdGhpcy5mb3JtU3VibWl0dGVkJiZ0aGlzLmZvcm0oKT8oYSh0aGlzLmN1cnJlbnRGb3JtKS5zdWJtaXQoKSx0aGlzLmZvcm1TdWJtaXR0ZWQ9ITEpOiFjJiYwPT09dGhpcy5wZW5kaW5nUmVxdWVzdCYmdGhpcy5mb3JtU3VibWl0dGVkJiYoYSh0aGlzLmN1cnJlbnRGb3JtKS50cmlnZ2VySGFuZGxlcihcImludmFsaWQtZm9ybVwiLFt0aGlzXSksdGhpcy5mb3JtU3VibWl0dGVkPSExKX0scHJldmlvdXNWYWx1ZTpmdW5jdGlvbihiLGMpe3JldHVybiBjPVwic3RyaW5nXCI9PXR5cGVvZiBjJiZjfHxcInJlbW90ZVwiLGEuZGF0YShiLFwicHJldmlvdXNWYWx1ZVwiKXx8YS5kYXRhKGIsXCJwcmV2aW91c1ZhbHVlXCIse29sZDpudWxsLHZhbGlkOiEwLG1lc3NhZ2U6dGhpcy5kZWZhdWx0TWVzc2FnZShiLHttZXRob2Q6Y30pfSl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLnJlc2V0Rm9ybSgpLGEodGhpcy5jdXJyZW50Rm9ybSkub2ZmKFwiLnZhbGlkYXRlXCIpLnJlbW92ZURhdGEoXCJ2YWxpZGF0b3JcIikuZmluZChcIi52YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIikub2ZmKFwiLnZhbGlkYXRlLWVxdWFsVG9cIikucmVtb3ZlQ2xhc3MoXCJ2YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIil9fSxjbGFzc1J1bGVTZXR0aW5nczp7cmVxdWlyZWQ6e3JlcXVpcmVkOiEwfSxlbWFpbDp7ZW1haWw6ITB9LHVybDp7dXJsOiEwfSxkYXRlOntkYXRlOiEwfSxkYXRlSVNPOntkYXRlSVNPOiEwfSxudW1iZXI6e251bWJlcjohMH0sZGlnaXRzOntkaWdpdHM6ITB9LGNyZWRpdGNhcmQ6e2NyZWRpdGNhcmQ6ITB9fSxhZGRDbGFzc1J1bGVzOmZ1bmN0aW9uKGIsYyl7Yi5jb25zdHJ1Y3Rvcj09PVN0cmluZz90aGlzLmNsYXNzUnVsZVNldHRpbmdzW2JdPWM6YS5leHRlbmQodGhpcy5jbGFzc1J1bGVTZXR0aW5ncyxiKX0sY2xhc3NSdWxlczpmdW5jdGlvbihiKXt2YXIgYz17fSxkPWEoYikuYXR0cihcImNsYXNzXCIpO3JldHVybiBkJiZhLmVhY2goZC5zcGxpdChcIiBcIiksZnVuY3Rpb24oKXt0aGlzIGluIGEudmFsaWRhdG9yLmNsYXNzUnVsZVNldHRpbmdzJiZhLmV4dGVuZChjLGEudmFsaWRhdG9yLmNsYXNzUnVsZVNldHRpbmdzW3RoaXNdKX0pLGN9LG5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGU6ZnVuY3Rpb24oYSxiLGMsZCl7L21pbnxtYXh8c3RlcC8udGVzdChjKSYmKG51bGw9PT1ifHwvbnVtYmVyfHJhbmdlfHRleHQvLnRlc3QoYikpJiYoZD1OdW1iZXIoZCksaXNOYU4oZCkmJihkPXZvaWQgMCkpLGR8fDA9PT1kP2FbY109ZDpiPT09YyYmXCJyYW5nZVwiIT09YiYmKGFbY109ITApfSxhdHRyaWJ1dGVSdWxlczpmdW5jdGlvbihiKXt2YXIgYyxkLGU9e30sZj1hKGIpLGc9Yi5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpO2ZvcihjIGluIGEudmFsaWRhdG9yLm1ldGhvZHMpXCJyZXF1aXJlZFwiPT09Yz8oZD1iLmdldEF0dHJpYnV0ZShjKSxcIlwiPT09ZCYmKGQ9ITApLGQ9ISFkKTpkPWYuYXR0cihjKSx0aGlzLm5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGUoZSxnLGMsZCk7cmV0dXJuIGUubWF4bGVuZ3RoJiYvLTF8MjE0NzQ4MzY0N3w1MjQyODgvLnRlc3QoZS5tYXhsZW5ndGgpJiZkZWxldGUgZS5tYXhsZW5ndGgsZX0sZGF0YVJ1bGVzOmZ1bmN0aW9uKGIpe3ZhciBjLGQsZT17fSxmPWEoYiksZz1iLmdldEF0dHJpYnV0ZShcInR5cGVcIik7Zm9yKGMgaW4gYS52YWxpZGF0b3IubWV0aG9kcylkPWYuZGF0YShcInJ1bGVcIitjLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Muc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpLHRoaXMubm9ybWFsaXplQXR0cmlidXRlUnVsZShlLGcsYyxkKTtyZXR1cm4gZX0sc3RhdGljUnVsZXM6ZnVuY3Rpb24oYil7dmFyIGM9e30sZD1hLmRhdGEoYi5mb3JtLFwidmFsaWRhdG9yXCIpO3JldHVybiBkLnNldHRpbmdzLnJ1bGVzJiYoYz1hLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlKGQuc2V0dGluZ3MucnVsZXNbYi5uYW1lXSl8fHt9KSxjfSxub3JtYWxpemVSdWxlczpmdW5jdGlvbihiLGMpe3JldHVybiBhLmVhY2goYixmdW5jdGlvbihkLGUpe2lmKGU9PT0hMSlyZXR1cm4gdm9pZCBkZWxldGUgYltkXTtpZihlLnBhcmFtfHxlLmRlcGVuZHMpe3ZhciBmPSEwO3N3aXRjaCh0eXBlb2YgZS5kZXBlbmRzKXtjYXNlXCJzdHJpbmdcIjpmPSEhYShlLmRlcGVuZHMsYy5mb3JtKS5sZW5ndGg7YnJlYWs7Y2FzZVwiZnVuY3Rpb25cIjpmPWUuZGVwZW5kcy5jYWxsKGMsYyl9Zj9iW2RdPXZvaWQgMD09PWUucGFyYW18fGUucGFyYW06KGEuZGF0YShjLmZvcm0sXCJ2YWxpZGF0b3JcIikucmVzZXRFbGVtZW50cyhhKGMpKSxkZWxldGUgYltkXSl9fSksYS5lYWNoKGIsZnVuY3Rpb24oZCxlKXtiW2RdPWEuaXNGdW5jdGlvbihlKSYmXCJub3JtYWxpemVyXCIhPT1kP2UoYyk6ZX0pLGEuZWFjaChbXCJtaW5sZW5ndGhcIixcIm1heGxlbmd0aFwiXSxmdW5jdGlvbigpe2JbdGhpc10mJihiW3RoaXNdPU51bWJlcihiW3RoaXNdKSl9KSxhLmVhY2goW1wicmFuZ2VsZW5ndGhcIixcInJhbmdlXCJdLGZ1bmN0aW9uKCl7dmFyIGM7Ylt0aGlzXSYmKGEuaXNBcnJheShiW3RoaXNdKT9iW3RoaXNdPVtOdW1iZXIoYlt0aGlzXVswXSksTnVtYmVyKGJbdGhpc11bMV0pXTpcInN0cmluZ1wiPT10eXBlb2YgYlt0aGlzXSYmKGM9Ylt0aGlzXS5yZXBsYWNlKC9bXFxbXFxdXS9nLFwiXCIpLnNwbGl0KC9bXFxzLF0rLyksYlt0aGlzXT1bTnVtYmVyKGNbMF0pLE51bWJlcihjWzFdKV0pKX0pLGEudmFsaWRhdG9yLmF1dG9DcmVhdGVSYW5nZXMmJihudWxsIT1iLm1pbiYmbnVsbCE9Yi5tYXgmJihiLnJhbmdlPVtiLm1pbixiLm1heF0sZGVsZXRlIGIubWluLGRlbGV0ZSBiLm1heCksbnVsbCE9Yi5taW5sZW5ndGgmJm51bGwhPWIubWF4bGVuZ3RoJiYoYi5yYW5nZWxlbmd0aD1bYi5taW5sZW5ndGgsYi5tYXhsZW5ndGhdLGRlbGV0ZSBiLm1pbmxlbmd0aCxkZWxldGUgYi5tYXhsZW5ndGgpKSxifSxub3JtYWxpemVSdWxlOmZ1bmN0aW9uKGIpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiKXt2YXIgYz17fTthLmVhY2goYi5zcGxpdCgvXFxzLyksZnVuY3Rpb24oKXtjW3RoaXNdPSEwfSksYj1jfXJldHVybiBifSxhZGRNZXRob2Q6ZnVuY3Rpb24oYixjLGQpe2EudmFsaWRhdG9yLm1ldGhvZHNbYl09YyxhLnZhbGlkYXRvci5tZXNzYWdlc1tiXT12b2lkIDAhPT1kP2Q6YS52YWxpZGF0b3IubWVzc2FnZXNbYl0sYy5sZW5ndGg8MyYmYS52YWxpZGF0b3IuYWRkQ2xhc3NSdWxlcyhiLGEudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoYikpfSxtZXRob2RzOntyZXF1aXJlZDpmdW5jdGlvbihiLGMsZCl7aWYoIXRoaXMuZGVwZW5kKGQsYykpcmV0dXJuXCJkZXBlbmRlbmN5LW1pc21hdGNoXCI7aWYoXCJzZWxlY3RcIj09PWMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSl7dmFyIGU9YShjKS52YWwoKTtyZXR1cm4gZSYmZS5sZW5ndGg+MH1yZXR1cm4gdGhpcy5jaGVja2FibGUoYyk/dGhpcy5nZXRMZW5ndGgoYixjKT4wOmIubGVuZ3RoPjB9LGVtYWlsOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fC9eW2EtekEtWjAtOS4hIyQlJicqK1xcLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKiQvLnRlc3QoYSl9LHVybDpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHwvXig/Oig/Oig/Omh0dHBzP3xmdHApOik/XFwvXFwvKSg/OlxcUysoPzo6XFxTKik/QCk/KD86KD8hKD86MTB8MTI3KSg/OlxcLlxcZHsxLDN9KXszfSkoPyEoPzoxNjlcXC4yNTR8MTkyXFwuMTY4KSg/OlxcLlxcZHsxLDN9KXsyfSkoPyExNzJcXC4oPzoxWzYtOV18MlxcZHwzWzAtMV0pKD86XFwuXFxkezEsM30pezJ9KSg/OlsxLTldXFxkP3wxXFxkXFxkfDJbMDFdXFxkfDIyWzAtM10pKD86XFwuKD86MT9cXGR7MSwyfXwyWzAtNF1cXGR8MjVbMC01XSkpezJ9KD86XFwuKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNF0pKXwoPzooPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKD86XFwuKD86W2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0tKikqW2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0rKSooPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmXXsyLH0pKS4/KSg/OjpcXGR7Miw1fSk/KD86Wy8/I11cXFMqKT8kL2kudGVzdChhKX0sZGF0ZTpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHwhL0ludmFsaWR8TmFOLy50ZXN0KG5ldyBEYXRlKGEpLnRvU3RyaW5nKCkpfSxkYXRlSVNPOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fC9eXFxkezR9W1xcL1xcLV0oMD9bMS05XXwxWzAxMl0pW1xcL1xcLV0oMD9bMS05XXxbMTJdWzAtOV18M1swMV0pJC8udGVzdChhKX0sbnVtYmVyOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fC9eKD86LT9cXGQrfC0/XFxkezEsM30oPzosXFxkezN9KSspPyg/OlxcLlxcZCspPyQvLnRlc3QoYSl9LGRpZ2l0czpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHwvXlxcZCskLy50ZXN0KGEpfSxtaW5sZW5ndGg6ZnVuY3Rpb24oYixjLGQpe3ZhciBlPWEuaXNBcnJheShiKT9iLmxlbmd0aDp0aGlzLmdldExlbmd0aChiLGMpO3JldHVybiB0aGlzLm9wdGlvbmFsKGMpfHxlPj1kfSxtYXhsZW5ndGg6ZnVuY3Rpb24oYixjLGQpe3ZhciBlPWEuaXNBcnJheShiKT9iLmxlbmd0aDp0aGlzLmdldExlbmd0aChiLGMpO3JldHVybiB0aGlzLm9wdGlvbmFsKGMpfHxlPD1kfSxyYW5nZWxlbmd0aDpmdW5jdGlvbihiLGMsZCl7dmFyIGU9YS5pc0FycmF5KGIpP2IubGVuZ3RoOnRoaXMuZ2V0TGVuZ3RoKGIsYyk7cmV0dXJuIHRoaXMub3B0aW9uYWwoYyl8fGU+PWRbMF0mJmU8PWRbMV19LG1pbjpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fGE+PWN9LG1heDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fGE8PWN9LHJhbmdlOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8YT49Y1swXSYmYTw9Y1sxXX0sc3RlcDpmdW5jdGlvbihiLGMsZCl7dmFyIGUsZj1hKGMpLmF0dHIoXCJ0eXBlXCIpLGc9XCJTdGVwIGF0dHJpYnV0ZSBvbiBpbnB1dCB0eXBlIFwiK2YrXCIgaXMgbm90IHN1cHBvcnRlZC5cIixoPVtcInRleHRcIixcIm51bWJlclwiLFwicmFuZ2VcIl0saT1uZXcgUmVnRXhwKFwiXFxcXGJcIitmK1wiXFxcXGJcIiksaj1mJiYhaS50ZXN0KGguam9pbigpKSxrPWZ1bmN0aW9uKGEpe3ZhciBiPShcIlwiK2EpLm1hdGNoKC8oPzpcXC4oXFxkKykpPyQvKTtyZXR1cm4gYiYmYlsxXT9iWzFdLmxlbmd0aDowfSxsPWZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLnJvdW5kKGEqTWF0aC5wb3coMTAsZSkpfSxtPSEwO2lmKGopdGhyb3cgbmV3IEVycm9yKGcpO3JldHVybiBlPWsoZCksKGsoYik+ZXx8bChiKSVsKGQpIT09MCkmJihtPSExKSx0aGlzLm9wdGlvbmFsKGMpfHxtfSxlcXVhbFRvOmZ1bmN0aW9uKGIsYyxkKXt2YXIgZT1hKGQpO3JldHVybiB0aGlzLnNldHRpbmdzLm9uZm9jdXNvdXQmJmUubm90KFwiLnZhbGlkYXRlLWVxdWFsVG8tYmx1clwiKS5sZW5ndGgmJmUuYWRkQ2xhc3MoXCJ2YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIikub24oXCJibHVyLnZhbGlkYXRlLWVxdWFsVG9cIixmdW5jdGlvbigpe2EoYykudmFsaWQoKX0pLGI9PT1lLnZhbCgpfSxyZW1vdGU6ZnVuY3Rpb24oYixjLGQsZSl7aWYodGhpcy5vcHRpb25hbChjKSlyZXR1cm5cImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtlPVwic3RyaW5nXCI9PXR5cGVvZiBlJiZlfHxcInJlbW90ZVwiO3ZhciBmLGcsaCxpPXRoaXMucHJldmlvdXNWYWx1ZShjLGUpO3JldHVybiB0aGlzLnNldHRpbmdzLm1lc3NhZ2VzW2MubmFtZV18fCh0aGlzLnNldHRpbmdzLm1lc3NhZ2VzW2MubmFtZV09e30pLGkub3JpZ2luYWxNZXNzYWdlPWkub3JpZ2luYWxNZXNzYWdlfHx0aGlzLnNldHRpbmdzLm1lc3NhZ2VzW2MubmFtZV1bZV0sdGhpcy5zZXR0aW5ncy5tZXNzYWdlc1tjLm5hbWVdW2VdPWkubWVzc2FnZSxkPVwic3RyaW5nXCI9PXR5cGVvZiBkJiZ7dXJsOmR9fHxkLGg9YS5wYXJhbShhLmV4dGVuZCh7ZGF0YTpifSxkLmRhdGEpKSxpLm9sZD09PWg/aS52YWxpZDooaS5vbGQ9aCxmPXRoaXMsdGhpcy5zdGFydFJlcXVlc3QoYyksZz17fSxnW2MubmFtZV09YixhLmFqYXgoYS5leHRlbmQoITAse21vZGU6XCJhYm9ydFwiLHBvcnQ6XCJ2YWxpZGF0ZVwiK2MubmFtZSxkYXRhVHlwZTpcImpzb25cIixkYXRhOmcsY29udGV4dDpmLmN1cnJlbnRGb3JtLHN1Y2Nlc3M6ZnVuY3Rpb24oYSl7dmFyIGQsZyxoLGo9YT09PSEwfHxcInRydWVcIj09PWE7Zi5zZXR0aW5ncy5tZXNzYWdlc1tjLm5hbWVdW2VdPWkub3JpZ2luYWxNZXNzYWdlLGo/KGg9Zi5mb3JtU3VibWl0dGVkLGYucmVzZXRJbnRlcm5hbHMoKSxmLnRvSGlkZT1mLmVycm9yc0ZvcihjKSxmLmZvcm1TdWJtaXR0ZWQ9aCxmLnN1Y2Nlc3NMaXN0LnB1c2goYyksZi5pbnZhbGlkW2MubmFtZV09ITEsZi5zaG93RXJyb3JzKCkpOihkPXt9LGc9YXx8Zi5kZWZhdWx0TWVzc2FnZShjLHttZXRob2Q6ZSxwYXJhbWV0ZXJzOmJ9KSxkW2MubmFtZV09aS5tZXNzYWdlPWcsZi5pbnZhbGlkW2MubmFtZV09ITAsZi5zaG93RXJyb3JzKGQpKSxpLnZhbGlkPWosZi5zdG9wUmVxdWVzdChjLGopfX0sZCkpLFwicGVuZGluZ1wiKX19fSk7dmFyIGIsYz17fTtyZXR1cm4gYS5hamF4UHJlZmlsdGVyP2EuYWpheFByZWZpbHRlcihmdW5jdGlvbihhLGIsZCl7dmFyIGU9YS5wb3J0O1wiYWJvcnRcIj09PWEubW9kZSYmKGNbZV0mJmNbZV0uYWJvcnQoKSxjW2VdPWQpfSk6KGI9YS5hamF4LGEuYWpheD1mdW5jdGlvbihkKXt2YXIgZT0oXCJtb2RlXCJpbiBkP2Q6YS5hamF4U2V0dGluZ3MpLm1vZGUsZj0oXCJwb3J0XCJpbiBkP2Q6YS5hamF4U2V0dGluZ3MpLnBvcnQ7cmV0dXJuXCJhYm9ydFwiPT09ZT8oY1tmXSYmY1tmXS5hYm9ydCgpLGNbZl09Yi5hcHBseSh0aGlzLGFyZ3VtZW50cyksY1tmXSk6Yi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KSxhfSk7IiwiIWZ1bmN0aW9uKCQpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBGT1VOREFUSU9OX1ZFUlNJT04gPSAnNi4yLjQnO1xuXG4vLyBHbG9iYWwgRm91bmRhdGlvbiBvYmplY3Rcbi8vIFRoaXMgaXMgYXR0YWNoZWQgdG8gdGhlIHdpbmRvdywgb3IgdXNlZCBhcyBhIG1vZHVsZSBmb3IgQU1EL0Jyb3dzZXJpZnlcbnZhciBGb3VuZGF0aW9uID0ge1xuICB2ZXJzaW9uOiBGT1VOREFUSU9OX1ZFUlNJT04sXG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbml0aWFsaXplZCBwbHVnaW5zLlxuICAgKi9cbiAgX3BsdWdpbnM6IHt9LFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgZ2VuZXJhdGVkIHVuaXF1ZSBpZHMgZm9yIHBsdWdpbiBpbnN0YW5jZXNcbiAgICovXG4gIF91dWlkczogW10sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGZvciBSVEwgc3VwcG9ydFxuICAgKi9cbiAgcnRsOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiAkKCdodG1sJykuYXR0cignZGlyJykgPT09ICdydGwnO1xuICB9LFxuICAvKipcbiAgICogRGVmaW5lcyBhIEZvdW5kYXRpb24gcGx1Z2luLCBhZGRpbmcgaXQgdG8gdGhlIGBGb3VuZGF0aW9uYCBuYW1lc3BhY2UgYW5kIHRoZSBsaXN0IG9mIHBsdWdpbnMgdG8gaW5pdGlhbGl6ZSB3aGVuIHJlZmxvd2luZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgcGx1Z2luLlxuICAgKi9cbiAgcGx1Z2luOiBmdW5jdGlvbihwbHVnaW4sIG5hbWUpIHtcbiAgICAvLyBPYmplY3Qga2V5IHRvIHVzZSB3aGVuIGFkZGluZyB0byBnbG9iYWwgRm91bmRhdGlvbiBvYmplY3RcbiAgICAvLyBFeGFtcGxlczogRm91bmRhdGlvbi5SZXZlYWwsIEZvdW5kYXRpb24uT2ZmQ2FudmFzXG4gICAgdmFyIGNsYXNzTmFtZSA9IChuYW1lIHx8IGZ1bmN0aW9uTmFtZShwbHVnaW4pKTtcbiAgICAvLyBPYmplY3Qga2V5IHRvIHVzZSB3aGVuIHN0b3JpbmcgdGhlIHBsdWdpbiwgYWxzbyB1c2VkIHRvIGNyZWF0ZSB0aGUgaWRlbnRpZnlpbmcgZGF0YSBhdHRyaWJ1dGUgZm9yIHRoZSBwbHVnaW5cbiAgICAvLyBFeGFtcGxlczogZGF0YS1yZXZlYWwsIGRhdGEtb2ZmLWNhbnZhc1xuICAgIHZhciBhdHRyTmFtZSAgPSBoeXBoZW5hdGUoY2xhc3NOYW1lKTtcblxuICAgIC8vIEFkZCB0byB0aGUgRm91bmRhdGlvbiBvYmplY3QgYW5kIHRoZSBwbHVnaW5zIGxpc3QgKGZvciByZWZsb3dpbmcpXG4gICAgdGhpcy5fcGx1Z2luc1thdHRyTmFtZV0gPSB0aGlzW2NsYXNzTmFtZV0gPSBwbHVnaW47XG4gIH0sXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogUG9wdWxhdGVzIHRoZSBfdXVpZHMgYXJyYXkgd2l0aCBwb2ludGVycyB0byBlYWNoIGluZGl2aWR1YWwgcGx1Z2luIGluc3RhbmNlLlxuICAgKiBBZGRzIHRoZSBgemZQbHVnaW5gIGRhdGEtYXR0cmlidXRlIHRvIHByb2dyYW1tYXRpY2FsbHkgY3JlYXRlZCBwbHVnaW5zIHRvIGFsbG93IHVzZSBvZiAkKHNlbGVjdG9yKS5mb3VuZGF0aW9uKG1ldGhvZCkgY2FsbHMuXG4gICAqIEFsc28gZmlyZXMgdGhlIGluaXRpYWxpemF0aW9uIGV2ZW50IGZvciBlYWNoIHBsdWdpbiwgY29uc29saWRhdGluZyByZXBldGl0aXZlIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBhbiBpbnN0YW5jZSBvZiBhIHBsdWdpbiwgdXN1YWxseSBgdGhpc2AgaW4gY29udGV4dC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgcGx1Z2luLCBwYXNzZWQgYXMgYSBjYW1lbENhc2VkIHN0cmluZy5cbiAgICogQGZpcmVzIFBsdWdpbiNpbml0XG4gICAqL1xuICByZWdpc3RlclBsdWdpbjogZnVuY3Rpb24ocGx1Z2luLCBuYW1lKXtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IG5hbWUgPyBoeXBoZW5hdGUobmFtZSkgOiBmdW5jdGlvbk5hbWUocGx1Z2luLmNvbnN0cnVjdG9yKS50b0xvd2VyQ2FzZSgpO1xuICAgIHBsdWdpbi51dWlkID0gdGhpcy5HZXRZb0RpZ2l0cyg2LCBwbHVnaW5OYW1lKTtcblxuICAgIGlmKCFwbHVnaW4uJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkpeyBwbHVnaW4uJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgcGx1Z2luLnV1aWQpOyB9XG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpKXsgcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgcGx1Z2luKTsgfVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgaW5pdGlhbGl6ZWQuXG4gICAgICAgICAgICogQGV2ZW50IFBsdWdpbiNpbml0XG4gICAgICAgICAgICovXG4gICAgcGx1Z2luLiRlbGVtZW50LnRyaWdnZXIoYGluaXQuemYuJHtwbHVnaW5OYW1lfWApO1xuXG4gICAgdGhpcy5fdXVpZHMucHVzaChwbHVnaW4udXVpZCk7XG5cbiAgICByZXR1cm47XG4gIH0sXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogUmVtb3ZlcyB0aGUgcGx1Z2lucyB1dWlkIGZyb20gdGhlIF91dWlkcyBhcnJheS5cbiAgICogUmVtb3ZlcyB0aGUgemZQbHVnaW4gZGF0YSBhdHRyaWJ1dGUsIGFzIHdlbGwgYXMgdGhlIGRhdGEtcGx1Z2luLW5hbWUgYXR0cmlidXRlLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBkZXN0cm95ZWQgZXZlbnQgZm9yIHRoZSBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBmaXJlcyBQbHVnaW4jZGVzdHJveWVkXG4gICAqL1xuICB1bnJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4pe1xuICAgIHZhciBwbHVnaW5OYW1lID0gaHlwaGVuYXRlKGZ1bmN0aW9uTmFtZShwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nKS5jb25zdHJ1Y3RvcikpO1xuXG4gICAgdGhpcy5fdXVpZHMuc3BsaWNlKHRoaXMuX3V1aWRzLmluZGV4T2YocGx1Z2luLnV1aWQpLCAxKTtcbiAgICBwbHVnaW4uJGVsZW1lbnQucmVtb3ZlQXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkucmVtb3ZlRGF0YSgnemZQbHVnaW4nKVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gICAgICAgICAgICogQGV2ZW50IFBsdWdpbiNkZXN0cm95ZWRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICAudHJpZ2dlcihgZGVzdHJveWVkLnpmLiR7cGx1Z2luTmFtZX1gKTtcbiAgICBmb3IodmFyIHByb3AgaW4gcGx1Z2luKXtcbiAgICAgIHBsdWdpbltwcm9wXSA9IG51bGw7Ly9jbGVhbiB1cCBzY3JpcHQgdG8gcHJlcCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgIH1cbiAgICByZXR1cm47XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBDYXVzZXMgb25lIG9yIG1vcmUgYWN0aXZlIHBsdWdpbnMgdG8gcmUtaW5pdGlhbGl6ZSwgcmVzZXR0aW5nIGV2ZW50IGxpc3RlbmVycywgcmVjYWxjdWxhdGluZyBwb3NpdGlvbnMsIGV0Yy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHBsdWdpbnMgLSBvcHRpb25hbCBzdHJpbmcgb2YgYW4gaW5kaXZpZHVhbCBwbHVnaW4ga2V5LCBhdHRhaW5lZCBieSBjYWxsaW5nIGAkKGVsZW1lbnQpLmRhdGEoJ3BsdWdpbk5hbWUnKWAsIG9yIHN0cmluZyBvZiBhIHBsdWdpbiBjbGFzcyBpLmUuIGAnZHJvcGRvd24nYFxuICAgKiBAZGVmYXVsdCBJZiBubyBhcmd1bWVudCBpcyBwYXNzZWQsIHJlZmxvdyBhbGwgY3VycmVudGx5IGFjdGl2ZSBwbHVnaW5zLlxuICAgKi9cbiAgIHJlSW5pdDogZnVuY3Rpb24ocGx1Z2lucyl7XG4gICAgIHZhciBpc0pRID0gcGx1Z2lucyBpbnN0YW5jZW9mICQ7XG4gICAgIHRyeXtcbiAgICAgICBpZihpc0pRKXtcbiAgICAgICAgIHBsdWdpbnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ3pmUGx1Z2luJykuX2luaXQoKTtcbiAgICAgICAgIH0pO1xuICAgICAgIH1lbHNle1xuICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgcGx1Z2lucyxcbiAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgIGZucyA9IHtcbiAgICAgICAgICAgJ29iamVjdCc6IGZ1bmN0aW9uKHBsZ3Mpe1xuICAgICAgICAgICAgIHBsZ3MuZm9yRWFjaChmdW5jdGlvbihwKXtcbiAgICAgICAgICAgICAgIHAgPSBoeXBoZW5hdGUocCk7XG4gICAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICdzdHJpbmcnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHBsdWdpbnMgPSBoeXBoZW5hdGUocGx1Z2lucyk7XG4gICAgICAgICAgICAgJCgnW2RhdGEtJysgcGx1Z2lucyArJ10nKS5mb3VuZGF0aW9uKCdfaW5pdCcpO1xuICAgICAgICAgICB9LFxuICAgICAgICAgICAndW5kZWZpbmVkJzogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICB0aGlzWydvYmplY3QnXShPYmplY3Qua2V5cyhfdGhpcy5fcGx1Z2lucykpO1xuICAgICAgICAgICB9XG4gICAgICAgICB9O1xuICAgICAgICAgZm5zW3R5cGVdKHBsdWdpbnMpO1xuICAgICAgIH1cbiAgICAgfWNhdGNoKGVycil7XG4gICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICB9ZmluYWxseXtcbiAgICAgICByZXR1cm4gcGx1Z2lucztcbiAgICAgfVxuICAgfSxcblxuICAvKipcbiAgICogcmV0dXJucyBhIHJhbmRvbSBiYXNlLTM2IHVpZCB3aXRoIG5hbWVzcGFjaW5nXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIC0gbnVtYmVyIG9mIHJhbmRvbSBiYXNlLTM2IGRpZ2l0cyBkZXNpcmVkLiBJbmNyZWFzZSBmb3IgbW9yZSByYW5kb20gc3RyaW5ncy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSAtIG5hbWUgb2YgcGx1Z2luIHRvIGJlIGluY29ycG9yYXRlZCBpbiB1aWQsIG9wdGlvbmFsLlxuICAgKiBAZGVmYXVsdCB7U3RyaW5nfSAnJyAtIGlmIG5vIHBsdWdpbiBuYW1lIGlzIHByb3ZpZGVkLCBub3RoaW5nIGlzIGFwcGVuZGVkIHRvIHRoZSB1aWQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IC0gdW5pcXVlIGlkXG4gICAqL1xuICBHZXRZb0RpZ2l0czogZnVuY3Rpb24obGVuZ3RoLCBuYW1lc3BhY2Upe1xuICAgIGxlbmd0aCA9IGxlbmd0aCB8fCA2O1xuICAgIHJldHVybiBNYXRoLnJvdW5kKChNYXRoLnBvdygzNiwgbGVuZ3RoICsgMSkgLSBNYXRoLnJhbmRvbSgpICogTWF0aC5wb3coMzYsIGxlbmd0aCkpKS50b1N0cmluZygzNikuc2xpY2UoMSkgKyAobmFtZXNwYWNlID8gYC0ke25hbWVzcGFjZX1gIDogJycpO1xuICB9LFxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBwbHVnaW5zIG9uIGFueSBlbGVtZW50cyB3aXRoaW4gYGVsZW1gIChhbmQgYGVsZW1gIGl0c2VsZikgdGhhdCBhcmVuJ3QgYWxyZWFkeSBpbml0aWFsaXplZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gLSBqUXVlcnkgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgdG8gY2hlY2sgaW5zaWRlLiBBbHNvIGNoZWNrcyB0aGUgZWxlbWVudCBpdHNlbGYsIHVubGVzcyBpdCdzIHRoZSBgZG9jdW1lbnRgIG9iamVjdC5cbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IHBsdWdpbnMgLSBBIGxpc3Qgb2YgcGx1Z2lucyB0byBpbml0aWFsaXplLiBMZWF2ZSB0aGlzIG91dCB0byBpbml0aWFsaXplIGV2ZXJ5dGhpbmcuXG4gICAqL1xuICByZWZsb3c6IGZ1bmN0aW9uKGVsZW0sIHBsdWdpbnMpIHtcblxuICAgIC8vIElmIHBsdWdpbnMgaXMgdW5kZWZpbmVkLCBqdXN0IGdyYWIgZXZlcnl0aGluZ1xuICAgIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHBsdWdpbnMgPSBPYmplY3Qua2V5cyh0aGlzLl9wbHVnaW5zKTtcbiAgICB9XG4gICAgLy8gSWYgcGx1Z2lucyBpcyBhIHN0cmluZywgY29udmVydCBpdCB0byBhbiBhcnJheSB3aXRoIG9uZSBpdGVtXG4gICAgZWxzZSBpZiAodHlwZW9mIHBsdWdpbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwbHVnaW5zID0gW3BsdWdpbnNdO1xuICAgIH1cblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBwbHVnaW5cbiAgICAkLmVhY2gocGx1Z2lucywgZnVuY3Rpb24oaSwgbmFtZSkge1xuICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHBsdWdpblxuICAgICAgdmFyIHBsdWdpbiA9IF90aGlzLl9wbHVnaW5zW25hbWVdO1xuXG4gICAgICAvLyBMb2NhbGl6ZSB0aGUgc2VhcmNoIHRvIGFsbCBlbGVtZW50cyBpbnNpZGUgZWxlbSwgYXMgd2VsbCBhcyBlbGVtIGl0c2VsZiwgdW5sZXNzIGVsZW0gPT09IGRvY3VtZW50XG4gICAgICB2YXIgJGVsZW0gPSAkKGVsZW0pLmZpbmQoJ1tkYXRhLScrbmFtZSsnXScpLmFkZEJhY2soJ1tkYXRhLScrbmFtZSsnXScpO1xuXG4gICAgICAvLyBGb3IgZWFjaCBwbHVnaW4gZm91bmQsIGluaXRpYWxpemUgaXRcbiAgICAgICRlbGVtLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICAvLyBEb24ndCBkb3VibGUtZGlwIG9uIHBsdWdpbnNcbiAgICAgICAgaWYgKCRlbC5kYXRhKCd6ZlBsdWdpbicpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiVHJpZWQgdG8gaW5pdGlhbGl6ZSBcIituYW1lK1wiIG9uIGFuIGVsZW1lbnQgdGhhdCBhbHJlYWR5IGhhcyBhIEZvdW5kYXRpb24gcGx1Z2luLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZigkZWwuYXR0cignZGF0YS1vcHRpb25zJykpe1xuICAgICAgICAgIHZhciB0aGluZyA9ICRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKS5zcGxpdCgnOycpLmZvckVhY2goZnVuY3Rpb24oZSwgaSl7XG4gICAgICAgICAgICB2YXIgb3B0ID0gZS5zcGxpdCgnOicpLm1hcChmdW5jdGlvbihlbCl7IHJldHVybiBlbC50cmltKCk7IH0pO1xuICAgICAgICAgICAgaWYob3B0WzBdKSBvcHRzW29wdFswXV0gPSBwYXJzZVZhbHVlKG9wdFsxXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICRlbC5kYXRhKCd6ZlBsdWdpbicsIG5ldyBwbHVnaW4oJCh0aGlzKSwgb3B0cykpO1xuICAgICAgICB9Y2F0Y2goZXIpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXIpO1xuICAgICAgICB9ZmluYWxseXtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRGbk5hbWU6IGZ1bmN0aW9uTmFtZSxcbiAgdHJhbnNpdGlvbmVuZDogZnVuY3Rpb24oJGVsZW0pe1xuICAgIHZhciB0cmFuc2l0aW9ucyA9IHtcbiAgICAgICd0cmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgICAnTW96VHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICdPVHJhbnNpdGlvbic6ICdvdHJhbnNpdGlvbmVuZCdcbiAgICB9O1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIGVuZDtcblxuICAgIGZvciAodmFyIHQgaW4gdHJhbnNpdGlvbnMpe1xuICAgICAgaWYgKHR5cGVvZiBlbGVtLnN0eWxlW3RdICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgIGVuZCA9IHRyYW5zaXRpb25zW3RdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihlbmQpe1xuICAgICAgcmV0dXJuIGVuZDtcbiAgICB9ZWxzZXtcbiAgICAgIGVuZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJGVsZW0udHJpZ2dlckhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCBbJGVsZW1dKTtcbiAgICAgIH0sIDEpO1xuICAgICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kJztcbiAgICB9XG4gIH1cbn07XG5cbkZvdW5kYXRpb24udXRpbCA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGZvciBhcHBseWluZyBhIGRlYm91bmNlIGVmZmVjdCB0byBhIGZ1bmN0aW9uIGNhbGwuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgY2FsbGVkIGF0IGVuZCBvZiB0aW1lb3V0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgLSBUaW1lIGluIG1zIHRvIGRlbGF5IHRoZSBjYWxsIG9mIGBmdW5jYC5cbiAgICogQHJldHVybnMgZnVuY3Rpb25cbiAgICovXG4gIHRocm90dGxlOiBmdW5jdGlvbiAoZnVuYywgZGVsYXkpIHtcbiAgICB2YXIgdGltZXIgPSBudWxsO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG4vLyBUT0RPOiBjb25zaWRlciBub3QgbWFraW5nIHRoaXMgYSBqUXVlcnkgZnVuY3Rpb25cbi8vIFRPRE86IG5lZWQgd2F5IHRvIHJlZmxvdyB2cy4gcmUtaW5pdGlhbGl6ZVxuLyoqXG4gKiBUaGUgRm91bmRhdGlvbiBqUXVlcnkgbWV0aG9kLlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IG1ldGhvZCAtIEFuIGFjdGlvbiB0byBwZXJmb3JtIG9uIHRoZSBjdXJyZW50IGpRdWVyeSBvYmplY3QuXG4gKi9cbnZhciBmb3VuZGF0aW9uID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIG1ldGhvZCxcbiAgICAgICRtZXRhID0gJCgnbWV0YS5mb3VuZGF0aW9uLW1xJyksXG4gICAgICAkbm9KUyA9ICQoJy5uby1qcycpO1xuXG4gIGlmKCEkbWV0YS5sZW5ndGgpe1xuICAgICQoJzxtZXRhIGNsYXNzPVwiZm91bmRhdGlvbi1tcVwiPicpLmFwcGVuZFRvKGRvY3VtZW50LmhlYWQpO1xuICB9XG4gIGlmKCRub0pTLmxlbmd0aCl7XG4gICAgJG5vSlMucmVtb3ZlQ2xhc3MoJ25vLWpzJyk7XG4gIH1cblxuICBpZih0eXBlID09PSAndW5kZWZpbmVkJyl7Ly9uZWVkcyB0byBpbml0aWFsaXplIHRoZSBGb3VuZGF0aW9uIG9iamVjdCwgb3IgYW4gaW5kaXZpZHVhbCBwbHVnaW4uXG4gICAgRm91bmRhdGlvbi5NZWRpYVF1ZXJ5Ll9pbml0KCk7XG4gICAgRm91bmRhdGlvbi5yZWZsb3codGhpcyk7XG4gIH1lbHNlIGlmKHR5cGUgPT09ICdzdHJpbmcnKXsvL2FuIGluZGl2aWR1YWwgbWV0aG9kIHRvIGludm9rZSBvbiBhIHBsdWdpbiBvciBncm91cCBvZiBwbHVnaW5zXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpOy8vY29sbGVjdCBhbGwgdGhlIGFyZ3VtZW50cywgaWYgbmVjZXNzYXJ5XG4gICAgdmFyIHBsdWdDbGFzcyA9IHRoaXMuZGF0YSgnemZQbHVnaW4nKTsvL2RldGVybWluZSB0aGUgY2xhc3Mgb2YgcGx1Z2luXG5cbiAgICBpZihwbHVnQ2xhc3MgIT09IHVuZGVmaW5lZCAmJiBwbHVnQ2xhc3NbbWV0aG9kXSAhPT0gdW5kZWZpbmVkKXsvL21ha2Ugc3VyZSBib3RoIHRoZSBjbGFzcyBhbmQgbWV0aG9kIGV4aXN0XG4gICAgICBpZih0aGlzLmxlbmd0aCA9PT0gMSl7Ly9pZiB0aGVyZSdzIG9ubHkgb25lLCBjYWxsIGl0IGRpcmVjdGx5LlxuICAgICAgICAgIHBsdWdDbGFzc1ttZXRob2RdLmFwcGx5KHBsdWdDbGFzcywgYXJncyk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGksIGVsKXsvL290aGVyd2lzZSBsb29wIHRocm91Z2ggdGhlIGpRdWVyeSBjb2xsZWN0aW9uIGFuZCBpbnZva2UgdGhlIG1ldGhvZCBvbiBlYWNoXG4gICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkoJChlbCkuZGF0YSgnemZQbHVnaW4nKSwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1lbHNley8vZXJyb3IgZm9yIG5vIGNsYXNzIG9yIG5vIG1ldGhvZFxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiV2UncmUgc29ycnksICdcIiArIG1ldGhvZCArIFwiJyBpcyBub3QgYW4gYXZhaWxhYmxlIG1ldGhvZCBmb3IgXCIgKyAocGx1Z0NsYXNzID8gZnVuY3Rpb25OYW1lKHBsdWdDbGFzcykgOiAndGhpcyBlbGVtZW50JykgKyAnLicpO1xuICAgIH1cbiAgfWVsc2V7Ly9lcnJvciBmb3IgaW52YWxpZCBhcmd1bWVudCB0eXBlXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgV2UncmUgc29ycnksICR7dHlwZX0gaXMgbm90IGEgdmFsaWQgcGFyYW1ldGVyLiBZb3UgbXVzdCB1c2UgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBtZXRob2QgeW91IHdpc2ggdG8gaW52b2tlLmApO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxud2luZG93LkZvdW5kYXRpb24gPSBGb3VuZGF0aW9uO1xuJC5mbi5mb3VuZGF0aW9uID0gZm91bmRhdGlvbjtcblxuLy8gUG9seWZpbGwgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuKGZ1bmN0aW9uKCkge1xuICBpZiAoIURhdGUubm93IHx8ICF3aW5kb3cuRGF0ZS5ub3cpXG4gICAgd2luZG93LkRhdGUubm93ID0gRGF0ZS5ub3cgPSBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpOyB9O1xuXG4gIHZhciB2ZW5kb3JzID0gWyd3ZWJraXQnLCAnbW96J107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsraSkge1xuICAgICAgdmFyIHZwID0gdmVuZG9yc1tpXTtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdnArJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gKHdpbmRvd1t2cCsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93W3ZwKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXSk7XG4gIH1cbiAgaWYgKC9pUChhZHxob25lfG9kKS4qT1MgNi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICB8fCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAhd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBuZXh0VGltZSA9IE1hdGgubWF4KGxhc3RUaW1lICsgMTYsIG5vdyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhsYXN0VGltZSA9IG5leHRUaW1lKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFRpbWUgLSBub3cpO1xuICAgIH07XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2xlYXJUaW1lb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQb2x5ZmlsbCBmb3IgcGVyZm9ybWFuY2Uubm93LCByZXF1aXJlZCBieSByQUZcbiAgICovXG4gIGlmKCF3aW5kb3cucGVyZm9ybWFuY2UgfHwgIXdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpe1xuICAgIHdpbmRvdy5wZXJmb3JtYW5jZSA9IHtcbiAgICAgIHN0YXJ0OiBEYXRlLm5vdygpLFxuICAgICAgbm93OiBmdW5jdGlvbigpeyByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7IH1cbiAgICB9O1xuICB9XG59KSgpO1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9UaGlzKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDVcbiAgICAgIC8vIGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG4gICAgfVxuXG4gICAgdmFyIGFBcmdzICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgICAgZk5PUCAgICA9IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGZCb3VuZCAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUFxuICAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICAgOiBvVGhpcyxcbiAgICAgICAgICAgICAgICAgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfTtcblxuICAgIGlmICh0aGlzLnByb3RvdHlwZSkge1xuICAgICAgLy8gbmF0aXZlIGZ1bmN0aW9ucyBkb24ndCBoYXZlIGEgcHJvdG90eXBlXG4gICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIH1cbiAgICBmQm91bmQucHJvdG90eXBlID0gbmV3IGZOT1AoKTtcblxuICAgIHJldHVybiBmQm91bmQ7XG4gIH07XG59XG4vLyBQb2x5ZmlsbCB0byBnZXQgdGhlIG5hbWUgb2YgYSBmdW5jdGlvbiBpbiBJRTlcbmZ1bmN0aW9uIGZ1bmN0aW9uTmFtZShmbikge1xuICBpZiAoRnVuY3Rpb24ucHJvdG90eXBlLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uXFxzKFteKF17MSx9KVxcKC87XG4gICAgdmFyIHJlc3VsdHMgPSAoZnVuY05hbWVSZWdleCkuZXhlYygoZm4pLnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiAocmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aCA+IDEpID8gcmVzdWx0c1sxXS50cmltKCkgOiBcIlwiO1xuICB9XG4gIGVsc2UgaWYgKGZuLnByb3RvdHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZuLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGZuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlKHN0cil7XG4gIGlmKC90cnVlLy50ZXN0KHN0cikpIHJldHVybiB0cnVlO1xuICBlbHNlIGlmKC9mYWxzZS8udGVzdChzdHIpKSByZXR1cm4gZmFsc2U7XG4gIGVsc2UgaWYoIWlzTmFOKHN0ciAqIDEpKSByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuLy8gQ29udmVydCBQYXNjYWxDYXNlIHRvIGtlYmFiLWNhc2Vcbi8vIFRoYW5rIHlvdTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvODk1NTU4MFxuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbn0oalF1ZXJ5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuIWZ1bmN0aW9uKCQpIHtcblxuLy8gRGVmYXVsdCBzZXQgb2YgbWVkaWEgcXVlcmllc1xuY29uc3QgZGVmYXVsdFF1ZXJpZXMgPSB7XG4gICdkZWZhdWx0JyA6ICdvbmx5IHNjcmVlbicsXG4gIGxhbmRzY2FwZSA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpJyxcbiAgcG9ydHJhaXQgOiAnb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpJyxcbiAgcmV0aW5hIDogJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIvMSksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDE5MmRwaSksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDJkcHB4KSdcbn07XG5cbnZhciBNZWRpYVF1ZXJ5ID0ge1xuICBxdWVyaWVzOiBbXSxcblxuICBjdXJyZW50OiAnJyxcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1lZGlhIHF1ZXJ5IGhlbHBlciwgYnkgZXh0cmFjdGluZyB0aGUgYnJlYWtwb2ludCBsaXN0IGZyb20gdGhlIENTUyBhbmQgYWN0aXZhdGluZyB0aGUgYnJlYWtwb2ludCB3YXRjaGVyLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZXh0cmFjdGVkU3R5bGVzID0gJCgnLmZvdW5kYXRpb24tbXEnKS5jc3MoJ2ZvbnQtZmFtaWx5Jyk7XG4gICAgdmFyIG5hbWVkUXVlcmllcztcblxuICAgIG5hbWVkUXVlcmllcyA9IHBhcnNlU3R5bGVUb09iamVjdChleHRyYWN0ZWRTdHlsZXMpO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG5hbWVkUXVlcmllcykge1xuICAgICAgaWYobmFtZWRRdWVyaWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc2VsZi5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB2YWx1ZTogYG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke25hbWVkUXVlcmllc1trZXldfSlgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuX2dldEN1cnJlbnRTaXplKCk7XG5cbiAgICB0aGlzLl93YXRjaGVyKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIGlzIGF0IGxlYXN0IGFzIHdpZGUgYXMgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgaWYgaXQncyBzbWFsbGVyLlxuICAgKi9cbiAgYXRMZWFzdChzaXplKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5nZXQoc2l6ZSk7XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlcztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1lZGlhIHF1ZXJ5IG9mIGEgYnJlYWtwb2ludC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gTmFtZSBvZiB0aGUgYnJlYWtwb2ludCB0byBnZXQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd8bnVsbH0gLSBUaGUgbWVkaWEgcXVlcnkgb2YgdGhlIGJyZWFrcG9pbnQsIG9yIGBudWxsYCBpZiB0aGUgYnJlYWtwb2ludCBkb2Vzbid0IGV4aXN0LlxuICAgKi9cbiAgZ2V0KHNpemUpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMucXVlcmllcykge1xuICAgICAgaWYodGhpcy5xdWVyaWVzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcbiAgICAgICAgaWYgKHNpemUgPT09IHF1ZXJ5Lm5hbWUpIHJldHVybiBxdWVyeS52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBicmVha3BvaW50IG5hbWUgYnkgdGVzdGluZyBldmVyeSBicmVha3BvaW50IGFuZCByZXR1cm5pbmcgdGhlIGxhc3Qgb25lIHRvIG1hdGNoICh0aGUgYmlnZ2VzdCBvbmUpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge1N0cmluZ30gTmFtZSBvZiB0aGUgY3VycmVudCBicmVha3BvaW50LlxuICAgKi9cbiAgX2dldEN1cnJlbnRTaXplKCkge1xuICAgIHZhciBtYXRjaGVkO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcblxuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5LnZhbHVlKS5tYXRjaGVzKSB7XG4gICAgICAgIG1hdGNoZWQgPSBxdWVyeTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG1hdGNoZWQgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlZC5uYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWF0Y2hlZDtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgYnJlYWtwb2ludCB3YXRjaGVyLCB3aGljaCBmaXJlcyBhbiBldmVudCBvbiB0aGUgd2luZG93IHdoZW5ldmVyIHRoZSBicmVha3BvaW50IGNoYW5nZXMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3dhdGNoZXIoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuemYubWVkaWFxdWVyeScsICgpID0+IHtcbiAgICAgIHZhciBuZXdTaXplID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKSwgY3VycmVudFNpemUgPSB0aGlzLmN1cnJlbnQ7XG5cbiAgICAgIGlmIChuZXdTaXplICE9PSBjdXJyZW50U2l6ZSkge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGN1cnJlbnQgbWVkaWEgcXVlcnlcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbmV3U2l6ZTtcblxuICAgICAgICAvLyBCcm9hZGNhc3QgdGhlIG1lZGlhIHF1ZXJ5IGNoYW5nZSBvbiB0aGUgd2luZG93XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBbbmV3U2l6ZSwgY3VycmVudFNpemVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuRm91bmRhdGlvbi5NZWRpYVF1ZXJ5ID0gTWVkaWFRdWVyeTtcblxuLy8gbWF0Y2hNZWRpYSgpIHBvbHlmaWxsIC0gVGVzdCBhIENTUyBtZWRpYSB0eXBlL3F1ZXJ5IGluIEpTLlxuLy8gQXV0aG9ycyAmIGNvcHlyaWdodCAoYykgMjAxMjogU2NvdHQgSmVobCwgUGF1bCBJcmlzaCwgTmljaG9sYXMgWmFrYXMsIERhdmlkIEtuaWdodC4gRHVhbCBNSVQvQlNEIGxpY2Vuc2VcbndpbmRvdy5tYXRjaE1lZGlhIHx8ICh3aW5kb3cubWF0Y2hNZWRpYSA9IGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gRm9yIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBtYXRjaE1lZGl1bSBhcGkgc3VjaCBhcyBJRSA5IGFuZCB3ZWJraXRcbiAgdmFyIHN0eWxlTWVkaWEgPSAod2luZG93LnN0eWxlTWVkaWEgfHwgd2luZG93Lm1lZGlhKTtcblxuICAvLyBGb3IgdGhvc2UgdGhhdCBkb24ndCBzdXBwb3J0IG1hdGNoTWVkaXVtXG4gIGlmICghc3R5bGVNZWRpYSkge1xuICAgIHZhciBzdHlsZSAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSxcbiAgICBzY3JpcHQgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXSxcbiAgICBpbmZvICAgICAgICA9IG51bGw7XG5cbiAgICBzdHlsZS50eXBlICA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGUuaWQgICAgPSAnbWF0Y2htZWRpYWpzLXRlc3QnO1xuXG4gICAgc2NyaXB0ICYmIHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdHlsZSwgc2NyaXB0KTtcblxuICAgIC8vICdzdHlsZS5jdXJyZW50U3R5bGUnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlJyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgaW5mbyA9ICgnZ2V0Q29tcHV0ZWRTdHlsZScgaW4gd2luZG93KSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzdHlsZSwgbnVsbCkgfHwgc3R5bGUuY3VycmVudFN0eWxlO1xuXG4gICAgc3R5bGVNZWRpYSA9IHtcbiAgICAgIG1hdGNoTWVkaXVtKG1lZGlhKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gYEBtZWRpYSAke21lZGlhfXsgI21hdGNobWVkaWFqcy10ZXN0IHsgd2lkdGg6IDFweDsgfSB9YDtcblxuICAgICAgICAvLyAnc3R5bGUuc3R5bGVTaGVldCcgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnc3R5bGUudGV4dENvbnRlbnQnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSB0ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRlc3QgaWYgbWVkaWEgcXVlcnkgaXMgdHJ1ZSBvciBmYWxzZVxuICAgICAgICByZXR1cm4gaW5mby53aWR0aCA9PT0gJzFweCc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG1lZGlhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hdGNoZXM6IHN0eWxlTWVkaWEubWF0Y2hNZWRpdW0obWVkaWEgfHwgJ2FsbCcpLFxuICAgICAgbWVkaWE6IG1lZGlhIHx8ICdhbGwnXG4gICAgfTtcbiAgfVxufSgpKTtcblxuLy8gVGhhbmsgeW91OiBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZ1xuZnVuY3Rpb24gcGFyc2VTdHlsZVRvT2JqZWN0KHN0cikge1xuICB2YXIgc3R5bGVPYmplY3QgPSB7fTtcblxuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3R5bGVPYmplY3Q7XG4gIH1cblxuICBzdHIgPSBzdHIudHJpbSgpLnNsaWNlKDEsIC0xKTsgLy8gYnJvd3NlcnMgcmUtcXVvdGUgc3RyaW5nIHN0eWxlIHZhbHVlc1xuXG4gIGlmICghc3RyKSB7XG4gICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICB9XG5cbiAgc3R5bGVPYmplY3QgPSBzdHIuc3BsaXQoJyYnKS5yZWR1Y2UoZnVuY3Rpb24ocmV0LCBwYXJhbSkge1xuICAgIHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG4gICAgdmFyIGtleSA9IHBhcnRzWzBdO1xuICAgIHZhciB2YWwgPSBwYXJ0c1sxXTtcbiAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcblxuICAgIC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG4gICAgLy8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuICAgIHZhbCA9IHZhbCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuXG4gICAgaWYgKCFyZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0W2tleV0gPSB2YWw7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldFtrZXldKSkge1xuICAgICAgcmV0W2tleV0ucHVzaCh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXRba2V5XSA9IFtyZXRba2V5XSwgdmFsXTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfSwge30pO1xuXG4gIHJldHVybiBzdHlsZU9iamVjdDtcbn1cblxuRm91bmRhdGlvbi5NZWRpYVF1ZXJ5ID0gTWVkaWFRdWVyeTtcblxufShqUXVlcnkpO1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKiBUaGlzIHV0aWwgd2FzIGNyZWF0ZWQgYnkgTWFyaXVzIE9sYmVydHogKlxuICogUGxlYXNlIHRoYW5rIE1hcml1cyBvbiBHaXRIdWIgL293bGJlcnR6ICpcbiAqIG9yIHRoZSB3ZWIgaHR0cDovL3d3dy5tYXJpdXNvbGJlcnR6LmRlLyAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4hZnVuY3Rpb24oJCkge1xuXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgOTogJ1RBQicsXG4gIDEzOiAnRU5URVInLFxuICAyNzogJ0VTQ0FQRScsXG4gIDMyOiAnU1BBQ0UnLFxuICAzNzogJ0FSUk9XX0xFRlQnLFxuICAzODogJ0FSUk9XX1VQJyxcbiAgMzk6ICdBUlJPV19SSUdIVCcsXG4gIDQwOiAnQVJST1dfRE9XTidcbn1cblxudmFyIGNvbW1hbmRzID0ge31cblxudmFyIEtleWJvYXJkID0ge1xuICBrZXlzOiBnZXRLZXlDb2RlcyhrZXlDb2RlcyksXG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgKGtleWJvYXJkKSBldmVudCBhbmQgcmV0dXJucyBhIFN0cmluZyB0aGF0IHJlcHJlc2VudHMgaXRzIGtleVxuICAgKiBDYW4gYmUgdXNlZCBsaWtlIEZvdW5kYXRpb24ucGFyc2VLZXkoZXZlbnQpID09PSBGb3VuZGF0aW9uLmtleXMuU1BBQ0VcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSB0aGUgZXZlbnQgZ2VuZXJhdGVkIGJ5IHRoZSBldmVudCBoYW5kbGVyXG4gICAqIEByZXR1cm4gU3RyaW5nIGtleSAtIFN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIGtleSBwcmVzc2VkXG4gICAqL1xuICBwYXJzZUtleShldmVudCkge1xuICAgIHZhciBrZXkgPSBrZXlDb2Rlc1tldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlXSB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LndoaWNoKS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChldmVudC5zaGlmdEtleSkga2V5ID0gYFNISUZUXyR7a2V5fWA7XG4gICAgaWYgKGV2ZW50LmN0cmxLZXkpIGtleSA9IGBDVFJMXyR7a2V5fWA7XG4gICAgaWYgKGV2ZW50LmFsdEtleSkga2V5ID0gYEFMVF8ke2tleX1gO1xuICAgIHJldHVybiBrZXk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGdpdmVuIChrZXlib2FyZCkgZXZlbnRcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSB0aGUgZXZlbnQgZ2VuZXJhdGVkIGJ5IHRoZSBldmVudCBoYW5kbGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnQgLSBGb3VuZGF0aW9uIGNvbXBvbmVudCdzIG5hbWUsIGUuZy4gU2xpZGVyIG9yIFJldmVhbFxuICAgKiBAcGFyYW0ge09iamVjdHN9IGZ1bmN0aW9ucyAtIGNvbGxlY3Rpb24gb2YgZnVuY3Rpb25zIHRoYXQgYXJlIHRvIGJlIGV4ZWN1dGVkXG4gICAqL1xuICBoYW5kbGVLZXkoZXZlbnQsIGNvbXBvbmVudCwgZnVuY3Rpb25zKSB7XG4gICAgdmFyIGNvbW1hbmRMaXN0ID0gY29tbWFuZHNbY29tcG9uZW50XSxcbiAgICAgIGtleUNvZGUgPSB0aGlzLnBhcnNlS2V5KGV2ZW50KSxcbiAgICAgIGNtZHMsXG4gICAgICBjb21tYW5kLFxuICAgICAgZm47XG5cbiAgICBpZiAoIWNvbW1hbmRMaXN0KSByZXR1cm4gY29uc29sZS53YXJuKCdDb21wb25lbnQgbm90IGRlZmluZWQhJyk7XG5cbiAgICBpZiAodHlwZW9mIGNvbW1hbmRMaXN0Lmx0ciA9PT0gJ3VuZGVmaW5lZCcpIHsgLy8gdGhpcyBjb21wb25lbnQgZG9lcyBub3QgZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIGx0ciBhbmQgcnRsXG4gICAgICAgIGNtZHMgPSBjb21tYW5kTGlzdDsgLy8gdXNlIHBsYWluIGxpc3RcbiAgICB9IGVsc2UgeyAvLyBtZXJnZSBsdHIgYW5kIHJ0bDogaWYgZG9jdW1lbnQgaXMgcnRsLCBydGwgb3ZlcndyaXRlcyBsdHIgYW5kIHZpY2UgdmVyc2FcbiAgICAgICAgaWYgKEZvdW5kYXRpb24ucnRsKCkpIGNtZHMgPSAkLmV4dGVuZCh7fSwgY29tbWFuZExpc3QubHRyLCBjb21tYW5kTGlzdC5ydGwpO1xuXG4gICAgICAgIGVsc2UgY21kcyA9ICQuZXh0ZW5kKHt9LCBjb21tYW5kTGlzdC5ydGwsIGNvbW1hbmRMaXN0Lmx0cik7XG4gICAgfVxuICAgIGNvbW1hbmQgPSBjbWRzW2tleUNvZGVdO1xuXG4gICAgZm4gPSBmdW5jdGlvbnNbY29tbWFuZF07XG4gICAgaWYgKGZuICYmIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBleGVjdXRlIGZ1bmN0aW9uICBpZiBleGlzdHNcbiAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGZuLmFwcGx5KCk7XG4gICAgICBpZiAoZnVuY3Rpb25zLmhhbmRsZWQgfHwgdHlwZW9mIGZ1bmN0aW9ucy5oYW5kbGVkID09PSAnZnVuY3Rpb24nKSB7IC8vIGV4ZWN1dGUgZnVuY3Rpb24gd2hlbiBldmVudCB3YXMgaGFuZGxlZFxuICAgICAgICAgIGZ1bmN0aW9ucy5oYW5kbGVkKHJldHVyblZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZ1bmN0aW9ucy51bmhhbmRsZWQgfHwgdHlwZW9mIGZ1bmN0aW9ucy51bmhhbmRsZWQgPT09ICdmdW5jdGlvbicpIHsgLy8gZXhlY3V0ZSBmdW5jdGlvbiB3aGVuIGV2ZW50IHdhcyBub3QgaGFuZGxlZFxuICAgICAgICAgIGZ1bmN0aW9ucy51bmhhbmRsZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIHRoZSBnaXZlbiBgJGVsZW1lbnRgXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gc2VhcmNoIHdpdGhpblxuICAgKiBAcmV0dXJuIHtqUXVlcnl9ICRmb2N1c2FibGUgLSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzIHdpdGhpbiBgJGVsZW1lbnRgXG4gICAqL1xuICBmaW5kRm9jdXNhYmxlKCRlbGVtZW50KSB7XG4gICAgcmV0dXJuICRlbGVtZW50LmZpbmQoJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoISQodGhpcykuaXMoJzp2aXNpYmxlJykgfHwgJCh0aGlzKS5hdHRyKCd0YWJpbmRleCcpIDwgMCkgeyByZXR1cm4gZmFsc2U7IH0gLy9vbmx5IGhhdmUgdmlzaWJsZSBlbGVtZW50cyBhbmQgdGhvc2UgdGhhdCBoYXZlIGEgdGFiaW5kZXggZ3JlYXRlciBvciBlcXVhbCAwXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IG5hbWUgbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50IC0gRm91bmRhdGlvbiBjb21wb25lbnQsIGUuZy4gU2xpZGVyIG9yIFJldmVhbFxuICAgKiBAcmV0dXJuIFN0cmluZyBjb21wb25lbnROYW1lXG4gICAqL1xuXG4gIHJlZ2lzdGVyKGNvbXBvbmVudE5hbWUsIGNtZHMpIHtcbiAgICBjb21tYW5kc1tjb21wb25lbnROYW1lXSA9IGNtZHM7XG4gIH1cbn1cblxuLypcbiAqIENvbnN0YW50cyBmb3IgZWFzaWVyIGNvbXBhcmluZy5cbiAqIENhbiBiZSB1c2VkIGxpa2UgRm91bmRhdGlvbi5wYXJzZUtleShldmVudCkgPT09IEZvdW5kYXRpb24ua2V5cy5TUEFDRVxuICovXG5mdW5jdGlvbiBnZXRLZXlDb2RlcyhrY3MpIHtcbiAgdmFyIGsgPSB7fTtcbiAgZm9yICh2YXIga2MgaW4ga2NzKSBrW2tjc1trY11dID0ga2NzW2tjXTtcbiAgcmV0dXJuIGs7XG59XG5cbkZvdW5kYXRpb24uS2V5Ym9hcmQgPSBLZXlib2FyZDtcblxufShqUXVlcnkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4hZnVuY3Rpb24oJCkge1xuXG5Gb3VuZGF0aW9uLkJveCA9IHtcbiAgSW1Ob3RUb3VjaGluZ1lvdTogSW1Ob3RUb3VjaGluZ1lvdSxcbiAgR2V0RGltZW5zaW9uczogR2V0RGltZW5zaW9ucyxcbiAgR2V0T2Zmc2V0czogR2V0T2Zmc2V0c1xufVxuXG4vKipcbiAqIENvbXBhcmVzIHRoZSBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQgdG8gYSBjb250YWluZXIgYW5kIGRldGVybWluZXMgY29sbGlzaW9uIGV2ZW50cyB3aXRoIGNvbnRhaW5lci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIHRlc3QgZm9yIGNvbGxpc2lvbnMuXG4gKiBAcGFyYW0ge2pRdWVyeX0gcGFyZW50IC0galF1ZXJ5IG9iamVjdCB0byB1c2UgYXMgYm91bmRpbmcgY29udGFpbmVyLlxuICogQHBhcmFtIHtCb29sZWFufSBsck9ubHkgLSBzZXQgdG8gdHJ1ZSB0byBjaGVjayBsZWZ0IGFuZCByaWdodCB2YWx1ZXMgb25seS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGJPbmx5IC0gc2V0IHRvIHRydWUgdG8gY2hlY2sgdG9wIGFuZCBib3R0b20gdmFsdWVzIG9ubHkuXG4gKiBAZGVmYXVsdCBpZiBubyBwYXJlbnQgb2JqZWN0IHBhc3NlZCwgZGV0ZWN0cyBjb2xsaXNpb25zIHdpdGggYHdpbmRvd2AuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIGNvbGxpc2lvbiBmcmVlLCBmYWxzZSBpZiBhIGNvbGxpc2lvbiBpbiBhbnkgZGlyZWN0aW9uLlxuICovXG5mdW5jdGlvbiBJbU5vdFRvdWNoaW5nWW91KGVsZW1lbnQsIHBhcmVudCwgbHJPbmx5LCB0Yk9ubHkpIHtcbiAgdmFyIGVsZURpbXMgPSBHZXREaW1lbnNpb25zKGVsZW1lbnQpLFxuICAgICAgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0O1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICB2YXIgcGFyRGltcyA9IEdldERpbWVuc2lvbnMocGFyZW50KTtcblxuICAgIGJvdHRvbSA9IChlbGVEaW1zLm9mZnNldC50b3AgKyBlbGVEaW1zLmhlaWdodCA8PSBwYXJEaW1zLmhlaWdodCArIHBhckRpbXMub2Zmc2V0LnRvcCk7XG4gICAgdG9wICAgID0gKGVsZURpbXMub2Zmc2V0LnRvcCA+PSBwYXJEaW1zLm9mZnNldC50b3ApO1xuICAgIGxlZnQgICA9IChlbGVEaW1zLm9mZnNldC5sZWZ0ID49IHBhckRpbXMub2Zmc2V0LmxlZnQpO1xuICAgIHJpZ2h0ICA9IChlbGVEaW1zLm9mZnNldC5sZWZ0ICsgZWxlRGltcy53aWR0aCA8PSBwYXJEaW1zLndpZHRoICsgcGFyRGltcy5vZmZzZXQubGVmdCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYm90dG9tID0gKGVsZURpbXMub2Zmc2V0LnRvcCArIGVsZURpbXMuaGVpZ2h0IDw9IGVsZURpbXMud2luZG93RGltcy5oZWlnaHQgKyBlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcCk7XG4gICAgdG9wICAgID0gKGVsZURpbXMub2Zmc2V0LnRvcCA+PSBlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcCk7XG4gICAgbGVmdCAgID0gKGVsZURpbXMub2Zmc2V0LmxlZnQgPj0gZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC5sZWZ0KTtcbiAgICByaWdodCAgPSAoZWxlRGltcy5vZmZzZXQubGVmdCArIGVsZURpbXMud2lkdGggPD0gZWxlRGltcy53aW5kb3dEaW1zLndpZHRoKTtcbiAgfVxuXG4gIHZhciBhbGxEaXJzID0gW2JvdHRvbSwgdG9wLCBsZWZ0LCByaWdodF07XG5cbiAgaWYgKGxyT25seSkge1xuICAgIHJldHVybiBsZWZ0ID09PSByaWdodCA9PT0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0Yk9ubHkpIHtcbiAgICByZXR1cm4gdG9wID09PSBib3R0b20gPT09IHRydWU7XG4gIH1cblxuICByZXR1cm4gYWxsRGlycy5pbmRleE9mKGZhbHNlKSA9PT0gLTE7XG59O1xuXG4vKipcbiAqIFVzZXMgbmF0aXZlIG1ldGhvZHMgdG8gcmV0dXJuIGFuIG9iamVjdCBvZiBkaW1lbnNpb24gdmFsdWVzLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2pRdWVyeSB8fCBIVE1MfSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCBvciBET00gZWxlbWVudCBmb3Igd2hpY2ggdG8gZ2V0IHRoZSBkaW1lbnNpb25zLiBDYW4gYmUgYW55IGVsZW1lbnQgb3RoZXIgdGhhdCBkb2N1bWVudCBvciB3aW5kb3cuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIG5lc3RlZCBvYmplY3Qgb2YgaW50ZWdlciBwaXhlbCB2YWx1ZXNcbiAqIFRPRE8gLSBpZiBlbGVtZW50IGlzIHdpbmRvdywgcmV0dXJuIG9ubHkgdGhvc2UgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBHZXREaW1lbnNpb25zKGVsZW0sIHRlc3Qpe1xuICBlbGVtID0gZWxlbS5sZW5ndGggPyBlbGVtWzBdIDogZWxlbTtcblxuICBpZiAoZWxlbSA9PT0gd2luZG93IHx8IGVsZW0gPT09IGRvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSSdtIHNvcnJ5LCBEYXZlLiBJJ20gYWZyYWlkIEkgY2FuJ3QgZG8gdGhhdC5cIik7XG4gIH1cblxuICB2YXIgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBwYXJSZWN0ID0gZWxlbS5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgd2luUmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB3aW5ZID0gd2luZG93LnBhZ2VZT2Zmc2V0LFxuICAgICAgd2luWCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0b3A6IHJlY3QudG9wICsgd2luWSxcbiAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpblhcbiAgICB9LFxuICAgIHBhcmVudERpbXM6IHtcbiAgICAgIHdpZHRoOiBwYXJSZWN0LndpZHRoLFxuICAgICAgaGVpZ2h0OiBwYXJSZWN0LmhlaWdodCxcbiAgICAgIG9mZnNldDoge1xuICAgICAgICB0b3A6IHBhclJlY3QudG9wICsgd2luWSxcbiAgICAgICAgbGVmdDogcGFyUmVjdC5sZWZ0ICsgd2luWFxuICAgICAgfVxuICAgIH0sXG4gICAgd2luZG93RGltczoge1xuICAgICAgd2lkdGg6IHdpblJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IHdpblJlY3QuaGVpZ2h0LFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHRvcDogd2luWSxcbiAgICAgICAgbGVmdDogd2luWFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHRvcCBhbmQgbGVmdCBpbnRlZ2VyIHBpeGVsIHZhbHVlcyBmb3IgZHluYW1pY2FsbHkgcmVuZGVyZWQgZWxlbWVudHMsXG4gKiBzdWNoIGFzOiBUb29sdGlwLCBSZXZlYWwsIGFuZCBEcm9wZG93blxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgZm9yIHRoZSBlbGVtZW50IGJlaW5nIHBvc2l0aW9uZWQuXG4gKiBAcGFyYW0ge2pRdWVyeX0gYW5jaG9yIC0galF1ZXJ5IG9iamVjdCBmb3IgdGhlIGVsZW1lbnQncyBhbmNob3IgcG9pbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcG9zaXRpb24gLSBhIHN0cmluZyByZWxhdGluZyB0byB0aGUgZGVzaXJlZCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudCwgcmVsYXRpdmUgdG8gaXQncyBhbmNob3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB2T2Zmc2V0IC0gaW50ZWdlciBwaXhlbCB2YWx1ZSBvZiBkZXNpcmVkIHZlcnRpY2FsIHNlcGFyYXRpb24gYmV0d2VlbiBhbmNob3IgYW5kIGVsZW1lbnQuXG4gKiBAcGFyYW0ge051bWJlcn0gaE9mZnNldCAtIGludGVnZXIgcGl4ZWwgdmFsdWUgb2YgZGVzaXJlZCBob3Jpem9udGFsIHNlcGFyYXRpb24gYmV0d2VlbiBhbmNob3IgYW5kIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzT3ZlcmZsb3cgLSBpZiBhIGNvbGxpc2lvbiBldmVudCBpcyBkZXRlY3RlZCwgc2V0cyB0byB0cnVlIHRvIGRlZmF1bHQgdGhlIGVsZW1lbnQgdG8gZnVsbCB3aWR0aCAtIGFueSBkZXNpcmVkIG9mZnNldC5cbiAqIFRPRE8gYWx0ZXIvcmV3cml0ZSB0byB3b3JrIHdpdGggYGVtYCB2YWx1ZXMgYXMgd2VsbC9pbnN0ZWFkIG9mIHBpeGVsc1xuICovXG5mdW5jdGlvbiBHZXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgcG9zaXRpb24sIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpIHtcbiAgdmFyICRlbGVEaW1zID0gR2V0RGltZW5zaW9ucyhlbGVtZW50KSxcbiAgICAgICRhbmNob3JEaW1zID0gYW5jaG9yID8gR2V0RGltZW5zaW9ucyhhbmNob3IpIDogbnVsbDtcblxuICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IChGb3VuZGF0aW9uLnJ0bCgpID8gJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgLSAkZWxlRGltcy53aWR0aCArICRhbmNob3JEaW1zLndpZHRoIDogJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQpLFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3AgLSAoJGVsZURpbXMuaGVpZ2h0ICsgdk9mZnNldClcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgLSAoJGVsZURpbXMud2lkdGggKyBoT2Zmc2V0KSxcbiAgICAgICAgdG9wOiAkYW5jaG9yRGltcy5vZmZzZXQudG9wXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyaWdodCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCArICRhbmNob3JEaW1zLndpZHRoICsgaE9mZnNldCxcbiAgICAgICAgdG9wOiAkYW5jaG9yRGltcy5vZmZzZXQudG9wXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjZW50ZXIgdG9wJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICgkYW5jaG9yRGltcy5vZmZzZXQubGVmdCArICgkYW5jaG9yRGltcy53aWR0aCAvIDIpKSAtICgkZWxlRGltcy53aWR0aCAvIDIpLFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3AgLSAoJGVsZURpbXMuaGVpZ2h0ICsgdk9mZnNldClcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NlbnRlciBib3R0b20nOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogaXNPdmVyZmxvdyA/IGhPZmZzZXQgOiAoKCRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgKCRhbmNob3JEaW1zLndpZHRoIC8gMikpIC0gKCRlbGVEaW1zLndpZHRoIC8gMikpLFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3AgKyAkYW5jaG9yRGltcy5oZWlnaHQgKyB2T2Zmc2V0XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjZW50ZXIgbGVmdCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCAtICgkZWxlRGltcy53aWR0aCArIGhPZmZzZXQpLFxuICAgICAgICB0b3A6ICgkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgKCRhbmNob3JEaW1zLmhlaWdodCAvIDIpKSAtICgkZWxlRGltcy5oZWlnaHQgLyAyKVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY2VudGVyIHJpZ2h0JzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgJGFuY2hvckRpbXMud2lkdGggKyBoT2Zmc2V0ICsgMSxcbiAgICAgICAgdG9wOiAoJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArICgkYW5jaG9yRGltcy5oZWlnaHQgLyAyKSkgLSAoJGVsZURpbXMuaGVpZ2h0IC8gMilcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAoJGVsZURpbXMud2luZG93RGltcy5vZmZzZXQubGVmdCArICgkZWxlRGltcy53aW5kb3dEaW1zLndpZHRoIC8gMikpIC0gKCRlbGVEaW1zLndpZHRoIC8gMiksXG4gICAgICAgIHRvcDogKCRlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcCArICgkZWxlRGltcy53aW5kb3dEaW1zLmhlaWdodCAvIDIpKSAtICgkZWxlRGltcy5oZWlnaHQgLyAyKVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmV2ZWFsJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICgkZWxlRGltcy53aW5kb3dEaW1zLndpZHRoIC0gJGVsZURpbXMud2lkdGgpIC8gMixcbiAgICAgICAgdG9wOiAkZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC50b3AgKyB2T2Zmc2V0XG4gICAgICB9XG4gICAgY2FzZSAncmV2ZWFsIGZ1bGwnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogJGVsZURpbXMud2luZG93RGltcy5vZmZzZXQubGVmdCxcbiAgICAgICAgdG9wOiAkZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC50b3BcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xlZnQgYm90dG9tJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0LFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3AgKyAkYW5jaG9yRGltcy5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyaWdodCBib3R0b20nOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgKyAkYW5jaG9yRGltcy53aWR0aCArIGhPZmZzZXQgLSAkZWxlRGltcy53aWR0aCxcbiAgICAgICAgdG9wOiAkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgJGFuY2hvckRpbXMuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IChGb3VuZGF0aW9uLnJ0bCgpID8gJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgLSAkZWxlRGltcy53aWR0aCArICRhbmNob3JEaW1zLndpZHRoIDogJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgKyBoT2Zmc2V0KSxcbiAgICAgICAgdG9wOiAkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgJGFuY2hvckRpbXMuaGVpZ2h0ICsgdk9mZnNldFxuICAgICAgfVxuICB9XG59XG5cbn0oalF1ZXJ5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuIWZ1bmN0aW9uKCQpIHtcblxuY29uc3QgTXV0YXRpb25PYnNlcnZlciA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBwcmVmaXhlcyA9IFsnV2ViS2l0JywgJ01veicsICdPJywgJ01zJywgJyddO1xuICBmb3IgKHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChgJHtwcmVmaXhlc1tpXX1NdXRhdGlvbk9ic2VydmVyYCBpbiB3aW5kb3cpIHtcbiAgICAgIHJldHVybiB3aW5kb3dbYCR7cHJlZml4ZXNbaV19TXV0YXRpb25PYnNlcnZlcmBdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KCkpO1xuXG5jb25zdCB0cmlnZ2VycyA9IChlbCwgdHlwZSkgPT4ge1xuICBlbC5kYXRhKHR5cGUpLnNwbGl0KCcgJykuZm9yRWFjaChpZCA9PiB7XG4gICAgJChgIyR7aWR9YClbIHR5cGUgPT09ICdjbG9zZScgPyAndHJpZ2dlcicgOiAndHJpZ2dlckhhbmRsZXInXShgJHt0eXBlfS56Zi50cmlnZ2VyYCwgW2VsXSk7XG4gIH0pO1xufTtcbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtb3Blbl0gd2lsbCByZXZlYWwgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG4kKGRvY3VtZW50KS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1vcGVuXScsIGZ1bmN0aW9uKCkge1xuICB0cmlnZ2VycygkKHRoaXMpLCAnb3BlbicpO1xufSk7XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2VdIHdpbGwgY2xvc2UgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG4vLyBJZiB1c2VkIHdpdGhvdXQgYSB2YWx1ZSBvbiBbZGF0YS1jbG9zZV0sIHRoZSBldmVudCB3aWxsIGJ1YmJsZSwgYWxsb3dpbmcgaXQgdG8gY2xvc2UgYSBwYXJlbnQgY29tcG9uZW50LlxuJChkb2N1bWVudCkub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtY2xvc2VdJywgZnVuY3Rpb24oKSB7XG4gIGxldCBpZCA9ICQodGhpcykuZGF0YSgnY2xvc2UnKTtcbiAgaWYgKGlkKSB7XG4gICAgdHJpZ2dlcnMoJCh0aGlzKSwgJ2Nsb3NlJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgJCh0aGlzKS50cmlnZ2VyKCdjbG9zZS56Zi50cmlnZ2VyJyk7XG4gIH1cbn0pO1xuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZV0gd2lsbCB0b2dnbGUgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG4kKGRvY3VtZW50KS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS10b2dnbGVdJywgZnVuY3Rpb24oKSB7XG4gIHRyaWdnZXJzKCQodGhpcyksICd0b2dnbGUnKTtcbn0pO1xuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLWNsb3NhYmxlXSB3aWxsIHJlc3BvbmQgdG8gY2xvc2UuemYudHJpZ2dlciBldmVudHMuXG4kKGRvY3VtZW50KS5vbignY2xvc2UuemYudHJpZ2dlcicsICdbZGF0YS1jbG9zYWJsZV0nLCBmdW5jdGlvbihlKXtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgbGV0IGFuaW1hdGlvbiA9ICQodGhpcykuZGF0YSgnY2xvc2FibGUnKTtcblxuICBpZihhbmltYXRpb24gIT09ICcnKXtcbiAgICBGb3VuZGF0aW9uLk1vdGlvbi5hbmltYXRlT3V0KCQodGhpcyksIGFuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlZC56ZicpO1xuICAgIH0pO1xuICB9ZWxzZXtcbiAgICAkKHRoaXMpLmZhZGVPdXQoKS50cmlnZ2VyKCdjbG9zZWQuemYnKTtcbiAgfVxufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdmb2N1cy56Zi50cmlnZ2VyIGJsdXIuemYudHJpZ2dlcicsICdbZGF0YS10b2dnbGUtZm9jdXNdJywgZnVuY3Rpb24oKSB7XG4gIGxldCBpZCA9ICQodGhpcykuZGF0YSgndG9nZ2xlLWZvY3VzJyk7XG4gICQoYCMke2lkfWApLnRyaWdnZXJIYW5kbGVyKCd0b2dnbGUuemYudHJpZ2dlcicsIFskKHRoaXMpXSk7XG59KTtcblxuLyoqXG4qIEZpcmVzIG9uY2UgYWZ0ZXIgYWxsIG90aGVyIHNjcmlwdHMgaGF2ZSBsb2FkZWRcbiogQGZ1bmN0aW9uXG4qIEBwcml2YXRlXG4qL1xuJCh3aW5kb3cpLm9uKCdsb2FkJywgKCkgPT4ge1xuICBjaGVja0xpc3RlbmVycygpO1xufSk7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXJzKCkge1xuICBldmVudHNMaXN0ZW5lcigpO1xuICByZXNpemVMaXN0ZW5lcigpO1xuICBzY3JvbGxMaXN0ZW5lcigpO1xuICBjbG9zZW1lTGlzdGVuZXIoKTtcbn1cblxuLy8qKioqKioqKiBvbmx5IGZpcmVzIHRoaXMgZnVuY3Rpb24gb25jZSBvbiBsb2FkLCBpZiB0aGVyZSdzIHNvbWV0aGluZyB0byB3YXRjaCAqKioqKioqKlxuZnVuY3Rpb24gY2xvc2VtZUxpc3RlbmVyKHBsdWdpbk5hbWUpIHtcbiAgdmFyIHlldGlCb3hlcyA9ICQoJ1tkYXRhLXlldGktYm94XScpLFxuICAgICAgcGx1Z05hbWVzID0gWydkcm9wZG93bicsICd0b29sdGlwJywgJ3JldmVhbCddO1xuXG4gIGlmKHBsdWdpbk5hbWUpe1xuICAgIGlmKHR5cGVvZiBwbHVnaW5OYW1lID09PSAnc3RyaW5nJyl7XG4gICAgICBwbHVnTmFtZXMucHVzaChwbHVnaW5OYW1lKTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgcGx1Z2luTmFtZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHBsdWdpbk5hbWVbMF0gPT09ICdzdHJpbmcnKXtcbiAgICAgIHBsdWdOYW1lcy5jb25jYXQocGx1Z2luTmFtZSk7XG4gICAgfWVsc2V7XG4gICAgICBjb25zb2xlLmVycm9yKCdQbHVnaW4gbmFtZXMgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICB9XG4gIGlmKHlldGlCb3hlcy5sZW5ndGgpe1xuICAgIGxldCBsaXN0ZW5lcnMgPSBwbHVnTmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgICByZXR1cm4gYGNsb3NlbWUuemYuJHtuYW1lfWA7XG4gICAgfSkuam9pbignICcpO1xuXG4gICAgJCh3aW5kb3cpLm9mZihsaXN0ZW5lcnMpLm9uKGxpc3RlbmVycywgZnVuY3Rpb24oZSwgcGx1Z2luSWQpe1xuICAgICAgbGV0IHBsdWdpbiA9IGUubmFtZXNwYWNlLnNwbGl0KCcuJylbMF07XG4gICAgICBsZXQgcGx1Z2lucyA9ICQoYFtkYXRhLSR7cGx1Z2lufV1gKS5ub3QoYFtkYXRhLXlldGktYm94PVwiJHtwbHVnaW5JZH1cIl1gKTtcblxuICAgICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgX3RoaXMudHJpZ2dlckhhbmRsZXIoJ2Nsb3NlLnpmLnRyaWdnZXInLCBbX3RoaXNdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUxpc3RlbmVyKGRlYm91bmNlKXtcbiAgbGV0IHRpbWVyLFxuICAgICAgJG5vZGVzID0gJCgnW2RhdGEtcmVzaXplXScpO1xuICBpZigkbm9kZXMubGVuZ3RoKXtcbiAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuemYudHJpZ2dlcicpXG4gICAgLm9uKCdyZXNpemUuemYudHJpZ2dlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmICh0aW1lcikgeyBjbGVhclRpbWVvdXQodGltZXIpOyB9XG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXG4gICAgICAgIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsvL2ZhbGxiYWNrIGZvciBJRSA5XG4gICAgICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL3RyaWdnZXIgYWxsIGxpc3RlbmluZyBlbGVtZW50cyBhbmQgc2lnbmFsIGEgcmVzaXplIGV2ZW50XG4gICAgICAgICRub2Rlcy5hdHRyKCdkYXRhLWV2ZW50cycsIFwicmVzaXplXCIpO1xuICAgICAgfSwgZGVib3VuY2UgfHwgMTApOy8vZGVmYXVsdCB0aW1lIHRvIGVtaXQgcmVzaXplIGV2ZW50XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2Nyb2xsTGlzdGVuZXIoZGVib3VuY2Upe1xuICBsZXQgdGltZXIsXG4gICAgICAkbm9kZXMgPSAkKCdbZGF0YS1zY3JvbGxdJyk7XG4gIGlmKCRub2Rlcy5sZW5ndGgpe1xuICAgICQod2luZG93KS5vZmYoJ3Njcm9sbC56Zi50cmlnZ2VyJylcbiAgICAub24oJ3Njcm9sbC56Zi50cmlnZ2VyJywgZnVuY3Rpb24oZSl7XG4gICAgICBpZih0aW1lcil7IGNsZWFyVGltZW91dCh0aW1lcik7IH1cblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpey8vZmFsbGJhY2sgZm9yIElFIDlcbiAgICAgICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcignc2Nyb2xsbWUuemYudHJpZ2dlcicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vdHJpZ2dlciBhbGwgbGlzdGVuaW5nIGVsZW1lbnRzIGFuZCBzaWduYWwgYSBzY3JvbGwgZXZlbnRcbiAgICAgICAgJG5vZGVzLmF0dHIoJ2RhdGEtZXZlbnRzJywgXCJzY3JvbGxcIik7XG4gICAgICB9LCBkZWJvdW5jZSB8fCAxMCk7Ly9kZWZhdWx0IHRpbWUgdG8gZW1pdCBzY3JvbGwgZXZlbnRcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudHNMaXN0ZW5lcigpIHtcbiAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpeyByZXR1cm4gZmFsc2U7IH1cbiAgbGV0IG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVzaXplXSwgW2RhdGEtc2Nyb2xsXSwgW2RhdGEtbXV0YXRlXScpO1xuXG4gIC8vZWxlbWVudCBjYWxsYmFja1xuICB2YXIgbGlzdGVuaW5nRWxlbWVudHNNdXRhdGlvbiA9IGZ1bmN0aW9uKG11dGF0aW9uUmVjb3Jkc0xpc3QpIHtcbiAgICB2YXIgJHRhcmdldCA9ICQobXV0YXRpb25SZWNvcmRzTGlzdFswXS50YXJnZXQpO1xuICAgIC8vdHJpZ2dlciB0aGUgZXZlbnQgaGFuZGxlciBmb3IgdGhlIGVsZW1lbnQgZGVwZW5kaW5nIG9uIHR5cGVcbiAgICBzd2l0Y2ggKCR0YXJnZXQuYXR0cihcImRhdGEtZXZlbnRzXCIpKSB7XG5cbiAgICAgIGNhc2UgXCJyZXNpemVcIiA6XG4gICAgICAkdGFyZ2V0LnRyaWdnZXJIYW5kbGVyKCdyZXNpemVtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXRdKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwic2Nyb2xsXCIgOlxuICAgICAgJHRhcmdldC50cmlnZ2VySGFuZGxlcignc2Nyb2xsbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LCB3aW5kb3cucGFnZVlPZmZzZXRdKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBjYXNlIFwibXV0YXRlXCIgOlxuICAgICAgLy8gY29uc29sZS5sb2coJ211dGF0ZScsICR0YXJnZXQpO1xuICAgICAgLy8gJHRhcmdldC50cmlnZ2VySGFuZGxlcignbXV0YXRlLnpmLnRyaWdnZXInKTtcbiAgICAgIC8vXG4gICAgICAvLyAvL21ha2Ugc3VyZSB3ZSBkb24ndCBnZXQgc3R1Y2sgaW4gYW4gaW5maW5pdGUgbG9vcCBmcm9tIHNsb3BweSBjb2RlaW5nXG4gICAgICAvLyBpZiAoJHRhcmdldC5pbmRleCgnW2RhdGEtbXV0YXRlXScpID09ICQoXCJbZGF0YS1tdXRhdGVdXCIpLmxlbmd0aC0xKSB7XG4gICAgICAvLyAgIGRvbU11dGF0aW9uT2JzZXJ2ZXIoKTtcbiAgICAgIC8vIH1cbiAgICAgIC8vIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0IDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vbm90aGluZ1xuICAgIH1cbiAgfVxuXG4gIGlmKG5vZGVzLmxlbmd0aCl7XG4gICAgLy9mb3IgZWFjaCBlbGVtZW50IHRoYXQgbmVlZHMgdG8gbGlzdGVuIGZvciByZXNpemluZywgc2Nyb2xsaW5nLCAob3IgY29taW5nIHNvb24gbXV0YXRpb24pIGFkZCBhIHNpbmdsZSBvYnNlcnZlclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IG5vZGVzLmxlbmd0aC0xOyBpKyspIHtcbiAgICAgIGxldCBlbGVtZW50T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uKTtcbiAgICAgIGVsZW1lbnRPYnNlcnZlci5vYnNlcnZlKG5vZGVzW2ldLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogZmFsc2UsIGNoYXJhY3RlckRhdGE6IGZhbHNlLCBzdWJ0cmVlOmZhbHNlLCBhdHRyaWJ1dGVGaWx0ZXI6W1wiZGF0YS1ldmVudHNcIl19KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFtQSF1cbi8vIEZvdW5kYXRpb24uQ2hlY2tXYXRjaGVycyA9IGNoZWNrV2F0Y2hlcnM7XG5Gb3VuZGF0aW9uLklIZWFyWW91ID0gY2hlY2tMaXN0ZW5lcnM7XG4vLyBGb3VuZGF0aW9uLklTZWVZb3UgPSBzY3JvbGxMaXN0ZW5lcjtcbi8vIEZvdW5kYXRpb24uSUZlZWxZb3UgPSBjbG9zZW1lTGlzdGVuZXI7XG5cbn0oalF1ZXJ5KTtcblxuLy8gZnVuY3Rpb24gZG9tTXV0YXRpb25PYnNlcnZlcihkZWJvdW5jZSkge1xuLy8gICAvLyAhISEgVGhpcyBpcyBjb21pbmcgc29vbiBhbmQgbmVlZHMgbW9yZSB3b3JrOyBub3QgYWN0aXZlICAhISEgLy9cbi8vICAgdmFyIHRpbWVyLFxuLy8gICBub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW11dGF0ZV0nKTtcbi8vICAgLy9cbi8vICAgaWYgKG5vZGVzLmxlbmd0aCkge1xuLy8gICAgIC8vIHZhciBNdXRhdGlvbk9ic2VydmVyID0gKGZ1bmN0aW9uICgpIHtcbi8vICAgICAvLyAgIHZhciBwcmVmaXhlcyA9IFsnV2ViS2l0JywgJ01veicsICdPJywgJ01zJywgJyddO1xuLy8gICAgIC8vICAgZm9yICh2YXIgaT0wOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbi8vICAgICAvLyAgICAgaWYgKHByZWZpeGVzW2ldICsgJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuLy8gICAgIC8vICAgICAgIHJldHVybiB3aW5kb3dbcHJlZml4ZXNbaV0gKyAnTXV0YXRpb25PYnNlcnZlciddO1xuLy8gICAgIC8vICAgICB9XG4vLyAgICAgLy8gICB9XG4vLyAgICAgLy8gICByZXR1cm4gZmFsc2U7XG4vLyAgICAgLy8gfSgpKTtcbi8vXG4vL1xuLy8gICAgIC8vZm9yIHRoZSBib2R5LCB3ZSBuZWVkIHRvIGxpc3RlbiBmb3IgYWxsIGNoYW5nZXMgZWZmZWN0aW5nIHRoZSBzdHlsZSBhbmQgY2xhc3MgYXR0cmlidXRlc1xuLy8gICAgIHZhciBib2R5T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihib2R5TXV0YXRpb24pO1xuLy8gICAgIGJvZHlPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiBmYWxzZSwgc3VidHJlZTp0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6W1wic3R5bGVcIiwgXCJjbGFzc1wiXX0pO1xuLy9cbi8vXG4vLyAgICAgLy9ib2R5IGNhbGxiYWNrXG4vLyAgICAgZnVuY3Rpb24gYm9keU11dGF0aW9uKG11dGF0ZSkge1xuLy8gICAgICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIG11dGF0aW9uIGV2ZW50XG4vLyAgICAgICBpZiAodGltZXIpIHsgY2xlYXJUaW1lb3V0KHRpbWVyKTsgfVxuLy9cbi8vICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbi8vICAgICAgICAgYm9keU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbi8vICAgICAgICAgJCgnW2RhdGEtbXV0YXRlXScpLmF0dHIoJ2RhdGEtZXZlbnRzJyxcIm11dGF0ZVwiKTtcbi8vICAgICAgIH0sIGRlYm91bmNlIHx8IDE1MCk7XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG4iLCIndXNlIHN0cmljdCc7XG5cbiFmdW5jdGlvbigkKSB7XG5cbi8qKlxuICogUmV2ZWFsIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5yZXZlYWxcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuYm94XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubW90aW9uIGlmIHVzaW5nIGFuaW1hdGlvbnNcbiAqL1xuXG5jbGFzcyBSZXZlYWwge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXZlYWwuXG4gICAqIEBjbGFzc1xuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gdXNlIGZvciB0aGUgbW9kYWwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9uYWwgcGFyYW1ldGVycy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgUmV2ZWFsLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgRm91bmRhdGlvbi5yZWdpc3RlclBsdWdpbih0aGlzLCAnUmV2ZWFsJyk7XG4gICAgRm91bmRhdGlvbi5LZXlib2FyZC5yZWdpc3RlcignUmV2ZWFsJywge1xuICAgICAgJ0VOVEVSJzogJ29wZW4nLFxuICAgICAgJ1NQQUNFJzogJ29wZW4nLFxuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZScsXG4gICAgICAnVEFCJzogJ3RhYl9mb3J3YXJkJyxcbiAgICAgICdTSElGVF9UQUInOiAndGFiX2JhY2t3YXJkJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtb2RhbCBieSBhZGRpbmcgdGhlIG92ZXJsYXkgYW5kIGNsb3NlIGJ1dHRvbnMsIChpZiBzZWxlY3RlZCkuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB0aGlzLmlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmNhY2hlZCA9IHttcTogRm91bmRhdGlvbi5NZWRpYVF1ZXJ5LmN1cnJlbnR9O1xuICAgIHRoaXMuaXNNb2JpbGUgPSBtb2JpbGVTbmlmZigpO1xuXG4gICAgdGhpcy4kYW5jaG9yID0gJChgW2RhdGEtb3Blbj1cIiR7dGhpcy5pZH1cIl1gKS5sZW5ndGggPyAkKGBbZGF0YS1vcGVuPVwiJHt0aGlzLmlkfVwiXWApIDogJChgW2RhdGEtdG9nZ2xlPVwiJHt0aGlzLmlkfVwiXWApO1xuICAgIHRoaXMuJGFuY2hvci5hdHRyKHtcbiAgICAgICdhcmlhLWNvbnRyb2xzJzogdGhpcy5pZCxcbiAgICAgICdhcmlhLWhhc3BvcHVwJzogdHJ1ZSxcbiAgICAgICd0YWJpbmRleCc6IDBcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnVsbFNjcmVlbiB8fCB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmdWxsJykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5mdWxsU2NyZWVuID0gdHJ1ZTtcbiAgICAgIHRoaXMub3B0aW9ucy5vdmVybGF5ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSAmJiAhdGhpcy4kb3ZlcmxheSkge1xuICAgICAgdGhpcy4kb3ZlcmxheSA9IHRoaXMuX21ha2VPdmVybGF5KHRoaXMuaWQpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7XG4gICAgICAgICdyb2xlJzogJ2RpYWxvZycsXG4gICAgICAgICdhcmlhLWhpZGRlbic6IHRydWUsXG4gICAgICAgICdkYXRhLXlldGktYm94JzogdGhpcy5pZCxcbiAgICAgICAgJ2RhdGEtcmVzaXplJzogdGhpcy5pZFxuICAgIH0pO1xuXG4gICAgaWYodGhpcy4kb3ZlcmxheSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5kZXRhY2goKS5hcHBlbmRUbyh0aGlzLiRvdmVybGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5kZXRhY2goKS5hcHBlbmRUbygkKCdib2R5JykpO1xuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnd2l0aG91dC1vdmVybGF5Jyk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50cygpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmsgJiYgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICggYCMke3RoaXMuaWR9YCkpIHtcbiAgICAgICQod2luZG93KS5vbmUoJ2xvYWQuemYucmV2ZWFsJywgdGhpcy5vcGVuLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG92ZXJsYXkgZGl2IHRvIGRpc3BsYXkgYmVoaW5kIHRoZSBtb2RhbC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tYWtlT3ZlcmxheShpZCkge1xuICAgIHZhciAkb3ZlcmxheSA9ICQoJzxkaXY+PC9kaXY+JylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdyZXZlYWwtb3ZlcmxheScpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygnYm9keScpO1xuICAgIHJldHVybiAkb3ZlcmxheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHBvc2l0aW9uIG9mIG1vZGFsXG4gICAqIFRPRE86ICBGaWd1cmUgb3V0IGlmIHdlIGFjdHVhbGx5IG5lZWQgdG8gY2FjaGUgdGhlc2UgdmFsdWVzIG9yIGlmIGl0IGRvZXNuJ3QgbWF0dGVyXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdXBkYXRlUG9zaXRpb24oKSB7XG4gICAgdmFyIHdpZHRoID0gdGhpcy4kZWxlbWVudC5vdXRlcldpZHRoKCk7XG4gICAgdmFyIG91dGVyV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy4kZWxlbWVudC5vdXRlckhlaWdodCgpO1xuICAgIHZhciBvdXRlckhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICB2YXIgbGVmdCwgdG9wO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaE9mZnNldCA9PT0gJ2F1dG8nKSB7XG4gICAgICBsZWZ0ID0gcGFyc2VJbnQoKG91dGVyV2lkdGggLSB3aWR0aCkgLyAyLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlZnQgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMuaE9mZnNldCwgMTApO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnZPZmZzZXQgPT09ICdhdXRvJykge1xuICAgICAgaWYgKGhlaWdodCA+IG91dGVySGVpZ2h0KSB7XG4gICAgICAgIHRvcCA9IHBhcnNlSW50KE1hdGgubWluKDEwMCwgb3V0ZXJIZWlnaHQgLyAxMCksIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvcCA9IHBhcnNlSW50KChvdXRlckhlaWdodCAtIGhlaWdodCkgLyA0LCAxMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvcCA9IHBhcnNlSW50KHRoaXMub3B0aW9ucy52T2Zmc2V0LCAxMCk7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHt0b3A6IHRvcCArICdweCd9KTtcbiAgICAvLyBvbmx5IHdvcnJ5IGFib3V0IGxlZnQgaWYgd2UgZG9uJ3QgaGF2ZSBhbiBvdmVybGF5IG9yIHdlIGhhdmVhICBob3Jpem9udGFsIG9mZnNldCxcbiAgICAvLyBvdGhlcndpc2Ugd2UncmUgcGVyZmVjdGx5IGluIHRoZSBtaWRkbGVcbiAgICBpZighdGhpcy4kb3ZlcmxheSB8fCAodGhpcy5vcHRpb25zLmhPZmZzZXQgIT09ICdhdXRvJykpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtsZWZ0OiBsZWZ0ICsgJ3B4J30pO1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3Moe21hcmdpbjogJzBweCd9KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgbW9kYWwuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogKGV2ZW50LCAkZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoKGV2ZW50LnRhcmdldCA9PT0gX3RoaXMuJGVsZW1lbnRbMF0pIHx8XG4gICAgICAgICAgICAoJChldmVudC50YXJnZXQpLnBhcmVudHMoJ1tkYXRhLWNsb3NhYmxlXScpWzBdID09PSAkZWxlbWVudCkpIHsgLy8gb25seSBjbG9zZSByZXZlYWwgd2hlbiBpdCdzIGV4cGxpY2l0bHkgY2FsbGVkXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2UuYXBwbHkodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAndG9nZ2xlLnpmLnRyaWdnZXInOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpLFxuICAgICAgJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInOiBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy4kYW5jaG9yLmxlbmd0aCkge1xuICAgICAgdGhpcy4kYW5jaG9yLm9uKCdrZXlkb3duLnpmLnJldmVhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUud2hpY2ggPT09IDEzIHx8IGUud2hpY2ggPT09IDMyKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayAmJiB0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5vZmYoJy56Zi5yZXZlYWwnKS5vbignY2xpY2suemYucmV2ZWFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IF90aGlzLiRlbGVtZW50WzBdIHx8IFxuICAgICAgICAgICQuY29udGFpbnMoX3RoaXMuJGVsZW1lbnRbMF0sIGUudGFyZ2V0KSB8fCBcbiAgICAgICAgICAgICEkLmNvbnRhaW5zKGRvY3VtZW50LCBlLnRhcmdldCkpIHsgXG4gICAgICAgICAgICAgIHJldHVybjsgXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAkKHdpbmRvdykub24oYHBvcHN0YXRlLnpmLnJldmVhbDoke3RoaXMuaWR9YCwgdGhpcy5faGFuZGxlU3RhdGUuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgbW9kYWwgbWV0aG9kcyBvbiBiYWNrL2ZvcndhcmQgYnV0dG9uIGNsaWNrcyBvciBhbnkgb3RoZXIgZXZlbnQgdGhhdCB0cmlnZ2VycyBwb3BzdGF0ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9oYW5kbGVTdGF0ZShlKSB7XG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICggJyMnICsgdGhpcy5pZCkgJiYgIXRoaXMuaXNBY3RpdmUpeyB0aGlzLm9wZW4oKTsgfVxuICAgIGVsc2V7IHRoaXMuY2xvc2UoKTsgfVxuICB9XG5cblxuICAvKipcbiAgICogT3BlbnMgdGhlIG1vZGFsIGNvbnRyb2xsZWQgYnkgYHRoaXMuJGFuY2hvcmAsIGFuZCBjbG9zZXMgYWxsIG90aGVycyBieSBkZWZhdWx0LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIFJldmVhbCNjbG9zZW1lXG4gICAqIEBmaXJlcyBSZXZlYWwjb3BlblxuICAgKi9cbiAgb3BlbigpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICB2YXIgaGFzaCA9IGAjJHt0aGlzLmlkfWA7XG5cbiAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIGhhc2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgLy8gTWFrZSBlbGVtZW50cyBpbnZpc2libGUsIGJ1dCByZW1vdmUgZGlzcGxheTogbm9uZSBzbyB3ZSBjYW4gZ2V0IHNpemUgYW5kIHBvc2l0aW9uaW5nXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJyB9KVxuICAgICAgICAuc2hvdygpXG4gICAgICAgIC5zY3JvbGxUb3AoMCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcyh7J3Zpc2liaWxpdHknOiAnaGlkZGVuJ30pLnNob3coKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmhpZGUoKVxuICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJycgfSk7XG5cbiAgICBpZih0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcyh7J3Zpc2liaWxpdHknOiAnJ30pLmhpZGUoKTtcbiAgICAgIGlmKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2Zhc3QnKSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdmYXN0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3Nsb3cnKSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdzbG93Jyk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5tdWx0aXBsZU9wZW5lZCkge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIG1vZGFsIG9wZW5zLlxuICAgICAgICogQ2xvc2VzIGFueSBvdGhlciBtb2RhbHMgdGhhdCBhcmUgY3VycmVudGx5IG9wZW5cbiAgICAgICAqIEBldmVudCBSZXZlYWwjY2xvc2VtZVxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlbWUuemYucmV2ZWFsJywgdGhpcy5pZCk7XG4gICAgfVxuICAgIC8vIE1vdGlvbiBVSSBtZXRob2Qgb2YgcmV2ZWFsXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb25Jbikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGFmdGVyQW5pbWF0aW9uRm9jdXMoKXtcbiAgICAgICAgX3RoaXMuJGVsZW1lbnRcbiAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiBmYWxzZSxcbiAgICAgICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICBGb3VuZGF0aW9uLk1vdGlvbi5hbmltYXRlSW4odGhpcy4kb3ZlcmxheSwgJ2ZhZGUtaW4nKTtcbiAgICAgIH1cbiAgICAgIEZvdW5kYXRpb24uTW90aW9uLmFuaW1hdGVJbih0aGlzLiRlbGVtZW50LCB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uSW4sICgpID0+IHtcbiAgICAgICAgdGhpcy5mb2N1c2FibGVFbGVtZW50cyA9IEZvdW5kYXRpb24uS2V5Ym9hcmQuZmluZEZvY3VzYWJsZSh0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgYWZ0ZXJBbmltYXRpb25Gb2N1cygpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGpRdWVyeSBtZXRob2Qgb2YgcmV2ZWFsXG4gICAgZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KDApO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxlbWVudC5zaG93KHRoaXMub3B0aW9ucy5zaG93RGVsYXkpO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBhY2Nlc3NpYmlsaXR5XG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmF0dHIoe1xuICAgICAgICAnYXJpYS1oaWRkZW4nOiBmYWxzZSxcbiAgICAgICAgJ3RhYmluZGV4JzogLTFcbiAgICAgIH0pXG4gICAgICAuZm9jdXMoKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIG1vZGFsIGhhcyBzdWNjZXNzZnVsbHkgb3BlbmVkLlxuICAgICAqIEBldmVudCBSZXZlYWwjb3BlblxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignb3Blbi56Zi5yZXZlYWwnKTtcblxuICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsU2Nyb2xsUG9zID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFkZENsYXNzKCdpcy1yZXZlYWwtb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtcmV2ZWFsLW9wZW4nKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2V4dHJhSGFuZGxlcnMoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV4dHJhIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgYm9keSBhbmQgd2luZG93IGlmIG5lY2Vzc2FyeS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9leHRyYUhhbmRsZXJzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5mb2N1c2FibGVFbGVtZW50cyA9IEZvdW5kYXRpb24uS2V5Ym9hcmQuZmluZEZvY3VzYWJsZSh0aGlzLiRlbGVtZW50KTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLm92ZXJsYXkgJiYgdGhpcy5vcHRpb25zLmNsb3NlT25DbGljayAmJiAhdGhpcy5vcHRpb25zLmZ1bGxTY3JlZW4pIHtcbiAgICAgICQoJ2JvZHknKS5vbignY2xpY2suemYucmV2ZWFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IF90aGlzLiRlbGVtZW50WzBdIHx8IFxuICAgICAgICAgICQuY29udGFpbnMoX3RoaXMuJGVsZW1lbnRbMF0sIGUudGFyZ2V0KSB8fCBcbiAgICAgICAgICAgICEkLmNvbnRhaW5zKGRvY3VtZW50LCBlLnRhcmdldCkpIHsgcmV0dXJuOyB9XG4gICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25Fc2MpIHtcbiAgICAgICQod2luZG93KS5vbigna2V5ZG93bi56Zi5yZXZlYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIEZvdW5kYXRpb24uS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdSZXZlYWwnLCB7XG4gICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICBfdGhpcy4kYW5jaG9yLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxvY2sgZm9jdXMgd2l0aGluIG1vZGFsIHdoaWxlIHRhYmJpbmdcbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdrZXlkb3duLnpmLnJldmVhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciAkdGFyZ2V0ID0gJCh0aGlzKTtcbiAgICAgIC8vIGhhbmRsZSBrZXlib2FyZCBldmVudCB3aXRoIGtleWJvYXJkIHV0aWxcbiAgICAgIEZvdW5kYXRpb24uS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdSZXZlYWwnLCB7XG4gICAgICAgIHRhYl9mb3J3YXJkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5mb2N1c2FibGVFbGVtZW50cyA9IEZvdW5kYXRpb24uS2V5Ym9hcmQuZmluZEZvY3VzYWJsZShfdGhpcy4kZWxlbWVudCk7XG4gICAgICAgICAgaWYgKF90aGlzLiRlbGVtZW50LmZpbmQoJzpmb2N1cycpLmlzKF90aGlzLmZvY3VzYWJsZUVsZW1lbnRzLmVxKC0xKSkpIHsgLy8gbGVmdCBtb2RhbCBkb3dud2FyZHMsIHNldHRpbmcgZm9jdXMgdG8gZmlyc3QgZWxlbWVudFxuICAgICAgICAgICAgX3RoaXMuZm9jdXNhYmxlRWxlbWVudHMuZXEoMCkuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoX3RoaXMuZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID09PSAwKSB7IC8vIG5vIGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgdGhlIG1vZGFsIGF0IGFsbCwgcHJldmVudCB0YWJiaW5nIGluIGdlbmVyYWxcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGFiX2JhY2t3YXJkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5mb2N1c2FibGVFbGVtZW50cyA9IEZvdW5kYXRpb24uS2V5Ym9hcmQuZmluZEZvY3VzYWJsZShfdGhpcy4kZWxlbWVudCk7XG4gICAgICAgICAgaWYgKF90aGlzLiRlbGVtZW50LmZpbmQoJzpmb2N1cycpLmlzKF90aGlzLmZvY3VzYWJsZUVsZW1lbnRzLmVxKDApKSB8fCBfdGhpcy4kZWxlbWVudC5pcygnOmZvY3VzJykpIHsgLy8gbGVmdCBtb2RhbCB1cHdhcmRzLCBzZXR0aW5nIGZvY3VzIHRvIGxhc3QgZWxlbWVudFxuICAgICAgICAgICAgX3RoaXMuZm9jdXNhYmxlRWxlbWVudHMuZXEoLTEpLmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKF90aGlzLmZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA9PT0gMCkgeyAvLyBubyBmb2N1c2FibGUgZWxlbWVudHMgaW5zaWRlIHRoZSBtb2RhbCBhdCBhbGwsIHByZXZlbnQgdGFiYmluZyBpbiBnZW5lcmFsXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy4kZWxlbWVudC5maW5kKCc6Zm9jdXMnKS5pcyhfdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1jbG9zZV0nKSkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IC8vIHNldCBmb2N1cyBiYWNrIHRvIGFuY2hvciBpZiBjbG9zZSBidXR0b24gaGFzIGJlZW4gYWN0aXZhdGVkXG4gICAgICAgICAgICAgIF90aGlzLiRhbmNob3IuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5pcyhfdGhpcy5mb2N1c2FibGVFbGVtZW50cykpIHsgLy8gZG9udCd0IHRyaWdnZXIgaWYgYWN1YWwgZWxlbWVudCBoYXMgZm9jdXMgKGkuZS4gaW5wdXRzLCBsaW5rcywgLi4uKVxuICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmNsb3NlT25Fc2MpIHtcbiAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBfdGhpcy4kYW5jaG9yLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVkOiBmdW5jdGlvbihwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBSZXZlYWwjY2xvc2VkXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNBY3RpdmUgfHwgIXRoaXMuJGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIE1vdGlvbiBVSSBtZXRob2Qgb2YgaGlkaW5nXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb25PdXQpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICBGb3VuZGF0aW9uLk1vdGlvbi5hbmltYXRlT3V0KHRoaXMuJG92ZXJsYXksICdmYWRlLW91dCcsIGZpbmlzaFVwKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmaW5pc2hVcCgpO1xuICAgICAgfVxuXG4gICAgICBGb3VuZGF0aW9uLk1vdGlvbi5hbmltYXRlT3V0KHRoaXMuJGVsZW1lbnQsIHRoaXMub3B0aW9ucy5hbmltYXRpb25PdXQpO1xuICAgIH1cbiAgICAvLyBqUXVlcnkgbWV0aG9kIG9mIGhpZGluZ1xuICAgIGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgwLCBmaW5pc2hVcCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZmluaXNoVXAoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy4kZWxlbWVudC5oaWRlKHRoaXMub3B0aW9ucy5oaWRlRGVsYXkpO1xuICAgIH1cblxuICAgIC8vIENvbmRpdGlvbmFscyB0byByZW1vdmUgZXh0cmEgZXZlbnQgbGlzdGVuZXJzIGFkZGVkIG9uIG9wZW5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25Fc2MpIHtcbiAgICAgICQod2luZG93KS5vZmYoJ2tleWRvd24uemYucmV2ZWFsJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMub3ZlcmxheSAmJiB0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKSB7XG4gICAgICAkKCdib2R5Jykub2ZmKCdjbGljay56Zi5yZXZlYWwnKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9mZigna2V5ZG93bi56Zi5yZXZlYWwnKTtcblxuICAgIGZ1bmN0aW9uIGZpbmlzaFVwKCkge1xuICAgICAgaWYgKF90aGlzLmlzTW9iaWxlKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5yZW1vdmVDbGFzcygnaXMtcmV2ZWFsLW9wZW4nKTtcbiAgICAgICAgaWYoX3RoaXMub3JpZ2luYWxTY3JvbGxQb3MpIHtcbiAgICAgICAgICAkKCdib2R5Jykuc2Nyb2xsVG9wKF90aGlzLm9yaWdpbmFsU2Nyb2xsUG9zKTtcbiAgICAgICAgICBfdGhpcy5vcmlnaW5hbFNjcm9sbFBvcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLXJldmVhbC1vcGVuJyk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cbiAgICAgIC8qKlxuICAgICAgKiBGaXJlcyB3aGVuIHRoZSBtb2RhbCBpcyBkb25lIGNsb3NpbmcuXG4gICAgICAqIEBldmVudCBSZXZlYWwjY2xvc2VkXG4gICAgICAqL1xuICAgICAgX3RoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2VkLnpmLnJldmVhbCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUmVzZXRzIHRoZSBtb2RhbCBjb250ZW50XG4gICAgKiBUaGlzIHByZXZlbnRzIGEgcnVubmluZyB2aWRlbyB0byBrZWVwIGdvaW5nIGluIHRoZSBiYWNrZ3JvdW5kXG4gICAgKi9cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlc2V0T25DbG9zZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5odG1sKHRoaXMuJGVsZW1lbnQuaHRtbCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgIGlmIChfdGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKFwiXCIsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xuICAgICAgIH1cbiAgICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIG9wZW4vY2xvc2VkIHN0YXRlIG9mIGEgbW9kYWwuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgYSBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmRUbygkKCdib2R5JykpOyAvLyBtb3ZlICRlbGVtZW50IG91dHNpZGUgb2YgJG92ZXJsYXkgdG8gcHJldmVudCBlcnJvciB1bnJlZ2lzdGVyUGx1Z2luKClcbiAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpLm9mZigpLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLiRlbGVtZW50LmhpZGUoKS5vZmYoKTtcbiAgICB0aGlzLiRhbmNob3Iub2ZmKCcuemYnKTtcbiAgICAkKHdpbmRvdykub2ZmKGAuemYucmV2ZWFsOiR7dGhpcy5pZH1gKTtcblxuICAgIEZvdW5kYXRpb24udW5yZWdpc3RlclBsdWdpbih0aGlzKTtcbiAgfTtcbn1cblxuUmV2ZWFsLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogTW90aW9uLVVJIGNsYXNzIHRvIHVzZSBmb3IgYW5pbWF0ZWQgZWxlbWVudHMuIElmIG5vbmUgdXNlZCwgZGVmYXVsdHMgdG8gc2ltcGxlIHNob3cvaGlkZS5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSAnc2xpZGUtaW4tbGVmdCdcbiAgICovXG4gIGFuaW1hdGlvbkluOiAnJyxcbiAgLyoqXG4gICAqIE1vdGlvbi1VSSBjbGFzcyB0byB1c2UgZm9yIGFuaW1hdGVkIGVsZW1lbnRzLiBJZiBub25lIHVzZWQsIGRlZmF1bHRzIHRvIHNpbXBsZSBzaG93L2hpZGUuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgJ3NsaWRlLW91dC1yaWdodCdcbiAgICovXG4gIGFuaW1hdGlvbk91dDogJycsXG4gIC8qKlxuICAgKiBUaW1lLCBpbiBtcywgdG8gZGVsYXkgdGhlIG9wZW5pbmcgb2YgYSBtb2RhbCBhZnRlciBhIGNsaWNrIGlmIG5vIGFuaW1hdGlvbiB1c2VkLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIDEwXG4gICAqL1xuICBzaG93RGVsYXk6IDAsXG4gIC8qKlxuICAgKiBUaW1lLCBpbiBtcywgdG8gZGVsYXkgdGhlIGNsb3Npbmcgb2YgYSBtb2RhbCBhZnRlciBhIGNsaWNrIGlmIG5vIGFuaW1hdGlvbiB1c2VkLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIDEwXG4gICAqL1xuICBoaWRlRGVsYXk6IDAsXG4gIC8qKlxuICAgKiBBbGxvd3MgYSBjbGljayBvbiB0aGUgYm9keS9vdmVybGF5IHRvIGNsb3NlIHRoZSBtb2RhbC5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSB0cnVlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2s6IHRydWUsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGNsb3NlIGlmIHRoZSB1c2VyIHByZXNzZXMgdGhlIGBFU0NBUEVgIGtleS5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSB0cnVlXG4gICAqL1xuICBjbG9zZU9uRXNjOiB0cnVlLFxuICAvKipcbiAgICogSWYgdHJ1ZSwgYWxsb3dzIG11bHRpcGxlIG1vZGFscyB0byBiZSBkaXNwbGF5ZWQgYXQgb25jZS5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSBmYWxzZVxuICAgKi9cbiAgbXVsdGlwbGVPcGVuZWQ6IGZhbHNlLFxuICAvKipcbiAgICogRGlzdGFuY2UsIGluIHBpeGVscywgdGhlIG1vZGFsIHNob3VsZCBwdXNoIGRvd24gZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JlZW4uXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgYXV0b1xuICAgKi9cbiAgdk9mZnNldDogJ2F1dG8nLFxuICAvKipcbiAgICogRGlzdGFuY2UsIGluIHBpeGVscywgdGhlIG1vZGFsIHNob3VsZCBwdXNoIGluIGZyb20gdGhlIHNpZGUgb2YgdGhlIHNjcmVlbi5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSBhdXRvXG4gICAqL1xuICBoT2Zmc2V0OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGJlIGZ1bGxzY3JlZW4sIGNvbXBsZXRlbHkgYmxvY2tpbmcgb3V0IHRoZSByZXN0IG9mIHRoZSB2aWV3LiBKUyBjaGVja3MgZm9yIHRoaXMgYXMgd2VsbC5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSBmYWxzZVxuICAgKi9cbiAgZnVsbFNjcmVlbjogZmFsc2UsXG4gIC8qKlxuICAgKiBQZXJjZW50YWdlIG9mIHNjcmVlbiBoZWlnaHQgdGhlIG1vZGFsIHNob3VsZCBwdXNoIHVwIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgdmlldy5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSAxMFxuICAgKi9cbiAgYnRtT2Zmc2V0UGN0OiAxMCxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gZ2VuZXJhdGUgYW4gb3ZlcmxheSBkaXYsIHdoaWNoIHdpbGwgY292ZXIgdGhlIHZpZXcgd2hlbiBtb2RhbCBvcGVucy5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSB0cnVlXG4gICAqL1xuICBvdmVybGF5OiB0cnVlLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSBtb2RhbCB0byByZW1vdmUgYW5kIHJlaW5qZWN0IG1hcmt1cCBvbiBjbG9zZS4gU2hvdWxkIGJlIHRydWUgaWYgdXNpbmcgdmlkZW8gZWxlbWVudHMgdy9vIHVzaW5nIHByb3ZpZGVyJ3MgYXBpLCBvdGhlcndpc2UsIHZpZGVvcyB3aWxsIGNvbnRpbnVlIHRvIHBsYXkgaW4gdGhlIGJhY2tncm91bmQuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgZmFsc2VcbiAgICovXG4gIHJlc2V0T25DbG9zZTogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGFsdGVyIHRoZSB1cmwgb24gb3Blbi9jbG9zZSwgYW5kIGFsbG93cyB0aGUgdXNlIG9mIHRoZSBgYmFja2AgYnV0dG9uIHRvIGNsb3NlIG1vZGFscy4gQUxTTywgYWxsb3dzIGEgbW9kYWwgdG8gYXV0by1tYW5pYWNhbGx5IG9wZW4gb24gcGFnZSBsb2FkIElGIHRoZSBoYXNoID09PSB0aGUgbW9kYWwncyB1c2VyLXNldCBpZC5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSBmYWxzZVxuICAgKi9cbiAgZGVlcExpbms6IGZhbHNlXG59O1xuXG4vLyBXaW5kb3cgZXhwb3J0c1xuRm91bmRhdGlvbi5wbHVnaW4oUmV2ZWFsLCAnUmV2ZWFsJyk7XG5cbmZ1bmN0aW9uIGlQaG9uZVNuaWZmKCkge1xuICByZXR1cm4gL2lQKGFkfGhvbmV8b2QpLipPUy8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59XG5cbmZ1bmN0aW9uIGFuZHJvaWRTbmlmZigpIHtcbiAgcmV0dXJuIC9BbmRyb2lkLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbn1cblxuZnVuY3Rpb24gbW9iaWxlU25pZmYoKSB7XG4gIHJldHVybiBpUGhvbmVTbmlmZigpIHx8IGFuZHJvaWRTbmlmZigpO1xufVxuXG59KGpRdWVyeSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbiFmdW5jdGlvbigkKSB7XG5cbi8qKlxuICogRHJvcGRvd24gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLmRyb3Bkb3duXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmJveFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICovXG5cbmNsYXNzIERyb3Bkb3duIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBkcm9wZG93bi5cbiAgICogQGNsYXNzXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYSBkcm9wZG93bi5cbiAgICogICAgICAgIE9iamVjdCBzaG91bGQgYmUgb2YgdGhlIGRyb3Bkb3duIHBhbmVsLCByYXRoZXIgdGhhbiBpdHMgYW5jaG9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIERyb3Bkb3duLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgRm91bmRhdGlvbi5yZWdpc3RlclBsdWdpbih0aGlzLCAnRHJvcGRvd24nKTtcbiAgICBGb3VuZGF0aW9uLktleWJvYXJkLnJlZ2lzdGVyKCdEcm9wZG93bicsIHtcbiAgICAgICdFTlRFUic6ICdvcGVuJyxcbiAgICAgICdTUEFDRSc6ICdvcGVuJyxcbiAgICAgICdFU0NBUEUnOiAnY2xvc2UnLFxuICAgICAgJ1RBQic6ICd0YWJfZm9yd2FyZCcsXG4gICAgICAnU0hJRlRfVEFCJzogJ3RhYl9iYWNrd2FyZCdcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGx1Z2luIGJ5IHNldHRpbmcvY2hlY2tpbmcgb3B0aW9ucyBhbmQgYXR0cmlidXRlcywgYWRkaW5nIGhlbHBlciB2YXJpYWJsZXMsIGFuZCBzYXZpbmcgdGhlIGFuY2hvci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgJGlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuXG4gICAgdGhpcy4kYW5jaG9yID0gJChgW2RhdGEtdG9nZ2xlPVwiJHskaWR9XCJdYCkubGVuZ3RoID8gJChgW2RhdGEtdG9nZ2xlPVwiJHskaWR9XCJdYCkgOiAkKGBbZGF0YS1vcGVuPVwiJHskaWR9XCJdYCk7XG4gICAgdGhpcy4kYW5jaG9yLmF0dHIoe1xuICAgICAgJ2FyaWEtY29udHJvbHMnOiAkaWQsXG4gICAgICAnZGF0YS1pcy1mb2N1cyc6IGZhbHNlLFxuICAgICAgJ2RhdGEteWV0aS1ib3gnOiAkaWQsXG4gICAgICAnYXJpYS1oYXNwb3B1cCc6IHRydWUsXG4gICAgICAnYXJpYS1leHBhbmRlZCc6IGZhbHNlXG5cbiAgICB9KTtcblxuICAgIHRoaXMub3B0aW9ucy5wb3NpdGlvbkNsYXNzID0gdGhpcy5nZXRQb3NpdGlvbkNsYXNzKCk7XG4gICAgdGhpcy5jb3VudGVyID0gNDtcbiAgICB0aGlzLnVzZWRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgJ2RhdGEteWV0aS1ib3gnOiAkaWQsXG4gICAgICAnZGF0YS1yZXNpemUnOiAkaWQsXG4gICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogdGhpcy4kYW5jaG9yWzBdLmlkIHx8IEZvdW5kYXRpb24uR2V0WW9EaWdpdHMoNiwgJ2RkLWFuY2hvcicpXG4gICAgfSk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIHRvIGRldGVybWluZSBjdXJyZW50IG9yaWVudGF0aW9uIG9mIGRyb3Bkb3duIHBhbmUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBwb3NpdGlvbiAtIHN0cmluZyB2YWx1ZSBvZiBhIHBvc2l0aW9uIGNsYXNzLlxuICAgKi9cbiAgZ2V0UG9zaXRpb25DbGFzcygpIHtcbiAgICB2YXIgdmVydGljYWxQb3NpdGlvbiA9IHRoaXMuJGVsZW1lbnRbMF0uY2xhc3NOYW1lLm1hdGNoKC8odG9wfGxlZnR8cmlnaHR8Ym90dG9tKS9nKTtcbiAgICAgICAgdmVydGljYWxQb3NpdGlvbiA9IHZlcnRpY2FsUG9zaXRpb24gPyB2ZXJ0aWNhbFBvc2l0aW9uWzBdIDogJyc7XG4gICAgdmFyIGhvcml6b250YWxQb3NpdGlvbiA9IC9mbG9hdC0oXFxTKykvLmV4ZWModGhpcy4kYW5jaG9yWzBdLmNsYXNzTmFtZSk7XG4gICAgICAgIGhvcml6b250YWxQb3NpdGlvbiA9IGhvcml6b250YWxQb3NpdGlvbiA/IGhvcml6b250YWxQb3NpdGlvblsxXSA6ICcnO1xuICAgIHZhciBwb3NpdGlvbiA9IGhvcml6b250YWxQb3NpdGlvbiA/IGhvcml6b250YWxQb3NpdGlvbiArICcgJyArIHZlcnRpY2FsUG9zaXRpb24gOiB2ZXJ0aWNhbFBvc2l0aW9uO1xuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkanVzdHMgdGhlIGRyb3Bkb3duIHBhbmVzIG9yaWVudGF0aW9uIGJ5IGFkZGluZy9yZW1vdmluZyBwb3NpdGlvbmluZyBjbGFzc2VzLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBvc2l0aW9uIC0gcG9zaXRpb24gY2xhc3MgdG8gcmVtb3ZlLlxuICAgKi9cbiAgX3JlcG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICB0aGlzLnVzZWRQb3NpdGlvbnMucHVzaChwb3NpdGlvbiA/IHBvc2l0aW9uIDogJ2JvdHRvbScpO1xuICAgIC8vZGVmYXVsdCwgdHJ5IHN3aXRjaGluZyB0byBvcHBvc2l0ZSBzaWRlXG4gICAgaWYoIXBvc2l0aW9uICYmICh0aGlzLnVzZWRQb3NpdGlvbnMuaW5kZXhPZigndG9wJykgPCAwKSl7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCd0b3AnKTtcbiAgICB9ZWxzZSBpZihwb3NpdGlvbiA9PT0gJ3RvcCcgJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCdib3R0b20nKSA8IDApKXtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MocG9zaXRpb24pO1xuICAgIH1lbHNlIGlmKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCdyaWdodCcpIDwgMCkpe1xuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhwb3NpdGlvbilcbiAgICAgICAgICAuYWRkQ2xhc3MoJ3JpZ2h0Jyk7XG4gICAgfWVsc2UgaWYocG9zaXRpb24gPT09ICdyaWdodCcgJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCdsZWZ0JykgPCAwKSl7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHBvc2l0aW9uKVxuICAgICAgICAgIC5hZGRDbGFzcygnbGVmdCcpO1xuICAgIH1cblxuICAgIC8vaWYgZGVmYXVsdCBjaGFuZ2UgZGlkbid0IHdvcmssIHRyeSBib3R0b20gb3IgbGVmdCBmaXJzdFxuICAgIGVsc2UgaWYoIXBvc2l0aW9uICYmICh0aGlzLnVzZWRQb3NpdGlvbnMuaW5kZXhPZigndG9wJykgPiAtMSkgJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCdsZWZ0JykgPCAwKSl7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdsZWZ0Jyk7XG4gICAgfWVsc2UgaWYocG9zaXRpb24gPT09ICd0b3AnICYmICh0aGlzLnVzZWRQb3NpdGlvbnMuaW5kZXhPZignYm90dG9tJykgPiAtMSkgJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCdsZWZ0JykgPCAwKSl7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHBvc2l0aW9uKVxuICAgICAgICAgIC5hZGRDbGFzcygnbGVmdCcpO1xuICAgIH1lbHNlIGlmKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCdyaWdodCcpID4gLTEpICYmICh0aGlzLnVzZWRQb3NpdGlvbnMuaW5kZXhPZignYm90dG9tJykgPCAwKSl7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHBvc2l0aW9uKTtcbiAgICB9ZWxzZSBpZihwb3NpdGlvbiA9PT0gJ3JpZ2h0JyAmJiAodGhpcy51c2VkUG9zaXRpb25zLmluZGV4T2YoJ2xlZnQnKSA+IC0xKSAmJiAodGhpcy51c2VkUG9zaXRpb25zLmluZGV4T2YoJ2JvdHRvbScpIDwgMCkpe1xuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhwb3NpdGlvbik7XG4gICAgfVxuICAgIC8vaWYgbm90aGluZyBjbGVhcmVkLCBzZXQgdG8gYm90dG9tXG4gICAgZWxzZXtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MocG9zaXRpb24pO1xuICAgIH1cbiAgICB0aGlzLmNsYXNzQ2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5jb3VudGVyLS07XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcG9zaXRpb24gYW5kIG9yaWVudGF0aW9uIG9mIHRoZSBkcm9wZG93biBwYW5lLCBjaGVja3MgZm9yIGNvbGxpc2lvbnMuXG4gICAqIFJlY3Vyc2l2ZWx5IGNhbGxzIGl0c2VsZiBpZiBhIGNvbGxpc2lvbiBpcyBkZXRlY3RlZCwgd2l0aCBhIG5ldyBwb3NpdGlvbiBjbGFzcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0UG9zaXRpb24oKSB7XG4gICAgaWYodGhpcy4kYW5jaG9yLmF0dHIoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ2ZhbHNlJyl7IHJldHVybiBmYWxzZTsgfVxuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb25DbGFzcygpLFxuICAgICAgICAkZWxlRGltcyA9IEZvdW5kYXRpb24uQm94LkdldERpbWVuc2lvbnModGhpcy4kZWxlbWVudCksXG4gICAgICAgICRhbmNob3JEaW1zID0gRm91bmRhdGlvbi5Cb3guR2V0RGltZW5zaW9ucyh0aGlzLiRhbmNob3IpLFxuICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGRpcmVjdGlvbiA9IChwb3NpdGlvbiA9PT0gJ2xlZnQnID8gJ2xlZnQnIDogKChwb3NpdGlvbiA9PT0gJ3JpZ2h0JykgPyAnbGVmdCcgOiAndG9wJykpLFxuICAgICAgICBwYXJhbSA9IChkaXJlY3Rpb24gPT09ICd0b3AnKSA/ICdoZWlnaHQnIDogJ3dpZHRoJyxcbiAgICAgICAgb2Zmc2V0ID0gKHBhcmFtID09PSAnaGVpZ2h0JykgPyB0aGlzLm9wdGlvbnMudk9mZnNldCA6IHRoaXMub3B0aW9ucy5oT2Zmc2V0O1xuXG5cblxuICAgIGlmKCgkZWxlRGltcy53aWR0aCA+PSAkZWxlRGltcy53aW5kb3dEaW1zLndpZHRoKSB8fCAoIXRoaXMuY291bnRlciAmJiAhRm91bmRhdGlvbi5Cb3guSW1Ob3RUb3VjaGluZ1lvdSh0aGlzLiRlbGVtZW50KSkpe1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmZzZXQoRm91bmRhdGlvbi5Cb3guR2V0T2Zmc2V0cyh0aGlzLiRlbGVtZW50LCB0aGlzLiRhbmNob3IsICdjZW50ZXIgYm90dG9tJywgdGhpcy5vcHRpb25zLnZPZmZzZXQsIHRoaXMub3B0aW9ucy5oT2Zmc2V0LCB0cnVlKSkuY3NzKHtcbiAgICAgICAgJ3dpZHRoJzogJGVsZURpbXMud2luZG93RGltcy53aWR0aCAtICh0aGlzLm9wdGlvbnMuaE9mZnNldCAqIDIpLFxuICAgICAgICAnaGVpZ2h0JzogJ2F1dG8nXG4gICAgICB9KTtcbiAgICAgIHRoaXMuY2xhc3NDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9mZnNldChGb3VuZGF0aW9uLkJveC5HZXRPZmZzZXRzKHRoaXMuJGVsZW1lbnQsIHRoaXMuJGFuY2hvciwgcG9zaXRpb24sIHRoaXMub3B0aW9ucy52T2Zmc2V0LCB0aGlzLm9wdGlvbnMuaE9mZnNldCkpO1xuXG4gICAgd2hpbGUoIUZvdW5kYXRpb24uQm94LkltTm90VG91Y2hpbmdZb3UodGhpcy4kZWxlbWVudCwgZmFsc2UsIHRydWUpICYmIHRoaXMuY291bnRlcil7XG4gICAgICB0aGlzLl9yZXBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgIHRoaXMuX3NldFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBlbGVtZW50IHV0aWxpemluZyB0aGUgdHJpZ2dlcnMgdXRpbGl0eSBsaWJyYXJ5LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLiRlbGVtZW50Lm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSxcbiAgICAgICdyZXNpemVtZS56Zi50cmlnZ2VyJzogdGhpcy5fc2V0UG9zaXRpb24uYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmhvdmVyKXtcbiAgICAgIHRoaXMuJGFuY2hvci5vZmYoJ21vdXNlZW50ZXIuemYuZHJvcGRvd24gbW91c2VsZWF2ZS56Zi5kcm9wZG93bicpXG4gICAgICAub24oJ21vdXNlZW50ZXIuemYuZHJvcGRvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoJCgnYm9keVtkYXRhLXdoYXRpbnB1dD1cIm1vdXNlXCJdJykuaXMoJyonKSkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgIF90aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRhbmNob3IuZGF0YSgnaG92ZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5vbignbW91c2VsZWF2ZS56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XG4gICAgICAgICAgICBfdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICBfdGhpcy4kYW5jaG9yLmRhdGEoJ2hvdmVyJywgZmFsc2UpO1xuICAgICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KTtcbiAgICAgICAgICB9KTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5ob3ZlclBhbmUpe1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9mZignbW91c2VlbnRlci56Zi5kcm9wZG93biBtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJylcbiAgICAgICAgICAgIC5vbignbW91c2VlbnRlci56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgIH0pLm9uKCdtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICBfdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFuY2hvci5kYXRhKCdob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLiRhbmNob3IuYWRkKHRoaXMuJGVsZW1lbnQpLm9uKCdrZXlkb3duLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICB2YXIgJHRhcmdldCA9ICQodGhpcyksXG4gICAgICAgIHZpc2libGVGb2N1c2FibGVFbGVtZW50cyA9IEZvdW5kYXRpb24uS2V5Ym9hcmQuZmluZEZvY3VzYWJsZShfdGhpcy4kZWxlbWVudCk7XG5cbiAgICAgIEZvdW5kYXRpb24uS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdEcm9wZG93bicsIHtcbiAgICAgICAgdGFiX2ZvcndhcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy4kZWxlbWVudC5maW5kKCc6Zm9jdXMnKS5pcyh2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHMuZXEoLTEpKSkgeyAvLyBsZWZ0IG1vZGFsIGRvd253YXJkcywgc2V0dGluZyBmb2N1cyB0byBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy50cmFwRm9jdXMpIHsgLy8gaWYgZm9jdXMgc2hhbGwgYmUgdHJhcHBlZFxuICAgICAgICAgICAgICB2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHMuZXEoMCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8gaWYgZm9jdXMgaXMgbm90IHRyYXBwZWQsIGNsb3NlIGRyb3Bkb3duIG9uIGZvY3VzIG91dFxuICAgICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGFiX2JhY2t3YXJkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJGVsZW1lbnQuZmluZCgnOmZvY3VzJykuaXModmlzaWJsZUZvY3VzYWJsZUVsZW1lbnRzLmVxKDApKSB8fCBfdGhpcy4kZWxlbWVudC5pcygnOmZvY3VzJykpIHsgLy8gbGVmdCBtb2RhbCB1cHdhcmRzLCBzZXR0aW5nIGZvY3VzIHRvIGxhc3QgZWxlbWVudFxuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMudHJhcEZvY3VzKSB7IC8vIGlmIGZvY3VzIHNoYWxsIGJlIHRyYXBwZWRcbiAgICAgICAgICAgICAgdmlzaWJsZUZvY3VzYWJsZUVsZW1lbnRzLmVxKC0xKS5mb2N1cygpO1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBpZiBmb2N1cyBpcyBub3QgdHJhcHBlZCwgY2xvc2UgZHJvcGRvd24gb24gZm9jdXMgb3V0XG4gICAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHRhcmdldC5pcyhfdGhpcy4kYW5jaG9yKSkge1xuICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgX3RoaXMuJGVsZW1lbnQuYXR0cigndGFiaW5kZXgnLCAtMSkuZm9jdXMoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIF90aGlzLiRhbmNob3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBldmVudCBoYW5kbGVyIHRvIHRoZSBib2R5IHRvIGNsb3NlIGFueSBkcm9wZG93bnMgb24gYSBjbGljay5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkQm9keUhhbmRsZXIoKSB7XG4gICAgIHZhciAkYm9keSA9ICQoZG9jdW1lbnQuYm9keSkubm90KHRoaXMuJGVsZW1lbnQpLFxuICAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAkYm9keS5vZmYoJ2NsaWNrLnpmLmRyb3Bkb3duJylcbiAgICAgICAgICAub24oJ2NsaWNrLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihfdGhpcy4kYW5jaG9yLmlzKGUudGFyZ2V0KSB8fCBfdGhpcy4kYW5jaG9yLmZpbmQoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfdGhpcy4kZWxlbWVudC5maW5kKGUudGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICRib2R5Lm9mZignY2xpY2suemYuZHJvcGRvd24nKTtcbiAgICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgZHJvcGRvd24gcGFuZSwgYW5kIGZpcmVzIGEgYnViYmxpbmcgZXZlbnQgdG8gY2xvc2Ugb3RoZXIgZHJvcGRvd25zLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyb3Bkb3duI2Nsb3NlbWVcbiAgICogQGZpcmVzIERyb3Bkb3duI3Nob3dcbiAgICovXG4gIG9wZW4oKSB7XG4gICAgLy8gdmFyIF90aGlzID0gdGhpcztcbiAgICAvKipcbiAgICAgKiBGaXJlcyB0byBjbG9zZSBvdGhlciBvcGVuIGRyb3Bkb3duc1xuICAgICAqIEBldmVudCBEcm9wZG93biNjbG9zZW1lXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjbG9zZW1lLnpmLmRyb3Bkb3duJywgdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpKTtcbiAgICB0aGlzLiRhbmNob3IuYWRkQ2xhc3MoJ2hvdmVyJylcbiAgICAgICAgLmF0dHIoeydhcmlhLWV4cGFuZGVkJzogdHJ1ZX0pO1xuICAgIC8vIHRoaXMuJGVsZW1lbnQvKi5zaG93KCkqLztcbiAgICB0aGlzLl9zZXRQb3NpdGlvbigpO1xuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAuYXR0cih7J2FyaWEtaGlkZGVuJzogZmFsc2V9KTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5hdXRvRm9jdXMpe1xuICAgICAgdmFyICRmb2N1c2FibGUgPSBGb3VuZGF0aW9uLktleWJvYXJkLmZpbmRGb2N1c2FibGUodGhpcy4kZWxlbWVudCk7XG4gICAgICBpZigkZm9jdXNhYmxlLmxlbmd0aCl7XG4gICAgICAgICRmb2N1c2FibGUuZXEoMCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKXsgdGhpcy5fYWRkQm9keUhhbmRsZXIoKTsgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgb25jZSB0aGUgZHJvcGRvd24gaXMgdmlzaWJsZS5cbiAgICAgKiBAZXZlbnQgRHJvcGRvd24jc2hvd1xuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignc2hvdy56Zi5kcm9wZG93bicsIFt0aGlzLiRlbGVtZW50XSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBvcGVuIGRyb3Bkb3duIHBhbmUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJvcGRvd24jaGlkZVxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgaWYoIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAuYXR0cih7J2FyaWEtaGlkZGVuJzogdHJ1ZX0pO1xuXG4gICAgdGhpcy4kYW5jaG9yLnJlbW92ZUNsYXNzKCdob3ZlcicpXG4gICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuXG4gICAgaWYodGhpcy5jbGFzc0NoYW5nZWQpe1xuICAgICAgdmFyIGN1clBvc2l0aW9uQ2xhc3MgPSB0aGlzLmdldFBvc2l0aW9uQ2xhc3MoKTtcbiAgICAgIGlmKGN1clBvc2l0aW9uQ2xhc3Mpe1xuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKGN1clBvc2l0aW9uQ2xhc3MpO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMucG9zaXRpb25DbGFzcylcbiAgICAgICAgICAvKi5oaWRlKCkqLy5jc3Moe2hlaWdodDogJycsIHdpZHRoOiAnJ30pO1xuICAgICAgdGhpcy5jbGFzc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY291bnRlciA9IDQ7XG4gICAgICB0aGlzLnVzZWRQb3NpdGlvbnMubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdoaWRlLnpmLmRyb3Bkb3duJywgW3RoaXMuJGVsZW1lbnRdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBkcm9wZG93biBwYW5lJ3MgdmlzaWJpbGl0eS5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgaWYodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKXtcbiAgICAgIGlmKHRoaXMuJGFuY2hvci5kYXRhKCdob3ZlcicpKSByZXR1cm47XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGRyb3Bkb3duLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyJykuaGlkZSgpO1xuICAgIHRoaXMuJGFuY2hvci5vZmYoJy56Zi5kcm9wZG93bicpO1xuXG4gICAgRm91bmRhdGlvbi51bnJlZ2lzdGVyUGx1Z2luKHRoaXMpO1xuICB9XG59XG5cbkRyb3Bkb3duLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUgdG8gZGVsYXkgb3BlbmluZyBhIHN1Ym1lbnUgb24gaG92ZXIgZXZlbnQuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgMjUwXG4gICAqL1xuICBob3ZlckRlbGF5OiAyNTAsXG4gIC8qKlxuICAgKiBBbGxvdyBzdWJtZW51cyB0byBvcGVuIG9uIGhvdmVyIGV2ZW50c1xuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIGZhbHNlXG4gICAqL1xuICBob3ZlcjogZmFsc2UsXG4gIC8qKlxuICAgKiBEb24ndCBjbG9zZSBkcm9wZG93biB3aGVuIGhvdmVyaW5nIG92ZXIgZHJvcGRvd24gcGFuZVxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIHRydWVcbiAgICovXG4gIGhvdmVyUGFuZTogZmFsc2UsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gdGhlIGRyb3Bkb3duIHBhbmUgYW5kIHRoZSB0cmlnZ2VyaW5nIGVsZW1lbnQgb24gb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSAxXG4gICAqL1xuICB2T2Zmc2V0OiAxLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyBiZXR3ZWVuIHRoZSBkcm9wZG93biBwYW5lIGFuZCB0aGUgdHJpZ2dlcmluZyBlbGVtZW50IG9uIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgMVxuICAgKi9cbiAgaE9mZnNldDogMSxcbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gYWRqdXN0IG9wZW4gcG9zaXRpb24uIEpTIHdpbGwgdGVzdCBhbmQgZmlsbCB0aGlzIGluLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlICd0b3AnXG4gICAqL1xuICBwb3NpdGlvbkNsYXNzOiAnJyxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBwbHVnaW4gdG8gdHJhcCBmb2N1cyB0byB0aGUgZHJvcGRvd24gcGFuZSBpZiBvcGVuZWQgd2l0aCBrZXlib2FyZCBjb21tYW5kcy5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSBmYWxzZVxuICAgKi9cbiAgdHJhcEZvY3VzOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBwbHVnaW4gdG8gc2V0IGZvY3VzIHRvIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudCB3aXRoaW4gdGhlIHBhbmUsIHJlZ2FyZGxlc3Mgb2YgbWV0aG9kIG9mIG9wZW5pbmcuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgdHJ1ZVxuICAgKi9cbiAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93cyBhIGNsaWNrIG9uIHRoZSBib2R5IHRvIGNsb3NlIHRoZSBkcm9wZG93bi5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSBmYWxzZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiBmYWxzZVxufVxuXG4vLyBXaW5kb3cgZXhwb3J0c1xuRm91bmRhdGlvbi5wbHVnaW4oRHJvcGRvd24sICdEcm9wZG93bicpO1xuXG59KGpRdWVyeSk7XG4iLCIvKiFcbiAqIHNrcm9sbHIgY29yZVxuICpcbiAqIEFsZXhhbmRlciBQcmluemhvcm4gLSBodHRwczovL2dpdGh1Yi5jb20vUHJpbnpob3JuL3Nrcm9sbHJcbiAqXG4gKiBGcmVlIHRvIHVzZSB1bmRlciB0ZXJtcyBvZiBNSVQgbGljZW5zZVxuICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKlxuXHQgKiBHbG9iYWwgYXBpLlxuXHQgKi9cblx0dmFyIHNrcm9sbHIgPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBfaW5zdGFuY2U7XG5cdFx0fSxcblx0XHQvL01haW4gZW50cnkgcG9pbnQuXG5cdFx0aW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdFx0cmV0dXJuIF9pbnN0YW5jZSB8fCBuZXcgU2tyb2xscihvcHRpb25zKTtcblx0XHR9LFxuXHRcdFZFUlNJT046ICcwLjYuMjYnXG5cdH07XG5cblx0Ly9NaW5pZnkgb3B0aW1pemF0aW9uLlxuXHR2YXIgaGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciBNYXRoID0gd2luZG93Lk1hdGg7XG5cdHZhciBnZXRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlO1xuXG5cdC8vVGhleSB3aWxsIGJlIGZpbGxlZCB3aGVuIHNrcm9sbHIgZ2V0cyBpbml0aWFsaXplZC5cblx0dmFyIGRvY3VtZW50RWxlbWVudDtcblx0dmFyIGJvZHk7XG5cblx0dmFyIEVWRU5UX1RPVUNIU1RBUlQgPSAndG91Y2hzdGFydCc7XG5cdHZhciBFVkVOVF9UT1VDSE1PVkUgPSAndG91Y2htb3ZlJztcblx0dmFyIEVWRU5UX1RPVUNIQ0FOQ0VMID0gJ3RvdWNoY2FuY2VsJztcblx0dmFyIEVWRU5UX1RPVUNIRU5EID0gJ3RvdWNoZW5kJztcblxuXHR2YXIgU0tST0xMQUJMRV9DTEFTUyA9ICdza3JvbGxhYmxlJztcblx0dmFyIFNLUk9MTEFCTEVfQkVGT1JFX0NMQVNTID0gU0tST0xMQUJMRV9DTEFTUyArICctYmVmb3JlJztcblx0dmFyIFNLUk9MTEFCTEVfQkVUV0VFTl9DTEFTUyA9IFNLUk9MTEFCTEVfQ0xBU1MgKyAnLWJldHdlZW4nO1xuXHR2YXIgU0tST0xMQUJMRV9BRlRFUl9DTEFTUyA9IFNLUk9MTEFCTEVfQ0xBU1MgKyAnLWFmdGVyJztcblxuXHR2YXIgU0tST0xMUl9DTEFTUyA9ICdza3JvbGxyJztcblx0dmFyIE5PX1NLUk9MTFJfQ0xBU1MgPSAnbm8tJyArIFNLUk9MTFJfQ0xBU1M7XG5cdHZhciBTS1JPTExSX0RFU0tUT1BfQ0xBU1MgPSBTS1JPTExSX0NMQVNTICsgJy1kZXNrdG9wJztcblx0dmFyIFNLUk9MTFJfTU9CSUxFX0NMQVNTID0gU0tST0xMUl9DTEFTUyArICctbW9iaWxlJztcblxuXHR2YXIgREVGQVVMVF9FQVNJTkcgPSAnbGluZWFyJztcblx0dmFyIERFRkFVTFRfRFVSQVRJT04gPSAxMDAwOy8vbXNcblx0dmFyIERFRkFVTFRfTU9CSUxFX0RFQ0VMRVJBVElPTiA9IDAuMDA0Oy8vcGl4ZWwvbXPCslxuXG5cdHZhciBERUZBVUxUX1NNT09USF9TQ1JPTExJTkdfRFVSQVRJT04gPSAyMDA7Ly9tc1xuXG5cdHZhciBBTkNIT1JfU1RBUlQgPSAnc3RhcnQnO1xuXHR2YXIgQU5DSE9SX0VORCA9ICdlbmQnO1xuXHR2YXIgQU5DSE9SX0NFTlRFUiA9ICdjZW50ZXInO1xuXHR2YXIgQU5DSE9SX0JPVFRPTSA9ICdib3R0b20nO1xuXG5cdC8vVGhlIHByb3BlcnR5IHdoaWNoIHdpbGwgYmUgYWRkZWQgdG8gdGhlIERPTSBlbGVtZW50IHRvIGhvbGQgdGhlIElEIG9mIHRoZSBza3JvbGxhYmxlLlxuXHR2YXIgU0tST0xMQUJMRV9JRF9ET01fUFJPUEVSVFkgPSAnX19fc2tyb2xsYWJsZV9pZCc7XG5cblx0dmFyIHJ4VG91Y2hJZ25vcmVUYWdzID0gL14oPzppbnB1dHx0ZXh0YXJlYXxidXR0b258c2VsZWN0KSQvaTtcblxuXHR2YXIgcnhUcmltID0gL15cXHMrfFxccyskL2c7XG5cblx0Ly9GaW5kIGFsbCBkYXRhLWF0dHJpYnV0ZXMuIGRhdGEtW19jb25zdGFudF0tW29mZnNldF0tW2FuY2hvcl0tW2FuY2hvcl0uXG5cdHZhciByeEtleWZyYW1lQXR0cmlidXRlID0gL15kYXRhKD86LShfXFx3KykpPyg/Oi0/KC0/XFxkKlxcLj9cXGQrcD8pKT8oPzotPyhzdGFydHxlbmR8dG9wfGNlbnRlcnxib3R0b20pKT8oPzotPyh0b3B8Y2VudGVyfGJvdHRvbSkpPyQvO1xuXG5cdHZhciByeFByb3BWYWx1ZSA9IC9cXHMqKEA/W1xcd1xcLVxcW1xcXV0rKVxccyo6XFxzKiguKz8pXFxzKig/Ojt8JCkvZ2k7XG5cblx0Ly9FYXNpbmcgZnVuY3Rpb24gbmFtZXMgZm9sbG93IHRoZSBwcm9wZXJ0eSBpbiBzcXVhcmUgYnJhY2tldHMuXG5cdHZhciByeFByb3BFYXNpbmcgPSAvXihAP1thLXpcXC1dKylcXFsoXFx3KylcXF0kLztcblxuXHR2YXIgcnhDYW1lbENhc2UgPSAvLShbYS16MC05X10pL2c7XG5cdHZhciByeENhbWVsQ2FzZUZuID0gZnVuY3Rpb24oc3RyLCBsZXR0ZXIpIHtcblx0XHRyZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG5cdH07XG5cblx0Ly9OdW1lcmljIHZhbHVlcyB3aXRoIG9wdGlvbmFsIHNpZ24uXG5cdHZhciByeE51bWVyaWNWYWx1ZSA9IC9bXFwtK10/W1xcZF0qXFwuP1tcXGRdKy9nO1xuXG5cdC8vVXNlZCB0byByZXBsYWNlIG9jY3VyZW5jZXMgb2Ygez99IHdpdGggYSBudW1iZXIuXG5cdHZhciByeEludGVycG9sYXRlU3RyaW5nID0gL1xce1xcP1xcfS9nO1xuXG5cdC8vRmluZHMgcmdiKGEpIGNvbG9ycywgd2hpY2ggZG9uJ3QgdXNlIHRoZSBwZXJjZW50YWdlIG5vdGF0aW9uLlxuXHR2YXIgcnhSR0JBSW50ZWdlckNvbG9yID0gL3JnYmE/XFwoXFxzKi0/XFxkK1xccyosXFxzKi0/XFxkK1xccyosXFxzKi0/XFxkKy9nO1xuXG5cdC8vRmluZHMgYWxsIGdyYWRpZW50cy5cblx0dmFyIHJ4R3JhZGllbnQgPSAvW2EtelxcLV0rLWdyYWRpZW50L2c7XG5cblx0Ly9WZW5kb3IgcHJlZml4LiBXaWxsIGJlIHNldCBvbmNlIHNrcm9sbHIgZ2V0cyBpbml0aWFsaXplZC5cblx0dmFyIHRoZUNTU1ByZWZpeCA9ICcnO1xuXHR2YXIgdGhlRGFzaGVkQ1NTUHJlZml4ID0gJyc7XG5cblx0Ly9XaWxsIGJlIGNhbGxlZCBvbmNlICh3aGVuIHNrcm9sbHIgZ2V0cyBpbml0aWFsaXplZCkuXG5cdHZhciBkZXRlY3RDU1NQcmVmaXggPSBmdW5jdGlvbigpIHtcblx0XHQvL09ubHkgcmVsZXZhbnQgcHJlZml4ZXMuIE1heSBiZSBleHRlbmRlZC5cblx0XHQvL0NvdWxkIGJlIGRhbmdlcm91cyBpZiB0aGVyZSB3aWxsIGV2ZXIgYmUgYSBDU1MgcHJvcGVydHkgd2hpY2ggYWN0dWFsbHkgc3RhcnRzIHdpdGggXCJtc1wiLiBEb24ndCBob3BlIHNvLlxuXHRcdHZhciByeFByZWZpeGVzID0gL14oPzpPfE1venx3ZWJraXR8bXMpfCg/Oi0oPzpvfG1venx3ZWJraXR8bXMpLSkvO1xuXG5cdFx0Ly9EZXRlY3QgcHJlZml4IGZvciBjdXJyZW50IGJyb3dzZXIgYnkgZmluZGluZyB0aGUgZmlyc3QgcHJvcGVydHkgdXNpbmcgYSBwcmVmaXguXG5cdFx0aWYoIWdldFN0eWxlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIHN0eWxlID0gZ2V0U3R5bGUoYm9keSwgbnVsbCk7XG5cblx0XHRmb3IodmFyIGsgaW4gc3R5bGUpIHtcblx0XHRcdC8vV2UgY2hlY2sgdGhlIGtleSBhbmQgaWYgdGhlIGtleSBpcyBhIG51bWJlciwgd2UgY2hlY2sgdGhlIHZhbHVlIGFzIHdlbGwsIGJlY2F1c2Ugc2FmYXJpJ3MgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHNvbWUgd2VpcmQgYXJyYXktbGlrZSB0aGluZ3kuXG5cdFx0XHR0aGVDU1NQcmVmaXggPSAoay5tYXRjaChyeFByZWZpeGVzKSB8fCAoK2sgPT0gayAmJiBzdHlsZVtrXS5tYXRjaChyeFByZWZpeGVzKSkpO1xuXG5cdFx0XHRpZih0aGVDU1NQcmVmaXgpIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly9EaWQgd2UgZXZlbiBkZXRlY3QgYSBwcmVmaXg/XG5cdFx0aWYoIXRoZUNTU1ByZWZpeCkge1xuXHRcdFx0dGhlQ1NTUHJlZml4ID0gdGhlRGFzaGVkQ1NTUHJlZml4ID0gJyc7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGVDU1NQcmVmaXggPSB0aGVDU1NQcmVmaXhbMF07XG5cblx0XHQvL1dlIGNvdWxkIGhhdmUgZGV0ZWN0ZWQgZWl0aGVyIGEgZGFzaGVkIHByZWZpeCBvciB0aGlzIGNhbWVsQ2FzZWlzaC1pbmNvbnNpc3RlbnQgc3R1ZmYuXG5cdFx0aWYodGhlQ1NTUHJlZml4LnNsaWNlKDAsMSkgPT09ICctJykge1xuXHRcdFx0dGhlRGFzaGVkQ1NTUHJlZml4ID0gdGhlQ1NTUHJlZml4O1xuXG5cdFx0XHQvL1RoZXJlJ3Mgbm8gbG9naWMgYmVoaW5kIHRoZXNlLiBOZWVkIGEgbG9vayB1cC5cblx0XHRcdHRoZUNTU1ByZWZpeCA9ICh7XG5cdFx0XHRcdCctd2Via2l0LSc6ICd3ZWJraXQnLFxuXHRcdFx0XHQnLW1vei0nOiAnTW96Jyxcblx0XHRcdFx0Jy1tcy0nOiAnbXMnLFxuXHRcdFx0XHQnLW8tJzogJ08nXG5cdFx0XHR9KVt0aGVDU1NQcmVmaXhdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGVEYXNoZWRDU1NQcmVmaXggPSAnLScgKyB0aGVDU1NQcmVmaXgudG9Mb3dlckNhc2UoKSArICctJztcblx0XHR9XG5cdH07XG5cblx0dmFyIHBvbHlmaWxsUkFGID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHJlcXVlc3RBbmltRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvd1t0aGVDU1NQcmVmaXgudG9Mb3dlckNhc2UoKSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblxuXHRcdHZhciBsYXN0VGltZSA9IF9ub3coKTtcblxuXHRcdGlmKF9pc01vYmlsZSB8fCAhcmVxdWVzdEFuaW1GcmFtZSkge1xuXHRcdFx0cmVxdWVzdEFuaW1GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdC8vSG93IGxvbmcgZGlkIGl0IHRha2UgdG8gcmVuZGVyP1xuXHRcdFx0XHR2YXIgZGVsdGFUaW1lID0gX25vdygpIC0gbGFzdFRpbWU7XG5cdFx0XHRcdHZhciBkZWxheSA9IE1hdGgubWF4KDAsIDEwMDAgLyA2MCAtIGRlbHRhVGltZSk7XG5cblx0XHRcdFx0cmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGxhc3RUaW1lID0gX25vdygpO1xuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdH0sIGRlbGF5KTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlcXVlc3RBbmltRnJhbWU7XG5cdH07XG5cblx0dmFyIHBvbHlmaWxsQ0FGID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNhbmNlbEFuaW1GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3dbdGhlQ1NTUHJlZml4LnRvTG93ZXJDYXNlKCkgKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXTtcblxuXHRcdGlmKF9pc01vYmlsZSB8fCAhY2FuY2VsQW5pbUZyYW1lKSB7XG5cdFx0XHRjYW5jZWxBbmltRnJhbWUgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG5cdFx0XHRcdHJldHVybiB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FuY2VsQW5pbUZyYW1lO1xuXHR9O1xuXG5cdC8vQnVpbHQtaW4gZWFzaW5nIGZ1bmN0aW9ucy5cblx0dmFyIGVhc2luZ3MgPSB7XG5cdFx0YmVnaW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fSxcblx0XHRlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fSxcblx0XHRsaW5lYXI6IGZ1bmN0aW9uKHApIHtcblx0XHRcdHJldHVybiBwO1xuXHRcdH0sXG5cdFx0cXVhZHJhdGljOiBmdW5jdGlvbihwKSB7XG5cdFx0XHRyZXR1cm4gcCAqIHA7XG5cdFx0fSxcblx0XHRjdWJpYzogZnVuY3Rpb24ocCkge1xuXHRcdFx0cmV0dXJuIHAgKiBwICogcDtcblx0XHR9LFxuXHRcdHN3aW5nOiBmdW5jdGlvbihwKSB7XG5cdFx0XHRyZXR1cm4gKC1NYXRoLmNvcyhwICogTWF0aC5QSSkgLyAyKSArIDAuNTtcblx0XHR9LFxuXHRcdHNxcnQ6IGZ1bmN0aW9uKHApIHtcblx0XHRcdHJldHVybiBNYXRoLnNxcnQocCk7XG5cdFx0fSxcblx0XHRvdXRDdWJpYzogZnVuY3Rpb24ocCkge1xuXHRcdFx0cmV0dXJuIChNYXRoLnBvdygocCAtIDEpLCAzKSArIDEpO1xuXHRcdH0sXG5cdFx0Ly9zZWUgaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yL3RicjIwczh2ZDIgZm9yIGhvdyBJIGRpZCB0aGlzXG5cdFx0Ym91bmNlOiBmdW5jdGlvbihwKSB7XG5cdFx0XHR2YXIgYTtcblxuXHRcdFx0aWYocCA8PSAwLjUwODMpIHtcblx0XHRcdFx0YSA9IDM7XG5cdFx0XHR9IGVsc2UgaWYocCA8PSAwLjg0ODkpIHtcblx0XHRcdFx0YSA9IDk7XG5cdFx0XHR9IGVsc2UgaWYocCA8PSAwLjk2MjA4KSB7XG5cdFx0XHRcdGEgPSAyNztcblx0XHRcdH0gZWxzZSBpZihwIDw9IDAuOTk5ODEpIHtcblx0XHRcdFx0YSA9IDkxO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5hYnMoMyAqIE1hdGguY29zKHAgKiBhICogMS4wMjgpIC8gYSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3Rvci5cblx0ICovXG5cdGZ1bmN0aW9uIFNrcm9sbHIob3B0aW9ucykge1xuXHRcdGRvY3VtZW50RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHRib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuXHRcdGRldGVjdENTU1ByZWZpeCgpO1xuXG5cdFx0X2luc3RhbmNlID0gdGhpcztcblxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0X2NvbnN0YW50cyA9IG9wdGlvbnMuY29uc3RhbnRzIHx8IHt9O1xuXG5cdFx0Ly9XZSBhbGxvdyBkZWZpbmluZyBjdXN0b20gZWFzaW5ncyBvciBvdmVyd3JpdGUgZXhpc3RpbmcuXG5cdFx0aWYob3B0aW9ucy5lYXNpbmcpIHtcblx0XHRcdGZvcih2YXIgZSBpbiBvcHRpb25zLmVhc2luZykge1xuXHRcdFx0XHRlYXNpbmdzW2VdID0gb3B0aW9ucy5lYXNpbmdbZV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0X2VkZ2VTdHJhdGVneSA9IG9wdGlvbnMuZWRnZVN0cmF0ZWd5IHx8ICdzZXQnO1xuXG5cdFx0X2xpc3RlbmVycyA9IHtcblx0XHRcdC8vRnVuY3Rpb24gdG8gYmUgY2FsbGVkIHJpZ2h0IGJlZm9yZSByZW5kZXJpbmcuXG5cdFx0XHRiZWZvcmVyZW5kZXI6IG9wdGlvbnMuYmVmb3JlcmVuZGVyLFxuXG5cdFx0XHQvL0Z1bmN0aW9uIHRvIGJlIGNhbGxlZCByaWdodCBhZnRlciBmaW5pc2hpbmcgcmVuZGVyaW5nLlxuXHRcdFx0cmVuZGVyOiBvcHRpb25zLnJlbmRlcixcblxuXHRcdFx0Ly9GdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbmV2ZXIgYW4gZWxlbWVudCB3aXRoIHRoZSBgZGF0YS1lbWl0LWV2ZW50c2AgYXR0cmlidXRlIHBhc3NlcyBhIGtleWZyYW1lLlxuXHRcdFx0a2V5ZnJhbWU6IG9wdGlvbnMua2V5ZnJhbWVcblx0XHR9O1xuXG5cdFx0Ly9mb3JjZUhlaWdodCBpcyB0cnVlIGJ5IGRlZmF1bHRcblx0XHRfZm9yY2VIZWlnaHQgPSBvcHRpb25zLmZvcmNlSGVpZ2h0ICE9PSBmYWxzZTtcblxuXHRcdGlmKF9mb3JjZUhlaWdodCkge1xuXHRcdFx0X3NjYWxlID0gb3B0aW9ucy5zY2FsZSB8fCAxO1xuXHRcdH1cblxuXHRcdF9tb2JpbGVEZWNlbGVyYXRpb24gPSBvcHRpb25zLm1vYmlsZURlY2VsZXJhdGlvbiB8fCBERUZBVUxUX01PQklMRV9ERUNFTEVSQVRJT047XG5cblx0XHRfc21vb3RoU2Nyb2xsaW5nRW5hYmxlZCA9IG9wdGlvbnMuc21vb3RoU2Nyb2xsaW5nICE9PSBmYWxzZTtcblx0XHRfc21vb3RoU2Nyb2xsaW5nRHVyYXRpb24gPSBvcHRpb25zLnNtb290aFNjcm9sbGluZ0R1cmF0aW9uIHx8IERFRkFVTFRfU01PT1RIX1NDUk9MTElOR19EVVJBVElPTjtcblxuXHRcdC8vRHVtbXkgb2JqZWN0LiBXaWxsIGJlIG92ZXJ3cml0dGVuIGluIHRoZSBfcmVuZGVyIG1ldGhvZCB3aGVuIHNtb290aCBzY3JvbGxpbmcgaXMgY2FsY3VsYXRlZC5cblx0XHRfc21vb3RoU2Nyb2xsaW5nID0ge1xuXHRcdFx0dGFyZ2V0VG9wOiBfaW5zdGFuY2UuZ2V0U2Nyb2xsVG9wKClcblx0XHR9O1xuXG5cdFx0Ly9BIGN1c3RvbSBjaGVjayBmdW5jdGlvbiBtYXkgYmUgcGFzc2VkLlxuXHRcdF9pc01vYmlsZSA9ICgob3B0aW9ucy5tb2JpbGVDaGVjayB8fCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiAoL0FuZHJvaWR8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5L2kpLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSk7XG5cdFx0fSkoKSk7XG5cblx0XHRpZihfaXNNb2JpbGUpIHtcblx0XHRcdF9za3JvbGxyQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdza3JvbGxyLWJvZHknKTtcblxuXHRcdFx0Ly9EZXRlY3QgM2QgdHJhbnNmb3JtIGlmIHRoZXJlJ3MgYSBza3JvbGxyLWJvZHkgKG9ubHkgbmVlZGVkIGZvciAjc2tyb2xsci1ib2R5KS5cblx0XHRcdGlmKF9za3JvbGxyQm9keSkge1xuXHRcdFx0XHRfZGV0ZWN0M0RUcmFuc2Zvcm1zKCk7XG5cdFx0XHR9XG5cblx0XHRcdF9pbml0TW9iaWxlKCk7XG5cdFx0XHRfdXBkYXRlQ2xhc3MoZG9jdW1lbnRFbGVtZW50LCBbU0tST0xMUl9DTEFTUywgU0tST0xMUl9NT0JJTEVfQ0xBU1NdLCBbTk9fU0tST0xMUl9DTEFTU10pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRfdXBkYXRlQ2xhc3MoZG9jdW1lbnRFbGVtZW50LCBbU0tST0xMUl9DTEFTUywgU0tST0xMUl9ERVNLVE9QX0NMQVNTXSwgW05PX1NLUk9MTFJfQ0xBU1NdKTtcblx0XHR9XG5cblx0XHQvL1RyaWdnZXJzIHBhcnNpbmcgb2YgZWxlbWVudHMgYW5kIGEgZmlyc3QgcmVmbG93LlxuXHRcdF9pbnN0YW5jZS5yZWZyZXNoKCk7XG5cblx0XHRfYWRkRXZlbnQod2luZG93LCAncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgd2lkdGggPSBkb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cdFx0XHR2YXIgaGVpZ2h0ID0gZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcblxuXHRcdFx0Ly9Pbmx5IHJlZmxvdyBpZiB0aGUgc2l6ZSBhY3R1YWxseSBjaGFuZ2VkICgjMjcxKS5cblx0XHRcdGlmKGhlaWdodCAhPT0gX2xhc3RWaWV3cG9ydEhlaWdodCB8fCB3aWR0aCAhPT0gX2xhc3RWaWV3cG9ydFdpZHRoKSB7XG5cdFx0XHRcdF9sYXN0Vmlld3BvcnRIZWlnaHQgPSBoZWlnaHQ7XG5cdFx0XHRcdF9sYXN0Vmlld3BvcnRXaWR0aCA9IHdpZHRoO1xuXG5cdFx0XHRcdF9yZXF1ZXN0UmVmbG93ID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHZhciByZXF1ZXN0QW5pbUZyYW1lID0gcG9seWZpbGxSQUYoKTtcblxuXHRcdC8vTGV0J3MgZ28uXG5cdFx0KGZ1bmN0aW9uIGFuaW1sb29wKCl7XG5cdFx0XHRfcmVuZGVyKCk7XG5cdFx0XHRfYW5pbUZyYW1lID0gcmVxdWVzdEFuaW1GcmFtZShhbmltbG9vcCk7XG5cdFx0fSgpKTtcblxuXHRcdHJldHVybiBfaW5zdGFuY2U7XG5cdH1cblxuXHQvKipcblx0ICogKFJlKXBhcnNlcyBzb21lIG9yIGFsbCBlbGVtZW50cy5cblx0ICovXG5cdFNrcm9sbHIucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbihlbGVtZW50cykge1xuXHRcdHZhciBlbGVtZW50SW5kZXg7XG5cdFx0dmFyIGVsZW1lbnRzTGVuZ3RoO1xuXHRcdHZhciBpZ25vcmVJRCA9IGZhbHNlO1xuXG5cdFx0Ly9Db21wbGV0ZWx5IHJlcGFyc2UgYW55dGhpbmcgd2l0aG91dCBhcmd1bWVudC5cblx0XHRpZihlbGVtZW50cyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvL0lnbm9yZSB0aGF0IHNvbWUgZWxlbWVudHMgbWF5IGFscmVhZHkgaGF2ZSBhIHNrcm9sbGFibGUgSUQuXG5cdFx0XHRpZ25vcmVJRCA9IHRydWU7XG5cblx0XHRcdF9za3JvbGxhYmxlcyA9IFtdO1xuXHRcdFx0X3Nrcm9sbGFibGVJZENvdW50ZXIgPSAwO1xuXG5cdFx0XHRlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG5cdFx0fSBlbHNlIGlmKGVsZW1lbnRzLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvL1dlIGFsc28gYWNjZXB0IGEgc2luZ2xlIGVsZW1lbnQgYXMgcGFyYW1ldGVyLlxuXHRcdFx0ZWxlbWVudHMgPSBbZWxlbWVudHNdO1xuXHRcdH1cblxuXHRcdGVsZW1lbnRJbmRleCA9IDA7XG5cdFx0ZWxlbWVudHNMZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG5cblx0XHRmb3IoOyBlbGVtZW50SW5kZXggPCBlbGVtZW50c0xlbmd0aDsgZWxlbWVudEluZGV4KyspIHtcblx0XHRcdHZhciBlbCA9IGVsZW1lbnRzW2VsZW1lbnRJbmRleF07XG5cdFx0XHR2YXIgYW5jaG9yVGFyZ2V0ID0gZWw7XG5cdFx0XHR2YXIga2V5RnJhbWVzID0gW107XG5cblx0XHRcdC8vSWYgdGhpcyBwYXJ0aWN1bGFyIGVsZW1lbnQgc2hvdWxkIGJlIHNtb290aCBzY3JvbGxlZC5cblx0XHRcdHZhciBzbW9vdGhTY3JvbGxUaGlzID0gX3Ntb290aFNjcm9sbGluZ0VuYWJsZWQ7XG5cblx0XHRcdC8vVGhlIGVkZ2Ugc3RyYXRlZ3kgZm9yIHRoaXMgcGFydGljdWxhciBlbGVtZW50LlxuXHRcdFx0dmFyIGVkZ2VTdHJhdGVneSA9IF9lZGdlU3RyYXRlZ3k7XG5cblx0XHRcdC8vSWYgdGhpcyBwYXJ0aWN1bGFyIGVsZW1lbnQgc2hvdWxkIGVtaXQga2V5ZnJhbWUgZXZlbnRzLlxuXHRcdFx0dmFyIGVtaXRFdmVudHMgPSBmYWxzZTtcblxuXHRcdFx0Ly9JZiB3ZSdyZSByZXNldGluZyB0aGUgY291bnRlciwgcmVtb3ZlIGFueSBvbGQgZWxlbWVudCBpZHMgdGhhdCBtYXkgYmUgaGFuZ2luZyBhcm91bmQuXG5cdFx0XHRpZihpZ25vcmVJRCAmJiBTS1JPTExBQkxFX0lEX0RPTV9QUk9QRVJUWSBpbiBlbCkge1xuXHRcdFx0XHRkZWxldGUgZWxbU0tST0xMQUJMRV9JRF9ET01fUFJPUEVSVFldO1xuXHRcdFx0fVxuXG5cdFx0XHRpZighZWwuYXR0cmlidXRlcykge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly9JdGVyYXRlIG92ZXIgYWxsIGF0dHJpYnV0ZXMgYW5kIHNlYXJjaCBmb3Iga2V5IGZyYW1lIGF0dHJpYnV0ZXMuXG5cdFx0XHR2YXIgYXR0cmlidXRlSW5kZXggPSAwO1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXNMZW5ndGggPSBlbC5hdHRyaWJ1dGVzLmxlbmd0aDtcblxuXHRcdFx0Zm9yICg7IGF0dHJpYnV0ZUluZGV4IDwgYXR0cmlidXRlc0xlbmd0aDsgYXR0cmlidXRlSW5kZXgrKykge1xuXHRcdFx0XHR2YXIgYXR0ciA9IGVsLmF0dHJpYnV0ZXNbYXR0cmlidXRlSW5kZXhdO1xuXG5cdFx0XHRcdGlmKGF0dHIubmFtZSA9PT0gJ2RhdGEtYW5jaG9yLXRhcmdldCcpIHtcblx0XHRcdFx0XHRhbmNob3JUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGF0dHIudmFsdWUpO1xuXG5cdFx0XHRcdFx0aWYoYW5jaG9yVGFyZ2V0ID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnVW5hYmxlIHRvIGZpbmQgYW5jaG9yIHRhcmdldCBcIicgKyBhdHRyLnZhbHVlICsgJ1wiJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vR2xvYmFsIHNtb290aCBzY3JvbGxpbmcgY2FuIGJlIG92ZXJyaWRkZW4gYnkgdGhlIGVsZW1lbnQgYXR0cmlidXRlLlxuXHRcdFx0XHRpZihhdHRyLm5hbWUgPT09ICdkYXRhLXNtb290aC1zY3JvbGxpbmcnKSB7XG5cdFx0XHRcdFx0c21vb3RoU2Nyb2xsVGhpcyA9IGF0dHIudmFsdWUgIT09ICdvZmYnO1xuXG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0dsb2JhbCBlZGdlIHN0cmF0ZWd5IGNhbiBiZSBvdmVycmlkZGVuIGJ5IHRoZSBlbGVtZW50IGF0dHJpYnV0ZS5cblx0XHRcdFx0aWYoYXR0ci5uYW1lID09PSAnZGF0YS1lZGdlLXN0cmF0ZWd5Jykge1xuXHRcdFx0XHRcdGVkZ2VTdHJhdGVneSA9IGF0dHIudmFsdWU7XG5cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vSXMgdGhpcyBlbGVtZW50IHRhZ2dlZCB3aXRoIHRoZSBgZGF0YS1lbWl0LWV2ZW50c2AgYXR0cmlidXRlP1xuXHRcdFx0XHRpZihhdHRyLm5hbWUgPT09ICdkYXRhLWVtaXQtZXZlbnRzJykge1xuXHRcdFx0XHRcdGVtaXRFdmVudHMgPSB0cnVlO1xuXG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgbWF0Y2ggPSBhdHRyLm5hbWUubWF0Y2gocnhLZXlmcmFtZUF0dHJpYnV0ZSk7XG5cblx0XHRcdFx0aWYobWF0Y2ggPT09IG51bGwpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBrZiA9IHtcblx0XHRcdFx0XHRwcm9wczogYXR0ci52YWx1ZSxcblx0XHRcdFx0XHQvL1BvaW50IGJhY2sgdG8gdGhlIGVsZW1lbnQgYXMgd2VsbC5cblx0XHRcdFx0XHRlbGVtZW50OiBlbCxcblx0XHRcdFx0XHQvL1RoZSBuYW1lIG9mIHRoZSBldmVudCB3aGljaCB0aGlzIGtleWZyYW1lIHdpbGwgZmlyZSwgaWYgZW1pdEV2ZW50cyBpc1xuXHRcdFx0XHRcdGV2ZW50VHlwZTogYXR0ci5uYW1lLnJlcGxhY2UocnhDYW1lbENhc2UsIHJ4Q2FtZWxDYXNlRm4pXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0a2V5RnJhbWVzLnB1c2goa2YpO1xuXG5cdFx0XHRcdHZhciBjb25zdGFudCA9IG1hdGNoWzFdO1xuXG5cdFx0XHRcdGlmKGNvbnN0YW50KSB7XG5cdFx0XHRcdFx0Ly9TdHJpcCB0aGUgdW5kZXJzY29yZSBwcmVmaXguXG5cdFx0XHRcdFx0a2YuY29uc3RhbnQgPSBjb25zdGFudC5zdWJzdHIoMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0dldCB0aGUga2V5IGZyYW1lIG9mZnNldC5cblx0XHRcdFx0dmFyIG9mZnNldCA9IG1hdGNoWzJdO1xuXG5cdFx0XHRcdC8vSXMgaXQgYSBwZXJjZW50YWdlIG9mZnNldD9cblx0XHRcdFx0aWYoL3AkLy50ZXN0KG9mZnNldCkpIHtcblx0XHRcdFx0XHRrZi5pc1BlcmNlbnRhZ2UgPSB0cnVlO1xuXHRcdFx0XHRcdGtmLm9mZnNldCA9IChvZmZzZXQuc2xpY2UoMCwgLTEpIHwgMCkgLyAxMDA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0a2Yub2Zmc2V0ID0gKG9mZnNldCB8IDApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGFuY2hvcjEgPSBtYXRjaFszXTtcblxuXHRcdFx0XHQvL0lmIHNlY29uZCBhbmNob3IgaXMgbm90IHNldCwgdGhlIGZpcnN0IHdpbGwgYmUgdGFrZW4gZm9yIGJvdGguXG5cdFx0XHRcdHZhciBhbmNob3IyID0gbWF0Y2hbNF0gfHwgYW5jaG9yMTtcblxuXHRcdFx0XHQvL1wiYWJzb2x1dGVcIiAob3IgXCJjbGFzc2ljXCIpIG1vZGUsIHdoZXJlIG51bWJlcnMgbWVhbiBhYnNvbHV0ZSBzY3JvbGwgb2Zmc2V0LlxuXHRcdFx0XHRpZighYW5jaG9yMSB8fCBhbmNob3IxID09PSBBTkNIT1JfU1RBUlQgfHwgYW5jaG9yMSA9PT0gQU5DSE9SX0VORCkge1xuXHRcdFx0XHRcdGtmLm1vZGUgPSAnYWJzb2x1dGUnO1xuXG5cdFx0XHRcdFx0Ly9kYXRhLWVuZCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkIGFmdGVyIGFsbCBrZXkgZnJhbWVzIGFyZSBrbm93bi5cblx0XHRcdFx0XHRpZihhbmNob3IxID09PSBBTkNIT1JfRU5EKSB7XG5cdFx0XHRcdFx0XHRrZi5pc0VuZCA9IHRydWU7XG5cdFx0XHRcdFx0fSBlbHNlIGlmKCFrZi5pc1BlcmNlbnRhZ2UpIHtcblx0XHRcdFx0XHRcdC8vRm9yIGRhdGEtc3RhcnQgd2UgY2FuIGFscmVhZHkgc2V0IHRoZSBrZXkgZnJhbWUgdy9vIGNhbGN1bGF0aW9ucy5cblx0XHRcdFx0XHRcdC8vIzU5OiBcInNjYWxlXCIgb3B0aW9ucyBzaG91bGQgb25seSBhZmZlY3QgYWJzb2x1dGUgbW9kZS5cblx0XHRcdFx0XHRcdGtmLm9mZnNldCA9IGtmLm9mZnNldCAqIF9zY2FsZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9cInJlbGF0aXZlXCIgbW9kZSwgd2hlcmUgbnVtYmVycyBhcmUgcmVsYXRpdmUgdG8gYW5jaG9ycy5cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0a2YubW9kZSA9ICdyZWxhdGl2ZSc7XG5cdFx0XHRcdFx0a2YuYW5jaG9ycyA9IFthbmNob3IxLCBhbmNob3IyXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvL0RvZXMgdGhpcyBlbGVtZW50IGhhdmUga2V5IGZyYW1lcz9cblx0XHRcdGlmKCFrZXlGcmFtZXMubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvL1dpbGwgaG9sZCB0aGUgb3JpZ2luYWwgc3R5bGUgYW5kIGNsYXNzIGF0dHJpYnV0ZXMgYmVmb3JlIHdlIGNvbnRyb2xsZWQgdGhlIGVsZW1lbnQgKHNlZSAjODApLlxuXHRcdFx0dmFyIHN0eWxlQXR0ciwgY2xhc3NBdHRyO1xuXG5cdFx0XHR2YXIgaWQ7XG5cblx0XHRcdGlmKCFpZ25vcmVJRCAmJiBTS1JPTExBQkxFX0lEX0RPTV9QUk9QRVJUWSBpbiBlbCkge1xuXHRcdFx0XHQvL1dlIGFscmVhZHkgaGF2ZSB0aGlzIGVsZW1lbnQgdW5kZXIgY29udHJvbC4gR3JhYiB0aGUgY29ycmVzcG9uZGluZyBza3JvbGxhYmxlIGlkLlxuXHRcdFx0XHRpZCA9IGVsW1NLUk9MTEFCTEVfSURfRE9NX1BST1BFUlRZXTtcblx0XHRcdFx0c3R5bGVBdHRyID0gX3Nrcm9sbGFibGVzW2lkXS5zdHlsZUF0dHI7XG5cdFx0XHRcdGNsYXNzQXR0ciA9IF9za3JvbGxhYmxlc1tpZF0uY2xhc3NBdHRyO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly9JdCdzIGFuIHVua25vd24gZWxlbWVudC4gQXNpZ24gaXQgYSBuZXcgc2tyb2xsYWJsZSBpZC5cblx0XHRcdFx0aWQgPSAoZWxbU0tST0xMQUJMRV9JRF9ET01fUFJPUEVSVFldID0gX3Nrcm9sbGFibGVJZENvdW50ZXIrKyk7XG5cdFx0XHRcdHN0eWxlQXR0ciA9IGVsLnN0eWxlLmNzc1RleHQ7XG5cdFx0XHRcdGNsYXNzQXR0ciA9IF9nZXRDbGFzcyhlbCk7XG5cdFx0XHR9XG5cblx0XHRcdF9za3JvbGxhYmxlc1tpZF0gPSB7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsLFxuXHRcdFx0XHRzdHlsZUF0dHI6IHN0eWxlQXR0cixcblx0XHRcdFx0Y2xhc3NBdHRyOiBjbGFzc0F0dHIsXG5cdFx0XHRcdGFuY2hvclRhcmdldDogYW5jaG9yVGFyZ2V0LFxuXHRcdFx0XHRrZXlGcmFtZXM6IGtleUZyYW1lcyxcblx0XHRcdFx0c21vb3RoU2Nyb2xsaW5nOiBzbW9vdGhTY3JvbGxUaGlzLFxuXHRcdFx0XHRlZGdlU3RyYXRlZ3k6IGVkZ2VTdHJhdGVneSxcblx0XHRcdFx0ZW1pdEV2ZW50czogZW1pdEV2ZW50cyxcblx0XHRcdFx0bGFzdEZyYW1lSW5kZXg6IC0xXG5cdFx0XHR9O1xuXG5cdFx0XHRfdXBkYXRlQ2xhc3MoZWwsIFtTS1JPTExBQkxFX0NMQVNTXSwgW10pO1xuXHRcdH1cblxuXHRcdC8vUmVmbG93IGZvciB0aGUgZmlyc3QgdGltZS5cblx0XHRfcmVmbG93KCk7XG5cblx0XHQvL05vdyB0aGF0IHdlIGdvdCBhbGwga2V5IGZyYW1lIG51bWJlcnMgcmlnaHQsIGFjdHVhbGx5IHBhcnNlIHRoZSBwcm9wZXJ0aWVzLlxuXHRcdGVsZW1lbnRJbmRleCA9IDA7XG5cdFx0ZWxlbWVudHNMZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG5cblx0XHRmb3IoOyBlbGVtZW50SW5kZXggPCBlbGVtZW50c0xlbmd0aDsgZWxlbWVudEluZGV4KyspIHtcblx0XHRcdHZhciBzayA9IF9za3JvbGxhYmxlc1tlbGVtZW50c1tlbGVtZW50SW5kZXhdW1NLUk9MTEFCTEVfSURfRE9NX1BST1BFUlRZXV07XG5cblx0XHRcdGlmKHNrID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vUGFyc2UgdGhlIHByb3BlcnR5IHN0cmluZyB0byBvYmplY3RzXG5cdFx0XHRfcGFyc2VQcm9wcyhzayk7XG5cblx0XHRcdC8vRmlsbCBrZXkgZnJhbWVzIHdpdGggbWlzc2luZyBwcm9wZXJ0aWVzIGZyb20gbGVmdCBhbmQgcmlnaHRcblx0XHRcdF9maWxsUHJvcHMoc2spO1xuXHRcdH1cblxuXHRcdHJldHVybiBfaW5zdGFuY2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIFRyYW5zZm9ybSBcInJlbGF0aXZlXCIgbW9kZSB0byBcImFic29sdXRlXCIgbW9kZS5cblx0ICogVGhhdCBpcywgY2FsY3VsYXRlIGFuY2hvciBwb3NpdGlvbiBhbmQgb2Zmc2V0IG9mIGVsZW1lbnQuXG5cdCAqL1xuXHRTa3JvbGxyLnByb3RvdHlwZS5yZWxhdGl2ZVRvQWJzb2x1dGUgPSBmdW5jdGlvbihlbGVtZW50LCB2aWV3cG9ydEFuY2hvciwgZWxlbWVudEFuY2hvcikge1xuXHRcdHZhciB2aWV3cG9ydEhlaWdodCA9IGRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cdFx0dmFyIGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0dmFyIGFic29sdXRlID0gYm94LnRvcDtcblxuXHRcdC8vIzEwMDogSUUgZG9lc24ndCBzdXBwbHkgXCJoZWlnaHRcIiB3aXRoIGdldEJvdW5kaW5nQ2xpZW50UmVjdC5cblx0XHR2YXIgYm94SGVpZ2h0ID0gYm94LmJvdHRvbSAtIGJveC50b3A7XG5cblx0XHRpZih2aWV3cG9ydEFuY2hvciA9PT0gQU5DSE9SX0JPVFRPTSkge1xuXHRcdFx0YWJzb2x1dGUgLT0gdmlld3BvcnRIZWlnaHQ7XG5cdFx0fSBlbHNlIGlmKHZpZXdwb3J0QW5jaG9yID09PSBBTkNIT1JfQ0VOVEVSKSB7XG5cdFx0XHRhYnNvbHV0ZSAtPSB2aWV3cG9ydEhlaWdodCAvIDI7XG5cdFx0fVxuXG5cdFx0aWYoZWxlbWVudEFuY2hvciA9PT0gQU5DSE9SX0JPVFRPTSkge1xuXHRcdFx0YWJzb2x1dGUgKz0gYm94SGVpZ2h0O1xuXHRcdH0gZWxzZSBpZihlbGVtZW50QW5jaG9yID09PSBBTkNIT1JfQ0VOVEVSKSB7XG5cdFx0XHRhYnNvbHV0ZSArPSBib3hIZWlnaHQgLyAyO1xuXHRcdH1cblxuXHRcdC8vQ29tcGVuc2F0ZSBzY3JvbGxpbmcgc2luY2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIHJlbGF0aXZlIHRvIHZpZXdwb3J0LlxuXHRcdGFic29sdXRlICs9IF9pbnN0YW5jZS5nZXRTY3JvbGxUb3AoKTtcblxuXHRcdHJldHVybiAoYWJzb2x1dGUgKyAwLjUpIHwgMDtcblx0fTtcblxuXHQvKipcblx0ICogQW5pbWF0ZXMgc2Nyb2xsIHRvcCB0byBuZXcgcG9zaXRpb24uXG5cdCAqL1xuXHRTa3JvbGxyLnByb3RvdHlwZS5hbmltYXRlVG8gPSBmdW5jdGlvbih0b3AsIG9wdGlvbnMpIHtcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdHZhciBub3cgPSBfbm93KCk7XG5cdFx0dmFyIHNjcm9sbFRvcCA9IF9pbnN0YW5jZS5nZXRTY3JvbGxUb3AoKTtcblxuXHRcdC8vU2V0dGluZyB0aGlzIHRvIGEgbmV3IHZhbHVlIHdpbGwgYXV0b21hdGljYWxseSBjYXVzZSB0aGUgY3VycmVudCBhbmltYXRpb24gdG8gc3RvcCwgaWYgYW55LlxuXHRcdF9zY3JvbGxBbmltYXRpb24gPSB7XG5cdFx0XHRzdGFydFRvcDogc2Nyb2xsVG9wLFxuXHRcdFx0dG9wRGlmZjogdG9wIC0gc2Nyb2xsVG9wLFxuXHRcdFx0dGFyZ2V0VG9wOiB0b3AsXG5cdFx0XHRkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbiB8fCBERUZBVUxUX0RVUkFUSU9OLFxuXHRcdFx0c3RhcnRUaW1lOiBub3csXG5cdFx0XHRlbmRUaW1lOiBub3cgKyAob3B0aW9ucy5kdXJhdGlvbiB8fCBERUZBVUxUX0RVUkFUSU9OKSxcblx0XHRcdGVhc2luZzogZWFzaW5nc1tvcHRpb25zLmVhc2luZyB8fCBERUZBVUxUX0VBU0lOR10sXG5cdFx0XHRkb25lOiBvcHRpb25zLmRvbmVcblx0XHR9O1xuXG5cdFx0Ly9Eb24ndCBxdWV1ZSB0aGUgYW5pbWF0aW9uIGlmIHRoZXJlJ3Mgbm90aGluZyB0byBhbmltYXRlLlxuXHRcdGlmKCFfc2Nyb2xsQW5pbWF0aW9uLnRvcERpZmYpIHtcblx0XHRcdGlmKF9zY3JvbGxBbmltYXRpb24uZG9uZSkge1xuXHRcdFx0XHRfc2Nyb2xsQW5pbWF0aW9uLmRvbmUuY2FsbChfaW5zdGFuY2UsIGZhbHNlKTtcblx0XHRcdH1cblxuXHRcdFx0X3Njcm9sbEFuaW1hdGlvbiA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHRyZXR1cm4gX2luc3RhbmNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTdG9wcyBhbmltYXRlVG8gYW5pbWF0aW9uLlxuXHQgKi9cblx0U2tyb2xsci5wcm90b3R5cGUuc3RvcEFuaW1hdGVUbyA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKF9zY3JvbGxBbmltYXRpb24gJiYgX3Njcm9sbEFuaW1hdGlvbi5kb25lKSB7XG5cdFx0XHRfc2Nyb2xsQW5pbWF0aW9uLmRvbmUuY2FsbChfaW5zdGFuY2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdF9zY3JvbGxBbmltYXRpb24gPSB1bmRlZmluZWQ7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJldHVybnMgaWYgYW4gYW5pbWF0aW9uIGNhdXNlZCBieSBhbmltYXRlVG8gaXMgY3VycmVudGx5IHJ1bm5pbmcuXG5cdCAqL1xuXHRTa3JvbGxyLnByb3RvdHlwZS5pc0FuaW1hdGluZ1RvID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICEhX3Njcm9sbEFuaW1hdGlvbjtcblx0fTtcblxuXHRTa3JvbGxyLnByb3RvdHlwZS5pc01vYmlsZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfaXNNb2JpbGU7XG5cdH07XG5cblx0U2tyb2xsci5wcm90b3R5cGUuc2V0U2Nyb2xsVG9wID0gZnVuY3Rpb24odG9wLCBmb3JjZSkge1xuXHRcdF9mb3JjZVJlbmRlciA9IChmb3JjZSA9PT0gdHJ1ZSk7XG5cblx0XHRpZihfaXNNb2JpbGUpIHtcblx0XHRcdF9tb2JpbGVPZmZzZXQgPSBNYXRoLm1pbihNYXRoLm1heCh0b3AsIDApLCBfbWF4S2V5RnJhbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwgdG9wKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gX2luc3RhbmNlO1xuXHR9O1xuXG5cdFNrcm9sbHIucHJvdG90eXBlLmdldFNjcm9sbFRvcCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKF9pc01vYmlsZSkge1xuXHRcdFx0cmV0dXJuIF9tb2JpbGVPZmZzZXQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcCB8fCAwO1xuXHRcdH1cblx0fTtcblxuXHRTa3JvbGxyLnByb3RvdHlwZS5nZXRNYXhTY3JvbGxUb3AgPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gX21heEtleUZyYW1lO1xuXHR9O1xuXG5cdFNrcm9sbHIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24obmFtZSwgZm4pIHtcblx0XHRfbGlzdGVuZXJzW25hbWVdID0gZm47XG5cblx0XHRyZXR1cm4gX2luc3RhbmNlO1xuXHR9O1xuXG5cdFNrcm9sbHIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKG5hbWUpIHtcblx0XHRkZWxldGUgX2xpc3RlbmVyc1tuYW1lXTtcblxuXHRcdHJldHVybiBfaW5zdGFuY2U7XG5cdH07XG5cblx0U2tyb2xsci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjYW5jZWxBbmltRnJhbWUgPSBwb2x5ZmlsbENBRigpO1xuXHRcdGNhbmNlbEFuaW1GcmFtZShfYW5pbUZyYW1lKTtcblx0XHRfcmVtb3ZlQWxsRXZlbnRzKCk7XG5cblx0XHRfdXBkYXRlQ2xhc3MoZG9jdW1lbnRFbGVtZW50LCBbTk9fU0tST0xMUl9DTEFTU10sIFtTS1JPTExSX0NMQVNTLCBTS1JPTExSX0RFU0tUT1BfQ0xBU1MsIFNLUk9MTFJfTU9CSUxFX0NMQVNTXSk7XG5cblx0XHR2YXIgc2tyb2xsYWJsZUluZGV4ID0gMDtcblx0XHR2YXIgc2tyb2xsYWJsZXNMZW5ndGggPSBfc2tyb2xsYWJsZXMubGVuZ3RoO1xuXG5cdFx0Zm9yKDsgc2tyb2xsYWJsZUluZGV4IDwgc2tyb2xsYWJsZXNMZW5ndGg7IHNrcm9sbGFibGVJbmRleCsrKSB7XG5cdFx0XHRfcmVzZXQoX3Nrcm9sbGFibGVzW3Nrcm9sbGFibGVJbmRleF0uZWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuXHRcdGRvY3VtZW50RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBib2R5LnN0eWxlLmhlaWdodCA9ICcnO1xuXG5cdFx0aWYoX3Nrcm9sbHJCb2R5KSB7XG5cdFx0XHRza3JvbGxyLnNldFN0eWxlKF9za3JvbGxyQm9keSwgJ3RyYW5zZm9ybScsICdub25lJyk7XG5cdFx0fVxuXG5cdFx0X2luc3RhbmNlID0gdW5kZWZpbmVkO1xuXHRcdF9za3JvbGxyQm9keSA9IHVuZGVmaW5lZDtcblx0XHRfbGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXHRcdF9mb3JjZUhlaWdodCA9IHVuZGVmaW5lZDtcblx0XHRfbWF4S2V5RnJhbWUgPSAwO1xuXHRcdF9zY2FsZSA9IDE7XG5cdFx0X2NvbnN0YW50cyA9IHVuZGVmaW5lZDtcblx0XHRfbW9iaWxlRGVjZWxlcmF0aW9uID0gdW5kZWZpbmVkO1xuXHRcdF9kaXJlY3Rpb24gPSAnZG93bic7XG5cdFx0X2xhc3RUb3AgPSAtMTtcblx0XHRfbGFzdFZpZXdwb3J0V2lkdGggPSAwO1xuXHRcdF9sYXN0Vmlld3BvcnRIZWlnaHQgPSAwO1xuXHRcdF9yZXF1ZXN0UmVmbG93ID0gZmFsc2U7XG5cdFx0X3Njcm9sbEFuaW1hdGlvbiA9IHVuZGVmaW5lZDtcblx0XHRfc21vb3RoU2Nyb2xsaW5nRW5hYmxlZCA9IHVuZGVmaW5lZDtcblx0XHRfc21vb3RoU2Nyb2xsaW5nRHVyYXRpb24gPSB1bmRlZmluZWQ7XG5cdFx0X3Ntb290aFNjcm9sbGluZyA9IHVuZGVmaW5lZDtcblx0XHRfZm9yY2VSZW5kZXIgPSB1bmRlZmluZWQ7XG5cdFx0X3Nrcm9sbGFibGVJZENvdW50ZXIgPSAwO1xuXHRcdF9lZGdlU3RyYXRlZ3kgPSB1bmRlZmluZWQ7XG5cdFx0X2lzTW9iaWxlID0gZmFsc2U7XG5cdFx0X21vYmlsZU9mZnNldCA9IDA7XG5cdFx0X3RyYW5zbGF0ZVogPSB1bmRlZmluZWQ7XG5cdH07XG5cblx0Lypcblx0XHRQcml2YXRlIG1ldGhvZHMuXG5cdCovXG5cblx0dmFyIF9pbml0TW9iaWxlID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGluaXRpYWxFbGVtZW50O1xuXHRcdHZhciBpbml0aWFsVG91Y2hZO1xuXHRcdHZhciBpbml0aWFsVG91Y2hYO1xuXHRcdHZhciBjdXJyZW50RWxlbWVudDtcblx0XHR2YXIgY3VycmVudFRvdWNoWTtcblx0XHR2YXIgY3VycmVudFRvdWNoWDtcblx0XHR2YXIgbGFzdFRvdWNoWTtcblx0XHR2YXIgZGVsdGFZO1xuXG5cdFx0dmFyIGluaXRpYWxUb3VjaFRpbWU7XG5cdFx0dmFyIGN1cnJlbnRUb3VjaFRpbWU7XG5cdFx0dmFyIGxhc3RUb3VjaFRpbWU7XG5cdFx0dmFyIGRlbHRhVGltZTtcblxuXHRcdF9hZGRFdmVudChkb2N1bWVudEVsZW1lbnQsIFtFVkVOVF9UT1VDSFNUQVJULCBFVkVOVF9UT1VDSE1PVkUsIEVWRU5UX1RPVUNIQ0FOQ0VMLCBFVkVOVF9UT1VDSEVORF0uam9pbignICcpLCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0XHRjdXJyZW50RWxlbWVudCA9IGUudGFyZ2V0O1xuXG5cdFx0XHQvL1dlIGRvbid0IHdhbnQgdGV4dCBub2Rlcy5cblx0XHRcdHdoaWxlKGN1cnJlbnRFbGVtZW50Lm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFRvdWNoWSA9IHRvdWNoLmNsaWVudFk7XG5cdFx0XHRjdXJyZW50VG91Y2hYID0gdG91Y2guY2xpZW50WDtcblx0XHRcdGN1cnJlbnRUb3VjaFRpbWUgPSBlLnRpbWVTdGFtcDtcblxuXHRcdFx0aWYoIXJ4VG91Y2hJZ25vcmVUYWdzLnRlc3QoY3VycmVudEVsZW1lbnQudGFnTmFtZSkpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRzd2l0Y2goZS50eXBlKSB7XG5cdFx0XHRcdGNhc2UgRVZFTlRfVE9VQ0hTVEFSVDpcblx0XHRcdFx0XHQvL1RoZSBsYXN0IGVsZW1lbnQgd2UgdGFwcGVkIG9uLlxuXHRcdFx0XHRcdGlmKGluaXRpYWxFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRpbml0aWFsRWxlbWVudC5ibHVyKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0X2luc3RhbmNlLnN0b3BBbmltYXRlVG8oKTtcblxuXHRcdFx0XHRcdGluaXRpYWxFbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG5cblx0XHRcdFx0XHRpbml0aWFsVG91Y2hZID0gbGFzdFRvdWNoWSA9IGN1cnJlbnRUb3VjaFk7XG5cdFx0XHRcdFx0aW5pdGlhbFRvdWNoWCA9IGN1cnJlbnRUb3VjaFg7XG5cdFx0XHRcdFx0aW5pdGlhbFRvdWNoVGltZSA9IGN1cnJlbnRUb3VjaFRpbWU7XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBFVkVOVF9UT1VDSE1PVkU6XG5cdFx0XHRcdFx0Ly9QcmV2ZW50IGRlZmF1bHQgZXZlbnQgb24gdG91Y2hJZ25vcmUgZWxlbWVudHMgaW4gY2FzZSB0aGV5IGRvbid0IGhhdmUgZm9jdXMgeWV0LlxuXHRcdFx0XHRcdGlmKHJ4VG91Y2hJZ25vcmVUYWdzLnRlc3QoY3VycmVudEVsZW1lbnQudGFnTmFtZSkgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gY3VycmVudEVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkZWx0YVkgPSBjdXJyZW50VG91Y2hZIC0gbGFzdFRvdWNoWTtcblx0XHRcdFx0XHRkZWx0YVRpbWUgPSBjdXJyZW50VG91Y2hUaW1lIC0gbGFzdFRvdWNoVGltZTtcblxuXHRcdFx0XHRcdF9pbnN0YW5jZS5zZXRTY3JvbGxUb3AoX21vYmlsZU9mZnNldCAtIGRlbHRhWSwgdHJ1ZSk7XG5cblx0XHRcdFx0XHRsYXN0VG91Y2hZID0gY3VycmVudFRvdWNoWTtcblx0XHRcdFx0XHRsYXN0VG91Y2hUaW1lID0gY3VycmVudFRvdWNoVGltZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y2FzZSBFVkVOVF9UT1VDSENBTkNFTDpcblx0XHRcdFx0Y2FzZSBFVkVOVF9UT1VDSEVORDpcblx0XHRcdFx0XHR2YXIgZGlzdGFuY2VZID0gaW5pdGlhbFRvdWNoWSAtIGN1cnJlbnRUb3VjaFk7XG5cdFx0XHRcdFx0dmFyIGRpc3RhbmNlWCA9IGluaXRpYWxUb3VjaFggLSBjdXJyZW50VG91Y2hYO1xuXHRcdFx0XHRcdHZhciBkaXN0YW5jZTIgPSBkaXN0YW5jZVggKiBkaXN0YW5jZVggKyBkaXN0YW5jZVkgKiBkaXN0YW5jZVk7XG5cblx0XHRcdFx0XHQvL0NoZWNrIGlmIGl0IHdhcyBtb3JlIGxpa2UgYSB0YXAgKG1vdmVkIGxlc3MgdGhhbiA3cHgpLlxuXHRcdFx0XHRcdGlmKGRpc3RhbmNlMiA8IDQ5KSB7XG5cdFx0XHRcdFx0XHRpZighcnhUb3VjaElnbm9yZVRhZ3MudGVzdChpbml0aWFsRWxlbWVudC50YWdOYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRpbml0aWFsRWxlbWVudC5mb2N1cygpO1xuXG5cdFx0XHRcdFx0XHRcdC8vSXQgd2FzIGEgdGFwLCBjbGljayB0aGUgZWxlbWVudC5cblx0XHRcdFx0XHRcdFx0dmFyIGNsaWNrRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcblx0XHRcdFx0XHRcdFx0Y2xpY2tFdmVudC5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlLCB0cnVlLCBlLnZpZXcsIDEsIHRvdWNoLnNjcmVlblgsIHRvdWNoLnNjcmVlblksIHRvdWNoLmNsaWVudFgsIHRvdWNoLmNsaWVudFksIGUuY3RybEtleSwgZS5hbHRLZXksIGUuc2hpZnRLZXksIGUubWV0YUtleSwgMCwgbnVsbCk7XG5cdFx0XHRcdFx0XHRcdGluaXRpYWxFbGVtZW50LmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbml0aWFsRWxlbWVudCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdHZhciBzcGVlZCA9IGRlbHRhWSAvIGRlbHRhVGltZTtcblxuXHRcdFx0XHRcdC8vQ2FwIHNwZWVkIGF0IDMgcGl4ZWwvbXMuXG5cdFx0XHRcdFx0c3BlZWQgPSBNYXRoLm1heChNYXRoLm1pbihzcGVlZCwgMyksIC0zKTtcblxuXHRcdFx0XHRcdHZhciBkdXJhdGlvbiA9IE1hdGguYWJzKHNwZWVkIC8gX21vYmlsZURlY2VsZXJhdGlvbik7XG5cdFx0XHRcdFx0dmFyIHRhcmdldE9mZnNldCA9IHNwZWVkICogZHVyYXRpb24gKyAwLjUgKiBfbW9iaWxlRGVjZWxlcmF0aW9uICogZHVyYXRpb24gKiBkdXJhdGlvbjtcblx0XHRcdFx0XHR2YXIgdGFyZ2V0VG9wID0gX2luc3RhbmNlLmdldFNjcm9sbFRvcCgpIC0gdGFyZ2V0T2Zmc2V0O1xuXG5cdFx0XHRcdFx0Ly9SZWxhdGl2ZSBkdXJhdGlvbiBjaGFuZ2UgZm9yIHdoZW4gc2Nyb2xsaW5nIGFib3ZlIGJvdW5kcy5cblx0XHRcdFx0XHR2YXIgdGFyZ2V0UmF0aW8gPSAwO1xuXG5cdFx0XHRcdFx0Ly9DaGFuZ2UgZHVyYXRpb24gcHJvcG9ydGlvbmFsbHkgd2hlbiBzY3JvbGxpbmcgd291bGQgbGVhdmUgYm91bmRzLlxuXHRcdFx0XHRcdGlmKHRhcmdldFRvcCA+IF9tYXhLZXlGcmFtZSkge1xuXHRcdFx0XHRcdFx0dGFyZ2V0UmF0aW8gPSAoX21heEtleUZyYW1lIC0gdGFyZ2V0VG9wKSAvIHRhcmdldE9mZnNldDtcblxuXHRcdFx0XHRcdFx0dGFyZ2V0VG9wID0gX21heEtleUZyYW1lO1xuXHRcdFx0XHRcdH0gZWxzZSBpZih0YXJnZXRUb3AgPCAwKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRSYXRpbyA9IC10YXJnZXRUb3AgLyB0YXJnZXRPZmZzZXQ7XG5cblx0XHRcdFx0XHRcdHRhcmdldFRvcCA9IDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZHVyYXRpb24gPSBkdXJhdGlvbiAqICgxIC0gdGFyZ2V0UmF0aW8pO1xuXG5cdFx0XHRcdFx0X2luc3RhbmNlLmFuaW1hdGVUbygodGFyZ2V0VG9wICsgMC41KSB8IDAsIHtlYXNpbmc6ICdvdXRDdWJpYycsIGR1cmF0aW9uOiBkdXJhdGlvbn0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly9KdXN0IGluIGNhc2UgdGhlcmUgaGFzIGFscmVhZHkgYmVlbiBzb21lIG5hdGl2ZSBzY3JvbGxpbmcsIHJlc2V0IGl0LlxuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcblx0XHRkb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdH07XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMga2V5IGZyYW1lcyB3aGljaCBkZXBlbmQgb24gb3RoZXJzIC8gbmVlZCB0byBiZSB1cGRhdGVkIG9uIHJlc2l6ZS5cblx0ICogVGhhdCBpcyBcImVuZFwiIGluIFwiYWJzb2x1dGVcIiBtb2RlIGFuZCBhbGwga2V5IGZyYW1lcyBpbiBcInJlbGF0aXZlXCIgbW9kZS5cblx0ICogQWxzbyBoYW5kbGVzIGNvbnN0YW50cywgYmVjYXVzZSB0aGV5IG1heSBjaGFuZ2Ugb24gcmVzaXplLlxuXHQgKi9cblx0dmFyIF91cGRhdGVEZXBlbmRlbnRLZXlGcmFtZXMgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgdmlld3BvcnRIZWlnaHQgPSBkb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXHRcdHZhciBwcm9jZXNzZWRDb25zdGFudHMgPSBfcHJvY2Vzc0NvbnN0YW50cygpO1xuXHRcdHZhciBza3JvbGxhYmxlO1xuXHRcdHZhciBlbGVtZW50O1xuXHRcdHZhciBhbmNob3JUYXJnZXQ7XG5cdFx0dmFyIGtleUZyYW1lcztcblx0XHR2YXIga2V5RnJhbWVJbmRleDtcblx0XHR2YXIga2V5RnJhbWVzTGVuZ3RoO1xuXHRcdHZhciBrZjtcblx0XHR2YXIgc2tyb2xsYWJsZUluZGV4O1xuXHRcdHZhciBza3JvbGxhYmxlc0xlbmd0aDtcblx0XHR2YXIgb2Zmc2V0O1xuXHRcdHZhciBjb25zdGFudFZhbHVlO1xuXG5cdFx0Ly9GaXJzdCBwcm9jZXNzIGFsbCByZWxhdGl2ZS1tb2RlIGVsZW1lbnRzIGFuZCBmaW5kIHRoZSBtYXgga2V5IGZyYW1lLlxuXHRcdHNrcm9sbGFibGVJbmRleCA9IDA7XG5cdFx0c2tyb2xsYWJsZXNMZW5ndGggPSBfc2tyb2xsYWJsZXMubGVuZ3RoO1xuXG5cdFx0Zm9yKDsgc2tyb2xsYWJsZUluZGV4IDwgc2tyb2xsYWJsZXNMZW5ndGg7IHNrcm9sbGFibGVJbmRleCsrKSB7XG5cdFx0XHRza3JvbGxhYmxlID0gX3Nrcm9sbGFibGVzW3Nrcm9sbGFibGVJbmRleF07XG5cdFx0XHRlbGVtZW50ID0gc2tyb2xsYWJsZS5lbGVtZW50O1xuXHRcdFx0YW5jaG9yVGFyZ2V0ID0gc2tyb2xsYWJsZS5hbmNob3JUYXJnZXQ7XG5cdFx0XHRrZXlGcmFtZXMgPSBza3JvbGxhYmxlLmtleUZyYW1lcztcblxuXHRcdFx0a2V5RnJhbWVJbmRleCA9IDA7XG5cdFx0XHRrZXlGcmFtZXNMZW5ndGggPSBrZXlGcmFtZXMubGVuZ3RoO1xuXG5cdFx0XHRmb3IoOyBrZXlGcmFtZUluZGV4IDwga2V5RnJhbWVzTGVuZ3RoOyBrZXlGcmFtZUluZGV4KyspIHtcblx0XHRcdFx0a2YgPSBrZXlGcmFtZXNba2V5RnJhbWVJbmRleF07XG5cblx0XHRcdFx0b2Zmc2V0ID0ga2Yub2Zmc2V0O1xuXHRcdFx0XHRjb25zdGFudFZhbHVlID0gcHJvY2Vzc2VkQ29uc3RhbnRzW2tmLmNvbnN0YW50XSB8fCAwO1xuXG5cdFx0XHRcdGtmLmZyYW1lID0gb2Zmc2V0O1xuXG5cdFx0XHRcdGlmKGtmLmlzUGVyY2VudGFnZSkge1xuXHRcdFx0XHRcdC8vQ29udmVydCB0aGUgb2Zmc2V0IHRvIHBlcmNlbnRhZ2Ugb2YgdGhlIHZpZXdwb3J0IGhlaWdodC5cblx0XHRcdFx0XHRvZmZzZXQgPSBvZmZzZXQgKiB2aWV3cG9ydEhlaWdodDtcblxuXHRcdFx0XHRcdC8vQWJzb2x1dGUgKyBwZXJjZW50YWdlIG1vZGUuXG5cdFx0XHRcdFx0a2YuZnJhbWUgPSBvZmZzZXQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihrZi5tb2RlID09PSAncmVsYXRpdmUnKSB7XG5cdFx0XHRcdFx0X3Jlc2V0KGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0a2YuZnJhbWUgPSBfaW5zdGFuY2UucmVsYXRpdmVUb0Fic29sdXRlKGFuY2hvclRhcmdldCwga2YuYW5jaG9yc1swXSwga2YuYW5jaG9yc1sxXSkgLSBvZmZzZXQ7XG5cblx0XHRcdFx0XHRfcmVzZXQoZWxlbWVudCwgdHJ1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRrZi5mcmFtZSArPSBjb25zdGFudFZhbHVlO1xuXG5cdFx0XHRcdC8vT25seSBzZWFyY2ggZm9yIG1heCBrZXkgZnJhbWUgd2hlbiBmb3JjZUhlaWdodCBpcyBlbmFibGVkLlxuXHRcdFx0XHRpZihfZm9yY2VIZWlnaHQpIHtcblx0XHRcdFx0XHQvL0ZpbmQgdGhlIG1heCBrZXkgZnJhbWUsIGJ1dCBkb24ndCB1c2Ugb25lIG9mIHRoZSBkYXRhLWVuZCBvbmVzIGZvciBjb21wYXJpc29uLlxuXHRcdFx0XHRcdGlmKCFrZi5pc0VuZCAmJiBrZi5mcmFtZSA+IF9tYXhLZXlGcmFtZSkge1xuXHRcdFx0XHRcdFx0X21heEtleUZyYW1lID0ga2YuZnJhbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8jMTMzOiBUaGUgZG9jdW1lbnQgY2FuIGJlIGxhcmdlciB0aGFuIHRoZSBtYXhLZXlGcmFtZSB3ZSBmb3VuZC5cblx0XHRfbWF4S2V5RnJhbWUgPSBNYXRoLm1heChfbWF4S2V5RnJhbWUsIF9nZXREb2N1bWVudEhlaWdodCgpKTtcblxuXHRcdC8vTm93IHByb2Nlc3MgYWxsIGRhdGEtZW5kIGtleWZyYW1lcy5cblx0XHRza3JvbGxhYmxlSW5kZXggPSAwO1xuXHRcdHNrcm9sbGFibGVzTGVuZ3RoID0gX3Nrcm9sbGFibGVzLmxlbmd0aDtcblxuXHRcdGZvcig7IHNrcm9sbGFibGVJbmRleCA8IHNrcm9sbGFibGVzTGVuZ3RoOyBza3JvbGxhYmxlSW5kZXgrKykge1xuXHRcdFx0c2tyb2xsYWJsZSA9IF9za3JvbGxhYmxlc1tza3JvbGxhYmxlSW5kZXhdO1xuXHRcdFx0a2V5RnJhbWVzID0gc2tyb2xsYWJsZS5rZXlGcmFtZXM7XG5cblx0XHRcdGtleUZyYW1lSW5kZXggPSAwO1xuXHRcdFx0a2V5RnJhbWVzTGVuZ3RoID0ga2V5RnJhbWVzLmxlbmd0aDtcblxuXHRcdFx0Zm9yKDsga2V5RnJhbWVJbmRleCA8IGtleUZyYW1lc0xlbmd0aDsga2V5RnJhbWVJbmRleCsrKSB7XG5cdFx0XHRcdGtmID0ga2V5RnJhbWVzW2tleUZyYW1lSW5kZXhdO1xuXG5cdFx0XHRcdGNvbnN0YW50VmFsdWUgPSBwcm9jZXNzZWRDb25zdGFudHNba2YuY29uc3RhbnRdIHx8IDA7XG5cblx0XHRcdFx0aWYoa2YuaXNFbmQpIHtcblx0XHRcdFx0XHRrZi5mcmFtZSA9IF9tYXhLZXlGcmFtZSAtIGtmLm9mZnNldCArIGNvbnN0YW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0c2tyb2xsYWJsZS5rZXlGcmFtZXMuc29ydChfa2V5RnJhbWVDb21wYXJhdG9yKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgYW5kIHNldHMgdGhlIHN0eWxlIHByb3BlcnRpZXMgZm9yIHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBmcmFtZS5cblx0ICogQHBhcmFtIGZha2VGcmFtZSBUaGUgZnJhbWUgdG8gcmVuZGVyIGF0IHdoZW4gc21vb3RoIHNjcm9sbGluZyBpcyBlbmFibGVkLlxuXHQgKiBAcGFyYW0gYWN0dWFsRnJhbWUgVGhlIGFjdHVhbCBmcmFtZSB3ZSBhcmUgYXQuXG5cdCAqL1xuXHR2YXIgX2NhbGNTdGVwcyA9IGZ1bmN0aW9uKGZha2VGcmFtZSwgYWN0dWFsRnJhbWUpIHtcblx0XHQvL0l0ZXJhdGUgb3ZlciBhbGwgc2tyb2xsYWJsZXMuXG5cdFx0dmFyIHNrcm9sbGFibGVJbmRleCA9IDA7XG5cdFx0dmFyIHNrcm9sbGFibGVzTGVuZ3RoID0gX3Nrcm9sbGFibGVzLmxlbmd0aDtcblxuXHRcdGZvcig7IHNrcm9sbGFibGVJbmRleCA8IHNrcm9sbGFibGVzTGVuZ3RoOyBza3JvbGxhYmxlSW5kZXgrKykge1xuXHRcdFx0dmFyIHNrcm9sbGFibGUgPSBfc2tyb2xsYWJsZXNbc2tyb2xsYWJsZUluZGV4XTtcblx0XHRcdHZhciBlbGVtZW50ID0gc2tyb2xsYWJsZS5lbGVtZW50O1xuXHRcdFx0dmFyIGZyYW1lID0gc2tyb2xsYWJsZS5zbW9vdGhTY3JvbGxpbmcgPyBmYWtlRnJhbWUgOiBhY3R1YWxGcmFtZTtcblx0XHRcdHZhciBmcmFtZXMgPSBza3JvbGxhYmxlLmtleUZyYW1lcztcblx0XHRcdHZhciBmcmFtZXNMZW5ndGggPSBmcmFtZXMubGVuZ3RoO1xuXHRcdFx0dmFyIGZpcnN0RnJhbWUgPSBmcmFtZXNbMF07XG5cdFx0XHR2YXIgbGFzdEZyYW1lID0gZnJhbWVzW2ZyYW1lcy5sZW5ndGggLSAxXTtcblx0XHRcdHZhciBiZWZvcmVGaXJzdCA9IGZyYW1lIDwgZmlyc3RGcmFtZS5mcmFtZTtcblx0XHRcdHZhciBhZnRlckxhc3QgPSBmcmFtZSA+IGxhc3RGcmFtZS5mcmFtZTtcblx0XHRcdHZhciBmaXJzdE9yTGFzdEZyYW1lID0gYmVmb3JlRmlyc3QgPyBmaXJzdEZyYW1lIDogbGFzdEZyYW1lO1xuXHRcdFx0dmFyIGVtaXRFdmVudHMgPSBza3JvbGxhYmxlLmVtaXRFdmVudHM7XG5cdFx0XHR2YXIgbGFzdEZyYW1lSW5kZXggPSBza3JvbGxhYmxlLmxhc3RGcmFtZUluZGV4O1xuXHRcdFx0dmFyIGtleTtcblx0XHRcdHZhciB2YWx1ZTtcblxuXHRcdFx0Ly9JZiB3ZSBhcmUgYmVmb3JlL2FmdGVyIHRoZSBmaXJzdC9sYXN0IGZyYW1lLCBzZXQgdGhlIHN0eWxlcyBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGVkZ2Ugc3RyYXRlZ3kuXG5cdFx0XHRpZihiZWZvcmVGaXJzdCB8fCBhZnRlckxhc3QpIHtcblx0XHRcdFx0Ly9DaGVjayBpZiB3ZSBhbHJlYWR5IGhhbmRsZWQgdGhpcyBlZGdlIGNhc2UgbGFzdCB0aW1lLlxuXHRcdFx0XHQvL05vdGU6IHVzaW5nIHNldFNjcm9sbFRvcCBpdCdzIHBvc3NpYmxlIHRoYXQgd2UganVtcGVkIGZyb20gb25lIGVkZ2UgdG8gdGhlIG90aGVyLlxuXHRcdFx0XHRpZihiZWZvcmVGaXJzdCAmJiBza3JvbGxhYmxlLmVkZ2UgPT09IC0xIHx8IGFmdGVyTGFzdCAmJiBza3JvbGxhYmxlLmVkZ2UgPT09IDEpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vQWRkIHRoZSBza3JvbGxyLWJlZm9yZSBvciAtYWZ0ZXIgY2xhc3MuXG5cdFx0XHRcdGlmKGJlZm9yZUZpcnN0KSB7XG5cdFx0XHRcdFx0X3VwZGF0ZUNsYXNzKGVsZW1lbnQsIFtTS1JPTExBQkxFX0JFRk9SRV9DTEFTU10sIFtTS1JPTExBQkxFX0FGVEVSX0NMQVNTLCBTS1JPTExBQkxFX0JFVFdFRU5fQ0xBU1NdKTtcblxuXHRcdFx0XHRcdC8vVGhpcyBoYW5kbGVzIHRoZSBzcGVjaWFsIGNhc2Ugd2hlcmUgd2UgZXhpdCB0aGUgZmlyc3Qga2V5ZnJhbWUuXG5cdFx0XHRcdFx0aWYoZW1pdEV2ZW50cyAmJiBsYXN0RnJhbWVJbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0XHRfZW1pdEV2ZW50KGVsZW1lbnQsIGZpcnN0RnJhbWUuZXZlbnRUeXBlLCBfZGlyZWN0aW9uKTtcblx0XHRcdFx0XHRcdHNrcm9sbGFibGUubGFzdEZyYW1lSW5kZXggPSAtMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X3VwZGF0ZUNsYXNzKGVsZW1lbnQsIFtTS1JPTExBQkxFX0FGVEVSX0NMQVNTXSwgW1NLUk9MTEFCTEVfQkVGT1JFX0NMQVNTLCBTS1JPTExBQkxFX0JFVFdFRU5fQ0xBU1NdKTtcblxuXHRcdFx0XHRcdC8vVGhpcyBoYW5kbGVzIHRoZSBzcGVjaWFsIGNhc2Ugd2hlcmUgd2UgZXhpdCB0aGUgbGFzdCBrZXlmcmFtZS5cblx0XHRcdFx0XHRpZihlbWl0RXZlbnRzICYmIGxhc3RGcmFtZUluZGV4IDwgZnJhbWVzTGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRfZW1pdEV2ZW50KGVsZW1lbnQsIGxhc3RGcmFtZS5ldmVudFR5cGUsIF9kaXJlY3Rpb24pO1xuXHRcdFx0XHRcdFx0c2tyb2xsYWJsZS5sYXN0RnJhbWVJbmRleCA9IGZyYW1lc0xlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL1JlbWVtYmVyIHRoYXQgd2UgaGFuZGxlZCB0aGUgZWRnZSBjYXNlIChiZWZvcmUvYWZ0ZXIgdGhlIGZpcnN0L2xhc3Qga2V5ZnJhbWUpLlxuXHRcdFx0XHRza3JvbGxhYmxlLmVkZ2UgPSBiZWZvcmVGaXJzdCA/IC0xIDogMTtcblxuXHRcdFx0XHRzd2l0Y2goc2tyb2xsYWJsZS5lZGdlU3RyYXRlZ3kpIHtcblx0XHRcdFx0XHRjYXNlICdyZXNldCc6XG5cdFx0XHRcdFx0XHRfcmVzZXQoZWxlbWVudCk7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRjYXNlICdlYXNlJzpcblx0XHRcdFx0XHRcdC8vSGFuZGxlIHRoaXMgY2FzZSBsaWtlIGl0IHdvdWxkIGJlIGV4YWN0bHkgYXQgZmlyc3QvbGFzdCBrZXlmcmFtZSBhbmQganVzdCBwYXNzIGl0IG9uLlxuXHRcdFx0XHRcdFx0ZnJhbWUgPSBmaXJzdE9yTGFzdEZyYW1lLmZyYW1lO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0XHRcdFx0dmFyIHByb3BzID0gZmlyc3RPckxhc3RGcmFtZS5wcm9wcztcblxuXHRcdFx0XHRcdFx0Zm9yKGtleSBpbiBwcm9wcykge1xuXHRcdFx0XHRcdFx0XHRpZihoYXNQcm9wLmNhbGwocHJvcHMsIGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZSA9IF9pbnRlcnBvbGF0ZVN0cmluZyhwcm9wc1trZXldLnZhbHVlKTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vU2V0IHN0eWxlIG9yIGF0dHJpYnV0ZS5cblx0XHRcdFx0XHRcdFx0XHRpZihrZXkuaW5kZXhPZignQCcpID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXkuc3Vic3RyKDEpLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNrcm9sbHIuc2V0U3R5bGUoZWxlbWVudCwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvL0RpZCB3ZSBoYW5kbGUgYW4gZWRnZSBsYXN0IHRpbWU/XG5cdFx0XHRcdGlmKHNrcm9sbGFibGUuZWRnZSAhPT0gMCkge1xuXHRcdFx0XHRcdF91cGRhdGVDbGFzcyhlbGVtZW50LCBbU0tST0xMQUJMRV9DTEFTUywgU0tST0xMQUJMRV9CRVRXRUVOX0NMQVNTXSwgW1NLUk9MTEFCTEVfQkVGT1JFX0NMQVNTLCBTS1JPTExBQkxFX0FGVEVSX0NMQVNTXSk7XG5cdFx0XHRcdFx0c2tyb2xsYWJsZS5lZGdlID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvL0ZpbmQgb3V0IGJldHdlZW4gd2hpY2ggdHdvIGtleSBmcmFtZXMgd2UgYXJlIHJpZ2h0IG5vdy5cblx0XHRcdHZhciBrZXlGcmFtZUluZGV4ID0gMDtcblxuXHRcdFx0Zm9yKDsga2V5RnJhbWVJbmRleCA8IGZyYW1lc0xlbmd0aCAtIDE7IGtleUZyYW1lSW5kZXgrKykge1xuXHRcdFx0XHRpZihmcmFtZSA+PSBmcmFtZXNba2V5RnJhbWVJbmRleF0uZnJhbWUgJiYgZnJhbWUgPD0gZnJhbWVzW2tleUZyYW1lSW5kZXggKyAxXS5mcmFtZSkge1xuXHRcdFx0XHRcdHZhciBsZWZ0ID0gZnJhbWVzW2tleUZyYW1lSW5kZXhdO1xuXHRcdFx0XHRcdHZhciByaWdodCA9IGZyYW1lc1trZXlGcmFtZUluZGV4ICsgMV07XG5cblx0XHRcdFx0XHRmb3Ioa2V5IGluIGxlZnQucHJvcHMpIHtcblx0XHRcdFx0XHRcdGlmKGhhc1Byb3AuY2FsbChsZWZ0LnByb3BzLCBrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBwcm9ncmVzcyA9IChmcmFtZSAtIGxlZnQuZnJhbWUpIC8gKHJpZ2h0LmZyYW1lIC0gbGVmdC5mcmFtZSk7XG5cblx0XHRcdFx0XHRcdFx0Ly9UcmFuc2Zvcm0gdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgdXNpbmcgdGhlIGdpdmVuIGVhc2luZyBmdW5jdGlvbi5cblx0XHRcdFx0XHRcdFx0cHJvZ3Jlc3MgPSBsZWZ0LnByb3BzW2tleV0uZWFzaW5nKHByb2dyZXNzKTtcblxuXHRcdFx0XHRcdFx0XHQvL0ludGVycG9sYXRlIGJldHdlZW4gdGhlIHR3byB2YWx1ZXNcblx0XHRcdFx0XHRcdFx0dmFsdWUgPSBfY2FsY0ludGVycG9sYXRpb24obGVmdC5wcm9wc1trZXldLnZhbHVlLCByaWdodC5wcm9wc1trZXldLnZhbHVlLCBwcm9ncmVzcyk7XG5cblx0XHRcdFx0XHRcdFx0dmFsdWUgPSBfaW50ZXJwb2xhdGVTdHJpbmcodmFsdWUpO1xuXG5cdFx0XHRcdFx0XHRcdC8vU2V0IHN0eWxlIG9yIGF0dHJpYnV0ZS5cblx0XHRcdFx0XHRcdFx0aWYoa2V5LmluZGV4T2YoJ0AnKSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleS5zdWJzdHIoMSksIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRza3JvbGxyLnNldFN0eWxlKGVsZW1lbnQsIGtleSwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly9BcmUgZXZlbnRzIGVuYWJsZWQgb24gdGhpcyBlbGVtZW50P1xuXHRcdFx0XHRcdC8vVGhpcyBjb2RlIGhhbmRsZXMgdGhlIHVzdWFsIGNhc2VzIG9mIHNjcm9sbGluZyB0aHJvdWdoIGRpZmZlcmVudCBrZXlmcmFtZXMuXG5cdFx0XHRcdFx0Ly9UaGUgc3BlY2lhbCBjYXNlcyBvZiBiZWZvcmUgZmlyc3QgYW5kIGFmdGVyIGxhc3Qga2V5ZnJhbWUgYXJlIGhhbmRsZWQgYWJvdmUuXG5cdFx0XHRcdFx0aWYoZW1pdEV2ZW50cykge1xuXHRcdFx0XHRcdFx0Ly9EaWQgd2UgcGFzcyBhIG5ldyBrZXlmcmFtZT9cblx0XHRcdFx0XHRcdGlmKGxhc3RGcmFtZUluZGV4ICE9PSBrZXlGcmFtZUluZGV4KSB7XG5cdFx0XHRcdFx0XHRcdGlmKF9kaXJlY3Rpb24gPT09ICdkb3duJykge1xuXHRcdFx0XHRcdFx0XHRcdF9lbWl0RXZlbnQoZWxlbWVudCwgbGVmdC5ldmVudFR5cGUsIF9kaXJlY3Rpb24pO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9lbWl0RXZlbnQoZWxlbWVudCwgcmlnaHQuZXZlbnRUeXBlLCBfZGlyZWN0aW9uKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHNrcm9sbGFibGUubGFzdEZyYW1lSW5kZXggPSBrZXlGcmFtZUluZGV4O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZW5kZXJzIGFsbCBlbGVtZW50cy5cblx0ICovXG5cdHZhciBfcmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYoX3JlcXVlc3RSZWZsb3cpIHtcblx0XHRcdF9yZXF1ZXN0UmVmbG93ID0gZmFsc2U7XG5cdFx0XHRfcmVmbG93KCk7XG5cdFx0fVxuXG5cdFx0Ly9XZSBtYXkgcmVuZGVyIHNvbWV0aGluZyBlbHNlIHRoYW4gdGhlIGFjdHVhbCBzY3JvbGxiYXIgcG9zaXRpb24uXG5cdFx0dmFyIHJlbmRlclRvcCA9IF9pbnN0YW5jZS5nZXRTY3JvbGxUb3AoKTtcblxuXHRcdC8vSWYgdGhlcmUncyBhbiBhbmltYXRpb24sIHdoaWNoIGVuZHMgaW4gY3VycmVudCByZW5kZXIgY2FsbCwgY2FsbCB0aGUgY2FsbGJhY2sgYWZ0ZXIgcmVuZGVyaW5nLlxuXHRcdHZhciBhZnRlckFuaW1hdGlvbkNhbGxiYWNrO1xuXHRcdHZhciBub3cgPSBfbm93KCk7XG5cdFx0dmFyIHByb2dyZXNzO1xuXG5cdFx0Ly9CZWZvcmUgYWN0dWFsbHkgcmVuZGVyaW5nIGhhbmRsZSB0aGUgc2Nyb2xsIGFuaW1hdGlvbiwgaWYgYW55LlxuXHRcdGlmKF9zY3JvbGxBbmltYXRpb24pIHtcblx0XHRcdC8vSXQncyBvdmVyXG5cdFx0XHRpZihub3cgPj0gX3Njcm9sbEFuaW1hdGlvbi5lbmRUaW1lKSB7XG5cdFx0XHRcdHJlbmRlclRvcCA9IF9zY3JvbGxBbmltYXRpb24udGFyZ2V0VG9wO1xuXHRcdFx0XHRhZnRlckFuaW1hdGlvbkNhbGxiYWNrID0gX3Njcm9sbEFuaW1hdGlvbi5kb25lO1xuXHRcdFx0XHRfc2Nyb2xsQW5pbWF0aW9uID0gdW5kZWZpbmVkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly9NYXAgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgdG8gdGhlIG5ldyBwcm9ncmVzcyB1c2luZyBnaXZlbiBlYXNpbmcgZnVuY3Rpb24uXG5cdFx0XHRcdHByb2dyZXNzID0gX3Njcm9sbEFuaW1hdGlvbi5lYXNpbmcoKG5vdyAtIF9zY3JvbGxBbmltYXRpb24uc3RhcnRUaW1lKSAvIF9zY3JvbGxBbmltYXRpb24uZHVyYXRpb24pO1xuXG5cdFx0XHRcdHJlbmRlclRvcCA9IChfc2Nyb2xsQW5pbWF0aW9uLnN0YXJ0VG9wICsgcHJvZ3Jlc3MgKiBfc2Nyb2xsQW5pbWF0aW9uLnRvcERpZmYpIHwgMDtcblx0XHRcdH1cblxuXHRcdFx0X2luc3RhbmNlLnNldFNjcm9sbFRvcChyZW5kZXJUb3AsIHRydWUpO1xuXHRcdH1cblx0XHQvL1Ntb290aCBzY3JvbGxpbmcgb25seSBpZiB0aGVyZSdzIG5vIGFuaW1hdGlvbiBydW5uaW5nIGFuZCBpZiB3ZSdyZSBub3QgZm9yY2luZyB0aGUgcmVuZGVyaW5nLlxuXHRcdGVsc2UgaWYoIV9mb3JjZVJlbmRlcikge1xuXHRcdFx0dmFyIHNtb290aFNjcm9sbGluZ0RpZmYgPSBfc21vb3RoU2Nyb2xsaW5nLnRhcmdldFRvcCAtIHJlbmRlclRvcDtcblxuXHRcdFx0Ly9UaGUgdXNlciBzY3JvbGxlZCwgc3RhcnQgbmV3IHNtb290aCBzY3JvbGxpbmcuXG5cdFx0XHRpZihzbW9vdGhTY3JvbGxpbmdEaWZmKSB7XG5cdFx0XHRcdF9zbW9vdGhTY3JvbGxpbmcgPSB7XG5cdFx0XHRcdFx0c3RhcnRUb3A6IF9sYXN0VG9wLFxuXHRcdFx0XHRcdHRvcERpZmY6IHJlbmRlclRvcCAtIF9sYXN0VG9wLFxuXHRcdFx0XHRcdHRhcmdldFRvcDogcmVuZGVyVG9wLFxuXHRcdFx0XHRcdHN0YXJ0VGltZTogX2xhc3RSZW5kZXJDYWxsLFxuXHRcdFx0XHRcdGVuZFRpbWU6IF9sYXN0UmVuZGVyQ2FsbCArIF9zbW9vdGhTY3JvbGxpbmdEdXJhdGlvblxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvL0ludGVycG9sYXRlIHRoZSBpbnRlcm5hbCBzY3JvbGwgcG9zaXRpb24gKG5vdCB0aGUgYWN0dWFsIHNjcm9sbGJhcikuXG5cdFx0XHRpZihub3cgPD0gX3Ntb290aFNjcm9sbGluZy5lbmRUaW1lKSB7XG5cdFx0XHRcdC8vTWFwIHRoZSBjdXJyZW50IHByb2dyZXNzIHRvIHRoZSBuZXcgcHJvZ3Jlc3MgdXNpbmcgZWFzaW5nIGZ1bmN0aW9uLlxuXHRcdFx0XHRwcm9ncmVzcyA9IGVhc2luZ3Muc3FydCgobm93IC0gX3Ntb290aFNjcm9sbGluZy5zdGFydFRpbWUpIC8gX3Ntb290aFNjcm9sbGluZ0R1cmF0aW9uKTtcblxuXHRcdFx0XHRyZW5kZXJUb3AgPSAoX3Ntb290aFNjcm9sbGluZy5zdGFydFRvcCArIHByb2dyZXNzICogX3Ntb290aFNjcm9sbGluZy50b3BEaWZmKSB8IDA7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly9UaGF0J3Mgd2VyZSB3ZSBhY3R1YWxseSBcInNjcm9sbFwiIG9uIG1vYmlsZS5cblx0XHRpZihfaXNNb2JpbGUgJiYgX3Nrcm9sbHJCb2R5KSB7XG5cdFx0XHQvL1NldCB0aGUgdHJhbnNmb3JtIChcInNjcm9sbCBpdFwiKS5cblx0XHRcdHNrcm9sbHIuc2V0U3R5bGUoX3Nrcm9sbHJCb2R5LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCAnICsgLShfbW9iaWxlT2Zmc2V0KSArICdweCkgJyArIF90cmFuc2xhdGVaKTtcblx0XHR9XG5cblx0XHQvL0RpZCB0aGUgc2Nyb2xsIHBvc2l0aW9uIGV2ZW4gY2hhbmdlP1xuXHRcdGlmKF9mb3JjZVJlbmRlciB8fCBfbGFzdFRvcCAhPT0gcmVuZGVyVG9wKSB7XG5cdFx0XHQvL1JlbWVtYmVyIGluIHdoaWNoIGRpcmVjdGlvbiBhcmUgd2Ugc2Nyb2xsaW5nP1xuXHRcdFx0X2RpcmVjdGlvbiA9IChyZW5kZXJUb3AgPiBfbGFzdFRvcCkgPyAnZG93bicgOiAocmVuZGVyVG9wIDwgX2xhc3RUb3AgPyAndXAnIDogX2RpcmVjdGlvbik7XG5cblx0XHRcdF9mb3JjZVJlbmRlciA9IGZhbHNlO1xuXG5cdFx0XHR2YXIgbGlzdGVuZXJQYXJhbXMgPSB7XG5cdFx0XHRcdGN1clRvcDogcmVuZGVyVG9wLFxuXHRcdFx0XHRsYXN0VG9wOiBfbGFzdFRvcCxcblx0XHRcdFx0bWF4VG9wOiBfbWF4S2V5RnJhbWUsXG5cdFx0XHRcdGRpcmVjdGlvbjogX2RpcmVjdGlvblxuXHRcdFx0fTtcblxuXHRcdFx0Ly9UZWxsIHRoZSBsaXN0ZW5lciB3ZSBhcmUgYWJvdXQgdG8gcmVuZGVyLlxuXHRcdFx0dmFyIGNvbnRpbnVlUmVuZGVyaW5nID0gX2xpc3RlbmVycy5iZWZvcmVyZW5kZXIgJiYgX2xpc3RlbmVycy5iZWZvcmVyZW5kZXIuY2FsbChfaW5zdGFuY2UsIGxpc3RlbmVyUGFyYW1zKTtcblxuXHRcdFx0Ly9UaGUgYmVmb3JlcmVuZGVyIGxpc3RlbmVyIGZ1bmN0aW9uIGlzIGFibGUgdGhlIGNhbmNlbCByZW5kZXJpbmcuXG5cdFx0XHRpZihjb250aW51ZVJlbmRlcmluZyAhPT0gZmFsc2UpIHtcblx0XHRcdFx0Ly9Ob3cgYWN0dWFsbHkgaW50ZXJwb2xhdGUgYWxsIHRoZSBzdHlsZXMuXG5cdFx0XHRcdF9jYWxjU3RlcHMocmVuZGVyVG9wLCBfaW5zdGFuY2UuZ2V0U2Nyb2xsVG9wKCkpO1xuXG5cdFx0XHRcdC8vUmVtZW1iZXIgd2hlbiB3ZSBsYXN0IHJlbmRlcmVkLlxuXHRcdFx0XHRfbGFzdFRvcCA9IHJlbmRlclRvcDtcblxuXHRcdFx0XHRpZihfbGlzdGVuZXJzLnJlbmRlcikge1xuXHRcdFx0XHRcdF9saXN0ZW5lcnMucmVuZGVyLmNhbGwoX2luc3RhbmNlLCBsaXN0ZW5lclBhcmFtcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoYWZ0ZXJBbmltYXRpb25DYWxsYmFjaykge1xuXHRcdFx0XHRhZnRlckFuaW1hdGlvbkNhbGxiYWNrLmNhbGwoX2luc3RhbmNlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0X2xhc3RSZW5kZXJDYWxsID0gbm93O1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBQYXJzZXMgdGhlIHByb3BlcnRpZXMgZm9yIGVhY2gga2V5IGZyYW1lIG9mIHRoZSBnaXZlbiBza3JvbGxhYmxlLlxuXHQgKi9cblx0dmFyIF9wYXJzZVByb3BzID0gZnVuY3Rpb24oc2tyb2xsYWJsZSkge1xuXHRcdC8vSXRlcmF0ZSBvdmVyIGFsbCBrZXkgZnJhbWVzXG5cdFx0dmFyIGtleUZyYW1lSW5kZXggPSAwO1xuXHRcdHZhciBrZXlGcmFtZXNMZW5ndGggPSBza3JvbGxhYmxlLmtleUZyYW1lcy5sZW5ndGg7XG5cblx0XHRmb3IoOyBrZXlGcmFtZUluZGV4IDwga2V5RnJhbWVzTGVuZ3RoOyBrZXlGcmFtZUluZGV4KyspIHtcblx0XHRcdHZhciBmcmFtZSA9IHNrcm9sbGFibGUua2V5RnJhbWVzW2tleUZyYW1lSW5kZXhdO1xuXHRcdFx0dmFyIGVhc2luZztcblx0XHRcdHZhciB2YWx1ZTtcblx0XHRcdHZhciBwcm9wO1xuXHRcdFx0dmFyIHByb3BzID0ge307XG5cblx0XHRcdHZhciBtYXRjaDtcblxuXHRcdFx0d2hpbGUoKG1hdGNoID0gcnhQcm9wVmFsdWUuZXhlYyhmcmFtZS5wcm9wcykpICE9PSBudWxsKSB7XG5cdFx0XHRcdHByb3AgPSBtYXRjaFsxXTtcblx0XHRcdFx0dmFsdWUgPSBtYXRjaFsyXTtcblxuXHRcdFx0XHRlYXNpbmcgPSBwcm9wLm1hdGNoKHJ4UHJvcEVhc2luZyk7XG5cblx0XHRcdFx0Ly9JcyB0aGVyZSBhbiBlYXNpbmcgc3BlY2lmaWVkIGZvciB0aGlzIHByb3A/XG5cdFx0XHRcdGlmKGVhc2luZyAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHByb3AgPSBlYXNpbmdbMV07XG5cdFx0XHRcdFx0ZWFzaW5nID0gZWFzaW5nWzJdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVhc2luZyA9IERFRkFVTFRfRUFTSU5HO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9FeGNsYW1hdGlvbiBwb2ludCBhdCBmaXJzdCBwb3NpdGlvbiBmb3JjZXMgdGhlIHZhbHVlIHRvIGJlIHRha2VuIGxpdGVyYWwuXG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuaW5kZXhPZignIScpID8gX3BhcnNlUHJvcCh2YWx1ZSkgOiBbdmFsdWUuc2xpY2UoMSldO1xuXG5cdFx0XHRcdC8vU2F2ZSB0aGUgcHJvcCBmb3IgdGhpcyBrZXkgZnJhbWUgd2l0aCBoaXMgdmFsdWUgYW5kIGVhc2luZyBmdW5jdGlvblxuXHRcdFx0XHRwcm9wc1twcm9wXSA9IHtcblx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0ZWFzaW5nOiBlYXNpbmdzW2Vhc2luZ11cblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0ZnJhbWUucHJvcHMgPSBwcm9wcztcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFBhcnNlcyBhIHZhbHVlIGV4dHJhY3RpbmcgbnVtZXJpYyB2YWx1ZXMgYW5kIGdlbmVyYXRpbmcgYSBmb3JtYXQgc3RyaW5nXG5cdCAqIGZvciBsYXRlciBpbnRlcnBvbGF0aW9uIG9mIHRoZSBuZXcgdmFsdWVzIGluIG9sZCBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWwgVGhlIENTUyB2YWx1ZSB0byBiZSBwYXJzZWQuXG5cdCAqIEByZXR1cm4gU29tZXRoaW5nIGxpa2UgW1wicmdiYSg/JSw/JSwgPyUsPylcIiwgMTAwLCA1MCwgMCwgLjddXG5cdCAqIHdoZXJlIHRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZSBmb3JtYXQgc3RyaW5nIGxhdGVyIHVzZWRcblx0ICogYW5kIGFsbCBmb2xsb3dpbmcgZWxlbWVudHMgYXJlIHRoZSBudW1lcmljIHZhbHVlLlxuXHQgKi9cblx0dmFyIF9wYXJzZVByb3AgPSBmdW5jdGlvbih2YWwpIHtcblx0XHR2YXIgbnVtYmVycyA9IFtdO1xuXG5cdFx0Ly9PbmUgc3BlY2lhbCBjYXNlLCB3aGVyZSBmbG9hdHMgZG9uJ3Qgd29yay5cblx0XHQvL1dlIHJlcGxhY2UgYWxsIG9jY3VyZW5jZXMgb2YgcmdiYSBjb2xvcnNcblx0XHQvL3doaWNoIGRvbid0IHVzZSBwZXJjZW50YWdlIG5vdGF0aW9uIHdpdGggdGhlIHBlcmNlbnRhZ2Ugbm90YXRpb24uXG5cdFx0cnhSR0JBSW50ZWdlckNvbG9yLmxhc3RJbmRleCA9IDA7XG5cdFx0dmFsID0gdmFsLnJlcGxhY2UocnhSR0JBSW50ZWdlckNvbG9yLCBmdW5jdGlvbihyZ2JhKSB7XG5cdFx0XHRyZXR1cm4gcmdiYS5yZXBsYWNlKHJ4TnVtZXJpY1ZhbHVlLCBmdW5jdGlvbihuKSB7XG5cdFx0XHRcdHJldHVybiBuIC8gMjU1ICogMTAwICsgJyUnO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvL0hhbmRsZSBwcmVmaXhpbmcgb2YgXCJncmFkaWVudFwiIHZhbHVlcy5cblx0XHQvL0ZvciBub3cgb25seSB0aGUgcHJlZml4ZWQgdmFsdWUgd2lsbCBiZSBzZXQuIFVucHJlZml4ZWQgaXNuJ3Qgc3VwcG9ydGVkIGFueXdheS5cblx0XHRpZih0aGVEYXNoZWRDU1NQcmVmaXgpIHtcblx0XHRcdHJ4R3JhZGllbnQubGFzdEluZGV4ID0gMDtcblx0XHRcdHZhbCA9IHZhbC5yZXBsYWNlKHJ4R3JhZGllbnQsIGZ1bmN0aW9uKHMpIHtcblx0XHRcdFx0cmV0dXJuIHRoZURhc2hlZENTU1ByZWZpeCArIHM7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvL05vdyBwYXJzZSBBTlkgbnVtYmVyIGluc2lkZSB0aGlzIHN0cmluZyBhbmQgY3JlYXRlIGEgZm9ybWF0IHN0cmluZy5cblx0XHR2YWwgPSB2YWwucmVwbGFjZShyeE51bWVyaWNWYWx1ZSwgZnVuY3Rpb24obikge1xuXHRcdFx0bnVtYmVycy5wdXNoKCtuKTtcblx0XHRcdHJldHVybiAnez99Jztcblx0XHR9KTtcblxuXHRcdC8vQWRkIHRoZSBmb3JtYXRzdHJpbmcgYXMgZmlyc3QgdmFsdWUuXG5cdFx0bnVtYmVycy51bnNoaWZ0KHZhbCk7XG5cblx0XHRyZXR1cm4gbnVtYmVycztcblx0fTtcblxuXHQvKipcblx0ICogRmlsbHMgdGhlIGtleSBmcmFtZXMgd2l0aCBtaXNzaW5nIGxlZnQgYW5kIHJpZ2h0IGhhbmQgcHJvcGVydGllcy5cblx0ICogSWYga2V5IGZyYW1lIDEgaGFzIHByb3BlcnR5IFggYW5kIGtleSBmcmFtZSAyIGlzIG1pc3NpbmcgWCxcblx0ICogYnV0IGtleSBmcmFtZSAzIGhhcyBYIGFnYWluLCB0aGVuIHdlIG5lZWQgdG8gYXNzaWduIFggdG8ga2V5IGZyYW1lIDIgdG9vLlxuXHQgKlxuXHQgKiBAcGFyYW0gc2sgQSBza3JvbGxhYmxlLlxuXHQgKi9cblx0dmFyIF9maWxsUHJvcHMgPSBmdW5jdGlvbihzaykge1xuXHRcdC8vV2lsbCBjb2xsZWN0IHRoZSBwcm9wZXJ0aWVzIGtleSBmcmFtZSBieSBrZXkgZnJhbWVcblx0XHR2YXIgcHJvcExpc3QgPSB7fTtcblx0XHR2YXIga2V5RnJhbWVJbmRleDtcblx0XHR2YXIga2V5RnJhbWVzTGVuZ3RoO1xuXG5cdFx0Ly9JdGVyYXRlIG92ZXIgYWxsIGtleSBmcmFtZXMgZnJvbSBsZWZ0IHRvIHJpZ2h0XG5cdFx0a2V5RnJhbWVJbmRleCA9IDA7XG5cdFx0a2V5RnJhbWVzTGVuZ3RoID0gc2sua2V5RnJhbWVzLmxlbmd0aDtcblxuXHRcdGZvcig7IGtleUZyYW1lSW5kZXggPCBrZXlGcmFtZXNMZW5ndGg7IGtleUZyYW1lSW5kZXgrKykge1xuXHRcdFx0X2ZpbGxQcm9wRm9yRnJhbWUoc2sua2V5RnJhbWVzW2tleUZyYW1lSW5kZXhdLCBwcm9wTGlzdCk7XG5cdFx0fVxuXG5cdFx0Ly9Ob3cgZG8gdGhlIHNhbWUgZnJvbSByaWdodCB0byBmaWxsIHRoZSBsYXN0IGdhcHNcblxuXHRcdHByb3BMaXN0ID0ge307XG5cblx0XHQvL0l0ZXJhdGUgb3ZlciBhbGwga2V5IGZyYW1lcyBmcm9tIHJpZ2h0IHRvIGxlZnRcblx0XHRrZXlGcmFtZUluZGV4ID0gc2sua2V5RnJhbWVzLmxlbmd0aCAtIDE7XG5cblx0XHRmb3IoOyBrZXlGcmFtZUluZGV4ID49IDA7IGtleUZyYW1lSW5kZXgtLSkge1xuXHRcdFx0X2ZpbGxQcm9wRm9yRnJhbWUoc2sua2V5RnJhbWVzW2tleUZyYW1lSW5kZXhdLCBwcm9wTGlzdCk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBfZmlsbFByb3BGb3JGcmFtZSA9IGZ1bmN0aW9uKGZyYW1lLCBwcm9wTGlzdCkge1xuXHRcdHZhciBrZXk7XG5cblx0XHQvL0ZvciBlYWNoIGtleSBmcmFtZSBpdGVyYXRlIG92ZXIgYWxsIHJpZ2h0IGhhbmQgcHJvcGVydGllcyBhbmQgYXNzaWduIHRoZW0sXG5cdFx0Ly9idXQgb25seSBpZiB0aGUgY3VycmVudCBrZXkgZnJhbWUgZG9lc24ndCBoYXZlIHRoZSBwcm9wZXJ0eSBieSBpdHNlbGZcblx0XHRmb3Ioa2V5IGluIHByb3BMaXN0KSB7XG5cdFx0XHQvL1RoZSBjdXJyZW50IGZyYW1lIG1pc3NlcyB0aGlzIHByb3BlcnR5LCBzbyBhc3NpZ24gaXQuXG5cdFx0XHRpZighaGFzUHJvcC5jYWxsKGZyYW1lLnByb3BzLCBrZXkpKSB7XG5cdFx0XHRcdGZyYW1lLnByb3BzW2tleV0gPSBwcm9wTGlzdFtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vSXRlcmF0ZSBvdmVyIGFsbCBwcm9wcyBvZiB0aGUgY3VycmVudCBmcmFtZSBhbmQgY29sbGVjdCB0aGVtXG5cdFx0Zm9yKGtleSBpbiBmcmFtZS5wcm9wcykge1xuXHRcdFx0cHJvcExpc3Rba2V5XSA9IGZyYW1lLnByb3BzW2tleV07XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBuZXcgdmFsdWVzIGZvciB0d28gZ2l2ZW4gdmFsdWVzIGFycmF5LlxuXHQgKi9cblx0dmFyIF9jYWxjSW50ZXJwb2xhdGlvbiA9IGZ1bmN0aW9uKHZhbDEsIHZhbDIsIHByb2dyZXNzKSB7XG5cdFx0dmFyIHZhbHVlSW5kZXg7XG5cdFx0dmFyIHZhbDFMZW5ndGggPSB2YWwxLmxlbmd0aDtcblxuXHRcdC8vVGhleSBib3RoIG5lZWQgdG8gaGF2ZSB0aGUgc2FtZSBsZW5ndGhcblx0XHRpZih2YWwxTGVuZ3RoICE9PSB2YWwyLmxlbmd0aCkge1xuXHRcdFx0dGhyb3cgJ0NhblxcJ3QgaW50ZXJwb2xhdGUgYmV0d2VlbiBcIicgKyB2YWwxWzBdICsgJ1wiIGFuZCBcIicgKyB2YWwyWzBdICsgJ1wiJztcblx0XHR9XG5cblx0XHQvL0FkZCB0aGUgZm9ybWF0IHN0cmluZyBhcyBmaXJzdCBlbGVtZW50LlxuXHRcdHZhciBpbnRlcnBvbGF0ZWQgPSBbdmFsMVswXV07XG5cblx0XHR2YWx1ZUluZGV4ID0gMTtcblxuXHRcdGZvcig7IHZhbHVlSW5kZXggPCB2YWwxTGVuZ3RoOyB2YWx1ZUluZGV4KyspIHtcblx0XHRcdC8vVGhhdCdzIHRoZSBsaW5lIHdoZXJlIHRoZSB0d28gbnVtYmVycyBhcmUgYWN0dWFsbHkgaW50ZXJwb2xhdGVkLlxuXHRcdFx0aW50ZXJwb2xhdGVkW3ZhbHVlSW5kZXhdID0gdmFsMVt2YWx1ZUluZGV4XSArICgodmFsMlt2YWx1ZUluZGV4XSAtIHZhbDFbdmFsdWVJbmRleF0pICogcHJvZ3Jlc3MpO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnRlcnBvbGF0ZWQ7XG5cdH07XG5cblx0LyoqXG5cdCAqIEludGVycG9sYXRlcyB0aGUgbnVtZXJpYyB2YWx1ZXMgaW50byB0aGUgZm9ybWF0IHN0cmluZy5cblx0ICovXG5cdHZhciBfaW50ZXJwb2xhdGVTdHJpbmcgPSBmdW5jdGlvbih2YWwpIHtcblx0XHR2YXIgdmFsdWVJbmRleCA9IDE7XG5cblx0XHRyeEludGVycG9sYXRlU3RyaW5nLmxhc3RJbmRleCA9IDA7XG5cblx0XHRyZXR1cm4gdmFsWzBdLnJlcGxhY2UocnhJbnRlcnBvbGF0ZVN0cmluZywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdmFsW3ZhbHVlSW5kZXgrK107XG5cdFx0fSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlc2V0cyB0aGUgY2xhc3MgYW5kIHN0eWxlIGF0dHJpYnV0ZSB0byB3aGF0IGl0IHdhcyBiZWZvcmUgc2tyb2xsciBtYW5pcHVsYXRlZCB0aGUgZWxlbWVudC5cblx0ICogQWxzbyByZW1lbWJlcnMgdGhlIHZhbHVlcyBpdCBoYWQgYmVmb3JlIHJlc2V0aW5nLCBpbiBvcmRlciB0byB1bmRvIHRoZSByZXNldC5cblx0ICovXG5cdHZhciBfcmVzZXQgPSBmdW5jdGlvbihlbGVtZW50cywgdW5kbykge1xuXHRcdC8vV2UgYWNjZXB0IGEgc2luZ2xlIGVsZW1lbnQgb3IgYW4gYXJyYXkgb2YgZWxlbWVudHMuXG5cdFx0ZWxlbWVudHMgPSBbXS5jb25jYXQoZWxlbWVudHMpO1xuXG5cdFx0dmFyIHNrcm9sbGFibGU7XG5cdFx0dmFyIGVsZW1lbnQ7XG5cdFx0dmFyIGVsZW1lbnRzSW5kZXggPSAwO1xuXHRcdHZhciBlbGVtZW50c0xlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdGZvcig7IGVsZW1lbnRzSW5kZXggPCBlbGVtZW50c0xlbmd0aDsgZWxlbWVudHNJbmRleCsrKSB7XG5cdFx0XHRlbGVtZW50ID0gZWxlbWVudHNbZWxlbWVudHNJbmRleF07XG5cdFx0XHRza3JvbGxhYmxlID0gX3Nrcm9sbGFibGVzW2VsZW1lbnRbU0tST0xMQUJMRV9JRF9ET01fUFJPUEVSVFldXTtcblxuXHRcdFx0Ly9Db3VsZG4ndCBmaW5kIHRoZSBza3JvbGxhYmxlIGZvciB0aGlzIERPTSBlbGVtZW50LlxuXHRcdFx0aWYoIXNrcm9sbGFibGUpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHVuZG8pIHtcblx0XHRcdFx0Ly9SZXNldCBjbGFzcyBhbmQgc3R5bGUgdG8gdGhlIFwiZGlydHlcIiAoc2V0IGJ5IHNrcm9sbHIpIHZhbHVlcy5cblx0XHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc2tyb2xsYWJsZS5kaXJ0eVN0eWxlQXR0cjtcblx0XHRcdFx0X3VwZGF0ZUNsYXNzKGVsZW1lbnQsIHNrcm9sbGFibGUuZGlydHlDbGFzc0F0dHIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly9SZW1lbWJlciB0aGUgXCJkaXJ0eVwiIChzZXQgYnkgc2tyb2xscikgY2xhc3MgYW5kIHN0eWxlLlxuXHRcdFx0XHRza3JvbGxhYmxlLmRpcnR5U3R5bGVBdHRyID0gZWxlbWVudC5zdHlsZS5jc3NUZXh0O1xuXHRcdFx0XHRza3JvbGxhYmxlLmRpcnR5Q2xhc3NBdHRyID0gX2dldENsYXNzKGVsZW1lbnQpO1xuXG5cdFx0XHRcdC8vUmVzZXQgY2xhc3MgYW5kIHN0eWxlIHRvIHdoYXQgaXQgb3JpZ2luYWxseSB3YXMuXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHNrcm9sbGFibGUuc3R5bGVBdHRyO1xuXHRcdFx0XHRfdXBkYXRlQ2xhc3MoZWxlbWVudCwgc2tyb2xsYWJsZS5jbGFzc0F0dHIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogRGV0ZWN0cyBzdXBwb3J0IGZvciAzZCB0cmFuc2Zvcm1zIGJ5IGFwcGx5aW5nIGl0IHRvIHRoZSBza3JvbGxyLWJvZHkuXG5cdCAqL1xuXHR2YXIgX2RldGVjdDNEVHJhbnNmb3JtcyA9IGZ1bmN0aW9uKCkge1xuXHRcdF90cmFuc2xhdGVaID0gJ3RyYW5zbGF0ZVooMCknO1xuXHRcdHNrcm9sbHIuc2V0U3R5bGUoX3Nrcm9sbHJCb2R5LCAndHJhbnNmb3JtJywgX3RyYW5zbGF0ZVopO1xuXG5cdFx0dmFyIGNvbXB1dGVkU3R5bGUgPSBnZXRTdHlsZShfc2tyb2xsckJvZHkpO1xuXHRcdHZhciBjb21wdXRlZFRyYW5zZm9ybSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJyk7XG5cdFx0dmFyIGNvbXB1dGVkVHJhbnNmb3JtV2l0aFByZWZpeCA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSh0aGVEYXNoZWRDU1NQcmVmaXggKyAndHJhbnNmb3JtJyk7XG5cdFx0dmFyIGhhczNEID0gKGNvbXB1dGVkVHJhbnNmb3JtICYmIGNvbXB1dGVkVHJhbnNmb3JtICE9PSAnbm9uZScpIHx8IChjb21wdXRlZFRyYW5zZm9ybVdpdGhQcmVmaXggJiYgY29tcHV0ZWRUcmFuc2Zvcm1XaXRoUHJlZml4ICE9PSAnbm9uZScpO1xuXG5cdFx0aWYoIWhhczNEKSB7XG5cdFx0XHRfdHJhbnNsYXRlWiA9ICcnO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogU2V0IHRoZSBDU1MgcHJvcGVydHkgb24gdGhlIGdpdmVuIGVsZW1lbnQuIFNldHMgcHJlZml4ZWQgcHJvcGVydGllcyBhcyB3ZWxsLlxuXHQgKi9cblx0c2tyb2xsci5zZXRTdHlsZSA9IGZ1bmN0aW9uKGVsLCBwcm9wLCB2YWwpIHtcblx0XHR2YXIgc3R5bGUgPSBlbC5zdHlsZTtcblxuXHRcdC8vQ2FtZWwgY2FzZS5cblx0XHRwcm9wID0gcHJvcC5yZXBsYWNlKHJ4Q2FtZWxDYXNlLCByeENhbWVsQ2FzZUZuKS5yZXBsYWNlKCctJywgJycpO1xuXG5cdFx0Ly9NYWtlIHN1cmUgei1pbmRleCBnZXRzIGEgPGludGVnZXI+LlxuXHRcdC8vVGhpcyBpcyB0aGUgb25seSA8aW50ZWdlcj4gY2FzZSB3ZSBuZWVkIHRvIGhhbmRsZS5cblx0XHRpZihwcm9wID09PSAnekluZGV4Jykge1xuXHRcdFx0aWYoaXNOYU4odmFsKSkge1xuXHRcdFx0XHQvL0lmIGl0J3Mgbm90IGEgbnVtYmVyLCBkb24ndCB0b3VjaCBpdC5cblx0XHRcdFx0Ly9JdCBjb3VsZCBmb3IgZXhhbXBsZSBiZSBcImF1dG9cIiAoIzM1MSkuXG5cdFx0XHRcdHN0eWxlW3Byb3BdID0gdmFsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly9GbG9vciB0aGUgbnVtYmVyLlxuXHRcdFx0XHRzdHlsZVtwcm9wXSA9ICcnICsgKHZhbCB8IDApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyM2NDogXCJmbG9hdFwiIGNhbid0IGJlIHNldCBhY3Jvc3MgYnJvd3NlcnMuIE5lZWRzIHRvIHVzZSBcImNzc0Zsb2F0XCIgZm9yIGFsbCBleGNlcHQgSUUuXG5cdFx0ZWxzZSBpZihwcm9wID09PSAnZmxvYXQnKSB7XG5cdFx0XHRzdHlsZS5zdHlsZUZsb2F0ID0gc3R5bGUuY3NzRmxvYXQgPSB2YWw7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Ly9OZWVkIHRyeS1jYXRjaCBmb3Igb2xkIElFLlxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly9TZXQgcHJlZml4ZWQgcHJvcGVydHkgaWYgdGhlcmUncyBhIHByZWZpeC5cblx0XHRcdFx0aWYodGhlQ1NTUHJlZml4KSB7XG5cdFx0XHRcdFx0c3R5bGVbdGhlQ1NTUHJlZml4ICsgcHJvcC5zbGljZSgwLDEpLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpXSA9IHZhbDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vU2V0IHVucHJlZml4ZWQuXG5cdFx0XHRcdHN0eWxlW3Byb3BdID0gdmFsO1xuXHRcdFx0fSBjYXRjaChpZ25vcmUpIHt9XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcm9zcyBicm93c2VyIGV2ZW50IGhhbmRsaW5nLlxuXHQgKi9cblx0dmFyIF9hZGRFdmVudCA9IHNrcm9sbHIuYWRkRXZlbnQgPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lcywgY2FsbGJhY2spIHtcblx0XHR2YXIgaW50ZXJtZWRpYXRlID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0Ly9Ob3JtYWxpemUgSUUgZXZlbnQgc3R1ZmYuXG5cdFx0XHRlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG5cblx0XHRcdGlmKCFlLnRhcmdldCkge1xuXHRcdFx0XHRlLnRhcmdldCA9IGUuc3JjRWxlbWVudDtcblx0XHRcdH1cblxuXHRcdFx0aWYoIWUucHJldmVudERlZmF1bHQpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcblx0XHRcdFx0XHRlLmRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBlKTtcblx0XHR9O1xuXG5cdFx0bmFtZXMgPSBuYW1lcy5zcGxpdCgnICcpO1xuXG5cdFx0dmFyIG5hbWU7XG5cdFx0dmFyIG5hbWVDb3VudGVyID0gMDtcblx0XHR2YXIgbmFtZXNMZW5ndGggPSBuYW1lcy5sZW5ndGg7XG5cblx0XHRmb3IoOyBuYW1lQ291bnRlciA8IG5hbWVzTGVuZ3RoOyBuYW1lQ291bnRlcisrKSB7XG5cdFx0XHRuYW1lID0gbmFtZXNbbmFtZUNvdW50ZXJdO1xuXG5cdFx0XHRpZihlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrLCBmYWxzZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50LmF0dGFjaEV2ZW50KCdvbicgKyBuYW1lLCBpbnRlcm1lZGlhdGUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL1JlbWVtYmVyIHRoZSBldmVudHMgdG8gYmUgYWJsZSB0byBmbHVzaCB0aGVtIGxhdGVyLlxuXHRcdFx0X3JlZ2lzdGVyZWRFdmVudHMucHVzaCh7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdGxpc3RlbmVyOiBjYWxsYmFja1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBfcmVtb3ZlRXZlbnQgPSBza3JvbGxyLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZWxlbWVudCwgbmFtZXMsIGNhbGxiYWNrKSB7XG5cdFx0bmFtZXMgPSBuYW1lcy5zcGxpdCgnICcpO1xuXG5cdFx0dmFyIG5hbWVDb3VudGVyID0gMDtcblx0XHR2YXIgbmFtZXNMZW5ndGggPSBuYW1lcy5sZW5ndGg7XG5cblx0XHRmb3IoOyBuYW1lQ291bnRlciA8IG5hbWVzTGVuZ3RoOyBuYW1lQ291bnRlcisrKSB7XG5cdFx0XHRpZihlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcblx0XHRcdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWVzW25hbWVDb3VudGVyXSwgY2FsbGJhY2ssIGZhbHNlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQuZGV0YWNoRXZlbnQoJ29uJyArIG5hbWVzW25hbWVDb3VudGVyXSwgY2FsbGJhY2spO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR2YXIgX3JlbW92ZUFsbEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBldmVudERhdGE7XG5cdFx0dmFyIGV2ZW50Q291bnRlciA9IDA7XG5cdFx0dmFyIGV2ZW50c0xlbmd0aCA9IF9yZWdpc3RlcmVkRXZlbnRzLmxlbmd0aDtcblxuXHRcdGZvcig7IGV2ZW50Q291bnRlciA8IGV2ZW50c0xlbmd0aDsgZXZlbnRDb3VudGVyKyspIHtcblx0XHRcdGV2ZW50RGF0YSA9IF9yZWdpc3RlcmVkRXZlbnRzW2V2ZW50Q291bnRlcl07XG5cblx0XHRcdF9yZW1vdmVFdmVudChldmVudERhdGEuZWxlbWVudCwgZXZlbnREYXRhLm5hbWUsIGV2ZW50RGF0YS5saXN0ZW5lcik7XG5cdFx0fVxuXG5cdFx0X3JlZ2lzdGVyZWRFdmVudHMgPSBbXTtcblx0fTtcblxuXHR2YXIgX2VtaXRFdmVudCA9IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWUsIGRpcmVjdGlvbikge1xuXHRcdGlmKF9saXN0ZW5lcnMua2V5ZnJhbWUpIHtcblx0XHRcdF9saXN0ZW5lcnMua2V5ZnJhbWUuY2FsbChfaW5zdGFuY2UsIGVsZW1lbnQsIG5hbWUsIGRpcmVjdGlvbik7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBfcmVmbG93ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHBvcyA9IF9pbnN0YW5jZS5nZXRTY3JvbGxUb3AoKTtcblxuXHRcdC8vV2lsbCBiZSByZWNhbGN1bGF0ZWQgYnkgX3VwZGF0ZURlcGVuZGVudEtleUZyYW1lcy5cblx0XHRfbWF4S2V5RnJhbWUgPSAwO1xuXG5cdFx0aWYoX2ZvcmNlSGVpZ2h0ICYmICFfaXNNb2JpbGUpIHtcblx0XHRcdC8vdW4tXCJmb3JjZVwiIHRoZSBoZWlnaHQgdG8gbm90IG1lc3Mgd2l0aCB0aGUgY2FsY3VsYXRpb25zIGluIF91cGRhdGVEZXBlbmRlbnRLZXlGcmFtZXMgKCMyMTYpLlxuXHRcdFx0Ym9keS5zdHlsZS5oZWlnaHQgPSAnJztcblx0XHR9XG5cblx0XHRfdXBkYXRlRGVwZW5kZW50S2V5RnJhbWVzKCk7XG5cblx0XHRpZihfZm9yY2VIZWlnaHQgJiYgIV9pc01vYmlsZSkge1xuXHRcdFx0Ly9cImZvcmNlXCIgdGhlIGhlaWdodC5cblx0XHRcdGJvZHkuc3R5bGUuaGVpZ2h0ID0gKF9tYXhLZXlGcmFtZSArIGRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICsgJ3B4Jztcblx0XHR9XG5cblx0XHQvL1RoZSBzY3JvbGwgb2Zmc2V0IG1heSBub3cgYmUgbGFyZ2VyIHRoYW4gbmVlZGVkIChvbiBkZXNrdG9wIHRoZSBicm93c2VyL29zIHByZXZlbnRzIHNjcm9sbGluZyBmYXJ0aGVyIHRoYW4gdGhlIGJvdHRvbSkuXG5cdFx0aWYoX2lzTW9iaWxlKSB7XG5cdFx0XHRfaW5zdGFuY2Uuc2V0U2Nyb2xsVG9wKE1hdGgubWluKF9pbnN0YW5jZS5nZXRTY3JvbGxUb3AoKSwgX21heEtleUZyYW1lKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vUmVtZW1iZXIgYW5kIHJlc2V0IHRoZSBzY3JvbGwgcG9zICgjMjE3KS5cblx0XHRcdF9pbnN0YW5jZS5zZXRTY3JvbGxUb3AocG9zLCB0cnVlKTtcblx0XHR9XG5cblx0XHRfZm9yY2VSZW5kZXIgPSB0cnVlO1xuXHR9O1xuXG5cdC8qXG5cdCAqIFJldHVybnMgYSBjb3B5IG9mIHRoZSBjb25zdGFudHMgb2JqZWN0IHdoZXJlIGFsbCBmdW5jdGlvbnMgYW5kIHN0cmluZ3MgaGF2ZSBiZWVuIGV2YWx1YXRlZC5cblx0ICovXG5cdHZhciBfcHJvY2Vzc0NvbnN0YW50cyA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB2aWV3cG9ydEhlaWdodCA9IGRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cdFx0dmFyIGNvcHkgPSB7fTtcblx0XHR2YXIgcHJvcDtcblx0XHR2YXIgdmFsdWU7XG5cblx0XHRmb3IocHJvcCBpbiBfY29uc3RhbnRzKSB7XG5cdFx0XHR2YWx1ZSA9IF9jb25zdGFudHNbcHJvcF07XG5cblx0XHRcdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlLmNhbGwoX2luc3RhbmNlKTtcblx0XHRcdH1cblx0XHRcdC8vUGVyY2VudGFnZSBvZmZzZXQuXG5cdFx0XHRlbHNlIGlmKCgvcCQvKS50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHR2YWx1ZSA9ICh2YWx1ZS5zbGljZSgwLCAtMSkgLyAxMDApICogdmlld3BvcnRIZWlnaHQ7XG5cdFx0XHR9XG5cblx0XHRcdGNvcHlbcHJvcF0gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29weTtcblx0fTtcblxuXHQvKlxuXHQgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIGRvY3VtZW50LlxuXHQgKi9cblx0dmFyIF9nZXREb2N1bWVudEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBza3JvbGxyQm9keUhlaWdodCA9IChfc2tyb2xsckJvZHkgJiYgX3Nrcm9sbHJCb2R5Lm9mZnNldEhlaWdodCB8fCAwKTtcblx0XHR2YXIgYm9keUhlaWdodCA9IE1hdGgubWF4KHNrcm9sbHJCb2R5SGVpZ2h0LCBib2R5LnNjcm9sbEhlaWdodCwgYm9keS5vZmZzZXRIZWlnaHQsIGRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsIGRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsIGRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpO1xuXG5cdFx0cmV0dXJuIGJvZHlIZWlnaHQgLSBkb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIG9mIHNwYWNlIHNlcGFyYXRlZCBjbGFzc25hbWVzIGZvciB0aGUgY3VycmVudCBlbGVtZW50LlxuXHQgKiBXb3JrcyB3aXRoIFNWRyBhcyB3ZWxsLlxuXHQgKi9cblx0dmFyIF9nZXRDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHR2YXIgcHJvcCA9ICdjbGFzc05hbWUnO1xuXG5cdFx0Ly9TVkcgc3VwcG9ydCBieSB1c2luZyBjbGFzc05hbWUuYmFzZVZhbCBpbnN0ZWFkIG9mIGp1c3QgY2xhc3NOYW1lLlxuXHRcdGlmKHdpbmRvdy5TVkdFbGVtZW50ICYmIGVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuU1ZHRWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudCA9IGVsZW1lbnRbcHJvcF07XG5cdFx0XHRwcm9wID0gJ2Jhc2VWYWwnO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbGVtZW50W3Byb3BdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBZGRzIGFuZCByZW1vdmVzIGEgQ1NTIGNsYXNzZXMuXG5cdCAqIFdvcmtzIHdpdGggU1ZHIGFzIHdlbGwuXG5cdCAqIGFkZCBhbmQgcmVtb3ZlIGFyZSBhcnJheXMgb2Ygc3RyaW5ncyxcblx0ICogb3IgaWYgcmVtb3ZlIGlzIG9tbWl0ZWQgYWRkIGlzIGEgc3RyaW5nIGFuZCBvdmVyd3JpdGVzIGFsbCBjbGFzc2VzLlxuXHQgKi9cblx0dmFyIF91cGRhdGVDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGFkZCwgcmVtb3ZlKSB7XG5cdFx0dmFyIHByb3AgPSAnY2xhc3NOYW1lJztcblxuXHRcdC8vU1ZHIHN1cHBvcnQgYnkgdXNpbmcgY2xhc3NOYW1lLmJhc2VWYWwgaW5zdGVhZCBvZiBqdXN0IGNsYXNzTmFtZS5cblx0XHRpZih3aW5kb3cuU1ZHRWxlbWVudCAmJiBlbGVtZW50IGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnQgPSBlbGVtZW50W3Byb3BdO1xuXHRcdFx0cHJvcCA9ICdiYXNlVmFsJztcblx0XHR9XG5cblx0XHQvL1doZW4gcmVtb3ZlIGlzIG9tbWl0ZWQsIHdlIHdhbnQgdG8gb3ZlcndyaXRlL3NldCB0aGUgY2xhc3Nlcy5cblx0XHRpZihyZW1vdmUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZWxlbWVudFtwcm9wXSA9IGFkZDtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvL0NhY2hlIGN1cnJlbnQgY2xhc3Nlcy4gV2Ugd2lsbCB3b3JrIG9uIGEgc3RyaW5nIGJlZm9yZSBwYXNzaW5nIGJhY2sgdG8gRE9NLlxuXHRcdHZhciB2YWwgPSBlbGVtZW50W3Byb3BdO1xuXG5cdFx0Ly9BbGwgY2xhc3NlcyB0byBiZSByZW1vdmVkLlxuXHRcdHZhciBjbGFzc1JlbW92ZUluZGV4ID0gMDtcblx0XHR2YXIgcmVtb3ZlTGVuZ3RoID0gcmVtb3ZlLmxlbmd0aDtcblxuXHRcdGZvcig7IGNsYXNzUmVtb3ZlSW5kZXggPCByZW1vdmVMZW5ndGg7IGNsYXNzUmVtb3ZlSW5kZXgrKykge1xuXHRcdFx0dmFsID0gX3VudHJpbSh2YWwpLnJlcGxhY2UoX3VudHJpbShyZW1vdmVbY2xhc3NSZW1vdmVJbmRleF0pLCAnICcpO1xuXHRcdH1cblxuXHRcdHZhbCA9IF90cmltKHZhbCk7XG5cblx0XHQvL0FsbCBjbGFzc2VzIHRvIGJlIGFkZGVkLlxuXHRcdHZhciBjbGFzc0FkZEluZGV4ID0gMDtcblx0XHR2YXIgYWRkTGVuZ3RoID0gYWRkLmxlbmd0aDtcblxuXHRcdGZvcig7IGNsYXNzQWRkSW5kZXggPCBhZGRMZW5ndGg7IGNsYXNzQWRkSW5kZXgrKykge1xuXHRcdFx0Ly9Pbmx5IGFkZCBpZiBlbCBub3QgYWxyZWFkeSBoYXMgY2xhc3MuXG5cdFx0XHRpZihfdW50cmltKHZhbCkuaW5kZXhPZihfdW50cmltKGFkZFtjbGFzc0FkZEluZGV4XSkpID09PSAtMSkge1xuXHRcdFx0XHR2YWwgKz0gJyAnICsgYWRkW2NsYXNzQWRkSW5kZXhdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGVsZW1lbnRbcHJvcF0gPSBfdHJpbSh2YWwpO1xuXHR9O1xuXG5cdHZhciBfdHJpbSA9IGZ1bmN0aW9uKGEpIHtcblx0XHRyZXR1cm4gYS5yZXBsYWNlKHJ4VHJpbSwgJycpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBZGRzIGEgc3BhY2UgYmVmb3JlIGFuZCBhZnRlciB0aGUgc3RyaW5nLlxuXHQgKi9cblx0dmFyIF91bnRyaW0gPSBmdW5jdGlvbihhKSB7XG5cdFx0cmV0dXJuICcgJyArIGEgKyAnICc7XG5cdH07XG5cblx0dmFyIF9ub3cgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gK25ldyBEYXRlKCk7XG5cdH07XG5cblx0dmFyIF9rZXlGcmFtZUNvbXBhcmF0b3IgPSBmdW5jdGlvbihhLCBiKSB7XG5cdFx0cmV0dXJuIGEuZnJhbWUgLSBiLmZyYW1lO1xuXHR9O1xuXG5cdC8qXG5cdCAqIFByaXZhdGUgdmFyaWFibGVzLlxuXHQgKi9cblxuXHQvL1NpbmdsZXRvblxuXHR2YXIgX2luc3RhbmNlO1xuXG5cdC8qXG5cdFx0QSBsaXN0IG9mIGFsbCBlbGVtZW50cyB3aGljaCBzaG91bGQgYmUgYW5pbWF0ZWQgYXNzb2NpYXRlZCB3aXRoIHRoZWlyIHRoZSBtZXRhZGF0YS5cblx0XHRFeG1hcGxlIHNrcm9sbGFibGUgd2l0aCB0d28ga2V5IGZyYW1lcyBhbmltYXRpbmcgZnJvbSAxMDBweCB3aWR0aCB0byAyMHB4OlxuXG5cdFx0c2tyb2xsYWJsZSA9IHtcblx0XHRcdGVsZW1lbnQ6IDx0aGUgRE9NIGVsZW1lbnQ+LFxuXHRcdFx0c3R5bGVBdHRyOiA8c3R5bGUgYXR0cmlidXRlIG9mIHRoZSBlbGVtZW50IGJlZm9yZSBza3JvbGxyPixcblx0XHRcdGNsYXNzQXR0cjogPGNsYXNzIGF0dHJpYnV0ZSBvZiB0aGUgZWxlbWVudCBiZWZvcmUgc2tyb2xscj4sXG5cdFx0XHRrZXlGcmFtZXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZyYW1lOiAxMDAsXG5cdFx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHRcdHdpZHRoOiB7XG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBbJ3s/fXB4JywgMTAwXSxcblx0XHRcdFx0XHRcdFx0ZWFzaW5nOiA8cmVmZXJlbmNlIHRvIGVhc2luZyBmdW5jdGlvbj5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG1vZGU6IFwiYWJzb2x1dGVcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZnJhbWU6IDIwMCxcblx0XHRcdFx0XHRwcm9wczoge1xuXHRcdFx0XHRcdFx0d2lkdGg6IHtcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFsnez99cHgnLCAyMF0sXG5cdFx0XHRcdFx0XHRcdGVhc2luZzogPHJlZmVyZW5jZSB0byBlYXNpbmcgZnVuY3Rpb24+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRtb2RlOiBcImFic29sdXRlXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH07XG5cdCovXG5cdHZhciBfc2tyb2xsYWJsZXM7XG5cblx0dmFyIF9za3JvbGxyQm9keTtcblxuXHR2YXIgX2xpc3RlbmVycztcblx0dmFyIF9mb3JjZUhlaWdodDtcblx0dmFyIF9tYXhLZXlGcmFtZSA9IDA7XG5cblx0dmFyIF9zY2FsZSA9IDE7XG5cdHZhciBfY29uc3RhbnRzO1xuXG5cdHZhciBfbW9iaWxlRGVjZWxlcmF0aW9uO1xuXG5cdC8vQ3VycmVudCBkaXJlY3Rpb24gKHVwL2Rvd24pLlxuXHR2YXIgX2RpcmVjdGlvbiA9ICdkb3duJztcblxuXHQvL1RoZSBsYXN0IHRvcCBvZmZzZXQgdmFsdWUuIE5lZWRlZCB0byBkZXRlcm1pbmUgZGlyZWN0aW9uLlxuXHR2YXIgX2xhc3RUb3AgPSAtMTtcblxuXHQvL1RoZSBsYXN0IHRpbWUgd2UgY2FsbGVkIHRoZSByZW5kZXIgbWV0aG9kIChkb2Vzbid0IG1lYW4gd2UgcmVuZGVyZWQhKS5cblx0dmFyIF9sYXN0UmVuZGVyQ2FsbCA9IF9ub3coKTtcblxuXHQvL0ZvciBkZXRlY3RpbmcgaWYgaXQgYWN0dWFsbHkgcmVzaXplZCAoIzI3MSkuXG5cdHZhciBfbGFzdFZpZXdwb3J0V2lkdGggPSAwO1xuXHR2YXIgX2xhc3RWaWV3cG9ydEhlaWdodCA9IDA7XG5cblx0dmFyIF9yZXF1ZXN0UmVmbG93ID0gZmFsc2U7XG5cblx0Ly9XaWxsIGNvbnRhaW4gZGF0YSBhYm91dCBhIHJ1bm5pbmcgc2Nyb2xsYmFyIGFuaW1hdGlvbiwgaWYgYW55LlxuXHR2YXIgX3Njcm9sbEFuaW1hdGlvbjtcblxuXHR2YXIgX3Ntb290aFNjcm9sbGluZ0VuYWJsZWQ7XG5cblx0dmFyIF9zbW9vdGhTY3JvbGxpbmdEdXJhdGlvbjtcblxuXHQvL1dpbGwgY29udGFpbiBzZXR0aW5zIGZvciBzbW9vdGggc2Nyb2xsaW5nIGlmIGVuYWJsZWQuXG5cdHZhciBfc21vb3RoU2Nyb2xsaW5nO1xuXG5cdC8vQ2FuIGJlIHNldCBieSBhbnkgb3BlcmF0aW9uL2V2ZW50IHRvIGZvcmNlIHJlbmRlcmluZyBldmVuIGlmIHRoZSBzY3JvbGxiYXIgZGlkbid0IG1vdmUuXG5cdHZhciBfZm9yY2VSZW5kZXI7XG5cblx0Ly9FYWNoIHNrcm9sbGFibGUgZ2V0cyBhbiB1bmlxdWUgSUQgaW5jcmVtZW50ZWQgZm9yIGVhY2ggc2tyb2xsYWJsZS5cblx0Ly9UaGUgSUQgaXMgdGhlIGluZGV4IGluIHRoZSBfc2tyb2xsYWJsZXMgYXJyYXkuXG5cdHZhciBfc2tyb2xsYWJsZUlkQ291bnRlciA9IDA7XG5cblx0dmFyIF9lZGdlU3RyYXRlZ3k7XG5cblxuXHQvL01vYmlsZSBzcGVjaWZpYyB2YXJzLiBXaWxsIGJlIHN0cmlwcGVkIGJ5IFVnbGlmeUpTIHdoZW4gbm90IGluIHVzZS5cblx0dmFyIF9pc01vYmlsZSA9IGZhbHNlO1xuXG5cdC8vVGhlIHZpcnR1YWwgc2Nyb2xsIG9mZnNldCB3aGVuIHVzaW5nIG1vYmlsZSBzY3JvbGxpbmcuXG5cdHZhciBfbW9iaWxlT2Zmc2V0ID0gMDtcblxuXHQvL0lmIHRoZSBicm93c2VyIHN1cHBvcnRzIDNkIHRyYW5zZm9ybXMsIHRoaXMgd2lsbCBiZSBmaWxsZWQgd2l0aCAndHJhbnNsYXRlWigwKScgKGVtcHR5IHN0cmluZyBvdGhlcndpc2UpLlxuXHR2YXIgX3RyYW5zbGF0ZVo7XG5cblx0Ly9XaWxsIGNvbnRhaW4gZGF0YSBhYm91dCByZWdpc3RlcmVkIGV2ZW50cyBieSBza3JvbGxyLlxuXHR2YXIgX3JlZ2lzdGVyZWRFdmVudHMgPSBbXTtcblxuXHQvL0FuaW1hdGlvbiBmcmFtZSBpZCByZXR1cm5lZCBieSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKG9yIHRpbWVvdXQgd2hlbiBSQUYgaXMgbm90IHN1cHBvcnRlZCkuXG5cdHZhciBfYW5pbUZyYW1lO1xuXG5cdC8vRXhwb3NlIHNrcm9sbHIgYXMgZWl0aGVyIGEgZ2xvYmFsIHZhcmlhYmxlIG9yIGEgcmVxdWlyZS5qcyBtb2R1bGVcblx0aWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKCdza3JvbGxyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHNrcm9sbHI7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IHNrcm9sbHI7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LnNrcm9sbHIgPSBza3JvbGxyO1xuXHR9XG5cbn0od2luZG93LCBkb2N1bWVudCkpO1xuIiwiLyohIEhhbW1lci5KUyAtIHYyLjAuNyAtIDIwMTYtMDQtMjJcbiAqIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IEpvcmlrIFRhbmdlbGRlcjtcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAqL1xuIWZ1bmN0aW9uKGEsYixjLGQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoYSxiLGMpe3JldHVybiBzZXRUaW1lb3V0KGooYSxjKSxiKX1mdW5jdGlvbiBmKGEsYixjKXtyZXR1cm4gQXJyYXkuaXNBcnJheShhKT8oZyhhLGNbYl0sYyksITApOiExfWZ1bmN0aW9uIGcoYSxiLGMpe3ZhciBlO2lmKGEpaWYoYS5mb3JFYWNoKWEuZm9yRWFjaChiLGMpO2Vsc2UgaWYoYS5sZW5ndGghPT1kKWZvcihlPTA7ZTxhLmxlbmd0aDspYi5jYWxsKGMsYVtlXSxlLGEpLGUrKztlbHNlIGZvcihlIGluIGEpYS5oYXNPd25Qcm9wZXJ0eShlKSYmYi5jYWxsKGMsYVtlXSxlLGEpfWZ1bmN0aW9uIGgoYixjLGQpe3ZhciBlPVwiREVQUkVDQVRFRCBNRVRIT0Q6IFwiK2MrXCJcXG5cIitkK1wiIEFUIFxcblwiO3JldHVybiBmdW5jdGlvbigpe3ZhciBjPW5ldyBFcnJvcihcImdldC1zdGFjay10cmFjZVwiKSxkPWMmJmMuc3RhY2s/Yy5zdGFjay5yZXBsYWNlKC9eW15cXChdKz9bXFxuJF0vZ20sXCJcIikucmVwbGFjZSgvXlxccythdFxccysvZ20sXCJcIikucmVwbGFjZSgvXk9iamVjdC48YW5vbnltb3VzPlxccypcXCgvZ20sXCJ7YW5vbnltb3VzfSgpQFwiKTpcIlVua25vd24gU3RhY2sgVHJhY2VcIixmPWEuY29uc29sZSYmKGEuY29uc29sZS53YXJufHxhLmNvbnNvbGUubG9nKTtyZXR1cm4gZiYmZi5jYWxsKGEuY29uc29sZSxlLGQpLGIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1mdW5jdGlvbiBpKGEsYixjKXt2YXIgZCxlPWIucHJvdG90eXBlO2Q9YS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShlKSxkLmNvbnN0cnVjdG9yPWEsZC5fc3VwZXI9ZSxjJiZsYShkLGMpfWZ1bmN0aW9uIGooYSxiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gYS5hcHBseShiLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIGsoYSxiKXtyZXR1cm4gdHlwZW9mIGE9PW9hP2EuYXBwbHkoYj9iWzBdfHxkOmQsYik6YX1mdW5jdGlvbiBsKGEsYil7cmV0dXJuIGE9PT1kP2I6YX1mdW5jdGlvbiBtKGEsYixjKXtnKHEoYiksZnVuY3Rpb24oYil7YS5hZGRFdmVudExpc3RlbmVyKGIsYywhMSl9KX1mdW5jdGlvbiBuKGEsYixjKXtnKHEoYiksZnVuY3Rpb24oYil7YS5yZW1vdmVFdmVudExpc3RlbmVyKGIsYywhMSl9KX1mdW5jdGlvbiBvKGEsYil7Zm9yKDthOyl7aWYoYT09YilyZXR1cm4hMDthPWEucGFyZW50Tm9kZX1yZXR1cm4hMX1mdW5jdGlvbiBwKGEsYil7cmV0dXJuIGEuaW5kZXhPZihiKT4tMX1mdW5jdGlvbiBxKGEpe3JldHVybiBhLnRyaW0oKS5zcGxpdCgvXFxzKy9nKX1mdW5jdGlvbiByKGEsYixjKXtpZihhLmluZGV4T2YmJiFjKXJldHVybiBhLmluZGV4T2YoYik7Zm9yKHZhciBkPTA7ZDxhLmxlbmd0aDspe2lmKGMmJmFbZF1bY109PWJ8fCFjJiZhW2RdPT09YilyZXR1cm4gZDtkKyt9cmV0dXJuLTF9ZnVuY3Rpb24gcyhhKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYSwwKX1mdW5jdGlvbiB0KGEsYixjKXtmb3IodmFyIGQ9W10sZT1bXSxmPTA7ZjxhLmxlbmd0aDspe3ZhciBnPWI/YVtmXVtiXTphW2ZdO3IoZSxnKTwwJiZkLnB1c2goYVtmXSksZVtmXT1nLGYrK31yZXR1cm4gYyYmKGQ9Yj9kLnNvcnQoZnVuY3Rpb24oYSxjKXtyZXR1cm4gYVtiXT5jW2JdfSk6ZC5zb3J0KCkpLGR9ZnVuY3Rpb24gdShhLGIpe2Zvcih2YXIgYyxlLGY9YlswXS50b1VwcGVyQ2FzZSgpK2Iuc2xpY2UoMSksZz0wO2c8bWEubGVuZ3RoOyl7aWYoYz1tYVtnXSxlPWM/YytmOmIsZSBpbiBhKXJldHVybiBlO2crK31yZXR1cm4gZH1mdW5jdGlvbiB2KCl7cmV0dXJuIHVhKyt9ZnVuY3Rpb24gdyhiKXt2YXIgYz1iLm93bmVyRG9jdW1lbnR8fGI7cmV0dXJuIGMuZGVmYXVsdFZpZXd8fGMucGFyZW50V2luZG93fHxhfWZ1bmN0aW9uIHgoYSxiKXt2YXIgYz10aGlzO3RoaXMubWFuYWdlcj1hLHRoaXMuY2FsbGJhY2s9Yix0aGlzLmVsZW1lbnQ9YS5lbGVtZW50LHRoaXMudGFyZ2V0PWEub3B0aW9ucy5pbnB1dFRhcmdldCx0aGlzLmRvbUhhbmRsZXI9ZnVuY3Rpb24oYil7ayhhLm9wdGlvbnMuZW5hYmxlLFthXSkmJmMuaGFuZGxlcihiKX0sdGhpcy5pbml0KCl9ZnVuY3Rpb24geShhKXt2YXIgYixjPWEub3B0aW9ucy5pbnB1dENsYXNzO3JldHVybiBuZXcoYj1jP2M6eGE/TTp5YT9QOndhP1I6TCkoYSx6KX1mdW5jdGlvbiB6KGEsYixjKXt2YXIgZD1jLnBvaW50ZXJzLmxlbmd0aCxlPWMuY2hhbmdlZFBvaW50ZXJzLmxlbmd0aCxmPWImRWEmJmQtZT09PTAsZz1iJihHYXxIYSkmJmQtZT09PTA7Yy5pc0ZpcnN0PSEhZixjLmlzRmluYWw9ISFnLGYmJihhLnNlc3Npb249e30pLGMuZXZlbnRUeXBlPWIsQShhLGMpLGEuZW1pdChcImhhbW1lci5pbnB1dFwiLGMpLGEucmVjb2duaXplKGMpLGEuc2Vzc2lvbi5wcmV2SW5wdXQ9Y31mdW5jdGlvbiBBKGEsYil7dmFyIGM9YS5zZXNzaW9uLGQ9Yi5wb2ludGVycyxlPWQubGVuZ3RoO2MuZmlyc3RJbnB1dHx8KGMuZmlyc3RJbnB1dD1EKGIpKSxlPjEmJiFjLmZpcnN0TXVsdGlwbGU/Yy5maXJzdE11bHRpcGxlPUQoYik6MT09PWUmJihjLmZpcnN0TXVsdGlwbGU9ITEpO3ZhciBmPWMuZmlyc3RJbnB1dCxnPWMuZmlyc3RNdWx0aXBsZSxoPWc/Zy5jZW50ZXI6Zi5jZW50ZXIsaT1iLmNlbnRlcj1FKGQpO2IudGltZVN0YW1wPXJhKCksYi5kZWx0YVRpbWU9Yi50aW1lU3RhbXAtZi50aW1lU3RhbXAsYi5hbmdsZT1JKGgsaSksYi5kaXN0YW5jZT1IKGgsaSksQihjLGIpLGIub2Zmc2V0RGlyZWN0aW9uPUcoYi5kZWx0YVgsYi5kZWx0YVkpO3ZhciBqPUYoYi5kZWx0YVRpbWUsYi5kZWx0YVgsYi5kZWx0YVkpO2Iub3ZlcmFsbFZlbG9jaXR5WD1qLngsYi5vdmVyYWxsVmVsb2NpdHlZPWoueSxiLm92ZXJhbGxWZWxvY2l0eT1xYShqLngpPnFhKGoueSk/ai54OmoueSxiLnNjYWxlPWc/SyhnLnBvaW50ZXJzLGQpOjEsYi5yb3RhdGlvbj1nP0ooZy5wb2ludGVycyxkKTowLGIubWF4UG9pbnRlcnM9Yy5wcmV2SW5wdXQ/Yi5wb2ludGVycy5sZW5ndGg+Yy5wcmV2SW5wdXQubWF4UG9pbnRlcnM/Yi5wb2ludGVycy5sZW5ndGg6Yy5wcmV2SW5wdXQubWF4UG9pbnRlcnM6Yi5wb2ludGVycy5sZW5ndGgsQyhjLGIpO3ZhciBrPWEuZWxlbWVudDtvKGIuc3JjRXZlbnQudGFyZ2V0LGspJiYoaz1iLnNyY0V2ZW50LnRhcmdldCksYi50YXJnZXQ9a31mdW5jdGlvbiBCKGEsYil7dmFyIGM9Yi5jZW50ZXIsZD1hLm9mZnNldERlbHRhfHx7fSxlPWEucHJldkRlbHRhfHx7fSxmPWEucHJldklucHV0fHx7fTtiLmV2ZW50VHlwZSE9PUVhJiZmLmV2ZW50VHlwZSE9PUdhfHwoZT1hLnByZXZEZWx0YT17eDpmLmRlbHRhWHx8MCx5OmYuZGVsdGFZfHwwfSxkPWEub2Zmc2V0RGVsdGE9e3g6Yy54LHk6Yy55fSksYi5kZWx0YVg9ZS54KyhjLngtZC54KSxiLmRlbHRhWT1lLnkrKGMueS1kLnkpfWZ1bmN0aW9uIEMoYSxiKXt2YXIgYyxlLGYsZyxoPWEubGFzdEludGVydmFsfHxiLGk9Yi50aW1lU3RhbXAtaC50aW1lU3RhbXA7aWYoYi5ldmVudFR5cGUhPUhhJiYoaT5EYXx8aC52ZWxvY2l0eT09PWQpKXt2YXIgaj1iLmRlbHRhWC1oLmRlbHRhWCxrPWIuZGVsdGFZLWguZGVsdGFZLGw9RihpLGosayk7ZT1sLngsZj1sLnksYz1xYShsLngpPnFhKGwueSk/bC54OmwueSxnPUcoaixrKSxhLmxhc3RJbnRlcnZhbD1ifWVsc2UgYz1oLnZlbG9jaXR5LGU9aC52ZWxvY2l0eVgsZj1oLnZlbG9jaXR5WSxnPWguZGlyZWN0aW9uO2IudmVsb2NpdHk9YyxiLnZlbG9jaXR5WD1lLGIudmVsb2NpdHlZPWYsYi5kaXJlY3Rpb249Z31mdW5jdGlvbiBEKGEpe2Zvcih2YXIgYj1bXSxjPTA7YzxhLnBvaW50ZXJzLmxlbmd0aDspYltjXT17Y2xpZW50WDpwYShhLnBvaW50ZXJzW2NdLmNsaWVudFgpLGNsaWVudFk6cGEoYS5wb2ludGVyc1tjXS5jbGllbnRZKX0sYysrO3JldHVybnt0aW1lU3RhbXA6cmEoKSxwb2ludGVyczpiLGNlbnRlcjpFKGIpLGRlbHRhWDphLmRlbHRhWCxkZWx0YVk6YS5kZWx0YVl9fWZ1bmN0aW9uIEUoYSl7dmFyIGI9YS5sZW5ndGg7aWYoMT09PWIpcmV0dXJue3g6cGEoYVswXS5jbGllbnRYKSx5OnBhKGFbMF0uY2xpZW50WSl9O2Zvcih2YXIgYz0wLGQ9MCxlPTA7Yj5lOyljKz1hW2VdLmNsaWVudFgsZCs9YVtlXS5jbGllbnRZLGUrKztyZXR1cm57eDpwYShjL2IpLHk6cGEoZC9iKX19ZnVuY3Rpb24gRihhLGIsYyl7cmV0dXJue3g6Yi9hfHwwLHk6Yy9hfHwwfX1mdW5jdGlvbiBHKGEsYil7cmV0dXJuIGE9PT1iP0lhOnFhKGEpPj1xYShiKT8wPmE/SmE6S2E6MD5iP0xhOk1hfWZ1bmN0aW9uIEgoYSxiLGMpe2N8fChjPVFhKTt2YXIgZD1iW2NbMF1dLWFbY1swXV0sZT1iW2NbMV1dLWFbY1sxXV07cmV0dXJuIE1hdGguc3FydChkKmQrZSplKX1mdW5jdGlvbiBJKGEsYixjKXtjfHwoYz1RYSk7dmFyIGQ9YltjWzBdXS1hW2NbMF1dLGU9YltjWzFdXS1hW2NbMV1dO3JldHVybiAxODAqTWF0aC5hdGFuMihlLGQpL01hdGguUEl9ZnVuY3Rpb24gSihhLGIpe3JldHVybiBJKGJbMV0sYlswXSxSYSkrSShhWzFdLGFbMF0sUmEpfWZ1bmN0aW9uIEsoYSxiKXtyZXR1cm4gSChiWzBdLGJbMV0sUmEpL0goYVswXSxhWzFdLFJhKX1mdW5jdGlvbiBMKCl7dGhpcy5ldkVsPVRhLHRoaXMuZXZXaW49VWEsdGhpcy5wcmVzc2VkPSExLHguYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIE0oKXt0aGlzLmV2RWw9WGEsdGhpcy5ldldpbj1ZYSx4LmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLnN0b3JlPXRoaXMubWFuYWdlci5zZXNzaW9uLnBvaW50ZXJFdmVudHM9W119ZnVuY3Rpb24gTigpe3RoaXMuZXZUYXJnZXQ9JGEsdGhpcy5ldldpbj1fYSx0aGlzLnN0YXJ0ZWQ9ITEseC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gTyhhLGIpe3ZhciBjPXMoYS50b3VjaGVzKSxkPXMoYS5jaGFuZ2VkVG91Y2hlcyk7cmV0dXJuIGImKEdhfEhhKSYmKGM9dChjLmNvbmNhdChkKSxcImlkZW50aWZpZXJcIiwhMCkpLFtjLGRdfWZ1bmN0aW9uIFAoKXt0aGlzLmV2VGFyZ2V0PWJiLHRoaXMudGFyZ2V0SWRzPXt9LHguYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIFEoYSxiKXt2YXIgYz1zKGEudG91Y2hlcyksZD10aGlzLnRhcmdldElkcztpZihiJihFYXxGYSkmJjE9PT1jLmxlbmd0aClyZXR1cm4gZFtjWzBdLmlkZW50aWZpZXJdPSEwLFtjLGNdO3ZhciBlLGYsZz1zKGEuY2hhbmdlZFRvdWNoZXMpLGg9W10saT10aGlzLnRhcmdldDtpZihmPWMuZmlsdGVyKGZ1bmN0aW9uKGEpe3JldHVybiBvKGEudGFyZ2V0LGkpfSksYj09PUVhKWZvcihlPTA7ZTxmLmxlbmd0aDspZFtmW2VdLmlkZW50aWZpZXJdPSEwLGUrKztmb3IoZT0wO2U8Zy5sZW5ndGg7KWRbZ1tlXS5pZGVudGlmaWVyXSYmaC5wdXNoKGdbZV0pLGImKEdhfEhhKSYmZGVsZXRlIGRbZ1tlXS5pZGVudGlmaWVyXSxlKys7cmV0dXJuIGgubGVuZ3RoP1t0KGYuY29uY2F0KGgpLFwiaWRlbnRpZmllclwiLCEwKSxoXTp2b2lkIDB9ZnVuY3Rpb24gUigpe3guYXBwbHkodGhpcyxhcmd1bWVudHMpO3ZhciBhPWoodGhpcy5oYW5kbGVyLHRoaXMpO3RoaXMudG91Y2g9bmV3IFAodGhpcy5tYW5hZ2VyLGEpLHRoaXMubW91c2U9bmV3IEwodGhpcy5tYW5hZ2VyLGEpLHRoaXMucHJpbWFyeVRvdWNoPW51bGwsdGhpcy5sYXN0VG91Y2hlcz1bXX1mdW5jdGlvbiBTKGEsYil7YSZFYT8odGhpcy5wcmltYXJ5VG91Y2g9Yi5jaGFuZ2VkUG9pbnRlcnNbMF0uaWRlbnRpZmllcixULmNhbGwodGhpcyxiKSk6YSYoR2F8SGEpJiZULmNhbGwodGhpcyxiKX1mdW5jdGlvbiBUKGEpe3ZhciBiPWEuY2hhbmdlZFBvaW50ZXJzWzBdO2lmKGIuaWRlbnRpZmllcj09PXRoaXMucHJpbWFyeVRvdWNoKXt2YXIgYz17eDpiLmNsaWVudFgseTpiLmNsaWVudFl9O3RoaXMubGFzdFRvdWNoZXMucHVzaChjKTt2YXIgZD10aGlzLmxhc3RUb3VjaGVzLGU9ZnVuY3Rpb24oKXt2YXIgYT1kLmluZGV4T2YoYyk7YT4tMSYmZC5zcGxpY2UoYSwxKX07c2V0VGltZW91dChlLGNiKX19ZnVuY3Rpb24gVShhKXtmb3IodmFyIGI9YS5zcmNFdmVudC5jbGllbnRYLGM9YS5zcmNFdmVudC5jbGllbnRZLGQ9MDtkPHRoaXMubGFzdFRvdWNoZXMubGVuZ3RoO2QrKyl7dmFyIGU9dGhpcy5sYXN0VG91Y2hlc1tkXSxmPU1hdGguYWJzKGItZS54KSxnPU1hdGguYWJzKGMtZS55KTtpZihkYj49ZiYmZGI+PWcpcmV0dXJuITB9cmV0dXJuITF9ZnVuY3Rpb24gVihhLGIpe3RoaXMubWFuYWdlcj1hLHRoaXMuc2V0KGIpfWZ1bmN0aW9uIFcoYSl7aWYocChhLGpiKSlyZXR1cm4gamI7dmFyIGI9cChhLGtiKSxjPXAoYSxsYik7cmV0dXJuIGImJmM/amI6Ynx8Yz9iP2tiOmxiOnAoYSxpYik/aWI6aGJ9ZnVuY3Rpb24gWCgpe2lmKCFmYilyZXR1cm4hMTt2YXIgYj17fSxjPWEuQ1NTJiZhLkNTUy5zdXBwb3J0cztyZXR1cm5bXCJhdXRvXCIsXCJtYW5pcHVsYXRpb25cIixcInBhbi15XCIsXCJwYW4teFwiLFwicGFuLXggcGFuLXlcIixcIm5vbmVcIl0uZm9yRWFjaChmdW5jdGlvbihkKXtiW2RdPWM/YS5DU1Muc3VwcG9ydHMoXCJ0b3VjaC1hY3Rpb25cIixkKTohMH0pLGJ9ZnVuY3Rpb24gWShhKXt0aGlzLm9wdGlvbnM9bGEoe30sdGhpcy5kZWZhdWx0cyxhfHx7fSksdGhpcy5pZD12KCksdGhpcy5tYW5hZ2VyPW51bGwsdGhpcy5vcHRpb25zLmVuYWJsZT1sKHRoaXMub3B0aW9ucy5lbmFibGUsITApLHRoaXMuc3RhdGU9bmIsdGhpcy5zaW11bHRhbmVvdXM9e30sdGhpcy5yZXF1aXJlRmFpbD1bXX1mdW5jdGlvbiBaKGEpe3JldHVybiBhJnNiP1wiY2FuY2VsXCI6YSZxYj9cImVuZFwiOmEmcGI/XCJtb3ZlXCI6YSZvYj9cInN0YXJ0XCI6XCJcIn1mdW5jdGlvbiAkKGEpe3JldHVybiBhPT1NYT9cImRvd25cIjphPT1MYT9cInVwXCI6YT09SmE/XCJsZWZ0XCI6YT09S2E/XCJyaWdodFwiOlwiXCJ9ZnVuY3Rpb24gXyhhLGIpe3ZhciBjPWIubWFuYWdlcjtyZXR1cm4gYz9jLmdldChhKTphfWZ1bmN0aW9uIGFhKCl7WS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gYmEoKXthYS5hcHBseSh0aGlzLGFyZ3VtZW50cyksdGhpcy5wWD1udWxsLHRoaXMucFk9bnVsbH1mdW5jdGlvbiBjYSgpe2FhLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBkYSgpe1kuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuX3RpbWVyPW51bGwsdGhpcy5faW5wdXQ9bnVsbH1mdW5jdGlvbiBlYSgpe2FhLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBmYSgpe2FhLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBnYSgpe1kuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMucFRpbWU9ITEsdGhpcy5wQ2VudGVyPSExLHRoaXMuX3RpbWVyPW51bGwsdGhpcy5faW5wdXQ9bnVsbCx0aGlzLmNvdW50PTB9ZnVuY3Rpb24gaGEoYSxiKXtyZXR1cm4gYj1ifHx7fSxiLnJlY29nbml6ZXJzPWwoYi5yZWNvZ25pemVycyxoYS5kZWZhdWx0cy5wcmVzZXQpLG5ldyBpYShhLGIpfWZ1bmN0aW9uIGlhKGEsYil7dGhpcy5vcHRpb25zPWxhKHt9LGhhLmRlZmF1bHRzLGJ8fHt9KSx0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQ9dGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0fHxhLHRoaXMuaGFuZGxlcnM9e30sdGhpcy5zZXNzaW9uPXt9LHRoaXMucmVjb2duaXplcnM9W10sdGhpcy5vbGRDc3NQcm9wcz17fSx0aGlzLmVsZW1lbnQ9YSx0aGlzLmlucHV0PXkodGhpcyksdGhpcy50b3VjaEFjdGlvbj1uZXcgVih0aGlzLHRoaXMub3B0aW9ucy50b3VjaEFjdGlvbiksamEodGhpcywhMCksZyh0aGlzLm9wdGlvbnMucmVjb2duaXplcnMsZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5hZGQobmV3IGFbMF0oYVsxXSkpO2FbMl0mJmIucmVjb2duaXplV2l0aChhWzJdKSxhWzNdJiZiLnJlcXVpcmVGYWlsdXJlKGFbM10pfSx0aGlzKX1mdW5jdGlvbiBqYShhLGIpe3ZhciBjPWEuZWxlbWVudDtpZihjLnN0eWxlKXt2YXIgZDtnKGEub3B0aW9ucy5jc3NQcm9wcyxmdW5jdGlvbihlLGYpe2Q9dShjLnN0eWxlLGYpLGI/KGEub2xkQ3NzUHJvcHNbZF09Yy5zdHlsZVtkXSxjLnN0eWxlW2RdPWUpOmMuc3R5bGVbZF09YS5vbGRDc3NQcm9wc1tkXXx8XCJcIn0pLGJ8fChhLm9sZENzc1Byb3BzPXt9KX19ZnVuY3Rpb24ga2EoYSxjKXt2YXIgZD1iLmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7ZC5pbml0RXZlbnQoYSwhMCwhMCksZC5nZXN0dXJlPWMsYy50YXJnZXQuZGlzcGF0Y2hFdmVudChkKX12YXIgbGEsbWE9W1wiXCIsXCJ3ZWJraXRcIixcIk1velwiLFwiTVNcIixcIm1zXCIsXCJvXCJdLG5hPWIuY3JlYXRlRWxlbWVudChcImRpdlwiKSxvYT1cImZ1bmN0aW9uXCIscGE9TWF0aC5yb3VuZCxxYT1NYXRoLmFicyxyYT1EYXRlLm5vdztsYT1cImZ1bmN0aW9uXCIhPXR5cGVvZiBPYmplY3QuYXNzaWduP2Z1bmN0aW9uKGEpe2lmKGE9PT1kfHxudWxsPT09YSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0XCIpO2Zvcih2YXIgYj1PYmplY3QoYSksYz0xO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspe3ZhciBlPWFyZ3VtZW50c1tjXTtpZihlIT09ZCYmbnVsbCE9PWUpZm9yKHZhciBmIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShmKSYmKGJbZl09ZVtmXSl9cmV0dXJuIGJ9Ok9iamVjdC5hc3NpZ247dmFyIHNhPWgoZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZT1PYmplY3Qua2V5cyhiKSxmPTA7ZjxlLmxlbmd0aDspKCFjfHxjJiZhW2VbZl1dPT09ZCkmJihhW2VbZl1dPWJbZVtmXV0pLGYrKztyZXR1cm4gYX0sXCJleHRlbmRcIixcIlVzZSBgYXNzaWduYC5cIiksdGE9aChmdW5jdGlvbihhLGIpe3JldHVybiBzYShhLGIsITApfSxcIm1lcmdlXCIsXCJVc2UgYGFzc2lnbmAuXCIpLHVhPTEsdmE9L21vYmlsZXx0YWJsZXR8aXAoYWR8aG9uZXxvZCl8YW5kcm9pZC9pLHdhPVwib250b3VjaHN0YXJ0XCJpbiBhLHhhPXUoYSxcIlBvaW50ZXJFdmVudFwiKSE9PWQseWE9d2EmJnZhLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksemE9XCJ0b3VjaFwiLEFhPVwicGVuXCIsQmE9XCJtb3VzZVwiLENhPVwia2luZWN0XCIsRGE9MjUsRWE9MSxGYT0yLEdhPTQsSGE9OCxJYT0xLEphPTIsS2E9NCxMYT04LE1hPTE2LE5hPUphfEthLE9hPUxhfE1hLFBhPU5hfE9hLFFhPVtcInhcIixcInlcIl0sUmE9W1wiY2xpZW50WFwiLFwiY2xpZW50WVwiXTt4LnByb3RvdHlwZT17aGFuZGxlcjpmdW5jdGlvbigpe30saW5pdDpmdW5jdGlvbigpe3RoaXMuZXZFbCYmbSh0aGlzLmVsZW1lbnQsdGhpcy5ldkVsLHRoaXMuZG9tSGFuZGxlciksdGhpcy5ldlRhcmdldCYmbSh0aGlzLnRhcmdldCx0aGlzLmV2VGFyZ2V0LHRoaXMuZG9tSGFuZGxlciksdGhpcy5ldldpbiYmbSh3KHRoaXMuZWxlbWVudCksdGhpcy5ldldpbix0aGlzLmRvbUhhbmRsZXIpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5ldkVsJiZuKHRoaXMuZWxlbWVudCx0aGlzLmV2RWwsdGhpcy5kb21IYW5kbGVyKSx0aGlzLmV2VGFyZ2V0JiZuKHRoaXMudGFyZ2V0LHRoaXMuZXZUYXJnZXQsdGhpcy5kb21IYW5kbGVyKSx0aGlzLmV2V2luJiZuKHcodGhpcy5lbGVtZW50KSx0aGlzLmV2V2luLHRoaXMuZG9tSGFuZGxlcil9fTt2YXIgU2E9e21vdXNlZG93bjpFYSxtb3VzZW1vdmU6RmEsbW91c2V1cDpHYX0sVGE9XCJtb3VzZWRvd25cIixVYT1cIm1vdXNlbW92ZSBtb3VzZXVwXCI7aShMLHgse2hhbmRsZXI6ZnVuY3Rpb24oYSl7dmFyIGI9U2FbYS50eXBlXTtiJkVhJiYwPT09YS5idXR0b24mJih0aGlzLnByZXNzZWQ9ITApLGImRmEmJjEhPT1hLndoaWNoJiYoYj1HYSksdGhpcy5wcmVzc2VkJiYoYiZHYSYmKHRoaXMucHJlc3NlZD0hMSksdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsYix7cG9pbnRlcnM6W2FdLGNoYW5nZWRQb2ludGVyczpbYV0scG9pbnRlclR5cGU6QmEsc3JjRXZlbnQ6YX0pKX19KTt2YXIgVmE9e3BvaW50ZXJkb3duOkVhLHBvaW50ZXJtb3ZlOkZhLHBvaW50ZXJ1cDpHYSxwb2ludGVyY2FuY2VsOkhhLHBvaW50ZXJvdXQ6SGF9LFdhPXsyOnphLDM6QWEsNDpCYSw1OkNhfSxYYT1cInBvaW50ZXJkb3duXCIsWWE9XCJwb2ludGVybW92ZSBwb2ludGVydXAgcG9pbnRlcmNhbmNlbFwiO2EuTVNQb2ludGVyRXZlbnQmJiFhLlBvaW50ZXJFdmVudCYmKFhhPVwiTVNQb2ludGVyRG93blwiLFlhPVwiTVNQb2ludGVyTW92ZSBNU1BvaW50ZXJVcCBNU1BvaW50ZXJDYW5jZWxcIiksaShNLHgse2hhbmRsZXI6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5zdG9yZSxjPSExLGQ9YS50eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIm1zXCIsXCJcIiksZT1WYVtkXSxmPVdhW2EucG9pbnRlclR5cGVdfHxhLnBvaW50ZXJUeXBlLGc9Zj09emEsaD1yKGIsYS5wb2ludGVySWQsXCJwb2ludGVySWRcIik7ZSZFYSYmKDA9PT1hLmJ1dHRvbnx8Zyk/MD5oJiYoYi5wdXNoKGEpLGg9Yi5sZW5ndGgtMSk6ZSYoR2F8SGEpJiYoYz0hMCksMD5ofHwoYltoXT1hLHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLGUse3BvaW50ZXJzOmIsY2hhbmdlZFBvaW50ZXJzOlthXSxwb2ludGVyVHlwZTpmLHNyY0V2ZW50OmF9KSxjJiZiLnNwbGljZShoLDEpKX19KTt2YXIgWmE9e3RvdWNoc3RhcnQ6RWEsdG91Y2htb3ZlOkZhLHRvdWNoZW5kOkdhLHRvdWNoY2FuY2VsOkhhfSwkYT1cInRvdWNoc3RhcnRcIixfYT1cInRvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsXCI7aShOLHgse2hhbmRsZXI6ZnVuY3Rpb24oYSl7dmFyIGI9WmFbYS50eXBlXTtpZihiPT09RWEmJih0aGlzLnN0YXJ0ZWQ9ITApLHRoaXMuc3RhcnRlZCl7dmFyIGM9Ty5jYWxsKHRoaXMsYSxiKTtiJihHYXxIYSkmJmNbMF0ubGVuZ3RoLWNbMV0ubGVuZ3RoPT09MCYmKHRoaXMuc3RhcnRlZD0hMSksdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsYix7cG9pbnRlcnM6Y1swXSxjaGFuZ2VkUG9pbnRlcnM6Y1sxXSxwb2ludGVyVHlwZTp6YSxzcmNFdmVudDphfSl9fX0pO3ZhciBhYj17dG91Y2hzdGFydDpFYSx0b3VjaG1vdmU6RmEsdG91Y2hlbmQ6R2EsdG91Y2hjYW5jZWw6SGF9LGJiPVwidG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWxcIjtpKFAseCx7aGFuZGxlcjpmdW5jdGlvbihhKXt2YXIgYj1hYlthLnR5cGVdLGM9US5jYWxsKHRoaXMsYSxiKTtjJiZ0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlcixiLHtwb2ludGVyczpjWzBdLGNoYW5nZWRQb2ludGVyczpjWzFdLHBvaW50ZXJUeXBlOnphLHNyY0V2ZW50OmF9KX19KTt2YXIgY2I9MjUwMCxkYj0yNTtpKFIseCx7aGFuZGxlcjpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9Yy5wb2ludGVyVHlwZT09emEsZT1jLnBvaW50ZXJUeXBlPT1CYTtpZighKGUmJmMuc291cmNlQ2FwYWJpbGl0aWVzJiZjLnNvdXJjZUNhcGFiaWxpdGllcy5maXJlc1RvdWNoRXZlbnRzKSl7aWYoZClTLmNhbGwodGhpcyxiLGMpO2Vsc2UgaWYoZSYmVS5jYWxsKHRoaXMsYykpcmV0dXJuO3RoaXMuY2FsbGJhY2soYSxiLGMpfX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMudG91Y2guZGVzdHJveSgpLHRoaXMubW91c2UuZGVzdHJveSgpfX0pO3ZhciBlYj11KG5hLnN0eWxlLFwidG91Y2hBY3Rpb25cIiksZmI9ZWIhPT1kLGdiPVwiY29tcHV0ZVwiLGhiPVwiYXV0b1wiLGliPVwibWFuaXB1bGF0aW9uXCIsamI9XCJub25lXCIsa2I9XCJwYW4teFwiLGxiPVwicGFuLXlcIixtYj1YKCk7Vi5wcm90b3R5cGU9e3NldDpmdW5jdGlvbihhKXthPT1nYiYmKGE9dGhpcy5jb21wdXRlKCkpLGZiJiZ0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZSYmbWJbYV0mJih0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZVtlYl09YSksdGhpcy5hY3Rpb25zPWEudG9Mb3dlckNhc2UoKS50cmltKCl9LHVwZGF0ZTpmdW5jdGlvbigpe3RoaXMuc2V0KHRoaXMubWFuYWdlci5vcHRpb25zLnRvdWNoQWN0aW9uKX0sY29tcHV0ZTpmdW5jdGlvbigpe3ZhciBhPVtdO3JldHVybiBnKHRoaXMubWFuYWdlci5yZWNvZ25pemVycyxmdW5jdGlvbihiKXtrKGIub3B0aW9ucy5lbmFibGUsW2JdKSYmKGE9YS5jb25jYXQoYi5nZXRUb3VjaEFjdGlvbigpKSl9KSxXKGEuam9pbihcIiBcIikpfSxwcmV2ZW50RGVmYXVsdHM6ZnVuY3Rpb24oYSl7dmFyIGI9YS5zcmNFdmVudCxjPWEub2Zmc2V0RGlyZWN0aW9uO2lmKHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZClyZXR1cm4gdm9pZCBiLnByZXZlbnREZWZhdWx0KCk7dmFyIGQ9dGhpcy5hY3Rpb25zLGU9cChkLGpiKSYmIW1iW2piXSxmPXAoZCxsYikmJiFtYltsYl0sZz1wKGQsa2IpJiYhbWJba2JdO2lmKGUpe3ZhciBoPTE9PT1hLnBvaW50ZXJzLmxlbmd0aCxpPWEuZGlzdGFuY2U8MixqPWEuZGVsdGFUaW1lPDI1MDtpZihoJiZpJiZqKXJldHVybn1yZXR1cm4gZyYmZj92b2lkIDA6ZXx8ZiYmYyZOYXx8ZyYmYyZPYT90aGlzLnByZXZlbnRTcmMoYik6dm9pZCAwfSxwcmV2ZW50U3JjOmZ1bmN0aW9uKGEpe3RoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZD0hMCxhLnByZXZlbnREZWZhdWx0KCl9fTt2YXIgbmI9MSxvYj0yLHBiPTQscWI9OCxyYj1xYixzYj0xNix0Yj0zMjtZLnByb3RvdHlwZT17ZGVmYXVsdHM6e30sc2V0OmZ1bmN0aW9uKGEpe3JldHVybiBsYSh0aGlzLm9wdGlvbnMsYSksdGhpcy5tYW5hZ2VyJiZ0aGlzLm1hbmFnZXIudG91Y2hBY3Rpb24udXBkYXRlKCksdGhpc30scmVjb2duaXplV2l0aDpmdW5jdGlvbihhKXtpZihmKGEsXCJyZWNvZ25pemVXaXRoXCIsdGhpcykpcmV0dXJuIHRoaXM7dmFyIGI9dGhpcy5zaW11bHRhbmVvdXM7cmV0dXJuIGE9XyhhLHRoaXMpLGJbYS5pZF18fChiW2EuaWRdPWEsYS5yZWNvZ25pemVXaXRoKHRoaXMpKSx0aGlzfSxkcm9wUmVjb2duaXplV2l0aDpmdW5jdGlvbihhKXtyZXR1cm4gZihhLFwiZHJvcFJlY29nbml6ZVdpdGhcIix0aGlzKT90aGlzOihhPV8oYSx0aGlzKSxkZWxldGUgdGhpcy5zaW11bHRhbmVvdXNbYS5pZF0sdGhpcyl9LHJlcXVpcmVGYWlsdXJlOmZ1bmN0aW9uKGEpe2lmKGYoYSxcInJlcXVpcmVGYWlsdXJlXCIsdGhpcykpcmV0dXJuIHRoaXM7dmFyIGI9dGhpcy5yZXF1aXJlRmFpbDtyZXR1cm4gYT1fKGEsdGhpcyksLTE9PT1yKGIsYSkmJihiLnB1c2goYSksYS5yZXF1aXJlRmFpbHVyZSh0aGlzKSksdGhpc30sZHJvcFJlcXVpcmVGYWlsdXJlOmZ1bmN0aW9uKGEpe2lmKGYoYSxcImRyb3BSZXF1aXJlRmFpbHVyZVwiLHRoaXMpKXJldHVybiB0aGlzO2E9XyhhLHRoaXMpO3ZhciBiPXIodGhpcy5yZXF1aXJlRmFpbCxhKTtyZXR1cm4gYj4tMSYmdGhpcy5yZXF1aXJlRmFpbC5zcGxpY2UoYiwxKSx0aGlzfSxoYXNSZXF1aXJlRmFpbHVyZXM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGg+MH0sY2FuUmVjb2duaXplV2l0aDpmdW5jdGlvbihhKXtyZXR1cm4hIXRoaXMuc2ltdWx0YW5lb3VzW2EuaWRdfSxlbWl0OmZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYil7Yy5tYW5hZ2VyLmVtaXQoYixhKX12YXIgYz10aGlzLGQ9dGhpcy5zdGF0ZTtxYj5kJiZiKGMub3B0aW9ucy5ldmVudCtaKGQpKSxiKGMub3B0aW9ucy5ldmVudCksYS5hZGRpdGlvbmFsRXZlbnQmJmIoYS5hZGRpdGlvbmFsRXZlbnQpLGQ+PXFiJiZiKGMub3B0aW9ucy5ldmVudCtaKGQpKX0sdHJ5RW1pdDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5jYW5FbWl0KCk/dGhpcy5lbWl0KGEpOnZvaWQodGhpcy5zdGF0ZT10Yil9LGNhbkVtaXQ6ZnVuY3Rpb24oKXtmb3IodmFyIGE9MDthPHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoOyl7aWYoISh0aGlzLnJlcXVpcmVGYWlsW2FdLnN0YXRlJih0YnxuYikpKXJldHVybiExO2ErK31yZXR1cm4hMH0scmVjb2duaXplOmZ1bmN0aW9uKGEpe3ZhciBiPWxhKHt9LGEpO3JldHVybiBrKHRoaXMub3B0aW9ucy5lbmFibGUsW3RoaXMsYl0pPyh0aGlzLnN0YXRlJihyYnxzYnx0YikmJih0aGlzLnN0YXRlPW5iKSx0aGlzLnN0YXRlPXRoaXMucHJvY2VzcyhiKSx2b2lkKHRoaXMuc3RhdGUmKG9ifHBifHFifHNiKSYmdGhpcy50cnlFbWl0KGIpKSk6KHRoaXMucmVzZXQoKSx2b2lkKHRoaXMuc3RhdGU9dGIpKX0scHJvY2VzczpmdW5jdGlvbihhKXt9LGdldFRvdWNoQWN0aW9uOmZ1bmN0aW9uKCl7fSxyZXNldDpmdW5jdGlvbigpe319LGkoYWEsWSx7ZGVmYXVsdHM6e3BvaW50ZXJzOjF9LGF0dHJUZXN0OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucy5wb2ludGVycztyZXR1cm4gMD09PWJ8fGEucG9pbnRlcnMubGVuZ3RoPT09Yn0scHJvY2VzczpmdW5jdGlvbihhKXt2YXIgYj10aGlzLnN0YXRlLGM9YS5ldmVudFR5cGUsZD1iJihvYnxwYiksZT10aGlzLmF0dHJUZXN0KGEpO3JldHVybiBkJiYoYyZIYXx8IWUpP2J8c2I6ZHx8ZT9jJkdhP2J8cWI6YiZvYj9ifHBiOm9iOnRifX0pLGkoYmEsYWEse2RlZmF1bHRzOntldmVudDpcInBhblwiLHRocmVzaG9sZDoxMCxwb2ludGVyczoxLGRpcmVjdGlvbjpQYX0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9wdGlvbnMuZGlyZWN0aW9uLGI9W107cmV0dXJuIGEmTmEmJmIucHVzaChsYiksYSZPYSYmYi5wdXNoKGtiKSxifSxkaXJlY3Rpb25UZXN0OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucyxjPSEwLGQ9YS5kaXN0YW5jZSxlPWEuZGlyZWN0aW9uLGY9YS5kZWx0YVgsZz1hLmRlbHRhWTtyZXR1cm4gZSZiLmRpcmVjdGlvbnx8KGIuZGlyZWN0aW9uJk5hPyhlPTA9PT1mP0lhOjA+Zj9KYTpLYSxjPWYhPXRoaXMucFgsZD1NYXRoLmFicyhhLmRlbHRhWCkpOihlPTA9PT1nP0lhOjA+Zz9MYTpNYSxjPWchPXRoaXMucFksZD1NYXRoLmFicyhhLmRlbHRhWSkpKSxhLmRpcmVjdGlvbj1lLGMmJmQ+Yi50aHJlc2hvbGQmJmUmYi5kaXJlY3Rpb259LGF0dHJUZXN0OmZ1bmN0aW9uKGEpe3JldHVybiBhYS5wcm90b3R5cGUuYXR0clRlc3QuY2FsbCh0aGlzLGEpJiYodGhpcy5zdGF0ZSZvYnx8ISh0aGlzLnN0YXRlJm9iKSYmdGhpcy5kaXJlY3Rpb25UZXN0KGEpKX0sZW1pdDpmdW5jdGlvbihhKXt0aGlzLnBYPWEuZGVsdGFYLHRoaXMucFk9YS5kZWx0YVk7dmFyIGI9JChhLmRpcmVjdGlvbik7YiYmKGEuYWRkaXRpb25hbEV2ZW50PXRoaXMub3B0aW9ucy5ldmVudCtiKSx0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcyxhKX19KSxpKGNhLGFhLHtkZWZhdWx0czp7ZXZlbnQ6XCJwaW5jaFwiLHRocmVzaG9sZDowLHBvaW50ZXJzOjJ9LGdldFRvdWNoQWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuW2piXX0sYXR0clRlc3Q6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcyxhKSYmKE1hdGguYWJzKGEuc2NhbGUtMSk+dGhpcy5vcHRpb25zLnRocmVzaG9sZHx8dGhpcy5zdGF0ZSZvYil9LGVtaXQ6ZnVuY3Rpb24oYSl7aWYoMSE9PWEuc2NhbGUpe3ZhciBiPWEuc2NhbGU8MT9cImluXCI6XCJvdXRcIjthLmFkZGl0aW9uYWxFdmVudD10aGlzLm9wdGlvbnMuZXZlbnQrYn10aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcyxhKX19KSxpKGRhLFkse2RlZmF1bHRzOntldmVudDpcInByZXNzXCIscG9pbnRlcnM6MSx0aW1lOjI1MSx0aHJlc2hvbGQ6OX0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm5baGJdfSxwcm9jZXNzOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucyxjPWEucG9pbnRlcnMubGVuZ3RoPT09Yi5wb2ludGVycyxkPWEuZGlzdGFuY2U8Yi50aHJlc2hvbGQsZj1hLmRlbHRhVGltZT5iLnRpbWU7aWYodGhpcy5faW5wdXQ9YSwhZHx8IWN8fGEuZXZlbnRUeXBlJihHYXxIYSkmJiFmKXRoaXMucmVzZXQoKTtlbHNlIGlmKGEuZXZlbnRUeXBlJkVhKXRoaXMucmVzZXQoKSx0aGlzLl90aW1lcj1lKGZ1bmN0aW9uKCl7dGhpcy5zdGF0ZT1yYix0aGlzLnRyeUVtaXQoKX0sYi50aW1lLHRoaXMpO2Vsc2UgaWYoYS5ldmVudFR5cGUmR2EpcmV0dXJuIHJiO3JldHVybiB0Yn0scmVzZXQ6ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpfSxlbWl0OmZ1bmN0aW9uKGEpe3RoaXMuc3RhdGU9PT1yYiYmKGEmJmEuZXZlbnRUeXBlJkdhP3RoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCtcInVwXCIsYSk6KHRoaXMuX2lucHV0LnRpbWVTdGFtcD1yYSgpLHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCx0aGlzLl9pbnB1dCkpKX19KSxpKGVhLGFhLHtkZWZhdWx0czp7ZXZlbnQ6XCJyb3RhdGVcIix0aHJlc2hvbGQ6MCxwb2ludGVyczoyfSxnZXRUb3VjaEFjdGlvbjpmdW5jdGlvbigpe3JldHVybltqYl19LGF0dHJUZXN0OmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsYSkmJihNYXRoLmFicyhhLnJvdGF0aW9uKT50aGlzLm9wdGlvbnMudGhyZXNob2xkfHx0aGlzLnN0YXRlJm9iKX19KSxpKGZhLGFhLHtkZWZhdWx0czp7ZXZlbnQ6XCJzd2lwZVwiLHRocmVzaG9sZDoxMCx2ZWxvY2l0eTouMyxkaXJlY3Rpb246TmF8T2EscG9pbnRlcnM6MX0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gYmEucHJvdG90eXBlLmdldFRvdWNoQWN0aW9uLmNhbGwodGhpcyl9LGF0dHJUZXN0OmZ1bmN0aW9uKGEpe3ZhciBiLGM9dGhpcy5vcHRpb25zLmRpcmVjdGlvbjtyZXR1cm4gYyYoTmF8T2EpP2I9YS5vdmVyYWxsVmVsb2NpdHk6YyZOYT9iPWEub3ZlcmFsbFZlbG9jaXR5WDpjJk9hJiYoYj1hLm92ZXJhbGxWZWxvY2l0eVkpLHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcyxhKSYmYyZhLm9mZnNldERpcmVjdGlvbiYmYS5kaXN0YW5jZT50aGlzLm9wdGlvbnMudGhyZXNob2xkJiZhLm1heFBvaW50ZXJzPT10aGlzLm9wdGlvbnMucG9pbnRlcnMmJnFhKGIpPnRoaXMub3B0aW9ucy52ZWxvY2l0eSYmYS5ldmVudFR5cGUmR2F9LGVtaXQ6ZnVuY3Rpb24oYSl7dmFyIGI9JChhLm9mZnNldERpcmVjdGlvbik7YiYmdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50K2IsYSksdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LGEpfX0pLGkoZ2EsWSx7ZGVmYXVsdHM6e2V2ZW50OlwidGFwXCIscG9pbnRlcnM6MSx0YXBzOjEsaW50ZXJ2YWw6MzAwLHRpbWU6MjUwLHRocmVzaG9sZDo5LHBvc1RocmVzaG9sZDoxMH0sZ2V0VG91Y2hBY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm5baWJdfSxwcm9jZXNzOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucyxjPWEucG9pbnRlcnMubGVuZ3RoPT09Yi5wb2ludGVycyxkPWEuZGlzdGFuY2U8Yi50aHJlc2hvbGQsZj1hLmRlbHRhVGltZTxiLnRpbWU7aWYodGhpcy5yZXNldCgpLGEuZXZlbnRUeXBlJkVhJiYwPT09dGhpcy5jb3VudClyZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO2lmKGQmJmYmJmMpe2lmKGEuZXZlbnRUeXBlIT1HYSlyZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO3ZhciBnPXRoaXMucFRpbWU/YS50aW1lU3RhbXAtdGhpcy5wVGltZTxiLmludGVydmFsOiEwLGg9IXRoaXMucENlbnRlcnx8SCh0aGlzLnBDZW50ZXIsYS5jZW50ZXIpPGIucG9zVGhyZXNob2xkO3RoaXMucFRpbWU9YS50aW1lU3RhbXAsdGhpcy5wQ2VudGVyPWEuY2VudGVyLGgmJmc/dGhpcy5jb3VudCs9MTp0aGlzLmNvdW50PTEsdGhpcy5faW5wdXQ9YTt2YXIgaT10aGlzLmNvdW50JWIudGFwcztpZigwPT09aSlyZXR1cm4gdGhpcy5oYXNSZXF1aXJlRmFpbHVyZXMoKT8odGhpcy5fdGltZXI9ZShmdW5jdGlvbigpe3RoaXMuc3RhdGU9cmIsdGhpcy50cnlFbWl0KCl9LGIuaW50ZXJ2YWwsdGhpcyksb2IpOnJifXJldHVybiB0Yn0sZmFpbFRpbWVvdXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fdGltZXI9ZShmdW5jdGlvbigpe3RoaXMuc3RhdGU9dGJ9LHRoaXMub3B0aW9ucy5pbnRlcnZhbCx0aGlzKSx0Yn0scmVzZXQ6ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpfSxlbWl0OmZ1bmN0aW9uKCl7dGhpcy5zdGF0ZT09cmImJih0aGlzLl9pbnB1dC50YXBDb3VudD10aGlzLmNvdW50LHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCx0aGlzLl9pbnB1dCkpfX0pLGhhLlZFUlNJT049XCIyLjAuN1wiLGhhLmRlZmF1bHRzPXtkb21FdmVudHM6ITEsdG91Y2hBY3Rpb246Z2IsZW5hYmxlOiEwLGlucHV0VGFyZ2V0Om51bGwsaW5wdXRDbGFzczpudWxsLHByZXNldDpbW2VhLHtlbmFibGU6ITF9XSxbY2Ese2VuYWJsZTohMX0sW1wicm90YXRlXCJdXSxbZmEse2RpcmVjdGlvbjpOYX1dLFtiYSx7ZGlyZWN0aW9uOk5hfSxbXCJzd2lwZVwiXV0sW2dhXSxbZ2Ese2V2ZW50OlwiZG91YmxldGFwXCIsdGFwczoyfSxbXCJ0YXBcIl1dLFtkYV1dLGNzc1Byb3BzOnt1c2VyU2VsZWN0Olwibm9uZVwiLHRvdWNoU2VsZWN0Olwibm9uZVwiLHRvdWNoQ2FsbG91dDpcIm5vbmVcIixjb250ZW50Wm9vbWluZzpcIm5vbmVcIix1c2VyRHJhZzpcIm5vbmVcIix0YXBIaWdobGlnaHRDb2xvcjpcInJnYmEoMCwwLDAsMClcIn19O3ZhciB1Yj0xLHZiPTI7aWEucHJvdG90eXBlPXtzZXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIGxhKHRoaXMub3B0aW9ucyxhKSxhLnRvdWNoQWN0aW9uJiZ0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpLGEuaW5wdXRUYXJnZXQmJih0aGlzLmlucHV0LmRlc3Ryb3koKSx0aGlzLmlucHV0LnRhcmdldD1hLmlucHV0VGFyZ2V0LHRoaXMuaW5wdXQuaW5pdCgpKSx0aGlzfSxzdG9wOmZ1bmN0aW9uKGEpe3RoaXMuc2Vzc2lvbi5zdG9wcGVkPWE/dmI6dWJ9LHJlY29nbml6ZTpmdW5jdGlvbihhKXt2YXIgYj10aGlzLnNlc3Npb247aWYoIWIuc3RvcHBlZCl7dGhpcy50b3VjaEFjdGlvbi5wcmV2ZW50RGVmYXVsdHMoYSk7dmFyIGMsZD10aGlzLnJlY29nbml6ZXJzLGU9Yi5jdXJSZWNvZ25pemVyOyghZXx8ZSYmZS5zdGF0ZSZyYikmJihlPWIuY3VyUmVjb2duaXplcj1udWxsKTtmb3IodmFyIGY9MDtmPGQubGVuZ3RoOyljPWRbZl0sYi5zdG9wcGVkPT09dmJ8fGUmJmMhPWUmJiFjLmNhblJlY29nbml6ZVdpdGgoZSk/Yy5yZXNldCgpOmMucmVjb2duaXplKGEpLCFlJiZjLnN0YXRlJihvYnxwYnxxYikmJihlPWIuY3VyUmVjb2duaXplcj1jKSxmKyt9fSxnZXQ6ZnVuY3Rpb24oYSl7aWYoYSBpbnN0YW5jZW9mIFkpcmV0dXJuIGE7Zm9yKHZhciBiPXRoaXMucmVjb2duaXplcnMsYz0wO2M8Yi5sZW5ndGg7YysrKWlmKGJbY10ub3B0aW9ucy5ldmVudD09YSlyZXR1cm4gYltjXTtyZXR1cm4gbnVsbH0sYWRkOmZ1bmN0aW9uKGEpe2lmKGYoYSxcImFkZFwiLHRoaXMpKXJldHVybiB0aGlzO3ZhciBiPXRoaXMuZ2V0KGEub3B0aW9ucy5ldmVudCk7cmV0dXJuIGImJnRoaXMucmVtb3ZlKGIpLHRoaXMucmVjb2duaXplcnMucHVzaChhKSxhLm1hbmFnZXI9dGhpcyx0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpLGF9LHJlbW92ZTpmdW5jdGlvbihhKXtpZihmKGEsXCJyZW1vdmVcIix0aGlzKSlyZXR1cm4gdGhpcztpZihhPXRoaXMuZ2V0KGEpKXt2YXIgYj10aGlzLnJlY29nbml6ZXJzLGM9cihiLGEpOy0xIT09YyYmKGIuc3BsaWNlKGMsMSksdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKSl9cmV0dXJuIHRoaXN9LG9uOmZ1bmN0aW9uKGEsYil7aWYoYSE9PWQmJmIhPT1kKXt2YXIgYz10aGlzLmhhbmRsZXJzO3JldHVybiBnKHEoYSksZnVuY3Rpb24oYSl7Y1thXT1jW2FdfHxbXSxjW2FdLnB1c2goYil9KSx0aGlzfX0sb2ZmOmZ1bmN0aW9uKGEsYil7aWYoYSE9PWQpe3ZhciBjPXRoaXMuaGFuZGxlcnM7cmV0dXJuIGcocShhKSxmdW5jdGlvbihhKXtiP2NbYV0mJmNbYV0uc3BsaWNlKHIoY1thXSxiKSwxKTpkZWxldGUgY1thXX0pLHRoaXN9fSxlbWl0OmZ1bmN0aW9uKGEsYil7dGhpcy5vcHRpb25zLmRvbUV2ZW50cyYma2EoYSxiKTt2YXIgYz10aGlzLmhhbmRsZXJzW2FdJiZ0aGlzLmhhbmRsZXJzW2FdLnNsaWNlKCk7aWYoYyYmYy5sZW5ndGgpe2IudHlwZT1hLGIucHJldmVudERlZmF1bHQ9ZnVuY3Rpb24oKXtiLnNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCl9O2Zvcih2YXIgZD0wO2Q8Yy5sZW5ndGg7KWNbZF0oYiksZCsrfX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuZWxlbWVudCYmamEodGhpcywhMSksdGhpcy5oYW5kbGVycz17fSx0aGlzLnNlc3Npb249e30sdGhpcy5pbnB1dC5kZXN0cm95KCksdGhpcy5lbGVtZW50PW51bGx9fSxsYShoYSx7SU5QVVRfU1RBUlQ6RWEsSU5QVVRfTU9WRTpGYSxJTlBVVF9FTkQ6R2EsSU5QVVRfQ0FOQ0VMOkhhLFNUQVRFX1BPU1NJQkxFOm5iLFNUQVRFX0JFR0FOOm9iLFNUQVRFX0NIQU5HRUQ6cGIsU1RBVEVfRU5ERUQ6cWIsU1RBVEVfUkVDT0dOSVpFRDpyYixTVEFURV9DQU5DRUxMRUQ6c2IsU1RBVEVfRkFJTEVEOnRiLERJUkVDVElPTl9OT05FOklhLERJUkVDVElPTl9MRUZUOkphLERJUkVDVElPTl9SSUdIVDpLYSxESVJFQ1RJT05fVVA6TGEsRElSRUNUSU9OX0RPV046TWEsRElSRUNUSU9OX0hPUklaT05UQUw6TmEsRElSRUNUSU9OX1ZFUlRJQ0FMOk9hLERJUkVDVElPTl9BTEw6UGEsTWFuYWdlcjppYSxJbnB1dDp4LFRvdWNoQWN0aW9uOlYsVG91Y2hJbnB1dDpQLE1vdXNlSW5wdXQ6TCxQb2ludGVyRXZlbnRJbnB1dDpNLFRvdWNoTW91c2VJbnB1dDpSLFNpbmdsZVRvdWNoSW5wdXQ6TixSZWNvZ25pemVyOlksQXR0clJlY29nbml6ZXI6YWEsVGFwOmdhLFBhbjpiYSxTd2lwZTpmYSxQaW5jaDpjYSxSb3RhdGU6ZWEsUHJlc3M6ZGEsb246bSxvZmY6bixlYWNoOmcsbWVyZ2U6dGEsZXh0ZW5kOnNhLGFzc2lnbjpsYSxpbmhlcml0OmksYmluZEZuOmoscHJlZml4ZWQ6dX0pO3ZhciB3Yj1cInVuZGVmaW5lZFwiIT10eXBlb2YgYT9hOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6e307d2IuSGFtbWVyPWhhLFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gaGF9KTpcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1oYTphW2NdPWhhfSh3aW5kb3csZG9jdW1lbnQsXCJIYW1tZXJcIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oYW1tZXIubWluLmpzLm1hcCIsIi8qIVxuICogTWFzb25yeSBQQUNLQUdFRCB2NC4yLjBcbiAqIENhc2NhZGluZyBncmlkIGxheW91dCBsaWJyYXJ5XG4gKiBodHRwOi8vbWFzb25yeS5kZXNhbmRyby5jb21cbiAqIE1JVCBMaWNlbnNlXG4gKiBieSBEYXZpZCBEZVNhbmRyb1xuICovXG5cbiFmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJqcXVlcnktYnJpZGdldC9qcXVlcnktYnJpZGdldFwiLFtcImpxdWVyeVwiXSxmdW5jdGlvbihpKXtyZXR1cm4gZSh0LGkpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSh0LHJlcXVpcmUoXCJqcXVlcnlcIikpOnQualF1ZXJ5QnJpZGdldD1lKHQsdC5qUXVlcnkpfSh3aW5kb3csZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKGkscixhKXtmdW5jdGlvbiBoKHQsZSxuKXt2YXIgbyxyPVwiJCgpLlwiK2krJyhcIicrZSsnXCIpJztyZXR1cm4gdC5lYWNoKGZ1bmN0aW9uKHQsaCl7dmFyIHU9YS5kYXRhKGgsaSk7aWYoIXUpcmV0dXJuIHZvaWQgcyhpK1wiIG5vdCBpbml0aWFsaXplZC4gQ2Fubm90IGNhbGwgbWV0aG9kcywgaS5lLiBcIityKTt2YXIgZD11W2VdO2lmKCFkfHxcIl9cIj09ZS5jaGFyQXQoMCkpcmV0dXJuIHZvaWQgcyhyK1wiIGlzIG5vdCBhIHZhbGlkIG1ldGhvZFwiKTt2YXIgbD1kLmFwcGx5KHUsbik7bz12b2lkIDA9PT1vP2w6b30pLHZvaWQgMCE9PW8/bzp0fWZ1bmN0aW9uIHUodCxlKXt0LmVhY2goZnVuY3Rpb24odCxuKXt2YXIgbz1hLmRhdGEobixpKTtvPyhvLm9wdGlvbihlKSxvLl9pbml0KCkpOihvPW5ldyByKG4sZSksYS5kYXRhKG4saSxvKSl9KX1hPWF8fGV8fHQualF1ZXJ5LGEmJihyLnByb3RvdHlwZS5vcHRpb258fChyLnByb3RvdHlwZS5vcHRpb249ZnVuY3Rpb24odCl7YS5pc1BsYWluT2JqZWN0KHQpJiYodGhpcy5vcHRpb25zPWEuZXh0ZW5kKCEwLHRoaXMub3B0aW9ucyx0KSl9KSxhLmZuW2ldPWZ1bmN0aW9uKHQpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXt2YXIgZT1vLmNhbGwoYXJndW1lbnRzLDEpO3JldHVybiBoKHRoaXMsdCxlKX1yZXR1cm4gdSh0aGlzLHQpLHRoaXN9LG4oYSkpfWZ1bmN0aW9uIG4odCl7IXR8fHQmJnQuYnJpZGdldHx8KHQuYnJpZGdldD1pKX12YXIgbz1BcnJheS5wcm90b3R5cGUuc2xpY2Uscj10LmNvbnNvbGUscz1cInVuZGVmaW5lZFwiPT10eXBlb2Ygcj9mdW5jdGlvbigpe306ZnVuY3Rpb24odCl7ci5lcnJvcih0KX07cmV0dXJuIG4oZXx8dC5qUXVlcnkpLGl9KSxmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJldi1lbWl0dGVyL2V2LWVtaXR0ZXJcIixlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKCk6dC5FdkVtaXR0ZXI9ZSgpfShcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp0aGlzLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe312YXIgZT10LnByb3RvdHlwZTtyZXR1cm4gZS5vbj1mdW5jdGlvbih0LGUpe2lmKHQmJmUpe3ZhciBpPXRoaXMuX2V2ZW50cz10aGlzLl9ldmVudHN8fHt9LG49aVt0XT1pW3RdfHxbXTtyZXR1cm4tMT09bi5pbmRleE9mKGUpJiZuLnB1c2goZSksdGhpc319LGUub25jZT1mdW5jdGlvbih0LGUpe2lmKHQmJmUpe3RoaXMub24odCxlKTt2YXIgaT10aGlzLl9vbmNlRXZlbnRzPXRoaXMuX29uY2VFdmVudHN8fHt9LG49aVt0XT1pW3RdfHx7fTtyZXR1cm4gbltlXT0hMCx0aGlzfX0sZS5vZmY9ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50c1t0XTtpZihpJiZpLmxlbmd0aCl7dmFyIG49aS5pbmRleE9mKGUpO3JldHVybi0xIT1uJiZpLnNwbGljZShuLDEpLHRoaXN9fSxlLmVtaXRFdmVudD1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzW3RdO2lmKGkmJmkubGVuZ3RoKXt2YXIgbj0wLG89aVtuXTtlPWV8fFtdO2Zvcih2YXIgcj10aGlzLl9vbmNlRXZlbnRzJiZ0aGlzLl9vbmNlRXZlbnRzW3RdO287KXt2YXIgcz1yJiZyW29dO3MmJih0aGlzLm9mZih0LG8pLGRlbGV0ZSByW29dKSxvLmFwcGx5KHRoaXMsZSksbis9cz8wOjEsbz1pW25dfXJldHVybiB0aGlzfX0sdH0pLGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImdldC1zaXplL2dldC1zaXplXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gZSgpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSgpOnQuZ2V0U2l6ZT1lKCl9KHdpbmRvdyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7dmFyIGU9cGFyc2VGbG9hdCh0KSxpPS0xPT10LmluZGV4T2YoXCIlXCIpJiYhaXNOYU4oZSk7cmV0dXJuIGkmJmV9ZnVuY3Rpb24gZSgpe31mdW5jdGlvbiBpKCl7Zm9yKHZhciB0PXt3aWR0aDowLGhlaWdodDowLGlubmVyV2lkdGg6MCxpbm5lckhlaWdodDowLG91dGVyV2lkdGg6MCxvdXRlckhlaWdodDowfSxlPTA7dT5lO2UrKyl7dmFyIGk9aFtlXTt0W2ldPTB9cmV0dXJuIHR9ZnVuY3Rpb24gbih0KXt2YXIgZT1nZXRDb21wdXRlZFN0eWxlKHQpO3JldHVybiBlfHxhKFwiU3R5bGUgcmV0dXJuZWQgXCIrZStcIi4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gU2VlIGh0dHA6Ly9iaXQubHkvZ2V0c2l6ZWJ1ZzFcIiksZX1mdW5jdGlvbiBvKCl7aWYoIWQpe2Q9ITA7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtlLnN0eWxlLndpZHRoPVwiMjAwcHhcIixlLnN0eWxlLnBhZGRpbmc9XCIxcHggMnB4IDNweCA0cHhcIixlLnN0eWxlLmJvcmRlclN0eWxlPVwic29saWRcIixlLnN0eWxlLmJvcmRlcldpZHRoPVwiMXB4IDJweCAzcHggNHB4XCIsZS5zdHlsZS5ib3hTaXppbmc9XCJib3JkZXItYm94XCI7dmFyIGk9ZG9jdW1lbnQuYm9keXx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O2kuYXBwZW5kQ2hpbGQoZSk7dmFyIG89bihlKTtyLmlzQm94U2l6ZU91dGVyPXM9MjAwPT10KG8ud2lkdGgpLGkucmVtb3ZlQ2hpbGQoZSl9fWZ1bmN0aW9uIHIoZSl7aWYobygpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUpKSxlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZS5ub2RlVHlwZSl7dmFyIHI9bihlKTtpZihcIm5vbmVcIj09ci5kaXNwbGF5KXJldHVybiBpKCk7dmFyIGE9e307YS53aWR0aD1lLm9mZnNldFdpZHRoLGEuaGVpZ2h0PWUub2Zmc2V0SGVpZ2h0O2Zvcih2YXIgZD1hLmlzQm9yZGVyQm94PVwiYm9yZGVyLWJveFwiPT1yLmJveFNpemluZyxsPTA7dT5sO2wrKyl7dmFyIGM9aFtsXSxmPXJbY10sbT1wYXJzZUZsb2F0KGYpO2FbY109aXNOYU4obSk/MDptfXZhciBwPWEucGFkZGluZ0xlZnQrYS5wYWRkaW5nUmlnaHQsZz1hLnBhZGRpbmdUb3ArYS5wYWRkaW5nQm90dG9tLHk9YS5tYXJnaW5MZWZ0K2EubWFyZ2luUmlnaHQsdj1hLm1hcmdpblRvcCthLm1hcmdpbkJvdHRvbSxfPWEuYm9yZGVyTGVmdFdpZHRoK2EuYm9yZGVyUmlnaHRXaWR0aCx6PWEuYm9yZGVyVG9wV2lkdGgrYS5ib3JkZXJCb3R0b21XaWR0aCxFPWQmJnMsYj10KHIud2lkdGgpO2IhPT0hMSYmKGEud2lkdGg9YisoRT8wOnArXykpO3ZhciB4PXQoci5oZWlnaHQpO3JldHVybiB4IT09ITEmJihhLmhlaWdodD14KyhFPzA6Zyt6KSksYS5pbm5lcldpZHRoPWEud2lkdGgtKHArXyksYS5pbm5lckhlaWdodD1hLmhlaWdodC0oZyt6KSxhLm91dGVyV2lkdGg9YS53aWR0aCt5LGEub3V0ZXJIZWlnaHQ9YS5oZWlnaHQrdixhfX12YXIgcyxhPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBjb25zb2xlP2U6ZnVuY3Rpb24odCl7Y29uc29sZS5lcnJvcih0KX0saD1bXCJwYWRkaW5nTGVmdFwiLFwicGFkZGluZ1JpZ2h0XCIsXCJwYWRkaW5nVG9wXCIsXCJwYWRkaW5nQm90dG9tXCIsXCJtYXJnaW5MZWZ0XCIsXCJtYXJnaW5SaWdodFwiLFwibWFyZ2luVG9wXCIsXCJtYXJnaW5Cb3R0b21cIixcImJvcmRlckxlZnRXaWR0aFwiLFwiYm9yZGVyUmlnaHRXaWR0aFwiLFwiYm9yZGVyVG9wV2lkdGhcIixcImJvcmRlckJvdHRvbVdpZHRoXCJdLHU9aC5sZW5ndGgsZD0hMTtyZXR1cm4gcn0pLGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImRlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3RvclwiLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUoKTp0Lm1hdGNoZXNTZWxlY3Rvcj1lKCl9KHdpbmRvdyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PWZ1bmN0aW9uKCl7dmFyIHQ9d2luZG93LkVsZW1lbnQucHJvdG90eXBlO2lmKHQubWF0Y2hlcylyZXR1cm5cIm1hdGNoZXNcIjtpZih0Lm1hdGNoZXNTZWxlY3RvcilyZXR1cm5cIm1hdGNoZXNTZWxlY3RvclwiO2Zvcih2YXIgZT1bXCJ3ZWJraXRcIixcIm1velwiLFwibXNcIixcIm9cIl0saT0wO2k8ZS5sZW5ndGg7aSsrKXt2YXIgbj1lW2ldLG89bitcIk1hdGNoZXNTZWxlY3RvclwiO2lmKHRbb10pcmV0dXJuIG99fSgpO3JldHVybiBmdW5jdGlvbihlLGkpe3JldHVybiBlW3RdKGkpfX0pLGZ1bmN0aW9uKHQsZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImZpenp5LXVpLXV0aWxzL3V0aWxzXCIsW1wiZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yXCJdLGZ1bmN0aW9uKGkpe3JldHVybiBlKHQsaSl9KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHQscmVxdWlyZShcImRlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3JcIikpOnQuZml6enlVSVV0aWxzPWUodCx0Lm1hdGNoZXNTZWxlY3Rvcil9KHdpbmRvdyxmdW5jdGlvbih0LGUpe3ZhciBpPXt9O2kuZXh0ZW5kPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBpIGluIGUpdFtpXT1lW2ldO3JldHVybiB0fSxpLm1vZHVsbz1mdW5jdGlvbih0LGUpe3JldHVybih0JWUrZSklZX0saS5tYWtlQXJyYXk9ZnVuY3Rpb24odCl7dmFyIGU9W107aWYoQXJyYXkuaXNBcnJheSh0KSllPXQ7ZWxzZSBpZih0JiZcIm9iamVjdFwiPT10eXBlb2YgdCYmXCJudW1iZXJcIj09dHlwZW9mIHQubGVuZ3RoKWZvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKWUucHVzaCh0W2ldKTtlbHNlIGUucHVzaCh0KTtyZXR1cm4gZX0saS5yZW1vdmVGcm9tPWZ1bmN0aW9uKHQsZSl7dmFyIGk9dC5pbmRleE9mKGUpOy0xIT1pJiZ0LnNwbGljZShpLDEpfSxpLmdldFBhcmVudD1mdW5jdGlvbih0LGkpe2Zvcig7dCE9ZG9jdW1lbnQuYm9keTspaWYodD10LnBhcmVudE5vZGUsZSh0LGkpKXJldHVybiB0fSxpLmdldFF1ZXJ5RWxlbWVudD1mdW5jdGlvbih0KXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdD9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpOnR9LGkuaGFuZGxlRXZlbnQ9ZnVuY3Rpb24odCl7dmFyIGU9XCJvblwiK3QudHlwZTt0aGlzW2VdJiZ0aGlzW2VdKHQpfSxpLmZpbHRlckZpbmRFbGVtZW50cz1mdW5jdGlvbih0LG4pe3Q9aS5tYWtlQXJyYXkodCk7dmFyIG89W107cmV0dXJuIHQuZm9yRWFjaChmdW5jdGlvbih0KXtpZih0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe2lmKCFuKXJldHVybiB2b2lkIG8ucHVzaCh0KTtlKHQsbikmJm8ucHVzaCh0KTtmb3IodmFyIGk9dC5xdWVyeVNlbGVjdG9yQWxsKG4pLHI9MDtyPGkubGVuZ3RoO3IrKylvLnB1c2goaVtyXSl9fSksb30saS5kZWJvdW5jZU1ldGhvZD1mdW5jdGlvbih0LGUsaSl7dmFyIG49dC5wcm90b3R5cGVbZV0sbz1lK1wiVGltZW91dFwiO3QucHJvdG90eXBlW2VdPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1tvXTt0JiZjbGVhclRpbWVvdXQodCk7dmFyIGU9YXJndW1lbnRzLHI9dGhpczt0aGlzW29dPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLmFwcGx5KHIsZSksZGVsZXRlIHJbb119LGl8fDEwMCl9fSxpLmRvY1JlYWR5PWZ1bmN0aW9uKHQpe3ZhciBlPWRvY3VtZW50LnJlYWR5U3RhdGU7XCJjb21wbGV0ZVwiPT1lfHxcImludGVyYWN0aXZlXCI9PWU/c2V0VGltZW91dCh0KTpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLHQpfSxpLnRvRGFzaGVkPWZ1bmN0aW9uKHQpe3JldHVybiB0LnJlcGxhY2UoLyguKShbQS1aXSkvZyxmdW5jdGlvbih0LGUsaSl7cmV0dXJuIGUrXCItXCIraX0pLnRvTG93ZXJDYXNlKCl9O3ZhciBuPXQuY29uc29sZTtyZXR1cm4gaS5odG1sSW5pdD1mdW5jdGlvbihlLG8pe2kuZG9jUmVhZHkoZnVuY3Rpb24oKXt2YXIgcj1pLnRvRGFzaGVkKG8pLHM9XCJkYXRhLVwiK3IsYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW1wiK3MrXCJdXCIpLGg9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1cIityKSx1PWkubWFrZUFycmF5KGEpLmNvbmNhdChpLm1ha2VBcnJheShoKSksZD1zK1wiLW9wdGlvbnNcIixsPXQualF1ZXJ5O3UuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgaSxyPXQuZ2V0QXR0cmlidXRlKHMpfHx0LmdldEF0dHJpYnV0ZShkKTt0cnl7aT1yJiZKU09OLnBhcnNlKHIpfWNhdGNoKGEpe3JldHVybiB2b2lkKG4mJm4uZXJyb3IoXCJFcnJvciBwYXJzaW5nIFwiK3MrXCIgb24gXCIrdC5jbGFzc05hbWUrXCI6IFwiK2EpKX12YXIgaD1uZXcgZSh0LGkpO2wmJmwuZGF0YSh0LG8saCl9KX0pfSxpfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwib3V0bGF5ZXIvaXRlbVwiLFtcImV2LWVtaXR0ZXIvZXYtZW1pdHRlclwiLFwiZ2V0LXNpemUvZ2V0LXNpemVcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZShyZXF1aXJlKFwiZXYtZW1pdHRlclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikpOih0Lk91dGxheWVyPXt9LHQuT3V0bGF5ZXIuSXRlbT1lKHQuRXZFbWl0dGVyLHQuZ2V0U2l6ZSkpfSh3aW5kb3csZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKHQpe2Zvcih2YXIgZSBpbiB0KXJldHVybiExO3JldHVybiBlPW51bGwsITB9ZnVuY3Rpb24gbih0LGUpe3QmJih0aGlzLmVsZW1lbnQ9dCx0aGlzLmxheW91dD1lLHRoaXMucG9zaXRpb249e3g6MCx5OjB9LHRoaXMuX2NyZWF0ZSgpKX1mdW5jdGlvbiBvKHQpe3JldHVybiB0LnJlcGxhY2UoLyhbQS1aXSkvZyxmdW5jdGlvbih0KXtyZXR1cm5cIi1cIit0LnRvTG93ZXJDYXNlKCl9KX12YXIgcj1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUscz1cInN0cmluZ1wiPT10eXBlb2Ygci50cmFuc2l0aW9uP1widHJhbnNpdGlvblwiOlwiV2Via2l0VHJhbnNpdGlvblwiLGE9XCJzdHJpbmdcIj09dHlwZW9mIHIudHJhbnNmb3JtP1widHJhbnNmb3JtXCI6XCJXZWJraXRUcmFuc2Zvcm1cIixoPXtXZWJraXRUcmFuc2l0aW9uOlwid2Via2l0VHJhbnNpdGlvbkVuZFwiLHRyYW5zaXRpb246XCJ0cmFuc2l0aW9uZW5kXCJ9W3NdLHU9e3RyYW5zZm9ybTphLHRyYW5zaXRpb246cyx0cmFuc2l0aW9uRHVyYXRpb246cytcIkR1cmF0aW9uXCIsdHJhbnNpdGlvblByb3BlcnR5OnMrXCJQcm9wZXJ0eVwiLHRyYW5zaXRpb25EZWxheTpzK1wiRGVsYXlcIn0sZD1uLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQucHJvdG90eXBlKTtkLmNvbnN0cnVjdG9yPW4sZC5fY3JlYXRlPWZ1bmN0aW9uKCl7dGhpcy5fdHJhbnNuPXtpbmdQcm9wZXJ0aWVzOnt9LGNsZWFuOnt9LG9uRW5kOnt9fSx0aGlzLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwifSl9LGQuaGFuZGxlRXZlbnQ9ZnVuY3Rpb24odCl7dmFyIGU9XCJvblwiK3QudHlwZTt0aGlzW2VdJiZ0aGlzW2VdKHQpfSxkLmdldFNpemU9ZnVuY3Rpb24oKXt0aGlzLnNpemU9ZSh0aGlzLmVsZW1lbnQpfSxkLmNzcz1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmVsZW1lbnQuc3R5bGU7Zm9yKHZhciBpIGluIHQpe3ZhciBuPXVbaV18fGk7ZVtuXT10W2ldfX0sZC5nZXRQb3NpdGlvbj1mdW5jdGlvbigpe3ZhciB0PWdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KSxlPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5MZWZ0XCIpLGk9dGhpcy5sYXlvdXQuX2dldE9wdGlvbihcIm9yaWdpblRvcFwiKSxuPXRbZT9cImxlZnRcIjpcInJpZ2h0XCJdLG89dFtpP1widG9wXCI6XCJib3R0b21cIl0scj10aGlzLmxheW91dC5zaXplLHM9LTEhPW4uaW5kZXhPZihcIiVcIik/cGFyc2VGbG9hdChuKS8xMDAqci53aWR0aDpwYXJzZUludChuLDEwKSxhPS0xIT1vLmluZGV4T2YoXCIlXCIpP3BhcnNlRmxvYXQobykvMTAwKnIuaGVpZ2h0OnBhcnNlSW50KG8sMTApO3M9aXNOYU4ocyk/MDpzLGE9aXNOYU4oYSk/MDphLHMtPWU/ci5wYWRkaW5nTGVmdDpyLnBhZGRpbmdSaWdodCxhLT1pP3IucGFkZGluZ1RvcDpyLnBhZGRpbmdCb3R0b20sdGhpcy5wb3NpdGlvbi54PXMsdGhpcy5wb3NpdGlvbi55PWF9LGQubGF5b3V0UG9zaXRpb249ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmxheW91dC5zaXplLGU9e30saT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwib3JpZ2luTGVmdFwiKSxuPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5Ub3BcIiksbz1pP1wicGFkZGluZ0xlZnRcIjpcInBhZGRpbmdSaWdodFwiLHI9aT9cImxlZnRcIjpcInJpZ2h0XCIscz1pP1wicmlnaHRcIjpcImxlZnRcIixhPXRoaXMucG9zaXRpb24ueCt0W29dO2Vbcl09dGhpcy5nZXRYVmFsdWUoYSksZVtzXT1cIlwiO3ZhciBoPW4/XCJwYWRkaW5nVG9wXCI6XCJwYWRkaW5nQm90dG9tXCIsdT1uP1widG9wXCI6XCJib3R0b21cIixkPW4/XCJib3R0b21cIjpcInRvcFwiLGw9dGhpcy5wb3NpdGlvbi55K3RbaF07ZVt1XT10aGlzLmdldFlWYWx1ZShsKSxlW2RdPVwiXCIsdGhpcy5jc3MoZSksdGhpcy5lbWl0RXZlbnQoXCJsYXlvdXRcIixbdGhpc10pfSxkLmdldFhWYWx1ZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwiaG9yaXpvbnRhbFwiKTtyZXR1cm4gdGhpcy5sYXlvdXQub3B0aW9ucy5wZXJjZW50UG9zaXRpb24mJiFlP3QvdGhpcy5sYXlvdXQuc2l6ZS53aWR0aCoxMDArXCIlXCI6dCtcInB4XCJ9LGQuZ2V0WVZhbHVlPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJob3Jpem9udGFsXCIpO3JldHVybiB0aGlzLmxheW91dC5vcHRpb25zLnBlcmNlbnRQb3NpdGlvbiYmZT90L3RoaXMubGF5b3V0LnNpemUuaGVpZ2h0KjEwMCtcIiVcIjp0K1wicHhcIn0sZC5fdHJhbnNpdGlvblRvPWZ1bmN0aW9uKHQsZSl7dGhpcy5nZXRQb3NpdGlvbigpO3ZhciBpPXRoaXMucG9zaXRpb24ueCxuPXRoaXMucG9zaXRpb24ueSxvPXBhcnNlSW50KHQsMTApLHI9cGFyc2VJbnQoZSwxMCkscz1vPT09dGhpcy5wb3NpdGlvbi54JiZyPT09dGhpcy5wb3NpdGlvbi55O2lmKHRoaXMuc2V0UG9zaXRpb24odCxlKSxzJiYhdGhpcy5pc1RyYW5zaXRpb25pbmcpcmV0dXJuIHZvaWQgdGhpcy5sYXlvdXRQb3NpdGlvbigpO3ZhciBhPXQtaSxoPWUtbix1PXt9O3UudHJhbnNmb3JtPXRoaXMuZ2V0VHJhbnNsYXRlKGEsaCksdGhpcy50cmFuc2l0aW9uKHt0bzp1LG9uVHJhbnNpdGlvbkVuZDp7dHJhbnNmb3JtOnRoaXMubGF5b3V0UG9zaXRpb259LGlzQ2xlYW5pbmc6ITB9KX0sZC5nZXRUcmFuc2xhdGU9ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzLmxheW91dC5fZ2V0T3B0aW9uKFwib3JpZ2luTGVmdFwiKSxuPXRoaXMubGF5b3V0Ll9nZXRPcHRpb24oXCJvcmlnaW5Ub3BcIik7cmV0dXJuIHQ9aT90Oi10LGU9bj9lOi1lLFwidHJhbnNsYXRlM2QoXCIrdCtcInB4LCBcIitlK1wicHgsIDApXCJ9LGQuZ29Ubz1mdW5jdGlvbih0LGUpe3RoaXMuc2V0UG9zaXRpb24odCxlKSx0aGlzLmxheW91dFBvc2l0aW9uKCl9LGQubW92ZVRvPWQuX3RyYW5zaXRpb25UbyxkLnNldFBvc2l0aW9uPWZ1bmN0aW9uKHQsZSl7dGhpcy5wb3NpdGlvbi54PXBhcnNlSW50KHQsMTApLHRoaXMucG9zaXRpb24ueT1wYXJzZUludChlLDEwKX0sZC5fbm9uVHJhbnNpdGlvbj1mdW5jdGlvbih0KXt0aGlzLmNzcyh0LnRvKSx0LmlzQ2xlYW5pbmcmJnRoaXMuX3JlbW92ZVN0eWxlcyh0LnRvKTtmb3IodmFyIGUgaW4gdC5vblRyYW5zaXRpb25FbmQpdC5vblRyYW5zaXRpb25FbmRbZV0uY2FsbCh0aGlzKX0sZC50cmFuc2l0aW9uPWZ1bmN0aW9uKHQpe2lmKCFwYXJzZUZsb2F0KHRoaXMubGF5b3V0Lm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uKSlyZXR1cm4gdm9pZCB0aGlzLl9ub25UcmFuc2l0aW9uKHQpO3ZhciBlPXRoaXMuX3RyYW5zbjtmb3IodmFyIGkgaW4gdC5vblRyYW5zaXRpb25FbmQpZS5vbkVuZFtpXT10Lm9uVHJhbnNpdGlvbkVuZFtpXTtmb3IoaSBpbiB0LnRvKWUuaW5nUHJvcGVydGllc1tpXT0hMCx0LmlzQ2xlYW5pbmcmJihlLmNsZWFuW2ldPSEwKTtpZih0LmZyb20pe3RoaXMuY3NzKHQuZnJvbSk7dmFyIG49dGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtuPW51bGx9dGhpcy5lbmFibGVUcmFuc2l0aW9uKHQudG8pLHRoaXMuY3NzKHQudG8pLHRoaXMuaXNUcmFuc2l0aW9uaW5nPSEwfTt2YXIgbD1cIm9wYWNpdHksXCIrbyhhKTtkLmVuYWJsZVRyYW5zaXRpb249ZnVuY3Rpb24oKXtpZighdGhpcy5pc1RyYW5zaXRpb25pbmcpe3ZhciB0PXRoaXMubGF5b3V0Lm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uO3Q9XCJudW1iZXJcIj09dHlwZW9mIHQ/dCtcIm1zXCI6dCx0aGlzLmNzcyh7dHJhbnNpdGlvblByb3BlcnR5OmwsdHJhbnNpdGlvbkR1cmF0aW9uOnQsdHJhbnNpdGlvbkRlbGF5OnRoaXMuc3RhZ2dlckRlbGF5fHwwfSksdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoaCx0aGlzLCExKX19LGQub253ZWJraXRUcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKHQpe3RoaXMub250cmFuc2l0aW9uZW5kKHQpfSxkLm9ub3RyYW5zaXRpb25lbmQ9ZnVuY3Rpb24odCl7dGhpcy5vbnRyYW5zaXRpb25lbmQodCl9O3ZhciBjPXtcIi13ZWJraXQtdHJhbnNmb3JtXCI6XCJ0cmFuc2Zvcm1cIn07ZC5vbnRyYW5zaXRpb25lbmQ9ZnVuY3Rpb24odCl7aWYodC50YXJnZXQ9PT10aGlzLmVsZW1lbnQpe3ZhciBlPXRoaXMuX3RyYW5zbixuPWNbdC5wcm9wZXJ0eU5hbWVdfHx0LnByb3BlcnR5TmFtZTtpZihkZWxldGUgZS5pbmdQcm9wZXJ0aWVzW25dLGkoZS5pbmdQcm9wZXJ0aWVzKSYmdGhpcy5kaXNhYmxlVHJhbnNpdGlvbigpLG4gaW4gZS5jbGVhbiYmKHRoaXMuZWxlbWVudC5zdHlsZVt0LnByb3BlcnR5TmFtZV09XCJcIixkZWxldGUgZS5jbGVhbltuXSksbiBpbiBlLm9uRW5kKXt2YXIgbz1lLm9uRW5kW25dO28uY2FsbCh0aGlzKSxkZWxldGUgZS5vbkVuZFtuXX10aGlzLmVtaXRFdmVudChcInRyYW5zaXRpb25FbmRcIixbdGhpc10pfX0sZC5kaXNhYmxlVHJhbnNpdGlvbj1mdW5jdGlvbigpe3RoaXMucmVtb3ZlVHJhbnNpdGlvblN0eWxlcygpLHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGgsdGhpcywhMSksdGhpcy5pc1RyYW5zaXRpb25pbmc9ITF9LGQuX3JlbW92ZVN0eWxlcz1mdW5jdGlvbih0KXt2YXIgZT17fTtmb3IodmFyIGkgaW4gdCllW2ldPVwiXCI7dGhpcy5jc3MoZSl9O3ZhciBmPXt0cmFuc2l0aW9uUHJvcGVydHk6XCJcIix0cmFuc2l0aW9uRHVyYXRpb246XCJcIix0cmFuc2l0aW9uRGVsYXk6XCJcIn07cmV0dXJuIGQucmVtb3ZlVHJhbnNpdGlvblN0eWxlcz1mdW5jdGlvbigpe3RoaXMuY3NzKGYpfSxkLnN0YWdnZXI9ZnVuY3Rpb24odCl7dD1pc05hTih0KT8wOnQsdGhpcy5zdGFnZ2VyRGVsYXk9dCtcIm1zXCJ9LGQucmVtb3ZlRWxlbT1mdW5jdGlvbigpe3RoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCksdGhpcy5jc3Moe2Rpc3BsYXk6XCJcIn0pLHRoaXMuZW1pdEV2ZW50KFwicmVtb3ZlXCIsW3RoaXNdKX0sZC5yZW1vdmU9ZnVuY3Rpb24oKXtyZXR1cm4gcyYmcGFyc2VGbG9hdCh0aGlzLmxheW91dC5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbik/KHRoaXMub25jZShcInRyYW5zaXRpb25FbmRcIixmdW5jdGlvbigpe3RoaXMucmVtb3ZlRWxlbSgpfSksdm9pZCB0aGlzLmhpZGUoKSk6dm9pZCB0aGlzLnJlbW92ZUVsZW0oKX0sZC5yZXZlYWw9ZnVuY3Rpb24oKXtkZWxldGUgdGhpcy5pc0hpZGRlbix0aGlzLmNzcyh7ZGlzcGxheTpcIlwifSk7dmFyIHQ9dGhpcy5sYXlvdXQub3B0aW9ucyxlPXt9LGk9dGhpcy5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5KFwidmlzaWJsZVN0eWxlXCIpO2VbaV09dGhpcy5vblJldmVhbFRyYW5zaXRpb25FbmQsdGhpcy50cmFuc2l0aW9uKHtmcm9tOnQuaGlkZGVuU3R5bGUsdG86dC52aXNpYmxlU3R5bGUsaXNDbGVhbmluZzohMCxvblRyYW5zaXRpb25FbmQ6ZX0pfSxkLm9uUmV2ZWFsVHJhbnNpdGlvbkVuZD1mdW5jdGlvbigpe3RoaXMuaXNIaWRkZW58fHRoaXMuZW1pdEV2ZW50KFwicmV2ZWFsXCIpfSxkLmdldEhpZGVSZXZlYWxUcmFuc2l0aW9uRW5kUHJvcGVydHk9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5sYXlvdXQub3B0aW9uc1t0XTtpZihlLm9wYWNpdHkpcmV0dXJuXCJvcGFjaXR5XCI7Zm9yKHZhciBpIGluIGUpcmV0dXJuIGl9LGQuaGlkZT1mdW5jdGlvbigpe3RoaXMuaXNIaWRkZW49ITAsdGhpcy5jc3Moe2Rpc3BsYXk6XCJcIn0pO3ZhciB0PXRoaXMubGF5b3V0Lm9wdGlvbnMsZT17fSxpPXRoaXMuZ2V0SGlkZVJldmVhbFRyYW5zaXRpb25FbmRQcm9wZXJ0eShcImhpZGRlblN0eWxlXCIpO2VbaV09dGhpcy5vbkhpZGVUcmFuc2l0aW9uRW5kLHRoaXMudHJhbnNpdGlvbih7ZnJvbTp0LnZpc2libGVTdHlsZSx0bzp0LmhpZGRlblN0eWxlLGlzQ2xlYW5pbmc6ITAsb25UcmFuc2l0aW9uRW5kOmV9KX0sZC5vbkhpZGVUcmFuc2l0aW9uRW5kPWZ1bmN0aW9uKCl7dGhpcy5pc0hpZGRlbiYmKHRoaXMuY3NzKHtkaXNwbGF5Olwibm9uZVwifSksdGhpcy5lbWl0RXZlbnQoXCJoaWRlXCIpKX0sZC5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5jc3Moe3Bvc2l0aW9uOlwiXCIsbGVmdDpcIlwiLHJpZ2h0OlwiXCIsdG9wOlwiXCIsYm90dG9tOlwiXCIsdHJhbnNpdGlvbjpcIlwiLHRyYW5zZm9ybTpcIlwifSl9LG59KSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJvdXRsYXllci9vdXRsYXllclwiLFtcImV2LWVtaXR0ZXIvZXYtZW1pdHRlclwiLFwiZ2V0LXNpemUvZ2V0LXNpemVcIixcImZpenp5LXVpLXV0aWxzL3V0aWxzXCIsXCIuL2l0ZW1cIl0sZnVuY3Rpb24oaSxuLG8scil7cmV0dXJuIGUodCxpLG4sbyxyKX0pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWUodCxyZXF1aXJlKFwiZXYtZW1pdHRlclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikscmVxdWlyZShcImZpenp5LXVpLXV0aWxzXCIpLHJlcXVpcmUoXCIuL2l0ZW1cIikpOnQuT3V0bGF5ZXI9ZSh0LHQuRXZFbWl0dGVyLHQuZ2V0U2l6ZSx0LmZpenp5VUlVdGlscyx0Lk91dGxheWVyLkl0ZW0pfSh3aW5kb3csZnVuY3Rpb24odCxlLGksbixvKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQsZSl7dmFyIGk9bi5nZXRRdWVyeUVsZW1lbnQodCk7aWYoIWkpcmV0dXJuIHZvaWQoaCYmaC5lcnJvcihcIkJhZCBlbGVtZW50IGZvciBcIit0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZStcIjogXCIrKGl8fHQpKSk7dGhpcy5lbGVtZW50PWksdSYmKHRoaXMuJGVsZW1lbnQ9dSh0aGlzLmVsZW1lbnQpKSx0aGlzLm9wdGlvbnM9bi5leHRlbmQoe30sdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cyksdGhpcy5vcHRpb24oZSk7dmFyIG89KytsO3RoaXMuZWxlbWVudC5vdXRsYXllckdVSUQ9byxjW29dPXRoaXMsdGhpcy5fY3JlYXRlKCk7dmFyIHI9dGhpcy5fZ2V0T3B0aW9uKFwiaW5pdExheW91dFwiKTtyJiZ0aGlzLmxheW91dCgpfWZ1bmN0aW9uIHModCl7ZnVuY3Rpb24gZSgpe3QuYXBwbHkodGhpcyxhcmd1bWVudHMpfXJldHVybiBlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQucHJvdG90eXBlKSxlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1lLGV9ZnVuY3Rpb24gYSh0KXtpZihcIm51bWJlclwiPT10eXBlb2YgdClyZXR1cm4gdDt2YXIgZT10Lm1hdGNoKC8oXlxcZCpcXC4/XFxkKikoXFx3KikvKSxpPWUmJmVbMV0sbj1lJiZlWzJdO2lmKCFpLmxlbmd0aClyZXR1cm4gMDtpPXBhcnNlRmxvYXQoaSk7dmFyIG89bVtuXXx8MTtyZXR1cm4gaSpvfXZhciBoPXQuY29uc29sZSx1PXQualF1ZXJ5LGQ9ZnVuY3Rpb24oKXt9LGw9MCxjPXt9O3IubmFtZXNwYWNlPVwib3V0bGF5ZXJcIixyLkl0ZW09byxyLmRlZmF1bHRzPXtjb250YWluZXJTdHlsZTp7cG9zaXRpb246XCJyZWxhdGl2ZVwifSxpbml0TGF5b3V0OiEwLG9yaWdpbkxlZnQ6ITAsb3JpZ2luVG9wOiEwLHJlc2l6ZTohMCxyZXNpemVDb250YWluZXI6ITAsdHJhbnNpdGlvbkR1cmF0aW9uOlwiMC40c1wiLGhpZGRlblN0eWxlOntvcGFjaXR5OjAsdHJhbnNmb3JtOlwic2NhbGUoMC4wMDEpXCJ9LHZpc2libGVTdHlsZTp7b3BhY2l0eToxLHRyYW5zZm9ybTpcInNjYWxlKDEpXCJ9fTt2YXIgZj1yLnByb3RvdHlwZTtuLmV4dGVuZChmLGUucHJvdG90eXBlKSxmLm9wdGlvbj1mdW5jdGlvbih0KXtuLmV4dGVuZCh0aGlzLm9wdGlvbnMsdCl9LGYuX2dldE9wdGlvbj1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmNvbnN0cnVjdG9yLmNvbXBhdE9wdGlvbnNbdF07cmV0dXJuIGUmJnZvaWQgMCE9PXRoaXMub3B0aW9uc1tlXT90aGlzLm9wdGlvbnNbZV06dGhpcy5vcHRpb25zW3RdfSxyLmNvbXBhdE9wdGlvbnM9e2luaXRMYXlvdXQ6XCJpc0luaXRMYXlvdXRcIixob3Jpem9udGFsOlwiaXNIb3Jpem9udGFsXCIsbGF5b3V0SW5zdGFudDpcImlzTGF5b3V0SW5zdGFudFwiLG9yaWdpbkxlZnQ6XCJpc09yaWdpbkxlZnRcIixvcmlnaW5Ub3A6XCJpc09yaWdpblRvcFwiLHJlc2l6ZTpcImlzUmVzaXplQm91bmRcIixyZXNpemVDb250YWluZXI6XCJpc1Jlc2l6aW5nQ29udGFpbmVyXCJ9LGYuX2NyZWF0ZT1mdW5jdGlvbigpe3RoaXMucmVsb2FkSXRlbXMoKSx0aGlzLnN0YW1wcz1bXSx0aGlzLnN0YW1wKHRoaXMub3B0aW9ucy5zdGFtcCksbi5leHRlbmQodGhpcy5lbGVtZW50LnN0eWxlLHRoaXMub3B0aW9ucy5jb250YWluZXJTdHlsZSk7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwicmVzaXplXCIpO3QmJnRoaXMuYmluZFJlc2l6ZSgpfSxmLnJlbG9hZEl0ZW1zPWZ1bmN0aW9uKCl7dGhpcy5pdGVtcz10aGlzLl9pdGVtaXplKHRoaXMuZWxlbWVudC5jaGlsZHJlbil9LGYuX2l0ZW1pemU9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXRoaXMuX2ZpbHRlckZpbmRJdGVtRWxlbWVudHModCksaT10aGlzLmNvbnN0cnVjdG9yLkl0ZW0sbj1bXSxvPTA7bzxlLmxlbmd0aDtvKyspe3ZhciByPWVbb10scz1uZXcgaShyLHRoaXMpO24ucHVzaChzKX1yZXR1cm4gbn0sZi5fZmlsdGVyRmluZEl0ZW1FbGVtZW50cz1mdW5jdGlvbih0KXtyZXR1cm4gbi5maWx0ZXJGaW5kRWxlbWVudHModCx0aGlzLm9wdGlvbnMuaXRlbVNlbGVjdG9yKX0sZi5nZXRJdGVtRWxlbWVudHM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pdGVtcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHQuZWxlbWVudH0pfSxmLmxheW91dD1mdW5jdGlvbigpe3RoaXMuX3Jlc2V0TGF5b3V0KCksdGhpcy5fbWFuYWdlU3RhbXBzKCk7dmFyIHQ9dGhpcy5fZ2V0T3B0aW9uKFwibGF5b3V0SW5zdGFudFwiKSxlPXZvaWQgMCE9PXQ/dDohdGhpcy5faXNMYXlvdXRJbml0ZWQ7dGhpcy5sYXlvdXRJdGVtcyh0aGlzLml0ZW1zLGUpLHRoaXMuX2lzTGF5b3V0SW5pdGVkPSEwfSxmLl9pbml0PWYubGF5b3V0LGYuX3Jlc2V0TGF5b3V0PWZ1bmN0aW9uKCl7dGhpcy5nZXRTaXplKCl9LGYuZ2V0U2l6ZT1mdW5jdGlvbigpe3RoaXMuc2l6ZT1pKHRoaXMuZWxlbWVudCl9LGYuX2dldE1lYXN1cmVtZW50PWZ1bmN0aW9uKHQsZSl7dmFyIG4sbz10aGlzLm9wdGlvbnNbdF07bz8oXCJzdHJpbmdcIj09dHlwZW9mIG8/bj10aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihvKTpvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJihuPW8pLHRoaXNbdF09bj9pKG4pW2VdOm8pOnRoaXNbdF09MH0sZi5sYXlvdXRJdGVtcz1mdW5jdGlvbih0LGUpe3Q9dGhpcy5fZ2V0SXRlbXNGb3JMYXlvdXQodCksdGhpcy5fbGF5b3V0SXRlbXModCxlKSx0aGlzLl9wb3N0TGF5b3V0KCl9LGYuX2dldEl0ZW1zRm9yTGF5b3V0PWZ1bmN0aW9uKHQpe3JldHVybiB0LmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hdC5pc0lnbm9yZWR9KX0sZi5fbGF5b3V0SXRlbXM9ZnVuY3Rpb24odCxlKXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwibGF5b3V0XCIsdCksdCYmdC5sZW5ndGgpe3ZhciBpPVtdO3QuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgbj10aGlzLl9nZXRJdGVtTGF5b3V0UG9zaXRpb24odCk7bi5pdGVtPXQsbi5pc0luc3RhbnQ9ZXx8dC5pc0xheW91dEluc3RhbnQsaS5wdXNoKG4pfSx0aGlzKSx0aGlzLl9wcm9jZXNzTGF5b3V0UXVldWUoaSl9fSxmLl9nZXRJdGVtTGF5b3V0UG9zaXRpb249ZnVuY3Rpb24oKXtyZXR1cm57eDowLHk6MH19LGYuX3Byb2Nlc3NMYXlvdXRRdWV1ZT1mdW5jdGlvbih0KXt0aGlzLnVwZGF0ZVN0YWdnZXIoKSx0LmZvckVhY2goZnVuY3Rpb24odCxlKXt0aGlzLl9wb3NpdGlvbkl0ZW0odC5pdGVtLHQueCx0LnksdC5pc0luc3RhbnQsZSl9LHRoaXMpfSxmLnVwZGF0ZVN0YWdnZXI9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLm9wdGlvbnMuc3RhZ2dlcjtyZXR1cm4gbnVsbD09PXR8fHZvaWQgMD09PXQ/dm9pZCh0aGlzLnN0YWdnZXI9MCk6KHRoaXMuc3RhZ2dlcj1hKHQpLHRoaXMuc3RhZ2dlcil9LGYuX3Bvc2l0aW9uSXRlbT1mdW5jdGlvbih0LGUsaSxuLG8pe24/dC5nb1RvKGUsaSk6KHQuc3RhZ2dlcihvKnRoaXMuc3RhZ2dlciksdC5tb3ZlVG8oZSxpKSl9LGYuX3Bvc3RMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLnJlc2l6ZUNvbnRhaW5lcigpfSxmLnJlc2l6ZUNvbnRhaW5lcj1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE9wdGlvbihcInJlc2l6ZUNvbnRhaW5lclwiKTtpZih0KXt2YXIgZT10aGlzLl9nZXRDb250YWluZXJTaXplKCk7ZSYmKHRoaXMuX3NldENvbnRhaW5lck1lYXN1cmUoZS53aWR0aCwhMCksdGhpcy5fc2V0Q29udGFpbmVyTWVhc3VyZShlLmhlaWdodCwhMSkpfX0sZi5fZ2V0Q29udGFpbmVyU2l6ZT1kLGYuX3NldENvbnRhaW5lck1lYXN1cmU9ZnVuY3Rpb24odCxlKXtpZih2b2lkIDAhPT10KXt2YXIgaT10aGlzLnNpemU7aS5pc0JvcmRlckJveCYmKHQrPWU/aS5wYWRkaW5nTGVmdCtpLnBhZGRpbmdSaWdodCtpLmJvcmRlckxlZnRXaWR0aCtpLmJvcmRlclJpZ2h0V2lkdGg6aS5wYWRkaW5nQm90dG9tK2kucGFkZGluZ1RvcCtpLmJvcmRlclRvcFdpZHRoK2kuYm9yZGVyQm90dG9tV2lkdGgpLHQ9TWF0aC5tYXgodCwwKSx0aGlzLmVsZW1lbnQuc3R5bGVbZT9cIndpZHRoXCI6XCJoZWlnaHRcIl09dCtcInB4XCJ9fSxmLl9lbWl0Q29tcGxldGVPbkl0ZW1zPWZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gaSgpe28uZGlzcGF0Y2hFdmVudCh0K1wiQ29tcGxldGVcIixudWxsLFtlXSl9ZnVuY3Rpb24gbigpe3MrKyxzPT1yJiZpKCl9dmFyIG89dGhpcyxyPWUubGVuZ3RoO2lmKCFlfHwhcilyZXR1cm4gdm9pZCBpKCk7dmFyIHM9MDtlLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5vbmNlKHQsbil9KX0sZi5kaXNwYXRjaEV2ZW50PWZ1bmN0aW9uKHQsZSxpKXt2YXIgbj1lP1tlXS5jb25jYXQoaSk6aTtpZih0aGlzLmVtaXRFdmVudCh0LG4pLHUpaWYodGhpcy4kZWxlbWVudD10aGlzLiRlbGVtZW50fHx1KHRoaXMuZWxlbWVudCksZSl7dmFyIG89dS5FdmVudChlKTtvLnR5cGU9dCx0aGlzLiRlbGVtZW50LnRyaWdnZXIobyxpKX1lbHNlIHRoaXMuJGVsZW1lbnQudHJpZ2dlcih0LGkpfSxmLmlnbm9yZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldEl0ZW0odCk7ZSYmKGUuaXNJZ25vcmVkPSEwKX0sZi51bmlnbm9yZT1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldEl0ZW0odCk7ZSYmZGVsZXRlIGUuaXNJZ25vcmVkfSxmLnN0YW1wPWZ1bmN0aW9uKHQpe3Q9dGhpcy5fZmluZCh0KSx0JiYodGhpcy5zdGFtcHM9dGhpcy5zdGFtcHMuY29uY2F0KHQpLHQuZm9yRWFjaCh0aGlzLmlnbm9yZSx0aGlzKSl9LGYudW5zdGFtcD1mdW5jdGlvbih0KXt0PXRoaXMuX2ZpbmQodCksdCYmdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe24ucmVtb3ZlRnJvbSh0aGlzLnN0YW1wcyx0KSx0aGlzLnVuaWdub3JlKHQpfSx0aGlzKX0sZi5fZmluZD1mdW5jdGlvbih0KXtyZXR1cm4gdD8oXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHQpKSx0PW4ubWFrZUFycmF5KHQpKTp2b2lkIDB9LGYuX21hbmFnZVN0YW1wcz1mdW5jdGlvbigpe3RoaXMuc3RhbXBzJiZ0aGlzLnN0YW1wcy5sZW5ndGgmJih0aGlzLl9nZXRCb3VuZGluZ1JlY3QoKSx0aGlzLnN0YW1wcy5mb3JFYWNoKHRoaXMuX21hbmFnZVN0YW1wLHRoaXMpKX0sZi5fZ2V0Qm91bmRpbmdSZWN0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGU9dGhpcy5zaXplO3RoaXMuX2JvdW5kaW5nUmVjdD17bGVmdDp0LmxlZnQrZS5wYWRkaW5nTGVmdCtlLmJvcmRlckxlZnRXaWR0aCx0b3A6dC50b3ArZS5wYWRkaW5nVG9wK2UuYm9yZGVyVG9wV2lkdGgscmlnaHQ6dC5yaWdodC0oZS5wYWRkaW5nUmlnaHQrZS5ib3JkZXJSaWdodFdpZHRoKSxib3R0b206dC5ib3R0b20tKGUucGFkZGluZ0JvdHRvbStlLmJvcmRlckJvdHRvbVdpZHRoKX19LGYuX21hbmFnZVN0YW1wPWQsZi5fZ2V0RWxlbWVudE9mZnNldD1mdW5jdGlvbih0KXt2YXIgZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG49dGhpcy5fYm91bmRpbmdSZWN0LG89aSh0KSxyPXtsZWZ0OmUubGVmdC1uLmxlZnQtby5tYXJnaW5MZWZ0LHRvcDplLnRvcC1uLnRvcC1vLm1hcmdpblRvcCxyaWdodDpuLnJpZ2h0LWUucmlnaHQtby5tYXJnaW5SaWdodCxib3R0b206bi5ib3R0b20tZS5ib3R0b20tby5tYXJnaW5Cb3R0b219O3JldHVybiByfSxmLmhhbmRsZUV2ZW50PW4uaGFuZGxlRXZlbnQsZi5iaW5kUmVzaXplPWZ1bmN0aW9uKCl7dC5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdGhpcyksdGhpcy5pc1Jlc2l6ZUJvdW5kPSEwfSxmLnVuYmluZFJlc2l6ZT1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMpLHRoaXMuaXNSZXNpemVCb3VuZD0hMX0sZi5vbnJlc2l6ZT1mdW5jdGlvbigpe3RoaXMucmVzaXplKCl9LG4uZGVib3VuY2VNZXRob2QocixcIm9ucmVzaXplXCIsMTAwKSxmLnJlc2l6ZT1mdW5jdGlvbigpe3RoaXMuaXNSZXNpemVCb3VuZCYmdGhpcy5uZWVkc1Jlc2l6ZUxheW91dCgpJiZ0aGlzLmxheW91dCgpfSxmLm5lZWRzUmVzaXplTGF5b3V0PWZ1bmN0aW9uKCl7dmFyIHQ9aSh0aGlzLmVsZW1lbnQpLGU9dGhpcy5zaXplJiZ0O3JldHVybiBlJiZ0LmlubmVyV2lkdGghPT10aGlzLnNpemUuaW5uZXJXaWR0aH0sZi5hZGRJdGVtcz1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9pdGVtaXplKHQpO3JldHVybiBlLmxlbmd0aCYmKHRoaXMuaXRlbXM9dGhpcy5pdGVtcy5jb25jYXQoZSkpLGV9LGYuYXBwZW5kZWQ9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5hZGRJdGVtcyh0KTtlLmxlbmd0aCYmKHRoaXMubGF5b3V0SXRlbXMoZSwhMCksdGhpcy5yZXZlYWwoZSkpfSxmLnByZXBlbmRlZD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLl9pdGVtaXplKHQpO2lmKGUubGVuZ3RoKXt2YXIgaT10aGlzLml0ZW1zLnNsaWNlKDApO3RoaXMuaXRlbXM9ZS5jb25jYXQoaSksdGhpcy5fcmVzZXRMYXlvdXQoKSx0aGlzLl9tYW5hZ2VTdGFtcHMoKSx0aGlzLmxheW91dEl0ZW1zKGUsITApLHRoaXMucmV2ZWFsKGUpLHRoaXMubGF5b3V0SXRlbXMoaSl9fSxmLnJldmVhbD1mdW5jdGlvbih0KXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwicmV2ZWFsXCIsdCksdCYmdC5sZW5ndGgpe3ZhciBlPXRoaXMudXBkYXRlU3RhZ2dlcigpO3QuZm9yRWFjaChmdW5jdGlvbih0LGkpe3Quc3RhZ2dlcihpKmUpLHQucmV2ZWFsKCl9KX19LGYuaGlkZT1mdW5jdGlvbih0KXtpZih0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwiaGlkZVwiLHQpLHQmJnQubGVuZ3RoKXt2YXIgZT10aGlzLnVwZGF0ZVN0YWdnZXIoKTt0LmZvckVhY2goZnVuY3Rpb24odCxpKXt0LnN0YWdnZXIoaSplKSx0LmhpZGUoKX0pfX0sZi5yZXZlYWxJdGVtRWxlbWVudHM9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5nZXRJdGVtcyh0KTt0aGlzLnJldmVhbChlKX0sZi5oaWRlSXRlbUVsZW1lbnRzPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuZ2V0SXRlbXModCk7dGhpcy5oaWRlKGUpfSxmLmdldEl0ZW09ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTA7ZTx0aGlzLml0ZW1zLmxlbmd0aDtlKyspe3ZhciBpPXRoaXMuaXRlbXNbZV07aWYoaS5lbGVtZW50PT10KXJldHVybiBpfX0sZi5nZXRJdGVtcz1mdW5jdGlvbih0KXt0PW4ubWFrZUFycmF5KHQpO3ZhciBlPVtdO3JldHVybiB0LmZvckVhY2goZnVuY3Rpb24odCl7dmFyIGk9dGhpcy5nZXRJdGVtKHQpO2kmJmUucHVzaChpKX0sdGhpcyksZX0sZi5yZW1vdmU9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5nZXRJdGVtcyh0KTt0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKFwicmVtb3ZlXCIsZSksZSYmZS5sZW5ndGgmJmUuZm9yRWFjaChmdW5jdGlvbih0KXt0LnJlbW92ZSgpLG4ucmVtb3ZlRnJvbSh0aGlzLml0ZW1zLHQpfSx0aGlzKX0sZi5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5lbGVtZW50LnN0eWxlO3QuaGVpZ2h0PVwiXCIsdC5wb3NpdGlvbj1cIlwiLHQud2lkdGg9XCJcIix0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24odCl7dC5kZXN0cm95KCl9KSx0aGlzLnVuYmluZFJlc2l6ZSgpO3ZhciBlPXRoaXMuZWxlbWVudC5vdXRsYXllckdVSUQ7ZGVsZXRlIGNbZV0sZGVsZXRlIHRoaXMuZWxlbWVudC5vdXRsYXllckdVSUQsdSYmdS5yZW1vdmVEYXRhKHRoaXMuZWxlbWVudCx0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZSl9LHIuZGF0YT1mdW5jdGlvbih0KXt0PW4uZ2V0UXVlcnlFbGVtZW50KHQpO3ZhciBlPXQmJnQub3V0bGF5ZXJHVUlEO3JldHVybiBlJiZjW2VdfSxyLmNyZWF0ZT1mdW5jdGlvbih0LGUpe3ZhciBpPXMocik7cmV0dXJuIGkuZGVmYXVsdHM9bi5leHRlbmQoe30sci5kZWZhdWx0cyksbi5leHRlbmQoaS5kZWZhdWx0cyxlKSxpLmNvbXBhdE9wdGlvbnM9bi5leHRlbmQoe30sci5jb21wYXRPcHRpb25zKSxpLm5hbWVzcGFjZT10LGkuZGF0YT1yLmRhdGEsaS5JdGVtPXMobyksbi5odG1sSW5pdChpLHQpLHUmJnUuYnJpZGdldCYmdS5icmlkZ2V0KHQsaSksaX07dmFyIG09e21zOjEsczoxZTN9O3JldHVybiByLkl0ZW09byxyfSksZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcIm91dGxheWVyL291dGxheWVyXCIsXCJnZXQtc2l6ZS9nZXQtc2l6ZVwiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCJvdXRsYXllclwiKSxyZXF1aXJlKFwiZ2V0LXNpemVcIikpOnQuTWFzb25yeT1lKHQuT3V0bGF5ZXIsdC5nZXRTaXplKX0od2luZG93LGZ1bmN0aW9uKHQsZSl7dmFyIGk9dC5jcmVhdGUoXCJtYXNvbnJ5XCIpO2kuY29tcGF0T3B0aW9ucy5maXRXaWR0aD1cImlzRml0V2lkdGhcIjt2YXIgbj1pLnByb3RvdHlwZTtyZXR1cm4gbi5fcmVzZXRMYXlvdXQ9ZnVuY3Rpb24oKXt0aGlzLmdldFNpemUoKSx0aGlzLl9nZXRNZWFzdXJlbWVudChcImNvbHVtbldpZHRoXCIsXCJvdXRlcldpZHRoXCIpLHRoaXMuX2dldE1lYXN1cmVtZW50KFwiZ3V0dGVyXCIsXCJvdXRlcldpZHRoXCIpLHRoaXMubWVhc3VyZUNvbHVtbnMoKSx0aGlzLmNvbFlzPVtdO2Zvcih2YXIgdD0wO3Q8dGhpcy5jb2xzO3QrKyl0aGlzLmNvbFlzLnB1c2goMCk7dGhpcy5tYXhZPTAsdGhpcy5ob3Jpem9udGFsQ29sSW5kZXg9MH0sbi5tZWFzdXJlQ29sdW1ucz1mdW5jdGlvbigpe2lmKHRoaXMuZ2V0Q29udGFpbmVyV2lkdGgoKSwhdGhpcy5jb2x1bW5XaWR0aCl7dmFyIHQ9dGhpcy5pdGVtc1swXSxpPXQmJnQuZWxlbWVudDt0aGlzLmNvbHVtbldpZHRoPWkmJmUoaSkub3V0ZXJXaWR0aHx8dGhpcy5jb250YWluZXJXaWR0aH12YXIgbj10aGlzLmNvbHVtbldpZHRoKz10aGlzLmd1dHRlcixvPXRoaXMuY29udGFpbmVyV2lkdGgrdGhpcy5ndXR0ZXIscj1vL24scz1uLW8lbixhPXMmJjE+cz9cInJvdW5kXCI6XCJmbG9vclwiO3I9TWF0aFthXShyKSx0aGlzLmNvbHM9TWF0aC5tYXgociwxKX0sbi5nZXRDb250YWluZXJXaWR0aD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2dldE9wdGlvbihcImZpdFdpZHRoXCIpLGk9dD90aGlzLmVsZW1lbnQucGFyZW50Tm9kZTp0aGlzLmVsZW1lbnQsbj1lKGkpO3RoaXMuY29udGFpbmVyV2lkdGg9biYmbi5pbm5lcldpZHRofSxuLl9nZXRJdGVtTGF5b3V0UG9zaXRpb249ZnVuY3Rpb24odCl7dC5nZXRTaXplKCk7dmFyIGU9dC5zaXplLm91dGVyV2lkdGgldGhpcy5jb2x1bW5XaWR0aCxpPWUmJjE+ZT9cInJvdW5kXCI6XCJjZWlsXCIsbj1NYXRoW2ldKHQuc2l6ZS5vdXRlcldpZHRoL3RoaXMuY29sdW1uV2lkdGgpO249TWF0aC5taW4obix0aGlzLmNvbHMpO2Zvcih2YXIgbz10aGlzLm9wdGlvbnMuaG9yaXpvbnRhbE9yZGVyP1wiX2dldEhvcml6b250YWxDb2xQb3NpdGlvblwiOlwiX2dldFRvcENvbFBvc2l0aW9uXCIscj10aGlzW29dKG4sdCkscz17eDp0aGlzLmNvbHVtbldpZHRoKnIuY29sLHk6ci55fSxhPXIueSt0LnNpemUub3V0ZXJIZWlnaHQsaD1uK3IuY29sLHU9ci5jb2w7aD51O3UrKyl0aGlzLmNvbFlzW3VdPWE7cmV0dXJuIHN9LG4uX2dldFRvcENvbFBvc2l0aW9uPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2dldFRvcENvbEdyb3VwKHQpLGk9TWF0aC5taW4uYXBwbHkoTWF0aCxlKTtyZXR1cm57Y29sOmUuaW5kZXhPZihpKSx5Oml9fSxuLl9nZXRUb3BDb2xHcm91cD1mdW5jdGlvbih0KXtpZigyPnQpcmV0dXJuIHRoaXMuY29sWXM7Zm9yKHZhciBlPVtdLGk9dGhpcy5jb2xzKzEtdCxuPTA7aT5uO24rKyllW25dPXRoaXMuX2dldENvbEdyb3VwWShuLHQpO3JldHVybiBlfSxuLl9nZXRDb2xHcm91cFk9ZnVuY3Rpb24odCxlKXtpZigyPmUpcmV0dXJuIHRoaXMuY29sWXNbdF07dmFyIGk9dGhpcy5jb2xZcy5zbGljZSh0LHQrZSk7cmV0dXJuIE1hdGgubWF4LmFwcGx5KE1hdGgsaSl9LG4uX2dldEhvcml6b250YWxDb2xQb3NpdGlvbj1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMuaG9yaXpvbnRhbENvbEluZGV4JXRoaXMuY29scyxuPXQ+MSYmaSt0PnRoaXMuY29scztpPW4/MDppO3ZhciBvPWUuc2l6ZS5vdXRlcldpZHRoJiZlLnNpemUub3V0ZXJIZWlnaHQ7cmV0dXJuIHRoaXMuaG9yaXpvbnRhbENvbEluZGV4PW8/aSt0OnRoaXMuaG9yaXpvbnRhbENvbEluZGV4LHtjb2w6aSx5OnRoaXMuX2dldENvbEdyb3VwWShpLHQpfX0sbi5fbWFuYWdlU3RhbXA9ZnVuY3Rpb24odCl7dmFyIGk9ZSh0KSxuPXRoaXMuX2dldEVsZW1lbnRPZmZzZXQodCksbz10aGlzLl9nZXRPcHRpb24oXCJvcmlnaW5MZWZ0XCIpLHI9bz9uLmxlZnQ6bi5yaWdodCxzPXIraS5vdXRlcldpZHRoLGE9TWF0aC5mbG9vcihyL3RoaXMuY29sdW1uV2lkdGgpO2E9TWF0aC5tYXgoMCxhKTt2YXIgaD1NYXRoLmZsb29yKHMvdGhpcy5jb2x1bW5XaWR0aCk7aC09cyV0aGlzLmNvbHVtbldpZHRoPzA6MSxoPU1hdGgubWluKHRoaXMuY29scy0xLGgpO2Zvcih2YXIgdT10aGlzLl9nZXRPcHRpb24oXCJvcmlnaW5Ub3BcIiksZD0odT9uLnRvcDpuLmJvdHRvbSkraS5vdXRlckhlaWdodCxsPWE7aD49bDtsKyspdGhpcy5jb2xZc1tsXT1NYXRoLm1heChkLHRoaXMuY29sWXNbbF0pfSxuLl9nZXRDb250YWluZXJTaXplPWZ1bmN0aW9uKCl7dGhpcy5tYXhZPU1hdGgubWF4LmFwcGx5KE1hdGgsdGhpcy5jb2xZcyk7dmFyIHQ9e2hlaWdodDp0aGlzLm1heFl9O3JldHVybiB0aGlzLl9nZXRPcHRpb24oXCJmaXRXaWR0aFwiKSYmKHQud2lkdGg9dGhpcy5fZ2V0Q29udGFpbmVyRml0V2lkdGgoKSksdH0sbi5fZ2V0Q29udGFpbmVyRml0V2lkdGg9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9MCxlPXRoaXMuY29sczstLWUmJjA9PT10aGlzLmNvbFlzW2VdOyl0Kys7cmV0dXJuKHRoaXMuY29scy10KSp0aGlzLmNvbHVtbldpZHRoLXRoaXMuZ3V0dGVyfSxuLm5lZWRzUmVzaXplTGF5b3V0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5jb250YWluZXJXaWR0aDtyZXR1cm4gdGhpcy5nZXRDb250YWluZXJXaWR0aCgpLHQhPXRoaXMuY29udGFpbmVyV2lkdGh9LGl9KTsiXX0=
