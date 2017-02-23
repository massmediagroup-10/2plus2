'use strict';

function isMobile() {
    return ($(window).width() < 1024) ? true : false;
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

    $('form').each(function() {
        $(this).validate();
    });

    $(window).resize(function() {
        footerplaceholder();
        tabsResponsive();
        skrollrHandler();
    });
});
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwianF1ZXJ5LnZhbGlkYXRlLm1pbi5qcyIsImZvdW5kYXRpb24uY29yZS5qcyIsImZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5LmpzIiwiZm91bmRhdGlvbi51dGlsLmtleWJvYXJkLmpzIiwiZm91bmRhdGlvbi51dGlsLmJveC5qcyIsImZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsImZvdW5kYXRpb24ucmV2ZWFsLmpzIiwiZm91bmRhdGlvbi5kcm9wZG93bi5qcyIsInNrcm9sbHIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNSQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG4gICAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8IDEwMjQpID8gdHJ1ZSA6IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb290ZXJwbGFjZWhvbGRlcigpIHtcclxuICAgICQoJy5mb290ZXJfcGxhY2Vob2xkZXInKVxyXG4gICAgICAgIC5oZWlnaHQoJCgnLmZvb3RlcicpXHJcbiAgICAgICAgICAgIC5vdXRlckhlaWdodCgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm91bmRhdGlvbigpIHtcclxuICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmF2aWdhdGlvbigpIHtcclxuICAgIHZhciB0b2dnbGUgPSAnLm1lbnUtdG9nZ2xlJztcclxuICAgIHZhciBuYXZpZ2F0aW9uID0gJy5uYXZpZ2F0aW9uJztcclxuICAgIHZhciBjbG9zZSA9ICcubmF2aWdhdGlvbi1jbG9zZSc7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdG9nZ2xlLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQobmF2aWdhdGlvbikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJ2JvZHknKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPjwvZGl2PicpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBjbG9zZSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKGNsb3NlKS5hZGRDbGFzcygnYW5pbWF0ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoY2xvc2UpLnJlbW92ZUNsYXNzKCdhbmltYXRlJyk7XHJcbiAgICAgICAgICAgICQobmF2aWdhdGlvbikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcub3ZlcmxheScpLnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oe1xyXG4gICAgICAgICdtb3VzZXdoZWVsJzogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09ICdvdmVybGF5Jykge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFkZXJTZWFyY2goKSB7XHJcbiAgICB2YXIgJGlucHV0ID0gJCgnLmhlYWRlci1zZWFyY2ggaW5wdXQnKTtcclxuICAgICRpbnB1dC5mb2N1cyhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gICAgJGlucHV0LmJsdXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNsaWRlcnMoKSB7XHJcbiAgICAkKCcuZGV0YWlsLWNvbG9yJykuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgZmFkZTogZmFsc2UsXHJcbiAgICAgICAgcHJldkFycm93OiAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNsaWNrLXByZXZcIj48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT48L2E+JyxcclxuICAgICAgICBuZXh0QXJyb3c6ICc8YSBocmVmPVwiI1wiIGNsYXNzPVwic2xpY2stbmV4dFwiPjxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT48L2E+JyxcclxuICAgICAgICByZXNwb25zaXZlOiBbe1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5sYXRlc3Qtc2xpZGVyJykuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgcHJldkFycm93OiAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNsaWNrLXByZXZcIj48aSBjbGFzcz1cImZhIGZhLWFuZ2xlLWxlZnRcIj48L2k+PC9hPicsXHJcbiAgICAgICAgbmV4dEFycm93OiAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNsaWNrLW5leHRcIj48aSBjbGFzcz1cImZhIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvYT4nLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDE0MDAsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogMTI1MixcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiA3ODAsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmRldGFpbC1zbGlkZXItZm9yJykuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6ICcuZGV0YWlsLXNsaWRlci1uYXYnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmRldGFpbC1zbGlkZXItbmF2Jykuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhc05hdkZvcjogJy5kZXRhaWwtc2xpZGVyLWZvcicsXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIHZlcnRpY2FsOiB0cnVlLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogNzgwLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiA0ODAsXHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGFicyhibG9jaykge1xyXG4gICAgaWYgKHR5cGVvZihibG9jaykgPT09ICd1bmRlZmluZWQnKSBibG9jayA9ICQoJy50YWJzJyk7XHJcbiAgICBibG9jay5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciAkd3JhcCA9ICQodGhpcyk7XHJcbiAgICAgICAgaWYgKCEkd3JhcC5pcygnLnRhYnMtZG9uZScpKSB7XHJcbiAgICAgICAgICAgICR3cmFwLmFkZENsYXNzKCd0YWJzLWRvbmUnKTtcclxuICAgICAgICAgICAgJCgkd3JhcCkub24oJ2NsaWNrJywgJ1tkYXRhLXRhYklkXScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhYmlkID0gJCh0aGlzKS5kYXRhKCd0YWJpZCcpO1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtdGFiSWRdJywgJHdyYXApLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRhYklkPVwiJyArIHRhYmlkICsgJ1wiXScsICR3cmFwKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10YWJdJywgJHdyYXApLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10YWI9XCInICsgdGFiaWQgKyAnXCJdJywgJHdyYXApLmFkZENsYXNzKCdhY3RpdmUnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoJCgnLmFjdGl2ZVtkYXRhLXRhYklkXScsICR3cmFwKS5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgJCgnLmFjdGl2ZVtkYXRhLXRhYklkXScsICR3cmFwKS5jbGljaygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS10YWJJZF06ZXEoMCknLCAkd3JhcCkuY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGFic1Jlc3BvbnNpdmUoKSB7XHJcbiAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICQoJy50YWJzJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhbmVsID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgcGFuZWwuZmluZCgnLnRhYnMtcGFuZWwnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhYiA9ICQodGhpcykuZGF0YSgndGFiJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFiVGl0bGUgPSAkKCcudGFicy10aXRsZSBhW2RhdGEtdGFiaWQ9XCInICsgdGFiICsgJ1wiXScsIHBhbmVsKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGFiVGl0bGUuc2libGluZ3MoJy50YWJzLXBhbmVsJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAkKHRoaXMpLmNsb25lKCkuYWRkQ2xhc3MoJ3Jlc3BvbnNpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWJUaXRsZS5hZnRlcihjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy50YWJzJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhbmVsID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJCgnLnRhYnMtdGl0bGUgLnRhYnMtcGFuZWwnLCBwYW5lbCkucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRldGFpbENvbG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5kZXRhaWwtY29sb3ItaXRlbSBhJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcuZGV0YWlsLWNvbG9yLWl0ZW0gYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgLy9zZXQgY29sb3IgdG8gc213aHIgZm9yIHByb2Nlc3NpbmdcclxuICAgICAgICB2YXIgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGV0YWlsU2l6ZSgpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZGV0YWlsLXNpemUtaXRlbScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLmRldGFpbC1zaXplLWl0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIC8vc2V0IHNpemUgdG8gc213aHIgZm9yIHByb2Nlc3NpbmdcclxuICAgICAgICB2YXIgc2l6ZSA9ICQodGhpcykuZGF0YSgnc2l6ZScpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrb3V0SXRlbSgpIHtcclxuICAgICQoJy5jaGVja291dC1pdGVtJykubm90KCcuYWN0aXZlJykuZmluZCgnLmNoZWNrb3V0LWJvZHknKS5zbGlkZVVwKDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2hlY2tvdXQtdGl0bGUgYScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjaGVja291dCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5jaGVja291dC1pdGVtJyk7XHJcblxyXG4gICAgICAgICQoJy5jaGVja291dC1ib2R5Jykuc3RvcCgpLnNsaWRlVXAoKTtcclxuICAgICAgICAkKCcuY2hlY2tvdXQtaXRlbScpLm5vdChpdGVtKS5zdG9wKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgaXRlbS5zdG9wKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBjaGVja291dC5zaWJsaW5ncygnLmNoZWNrb3V0LWJvZHknKS5zdG9wKCkuc2xpZGVVcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGl0ZW0uc3RvcCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgY2hlY2tvdXQuc2libGluZ3MoJy5jaGVja291dC1ib2R5Jykuc3RvcCgpLnNsaWRlRG93bigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBza3JvbGxySGFuZGxlcigpIHtcclxuICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgdmFyIHMgPSBza3JvbGxyLmluaXQoKTtcclxuICAgICAgICBzLmRlc3Ryb3koKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHMgPSBza3JvbGxyLmluaXQoe1xyXG4gICAgICAgICAgICBmb3JjZUhlaWdodDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJldmlld1Njcm9sbCgpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucHJldmlldy1zY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSAkKCcucHJldmlldy1tYWluJykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2JvZHksIGh0bWwnKVxyXG4gICAgICAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldFxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgZm91bmRhdGlvbigpO1xyXG4gICAgZm9vdGVycGxhY2Vob2xkZXIoKTtcclxuICAgIHNrcm9sbHJIYW5kbGVyKCk7XHJcbiAgICBwcmV2aWV3U2Nyb2xsKCk7XHJcbiAgICBuYXZpZ2F0aW9uKCk7XHJcbiAgICBoZWFkZXJTZWFyY2goKTtcclxuICAgIGluaXRTbGlkZXJzKCk7XHJcbiAgICB0YWJzKCk7XHJcbiAgICB0YWJzUmVzcG9uc2l2ZSgpO1xyXG4gICAgZGV0YWlsQ29sb3IoKTtcclxuICAgIGRldGFpbFNpemUoKTtcclxuICAgIGNoZWNrb3V0SXRlbSgpO1xyXG5cclxuICAgICQoJ2Zvcm0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudmFsaWRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZm9vdGVycGxhY2Vob2xkZXIoKTtcclxuICAgICAgICB0YWJzUmVzcG9uc2l2ZSgpO1xyXG4gICAgICAgIHNrcm9sbHJIYW5kbGVyKCk7XHJcbiAgICB9KTtcclxufSk7IiwiLyohIGpRdWVyeSBWYWxpZGF0aW9uIFBsdWdpbiAtIHYxLjE2LjAgLSAxMi8yLzIwMTZcbiAqIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9cbiAqIENvcHlyaWdodCAoYykgMjAxNiBKw7ZybiBaYWVmZmVyZXI7IExpY2Vuc2VkIE1JVCAqL1xuIWZ1bmN0aW9uKGEpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wianF1ZXJ5XCJdLGEpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWEocmVxdWlyZShcImpxdWVyeVwiKSk6YShqUXVlcnkpfShmdW5jdGlvbihhKXthLmV4dGVuZChhLmZuLHt2YWxpZGF0ZTpmdW5jdGlvbihiKXtpZighdGhpcy5sZW5ndGgpcmV0dXJuIHZvaWQoYiYmYi5kZWJ1ZyYmd2luZG93LmNvbnNvbGUmJmNvbnNvbGUud2FybihcIk5vdGhpbmcgc2VsZWN0ZWQsIGNhbid0IHZhbGlkYXRlLCByZXR1cm5pbmcgbm90aGluZy5cIikpO3ZhciBjPWEuZGF0YSh0aGlzWzBdLFwidmFsaWRhdG9yXCIpO3JldHVybiBjP2M6KHRoaXMuYXR0cihcIm5vdmFsaWRhdGVcIixcIm5vdmFsaWRhdGVcIiksYz1uZXcgYS52YWxpZGF0b3IoYix0aGlzWzBdKSxhLmRhdGEodGhpc1swXSxcInZhbGlkYXRvclwiLGMpLGMuc2V0dGluZ3Mub25zdWJtaXQmJih0aGlzLm9uKFwiY2xpY2sudmFsaWRhdGVcIixcIjpzdWJtaXRcIixmdW5jdGlvbihiKXtjLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXImJihjLnN1Ym1pdEJ1dHRvbj1iLnRhcmdldCksYSh0aGlzKS5oYXNDbGFzcyhcImNhbmNlbFwiKSYmKGMuY2FuY2VsU3VibWl0PSEwKSx2b2lkIDAhPT1hKHRoaXMpLmF0dHIoXCJmb3Jtbm92YWxpZGF0ZVwiKSYmKGMuY2FuY2VsU3VibWl0PSEwKX0pLHRoaXMub24oXCJzdWJtaXQudmFsaWRhdGVcIixmdW5jdGlvbihiKXtmdW5jdGlvbiBkKCl7dmFyIGQsZTtyZXR1cm4hYy5zZXR0aW5ncy5zdWJtaXRIYW5kbGVyfHwoYy5zdWJtaXRCdXR0b24mJihkPWEoXCI8aW5wdXQgdHlwZT0naGlkZGVuJy8+XCIpLmF0dHIoXCJuYW1lXCIsYy5zdWJtaXRCdXR0b24ubmFtZSkudmFsKGEoYy5zdWJtaXRCdXR0b24pLnZhbCgpKS5hcHBlbmRUbyhjLmN1cnJlbnRGb3JtKSksZT1jLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXIuY2FsbChjLGMuY3VycmVudEZvcm0sYiksYy5zdWJtaXRCdXR0b24mJmQucmVtb3ZlKCksdm9pZCAwIT09ZSYmZSl9cmV0dXJuIGMuc2V0dGluZ3MuZGVidWcmJmIucHJldmVudERlZmF1bHQoKSxjLmNhbmNlbFN1Ym1pdD8oYy5jYW5jZWxTdWJtaXQ9ITEsZCgpKTpjLmZvcm0oKT9jLnBlbmRpbmdSZXF1ZXN0PyhjLmZvcm1TdWJtaXR0ZWQ9ITAsITEpOmQoKTooYy5mb2N1c0ludmFsaWQoKSwhMSl9KSksYyl9LHZhbGlkOmZ1bmN0aW9uKCl7dmFyIGIsYyxkO3JldHVybiBhKHRoaXNbMF0pLmlzKFwiZm9ybVwiKT9iPXRoaXMudmFsaWRhdGUoKS5mb3JtKCk6KGQ9W10sYj0hMCxjPWEodGhpc1swXS5mb3JtKS52YWxpZGF0ZSgpLHRoaXMuZWFjaChmdW5jdGlvbigpe2I9Yy5lbGVtZW50KHRoaXMpJiZiLGJ8fChkPWQuY29uY2F0KGMuZXJyb3JMaXN0KSl9KSxjLmVycm9yTGlzdD1kKSxifSxydWxlczpmdW5jdGlvbihiLGMpe3ZhciBkLGUsZixnLGgsaSxqPXRoaXNbMF07aWYobnVsbCE9aiYmbnVsbCE9ai5mb3JtKXtpZihiKXN3aXRjaChkPWEuZGF0YShqLmZvcm0sXCJ2YWxpZGF0b3JcIikuc2V0dGluZ3MsZT1kLnJ1bGVzLGY9YS52YWxpZGF0b3Iuc3RhdGljUnVsZXMoaiksYil7Y2FzZVwiYWRkXCI6YS5leHRlbmQoZixhLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlKGMpKSxkZWxldGUgZi5tZXNzYWdlcyxlW2oubmFtZV09ZixjLm1lc3NhZ2VzJiYoZC5tZXNzYWdlc1tqLm5hbWVdPWEuZXh0ZW5kKGQubWVzc2FnZXNbai5uYW1lXSxjLm1lc3NhZ2VzKSk7YnJlYWs7Y2FzZVwicmVtb3ZlXCI6cmV0dXJuIGM/KGk9e30sYS5lYWNoKGMuc3BsaXQoL1xccy8pLGZ1bmN0aW9uKGIsYyl7aVtjXT1mW2NdLGRlbGV0ZSBmW2NdLFwicmVxdWlyZWRcIj09PWMmJmEoaikucmVtb3ZlQXR0cihcImFyaWEtcmVxdWlyZWRcIil9KSxpKTooZGVsZXRlIGVbai5uYW1lXSxmKX1yZXR1cm4gZz1hLnZhbGlkYXRvci5ub3JtYWxpemVSdWxlcyhhLmV4dGVuZCh7fSxhLnZhbGlkYXRvci5jbGFzc1J1bGVzKGopLGEudmFsaWRhdG9yLmF0dHJpYnV0ZVJ1bGVzKGopLGEudmFsaWRhdG9yLmRhdGFSdWxlcyhqKSxhLnZhbGlkYXRvci5zdGF0aWNSdWxlcyhqKSksaiksZy5yZXF1aXJlZCYmKGg9Zy5yZXF1aXJlZCxkZWxldGUgZy5yZXF1aXJlZCxnPWEuZXh0ZW5kKHtyZXF1aXJlZDpofSxnKSxhKGopLmF0dHIoXCJhcmlhLXJlcXVpcmVkXCIsXCJ0cnVlXCIpKSxnLnJlbW90ZSYmKGg9Zy5yZW1vdGUsZGVsZXRlIGcucmVtb3RlLGc9YS5leHRlbmQoZyx7cmVtb3RlOmh9KSksZ319fSksYS5leHRlbmQoYS5leHByLnBzZXVkb3N8fGEuZXhwcltcIjpcIl0se2JsYW5rOmZ1bmN0aW9uKGIpe3JldHVybiFhLnRyaW0oXCJcIithKGIpLnZhbCgpKX0sZmlsbGVkOmZ1bmN0aW9uKGIpe3ZhciBjPWEoYikudmFsKCk7cmV0dXJuIG51bGwhPT1jJiYhIWEudHJpbShcIlwiK2MpfSx1bmNoZWNrZWQ6ZnVuY3Rpb24oYil7cmV0dXJuIWEoYikucHJvcChcImNoZWNrZWRcIil9fSksYS52YWxpZGF0b3I9ZnVuY3Rpb24oYixjKXt0aGlzLnNldHRpbmdzPWEuZXh0ZW5kKCEwLHt9LGEudmFsaWRhdG9yLmRlZmF1bHRzLGIpLHRoaXMuY3VycmVudEZvcm09Yyx0aGlzLmluaXQoKX0sYS52YWxpZGF0b3IuZm9ybWF0PWZ1bmN0aW9uKGIsYyl7cmV0dXJuIDE9PT1hcmd1bWVudHMubGVuZ3RoP2Z1bmN0aW9uKCl7dmFyIGM9YS5tYWtlQXJyYXkoYXJndW1lbnRzKTtyZXR1cm4gYy51bnNoaWZ0KGIpLGEudmFsaWRhdG9yLmZvcm1hdC5hcHBseSh0aGlzLGMpfTp2b2lkIDA9PT1jP2I6KGFyZ3VtZW50cy5sZW5ndGg+MiYmYy5jb25zdHJ1Y3RvciE9PUFycmF5JiYoYz1hLm1ha2VBcnJheShhcmd1bWVudHMpLnNsaWNlKDEpKSxjLmNvbnN0cnVjdG9yIT09QXJyYXkmJihjPVtjXSksYS5lYWNoKGMsZnVuY3Rpb24oYSxjKXtiPWIucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXHtcIithK1wiXFxcXH1cIixcImdcIiksZnVuY3Rpb24oKXtyZXR1cm4gY30pfSksYil9LGEuZXh0ZW5kKGEudmFsaWRhdG9yLHtkZWZhdWx0czp7bWVzc2FnZXM6e30sZ3JvdXBzOnt9LHJ1bGVzOnt9LGVycm9yQ2xhc3M6XCJlcnJvclwiLHBlbmRpbmdDbGFzczpcInBlbmRpbmdcIix2YWxpZENsYXNzOlwidmFsaWRcIixlcnJvckVsZW1lbnQ6XCJsYWJlbFwiLGZvY3VzQ2xlYW51cDohMSxmb2N1c0ludmFsaWQ6ITAsZXJyb3JDb250YWluZXI6YShbXSksZXJyb3JMYWJlbENvbnRhaW5lcjphKFtdKSxvbnN1Ym1pdDohMCxpZ25vcmU6XCI6aGlkZGVuXCIsaWdub3JlVGl0bGU6ITEsb25mb2N1c2luOmZ1bmN0aW9uKGEpe3RoaXMubGFzdEFjdGl2ZT1hLHRoaXMuc2V0dGluZ3MuZm9jdXNDbGVhbnVwJiYodGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodCYmdGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodC5jYWxsKHRoaXMsYSx0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzKSx0aGlzLmhpZGVUaGVzZSh0aGlzLmVycm9yc0ZvcihhKSkpfSxvbmZvY3Vzb3V0OmZ1bmN0aW9uKGEpe3RoaXMuY2hlY2thYmxlKGEpfHwhKGEubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCkmJnRoaXMub3B0aW9uYWwoYSl8fHRoaXMuZWxlbWVudChhKX0sb25rZXl1cDpmdW5jdGlvbihiLGMpe3ZhciBkPVsxNiwxNywxOCwyMCwzNSwzNiwzNywzOCwzOSw0MCw0NSwxNDQsMjI1XTs5PT09Yy53aGljaCYmXCJcIj09PXRoaXMuZWxlbWVudFZhbHVlKGIpfHxhLmluQXJyYXkoYy5rZXlDb2RlLGQpIT09LTF8fChiLm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWR8fGIubmFtZSBpbiB0aGlzLmludmFsaWQpJiZ0aGlzLmVsZW1lbnQoYil9LG9uY2xpY2s6ZnVuY3Rpb24oYSl7YS5uYW1lIGluIHRoaXMuc3VibWl0dGVkP3RoaXMuZWxlbWVudChhKTphLnBhcmVudE5vZGUubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCYmdGhpcy5lbGVtZW50KGEucGFyZW50Tm9kZSl9LGhpZ2hsaWdodDpmdW5jdGlvbihiLGMsZCl7XCJyYWRpb1wiPT09Yi50eXBlP3RoaXMuZmluZEJ5TmFtZShiLm5hbWUpLmFkZENsYXNzKGMpLnJlbW92ZUNsYXNzKGQpOmEoYikuYWRkQ2xhc3MoYykucmVtb3ZlQ2xhc3MoZCl9LHVuaGlnaGxpZ2h0OmZ1bmN0aW9uKGIsYyxkKXtcInJhZGlvXCI9PT1iLnR5cGU/dGhpcy5maW5kQnlOYW1lKGIubmFtZSkucmVtb3ZlQ2xhc3MoYykuYWRkQ2xhc3MoZCk6YShiKS5yZW1vdmVDbGFzcyhjKS5hZGRDbGFzcyhkKX19LHNldERlZmF1bHRzOmZ1bmN0aW9uKGIpe2EuZXh0ZW5kKGEudmFsaWRhdG9yLmRlZmF1bHRzLGIpfSxtZXNzYWdlczp7cmVxdWlyZWQ6XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiLHJlbW90ZTpcIlBsZWFzZSBmaXggdGhpcyBmaWVsZC5cIixlbWFpbDpcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIsdXJsOlwiUGxlYXNlIGVudGVyIGEgdmFsaWQgVVJMLlwiLGRhdGU6XCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlLlwiLGRhdGVJU086XCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlIChJU08pLlwiLG51bWJlcjpcIlBsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlci5cIixkaWdpdHM6XCJQbGVhc2UgZW50ZXIgb25seSBkaWdpdHMuXCIsZXF1YWxUbzpcIlBsZWFzZSBlbnRlciB0aGUgc2FtZSB2YWx1ZSBhZ2Fpbi5cIixtYXhsZW5ndGg6YS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIG5vIG1vcmUgdGhhbiB7MH0gY2hhcmFjdGVycy5cIiksbWlubGVuZ3RoOmEudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhdCBsZWFzdCB7MH0gY2hhcmFjdGVycy5cIikscmFuZ2VsZW5ndGg6YS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgYmV0d2VlbiB7MH0gYW5kIHsxfSBjaGFyYWN0ZXJzIGxvbmcuXCIpLHJhbmdlOmEudmFsaWRhdG9yLmZvcm1hdChcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0uXCIpLG1heDphLnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gezB9LlwiKSxtaW46YS52YWxpZGF0b3IuZm9ybWF0KFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIiksc3RlcDphLnZhbGlkYXRvci5mb3JtYXQoXCJQbGVhc2UgZW50ZXIgYSBtdWx0aXBsZSBvZiB7MH0uXCIpfSxhdXRvQ3JlYXRlUmFuZ2VzOiExLHByb3RvdHlwZTp7aW5pdDpmdW5jdGlvbigpe2Z1bmN0aW9uIGIoYil7IXRoaXMuZm9ybSYmdGhpcy5oYXNBdHRyaWJ1dGUoXCJjb250ZW50ZWRpdGFibGVcIikmJih0aGlzLmZvcm09YSh0aGlzKS5jbG9zZXN0KFwiZm9ybVwiKVswXSk7dmFyIGM9YS5kYXRhKHRoaXMuZm9ybSxcInZhbGlkYXRvclwiKSxkPVwib25cIitiLnR5cGUucmVwbGFjZSgvXnZhbGlkYXRlLyxcIlwiKSxlPWMuc2V0dGluZ3M7ZVtkXSYmIWEodGhpcykuaXMoZS5pZ25vcmUpJiZlW2RdLmNhbGwoYyx0aGlzLGIpfXRoaXMubGFiZWxDb250YWluZXI9YSh0aGlzLnNldHRpbmdzLmVycm9yTGFiZWxDb250YWluZXIpLHRoaXMuZXJyb3JDb250ZXh0PXRoaXMubGFiZWxDb250YWluZXIubGVuZ3RoJiZ0aGlzLmxhYmVsQ29udGFpbmVyfHxhKHRoaXMuY3VycmVudEZvcm0pLHRoaXMuY29udGFpbmVycz1hKHRoaXMuc2V0dGluZ3MuZXJyb3JDb250YWluZXIpLmFkZCh0aGlzLnNldHRpbmdzLmVycm9yTGFiZWxDb250YWluZXIpLHRoaXMuc3VibWl0dGVkPXt9LHRoaXMudmFsdWVDYWNoZT17fSx0aGlzLnBlbmRpbmdSZXF1ZXN0PTAsdGhpcy5wZW5kaW5nPXt9LHRoaXMuaW52YWxpZD17fSx0aGlzLnJlc2V0KCk7dmFyIGMsZD10aGlzLmdyb3Vwcz17fTthLmVhY2godGhpcy5zZXR0aW5ncy5ncm91cHMsZnVuY3Rpb24oYixjKXtcInN0cmluZ1wiPT10eXBlb2YgYyYmKGM9Yy5zcGxpdCgvXFxzLykpLGEuZWFjaChjLGZ1bmN0aW9uKGEsYyl7ZFtjXT1ifSl9KSxjPXRoaXMuc2V0dGluZ3MucnVsZXMsYS5lYWNoKGMsZnVuY3Rpb24oYixkKXtjW2JdPWEudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoZCl9KSxhKHRoaXMuY3VycmVudEZvcm0pLm9uKFwiZm9jdXNpbi52YWxpZGF0ZSBmb2N1c291dC52YWxpZGF0ZSBrZXl1cC52YWxpZGF0ZVwiLFwiOnRleHQsIFt0eXBlPSdwYXNzd29yZCddLCBbdHlwZT0nZmlsZSddLCBzZWxlY3QsIHRleHRhcmVhLCBbdHlwZT0nbnVtYmVyJ10sIFt0eXBlPSdzZWFyY2gnXSwgW3R5cGU9J3RlbCddLCBbdHlwZT0ndXJsJ10sIFt0eXBlPSdlbWFpbCddLCBbdHlwZT0nZGF0ZXRpbWUnXSwgW3R5cGU9J2RhdGUnXSwgW3R5cGU9J21vbnRoJ10sIFt0eXBlPSd3ZWVrJ10sIFt0eXBlPSd0aW1lJ10sIFt0eXBlPSdkYXRldGltZS1sb2NhbCddLCBbdHlwZT0ncmFuZ2UnXSwgW3R5cGU9J2NvbG9yJ10sIFt0eXBlPSdyYWRpbyddLCBbdHlwZT0nY2hlY2tib3gnXSwgW2NvbnRlbnRlZGl0YWJsZV0sIFt0eXBlPSdidXR0b24nXVwiLGIpLm9uKFwiY2xpY2sudmFsaWRhdGVcIixcInNlbGVjdCwgb3B0aW9uLCBbdHlwZT0ncmFkaW8nXSwgW3R5cGU9J2NoZWNrYm94J11cIixiKSx0aGlzLnNldHRpbmdzLmludmFsaWRIYW5kbGVyJiZhKHRoaXMuY3VycmVudEZvcm0pLm9uKFwiaW52YWxpZC1mb3JtLnZhbGlkYXRlXCIsdGhpcy5zZXR0aW5ncy5pbnZhbGlkSGFuZGxlciksYSh0aGlzLmN1cnJlbnRGb3JtKS5maW5kKFwiW3JlcXVpcmVkXSwgW2RhdGEtcnVsZS1yZXF1aXJlZF0sIC5yZXF1aXJlZFwiKS5hdHRyKFwiYXJpYS1yZXF1aXJlZFwiLFwidHJ1ZVwiKX0sZm9ybTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNoZWNrRm9ybSgpLGEuZXh0ZW5kKHRoaXMuc3VibWl0dGVkLHRoaXMuZXJyb3JNYXApLHRoaXMuaW52YWxpZD1hLmV4dGVuZCh7fSx0aGlzLmVycm9yTWFwKSx0aGlzLnZhbGlkKCl8fGEodGhpcy5jdXJyZW50Rm9ybSkudHJpZ2dlckhhbmRsZXIoXCJpbnZhbGlkLWZvcm1cIixbdGhpc10pLHRoaXMuc2hvd0Vycm9ycygpLHRoaXMudmFsaWQoKX0sY2hlY2tGb3JtOmZ1bmN0aW9uKCl7dGhpcy5wcmVwYXJlRm9ybSgpO2Zvcih2YXIgYT0wLGI9dGhpcy5jdXJyZW50RWxlbWVudHM9dGhpcy5lbGVtZW50cygpO2JbYV07YSsrKXRoaXMuY2hlY2soYlthXSk7cmV0dXJuIHRoaXMudmFsaWQoKX0sZWxlbWVudDpmdW5jdGlvbihiKXt2YXIgYyxkLGU9dGhpcy5jbGVhbihiKSxmPXRoaXMudmFsaWRhdGlvblRhcmdldEZvcihlKSxnPXRoaXMsaD0hMDtyZXR1cm4gdm9pZCAwPT09Zj9kZWxldGUgdGhpcy5pbnZhbGlkW2UubmFtZV06KHRoaXMucHJlcGFyZUVsZW1lbnQoZiksdGhpcy5jdXJyZW50RWxlbWVudHM9YShmKSxkPXRoaXMuZ3JvdXBzW2YubmFtZV0sZCYmYS5lYWNoKHRoaXMuZ3JvdXBzLGZ1bmN0aW9uKGEsYil7Yj09PWQmJmEhPT1mLm5hbWUmJihlPWcudmFsaWRhdGlvblRhcmdldEZvcihnLmNsZWFuKGcuZmluZEJ5TmFtZShhKSkpLGUmJmUubmFtZSBpbiBnLmludmFsaWQmJihnLmN1cnJlbnRFbGVtZW50cy5wdXNoKGUpLGg9Zy5jaGVjayhlKSYmaCkpfSksYz10aGlzLmNoZWNrKGYpIT09ITEsaD1oJiZjLGM/dGhpcy5pbnZhbGlkW2YubmFtZV09ITE6dGhpcy5pbnZhbGlkW2YubmFtZV09ITAsdGhpcy5udW1iZXJPZkludmFsaWRzKCl8fCh0aGlzLnRvSGlkZT10aGlzLnRvSGlkZS5hZGQodGhpcy5jb250YWluZXJzKSksdGhpcy5zaG93RXJyb3JzKCksYShiKS5hdHRyKFwiYXJpYS1pbnZhbGlkXCIsIWMpKSxofSxzaG93RXJyb3JzOmZ1bmN0aW9uKGIpe2lmKGIpe3ZhciBjPXRoaXM7YS5leHRlbmQodGhpcy5lcnJvck1hcCxiKSx0aGlzLmVycm9yTGlzdD1hLm1hcCh0aGlzLmVycm9yTWFwLGZ1bmN0aW9uKGEsYil7cmV0dXJue21lc3NhZ2U6YSxlbGVtZW50OmMuZmluZEJ5TmFtZShiKVswXX19KSx0aGlzLnN1Y2Nlc3NMaXN0PWEuZ3JlcCh0aGlzLnN1Y2Nlc3NMaXN0LGZ1bmN0aW9uKGEpe3JldHVybiEoYS5uYW1lIGluIGIpfSl9dGhpcy5zZXR0aW5ncy5zaG93RXJyb3JzP3RoaXMuc2V0dGluZ3Muc2hvd0Vycm9ycy5jYWxsKHRoaXMsdGhpcy5lcnJvck1hcCx0aGlzLmVycm9yTGlzdCk6dGhpcy5kZWZhdWx0U2hvd0Vycm9ycygpfSxyZXNldEZvcm06ZnVuY3Rpb24oKXthLmZuLnJlc2V0Rm9ybSYmYSh0aGlzLmN1cnJlbnRGb3JtKS5yZXNldEZvcm0oKSx0aGlzLmludmFsaWQ9e30sdGhpcy5zdWJtaXR0ZWQ9e30sdGhpcy5wcmVwYXJlRm9ybSgpLHRoaXMuaGlkZUVycm9ycygpO3ZhciBiPXRoaXMuZWxlbWVudHMoKS5yZW1vdmVEYXRhKFwicHJldmlvdXNWYWx1ZVwiKS5yZW1vdmVBdHRyKFwiYXJpYS1pbnZhbGlkXCIpO3RoaXMucmVzZXRFbGVtZW50cyhiKX0scmVzZXRFbGVtZW50czpmdW5jdGlvbihhKXt2YXIgYjtpZih0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0KWZvcihiPTA7YVtiXTtiKyspdGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodC5jYWxsKHRoaXMsYVtiXSx0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsXCJcIiksdGhpcy5maW5kQnlOYW1lKGFbYl0ubmFtZSkucmVtb3ZlQ2xhc3ModGhpcy5zZXR0aW5ncy52YWxpZENsYXNzKTtlbHNlIGEucmVtb3ZlQ2xhc3ModGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzKS5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MpfSxudW1iZXJPZkludmFsaWRzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMub2JqZWN0TGVuZ3RoKHRoaXMuaW52YWxpZCl9LG9iamVjdExlbmd0aDpmdW5jdGlvbihhKXt2YXIgYixjPTA7Zm9yKGIgaW4gYSlhW2JdJiZjKys7cmV0dXJuIGN9LGhpZGVFcnJvcnM6ZnVuY3Rpb24oKXt0aGlzLmhpZGVUaGVzZSh0aGlzLnRvSGlkZSl9LGhpZGVUaGVzZTpmdW5jdGlvbihhKXthLm5vdCh0aGlzLmNvbnRhaW5lcnMpLnRleHQoXCJcIiksdGhpcy5hZGRXcmFwcGVyKGEpLmhpZGUoKX0sdmFsaWQ6ZnVuY3Rpb24oKXtyZXR1cm4gMD09PXRoaXMuc2l6ZSgpfSxzaXplOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZXJyb3JMaXN0Lmxlbmd0aH0sZm9jdXNJbnZhbGlkOmZ1bmN0aW9uKCl7aWYodGhpcy5zZXR0aW5ncy5mb2N1c0ludmFsaWQpdHJ5e2EodGhpcy5maW5kTGFzdEFjdGl2ZSgpfHx0aGlzLmVycm9yTGlzdC5sZW5ndGgmJnRoaXMuZXJyb3JMaXN0WzBdLmVsZW1lbnR8fFtdKS5maWx0ZXIoXCI6dmlzaWJsZVwiKS5mb2N1cygpLnRyaWdnZXIoXCJmb2N1c2luXCIpfWNhdGNoKGIpe319LGZpbmRMYXN0QWN0aXZlOmZ1bmN0aW9uKCl7dmFyIGI9dGhpcy5sYXN0QWN0aXZlO3JldHVybiBiJiYxPT09YS5ncmVwKHRoaXMuZXJyb3JMaXN0LGZ1bmN0aW9uKGEpe3JldHVybiBhLmVsZW1lbnQubmFtZT09PWIubmFtZX0pLmxlbmd0aCYmYn0sZWxlbWVudHM6ZnVuY3Rpb24oKXt2YXIgYj10aGlzLGM9e307cmV0dXJuIGEodGhpcy5jdXJyZW50Rm9ybSkuZmluZChcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbY29udGVudGVkaXRhYmxlXVwiKS5ub3QoXCI6c3VibWl0LCA6cmVzZXQsIDppbWFnZSwgOmRpc2FibGVkXCIpLm5vdCh0aGlzLnNldHRpbmdzLmlnbm9yZSkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIGQ9dGhpcy5uYW1lfHxhKHRoaXMpLmF0dHIoXCJuYW1lXCIpO3JldHVybiFkJiZiLnNldHRpbmdzLmRlYnVnJiZ3aW5kb3cuY29uc29sZSYmY29uc29sZS5lcnJvcihcIiVvIGhhcyBubyBuYW1lIGFzc2lnbmVkXCIsdGhpcyksdGhpcy5oYXNBdHRyaWJ1dGUoXCJjb250ZW50ZWRpdGFibGVcIikmJih0aGlzLmZvcm09YSh0aGlzKS5jbG9zZXN0KFwiZm9ybVwiKVswXSksIShkIGluIGN8fCFiLm9iamVjdExlbmd0aChhKHRoaXMpLnJ1bGVzKCkpKSYmKGNbZF09ITAsITApfSl9LGNsZWFuOmZ1bmN0aW9uKGIpe3JldHVybiBhKGIpWzBdfSxlcnJvcnM6ZnVuY3Rpb24oKXt2YXIgYj10aGlzLnNldHRpbmdzLmVycm9yQ2xhc3Muc3BsaXQoXCIgXCIpLmpvaW4oXCIuXCIpO3JldHVybiBhKHRoaXMuc2V0dGluZ3MuZXJyb3JFbGVtZW50K1wiLlwiK2IsdGhpcy5lcnJvckNvbnRleHQpfSxyZXNldEludGVybmFsczpmdW5jdGlvbigpe3RoaXMuc3VjY2Vzc0xpc3Q9W10sdGhpcy5lcnJvckxpc3Q9W10sdGhpcy5lcnJvck1hcD17fSx0aGlzLnRvU2hvdz1hKFtdKSx0aGlzLnRvSGlkZT1hKFtdKX0scmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLnJlc2V0SW50ZXJuYWxzKCksdGhpcy5jdXJyZW50RWxlbWVudHM9YShbXSl9LHByZXBhcmVGb3JtOmZ1bmN0aW9uKCl7dGhpcy5yZXNldCgpLHRoaXMudG9IaWRlPXRoaXMuZXJyb3JzKCkuYWRkKHRoaXMuY29udGFpbmVycyl9LHByZXBhcmVFbGVtZW50OmZ1bmN0aW9uKGEpe3RoaXMucmVzZXQoKSx0aGlzLnRvSGlkZT10aGlzLmVycm9yc0ZvcihhKX0sZWxlbWVudFZhbHVlOmZ1bmN0aW9uKGIpe3ZhciBjLGQsZT1hKGIpLGY9Yi50eXBlO3JldHVyblwicmFkaW9cIj09PWZ8fFwiY2hlY2tib3hcIj09PWY/dGhpcy5maW5kQnlOYW1lKGIubmFtZSkuZmlsdGVyKFwiOmNoZWNrZWRcIikudmFsKCk6XCJudW1iZXJcIj09PWYmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBiLnZhbGlkaXR5P2IudmFsaWRpdHkuYmFkSW5wdXQ/XCJOYU5cIjplLnZhbCgpOihjPWIuaGFzQXR0cmlidXRlKFwiY29udGVudGVkaXRhYmxlXCIpP2UudGV4dCgpOmUudmFsKCksXCJmaWxlXCI9PT1mP1wiQzpcXFxcZmFrZXBhdGhcXFxcXCI9PT1jLnN1YnN0cigwLDEyKT9jLnN1YnN0cigxMik6KGQ9Yy5sYXN0SW5kZXhPZihcIi9cIiksZD49MD9jLnN1YnN0cihkKzEpOihkPWMubGFzdEluZGV4T2YoXCJcXFxcXCIpLGQ+PTA/Yy5zdWJzdHIoZCsxKTpjKSk6XCJzdHJpbmdcIj09dHlwZW9mIGM/Yy5yZXBsYWNlKC9cXHIvZyxcIlwiKTpjKX0sY2hlY2s6ZnVuY3Rpb24oYil7Yj10aGlzLnZhbGlkYXRpb25UYXJnZXRGb3IodGhpcy5jbGVhbihiKSk7dmFyIGMsZCxlLGY9YShiKS5ydWxlcygpLGc9YS5tYXAoZixmdW5jdGlvbihhLGIpe3JldHVybiBifSkubGVuZ3RoLGg9ITEsaT10aGlzLmVsZW1lbnRWYWx1ZShiKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBmLm5vcm1hbGl6ZXIpe2lmKGk9Zi5ub3JtYWxpemVyLmNhbGwoYixpKSxcInN0cmluZ1wiIT10eXBlb2YgaSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhlIG5vcm1hbGl6ZXIgc2hvdWxkIHJldHVybiBhIHN0cmluZyB2YWx1ZS5cIik7ZGVsZXRlIGYubm9ybWFsaXplcn1mb3IoZCBpbiBmKXtlPXttZXRob2Q6ZCxwYXJhbWV0ZXJzOmZbZF19O3RyeXtpZihjPWEudmFsaWRhdG9yLm1ldGhvZHNbZF0uY2FsbCh0aGlzLGksYixlLnBhcmFtZXRlcnMpLFwiZGVwZW5kZW5jeS1taXNtYXRjaFwiPT09YyYmMT09PWcpe2g9ITA7Y29udGludWV9aWYoaD0hMSxcInBlbmRpbmdcIj09PWMpcmV0dXJuIHZvaWQodGhpcy50b0hpZGU9dGhpcy50b0hpZGUubm90KHRoaXMuZXJyb3JzRm9yKGIpKSk7aWYoIWMpcmV0dXJuIHRoaXMuZm9ybWF0QW5kQWRkKGIsZSksITF9Y2F0Y2goail7dGhyb3cgdGhpcy5zZXR0aW5ncy5kZWJ1ZyYmd2luZG93LmNvbnNvbGUmJmNvbnNvbGUubG9nKFwiRXhjZXB0aW9uIG9jY3VycmVkIHdoZW4gY2hlY2tpbmcgZWxlbWVudCBcIitiLmlkK1wiLCBjaGVjayB0aGUgJ1wiK2UubWV0aG9kK1wiJyBtZXRob2QuXCIsaiksaiBpbnN0YW5jZW9mIFR5cGVFcnJvciYmKGoubWVzc2FnZSs9XCIuICBFeGNlcHRpb24gb2NjdXJyZWQgd2hlbiBjaGVja2luZyBlbGVtZW50IFwiK2IuaWQrXCIsIGNoZWNrIHRoZSAnXCIrZS5tZXRob2QrXCInIG1ldGhvZC5cIiksan19aWYoIWgpcmV0dXJuIHRoaXMub2JqZWN0TGVuZ3RoKGYpJiZ0aGlzLnN1Y2Nlc3NMaXN0LnB1c2goYiksITB9LGN1c3RvbURhdGFNZXNzYWdlOmZ1bmN0aW9uKGIsYyl7cmV0dXJuIGEoYikuZGF0YShcIm1zZ1wiK2MuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrYy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSl8fGEoYikuZGF0YShcIm1zZ1wiKX0sY3VzdG9tTWVzc2FnZTpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMuc2V0dGluZ3MubWVzc2FnZXNbYV07cmV0dXJuIGMmJihjLmNvbnN0cnVjdG9yPT09U3RyaW5nP2M6Y1tiXSl9LGZpbmREZWZpbmVkOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPTA7YTxhcmd1bWVudHMubGVuZ3RoO2ErKylpZih2b2lkIDAhPT1hcmd1bWVudHNbYV0pcmV0dXJuIGFyZ3VtZW50c1thXX0sZGVmYXVsdE1lc3NhZ2U6ZnVuY3Rpb24oYixjKXtcInN0cmluZ1wiPT10eXBlb2YgYyYmKGM9e21ldGhvZDpjfSk7dmFyIGQ9dGhpcy5maW5kRGVmaW5lZCh0aGlzLmN1c3RvbU1lc3NhZ2UoYi5uYW1lLGMubWV0aG9kKSx0aGlzLmN1c3RvbURhdGFNZXNzYWdlKGIsYy5tZXRob2QpLCF0aGlzLnNldHRpbmdzLmlnbm9yZVRpdGxlJiZiLnRpdGxlfHx2b2lkIDAsYS52YWxpZGF0b3IubWVzc2FnZXNbYy5tZXRob2RdLFwiPHN0cm9uZz5XYXJuaW5nOiBObyBtZXNzYWdlIGRlZmluZWQgZm9yIFwiK2IubmFtZStcIjwvc3Ryb25nPlwiKSxlPS9cXCQ/XFx7KFxcZCspXFx9L2c7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZD9kPWQuY2FsbCh0aGlzLGMucGFyYW1ldGVycyxiKTplLnRlc3QoZCkmJihkPWEudmFsaWRhdG9yLmZvcm1hdChkLnJlcGxhY2UoZSxcInskMX1cIiksYy5wYXJhbWV0ZXJzKSksZH0sZm9ybWF0QW5kQWRkOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5kZWZhdWx0TWVzc2FnZShhLGIpO3RoaXMuZXJyb3JMaXN0LnB1c2goe21lc3NhZ2U6YyxlbGVtZW50OmEsbWV0aG9kOmIubWV0aG9kfSksdGhpcy5lcnJvck1hcFthLm5hbWVdPWMsdGhpcy5zdWJtaXR0ZWRbYS5uYW1lXT1jfSxhZGRXcmFwcGVyOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnNldHRpbmdzLndyYXBwZXImJihhPWEuYWRkKGEucGFyZW50KHRoaXMuc2V0dGluZ3Mud3JhcHBlcikpKSxhfSxkZWZhdWx0U2hvd0Vycm9yczpmdW5jdGlvbigpe3ZhciBhLGIsYztmb3IoYT0wO3RoaXMuZXJyb3JMaXN0W2FdO2ErKyljPXRoaXMuZXJyb3JMaXN0W2FdLHRoaXMuc2V0dGluZ3MuaGlnaGxpZ2h0JiZ0aGlzLnNldHRpbmdzLmhpZ2hsaWdodC5jYWxsKHRoaXMsYy5lbGVtZW50LHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyx0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MpLHRoaXMuc2hvd0xhYmVsKGMuZWxlbWVudCxjLm1lc3NhZ2UpO2lmKHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCYmKHRoaXMudG9TaG93PXRoaXMudG9TaG93LmFkZCh0aGlzLmNvbnRhaW5lcnMpKSx0aGlzLnNldHRpbmdzLnN1Y2Nlc3MpZm9yKGE9MDt0aGlzLnN1Y2Nlc3NMaXN0W2FdO2ErKyl0aGlzLnNob3dMYWJlbCh0aGlzLnN1Y2Nlc3NMaXN0W2FdKTtpZih0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0KWZvcihhPTAsYj10aGlzLnZhbGlkRWxlbWVudHMoKTtiW2FdO2ErKyl0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0LmNhbGwodGhpcyxiW2FdLHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcyx0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MpO3RoaXMudG9IaWRlPXRoaXMudG9IaWRlLm5vdCh0aGlzLnRvU2hvdyksdGhpcy5oaWRlRXJyb3JzKCksdGhpcy5hZGRXcmFwcGVyKHRoaXMudG9TaG93KS5zaG93KCl9LHZhbGlkRWxlbWVudHM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jdXJyZW50RWxlbWVudHMubm90KHRoaXMuaW52YWxpZEVsZW1lbnRzKCkpfSxpbnZhbGlkRWxlbWVudHM6ZnVuY3Rpb24oKXtyZXR1cm4gYSh0aGlzLmVycm9yTGlzdCkubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWxlbWVudH0pfSxzaG93TGFiZWw6ZnVuY3Rpb24oYixjKXt2YXIgZCxlLGYsZyxoPXRoaXMuZXJyb3JzRm9yKGIpLGk9dGhpcy5pZE9yTmFtZShiKSxqPWEoYikuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIik7aC5sZW5ndGg/KGgucmVtb3ZlQ2xhc3ModGhpcy5zZXR0aW5ncy52YWxpZENsYXNzKS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpLGguaHRtbChjKSk6KGg9YShcIjxcIit0aGlzLnNldHRpbmdzLmVycm9yRWxlbWVudCtcIj5cIikuYXR0cihcImlkXCIsaStcIi1lcnJvclwiKS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MpLmh0bWwoY3x8XCJcIiksZD1oLHRoaXMuc2V0dGluZ3Mud3JhcHBlciYmKGQ9aC5oaWRlKCkuc2hvdygpLndyYXAoXCI8XCIrdGhpcy5zZXR0aW5ncy53cmFwcGVyK1wiLz5cIikucGFyZW50KCkpLHRoaXMubGFiZWxDb250YWluZXIubGVuZ3RoP3RoaXMubGFiZWxDb250YWluZXIuYXBwZW5kKGQpOnRoaXMuc2V0dGluZ3MuZXJyb3JQbGFjZW1lbnQ/dGhpcy5zZXR0aW5ncy5lcnJvclBsYWNlbWVudC5jYWxsKHRoaXMsZCxhKGIpKTpkLmluc2VydEFmdGVyKGIpLGguaXMoXCJsYWJlbFwiKT9oLmF0dHIoXCJmb3JcIixpKTowPT09aC5wYXJlbnRzKFwibGFiZWxbZm9yPSdcIit0aGlzLmVzY2FwZUNzc01ldGEoaSkrXCInXVwiKS5sZW5ndGgmJihmPWguYXR0cihcImlkXCIpLGo/ai5tYXRjaChuZXcgUmVnRXhwKFwiXFxcXGJcIit0aGlzLmVzY2FwZUNzc01ldGEoZikrXCJcXFxcYlwiKSl8fChqKz1cIiBcIitmKTpqPWYsYShiKS5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLGopLGU9dGhpcy5ncm91cHNbYi5uYW1lXSxlJiYoZz10aGlzLGEuZWFjaChnLmdyb3VwcyxmdW5jdGlvbihiLGMpe2M9PT1lJiZhKFwiW25hbWU9J1wiK2cuZXNjYXBlQ3NzTWV0YShiKStcIiddXCIsZy5jdXJyZW50Rm9ybSkuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIixoLmF0dHIoXCJpZFwiKSl9KSkpKSwhYyYmdGhpcy5zZXR0aW5ncy5zdWNjZXNzJiYoaC50ZXh0KFwiXCIpLFwic3RyaW5nXCI9PXR5cGVvZiB0aGlzLnNldHRpbmdzLnN1Y2Nlc3M/aC5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLnN1Y2Nlc3MpOnRoaXMuc2V0dGluZ3Muc3VjY2VzcyhoLGIpKSx0aGlzLnRvU2hvdz10aGlzLnRvU2hvdy5hZGQoaCl9LGVycm9yc0ZvcjpmdW5jdGlvbihiKXt2YXIgYz10aGlzLmVzY2FwZUNzc01ldGEodGhpcy5pZE9yTmFtZShiKSksZD1hKGIpLmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIpLGU9XCJsYWJlbFtmb3I9J1wiK2MrXCInXSwgbGFiZWxbZm9yPSdcIitjK1wiJ10gKlwiO3JldHVybiBkJiYoZT1lK1wiLCAjXCIrdGhpcy5lc2NhcGVDc3NNZXRhKGQpLnJlcGxhY2UoL1xccysvZyxcIiwgI1wiKSksdGhpcy5lcnJvcnMoKS5maWx0ZXIoZSl9LGVzY2FwZUNzc01ldGE6ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZSgvKFtcXFxcIVwiIyQlJicoKSorLC4vOjs8PT4/QFxcW1xcXV5ge3x9fl0pL2csXCJcXFxcJDFcIil9LGlkT3JOYW1lOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmdyb3Vwc1thLm5hbWVdfHwodGhpcy5jaGVja2FibGUoYSk/YS5uYW1lOmEuaWR8fGEubmFtZSl9LHZhbGlkYXRpb25UYXJnZXRGb3I6ZnVuY3Rpb24oYil7cmV0dXJuIHRoaXMuY2hlY2thYmxlKGIpJiYoYj10aGlzLmZpbmRCeU5hbWUoYi5uYW1lKSksYShiKS5ub3QodGhpcy5zZXR0aW5ncy5pZ25vcmUpWzBdfSxjaGVja2FibGU6ZnVuY3Rpb24oYSl7cmV0dXJuL3JhZGlvfGNoZWNrYm94L2kudGVzdChhLnR5cGUpfSxmaW5kQnlOYW1lOmZ1bmN0aW9uKGIpe3JldHVybiBhKHRoaXMuY3VycmVudEZvcm0pLmZpbmQoXCJbbmFtZT0nXCIrdGhpcy5lc2NhcGVDc3NNZXRhKGIpK1wiJ11cIil9LGdldExlbmd0aDpmdW5jdGlvbihiLGMpe3N3aXRjaChjLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpe2Nhc2VcInNlbGVjdFwiOnJldHVybiBhKFwib3B0aW9uOnNlbGVjdGVkXCIsYykubGVuZ3RoO2Nhc2VcImlucHV0XCI6aWYodGhpcy5jaGVja2FibGUoYykpcmV0dXJuIHRoaXMuZmluZEJ5TmFtZShjLm5hbWUpLmZpbHRlcihcIjpjaGVja2VkXCIpLmxlbmd0aH1yZXR1cm4gYi5sZW5ndGh9LGRlcGVuZDpmdW5jdGlvbihhLGIpe3JldHVybiF0aGlzLmRlcGVuZFR5cGVzW3R5cGVvZiBhXXx8dGhpcy5kZXBlbmRUeXBlc1t0eXBlb2YgYV0oYSxiKX0sZGVwZW5kVHlwZXM6e1wiYm9vbGVhblwiOmZ1bmN0aW9uKGEpe3JldHVybiBhfSxzdHJpbmc6ZnVuY3Rpb24oYixjKXtyZXR1cm4hIWEoYixjLmZvcm0pLmxlbmd0aH0sXCJmdW5jdGlvblwiOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGEoYil9fSxvcHRpb25hbDpmdW5jdGlvbihiKXt2YXIgYz10aGlzLmVsZW1lbnRWYWx1ZShiKTtyZXR1cm4hYS52YWxpZGF0b3IubWV0aG9kcy5yZXF1aXJlZC5jYWxsKHRoaXMsYyxiKSYmXCJkZXBlbmRlbmN5LW1pc21hdGNoXCJ9LHN0YXJ0UmVxdWVzdDpmdW5jdGlvbihiKXt0aGlzLnBlbmRpbmdbYi5uYW1lXXx8KHRoaXMucGVuZGluZ1JlcXVlc3QrKyxhKGIpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MucGVuZGluZ0NsYXNzKSx0aGlzLnBlbmRpbmdbYi5uYW1lXT0hMCl9LHN0b3BSZXF1ZXN0OmZ1bmN0aW9uKGIsYyl7dGhpcy5wZW5kaW5nUmVxdWVzdC0tLHRoaXMucGVuZGluZ1JlcXVlc3Q8MCYmKHRoaXMucGVuZGluZ1JlcXVlc3Q9MCksZGVsZXRlIHRoaXMucGVuZGluZ1tiLm5hbWVdLGEoYikucmVtb3ZlQ2xhc3ModGhpcy5zZXR0aW5ncy5wZW5kaW5nQ2xhc3MpLGMmJjA9PT10aGlzLnBlbmRpbmdSZXF1ZXN0JiZ0aGlzLmZvcm1TdWJtaXR0ZWQmJnRoaXMuZm9ybSgpPyhhKHRoaXMuY3VycmVudEZvcm0pLnN1Ym1pdCgpLHRoaXMuZm9ybVN1Ym1pdHRlZD0hMSk6IWMmJjA9PT10aGlzLnBlbmRpbmdSZXF1ZXN0JiZ0aGlzLmZvcm1TdWJtaXR0ZWQmJihhKHRoaXMuY3VycmVudEZvcm0pLnRyaWdnZXJIYW5kbGVyKFwiaW52YWxpZC1mb3JtXCIsW3RoaXNdKSx0aGlzLmZvcm1TdWJtaXR0ZWQ9ITEpfSxwcmV2aW91c1ZhbHVlOmZ1bmN0aW9uKGIsYyl7cmV0dXJuIGM9XCJzdHJpbmdcIj09dHlwZW9mIGMmJmN8fFwicmVtb3RlXCIsYS5kYXRhKGIsXCJwcmV2aW91c1ZhbHVlXCIpfHxhLmRhdGEoYixcInByZXZpb3VzVmFsdWVcIix7b2xkOm51bGwsdmFsaWQ6ITAsbWVzc2FnZTp0aGlzLmRlZmF1bHRNZXNzYWdlKGIse21ldGhvZDpjfSl9KX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMucmVzZXRGb3JtKCksYSh0aGlzLmN1cnJlbnRGb3JtKS5vZmYoXCIudmFsaWRhdGVcIikucmVtb3ZlRGF0YShcInZhbGlkYXRvclwiKS5maW5kKFwiLnZhbGlkYXRlLWVxdWFsVG8tYmx1clwiKS5vZmYoXCIudmFsaWRhdGUtZXF1YWxUb1wiKS5yZW1vdmVDbGFzcyhcInZhbGlkYXRlLWVxdWFsVG8tYmx1clwiKX19LGNsYXNzUnVsZVNldHRpbmdzOntyZXF1aXJlZDp7cmVxdWlyZWQ6ITB9LGVtYWlsOntlbWFpbDohMH0sdXJsOnt1cmw6ITB9LGRhdGU6e2RhdGU6ITB9LGRhdGVJU086e2RhdGVJU086ITB9LG51bWJlcjp7bnVtYmVyOiEwfSxkaWdpdHM6e2RpZ2l0czohMH0sY3JlZGl0Y2FyZDp7Y3JlZGl0Y2FyZDohMH19LGFkZENsYXNzUnVsZXM6ZnVuY3Rpb24oYixjKXtiLmNvbnN0cnVjdG9yPT09U3RyaW5nP3RoaXMuY2xhc3NSdWxlU2V0dGluZ3NbYl09YzphLmV4dGVuZCh0aGlzLmNsYXNzUnVsZVNldHRpbmdzLGIpfSxjbGFzc1J1bGVzOmZ1bmN0aW9uKGIpe3ZhciBjPXt9LGQ9YShiKS5hdHRyKFwiY2xhc3NcIik7cmV0dXJuIGQmJmEuZWFjaChkLnNwbGl0KFwiIFwiKSxmdW5jdGlvbigpe3RoaXMgaW4gYS52YWxpZGF0b3IuY2xhc3NSdWxlU2V0dGluZ3MmJmEuZXh0ZW5kKGMsYS52YWxpZGF0b3IuY2xhc3NSdWxlU2V0dGluZ3NbdGhpc10pfSksY30sbm9ybWFsaXplQXR0cmlidXRlUnVsZTpmdW5jdGlvbihhLGIsYyxkKXsvbWlufG1heHxzdGVwLy50ZXN0KGMpJiYobnVsbD09PWJ8fC9udW1iZXJ8cmFuZ2V8dGV4dC8udGVzdChiKSkmJihkPU51bWJlcihkKSxpc05hTihkKSYmKGQ9dm9pZCAwKSksZHx8MD09PWQ/YVtjXT1kOmI9PT1jJiZcInJhbmdlXCIhPT1iJiYoYVtjXT0hMCl9LGF0dHJpYnV0ZVJ1bGVzOmZ1bmN0aW9uKGIpe3ZhciBjLGQsZT17fSxmPWEoYiksZz1iLmdldEF0dHJpYnV0ZShcInR5cGVcIik7Zm9yKGMgaW4gYS52YWxpZGF0b3IubWV0aG9kcylcInJlcXVpcmVkXCI9PT1jPyhkPWIuZ2V0QXR0cmlidXRlKGMpLFwiXCI9PT1kJiYoZD0hMCksZD0hIWQpOmQ9Zi5hdHRyKGMpLHRoaXMubm9ybWFsaXplQXR0cmlidXRlUnVsZShlLGcsYyxkKTtyZXR1cm4gZS5tYXhsZW5ndGgmJi8tMXwyMTQ3NDgzNjQ3fDUyNDI4OC8udGVzdChlLm1heGxlbmd0aCkmJmRlbGV0ZSBlLm1heGxlbmd0aCxlfSxkYXRhUnVsZXM6ZnVuY3Rpb24oYil7dmFyIGMsZCxlPXt9LGY9YShiKSxnPWIuZ2V0QXR0cmlidXRlKFwidHlwZVwiKTtmb3IoYyBpbiBhLnZhbGlkYXRvci5tZXRob2RzKWQ9Zi5kYXRhKFwicnVsZVwiK2MuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrYy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSksdGhpcy5ub3JtYWxpemVBdHRyaWJ1dGVSdWxlKGUsZyxjLGQpO3JldHVybiBlfSxzdGF0aWNSdWxlczpmdW5jdGlvbihiKXt2YXIgYz17fSxkPWEuZGF0YShiLmZvcm0sXCJ2YWxpZGF0b3JcIik7cmV0dXJuIGQuc2V0dGluZ3MucnVsZXMmJihjPWEudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoZC5zZXR0aW5ncy5ydWxlc1tiLm5hbWVdKXx8e30pLGN9LG5vcm1hbGl6ZVJ1bGVzOmZ1bmN0aW9uKGIsYyl7cmV0dXJuIGEuZWFjaChiLGZ1bmN0aW9uKGQsZSl7aWYoZT09PSExKXJldHVybiB2b2lkIGRlbGV0ZSBiW2RdO2lmKGUucGFyYW18fGUuZGVwZW5kcyl7dmFyIGY9ITA7c3dpdGNoKHR5cGVvZiBlLmRlcGVuZHMpe2Nhc2VcInN0cmluZ1wiOmY9ISFhKGUuZGVwZW5kcyxjLmZvcm0pLmxlbmd0aDticmVhaztjYXNlXCJmdW5jdGlvblwiOmY9ZS5kZXBlbmRzLmNhbGwoYyxjKX1mP2JbZF09dm9pZCAwPT09ZS5wYXJhbXx8ZS5wYXJhbTooYS5kYXRhKGMuZm9ybSxcInZhbGlkYXRvclwiKS5yZXNldEVsZW1lbnRzKGEoYykpLGRlbGV0ZSBiW2RdKX19KSxhLmVhY2goYixmdW5jdGlvbihkLGUpe2JbZF09YS5pc0Z1bmN0aW9uKGUpJiZcIm5vcm1hbGl6ZXJcIiE9PWQ/ZShjKTplfSksYS5lYWNoKFtcIm1pbmxlbmd0aFwiLFwibWF4bGVuZ3RoXCJdLGZ1bmN0aW9uKCl7Ylt0aGlzXSYmKGJbdGhpc109TnVtYmVyKGJbdGhpc10pKX0pLGEuZWFjaChbXCJyYW5nZWxlbmd0aFwiLFwicmFuZ2VcIl0sZnVuY3Rpb24oKXt2YXIgYztiW3RoaXNdJiYoYS5pc0FycmF5KGJbdGhpc10pP2JbdGhpc109W051bWJlcihiW3RoaXNdWzBdKSxOdW1iZXIoYlt0aGlzXVsxXSldOlwic3RyaW5nXCI9PXR5cGVvZiBiW3RoaXNdJiYoYz1iW3RoaXNdLnJlcGxhY2UoL1tcXFtcXF1dL2csXCJcIikuc3BsaXQoL1tcXHMsXSsvKSxiW3RoaXNdPVtOdW1iZXIoY1swXSksTnVtYmVyKGNbMV0pXSkpfSksYS52YWxpZGF0b3IuYXV0b0NyZWF0ZVJhbmdlcyYmKG51bGwhPWIubWluJiZudWxsIT1iLm1heCYmKGIucmFuZ2U9W2IubWluLGIubWF4XSxkZWxldGUgYi5taW4sZGVsZXRlIGIubWF4KSxudWxsIT1iLm1pbmxlbmd0aCYmbnVsbCE9Yi5tYXhsZW5ndGgmJihiLnJhbmdlbGVuZ3RoPVtiLm1pbmxlbmd0aCxiLm1heGxlbmd0aF0sZGVsZXRlIGIubWlubGVuZ3RoLGRlbGV0ZSBiLm1heGxlbmd0aCkpLGJ9LG5vcm1hbGl6ZVJ1bGU6ZnVuY3Rpb24oYil7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGIpe3ZhciBjPXt9O2EuZWFjaChiLnNwbGl0KC9cXHMvKSxmdW5jdGlvbigpe2NbdGhpc109ITB9KSxiPWN9cmV0dXJuIGJ9LGFkZE1ldGhvZDpmdW5jdGlvbihiLGMsZCl7YS52YWxpZGF0b3IubWV0aG9kc1tiXT1jLGEudmFsaWRhdG9yLm1lc3NhZ2VzW2JdPXZvaWQgMCE9PWQ/ZDphLnZhbGlkYXRvci5tZXNzYWdlc1tiXSxjLmxlbmd0aDwzJiZhLnZhbGlkYXRvci5hZGRDbGFzc1J1bGVzKGIsYS52YWxpZGF0b3Iubm9ybWFsaXplUnVsZShiKSl9LG1ldGhvZHM6e3JlcXVpcmVkOmZ1bmN0aW9uKGIsYyxkKXtpZighdGhpcy5kZXBlbmQoZCxjKSlyZXR1cm5cImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtpZihcInNlbGVjdFwiPT09Yy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKXt2YXIgZT1hKGMpLnZhbCgpO3JldHVybiBlJiZlLmxlbmd0aD4wfXJldHVybiB0aGlzLmNoZWNrYWJsZShjKT90aGlzLmdldExlbmd0aChiLGMpPjA6Yi5sZW5ndGg+MH0sZW1haWw6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8L15bYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqJC8udGVzdChhKX0sdXJsOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fC9eKD86KD86KD86aHR0cHM/fGZ0cCk6KT9cXC9cXC8pKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykoPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKig/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmZdezIsfSkpLj8pKD86OlxcZHsyLDV9KT8oPzpbLz8jXVxcUyopPyQvaS50ZXN0KGEpfSxkYXRlOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fCEvSW52YWxpZHxOYU4vLnRlc3QobmV3IERhdGUoYSkudG9TdHJpbmcoKSl9LGRhdGVJU086ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8L15cXGR7NH1bXFwvXFwtXSgwP1sxLTldfDFbMDEyXSlbXFwvXFwtXSgwP1sxLTldfFsxMl1bMC05XXwzWzAxXSkkLy50ZXN0KGEpfSxudW1iZXI6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8L14oPzotP1xcZCt8LT9cXGR7MSwzfSg/OixcXGR7M30pKyk/KD86XFwuXFxkKyk/JC8udGVzdChhKX0sZGlnaXRzOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMub3B0aW9uYWwoYil8fC9eXFxkKyQvLnRlc3QoYSl9LG1pbmxlbmd0aDpmdW5jdGlvbihiLGMsZCl7dmFyIGU9YS5pc0FycmF5KGIpP2IubGVuZ3RoOnRoaXMuZ2V0TGVuZ3RoKGIsYyk7cmV0dXJuIHRoaXMub3B0aW9uYWwoYyl8fGU+PWR9LG1heGxlbmd0aDpmdW5jdGlvbihiLGMsZCl7dmFyIGU9YS5pc0FycmF5KGIpP2IubGVuZ3RoOnRoaXMuZ2V0TGVuZ3RoKGIsYyk7cmV0dXJuIHRoaXMub3B0aW9uYWwoYyl8fGU8PWR9LHJhbmdlbGVuZ3RoOmZ1bmN0aW9uKGIsYyxkKXt2YXIgZT1hLmlzQXJyYXkoYik/Yi5sZW5ndGg6dGhpcy5nZXRMZW5ndGgoYixjKTtyZXR1cm4gdGhpcy5vcHRpb25hbChjKXx8ZT49ZFswXSYmZTw9ZFsxXX0sbWluOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8YT49Y30sbWF4OmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gdGhpcy5vcHRpb25hbChiKXx8YTw9Y30scmFuZ2U6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB0aGlzLm9wdGlvbmFsKGIpfHxhPj1jWzBdJiZhPD1jWzFdfSxzdGVwOmZ1bmN0aW9uKGIsYyxkKXt2YXIgZSxmPWEoYykuYXR0cihcInR5cGVcIiksZz1cIlN0ZXAgYXR0cmlidXRlIG9uIGlucHV0IHR5cGUgXCIrZitcIiBpcyBub3Qgc3VwcG9ydGVkLlwiLGg9W1widGV4dFwiLFwibnVtYmVyXCIsXCJyYW5nZVwiXSxpPW5ldyBSZWdFeHAoXCJcXFxcYlwiK2YrXCJcXFxcYlwiKSxqPWYmJiFpLnRlc3QoaC5qb2luKCkpLGs9ZnVuY3Rpb24oYSl7dmFyIGI9KFwiXCIrYSkubWF0Y2goLyg/OlxcLihcXGQrKSk/JC8pO3JldHVybiBiJiZiWzFdP2JbMV0ubGVuZ3RoOjB9LGw9ZnVuY3Rpb24oYSl7cmV0dXJuIE1hdGgucm91bmQoYSpNYXRoLnBvdygxMCxlKSl9LG09ITA7aWYoail0aHJvdyBuZXcgRXJyb3IoZyk7cmV0dXJuIGU9ayhkKSwoayhiKT5lfHxsKGIpJWwoZCkhPT0wKSYmKG09ITEpLHRoaXMub3B0aW9uYWwoYyl8fG19LGVxdWFsVG86ZnVuY3Rpb24oYixjLGQpe3ZhciBlPWEoZCk7cmV0dXJuIHRoaXMuc2V0dGluZ3Mub25mb2N1c291dCYmZS5ub3QoXCIudmFsaWRhdGUtZXF1YWxUby1ibHVyXCIpLmxlbmd0aCYmZS5hZGRDbGFzcyhcInZhbGlkYXRlLWVxdWFsVG8tYmx1clwiKS5vbihcImJsdXIudmFsaWRhdGUtZXF1YWxUb1wiLGZ1bmN0aW9uKCl7YShjKS52YWxpZCgpfSksYj09PWUudmFsKCl9LHJlbW90ZTpmdW5jdGlvbihiLGMsZCxlKXtpZih0aGlzLm9wdGlvbmFsKGMpKXJldHVyblwiZGVwZW5kZW5jeS1taXNtYXRjaFwiO2U9XCJzdHJpbmdcIj09dHlwZW9mIGUmJmV8fFwicmVtb3RlXCI7dmFyIGYsZyxoLGk9dGhpcy5wcmV2aW91c1ZhbHVlKGMsZSk7cmV0dXJuIHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbYy5uYW1lXXx8KHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbYy5uYW1lXT17fSksaS5vcmlnaW5hbE1lc3NhZ2U9aS5vcmlnaW5hbE1lc3NhZ2V8fHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbYy5uYW1lXVtlXSx0aGlzLnNldHRpbmdzLm1lc3NhZ2VzW2MubmFtZV1bZV09aS5tZXNzYWdlLGQ9XCJzdHJpbmdcIj09dHlwZW9mIGQmJnt1cmw6ZH18fGQsaD1hLnBhcmFtKGEuZXh0ZW5kKHtkYXRhOmJ9LGQuZGF0YSkpLGkub2xkPT09aD9pLnZhbGlkOihpLm9sZD1oLGY9dGhpcyx0aGlzLnN0YXJ0UmVxdWVzdChjKSxnPXt9LGdbYy5uYW1lXT1iLGEuYWpheChhLmV4dGVuZCghMCx7bW9kZTpcImFib3J0XCIscG9ydDpcInZhbGlkYXRlXCIrYy5uYW1lLGRhdGFUeXBlOlwianNvblwiLGRhdGE6Zyxjb250ZXh0OmYuY3VycmVudEZvcm0sc3VjY2VzczpmdW5jdGlvbihhKXt2YXIgZCxnLGgsaj1hPT09ITB8fFwidHJ1ZVwiPT09YTtmLnNldHRpbmdzLm1lc3NhZ2VzW2MubmFtZV1bZV09aS5vcmlnaW5hbE1lc3NhZ2Usaj8oaD1mLmZvcm1TdWJtaXR0ZWQsZi5yZXNldEludGVybmFscygpLGYudG9IaWRlPWYuZXJyb3JzRm9yKGMpLGYuZm9ybVN1Ym1pdHRlZD1oLGYuc3VjY2Vzc0xpc3QucHVzaChjKSxmLmludmFsaWRbYy5uYW1lXT0hMSxmLnNob3dFcnJvcnMoKSk6KGQ9e30sZz1hfHxmLmRlZmF1bHRNZXNzYWdlKGMse21ldGhvZDplLHBhcmFtZXRlcnM6Yn0pLGRbYy5uYW1lXT1pLm1lc3NhZ2U9ZyxmLmludmFsaWRbYy5uYW1lXT0hMCxmLnNob3dFcnJvcnMoZCkpLGkudmFsaWQ9aixmLnN0b3BSZXF1ZXN0KGMsail9fSxkKSksXCJwZW5kaW5nXCIpfX19KTt2YXIgYixjPXt9O3JldHVybiBhLmFqYXhQcmVmaWx0ZXI/YS5hamF4UHJlZmlsdGVyKGZ1bmN0aW9uKGEsYixkKXt2YXIgZT1hLnBvcnQ7XCJhYm9ydFwiPT09YS5tb2RlJiYoY1tlXSYmY1tlXS5hYm9ydCgpLGNbZV09ZCl9KTooYj1hLmFqYXgsYS5hamF4PWZ1bmN0aW9uKGQpe3ZhciBlPShcIm1vZGVcImluIGQ/ZDphLmFqYXhTZXR0aW5ncykubW9kZSxmPShcInBvcnRcImluIGQ/ZDphLmFqYXhTZXR0aW5ncykucG9ydDtyZXR1cm5cImFib3J0XCI9PT1lPyhjW2ZdJiZjW2ZdLmFib3J0KCksY1tmXT1iLmFwcGx5KHRoaXMsYXJndW1lbnRzKSxjW2ZdKTpiLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0pLGF9KTsiLCIhZnVuY3Rpb24oJCkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIEZPVU5EQVRJT05fVkVSU0lPTiA9ICc2LjIuNCc7XG5cbi8vIEdsb2JhbCBGb3VuZGF0aW9uIG9iamVjdFxuLy8gVGhpcyBpcyBhdHRhY2hlZCB0byB0aGUgd2luZG93LCBvciB1c2VkIGFzIGEgbW9kdWxlIGZvciBBTUQvQnJvd3NlcmlmeVxudmFyIEZvdW5kYXRpb24gPSB7XG4gIHZlcnNpb246IEZPVU5EQVRJT05fVkVSU0lPTixcblxuICAvKipcbiAgICogU3RvcmVzIGluaXRpYWxpemVkIHBsdWdpbnMuXG4gICAqL1xuICBfcGx1Z2luczoge30sXG5cbiAgLyoqXG4gICAqIFN0b3JlcyBnZW5lcmF0ZWQgdW5pcXVlIGlkcyBmb3IgcGx1Z2luIGluc3RhbmNlc1xuICAgKi9cbiAgX3V1aWRzOiBbXSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gZm9yIFJUTCBzdXBwb3J0XG4gICAqL1xuICBydGw6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICQoJ2h0bWwnKS5hdHRyKCdkaXInKSA9PT0gJ3J0bCc7XG4gIH0sXG4gIC8qKlxuICAgKiBEZWZpbmVzIGEgRm91bmRhdGlvbiBwbHVnaW4sIGFkZGluZyBpdCB0byB0aGUgYEZvdW5kYXRpb25gIG5hbWVzcGFjZSBhbmQgdGhlIGxpc3Qgb2YgcGx1Z2lucyB0byBpbml0aWFsaXplIHdoZW4gcmVmbG93aW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBwbHVnaW4uXG4gICAqL1xuICBwbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSkge1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gYWRkaW5nIHRvIGdsb2JhbCBGb3VuZGF0aW9uIG9iamVjdFxuICAgIC8vIEV4YW1wbGVzOiBGb3VuZGF0aW9uLlJldmVhbCwgRm91bmRhdGlvbi5PZmZDYW52YXNcbiAgICB2YXIgY2xhc3NOYW1lID0gKG5hbWUgfHwgZnVuY3Rpb25OYW1lKHBsdWdpbikpO1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gc3RvcmluZyB0aGUgcGx1Z2luLCBhbHNvIHVzZWQgdG8gY3JlYXRlIHRoZSBpZGVudGlmeWluZyBkYXRhIGF0dHJpYnV0ZSBmb3IgdGhlIHBsdWdpblxuICAgIC8vIEV4YW1wbGVzOiBkYXRhLXJldmVhbCwgZGF0YS1vZmYtY2FudmFzXG4gICAgdmFyIGF0dHJOYW1lICA9IGh5cGhlbmF0ZShjbGFzc05hbWUpO1xuXG4gICAgLy8gQWRkIHRvIHRoZSBGb3VuZGF0aW9uIG9iamVjdCBhbmQgdGhlIHBsdWdpbnMgbGlzdCAoZm9yIHJlZmxvd2luZylcbiAgICB0aGlzLl9wbHVnaW5zW2F0dHJOYW1lXSA9IHRoaXNbY2xhc3NOYW1lXSA9IHBsdWdpbjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBQb3B1bGF0ZXMgdGhlIF91dWlkcyBhcnJheSB3aXRoIHBvaW50ZXJzIHRvIGVhY2ggaW5kaXZpZHVhbCBwbHVnaW4gaW5zdGFuY2UuXG4gICAqIEFkZHMgdGhlIGB6ZlBsdWdpbmAgZGF0YS1hdHRyaWJ1dGUgdG8gcHJvZ3JhbW1hdGljYWxseSBjcmVhdGVkIHBsdWdpbnMgdG8gYWxsb3cgdXNlIG9mICQoc2VsZWN0b3IpLmZvdW5kYXRpb24obWV0aG9kKSBjYWxscy5cbiAgICogQWxzbyBmaXJlcyB0aGUgaW5pdGlhbGl6YXRpb24gZXZlbnQgZm9yIGVhY2ggcGx1Z2luLCBjb25zb2xpZGF0aW5nIHJlcGV0aXRpdmUgY29kZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIGFuIGluc3RhbmNlIG9mIGEgcGx1Z2luLCB1c3VhbGx5IGB0aGlzYCBpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBwbHVnaW4sIHBhc3NlZCBhcyBhIGNhbWVsQ2FzZWQgc3RyaW5nLlxuICAgKiBAZmlyZXMgUGx1Z2luI2luaXRcbiAgICovXG4gIHJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4sIG5hbWUpe1xuICAgIHZhciBwbHVnaW5OYW1lID0gbmFtZSA/IGh5cGhlbmF0ZShuYW1lKSA6IGZ1bmN0aW9uTmFtZShwbHVnaW4uY29uc3RydWN0b3IpLnRvTG93ZXJDYXNlKCk7XG4gICAgcGx1Z2luLnV1aWQgPSB0aGlzLkdldFlvRGlnaXRzKDYsIHBsdWdpbk5hbWUpO1xuXG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gLCBwbHVnaW4udXVpZCk7IH1cbiAgICBpZighcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyBwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nLCBwbHVnaW4pOyB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2luaXRcbiAgICAgICAgICAgKi9cbiAgICBwbHVnaW4uJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG5cbiAgICB0aGlzLl91dWlkcy5wdXNoKHBsdWdpbi51dWlkKTtcblxuICAgIHJldHVybjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBSZW1vdmVzIHRoZSBwbHVnaW5zIHV1aWQgZnJvbSB0aGUgX3V1aWRzIGFycmF5LlxuICAgKiBSZW1vdmVzIHRoZSB6ZlBsdWdpbiBkYXRhIGF0dHJpYnV0ZSwgYXMgd2VsbCBhcyB0aGUgZGF0YS1wbHVnaW4tbmFtZSBhdHRyaWJ1dGUuXG4gICAqIEFsc28gZmlyZXMgdGhlIGRlc3Ryb3llZCBldmVudCBmb3IgdGhlIHBsdWdpbiwgY29uc29saWRhdGluZyByZXBldGl0aXZlIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBhbiBpbnN0YW5jZSBvZiBhIHBsdWdpbiwgdXN1YWxseSBgdGhpc2AgaW4gY29udGV4dC5cbiAgICogQGZpcmVzIFBsdWdpbiNkZXN0cm95ZWRcbiAgICovXG4gIHVucmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBoeXBoZW5hdGUoZnVuY3Rpb25OYW1lKHBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpLmNvbnN0cnVjdG9yKSk7XG5cbiAgICB0aGlzLl91dWlkcy5zcGxpY2UodGhpcy5fdXVpZHMuaW5kZXhPZihwbHVnaW4udXVpZCksIDEpO1xuICAgIHBsdWdpbi4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIC50cmlnZ2VyKGBkZXN0cm95ZWQuemYuJHtwbHVnaW5OYW1lfWApO1xuICAgIGZvcih2YXIgcHJvcCBpbiBwbHVnaW4pe1xuICAgICAgcGx1Z2luW3Byb3BdID0gbnVsbDsvL2NsZWFuIHVwIHNjcmlwdCB0byBwcmVwIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgfVxuICAgIHJldHVybjtcbiAgfSxcblxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIENhdXNlcyBvbmUgb3IgbW9yZSBhY3RpdmUgcGx1Z2lucyB0byByZS1pbml0aWFsaXplLCByZXNldHRpbmcgZXZlbnQgbGlzdGVuZXJzLCByZWNhbGN1bGF0aW5nIHBvc2l0aW9ucywgZXRjLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGx1Z2lucyAtIG9wdGlvbmFsIHN0cmluZyBvZiBhbiBpbmRpdmlkdWFsIHBsdWdpbiBrZXksIGF0dGFpbmVkIGJ5IGNhbGxpbmcgYCQoZWxlbWVudCkuZGF0YSgncGx1Z2luTmFtZScpYCwgb3Igc3RyaW5nIG9mIGEgcGx1Z2luIGNsYXNzIGkuZS4gYCdkcm9wZG93bidgXG4gICAqIEBkZWZhdWx0IElmIG5vIGFyZ3VtZW50IGlzIHBhc3NlZCwgcmVmbG93IGFsbCBjdXJyZW50bHkgYWN0aXZlIHBsdWdpbnMuXG4gICAqL1xuICAgcmVJbml0OiBmdW5jdGlvbihwbHVnaW5zKXtcbiAgICAgdmFyIGlzSlEgPSBwbHVnaW5zIGluc3RhbmNlb2YgJDtcbiAgICAgdHJ5e1xuICAgICAgIGlmKGlzSlEpe1xuICAgICAgICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICQodGhpcykuZGF0YSgnemZQbHVnaW4nKS5faW5pdCgpO1xuICAgICAgICAgfSk7XG4gICAgICAgfWVsc2V7XG4gICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBwbHVnaW5zLFxuICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgZm5zID0ge1xuICAgICAgICAgICAnb2JqZWN0JzogZnVuY3Rpb24ocGxncyl7XG4gICAgICAgICAgICAgcGxncy5mb3JFYWNoKGZ1bmN0aW9uKHApe1xuICAgICAgICAgICAgICAgcCA9IGh5cGhlbmF0ZShwKTtcbiAgICAgICAgICAgICAgICQoJ1tkYXRhLScrIHAgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3N0cmluZyc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgcGx1Z2lucyA9IGh5cGhlbmF0ZShwbHVnaW5zKTtcbiAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwbHVnaW5zICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICd1bmRlZmluZWQnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHRoaXNbJ29iamVjdCddKE9iamVjdC5rZXlzKF90aGlzLl9wbHVnaW5zKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH07XG4gICAgICAgICBmbnNbdHlwZV0ocGx1Z2lucyk7XG4gICAgICAgfVxuICAgICB9Y2F0Y2goZXJyKXtcbiAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgIH1maW5hbGx5e1xuICAgICAgIHJldHVybiBwbHVnaW5zO1xuICAgICB9XG4gICB9LFxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgcmFuZG9tIGJhc2UtMzYgdWlkIHdpdGggbmFtZXNwYWNpbmdcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXIgb2YgcmFuZG9tIGJhc2UtMzYgZGlnaXRzIGRlc2lyZWQuIEluY3JlYXNlIGZvciBtb3JlIHJhbmRvbSBzdHJpbmdzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIC0gbmFtZSBvZiBwbHVnaW4gdG8gYmUgaW5jb3Jwb3JhdGVkIGluIHVpZCwgb3B0aW9uYWwuXG4gICAqIEBkZWZhdWx0IHtTdHJpbmd9ICcnIC0gaWYgbm8gcGx1Z2luIG5hbWUgaXMgcHJvdmlkZWQsIG5vdGhpbmcgaXMgYXBwZW5kZWQgdG8gdGhlIHVpZC5cbiAgICogQHJldHVybnMge1N0cmluZ30gLSB1bmlxdWUgaWRcbiAgICovXG4gIEdldFlvRGlnaXRzOiBmdW5jdGlvbihsZW5ndGgsIG5hbWVzcGFjZSl7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IDY7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgucG93KDM2LCBsZW5ndGggKyAxKSAtIE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygzNiwgbGVuZ3RoKSkpLnRvU3RyaW5nKDM2KS5zbGljZSgxKSArIChuYW1lc3BhY2UgPyBgLSR7bmFtZXNwYWNlfWAgOiAnJyk7XG4gIH0sXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHBsdWdpbnMgb24gYW55IGVsZW1lbnRzIHdpdGhpbiBgZWxlbWAgKGFuZCBgZWxlbWAgaXRzZWxmKSB0aGF0IGFyZW4ndCBhbHJlYWR5IGluaXRpYWxpemVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSAtIGpRdWVyeSBvYmplY3QgY29udGFpbmluZyB0aGUgZWxlbWVudCB0byBjaGVjayBpbnNpZGUuIEFsc28gY2hlY2tzIHRoZSBlbGVtZW50IGl0c2VsZiwgdW5sZXNzIGl0J3MgdGhlIGBkb2N1bWVudGAgb2JqZWN0LlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGx1Z2lucyAtIEEgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUuIExlYXZlIHRoaXMgb3V0IHRvIGluaXRpYWxpemUgZXZlcnl0aGluZy5cbiAgICovXG4gIHJlZmxvdzogZnVuY3Rpb24oZWxlbSwgcGx1Z2lucykge1xuXG4gICAgLy8gSWYgcGx1Z2lucyBpcyB1bmRlZmluZWQsIGp1c3QgZ3JhYiBldmVyeXRoaW5nXG4gICAgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcGx1Z2lucyA9IE9iamVjdC5rZXlzKHRoaXMuX3BsdWdpbnMpO1xuICAgIH1cbiAgICAvLyBJZiBwbHVnaW5zIGlzIGEgc3RyaW5nLCBjb252ZXJ0IGl0IHRvIGFuIGFycmF5IHdpdGggb25lIGl0ZW1cbiAgICBlbHNlIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBsdWdpblxuICAgICQuZWFjaChwbHVnaW5zLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGx1Z2luXG4gICAgICB2YXIgcGx1Z2luID0gX3RoaXMuX3BsdWdpbnNbbmFtZV07XG5cbiAgICAgIC8vIExvY2FsaXplIHRoZSBzZWFyY2ggdG8gYWxsIGVsZW1lbnRzIGluc2lkZSBlbGVtLCBhcyB3ZWxsIGFzIGVsZW0gaXRzZWxmLCB1bmxlc3MgZWxlbSA9PT0gZG9jdW1lbnRcbiAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSkuZmluZCgnW2RhdGEtJytuYW1lKyddJykuYWRkQmFjaygnW2RhdGEtJytuYW1lKyddJyk7XG5cbiAgICAgIC8vIEZvciBlYWNoIHBsdWdpbiBmb3VuZCwgaW5pdGlhbGl6ZSBpdFxuICAgICAgJGVsZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIC8vIERvbid0IGRvdWJsZS1kaXAgb24gcGx1Z2luc1xuICAgICAgICBpZiAoJGVsLmRhdGEoJ3pmUGx1Z2luJykpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJUcmllZCB0byBpbml0aWFsaXplIFwiK25hbWUrXCIgb24gYW4gZWxlbWVudCB0aGF0IGFscmVhZHkgaGFzIGEgRm91bmRhdGlvbiBwbHVnaW4uXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKSl7XG4gICAgICAgICAgdmFyIHRoaW5nID0gJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpLnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcbiAgICAgICAgICAgIHZhciBvcHQgPSBlLnNwbGl0KCc6JykubWFwKGZ1bmN0aW9uKGVsKXsgcmV0dXJuIGVsLnRyaW0oKTsgfSk7XG4gICAgICAgICAgICBpZihvcHRbMF0pIG9wdHNbb3B0WzBdXSA9IHBhcnNlVmFsdWUob3B0WzFdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0cnl7XG4gICAgICAgICAgJGVsLmRhdGEoJ3pmUGx1Z2luJywgbmV3IHBsdWdpbigkKHRoaXMpLCBvcHRzKSk7XG4gICAgICAgIH1jYXRjaChlcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcik7XG4gICAgICAgIH1maW5hbGx5e1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldEZuTmFtZTogZnVuY3Rpb25OYW1lLFxuICB0cmFuc2l0aW9uZW5kOiBmdW5jdGlvbigkZWxlbSl7XG4gICAgdmFyIHRyYW5zaXRpb25zID0ge1xuICAgICAgJ3RyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAnV2Via2l0VHJhbnNpdGlvbic6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICdNb3pUcmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ09UcmFuc2l0aW9uJzogJ290cmFuc2l0aW9uZW5kJ1xuICAgIH07XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgZW5kO1xuXG4gICAgZm9yICh2YXIgdCBpbiB0cmFuc2l0aW9ucyl7XG4gICAgICBpZiAodHlwZW9mIGVsZW0uc3R5bGVbdF0gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgZW5kID0gdHJhbnNpdGlvbnNbdF07XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGVuZCl7XG4gICAgICByZXR1cm4gZW5kO1xuICAgIH1lbHNle1xuICAgICAgZW5kID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkZWxlbS50cmlnZ2VySGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIFskZWxlbV0pO1xuICAgICAgfSwgMSk7XG4gICAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQnO1xuICAgIH1cbiAgfVxufTtcblxuRm91bmRhdGlvbi51dGlsID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gZm9yIGFwcGx5aW5nIGEgZGVib3VuY2UgZWZmZWN0IHRvIGEgZnVuY3Rpb24gY2FsbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBjYWxsZWQgYXQgZW5kIG9mIHRpbWVvdXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSAtIFRpbWUgaW4gbXMgdG8gZGVsYXkgdGhlIGNhbGwgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyBmdW5jdGlvblxuICAgKi9cbiAgdGhyb3R0bGU6IGZ1bmN0aW9uIChmdW5jLCBkZWxheSkge1xuICAgIHZhciB0aW1lciA9IG51bGw7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cbi8vIFRPRE86IGNvbnNpZGVyIG5vdCBtYWtpbmcgdGhpcyBhIGpRdWVyeSBmdW5jdGlvblxuLy8gVE9ETzogbmVlZCB3YXkgdG8gcmVmbG93IHZzLiByZS1pbml0aWFsaXplXG4vKipcbiAqIFRoZSBGb3VuZGF0aW9uIGpRdWVyeSBtZXRob2QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWV0aG9kIC0gQW4gYWN0aW9uIHRvIHBlcmZvcm0gb24gdGhlIGN1cnJlbnQgalF1ZXJ5IG9iamVjdC5cbiAqL1xudmFyIGZvdW5kYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgbWV0aG9kLFxuICAgICAgJG1ldGEgPSAkKCdtZXRhLmZvdW5kYXRpb24tbXEnKSxcbiAgICAgICRub0pTID0gJCgnLm5vLWpzJyk7XG5cbiAgaWYoISRtZXRhLmxlbmd0aCl7XG4gICAgJCgnPG1ldGEgY2xhc3M9XCJmb3VuZGF0aW9uLW1xXCI+JykuYXBwZW5kVG8oZG9jdW1lbnQuaGVhZCk7XG4gIH1cbiAgaWYoJG5vSlMubGVuZ3RoKXtcbiAgICAkbm9KUy5yZW1vdmVDbGFzcygnbm8tanMnKTtcbiAgfVxuXG4gIGlmKHR5cGUgPT09ICd1bmRlZmluZWQnKXsvL25lZWRzIHRvIGluaXRpYWxpemUgdGhlIEZvdW5kYXRpb24gb2JqZWN0LCBvciBhbiBpbmRpdmlkdWFsIHBsdWdpbi5cbiAgICBGb3VuZGF0aW9uLk1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICBGb3VuZGF0aW9uLnJlZmxvdyh0aGlzKTtcbiAgfWVsc2UgaWYodHlwZSA9PT0gJ3N0cmluZycpey8vYW4gaW5kaXZpZHVhbCBtZXRob2QgdG8gaW52b2tlIG9uIGEgcGx1Z2luIG9yIGdyb3VwIG9mIHBsdWdpbnNcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7Ly9jb2xsZWN0IGFsbCB0aGUgYXJndW1lbnRzLCBpZiBuZWNlc3NhcnlcbiAgICB2YXIgcGx1Z0NsYXNzID0gdGhpcy5kYXRhKCd6ZlBsdWdpbicpOy8vZGV0ZXJtaW5lIHRoZSBjbGFzcyBvZiBwbHVnaW5cblxuICAgIGlmKHBsdWdDbGFzcyAhPT0gdW5kZWZpbmVkICYmIHBsdWdDbGFzc1ttZXRob2RdICE9PSB1bmRlZmluZWQpey8vbWFrZSBzdXJlIGJvdGggdGhlIGNsYXNzIGFuZCBtZXRob2QgZXhpc3RcbiAgICAgIGlmKHRoaXMubGVuZ3RoID09PSAxKXsvL2lmIHRoZXJlJ3Mgb25seSBvbmUsIGNhbGwgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkocGx1Z0NsYXNzLCBhcmdzKTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSwgZWwpey8vb3RoZXJ3aXNlIGxvb3AgdGhyb3VnaCB0aGUgalF1ZXJ5IGNvbGxlY3Rpb24gYW5kIGludm9rZSB0aGUgbWV0aG9kIG9uIGVhY2hcbiAgICAgICAgICBwbHVnQ2xhc3NbbWV0aG9kXS5hcHBseSgkKGVsKS5kYXRhKCd6ZlBsdWdpbicpLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfWVsc2V7Ly9lcnJvciBmb3Igbm8gY2xhc3Mgb3Igbm8gbWV0aG9kXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJXZSdyZSBzb3JyeSwgJ1wiICsgbWV0aG9kICsgXCInIGlzIG5vdCBhbiBhdmFpbGFibGUgbWV0aG9kIGZvciBcIiArIChwbHVnQ2xhc3MgPyBmdW5jdGlvbk5hbWUocGx1Z0NsYXNzKSA6ICd0aGlzIGVsZW1lbnQnKSArICcuJyk7XG4gICAgfVxuICB9ZWxzZXsvL2Vycm9yIGZvciBpbnZhbGlkIGFyZ3VtZW50IHR5cGVcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBXZSdyZSBzb3JyeSwgJHt0eXBlfSBpcyBub3QgYSB2YWxpZCBwYXJhbWV0ZXIuIFlvdSBtdXN0IHVzZSBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG1ldGhvZCB5b3Ugd2lzaCB0byBpbnZva2UuYCk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG53aW5kb3cuRm91bmRhdGlvbiA9IEZvdW5kYXRpb247XG4kLmZuLmZvdW5kYXRpb24gPSBmb3VuZGF0aW9uO1xuXG4vLyBQb2x5ZmlsbCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4oZnVuY3Rpb24oKSB7XG4gIGlmICghRGF0ZS5ub3cgfHwgIXdpbmRvdy5EYXRlLm5vdylcbiAgICB3aW5kb3cuRGF0ZS5ub3cgPSBEYXRlLm5vdyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7IH07XG5cbiAgdmFyIHZlbmRvcnMgPSBbJ3dlYmtpdCcsICdtb3onXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKytpKSB7XG4gICAgICB2YXIgdnAgPSB2ZW5kb3JzW2ldO1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2cCsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSAod2luZG93W3ZwKydDYW5jZWxBbmltYXRpb25GcmFtZSddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3dbdnArJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddKTtcbiAgfVxuICBpZiAoL2lQKGFkfGhvbmV8b2QpLipPUyA2Ly50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgIHx8ICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIG5leHRUaW1lID0gTWF0aC5tYXgobGFzdFRpbWUgKyAxNiwgbm93KTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGxhc3RUaW1lID0gbmV4dFRpbWUpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0VGltZSAtIG5vdyk7XG4gICAgfTtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjbGVhclRpbWVvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFBvbHlmaWxsIGZvciBwZXJmb3JtYW5jZS5ub3csIHJlcXVpcmVkIGJ5IHJBRlxuICAgKi9cbiAgaWYoIXdpbmRvdy5wZXJmb3JtYW5jZSB8fCAhd2luZG93LnBlcmZvcm1hbmNlLm5vdyl7XG4gICAgd2luZG93LnBlcmZvcm1hbmNlID0ge1xuICAgICAgc3RhcnQ6IERhdGUubm93KCksXG4gICAgICBub3c6IGZ1bmN0aW9uKCl7IHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5zdGFydDsgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob1RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICB9XG5cbiAgICB2YXIgYUFyZ3MgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZUb0JpbmQgPSB0aGlzLFxuICAgICAgICBmTk9QICAgID0gZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZkJvdW5kICA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QXG4gICAgICAgICAgICAgICAgID8gdGhpc1xuICAgICAgICAgICAgICAgICA6IG9UaGlzLFxuICAgICAgICAgICAgICAgICBhQXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvdG90eXBlKSB7XG4gICAgICAvLyBuYXRpdmUgZnVuY3Rpb25zIGRvbid0IGhhdmUgYSBwcm90b3R5cGVcbiAgICAgIGZOT1AucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG4gICAgfVxuICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gICAgcmV0dXJuIGZCb3VuZDtcbiAgfTtcbn1cbi8vIFBvbHlmaWxsIHRvIGdldCB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uIGluIElFOVxuZnVuY3Rpb24gZnVuY3Rpb25OYW1lKGZuKSB7XG4gIGlmIChGdW5jdGlvbi5wcm90b3R5cGUubmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb25cXHMoW14oXXsxLH0pXFwoLztcbiAgICB2YXIgcmVzdWx0cyA9IChmdW5jTmFtZVJlZ2V4KS5leGVjKChmbikudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMSkgPyByZXN1bHRzWzFdLnRyaW0oKSA6IFwiXCI7XG4gIH1cbiAgZWxzZSBpZiAoZm4ucHJvdG90eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZm4uY29uc3RydWN0b3IubmFtZTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZm4ucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoc3RyKXtcbiAgaWYoL3RydWUvLnRlc3Qoc3RyKSkgcmV0dXJuIHRydWU7XG4gIGVsc2UgaWYoL2ZhbHNlLy50ZXN0KHN0cikpIHJldHVybiBmYWxzZTtcbiAgZWxzZSBpZighaXNOYU4oc3RyICogMSkpIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG4gIHJldHVybiBzdHI7XG59XG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxufShqUXVlcnkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4hZnVuY3Rpb24oJCkge1xuXG4vLyBEZWZhdWx0IHNldCBvZiBtZWRpYSBxdWVyaWVzXG5jb25zdCBkZWZhdWx0UXVlcmllcyA9IHtcbiAgJ2RlZmF1bHQnIDogJ29ubHkgc2NyZWVuJyxcbiAgbGFuZHNjYXBlIDogJ29ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSknLFxuICBwb3J0cmFpdCA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknLFxuICByZXRpbmEgOiAnb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuICAgICdvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4gICAgJ29ubHkgc2NyZWVuIGFuZCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogMi8xKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMTkyZHBpKSwnICtcbiAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMmRwcHgpJ1xufTtcblxudmFyIE1lZGlhUXVlcnkgPSB7XG4gIHF1ZXJpZXM6IFtdLFxuXG4gIGN1cnJlbnQ6ICcnLFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbWVkaWEgcXVlcnkgaGVscGVyLCBieSBleHRyYWN0aW5nIHRoZSBicmVha3BvaW50IGxpc3QgZnJvbSB0aGUgQ1NTIGFuZCBhY3RpdmF0aW5nIHRoZSBicmVha3BvaW50IHdhdGNoZXIuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBleHRyYWN0ZWRTdHlsZXMgPSAkKCcuZm91bmRhdGlvbi1tcScpLmNzcygnZm9udC1mYW1pbHknKTtcbiAgICB2YXIgbmFtZWRRdWVyaWVzO1xuXG4gICAgbmFtZWRRdWVyaWVzID0gcGFyc2VTdHlsZVRvT2JqZWN0KGV4dHJhY3RlZFN0eWxlcyk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZWRRdWVyaWVzKSB7XG4gICAgICBpZihuYW1lZFF1ZXJpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBzZWxmLnF1ZXJpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHZhbHVlOiBgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7bmFtZWRRdWVyaWVzW2tleV19KWBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKTtcblxuICAgIHRoaXMuX3dhdGNoZXIoKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gaXMgYXQgbGVhc3QgYXMgd2lkZSBhcyBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGJyZWFrcG9pbnQgbWF0Y2hlcywgYGZhbHNlYCBpZiBpdCdzIHNtYWxsZXIuXG4gICAqL1xuICBhdExlYXN0KHNpemUpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLmdldChzaXplKTtcblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgbWVkaWEgcXVlcnkgb2YgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGdldC5cbiAgICogQHJldHVybnMge1N0cmluZ3xudWxsfSAtIFRoZSBtZWRpYSBxdWVyeSBvZiB0aGUgYnJlYWtwb2ludCwgb3IgYG51bGxgIGlmIHRoZSBicmVha3BvaW50IGRvZXNuJ3QgZXhpc3QuXG4gICAqL1xuICBnZXQoc2l6ZSkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5xdWVyaWVzKSB7XG4gICAgICBpZih0aGlzLnF1ZXJpZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyaWVzW2ldO1xuICAgICAgICBpZiAoc2l6ZSA9PT0gcXVlcnkubmFtZSkgcmV0dXJuIHF1ZXJ5LnZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQgbmFtZSBieSB0ZXN0aW5nIGV2ZXJ5IGJyZWFrcG9pbnQgYW5kIHJldHVybmluZyB0aGUgbGFzdCBvbmUgdG8gbWF0Y2ggKHRoZSBiaWdnZXN0IG9uZSkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBOYW1lIG9mIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQuXG4gICAqL1xuICBfZ2V0Q3VycmVudFNpemUoKSB7XG4gICAgdmFyIG1hdGNoZWQ7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyaWVzW2ldO1xuXG4gICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEocXVlcnkudmFsdWUpLm1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlZCA9IHF1ZXJ5O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWF0Y2hlZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBtYXRjaGVkLm5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBicmVha3BvaW50IHdhdGNoZXIsIHdoaWNoIGZpcmVzIGFuIGV2ZW50IG9uIHRoZSB3aW5kb3cgd2hlbmV2ZXIgdGhlIGJyZWFrcG9pbnQgY2hhbmdlcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfd2F0Y2hlcigpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS56Zi5tZWRpYXF1ZXJ5JywgKCkgPT4ge1xuICAgICAgdmFyIG5ld1NpemUgPSB0aGlzLl9nZXRDdXJyZW50U2l6ZSgpLCBjdXJyZW50U2l6ZSA9IHRoaXMuY3VycmVudDtcblxuICAgICAgaWYgKG5ld1NpemUgIT09IGN1cnJlbnRTaXplKSB7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgY3VycmVudCBtZWRpYSBxdWVyeVxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBuZXdTaXplO1xuXG4gICAgICAgIC8vIEJyb2FkY2FzdCB0aGUgbWVkaWEgcXVlcnkgY2hhbmdlIG9uIHRoZSB3aW5kb3dcbiAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIFtuZXdTaXplLCBjdXJyZW50U2l6ZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5Gb3VuZGF0aW9uLk1lZGlhUXVlcnkgPSBNZWRpYVF1ZXJ5O1xuXG4vLyBtYXRjaE1lZGlhKCkgcG9seWZpbGwgLSBUZXN0IGEgQ1NTIG1lZGlhIHR5cGUvcXVlcnkgaW4gSlMuXG4vLyBBdXRob3JzICYgY29weXJpZ2h0IChjKSAyMDEyOiBTY290dCBKZWhsLCBQYXVsIElyaXNoLCBOaWNob2xhcyBaYWthcywgRGF2aWQgS25pZ2h0LiBEdWFsIE1JVC9CU0QgbGljZW5zZVxud2luZG93Lm1hdGNoTWVkaWEgfHwgKHdpbmRvdy5tYXRjaE1lZGlhID0gZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IG1hdGNoTWVkaXVtIGFwaSBzdWNoIGFzIElFIDkgYW5kIHdlYmtpdFxuICB2YXIgc3R5bGVNZWRpYSA9ICh3aW5kb3cuc3R5bGVNZWRpYSB8fCB3aW5kb3cubWVkaWEpO1xuXG4gIC8vIEZvciB0aG9zZSB0aGF0IGRvbid0IHN1cHBvcnQgbWF0Y2hNZWRpdW1cbiAgaWYgKCFzdHlsZU1lZGlhKSB7XG4gICAgdmFyIHN0eWxlICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgIHNjcmlwdCAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdLFxuICAgIGluZm8gICAgICAgID0gbnVsbDtcblxuICAgIHN0eWxlLnR5cGUgID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZS5pZCAgICA9ICdtYXRjaG1lZGlhanMtdGVzdCc7XG5cbiAgICBzY3JpcHQgJiYgc2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0eWxlLCBzY3JpcHQpO1xuXG4gICAgLy8gJ3N0eWxlLmN1cnJlbnRTdHlsZScgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnd2luZG93LmdldENvbXB1dGVkU3R5bGUnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICBpbmZvID0gKCdnZXRDb21wdXRlZFN0eWxlJyBpbiB3aW5kb3cpICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN0eWxlLCBudWxsKSB8fCBzdHlsZS5jdXJyZW50U3R5bGU7XG5cbiAgICBzdHlsZU1lZGlhID0ge1xuICAgICAgbWF0Y2hNZWRpdW0obWVkaWEpIHtcbiAgICAgICAgdmFyIHRleHQgPSBgQG1lZGlhICR7bWVkaWF9eyAjbWF0Y2htZWRpYWpzLXRlc3QgeyB3aWR0aDogMXB4OyB9IH1gO1xuXG4gICAgICAgIC8vICdzdHlsZS5zdHlsZVNoZWV0JyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICdzdHlsZS50ZXh0Q29udGVudCcgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVzdCBpZiBtZWRpYSBxdWVyeSBpcyB0cnVlIG9yIGZhbHNlXG4gICAgICAgIHJldHVybiBpbmZvLndpZHRoID09PSAnMXB4JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24obWVkaWEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWF0Y2hlczogc3R5bGVNZWRpYS5tYXRjaE1lZGl1bShtZWRpYSB8fCAnYWxsJyksXG4gICAgICBtZWRpYTogbWVkaWEgfHwgJ2FsbCdcbiAgICB9O1xuICB9XG59KCkpO1xuXG4vLyBUaGFuayB5b3U6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nXG5mdW5jdGlvbiBwYXJzZVN0eWxlVG9PYmplY3Qoc3RyKSB7XG4gIHZhciBzdHlsZU9iamVjdCA9IHt9O1xuXG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzdHlsZU9iamVjdDtcbiAgfVxuXG4gIHN0ciA9IHN0ci50cmltKCkuc2xpY2UoMSwgLTEpOyAvLyBicm93c2VycyByZS1xdW90ZSBzdHJpbmcgc3R5bGUgdmFsdWVzXG5cbiAgaWYgKCFzdHIpIHtcbiAgICByZXR1cm4gc3R5bGVPYmplY3Q7XG4gIH1cblxuICBzdHlsZU9iamVjdCA9IHN0ci5zcGxpdCgnJicpLnJlZHVjZShmdW5jdGlvbihyZXQsIHBhcmFtKSB7XG4gICAgdmFyIHBhcnRzID0gcGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykuc3BsaXQoJz0nKTtcbiAgICB2YXIga2V5ID0gcGFydHNbMF07XG4gICAgdmFyIHZhbCA9IHBhcnRzWzFdO1xuICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrZXkpO1xuXG4gICAgLy8gbWlzc2luZyBgPWAgc2hvdWxkIGJlIGBudWxsYDpcbiAgICAvLyBodHRwOi8vdzMub3JnL1RSLzIwMTIvV0QtdXJsLTIwMTIwNTI0LyNjb2xsZWN0LXVybC1wYXJhbWV0ZXJzXG4gICAgdmFsID0gdmFsID09PSB1bmRlZmluZWQgPyBudWxsIDogZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7XG5cbiAgICBpZiAoIXJldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXRba2V5XSA9IHZhbDtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmV0W2tleV0pKSB7XG4gICAgICByZXRba2V5XS5wdXNoKHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldFtrZXldID0gW3JldFtrZXldLCB2YWxdO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9LCB7fSk7XG5cbiAgcmV0dXJuIHN0eWxlT2JqZWN0O1xufVxuXG5Gb3VuZGF0aW9uLk1lZGlhUXVlcnkgPSBNZWRpYVF1ZXJ5O1xuXG59KGpRdWVyeSk7XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqIFRoaXMgdXRpbCB3YXMgY3JlYXRlZCBieSBNYXJpdXMgT2xiZXJ0eiAqXG4gKiBQbGVhc2UgdGhhbmsgTWFyaXVzIG9uIEdpdEh1YiAvb3dsYmVydHogKlxuICogb3IgdGhlIHdlYiBodHRwOi8vd3d3Lm1hcml1c29sYmVydHouZGUvICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4ndXNlIHN0cmljdCc7XG5cbiFmdW5jdGlvbigkKSB7XG5cbmNvbnN0IGtleUNvZGVzID0ge1xuICA5OiAnVEFCJyxcbiAgMTM6ICdFTlRFUicsXG4gIDI3OiAnRVNDQVBFJyxcbiAgMzI6ICdTUEFDRScsXG4gIDM3OiAnQVJST1dfTEVGVCcsXG4gIDM4OiAnQVJST1dfVVAnLFxuICAzOTogJ0FSUk9XX1JJR0hUJyxcbiAgNDA6ICdBUlJPV19ET1dOJ1xufVxuXG52YXIgY29tbWFuZHMgPSB7fVxuXG52YXIgS2V5Ym9hcmQgPSB7XG4gIGtleXM6IGdldEtleUNvZGVzKGtleUNvZGVzKSxcblxuICAvKipcbiAgICogUGFyc2VzIHRoZSAoa2V5Ym9hcmQpIGV2ZW50IGFuZCByZXR1cm5zIGEgU3RyaW5nIHRoYXQgcmVwcmVzZW50cyBpdHMga2V5XG4gICAqIENhbiBiZSB1c2VkIGxpa2UgRm91bmRhdGlvbi5wYXJzZUtleShldmVudCkgPT09IEZvdW5kYXRpb24ua2V5cy5TUEFDRVxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHJldHVybiBTdHJpbmcga2V5IC0gU3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUga2V5IHByZXNzZWRcbiAgICovXG4gIHBhcnNlS2V5KGV2ZW50KSB7XG4gICAgdmFyIGtleSA9IGtleUNvZGVzW2V2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGVdIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQud2hpY2gpLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSBrZXkgPSBgU0hJRlRfJHtrZXl9YDtcbiAgICBpZiAoZXZlbnQuY3RybEtleSkga2V5ID0gYENUUkxfJHtrZXl9YDtcbiAgICBpZiAoZXZlbnQuYWx0S2V5KSBrZXkgPSBgQUxUXyR7a2V5fWA7XG4gICAgcmV0dXJuIGtleTtcbiAgfSxcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZ2l2ZW4gKGtleWJvYXJkKSBldmVudFxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50J3MgbmFtZSwgZS5nLiBTbGlkZXIgb3IgUmV2ZWFsXG4gICAqIEBwYXJhbSB7T2JqZWN0c30gZnVuY3Rpb25zIC0gY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgdGhhdCBhcmUgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGhhbmRsZUtleShldmVudCwgY29tcG9uZW50LCBmdW5jdGlvbnMpIHtcbiAgICB2YXIgY29tbWFuZExpc3QgPSBjb21tYW5kc1tjb21wb25lbnRdLFxuICAgICAga2V5Q29kZSA9IHRoaXMucGFyc2VLZXkoZXZlbnQpLFxuICAgICAgY21kcyxcbiAgICAgIGNvbW1hbmQsXG4gICAgICBmbjtcblxuICAgIGlmICghY29tbWFuZExpc3QpIHJldHVybiBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCBub3QgZGVmaW5lZCEnKTtcblxuICAgIGlmICh0eXBlb2YgY29tbWFuZExpc3QubHRyID09PSAndW5kZWZpbmVkJykgeyAvLyB0aGlzIGNvbXBvbmVudCBkb2VzIG5vdCBkaWZmZXJlbnRpYXRlIGJldHdlZW4gbHRyIGFuZCBydGxcbiAgICAgICAgY21kcyA9IGNvbW1hbmRMaXN0OyAvLyB1c2UgcGxhaW4gbGlzdFxuICAgIH0gZWxzZSB7IC8vIG1lcmdlIGx0ciBhbmQgcnRsOiBpZiBkb2N1bWVudCBpcyBydGwsIHJ0bCBvdmVyd3JpdGVzIGx0ciBhbmQgdmljZSB2ZXJzYVxuICAgICAgICBpZiAoRm91bmRhdGlvbi5ydGwoKSkgY21kcyA9ICQuZXh0ZW5kKHt9LCBjb21tYW5kTGlzdC5sdHIsIGNvbW1hbmRMaXN0LnJ0bCk7XG5cbiAgICAgICAgZWxzZSBjbWRzID0gJC5leHRlbmQoe30sIGNvbW1hbmRMaXN0LnJ0bCwgY29tbWFuZExpc3QubHRyKTtcbiAgICB9XG4gICAgY29tbWFuZCA9IGNtZHNba2V5Q29kZV07XG5cbiAgICBmbiA9IGZ1bmN0aW9uc1tjb21tYW5kXTtcbiAgICBpZiAoZm4gJiYgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7IC8vIGV4ZWN1dGUgZnVuY3Rpb24gIGlmIGV4aXN0c1xuICAgICAgdmFyIHJldHVyblZhbHVlID0gZm4uYXBwbHkoKTtcbiAgICAgIGlmIChmdW5jdGlvbnMuaGFuZGxlZCB8fCB0eXBlb2YgZnVuY3Rpb25zLmhhbmRsZWQgPT09ICdmdW5jdGlvbicpIHsgLy8gZXhlY3V0ZSBmdW5jdGlvbiB3aGVuIGV2ZW50IHdhcyBoYW5kbGVkXG4gICAgICAgICAgZnVuY3Rpb25zLmhhbmRsZWQocmV0dXJuVmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZnVuY3Rpb25zLnVuaGFuZGxlZCB8fCB0eXBlb2YgZnVuY3Rpb25zLnVuaGFuZGxlZCA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBleGVjdXRlIGZ1bmN0aW9uIHdoZW4gZXZlbnQgd2FzIG5vdCBoYW5kbGVkXG4gICAgICAgICAgZnVuY3Rpb25zLnVuaGFuZGxlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRmluZHMgYWxsIGZvY3VzYWJsZSBlbGVtZW50cyB3aXRoaW4gdGhlIGdpdmVuIGAkZWxlbWVudGBcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBzZWFyY2ggd2l0aGluXG4gICAqIEByZXR1cm4ge2pRdWVyeX0gJGZvY3VzYWJsZSAtIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIGAkZWxlbWVudGBcbiAgICovXG4gIGZpbmRGb2N1c2FibGUoJGVsZW1lbnQpIHtcbiAgICByZXR1cm4gJGVsZW1lbnQuZmluZCgnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgKlt0YWJpbmRleF0sICpbY29udGVudGVkaXRhYmxlXScpLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgIGlmICghJCh0aGlzKS5pcygnOnZpc2libGUnKSB8fCAkKHRoaXMpLmF0dHIoJ3RhYmluZGV4JykgPCAwKSB7IHJldHVybiBmYWxzZTsgfSAvL29ubHkgaGF2ZSB2aXNpYmxlIGVsZW1lbnRzIGFuZCB0aG9zZSB0aGF0IGhhdmUgYSB0YWJpbmRleCBncmVhdGVyIG9yIGVxdWFsIDBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgbmFtZSBuYW1lXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnQgLSBGb3VuZGF0aW9uIGNvbXBvbmVudCwgZS5nLiBTbGlkZXIgb3IgUmV2ZWFsXG4gICAqIEByZXR1cm4gU3RyaW5nIGNvbXBvbmVudE5hbWVcbiAgICovXG5cbiAgcmVnaXN0ZXIoY29tcG9uZW50TmFtZSwgY21kcykge1xuICAgIGNvbW1hbmRzW2NvbXBvbmVudE5hbWVdID0gY21kcztcbiAgfVxufVxuXG4vKlxuICogQ29uc3RhbnRzIGZvciBlYXNpZXIgY29tcGFyaW5nLlxuICogQ2FuIGJlIHVzZWQgbGlrZSBGb3VuZGF0aW9uLnBhcnNlS2V5KGV2ZW50KSA9PT0gRm91bmRhdGlvbi5rZXlzLlNQQUNFXG4gKi9cbmZ1bmN0aW9uIGdldEtleUNvZGVzKGtjcykge1xuICB2YXIgayA9IHt9O1xuICBmb3IgKHZhciBrYyBpbiBrY3MpIGtba2NzW2tjXV0gPSBrY3Nba2NdO1xuICByZXR1cm4gaztcbn1cblxuRm91bmRhdGlvbi5LZXlib2FyZCA9IEtleWJvYXJkO1xuXG59KGpRdWVyeSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbiFmdW5jdGlvbigkKSB7XG5cbkZvdW5kYXRpb24uQm94ID0ge1xuICBJbU5vdFRvdWNoaW5nWW91OiBJbU5vdFRvdWNoaW5nWW91LFxuICBHZXREaW1lbnNpb25zOiBHZXREaW1lbnNpb25zLFxuICBHZXRPZmZzZXRzOiBHZXRPZmZzZXRzXG59XG5cbi8qKlxuICogQ29tcGFyZXMgdGhlIGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudCB0byBhIGNvbnRhaW5lciBhbmQgZGV0ZXJtaW5lcyBjb2xsaXNpb24gZXZlbnRzIHdpdGggY29udGFpbmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gdGVzdCBmb3IgY29sbGlzaW9ucy5cbiAqIEBwYXJhbSB7alF1ZXJ5fSBwYXJlbnQgLSBqUXVlcnkgb2JqZWN0IHRvIHVzZSBhcyBib3VuZGluZyBjb250YWluZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGxyT25seSAtIHNldCB0byB0cnVlIHRvIGNoZWNrIGxlZnQgYW5kIHJpZ2h0IHZhbHVlcyBvbmx5LlxuICogQHBhcmFtIHtCb29sZWFufSB0Yk9ubHkgLSBzZXQgdG8gdHJ1ZSB0byBjaGVjayB0b3AgYW5kIGJvdHRvbSB2YWx1ZXMgb25seS5cbiAqIEBkZWZhdWx0IGlmIG5vIHBhcmVudCBvYmplY3QgcGFzc2VkLCBkZXRlY3RzIGNvbGxpc2lvbnMgd2l0aCBgd2luZG93YC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgY29sbGlzaW9uIGZyZWUsIGZhbHNlIGlmIGEgY29sbGlzaW9uIGluIGFueSBkaXJlY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIEltTm90VG91Y2hpbmdZb3UoZWxlbWVudCwgcGFyZW50LCBsck9ubHksIHRiT25seSkge1xuICB2YXIgZWxlRGltcyA9IEdldERpbWVuc2lvbnMoZWxlbWVudCksXG4gICAgICB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQ7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIHZhciBwYXJEaW1zID0gR2V0RGltZW5zaW9ucyhwYXJlbnQpO1xuXG4gICAgYm90dG9tID0gKGVsZURpbXMub2Zmc2V0LnRvcCArIGVsZURpbXMuaGVpZ2h0IDw9IHBhckRpbXMuaGVpZ2h0ICsgcGFyRGltcy5vZmZzZXQudG9wKTtcbiAgICB0b3AgICAgPSAoZWxlRGltcy5vZmZzZXQudG9wID49IHBhckRpbXMub2Zmc2V0LnRvcCk7XG4gICAgbGVmdCAgID0gKGVsZURpbXMub2Zmc2V0LmxlZnQgPj0gcGFyRGltcy5vZmZzZXQubGVmdCk7XG4gICAgcmlnaHQgID0gKGVsZURpbXMub2Zmc2V0LmxlZnQgKyBlbGVEaW1zLndpZHRoIDw9IHBhckRpbXMud2lkdGggKyBwYXJEaW1zLm9mZnNldC5sZWZ0KTtcbiAgfVxuICBlbHNlIHtcbiAgICBib3R0b20gPSAoZWxlRGltcy5vZmZzZXQudG9wICsgZWxlRGltcy5oZWlnaHQgPD0gZWxlRGltcy53aW5kb3dEaW1zLmhlaWdodCArIGVsZURpbXMud2luZG93RGltcy5vZmZzZXQudG9wKTtcbiAgICB0b3AgICAgPSAoZWxlRGltcy5vZmZzZXQudG9wID49IGVsZURpbXMud2luZG93RGltcy5vZmZzZXQudG9wKTtcbiAgICBsZWZ0ICAgPSAoZWxlRGltcy5vZmZzZXQubGVmdCA+PSBlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LmxlZnQpO1xuICAgIHJpZ2h0ICA9IChlbGVEaW1zLm9mZnNldC5sZWZ0ICsgZWxlRGltcy53aWR0aCA8PSBlbGVEaW1zLndpbmRvd0RpbXMud2lkdGgpO1xuICB9XG5cbiAgdmFyIGFsbERpcnMgPSBbYm90dG9tLCB0b3AsIGxlZnQsIHJpZ2h0XTtcblxuICBpZiAobHJPbmx5KSB7XG4gICAgcmV0dXJuIGxlZnQgPT09IHJpZ2h0ID09PSB0cnVlO1xuICB9XG5cbiAgaWYgKHRiT25seSkge1xuICAgIHJldHVybiB0b3AgPT09IGJvdHRvbSA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBhbGxEaXJzLmluZGV4T2YoZmFsc2UpID09PSAtMTtcbn07XG5cbi8qKlxuICogVXNlcyBuYXRpdmUgbWV0aG9kcyB0byByZXR1cm4gYW4gb2JqZWN0IG9mIGRpbWVuc2lvbiB2YWx1ZXMuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7alF1ZXJ5IHx8IEhUTUx9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IG9yIERPTSBlbGVtZW50IGZvciB3aGljaCB0byBnZXQgdGhlIGRpbWVuc2lvbnMuIENhbiBiZSBhbnkgZWxlbWVudCBvdGhlciB0aGF0IGRvY3VtZW50IG9yIHdpbmRvdy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IC0gbmVzdGVkIG9iamVjdCBvZiBpbnRlZ2VyIHBpeGVsIHZhbHVlc1xuICogVE9ETyAtIGlmIGVsZW1lbnQgaXMgd2luZG93LCByZXR1cm4gb25seSB0aG9zZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIEdldERpbWVuc2lvbnMoZWxlbSwgdGVzdCl7XG4gIGVsZW0gPSBlbGVtLmxlbmd0aCA/IGVsZW1bMF0gOiBlbGVtO1xuXG4gIGlmIChlbGVtID09PSB3aW5kb3cgfHwgZWxlbSA9PT0gZG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJJ20gc29ycnksIERhdmUuIEknbSBhZnJhaWQgSSBjYW4ndCBkbyB0aGF0LlwiKTtcbiAgfVxuXG4gIHZhciByZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHBhclJlY3QgPSBlbGVtLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB3aW5SZWN0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHdpblkgPSB3aW5kb3cucGFnZVlPZmZzZXQsXG4gICAgICB3aW5YID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodCxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHRvcDogcmVjdC50b3AgKyB3aW5ZLFxuICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luWFxuICAgIH0sXG4gICAgcGFyZW50RGltczoge1xuICAgICAgd2lkdGg6IHBhclJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IHBhclJlY3QuaGVpZ2h0LFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHRvcDogcGFyUmVjdC50b3AgKyB3aW5ZLFxuICAgICAgICBsZWZ0OiBwYXJSZWN0LmxlZnQgKyB3aW5YXG4gICAgICB9XG4gICAgfSxcbiAgICB3aW5kb3dEaW1zOiB7XG4gICAgICB3aWR0aDogd2luUmVjdC53aWR0aCxcbiAgICAgIGhlaWdodDogd2luUmVjdC5oZWlnaHQsXG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgdG9wOiB3aW5ZLFxuICAgICAgICBsZWZ0OiB3aW5YXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3Qgb2YgdG9wIGFuZCBsZWZ0IGludGVnZXIgcGl4ZWwgdmFsdWVzIGZvciBkeW5hbWljYWxseSByZW5kZXJlZCBlbGVtZW50cyxcbiAqIHN1Y2ggYXM6IFRvb2x0aXAsIFJldmVhbCwgYW5kIERyb3Bkb3duXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCBmb3IgdGhlIGVsZW1lbnQgYmVpbmcgcG9zaXRpb25lZC5cbiAqIEBwYXJhbSB7alF1ZXJ5fSBhbmNob3IgLSBqUXVlcnkgb2JqZWN0IGZvciB0aGUgZWxlbWVudCdzIGFuY2hvciBwb2ludC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwb3NpdGlvbiAtIGEgc3RyaW5nIHJlbGF0aW5nIHRvIHRoZSBkZXNpcmVkIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50LCByZWxhdGl2ZSB0byBpdCdzIGFuY2hvclxuICogQHBhcmFtIHtOdW1iZXJ9IHZPZmZzZXQgLSBpbnRlZ2VyIHBpeGVsIHZhbHVlIG9mIGRlc2lyZWQgdmVydGljYWwgc2VwYXJhdGlvbiBiZXR3ZWVuIGFuY2hvciBhbmQgZWxlbWVudC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBoT2Zmc2V0IC0gaW50ZWdlciBwaXhlbCB2YWx1ZSBvZiBkZXNpcmVkIGhvcml6b250YWwgc2VwYXJhdGlvbiBiZXR3ZWVuIGFuY2hvciBhbmQgZWxlbWVudC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNPdmVyZmxvdyAtIGlmIGEgY29sbGlzaW9uIGV2ZW50IGlzIGRldGVjdGVkLCBzZXRzIHRvIHRydWUgdG8gZGVmYXVsdCB0aGUgZWxlbWVudCB0byBmdWxsIHdpZHRoIC0gYW55IGRlc2lyZWQgb2Zmc2V0LlxuICogVE9ETyBhbHRlci9yZXdyaXRlIHRvIHdvcmsgd2l0aCBgZW1gIHZhbHVlcyBhcyB3ZWxsL2luc3RlYWQgb2YgcGl4ZWxzXG4gKi9cbmZ1bmN0aW9uIEdldE9mZnNldHMoZWxlbWVudCwgYW5jaG9yLCBwb3NpdGlvbiwgdk9mZnNldCwgaE9mZnNldCwgaXNPdmVyZmxvdykge1xuICB2YXIgJGVsZURpbXMgPSBHZXREaW1lbnNpb25zKGVsZW1lbnQpLFxuICAgICAgJGFuY2hvckRpbXMgPSBhbmNob3IgPyBHZXREaW1lbnNpb25zKGFuY2hvcikgOiBudWxsO1xuXG4gIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICBjYXNlICd0b3AnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogKEZvdW5kYXRpb24ucnRsKCkgPyAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCAtICRlbGVEaW1zLndpZHRoICsgJGFuY2hvckRpbXMud2lkdGggOiAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCksXG4gICAgICAgIHRvcDogJGFuY2hvckRpbXMub2Zmc2V0LnRvcCAtICgkZWxlRGltcy5oZWlnaHQgKyB2T2Zmc2V0KVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCAtICgkZWxlRGltcy53aWR0aCArIGhPZmZzZXQpLFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3BcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgJGFuY2hvckRpbXMud2lkdGggKyBoT2Zmc2V0LFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3BcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NlbnRlciB0b3AnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogKCRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgKCRhbmNob3JEaW1zLndpZHRoIC8gMikpIC0gKCRlbGVEaW1zLndpZHRoIC8gMiksXG4gICAgICAgIHRvcDogJGFuY2hvckRpbXMub2Zmc2V0LnRvcCAtICgkZWxlRGltcy5oZWlnaHQgKyB2T2Zmc2V0KVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY2VudGVyIGJvdHRvbSc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBpc092ZXJmbG93ID8gaE9mZnNldCA6ICgoJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgKyAoJGFuY2hvckRpbXMud2lkdGggLyAyKSkgLSAoJGVsZURpbXMud2lkdGggLyAyKSksXG4gICAgICAgIHRvcDogJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArICRhbmNob3JEaW1zLmhlaWdodCArIHZPZmZzZXRcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NlbnRlciBsZWZ0JzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0IC0gKCRlbGVEaW1zLndpZHRoICsgaE9mZnNldCksXG4gICAgICAgIHRvcDogKCRhbmNob3JEaW1zLm9mZnNldC50b3AgKyAoJGFuY2hvckRpbXMuaGVpZ2h0IC8gMikpIC0gKCRlbGVEaW1zLmhlaWdodCAvIDIpXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjZW50ZXIgcmlnaHQnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgKyAkYW5jaG9yRGltcy53aWR0aCArIGhPZmZzZXQgKyAxLFxuICAgICAgICB0b3A6ICgkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgKCRhbmNob3JEaW1zLmhlaWdodCAvIDIpKSAtICgkZWxlRGltcy5oZWlnaHQgLyAyKVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICgkZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC5sZWZ0ICsgKCRlbGVEaW1zLndpbmRvd0RpbXMud2lkdGggLyAyKSkgLSAoJGVsZURpbXMud2lkdGggLyAyKSxcbiAgICAgICAgdG9wOiAoJGVsZURpbXMud2luZG93RGltcy5vZmZzZXQudG9wICsgKCRlbGVEaW1zLndpbmRvd0RpbXMuaGVpZ2h0IC8gMikpIC0gKCRlbGVEaW1zLmhlaWdodCAvIDIpXG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZXZlYWwnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogKCRlbGVEaW1zLndpbmRvd0RpbXMud2lkdGggLSAkZWxlRGltcy53aWR0aCkgLyAyLFxuICAgICAgICB0b3A6ICRlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcCArIHZPZmZzZXRcbiAgICAgIH1cbiAgICBjYXNlICdyZXZlYWwgZnVsbCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAkZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC5sZWZ0LFxuICAgICAgICB0b3A6ICRlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcFxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGVmdCBib3R0b20nOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQsXG4gICAgICAgIHRvcDogJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArICRhbmNob3JEaW1zLmhlaWdodFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JpZ2h0IGJvdHRvbSc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCArICRhbmNob3JEaW1zLndpZHRoICsgaE9mZnNldCAtICRlbGVEaW1zLndpZHRoLFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3AgKyAkYW5jaG9yRGltcy5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogKEZvdW5kYXRpb24ucnRsKCkgPyAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCAtICRlbGVEaW1zLndpZHRoICsgJGFuY2hvckRpbXMud2lkdGggOiAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCArIGhPZmZzZXQpLFxuICAgICAgICB0b3A6ICRhbmNob3JEaW1zLm9mZnNldC50b3AgKyAkYW5jaG9yRGltcy5oZWlnaHQgKyB2T2Zmc2V0XG4gICAgICB9XG4gIH1cbn1cblxufShqUXVlcnkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4hZnVuY3Rpb24oJCkge1xuXG5jb25zdCBNdXRhdGlvbk9ic2VydmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByZWZpeGVzID0gWydXZWJLaXQnLCAnTW96JywgJ08nLCAnTXMnLCAnJ107XG4gIGZvciAodmFyIGk9MDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGAke3ByZWZpeGVzW2ldfU11dGF0aW9uT2JzZXJ2ZXJgIGluIHdpbmRvdykge1xuICAgICAgcmV0dXJuIHdpbmRvd1tgJHtwcmVmaXhlc1tpXX1NdXRhdGlvbk9ic2VydmVyYF07XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn0oKSk7XG5cbmNvbnN0IHRyaWdnZXJzID0gKGVsLCB0eXBlKSA9PiB7XG4gIGVsLmRhdGEodHlwZSkuc3BsaXQoJyAnKS5mb3JFYWNoKGlkID0+IHtcbiAgICAkKGAjJHtpZH1gKVsgdHlwZSA9PT0gJ2Nsb3NlJyA/ICd0cmlnZ2VyJyA6ICd0cmlnZ2VySGFuZGxlciddKGAke3R5cGV9LnpmLnRyaWdnZXJgLCBbZWxdKTtcbiAgfSk7XG59O1xuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1vcGVuXSB3aWxsIHJldmVhbCBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cbiQoZG9jdW1lbnQpLm9uKCdjbGljay56Zi50cmlnZ2VyJywgJ1tkYXRhLW9wZW5dJywgZnVuY3Rpb24oKSB7XG4gIHRyaWdnZXJzKCQodGhpcyksICdvcGVuJyk7XG59KTtcblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1jbG9zZV0gd2lsbCBjbG9zZSBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cbi8vIElmIHVzZWQgd2l0aG91dCBhIHZhbHVlIG9uIFtkYXRhLWNsb3NlXSwgdGhlIGV2ZW50IHdpbGwgYnViYmxlLCBhbGxvd2luZyBpdCB0byBjbG9zZSBhIHBhcmVudCBjb21wb25lbnQuXG4kKGRvY3VtZW50KS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1jbG9zZV0nLCBmdW5jdGlvbigpIHtcbiAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdjbG9zZScpO1xuICBpZiAoaWQpIHtcbiAgICB0cmlnZ2VycygkKHRoaXMpLCAnY2xvc2UnKTtcbiAgfVxuICBlbHNlIHtcbiAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlLnpmLnRyaWdnZXInKTtcbiAgfVxufSk7XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtdG9nZ2xlXSB3aWxsIHRvZ2dsZSBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cbiQoZG9jdW1lbnQpLm9uKCdjbGljay56Zi50cmlnZ2VyJywgJ1tkYXRhLXRvZ2dsZV0nLCBmdW5jdGlvbigpIHtcbiAgdHJpZ2dlcnMoJCh0aGlzKSwgJ3RvZ2dsZScpO1xufSk7XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2FibGVdIHdpbGwgcmVzcG9uZCB0byBjbG9zZS56Zi50cmlnZ2VyIGV2ZW50cy5cbiQoZG9jdW1lbnQpLm9uKCdjbG9zZS56Zi50cmlnZ2VyJywgJ1tkYXRhLWNsb3NhYmxlXScsIGZ1bmN0aW9uKGUpe1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBsZXQgYW5pbWF0aW9uID0gJCh0aGlzKS5kYXRhKCdjbG9zYWJsZScpO1xuXG4gIGlmKGFuaW1hdGlvbiAhPT0gJycpe1xuICAgIEZvdW5kYXRpb24uTW90aW9uLmFuaW1hdGVPdXQoJCh0aGlzKSwgYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykudHJpZ2dlcignY2xvc2VkLnpmJyk7XG4gICAgfSk7XG4gIH1lbHNle1xuICAgICQodGhpcykuZmFkZU91dCgpLnRyaWdnZXIoJ2Nsb3NlZC56ZicpO1xuICB9XG59KTtcblxuJChkb2N1bWVudCkub24oJ2ZvY3VzLnpmLnRyaWdnZXIgYmx1ci56Zi50cmlnZ2VyJywgJ1tkYXRhLXRvZ2dsZS1mb2N1c10nLCBmdW5jdGlvbigpIHtcbiAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCd0b2dnbGUtZm9jdXMnKTtcbiAgJChgIyR7aWR9YCkudHJpZ2dlckhhbmRsZXIoJ3RvZ2dsZS56Zi50cmlnZ2VyJywgWyQodGhpcyldKTtcbn0pO1xuXG4vKipcbiogRmlyZXMgb25jZSBhZnRlciBhbGwgb3RoZXIgc2NyaXB0cyBoYXZlIGxvYWRlZFxuKiBAZnVuY3Rpb25cbiogQHByaXZhdGVcbiovXG4kKHdpbmRvdykub24oJ2xvYWQnLCAoKSA9PiB7XG4gIGNoZWNrTGlzdGVuZXJzKCk7XG59KTtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcnMoKSB7XG4gIGV2ZW50c0xpc3RlbmVyKCk7XG4gIHJlc2l6ZUxpc3RlbmVyKCk7XG4gIHNjcm9sbExpc3RlbmVyKCk7XG4gIGNsb3NlbWVMaXN0ZW5lcigpO1xufVxuXG4vLyoqKioqKioqIG9ubHkgZmlyZXMgdGhpcyBmdW5jdGlvbiBvbmNlIG9uIGxvYWQsIGlmIHRoZXJlJ3Mgc29tZXRoaW5nIHRvIHdhdGNoICoqKioqKioqXG5mdW5jdGlvbiBjbG9zZW1lTGlzdGVuZXIocGx1Z2luTmFtZSkge1xuICB2YXIgeWV0aUJveGVzID0gJCgnW2RhdGEteWV0aS1ib3hdJyksXG4gICAgICBwbHVnTmFtZXMgPSBbJ2Ryb3Bkb3duJywgJ3Rvb2x0aXAnLCAncmV2ZWFsJ107XG5cbiAgaWYocGx1Z2luTmFtZSl7XG4gICAgaWYodHlwZW9mIHBsdWdpbk5hbWUgPT09ICdzdHJpbmcnKXtcbiAgICAgIHBsdWdOYW1lcy5wdXNoKHBsdWdpbk5hbWUpO1xuICAgIH1lbHNlIGlmKHR5cGVvZiBwbHVnaW5OYW1lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGx1Z2luTmFtZVswXSA9PT0gJ3N0cmluZycpe1xuICAgICAgcGx1Z05hbWVzLmNvbmNhdChwbHVnaW5OYW1lKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsdWdpbiBuYW1lcyBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gIH1cbiAgaWYoeWV0aUJveGVzLmxlbmd0aCl7XG4gICAgbGV0IGxpc3RlbmVycyA9IHBsdWdOYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICAgIHJldHVybiBgY2xvc2VtZS56Zi4ke25hbWV9YDtcbiAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAkKHdpbmRvdykub2ZmKGxpc3RlbmVycykub24obGlzdGVuZXJzLCBmdW5jdGlvbihlLCBwbHVnaW5JZCl7XG4gICAgICBsZXQgcGx1Z2luID0gZS5uYW1lc3BhY2Uuc3BsaXQoJy4nKVswXTtcbiAgICAgIGxldCBwbHVnaW5zID0gJChgW2RhdGEtJHtwbHVnaW59XWApLm5vdChgW2RhdGEteWV0aS1ib3g9XCIke3BsdWdpbklkfVwiXWApO1xuXG4gICAgICBwbHVnaW5zLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcblxuICAgICAgICBfdGhpcy50cmlnZ2VySGFuZGxlcignY2xvc2UuemYudHJpZ2dlcicsIFtfdGhpc10pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzaXplTGlzdGVuZXIoZGVib3VuY2Upe1xuICBsZXQgdGltZXIsXG4gICAgICAkbm9kZXMgPSAkKCdbZGF0YS1yZXNpemVdJyk7XG4gIGlmKCRub2Rlcy5sZW5ndGgpe1xuICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS56Zi50cmlnZ2VyJylcbiAgICAub24oJ3Jlc2l6ZS56Zi50cmlnZ2VyJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKHRpbWVyKSB7IGNsZWFyVGltZW91dCh0aW1lcik7IH1cblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpey8vZmFsbGJhY2sgZm9yIElFIDlcbiAgICAgICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcigncmVzaXplbWUuemYudHJpZ2dlcicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vdHJpZ2dlciBhbGwgbGlzdGVuaW5nIGVsZW1lbnRzIGFuZCBzaWduYWwgYSByZXNpemUgZXZlbnRcbiAgICAgICAgJG5vZGVzLmF0dHIoJ2RhdGEtZXZlbnRzJywgXCJyZXNpemVcIik7XG4gICAgICB9LCBkZWJvdW5jZSB8fCAxMCk7Ly9kZWZhdWx0IHRpbWUgdG8gZW1pdCByZXNpemUgZXZlbnRcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzY3JvbGxMaXN0ZW5lcihkZWJvdW5jZSl7XG4gIGxldCB0aW1lcixcbiAgICAgICRub2RlcyA9ICQoJ1tkYXRhLXNjcm9sbF0nKTtcbiAgaWYoJG5vZGVzLmxlbmd0aCl7XG4gICAgJCh3aW5kb3cpLm9mZignc2Nyb2xsLnpmLnRyaWdnZXInKVxuICAgIC5vbignc2Nyb2xsLnpmLnRyaWdnZXInLCBmdW5jdGlvbihlKXtcbiAgICAgIGlmKHRpbWVyKXsgY2xlYXJUaW1lb3V0KHRpbWVyKTsgfVxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblxuICAgICAgICBpZighTXV0YXRpb25PYnNlcnZlcil7Ly9mYWxsYmFjayBmb3IgSUUgOVxuICAgICAgICAgICRub2Rlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIHNjcm9sbCBldmVudFxuICAgICAgICAkbm9kZXMuYXR0cignZGF0YS1ldmVudHMnLCBcInNjcm9sbFwiKTtcbiAgICAgIH0sIGRlYm91bmNlIHx8IDEwKTsvL2RlZmF1bHQgdGltZSB0byBlbWl0IHNjcm9sbCBldmVudFxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50c0xpc3RlbmVyKCkge1xuICBpZighTXV0YXRpb25PYnNlcnZlcil7IHJldHVybiBmYWxzZTsgfVxuICBsZXQgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXNpemVdLCBbZGF0YS1zY3JvbGxdLCBbZGF0YS1tdXRhdGVdJyk7XG5cbiAgLy9lbGVtZW50IGNhbGxiYWNrXG4gIHZhciBsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uID0gZnVuY3Rpb24obXV0YXRpb25SZWNvcmRzTGlzdCkge1xuICAgIHZhciAkdGFyZ2V0ID0gJChtdXRhdGlvblJlY29yZHNMaXN0WzBdLnRhcmdldCk7XG4gICAgLy90cmlnZ2VyIHRoZSBldmVudCBoYW5kbGVyIGZvciB0aGUgZWxlbWVudCBkZXBlbmRpbmcgb24gdHlwZVxuICAgIHN3aXRjaCAoJHRhcmdldC5hdHRyKFwiZGF0YS1ldmVudHNcIikpIHtcblxuICAgICAgY2FzZSBcInJlc2l6ZVwiIDpcbiAgICAgICR0YXJnZXQudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCBbJHRhcmdldF0pO1xuICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJzY3JvbGxcIiA6XG4gICAgICAkdGFyZ2V0LnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXQsIHdpbmRvdy5wYWdlWU9mZnNldF0pO1xuICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGNhc2UgXCJtdXRhdGVcIiA6XG4gICAgICAvLyBjb25zb2xlLmxvZygnbXV0YXRlJywgJHRhcmdldCk7XG4gICAgICAvLyAkdGFyZ2V0LnRyaWdnZXJIYW5kbGVyKCdtdXRhdGUuemYudHJpZ2dlcicpO1xuICAgICAgLy9cbiAgICAgIC8vIC8vbWFrZSBzdXJlIHdlIGRvbid0IGdldCBzdHVjayBpbiBhbiBpbmZpbml0ZSBsb29wIGZyb20gc2xvcHB5IGNvZGVpbmdcbiAgICAgIC8vIGlmICgkdGFyZ2V0LmluZGV4KCdbZGF0YS1tdXRhdGVdJykgPT0gJChcIltkYXRhLW11dGF0ZV1cIikubGVuZ3RoLTEpIHtcbiAgICAgIC8vICAgZG9tTXV0YXRpb25PYnNlcnZlcigpO1xuICAgICAgLy8gfVxuICAgICAgLy8gYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQgOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy9ub3RoaW5nXG4gICAgfVxuICB9XG5cbiAgaWYobm9kZXMubGVuZ3RoKXtcbiAgICAvL2ZvciBlYWNoIGVsZW1lbnQgdGhhdCBuZWVkcyB0byBsaXN0ZW4gZm9yIHJlc2l6aW5nLCBzY3JvbGxpbmcsIChvciBjb21pbmcgc29vbiBtdXRhdGlvbikgYWRkIGEgc2luZ2xlIG9ic2VydmVyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbm9kZXMubGVuZ3RoLTE7IGkrKykge1xuICAgICAgbGV0IGVsZW1lbnRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGxpc3RlbmluZ0VsZW1lbnRzTXV0YXRpb24pO1xuICAgICAgZWxlbWVudE9ic2VydmVyLm9ic2VydmUobm9kZXNbaV0sIHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiBmYWxzZSwgY2hhcmFjdGVyRGF0YTogZmFsc2UsIHN1YnRyZWU6ZmFsc2UsIGF0dHJpYnV0ZUZpbHRlcjpbXCJkYXRhLWV2ZW50c1wiXX0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gW1BIXVxuLy8gRm91bmRhdGlvbi5DaGVja1dhdGNoZXJzID0gY2hlY2tXYXRjaGVycztcbkZvdW5kYXRpb24uSUhlYXJZb3UgPSBjaGVja0xpc3RlbmVycztcbi8vIEZvdW5kYXRpb24uSVNlZVlvdSA9IHNjcm9sbExpc3RlbmVyO1xuLy8gRm91bmRhdGlvbi5JRmVlbFlvdSA9IGNsb3NlbWVMaXN0ZW5lcjtcblxufShqUXVlcnkpO1xuXG4vLyBmdW5jdGlvbiBkb21NdXRhdGlvbk9ic2VydmVyKGRlYm91bmNlKSB7XG4vLyAgIC8vICEhISBUaGlzIGlzIGNvbWluZyBzb29uIGFuZCBuZWVkcyBtb3JlIHdvcms7IG5vdCBhY3RpdmUgICEhISAvL1xuLy8gICB2YXIgdGltZXIsXG4vLyAgIG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbXV0YXRlXScpO1xuLy8gICAvL1xuLy8gICBpZiAobm9kZXMubGVuZ3RoKSB7XG4vLyAgICAgLy8gdmFyIE11dGF0aW9uT2JzZXJ2ZXIgPSAoZnVuY3Rpb24gKCkge1xuLy8gICAgIC8vICAgdmFyIHByZWZpeGVzID0gWydXZWJLaXQnLCAnTW96JywgJ08nLCAnTXMnLCAnJ107XG4vLyAgICAgLy8gICBmb3IgKHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuLy8gICAgIC8vICAgICBpZiAocHJlZml4ZXNbaV0gKyAnTXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93KSB7XG4vLyAgICAgLy8gICAgICAgcmV0dXJuIHdpbmRvd1twcmVmaXhlc1tpXSArICdNdXRhdGlvbk9ic2VydmVyJ107XG4vLyAgICAgLy8gICAgIH1cbi8vICAgICAvLyAgIH1cbi8vICAgICAvLyAgIHJldHVybiBmYWxzZTtcbi8vICAgICAvLyB9KCkpO1xuLy9cbi8vXG4vLyAgICAgLy9mb3IgdGhlIGJvZHksIHdlIG5lZWQgdG8gbGlzdGVuIGZvciBhbGwgY2hhbmdlcyBlZmZlY3RpbmcgdGhlIHN0eWxlIGFuZCBjbGFzcyBhdHRyaWJ1dGVzXG4vLyAgICAgdmFyIGJvZHlPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGJvZHlNdXRhdGlvbik7XG4vLyAgICAgYm9keU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IGZhbHNlLCBzdWJ0cmVlOnRydWUsIGF0dHJpYnV0ZUZpbHRlcjpbXCJzdHlsZVwiLCBcImNsYXNzXCJdfSk7XG4vL1xuLy9cbi8vICAgICAvL2JvZHkgY2FsbGJhY2tcbi8vICAgICBmdW5jdGlvbiBib2R5TXV0YXRpb24obXV0YXRlKSB7XG4vLyAgICAgICAvL3RyaWdnZXIgYWxsIGxpc3RlbmluZyBlbGVtZW50cyBhbmQgc2lnbmFsIGEgbXV0YXRpb24gZXZlbnRcbi8vICAgICAgIGlmICh0aW1lcikgeyBjbGVhclRpbWVvdXQodGltZXIpOyB9XG4vL1xuLy8gICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICBib2R5T2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuLy8gICAgICAgICAkKCdbZGF0YS1tdXRhdGVdJykuYXR0cignZGF0YS1ldmVudHMnLFwibXV0YXRlXCIpO1xuLy8gICAgICAgfSwgZGVib3VuY2UgfHwgMTUwKTtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cbiIsIid1c2Ugc3RyaWN0JztcblxuIWZ1bmN0aW9uKCQpIHtcblxuLyoqXG4gKiBSZXZlYWwgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnJldmVhbFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5ib3hcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tb3Rpb24gaWYgdXNpbmcgYW5pbWF0aW9uc1xuICovXG5cbmNsYXNzIFJldmVhbCB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJldmVhbC5cbiAgICogQGNsYXNzXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byB1c2UgZm9yIHRoZSBtb2RhbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25hbCBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBSZXZlYWwuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBGb3VuZGF0aW9uLnJlZ2lzdGVyUGx1Z2luKHRoaXMsICdSZXZlYWwnKTtcbiAgICBGb3VuZGF0aW9uLktleWJvYXJkLnJlZ2lzdGVyKCdSZXZlYWwnLCB7XG4gICAgICAnRU5URVInOiAnb3BlbicsXG4gICAgICAnU1BBQ0UnOiAnb3BlbicsXG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJyxcbiAgICAgICdUQUInOiAndGFiX2ZvcndhcmQnLFxuICAgICAgJ1NISUZUX1RBQic6ICd0YWJfYmFja3dhcmQnXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1vZGFsIGJ5IGFkZGluZyB0aGUgb3ZlcmxheSBhbmQgY2xvc2UgYnV0dG9ucywgKGlmIHNlbGVjdGVkKS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuY2FjaGVkID0ge21xOiBGb3VuZGF0aW9uLk1lZGlhUXVlcnkuY3VycmVudH07XG4gICAgdGhpcy5pc01vYmlsZSA9IG1vYmlsZVNuaWZmKCk7XG5cbiAgICB0aGlzLiRhbmNob3IgPSAkKGBbZGF0YS1vcGVuPVwiJHt0aGlzLmlkfVwiXWApLmxlbmd0aCA/ICQoYFtkYXRhLW9wZW49XCIke3RoaXMuaWR9XCJdYCkgOiAkKGBbZGF0YS10b2dnbGU9XCIke3RoaXMuaWR9XCJdYCk7XG4gICAgdGhpcy4kYW5jaG9yLmF0dHIoe1xuICAgICAgJ2FyaWEtY29udHJvbHMnOiB0aGlzLmlkLFxuICAgICAgJ2FyaWEtaGFzcG9wdXAnOiB0cnVlLFxuICAgICAgJ3RhYmluZGV4JzogMFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mdWxsU2NyZWVuIHx8IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2Z1bGwnKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmZ1bGxTY3JlZW4gPSB0cnVlO1xuICAgICAgdGhpcy5vcHRpb25zLm92ZXJsYXkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5ICYmICF0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gdGhpcy5fbWFrZU92ZXJsYXkodGhpcy5pZCk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICAgJ3JvbGUnOiAnZGlhbG9nJyxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogdHJ1ZSxcbiAgICAgICAgJ2RhdGEteWV0aS1ib3gnOiB0aGlzLmlkLFxuICAgICAgICAnZGF0YS1yZXNpemUnOiB0aGlzLmlkXG4gICAgfSk7XG5cbiAgICBpZih0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmRldGFjaCgpLmFwcGVuZFRvKHRoaXMuJG92ZXJsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmRldGFjaCgpLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCd3aXRob3V0LW92ZXJsYXknKTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluayAmJiB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gKCBgIyR7dGhpcy5pZH1gKSkge1xuICAgICAgJCh3aW5kb3cpLm9uZSgnbG9hZC56Zi5yZXZlYWwnLCB0aGlzLm9wZW4uYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb3ZlcmxheSBkaXYgdG8gZGlzcGxheSBiZWhpbmQgdGhlIG1vZGFsLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21ha2VPdmVybGF5KGlkKSB7XG4gICAgdmFyICRvdmVybGF5ID0gJCgnPGRpdj48L2Rpdj4nKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3JldmVhbC1vdmVybGF5JylcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCdib2R5Jyk7XG4gICAgcmV0dXJuICRvdmVybGF5O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgcG9zaXRpb24gb2YgbW9kYWxcbiAgICogVE9ETzogIEZpZ3VyZSBvdXQgaWYgd2UgYWN0dWFsbHkgbmVlZCB0byBjYWNoZSB0aGVzZSB2YWx1ZXMgb3IgaWYgaXQgZG9lc24ndCBtYXR0ZXJcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF91cGRhdGVQb3NpdGlvbigpIHtcbiAgICB2YXIgd2lkdGggPSB0aGlzLiRlbGVtZW50Lm91dGVyV2lkdGgoKTtcbiAgICB2YXIgb3V0ZXJXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLiRlbGVtZW50Lm91dGVySGVpZ2h0KCk7XG4gICAgdmFyIG91dGVySGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgIHZhciBsZWZ0LCB0b3A7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oT2Zmc2V0ID09PSAnYXV0bycpIHtcbiAgICAgIGxlZnQgPSBwYXJzZUludCgob3V0ZXJXaWR0aCAtIHdpZHRoKSAvIDIsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVmdCA9IHBhcnNlSW50KHRoaXMub3B0aW9ucy5oT2Zmc2V0LCAxMCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudk9mZnNldCA9PT0gJ2F1dG8nKSB7XG4gICAgICBpZiAoaGVpZ2h0ID4gb3V0ZXJIZWlnaHQpIHtcbiAgICAgICAgdG9wID0gcGFyc2VJbnQoTWF0aC5taW4oMTAwLCBvdXRlckhlaWdodCAvIDEwKSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9wID0gcGFyc2VJbnQoKG91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDQsIDEwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdG9wID0gcGFyc2VJbnQodGhpcy5vcHRpb25zLnZPZmZzZXQsIDEwKTtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe3RvcDogdG9wICsgJ3B4J30pO1xuICAgIC8vIG9ubHkgd29ycnkgYWJvdXQgbGVmdCBpZiB3ZSBkb24ndCBoYXZlIGFuIG92ZXJsYXkgb3Igd2UgaGF2ZWEgIGhvcml6b250YWwgb2Zmc2V0LFxuICAgIC8vIG90aGVyd2lzZSB3ZSdyZSBwZXJmZWN0bHkgaW4gdGhlIG1pZGRsZVxuICAgIGlmKCF0aGlzLiRvdmVybGF5IHx8ICh0aGlzLm9wdGlvbnMuaE9mZnNldCAhPT0gJ2F1dG8nKSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3Moe2xlZnQ6IGxlZnQgKyAncHgnfSk7XG4gICAgICB0aGlzLiRlbGVtZW50LmNzcyh7bWFyZ2luOiAnMHB4J30pO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBtb2RhbC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQub24oe1xuICAgICAgJ29wZW4uemYudHJpZ2dlcic6IHRoaXMub3Blbi5iaW5kKHRoaXMpLFxuICAgICAgJ2Nsb3NlLnpmLnRyaWdnZXInOiAoZXZlbnQsICRlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmICgoZXZlbnQudGFyZ2V0ID09PSBfdGhpcy4kZWxlbWVudFswXSkgfHxcbiAgICAgICAgICAgICgkKGV2ZW50LnRhcmdldCkucGFyZW50cygnW2RhdGEtY2xvc2FibGVdJylbMF0gPT09ICRlbGVtZW50KSkgeyAvLyBvbmx5IGNsb3NlIHJldmVhbCB3aGVuIGl0J3MgZXhwbGljaXRseSBjYWxsZWRcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZS5hcHBseSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcyksXG4gICAgICAncmVzaXplbWUuemYudHJpZ2dlcic6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfdGhpcy5fdXBkYXRlUG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLiRhbmNob3IubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRhbmNob3Iub24oJ2tleWRvd24uemYucmV2ZWFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS53aGljaCA9PT0gMzIpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrICYmIHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5Lm9mZignLnpmLnJldmVhbCcpLm9uKCdjbGljay56Zi5yZXZlYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gX3RoaXMuJGVsZW1lbnRbMF0gfHwgXG4gICAgICAgICAgJC5jb250YWlucyhfdGhpcy4kZWxlbWVudFswXSwgZS50YXJnZXQpIHx8IFxuICAgICAgICAgICAgISQuY29udGFpbnMoZG9jdW1lbnQsIGUudGFyZ2V0KSkgeyBcbiAgICAgICAgICAgICAgcmV0dXJuOyBcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgICQod2luZG93KS5vbihgcG9wc3RhdGUuemYucmV2ZWFsOiR7dGhpcy5pZH1gLCB0aGlzLl9oYW5kbGVTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBtb2RhbCBtZXRob2RzIG9uIGJhY2svZm9yd2FyZCBidXR0b24gY2xpY2tzIG9yIGFueSBvdGhlciBldmVudCB0aGF0IHRyaWdnZXJzIHBvcHN0YXRlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2hhbmRsZVN0YXRlKGUpIHtcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gKCAnIycgKyB0aGlzLmlkKSAmJiAhdGhpcy5pc0FjdGl2ZSl7IHRoaXMub3BlbigpOyB9XG4gICAgZWxzZXsgdGhpcy5jbG9zZSgpOyB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgbW9kYWwgY29udHJvbGxlZCBieSBgdGhpcy4kYW5jaG9yYCwgYW5kIGNsb3NlcyBhbGwgb3RoZXJzIGJ5IGRlZmF1bHQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgUmV2ZWFsI2Nsb3NlbWVcbiAgICogQGZpcmVzIFJldmVhbCNvcGVuXG4gICAqL1xuICBvcGVuKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgIHZhciBoYXNoID0gYCMke3RoaXMuaWR9YDtcblxuICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgaGFzaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2g7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyBNYWtlIGVsZW1lbnRzIGludmlzaWJsZSwgYnV0IHJlbW92ZSBkaXNwbGF5OiBub25lIHNvIHdlIGNhbiBnZXQgc2l6ZSBhbmQgcG9zaXRpb25pbmdcbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nIH0pXG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuY3NzKHsndmlzaWJpbGl0eSc6ICdoaWRkZW4nfSkuc2hvdygpO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAuaGlkZSgpXG4gICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnJyB9KTtcblxuICAgIGlmKHRoaXMuJG92ZXJsYXkpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuY3NzKHsndmlzaWJpbGl0eSc6ICcnfSkuaGlkZSgpO1xuICAgICAgaWYodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFzdCcpKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ2Zhc3QnKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnc2xvdycpKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ3Nsb3cnKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGlmICghdGhpcy5vcHRpb25zLm11bHRpcGxlT3BlbmVkKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgbW9kYWwgb3BlbnMuXG4gICAgICAgKiBDbG9zZXMgYW55IG90aGVyIG1vZGFscyB0aGF0IGFyZSBjdXJyZW50bHkgb3BlblxuICAgICAgICogQGV2ZW50IFJldmVhbCNjbG9zZW1lXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2VtZS56Zi5yZXZlYWwnLCB0aGlzLmlkKTtcbiAgICB9XG4gICAgLy8gTW90aW9uIFVJIG1ldGhvZCBvZiByZXZlYWxcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbkluKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gYWZ0ZXJBbmltYXRpb25Gb2N1cygpe1xuICAgICAgICBfdGhpcy4kZWxlbWVudFxuICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6IGZhbHNlLFxuICAgICAgICAgICAgJ3RhYmluZGV4JzogLTFcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICAgIEZvdW5kYXRpb24uTW90aW9uLmFuaW1hdGVJbih0aGlzLiRvdmVybGF5LCAnZmFkZS1pbicpO1xuICAgICAgfVxuICAgICAgRm91bmRhdGlvbi5Nb3Rpb24uYW5pbWF0ZUluKHRoaXMuJGVsZW1lbnQsIHRoaXMub3B0aW9ucy5hbmltYXRpb25JbiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmZvY3VzYWJsZUVsZW1lbnRzID0gRm91bmRhdGlvbi5LZXlib2FyZC5maW5kRm9jdXNhYmxlKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICBhZnRlckFuaW1hdGlvbkZvY3VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8galF1ZXJ5IG1ldGhvZCBvZiByZXZlYWxcbiAgICBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coMCk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbGVtZW50LnNob3codGhpcy5vcHRpb25zLnNob3dEZWxheSk7XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGFjY2Vzc2liaWxpdHlcbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAuYXR0cih7XG4gICAgICAgICdhcmlhLWhpZGRlbic6IGZhbHNlLFxuICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgfSlcbiAgICAgIC5mb2N1cygpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgbW9kYWwgaGFzIHN1Y2Nlc3NmdWxseSBvcGVuZWQuXG4gICAgICogQGV2ZW50IFJldmVhbCNvcGVuXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdvcGVuLnpmLnJldmVhbCcpO1xuXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMub3JpZ2luYWxTY3JvbGxQb3MgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAkKCdodG1sLCBib2R5JykuYWRkQ2xhc3MoJ2lzLXJldmVhbC1vcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpcy1yZXZlYWwtb3BlbicpO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZXh0cmFIYW5kbGVycygpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXh0cmEgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBib2R5IGFuZCB3aW5kb3cgaWYgbmVjZXNzYXJ5LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V4dHJhSGFuZGxlcnMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLmZvY3VzYWJsZUVsZW1lbnRzID0gRm91bmRhdGlvbi5LZXlib2FyZC5maW5kRm9jdXNhYmxlKHRoaXMuJGVsZW1lbnQpO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMub3ZlcmxheSAmJiB0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrICYmICF0aGlzLm9wdGlvbnMuZnVsbFNjcmVlbikge1xuICAgICAgJCgnYm9keScpLm9uKCdjbGljay56Zi5yZXZlYWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gX3RoaXMuJGVsZW1lbnRbMF0gfHwgXG4gICAgICAgICAgJC5jb250YWlucyhfdGhpcy4kZWxlbWVudFswXSwgZS50YXJnZXQpIHx8IFxuICAgICAgICAgICAgISQuY29udGFpbnMoZG9jdW1lbnQsIGUudGFyZ2V0KSkgeyByZXR1cm47IH1cbiAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgJCh3aW5kb3cpLm9uKCdrZXlkb3duLnpmLnJldmVhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgRm91bmRhdGlvbi5LZXlib2FyZC5oYW5kbGVLZXkoZSwgJ1JldmVhbCcsIHtcbiAgICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5jbG9zZU9uRXNjKSB7XG4gICAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgIF90aGlzLiRhbmNob3IuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbG9jayBmb2N1cyB3aXRoaW4gbW9kYWwgd2hpbGUgdGFiYmluZ1xuICAgIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uemYucmV2ZWFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyICR0YXJnZXQgPSAkKHRoaXMpO1xuICAgICAgLy8gaGFuZGxlIGtleWJvYXJkIGV2ZW50IHdpdGgga2V5Ym9hcmQgdXRpbFxuICAgICAgRm91bmRhdGlvbi5LZXlib2FyZC5oYW5kbGVLZXkoZSwgJ1JldmVhbCcsIHtcbiAgICAgICAgdGFiX2ZvcndhcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLmZvY3VzYWJsZUVsZW1lbnRzID0gRm91bmRhdGlvbi5LZXlib2FyZC5maW5kRm9jdXNhYmxlKF90aGlzLiRlbGVtZW50KTtcbiAgICAgICAgICBpZiAoX3RoaXMuJGVsZW1lbnQuZmluZCgnOmZvY3VzJykuaXMoX3RoaXMuZm9jdXNhYmxlRWxlbWVudHMuZXEoLTEpKSkgeyAvLyBsZWZ0IG1vZGFsIGRvd253YXJkcywgc2V0dGluZyBmb2N1cyB0byBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgICBfdGhpcy5mb2N1c2FibGVFbGVtZW50cy5lcSgwKS5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChfdGhpcy5mb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPT09IDApIHsgLy8gbm8gZm9jdXNhYmxlIGVsZW1lbnRzIGluc2lkZSB0aGUgbW9kYWwgYXQgYWxsLCBwcmV2ZW50IHRhYmJpbmcgaW4gZ2VuZXJhbFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0YWJfYmFja3dhcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLmZvY3VzYWJsZUVsZW1lbnRzID0gRm91bmRhdGlvbi5LZXlib2FyZC5maW5kRm9jdXNhYmxlKF90aGlzLiRlbGVtZW50KTtcbiAgICAgICAgICBpZiAoX3RoaXMuJGVsZW1lbnQuZmluZCgnOmZvY3VzJykuaXMoX3RoaXMuZm9jdXNhYmxlRWxlbWVudHMuZXEoMCkpIHx8IF90aGlzLiRlbGVtZW50LmlzKCc6Zm9jdXMnKSkgeyAvLyBsZWZ0IG1vZGFsIHVwd2FyZHMsIHNldHRpbmcgZm9jdXMgdG8gbGFzdCBlbGVtZW50XG4gICAgICAgICAgICBfdGhpcy5mb2N1c2FibGVFbGVtZW50cy5lcSgtMSkuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoX3RoaXMuZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID09PSAwKSB7IC8vIG5vIGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgdGhlIG1vZGFsIGF0IGFsbCwgcHJldmVudCB0YWJiaW5nIGluIGdlbmVyYWxcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRlbGVtZW50LmZpbmQoJzpmb2N1cycpLmlzKF90aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLWNsb3NlXScpKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgLy8gc2V0IGZvY3VzIGJhY2sgdG8gYW5jaG9yIGlmIGNsb3NlIGJ1dHRvbiBoYXMgYmVlbiBhY3RpdmF0ZWRcbiAgICAgICAgICAgICAgX3RoaXMuJGFuY2hvci5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkdGFyZ2V0LmlzKF90aGlzLmZvY3VzYWJsZUVsZW1lbnRzKSkgeyAvLyBkb250J3QgdHJpZ2dlciBpZiBhY3VhbCBlbGVtZW50IGhhcyBmb2N1cyAoaS5lLiBpbnB1dHMsIGxpbmtzLCAuLi4pXG4gICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIF90aGlzLiRhbmNob3IuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZWQ6IGZ1bmN0aW9uKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIFJldmVhbCNjbG9zZWRcbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc0FjdGl2ZSB8fCAhdGhpcy4kZWxlbWVudC5pcygnOnZpc2libGUnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gTW90aW9uIFVJIG1ldGhvZCBvZiBoaWRpbmdcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbk91dCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICAgIEZvdW5kYXRpb24uTW90aW9uLmFuaW1hdGVPdXQodGhpcy4kb3ZlcmxheSwgJ2ZhZGUtb3V0JywgZmluaXNoVXApO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZpbmlzaFVwKCk7XG4gICAgICB9XG5cbiAgICAgIEZvdW5kYXRpb24uTW90aW9uLmFuaW1hdGVPdXQodGhpcy4kZWxlbWVudCwgdGhpcy5vcHRpb25zLmFuaW1hdGlvbk91dCk7XG4gICAgfVxuICAgIC8vIGpRdWVyeSBtZXRob2Qgb2YgaGlkaW5nXG4gICAgZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKDAsIGZpbmlzaFVwKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmaW5pc2hVcCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRlbGVtZW50LmhpZGUodGhpcy5vcHRpb25zLmhpZGVEZWxheSk7XG4gICAgfVxuXG4gICAgLy8gQ29uZGl0aW9uYWxzIHRvIHJlbW92ZSBleHRyYSBldmVudCBsaXN0ZW5lcnMgYWRkZWQgb24gb3BlblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgJCh3aW5kb3cpLm9mZigna2V5ZG93bi56Zi5yZXZlYWwnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5vdmVybGF5ICYmIHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2spIHtcbiAgICAgICQoJ2JvZHknKS5vZmYoJ2NsaWNrLnpmLnJldmVhbCcpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdrZXlkb3duLnpmLnJldmVhbCcpO1xuXG4gICAgZnVuY3Rpb24gZmluaXNoVXAoKSB7XG4gICAgICBpZiAoX3RoaXMuaXNNb2JpbGUpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLnJlbW92ZUNsYXNzKCdpcy1yZXZlYWwtb3BlbicpO1xuICAgICAgICBpZihfdGhpcy5vcmlnaW5hbFNjcm9sbFBvcykge1xuICAgICAgICAgICQoJ2JvZHknKS5zY3JvbGxUb3AoX3RoaXMub3JpZ2luYWxTY3JvbGxQb3MpO1xuICAgICAgICAgIF90aGlzLm9yaWdpbmFsU2Nyb2xsUG9zID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtcmV2ZWFsLW9wZW4nKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcblxuICAgICAgLyoqXG4gICAgICAqIEZpcmVzIHdoZW4gdGhlIG1vZGFsIGlzIGRvbmUgY2xvc2luZy5cbiAgICAgICogQGV2ZW50IFJldmVhbCNjbG9zZWRcbiAgICAgICovXG4gICAgICBfdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjbG9zZWQuemYucmV2ZWFsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBSZXNldHMgdGhlIG1vZGFsIGNvbnRlbnRcbiAgICAqIFRoaXMgcHJldmVudHMgYSBydW5uaW5nIHZpZGVvIHRvIGtlZXAgZ29pbmcgaW4gdGhlIGJhY2tncm91bmRcbiAgICAqL1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVzZXRPbkNsb3NlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lmh0bWwodGhpcy4kZWxlbWVudC5odG1sKCkpO1xuICAgIH1cblxuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgaWYgKF90aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgICBpZiAod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoXCJcIiwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgICAgfVxuICAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgb3Blbi9jbG9zZWQgc3RhdGUgb2YgYSBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBhIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZFRvKCQoJ2JvZHknKSk7IC8vIG1vdmUgJGVsZW1lbnQgb3V0c2lkZSBvZiAkb3ZlcmxheSB0byBwcmV2ZW50IGVycm9yIHVucmVnaXN0ZXJQbHVnaW4oKVxuICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCkub2ZmKCkucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpLm9mZigpO1xuICAgIHRoaXMuJGFuY2hvci5vZmYoJy56ZicpO1xuICAgICQod2luZG93KS5vZmYoYC56Zi5yZXZlYWw6JHt0aGlzLmlkfWApO1xuXG4gICAgRm91bmRhdGlvbi51bnJlZ2lzdGVyUGx1Z2luKHRoaXMpO1xuICB9O1xufVxuXG5SZXZlYWwuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBNb3Rpb24tVUkgY2xhc3MgdG8gdXNlIGZvciBhbmltYXRlZCBlbGVtZW50cy4gSWYgbm9uZSB1c2VkLCBkZWZhdWx0cyB0byBzaW1wbGUgc2hvdy9oaWRlLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlICdzbGlkZS1pbi1sZWZ0J1xuICAgKi9cbiAgYW5pbWF0aW9uSW46ICcnLFxuICAvKipcbiAgICogTW90aW9uLVVJIGNsYXNzIHRvIHVzZSBmb3IgYW5pbWF0ZWQgZWxlbWVudHMuIElmIG5vbmUgdXNlZCwgZGVmYXVsdHMgdG8gc2ltcGxlIHNob3cvaGlkZS5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSAnc2xpZGUtb3V0LXJpZ2h0J1xuICAgKi9cbiAgYW5pbWF0aW9uT3V0OiAnJyxcbiAgLyoqXG4gICAqIFRpbWUsIGluIG1zLCB0byBkZWxheSB0aGUgb3BlbmluZyBvZiBhIG1vZGFsIGFmdGVyIGEgY2xpY2sgaWYgbm8gYW5pbWF0aW9uIHVzZWQuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgMTBcbiAgICovXG4gIHNob3dEZWxheTogMCxcbiAgLyoqXG4gICAqIFRpbWUsIGluIG1zLCB0byBkZWxheSB0aGUgY2xvc2luZyBvZiBhIG1vZGFsIGFmdGVyIGEgY2xpY2sgaWYgbm8gYW5pbWF0aW9uIHVzZWQuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgMTBcbiAgICovXG4gIGhpZGVEZWxheTogMCxcbiAgLyoqXG4gICAqIEFsbG93cyBhIGNsaWNrIG9uIHRoZSBib2R5L292ZXJsYXkgdG8gY2xvc2UgdGhlIG1vZGFsLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIHRydWVcbiAgICovXG4gIGNsb3NlT25DbGljazogdHJ1ZSxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gY2xvc2UgaWYgdGhlIHVzZXIgcHJlc3NlcyB0aGUgYEVTQ0FQRWAga2V5LlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIHRydWVcbiAgICovXG4gIGNsb3NlT25Fc2M6IHRydWUsXG4gIC8qKlxuICAgKiBJZiB0cnVlLCBhbGxvd3MgbXVsdGlwbGUgbW9kYWxzIHRvIGJlIGRpc3BsYXllZCBhdCBvbmNlLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIGZhbHNlXG4gICAqL1xuICBtdWx0aXBsZU9wZW5lZDogZmFsc2UsXG4gIC8qKlxuICAgKiBEaXN0YW5jZSwgaW4gcGl4ZWxzLCB0aGUgbW9kYWwgc2hvdWxkIHB1c2ggZG93biBmcm9tIHRoZSB0b3Agb2YgdGhlIHNjcmVlbi5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSBhdXRvXG4gICAqL1xuICB2T2Zmc2V0OiAnYXV0bycsXG4gIC8qKlxuICAgKiBEaXN0YW5jZSwgaW4gcGl4ZWxzLCB0aGUgbW9kYWwgc2hvdWxkIHB1c2ggaW4gZnJvbSB0aGUgc2lkZSBvZiB0aGUgc2NyZWVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIGF1dG9cbiAgICovXG4gIGhPZmZzZXQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gYmUgZnVsbHNjcmVlbiwgY29tcGxldGVseSBibG9ja2luZyBvdXQgdGhlIHJlc3Qgb2YgdGhlIHZpZXcuIEpTIGNoZWNrcyBmb3IgdGhpcyBhcyB3ZWxsLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIGZhbHNlXG4gICAqL1xuICBmdWxsU2NyZWVuOiBmYWxzZSxcbiAgLyoqXG4gICAqIFBlcmNlbnRhZ2Ugb2Ygc2NyZWVuIGhlaWdodCB0aGUgbW9kYWwgc2hvdWxkIHB1c2ggdXAgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSB2aWV3LlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIDEwXG4gICAqL1xuICBidG1PZmZzZXRQY3Q6IDEwLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSBtb2RhbCB0byBnZW5lcmF0ZSBhbiBvdmVybGF5IGRpdiwgd2hpY2ggd2lsbCBjb3ZlciB0aGUgdmlldyB3aGVuIG1vZGFsIG9wZW5zLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIHRydWVcbiAgICovXG4gIG92ZXJsYXk6IHRydWUsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIHJlbW92ZSBhbmQgcmVpbmplY3QgbWFya3VwIG9uIGNsb3NlLiBTaG91bGQgYmUgdHJ1ZSBpZiB1c2luZyB2aWRlbyBlbGVtZW50cyB3L28gdXNpbmcgcHJvdmlkZXIncyBhcGksIG90aGVyd2lzZSwgdmlkZW9zIHdpbGwgY29udGludWUgdG8gcGxheSBpbiB0aGUgYmFja2dyb3VuZC5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSBmYWxzZVxuICAgKi9cbiAgcmVzZXRPbkNsb3NlOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gYWx0ZXIgdGhlIHVybCBvbiBvcGVuL2Nsb3NlLCBhbmQgYWxsb3dzIHRoZSB1c2Ugb2YgdGhlIGBiYWNrYCBidXR0b24gdG8gY2xvc2UgbW9kYWxzLiBBTFNPLCBhbGxvd3MgYSBtb2RhbCB0byBhdXRvLW1hbmlhY2FsbHkgb3BlbiBvbiBwYWdlIGxvYWQgSUYgdGhlIGhhc2ggPT09IHRoZSBtb2RhbCdzIHVzZXItc2V0IGlkLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIGZhbHNlXG4gICAqL1xuICBkZWVwTGluazogZmFsc2Vcbn07XG5cbi8vIFdpbmRvdyBleHBvcnRzXG5Gb3VuZGF0aW9uLnBsdWdpbihSZXZlYWwsICdSZXZlYWwnKTtcblxuZnVuY3Rpb24gaVBob25lU25pZmYoKSB7XG4gIHJldHVybiAvaVAoYWR8aG9uZXxvZCkuKk9TLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbn1cblxuZnVuY3Rpb24gYW5kcm9pZFNuaWZmKCkge1xuICByZXR1cm4gL0FuZHJvaWQvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xufVxuXG5mdW5jdGlvbiBtb2JpbGVTbmlmZigpIHtcbiAgcmV0dXJuIGlQaG9uZVNuaWZmKCkgfHwgYW5kcm9pZFNuaWZmKCk7XG59XG5cbn0oalF1ZXJ5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuIWZ1bmN0aW9uKCQpIHtcblxuLyoqXG4gKiBEcm9wZG93biBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uZHJvcGRvd25cbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuYm94XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKi9cblxuY2xhc3MgRHJvcGRvd24ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIGRyb3Bkb3duLlxuICAgKiBAY2xhc3NcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhIGRyb3Bkb3duLlxuICAgKiAgICAgICAgT2JqZWN0IHNob3VsZCBiZSBvZiB0aGUgZHJvcGRvd24gcGFuZWwsIHJhdGhlciB0aGFuIGl0cyBhbmNob3IuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRHJvcGRvd24uZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBGb3VuZGF0aW9uLnJlZ2lzdGVyUGx1Z2luKHRoaXMsICdEcm9wZG93bicpO1xuICAgIEZvdW5kYXRpb24uS2V5Ym9hcmQucmVnaXN0ZXIoJ0Ryb3Bkb3duJywge1xuICAgICAgJ0VOVEVSJzogJ29wZW4nLFxuICAgICAgJ1NQQUNFJzogJ29wZW4nLFxuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZScsXG4gICAgICAnVEFCJzogJ3RhYl9mb3J3YXJkJyxcbiAgICAgICdTSElGVF9UQUInOiAndGFiX2JhY2t3YXJkJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwbHVnaW4gYnkgc2V0dGluZy9jaGVja2luZyBvcHRpb25zIGFuZCBhdHRyaWJ1dGVzLCBhZGRpbmcgaGVscGVyIHZhcmlhYmxlcywgYW5kIHNhdmluZyB0aGUgYW5jaG9yLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciAkaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cbiAgICB0aGlzLiRhbmNob3IgPSAkKGBbZGF0YS10b2dnbGU9XCIkeyRpZH1cIl1gKS5sZW5ndGggPyAkKGBbZGF0YS10b2dnbGU9XCIkeyRpZH1cIl1gKSA6ICQoYFtkYXRhLW9wZW49XCIkeyRpZH1cIl1gKTtcbiAgICB0aGlzLiRhbmNob3IuYXR0cih7XG4gICAgICAnYXJpYS1jb250cm9scyc6ICRpZCxcbiAgICAgICdkYXRhLWlzLWZvY3VzJzogZmFsc2UsXG4gICAgICAnZGF0YS15ZXRpLWJveCc6ICRpZCxcbiAgICAgICdhcmlhLWhhc3BvcHVwJzogdHJ1ZSxcbiAgICAgICdhcmlhLWV4cGFuZGVkJzogZmFsc2VcblxuICAgIH0pO1xuXG4gICAgdGhpcy5vcHRpb25zLnBvc2l0aW9uQ2xhc3MgPSB0aGlzLmdldFBvc2l0aW9uQ2xhc3MoKTtcbiAgICB0aGlzLmNvdW50ZXIgPSA0O1xuICAgIHRoaXMudXNlZFBvc2l0aW9ucyA9IFtdO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7XG4gICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAnZGF0YS15ZXRpLWJveCc6ICRpZCxcbiAgICAgICdkYXRhLXJlc2l6ZSc6ICRpZCxcbiAgICAgICdhcmlhLWxhYmVsbGVkYnknOiB0aGlzLiRhbmNob3JbMF0uaWQgfHwgRm91bmRhdGlvbi5HZXRZb0RpZ2l0cyg2LCAnZGQtYW5jaG9yJylcbiAgICB9KTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGN1cnJlbnQgb3JpZW50YXRpb24gb2YgZHJvcGRvd24gcGFuZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHBvc2l0aW9uIC0gc3RyaW5nIHZhbHVlIG9mIGEgcG9zaXRpb24gY2xhc3MuXG4gICAqL1xuICBnZXRQb3NpdGlvbkNsYXNzKCkge1xuICAgIHZhciB2ZXJ0aWNhbFBvc2l0aW9uID0gdGhpcy4kZWxlbWVudFswXS5jbGFzc05hbWUubWF0Y2goLyh0b3B8bGVmdHxyaWdodHxib3R0b20pL2cpO1xuICAgICAgICB2ZXJ0aWNhbFBvc2l0aW9uID0gdmVydGljYWxQb3NpdGlvbiA/IHZlcnRpY2FsUG9zaXRpb25bMF0gOiAnJztcbiAgICB2YXIgaG9yaXpvbnRhbFBvc2l0aW9uID0gL2Zsb2F0LShcXFMrKS8uZXhlYyh0aGlzLiRhbmNob3JbMF0uY2xhc3NOYW1lKTtcbiAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gaG9yaXpvbnRhbFBvc2l0aW9uID8gaG9yaXpvbnRhbFBvc2l0aW9uWzFdIDogJyc7XG4gICAgdmFyIHBvc2l0aW9uID0gaG9yaXpvbnRhbFBvc2l0aW9uID8gaG9yaXpvbnRhbFBvc2l0aW9uICsgJyAnICsgdmVydGljYWxQb3NpdGlvbiA6IHZlcnRpY2FsUG9zaXRpb247XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogQWRqdXN0cyB0aGUgZHJvcGRvd24gcGFuZXMgb3JpZW50YXRpb24gYnkgYWRkaW5nL3JlbW92aW5nIHBvc2l0aW9uaW5nIGNsYXNzZXMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcG9zaXRpb24gLSBwb3NpdGlvbiBjbGFzcyB0byByZW1vdmUuXG4gICAqL1xuICBfcmVwb3NpdGlvbihwb3NpdGlvbikge1xuICAgIHRoaXMudXNlZFBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uID8gcG9zaXRpb24gOiAnYm90dG9tJyk7XG4gICAgLy9kZWZhdWx0LCB0cnkgc3dpdGNoaW5nIHRvIG9wcG9zaXRlIHNpZGVcbiAgICBpZighcG9zaXRpb24gJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCd0b3AnKSA8IDApKXtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3RvcCcpO1xuICAgIH1lbHNlIGlmKHBvc2l0aW9uID09PSAndG9wJyAmJiAodGhpcy51c2VkUG9zaXRpb25zLmluZGV4T2YoJ2JvdHRvbScpIDwgMCkpe1xuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhwb3NpdGlvbik7XG4gICAgfWVsc2UgaWYocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAodGhpcy51c2VkUG9zaXRpb25zLmluZGV4T2YoJ3JpZ2h0JykgPCAwKSl7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHBvc2l0aW9uKVxuICAgICAgICAgIC5hZGRDbGFzcygncmlnaHQnKTtcbiAgICB9ZWxzZSBpZihwb3NpdGlvbiA9PT0gJ3JpZ2h0JyAmJiAodGhpcy51c2VkUG9zaXRpb25zLmluZGV4T2YoJ2xlZnQnKSA8IDApKXtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MocG9zaXRpb24pXG4gICAgICAgICAgLmFkZENsYXNzKCdsZWZ0Jyk7XG4gICAgfVxuXG4gICAgLy9pZiBkZWZhdWx0IGNoYW5nZSBkaWRuJ3Qgd29yaywgdHJ5IGJvdHRvbSBvciBsZWZ0IGZpcnN0XG4gICAgZWxzZSBpZighcG9zaXRpb24gJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCd0b3AnKSA+IC0xKSAmJiAodGhpcy51c2VkUG9zaXRpb25zLmluZGV4T2YoJ2xlZnQnKSA8IDApKXtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2xlZnQnKTtcbiAgICB9ZWxzZSBpZihwb3NpdGlvbiA9PT0gJ3RvcCcgJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCdib3R0b20nKSA+IC0xKSAmJiAodGhpcy51c2VkUG9zaXRpb25zLmluZGV4T2YoJ2xlZnQnKSA8IDApKXtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MocG9zaXRpb24pXG4gICAgICAgICAgLmFkZENsYXNzKCdsZWZ0Jyk7XG4gICAgfWVsc2UgaWYocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAodGhpcy51c2VkUG9zaXRpb25zLmluZGV4T2YoJ3JpZ2h0JykgPiAtMSkgJiYgKHRoaXMudXNlZFBvc2l0aW9ucy5pbmRleE9mKCdib3R0b20nKSA8IDApKXtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MocG9zaXRpb24pO1xuICAgIH1lbHNlIGlmKHBvc2l0aW9uID09PSAncmlnaHQnICYmICh0aGlzLnVzZWRQb3NpdGlvbnMuaW5kZXhPZignbGVmdCcpID4gLTEpICYmICh0aGlzLnVzZWRQb3NpdGlvbnMuaW5kZXhPZignYm90dG9tJykgPCAwKSl7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHBvc2l0aW9uKTtcbiAgICB9XG4gICAgLy9pZiBub3RoaW5nIGNsZWFyZWQsIHNldCB0byBib3R0b21cbiAgICBlbHNle1xuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhwb3NpdGlvbik7XG4gICAgfVxuICAgIHRoaXMuY2xhc3NDaGFuZ2VkID0gdHJ1ZTtcbiAgICB0aGlzLmNvdW50ZXItLTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24gb2YgdGhlIGRyb3Bkb3duIHBhbmUsIGNoZWNrcyBmb3IgY29sbGlzaW9ucy5cbiAgICogUmVjdXJzaXZlbHkgY2FsbHMgaXRzZWxmIGlmIGEgY29sbGlzaW9uIGlzIGRldGVjdGVkLCB3aXRoIGEgbmV3IHBvc2l0aW9uIGNsYXNzLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRQb3NpdGlvbigpIHtcbiAgICBpZih0aGlzLiRhbmNob3IuYXR0cignYXJpYS1leHBhbmRlZCcpID09PSAnZmFsc2UnKXsgcmV0dXJuIGZhbHNlOyB9XG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkNsYXNzKCksXG4gICAgICAgICRlbGVEaW1zID0gRm91bmRhdGlvbi5Cb3guR2V0RGltZW5zaW9ucyh0aGlzLiRlbGVtZW50KSxcbiAgICAgICAgJGFuY2hvckRpbXMgPSBGb3VuZGF0aW9uLkJveC5HZXREaW1lbnNpb25zKHRoaXMuJGFuY2hvciksXG4gICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgZGlyZWN0aW9uID0gKHBvc2l0aW9uID09PSAnbGVmdCcgPyAnbGVmdCcgOiAoKHBvc2l0aW9uID09PSAncmlnaHQnKSA/ICdsZWZ0JyA6ICd0b3AnKSksXG4gICAgICAgIHBhcmFtID0gKGRpcmVjdGlvbiA9PT0gJ3RvcCcpID8gJ2hlaWdodCcgOiAnd2lkdGgnLFxuICAgICAgICBvZmZzZXQgPSAocGFyYW0gPT09ICdoZWlnaHQnKSA/IHRoaXMub3B0aW9ucy52T2Zmc2V0IDogdGhpcy5vcHRpb25zLmhPZmZzZXQ7XG5cblxuXG4gICAgaWYoKCRlbGVEaW1zLndpZHRoID49ICRlbGVEaW1zLndpbmRvd0RpbXMud2lkdGgpIHx8ICghdGhpcy5jb3VudGVyICYmICFGb3VuZGF0aW9uLkJveC5JbU5vdFRvdWNoaW5nWW91KHRoaXMuJGVsZW1lbnQpKSl7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZnNldChGb3VuZGF0aW9uLkJveC5HZXRPZmZzZXRzKHRoaXMuJGVsZW1lbnQsIHRoaXMuJGFuY2hvciwgJ2NlbnRlciBib3R0b20nLCB0aGlzLm9wdGlvbnMudk9mZnNldCwgdGhpcy5vcHRpb25zLmhPZmZzZXQsIHRydWUpKS5jc3Moe1xuICAgICAgICAnd2lkdGgnOiAkZWxlRGltcy53aW5kb3dEaW1zLndpZHRoIC0gKHRoaXMub3B0aW9ucy5oT2Zmc2V0ICogMiksXG4gICAgICAgICdoZWlnaHQnOiAnYXV0bydcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jbGFzc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQub2Zmc2V0KEZvdW5kYXRpb24uQm94LkdldE9mZnNldHModGhpcy4kZWxlbWVudCwgdGhpcy4kYW5jaG9yLCBwb3NpdGlvbiwgdGhpcy5vcHRpb25zLnZPZmZzZXQsIHRoaXMub3B0aW9ucy5oT2Zmc2V0KSk7XG5cbiAgICB3aGlsZSghRm91bmRhdGlvbi5Cb3guSW1Ob3RUb3VjaGluZ1lvdSh0aGlzLiRlbGVtZW50LCBmYWxzZSwgdHJ1ZSkgJiYgdGhpcy5jb3VudGVyKXtcbiAgICAgIHRoaXMuX3JlcG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgdGhpcy5fc2V0UG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGVsZW1lbnQgdXRpbGl6aW5nIHRoZSB0cmlnZ2VycyB1dGlsaXR5IGxpYnJhcnkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuJGVsZW1lbnQub24oe1xuICAgICAgJ29wZW4uemYudHJpZ2dlcic6IHRoaXMub3Blbi5iaW5kKHRoaXMpLFxuICAgICAgJ2Nsb3NlLnpmLnRyaWdnZXInOiB0aGlzLmNsb3NlLmJpbmQodGhpcyksXG4gICAgICAndG9nZ2xlLnpmLnRyaWdnZXInOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpLFxuICAgICAgJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInOiB0aGlzLl9zZXRQb3NpdGlvbi5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuaG92ZXIpe1xuICAgICAgdGhpcy4kYW5jaG9yLm9mZignbW91c2VlbnRlci56Zi5kcm9wZG93biBtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJylcbiAgICAgIC5vbignbW91c2VlbnRlci56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZigkKCdib2R5W2RhdGEtd2hhdGlucHV0PVwibW91c2VcIl0nKS5pcygnKicpKSB7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgICAgX3RoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFuY2hvci5kYXRhKCdob3ZlcicsIHRydWUpO1xuICAgICAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLm9uKCdtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgIF90aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgIF90aGlzLiRhbmNob3IuZGF0YSgnaG92ZXInLCBmYWxzZSk7XG4gICAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpO1xuICAgICAgICAgIH0pO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmhvdmVyUGFuZSl7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duIG1vdXNlbGVhdmUuemYuZHJvcGRvd24nKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlbGVhdmUuemYuZHJvcGRvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgIF90aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kYW5jaG9yLmRhdGEoJ2hvdmVyJywgZmFsc2UpO1xuICAgICAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuJGFuY2hvci5hZGQodGhpcy4kZWxlbWVudCkub24oJ2tleWRvd24uemYuZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIHZhciAkdGFyZ2V0ID0gJCh0aGlzKSxcbiAgICAgICAgdmlzaWJsZUZvY3VzYWJsZUVsZW1lbnRzID0gRm91bmRhdGlvbi5LZXlib2FyZC5maW5kRm9jdXNhYmxlKF90aGlzLiRlbGVtZW50KTtcblxuICAgICAgRm91bmRhdGlvbi5LZXlib2FyZC5oYW5kbGVLZXkoZSwgJ0Ryb3Bkb3duJywge1xuICAgICAgICB0YWJfZm9yd2FyZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRlbGVtZW50LmZpbmQoJzpmb2N1cycpLmlzKHZpc2libGVGb2N1c2FibGVFbGVtZW50cy5lcSgtMSkpKSB7IC8vIGxlZnQgbW9kYWwgZG93bndhcmRzLCBzZXR0aW5nIGZvY3VzIHRvIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLnRyYXBGb2N1cykgeyAvLyBpZiBmb2N1cyBzaGFsbCBiZSB0cmFwcGVkXG4gICAgICAgICAgICAgIHZpc2libGVGb2N1c2FibGVFbGVtZW50cy5lcSgwKS5mb2N1cygpO1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBpZiBmb2N1cyBpcyBub3QgdHJhcHBlZCwgY2xvc2UgZHJvcGRvd24gb24gZm9jdXMgb3V0XG4gICAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0YWJfYmFja3dhcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy4kZWxlbWVudC5maW5kKCc6Zm9jdXMnKS5pcyh2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHMuZXEoMCkpIHx8IF90aGlzLiRlbGVtZW50LmlzKCc6Zm9jdXMnKSkgeyAvLyBsZWZ0IG1vZGFsIHVwd2FyZHMsIHNldHRpbmcgZm9jdXMgdG8gbGFzdCBlbGVtZW50XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy50cmFwRm9jdXMpIHsgLy8gaWYgZm9jdXMgc2hhbGwgYmUgdHJhcHBlZFxuICAgICAgICAgICAgICB2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHMuZXEoLTEpLmZvY3VzKCk7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGlmIGZvY3VzIGlzIG5vdCB0cmFwcGVkLCBjbG9zZSBkcm9wZG93biBvbiBmb2N1cyBvdXRcbiAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKF90aGlzLiRhbmNob3IpKSB7XG4gICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICBfdGhpcy4kZWxlbWVudC5hdHRyKCd0YWJpbmRleCcsIC0xKS5mb2N1cygpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgX3RoaXMuJGFuY2hvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGJvZHkgdG8gY2xvc2UgYW55IGRyb3Bkb3ducyBvbiBhIGNsaWNrLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRCb2R5SGFuZGxlcigpIHtcbiAgICAgdmFyICRib2R5ID0gJChkb2N1bWVudC5ib2R5KS5ub3QodGhpcy4kZWxlbWVudCksXG4gICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICRib2R5Lm9mZignY2xpY2suemYuZHJvcGRvd24nKVxuICAgICAgICAgIC5vbignY2xpY2suemYuZHJvcGRvd24nLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKF90aGlzLiRhbmNob3IuaXMoZS50YXJnZXQpIHx8IF90aGlzLiRhbmNob3IuZmluZChlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF90aGlzLiRlbGVtZW50LmZpbmQoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgJGJvZHkub2ZmKCdjbGljay56Zi5kcm9wZG93bicpO1xuICAgICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBkcm9wZG93biBwYW5lLCBhbmQgZmlyZXMgYSBidWJibGluZyBldmVudCB0byBjbG9zZSBvdGhlciBkcm9wZG93bnMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJvcGRvd24jY2xvc2VtZVxuICAgKiBAZmlyZXMgRHJvcGRvd24jc2hvd1xuICAgKi9cbiAgb3BlbigpIHtcbiAgICAvLyB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKlxuICAgICAqIEZpcmVzIHRvIGNsb3NlIG90aGVyIG9wZW4gZHJvcGRvd25zXG4gICAgICogQGV2ZW50IERyb3Bkb3duI2Nsb3NlbWVcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlbWUuemYuZHJvcGRvd24nLCB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJykpO1xuICAgIHRoaXMuJGFuY2hvci5hZGRDbGFzcygnaG92ZXInKVxuICAgICAgICAuYXR0cih7J2FyaWEtZXhwYW5kZWQnOiB0cnVlfSk7XG4gICAgLy8gdGhpcy4kZWxlbWVudC8qLnNob3coKSovO1xuICAgIHRoaXMuX3NldFBvc2l0aW9uKCk7XG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgIC5hdHRyKHsnYXJpYS1oaWRkZW4nOiBmYWxzZX0pO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmF1dG9Gb2N1cyl7XG4gICAgICB2YXIgJGZvY3VzYWJsZSA9IEZvdW5kYXRpb24uS2V5Ym9hcmQuZmluZEZvY3VzYWJsZSh0aGlzLiRlbGVtZW50KTtcbiAgICAgIGlmKCRmb2N1c2FibGUubGVuZ3RoKXtcbiAgICAgICAgJGZvY3VzYWJsZS5lcSgwKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2speyB0aGlzLl9hZGRCb2R5SGFuZGxlcigpOyB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyBvbmNlIHRoZSBkcm9wZG93biBpcyB2aXNpYmxlLlxuICAgICAqIEBldmVudCBEcm9wZG93biNzaG93XG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzaG93LnpmLmRyb3Bkb3duJywgW3RoaXMuJGVsZW1lbnRdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG9wZW4gZHJvcGRvd24gcGFuZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcm9wZG93biNoaWRlXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZighdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgIC5hdHRyKHsnYXJpYS1oaWRkZW4nOiB0cnVlfSk7XG5cbiAgICB0aGlzLiRhbmNob3IucmVtb3ZlQ2xhc3MoJ2hvdmVyJylcbiAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG5cbiAgICBpZih0aGlzLmNsYXNzQ2hhbmdlZCl7XG4gICAgICB2YXIgY3VyUG9zaXRpb25DbGFzcyA9IHRoaXMuZ2V0UG9zaXRpb25DbGFzcygpO1xuICAgICAgaWYoY3VyUG9zaXRpb25DbGFzcyl7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoY3VyUG9zaXRpb25DbGFzcyk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5wb3NpdGlvbkNsYXNzKVxuICAgICAgICAgIC8qLmhpZGUoKSovLmNzcyh7aGVpZ2h0OiAnJywgd2lkdGg6ICcnfSk7XG4gICAgICB0aGlzLmNsYXNzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jb3VudGVyID0gNDtcbiAgICAgIHRoaXMudXNlZFBvc2l0aW9ucy5sZW5ndGggPSAwO1xuICAgIH1cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2hpZGUuemYuZHJvcGRvd24nLCBbdGhpcy4kZWxlbWVudF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGRyb3Bkb3duIHBhbmUncyB2aXNpYmlsaXR5LlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICBpZih0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpe1xuICAgICAgaWYodGhpcy4kYW5jaG9yLmRhdGEoJ2hvdmVyJykpIHJldHVybjtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgZHJvcGRvd24uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXInKS5oaWRlKCk7XG4gICAgdGhpcy4kYW5jaG9yLm9mZignLnpmLmRyb3Bkb3duJyk7XG5cbiAgICBGb3VuZGF0aW9uLnVucmVnaXN0ZXJQbHVnaW4odGhpcyk7XG4gIH1cbn1cblxuRHJvcGRvd24uZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBkZWxheSBvcGVuaW5nIGEgc3VibWVudSBvbiBob3ZlciBldmVudC5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSAyNTBcbiAgICovXG4gIGhvdmVyRGVsYXk6IDI1MCxcbiAgLyoqXG4gICAqIEFsbG93IHN1Ym1lbnVzIHRvIG9wZW4gb24gaG92ZXIgZXZlbnRzXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgZmFsc2VcbiAgICovXG4gIGhvdmVyOiBmYWxzZSxcbiAgLyoqXG4gICAqIERvbid0IGNsb3NlIGRyb3Bkb3duIHdoZW4gaG92ZXJpbmcgb3ZlciBkcm9wZG93biBwYW5lXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgdHJ1ZVxuICAgKi9cbiAgaG92ZXJQYW5lOiBmYWxzZSxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiB0aGUgZHJvcGRvd24gcGFuZSBhbmQgdGhlIHRyaWdnZXJpbmcgZWxlbWVudCBvbiBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIDFcbiAgICovXG4gIHZPZmZzZXQ6IDEsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gdGhlIGRyb3Bkb3duIHBhbmUgYW5kIHRoZSB0cmlnZ2VyaW5nIGVsZW1lbnQgb24gb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSAxXG4gICAqL1xuICBoT2Zmc2V0OiAxLFxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byBhZGp1c3Qgb3BlbiBwb3NpdGlvbi4gSlMgd2lsbCB0ZXN0IGFuZCBmaWxsIHRoaXMgaW4uXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgJ3RvcCdcbiAgICovXG4gIHBvc2l0aW9uQ2xhc3M6ICcnLFxuICAvKipcbiAgICogQWxsb3cgdGhlIHBsdWdpbiB0byB0cmFwIGZvY3VzIHRvIHRoZSBkcm9wZG93biBwYW5lIGlmIG9wZW5lZCB3aXRoIGtleWJvYXJkIGNvbW1hbmRzLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIGZhbHNlXG4gICAqL1xuICB0cmFwRm9jdXM6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgdGhlIHBsdWdpbiB0byBzZXQgZm9jdXMgdG8gdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50IHdpdGhpbiB0aGUgcGFuZSwgcmVnYXJkbGVzcyBvZiBtZXRob2Qgb2Ygb3BlbmluZy5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSB0cnVlXG4gICAqL1xuICBhdXRvRm9jdXM6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3dzIGEgY2xpY2sgb24gdGhlIGJvZHkgdG8gY2xvc2UgdGhlIGRyb3Bkb3duLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIGZhbHNlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2s6IGZhbHNlXG59XG5cbi8vIFdpbmRvdyBleHBvcnRzXG5Gb3VuZGF0aW9uLnBsdWdpbihEcm9wZG93biwgJ0Ryb3Bkb3duJyk7XG5cbn0oalF1ZXJ5KTtcbiIsIi8qIVxuICogc2tyb2xsciBjb3JlXG4gKlxuICogQWxleGFuZGVyIFByaW56aG9ybiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Qcmluemhvcm4vc2tyb2xsclxuICpcbiAqIEZyZWUgdG8gdXNlIHVuZGVyIHRlcm1zIG9mIE1JVCBsaWNlbnNlXG4gKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qXG5cdCAqIEdsb2JhbCBhcGkuXG5cdCAqL1xuXHR2YXIgc2tyb2xsciA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIF9pbnN0YW5jZTtcblx0XHR9LFxuXHRcdC8vTWFpbiBlbnRyeSBwb2ludC5cblx0XHRpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdFx0XHRyZXR1cm4gX2luc3RhbmNlIHx8IG5ldyBTa3JvbGxyKG9wdGlvbnMpO1xuXHRcdH0sXG5cdFx0VkVSU0lPTjogJzAuNi4yNidcblx0fTtcblxuXHQvL01pbmlmeSBvcHRpbWl6YXRpb24uXG5cdHZhciBoYXNQcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIE1hdGggPSB3aW5kb3cuTWF0aDtcblx0dmFyIGdldFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG5cblx0Ly9UaGV5IHdpbGwgYmUgZmlsbGVkIHdoZW4gc2tyb2xsciBnZXRzIGluaXRpYWxpemVkLlxuXHR2YXIgZG9jdW1lbnRFbGVtZW50O1xuXHR2YXIgYm9keTtcblxuXHR2YXIgRVZFTlRfVE9VQ0hTVEFSVCA9ICd0b3VjaHN0YXJ0Jztcblx0dmFyIEVWRU5UX1RPVUNITU9WRSA9ICd0b3VjaG1vdmUnO1xuXHR2YXIgRVZFTlRfVE9VQ0hDQU5DRUwgPSAndG91Y2hjYW5jZWwnO1xuXHR2YXIgRVZFTlRfVE9VQ0hFTkQgPSAndG91Y2hlbmQnO1xuXG5cdHZhciBTS1JPTExBQkxFX0NMQVNTID0gJ3Nrcm9sbGFibGUnO1xuXHR2YXIgU0tST0xMQUJMRV9CRUZPUkVfQ0xBU1MgPSBTS1JPTExBQkxFX0NMQVNTICsgJy1iZWZvcmUnO1xuXHR2YXIgU0tST0xMQUJMRV9CRVRXRUVOX0NMQVNTID0gU0tST0xMQUJMRV9DTEFTUyArICctYmV0d2Vlbic7XG5cdHZhciBTS1JPTExBQkxFX0FGVEVSX0NMQVNTID0gU0tST0xMQUJMRV9DTEFTUyArICctYWZ0ZXInO1xuXG5cdHZhciBTS1JPTExSX0NMQVNTID0gJ3Nrcm9sbHInO1xuXHR2YXIgTk9fU0tST0xMUl9DTEFTUyA9ICduby0nICsgU0tST0xMUl9DTEFTUztcblx0dmFyIFNLUk9MTFJfREVTS1RPUF9DTEFTUyA9IFNLUk9MTFJfQ0xBU1MgKyAnLWRlc2t0b3AnO1xuXHR2YXIgU0tST0xMUl9NT0JJTEVfQ0xBU1MgPSBTS1JPTExSX0NMQVNTICsgJy1tb2JpbGUnO1xuXG5cdHZhciBERUZBVUxUX0VBU0lORyA9ICdsaW5lYXInO1xuXHR2YXIgREVGQVVMVF9EVVJBVElPTiA9IDEwMDA7Ly9tc1xuXHR2YXIgREVGQVVMVF9NT0JJTEVfREVDRUxFUkFUSU9OID0gMC4wMDQ7Ly9waXhlbC9tc8KyXG5cblx0dmFyIERFRkFVTFRfU01PT1RIX1NDUk9MTElOR19EVVJBVElPTiA9IDIwMDsvL21zXG5cblx0dmFyIEFOQ0hPUl9TVEFSVCA9ICdzdGFydCc7XG5cdHZhciBBTkNIT1JfRU5EID0gJ2VuZCc7XG5cdHZhciBBTkNIT1JfQ0VOVEVSID0gJ2NlbnRlcic7XG5cdHZhciBBTkNIT1JfQk9UVE9NID0gJ2JvdHRvbSc7XG5cblx0Ly9UaGUgcHJvcGVydHkgd2hpY2ggd2lsbCBiZSBhZGRlZCB0byB0aGUgRE9NIGVsZW1lbnQgdG8gaG9sZCB0aGUgSUQgb2YgdGhlIHNrcm9sbGFibGUuXG5cdHZhciBTS1JPTExBQkxFX0lEX0RPTV9QUk9QRVJUWSA9ICdfX19za3JvbGxhYmxlX2lkJztcblxuXHR2YXIgcnhUb3VjaElnbm9yZVRhZ3MgPSAvXig/OmlucHV0fHRleHRhcmVhfGJ1dHRvbnxzZWxlY3QpJC9pO1xuXG5cdHZhciByeFRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuXHQvL0ZpbmQgYWxsIGRhdGEtYXR0cmlidXRlcy4gZGF0YS1bX2NvbnN0YW50XS1bb2Zmc2V0XS1bYW5jaG9yXS1bYW5jaG9yXS5cblx0dmFyIHJ4S2V5ZnJhbWVBdHRyaWJ1dGUgPSAvXmRhdGEoPzotKF9cXHcrKSk/KD86LT8oLT9cXGQqXFwuP1xcZCtwPykpPyg/Oi0/KHN0YXJ0fGVuZHx0b3B8Y2VudGVyfGJvdHRvbSkpPyg/Oi0/KHRvcHxjZW50ZXJ8Ym90dG9tKSk/JC87XG5cblx0dmFyIHJ4UHJvcFZhbHVlID0gL1xccyooQD9bXFx3XFwtXFxbXFxdXSspXFxzKjpcXHMqKC4rPylcXHMqKD86O3wkKS9naTtcblxuXHQvL0Vhc2luZyBmdW5jdGlvbiBuYW1lcyBmb2xsb3cgdGhlIHByb3BlcnR5IGluIHNxdWFyZSBicmFja2V0cy5cblx0dmFyIHJ4UHJvcEVhc2luZyA9IC9eKEA/W2EtelxcLV0rKVxcWyhcXHcrKVxcXSQvO1xuXG5cdHZhciByeENhbWVsQ2FzZSA9IC8tKFthLXowLTlfXSkvZztcblx0dmFyIHJ4Q2FtZWxDYXNlRm4gPSBmdW5jdGlvbihzdHIsIGxldHRlcikge1xuXHRcdHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcblx0fTtcblxuXHQvL051bWVyaWMgdmFsdWVzIHdpdGggb3B0aW9uYWwgc2lnbi5cblx0dmFyIHJ4TnVtZXJpY1ZhbHVlID0gL1tcXC0rXT9bXFxkXSpcXC4/W1xcZF0rL2c7XG5cblx0Ly9Vc2VkIHRvIHJlcGxhY2Ugb2NjdXJlbmNlcyBvZiB7P30gd2l0aCBhIG51bWJlci5cblx0dmFyIHJ4SW50ZXJwb2xhdGVTdHJpbmcgPSAvXFx7XFw/XFx9L2c7XG5cblx0Ly9GaW5kcyByZ2IoYSkgY29sb3JzLCB3aGljaCBkb24ndCB1c2UgdGhlIHBlcmNlbnRhZ2Ugbm90YXRpb24uXG5cdHZhciByeFJHQkFJbnRlZ2VyQ29sb3IgPSAvcmdiYT9cXChcXHMqLT9cXGQrXFxzKixcXHMqLT9cXGQrXFxzKixcXHMqLT9cXGQrL2c7XG5cblx0Ly9GaW5kcyBhbGwgZ3JhZGllbnRzLlxuXHR2YXIgcnhHcmFkaWVudCA9IC9bYS16XFwtXSstZ3JhZGllbnQvZztcblxuXHQvL1ZlbmRvciBwcmVmaXguIFdpbGwgYmUgc2V0IG9uY2Ugc2tyb2xsciBnZXRzIGluaXRpYWxpemVkLlxuXHR2YXIgdGhlQ1NTUHJlZml4ID0gJyc7XG5cdHZhciB0aGVEYXNoZWRDU1NQcmVmaXggPSAnJztcblxuXHQvL1dpbGwgYmUgY2FsbGVkIG9uY2UgKHdoZW4gc2tyb2xsciBnZXRzIGluaXRpYWxpemVkKS5cblx0dmFyIGRldGVjdENTU1ByZWZpeCA9IGZ1bmN0aW9uKCkge1xuXHRcdC8vT25seSByZWxldmFudCBwcmVmaXhlcy4gTWF5IGJlIGV4dGVuZGVkLlxuXHRcdC8vQ291bGQgYmUgZGFuZ2Vyb3VzIGlmIHRoZXJlIHdpbGwgZXZlciBiZSBhIENTUyBwcm9wZXJ0eSB3aGljaCBhY3R1YWxseSBzdGFydHMgd2l0aCBcIm1zXCIuIERvbid0IGhvcGUgc28uXG5cdFx0dmFyIHJ4UHJlZml4ZXMgPSAvXig/Ok98TW96fHdlYmtpdHxtcyl8KD86LSg/Om98bW96fHdlYmtpdHxtcyktKS87XG5cblx0XHQvL0RldGVjdCBwcmVmaXggZm9yIGN1cnJlbnQgYnJvd3NlciBieSBmaW5kaW5nIHRoZSBmaXJzdCBwcm9wZXJ0eSB1c2luZyBhIHByZWZpeC5cblx0XHRpZighZ2V0U3R5bGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgc3R5bGUgPSBnZXRTdHlsZShib2R5LCBudWxsKTtcblxuXHRcdGZvcih2YXIgayBpbiBzdHlsZSkge1xuXHRcdFx0Ly9XZSBjaGVjayB0aGUga2V5IGFuZCBpZiB0aGUga2V5IGlzIGEgbnVtYmVyLCB3ZSBjaGVjayB0aGUgdmFsdWUgYXMgd2VsbCwgYmVjYXVzZSBzYWZhcmkncyBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgc29tZSB3ZWlyZCBhcnJheS1saWtlIHRoaW5neS5cblx0XHRcdHRoZUNTU1ByZWZpeCA9IChrLm1hdGNoKHJ4UHJlZml4ZXMpIHx8ICgrayA9PSBrICYmIHN0eWxlW2tdLm1hdGNoKHJ4UHJlZml4ZXMpKSk7XG5cblx0XHRcdGlmKHRoZUNTU1ByZWZpeCkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvL0RpZCB3ZSBldmVuIGRldGVjdCBhIHByZWZpeD9cblx0XHRpZighdGhlQ1NTUHJlZml4KSB7XG5cdFx0XHR0aGVDU1NQcmVmaXggPSB0aGVEYXNoZWRDU1NQcmVmaXggPSAnJztcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoZUNTU1ByZWZpeCA9IHRoZUNTU1ByZWZpeFswXTtcblxuXHRcdC8vV2UgY291bGQgaGF2ZSBkZXRlY3RlZCBlaXRoZXIgYSBkYXNoZWQgcHJlZml4IG9yIHRoaXMgY2FtZWxDYXNlaXNoLWluY29uc2lzdGVudCBzdHVmZi5cblx0XHRpZih0aGVDU1NQcmVmaXguc2xpY2UoMCwxKSA9PT0gJy0nKSB7XG5cdFx0XHR0aGVEYXNoZWRDU1NQcmVmaXggPSB0aGVDU1NQcmVmaXg7XG5cblx0XHRcdC8vVGhlcmUncyBubyBsb2dpYyBiZWhpbmQgdGhlc2UuIE5lZWQgYSBsb29rIHVwLlxuXHRcdFx0dGhlQ1NTUHJlZml4ID0gKHtcblx0XHRcdFx0Jy13ZWJraXQtJzogJ3dlYmtpdCcsXG5cdFx0XHRcdCctbW96LSc6ICdNb3onLFxuXHRcdFx0XHQnLW1zLSc6ICdtcycsXG5cdFx0XHRcdCctby0nOiAnTydcblx0XHRcdH0pW3RoZUNTU1ByZWZpeF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoZURhc2hlZENTU1ByZWZpeCA9ICctJyArIHRoZUNTU1ByZWZpeC50b0xvd2VyQ2FzZSgpICsgJy0nO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgcG9seWZpbGxSQUYgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgcmVxdWVzdEFuaW1GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93W3RoZUNTU1ByZWZpeC50b0xvd2VyQ2FzZSgpICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXG5cdFx0dmFyIGxhc3RUaW1lID0gX25vdygpO1xuXG5cdFx0aWYoX2lzTW9iaWxlIHx8ICFyZXF1ZXN0QW5pbUZyYW1lKSB7XG5cdFx0XHRyZXF1ZXN0QW5pbUZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdFx0Ly9Ib3cgbG9uZyBkaWQgaXQgdGFrZSB0byByZW5kZXI/XG5cdFx0XHRcdHZhciBkZWx0YVRpbWUgPSBfbm93KCkgLSBsYXN0VGltZTtcblx0XHRcdFx0dmFyIGRlbGF5ID0gTWF0aC5tYXgoMCwgMTAwMCAvIDYwIC0gZGVsdGFUaW1lKTtcblxuXHRcdFx0XHRyZXR1cm4gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0bGFzdFRpbWUgPSBfbm93KCk7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fSwgZGVsYXkpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVxdWVzdEFuaW1GcmFtZTtcblx0fTtcblxuXHR2YXIgcG9seWZpbGxDQUYgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgY2FuY2VsQW5pbUZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvd1t0aGVDU1NQcmVmaXgudG9Mb3dlckNhc2UoKSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddO1xuXG5cdFx0aWYoX2lzTW9iaWxlIHx8ICFjYW5jZWxBbmltRnJhbWUpIHtcblx0XHRcdGNhbmNlbEFuaW1GcmFtZSA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcblx0XHRcdFx0cmV0dXJuIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiBjYW5jZWxBbmltRnJhbWU7XG5cdH07XG5cblx0Ly9CdWlsdC1pbiBlYXNpbmcgZnVuY3Rpb25zLlxuXHR2YXIgZWFzaW5ncyA9IHtcblx0XHRiZWdpbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9LFxuXHRcdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9LFxuXHRcdGxpbmVhcjogZnVuY3Rpb24ocCkge1xuXHRcdFx0cmV0dXJuIHA7XG5cdFx0fSxcblx0XHRxdWFkcmF0aWM6IGZ1bmN0aW9uKHApIHtcblx0XHRcdHJldHVybiBwICogcDtcblx0XHR9LFxuXHRcdGN1YmljOiBmdW5jdGlvbihwKSB7XG5cdFx0XHRyZXR1cm4gcCAqIHAgKiBwO1xuXHRcdH0sXG5cdFx0c3dpbmc6IGZ1bmN0aW9uKHApIHtcblx0XHRcdHJldHVybiAoLU1hdGguY29zKHAgKiBNYXRoLlBJKSAvIDIpICsgMC41O1xuXHRcdH0sXG5cdFx0c3FydDogZnVuY3Rpb24ocCkge1xuXHRcdFx0cmV0dXJuIE1hdGguc3FydChwKTtcblx0XHR9LFxuXHRcdG91dEN1YmljOiBmdW5jdGlvbihwKSB7XG5cdFx0XHRyZXR1cm4gKE1hdGgucG93KChwIC0gMSksIDMpICsgMSk7XG5cdFx0fSxcblx0XHQvL3NlZSBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvdGJyMjBzOHZkMiBmb3IgaG93IEkgZGlkIHRoaXNcblx0XHRib3VuY2U6IGZ1bmN0aW9uKHApIHtcblx0XHRcdHZhciBhO1xuXG5cdFx0XHRpZihwIDw9IDAuNTA4Mykge1xuXHRcdFx0XHRhID0gMztcblx0XHRcdH0gZWxzZSBpZihwIDw9IDAuODQ4OSkge1xuXHRcdFx0XHRhID0gOTtcblx0XHRcdH0gZWxzZSBpZihwIDw9IDAuOTYyMDgpIHtcblx0XHRcdFx0YSA9IDI3O1xuXHRcdFx0fSBlbHNlIGlmKHAgPD0gMC45OTk4MSkge1xuXHRcdFx0XHRhID0gOTE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmFicygzICogTWF0aC5jb3MocCAqIGEgKiAxLjAyOCkgLyBhKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yLlxuXHQgKi9cblx0ZnVuY3Rpb24gU2tyb2xscihvcHRpb25zKSB7XG5cdFx0ZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG5cdFx0ZGV0ZWN0Q1NTUHJlZml4KCk7XG5cblx0XHRfaW5zdGFuY2UgPSB0aGlzO1xuXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHRfY29uc3RhbnRzID0gb3B0aW9ucy5jb25zdGFudHMgfHwge307XG5cblx0XHQvL1dlIGFsbG93IGRlZmluaW5nIGN1c3RvbSBlYXNpbmdzIG9yIG92ZXJ3cml0ZSBleGlzdGluZy5cblx0XHRpZihvcHRpb25zLmVhc2luZykge1xuXHRcdFx0Zm9yKHZhciBlIGluIG9wdGlvbnMuZWFzaW5nKSB7XG5cdFx0XHRcdGVhc2luZ3NbZV0gPSBvcHRpb25zLmVhc2luZ1tlXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRfZWRnZVN0cmF0ZWd5ID0gb3B0aW9ucy5lZGdlU3RyYXRlZ3kgfHwgJ3NldCc7XG5cblx0XHRfbGlzdGVuZXJzID0ge1xuXHRcdFx0Ly9GdW5jdGlvbiB0byBiZSBjYWxsZWQgcmlnaHQgYmVmb3JlIHJlbmRlcmluZy5cblx0XHRcdGJlZm9yZXJlbmRlcjogb3B0aW9ucy5iZWZvcmVyZW5kZXIsXG5cblx0XHRcdC8vRnVuY3Rpb24gdG8gYmUgY2FsbGVkIHJpZ2h0IGFmdGVyIGZpbmlzaGluZyByZW5kZXJpbmcuXG5cdFx0XHRyZW5kZXI6IG9wdGlvbnMucmVuZGVyLFxuXG5cdFx0XHQvL0Z1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuZXZlciBhbiBlbGVtZW50IHdpdGggdGhlIGBkYXRhLWVtaXQtZXZlbnRzYCBhdHRyaWJ1dGUgcGFzc2VzIGEga2V5ZnJhbWUuXG5cdFx0XHRrZXlmcmFtZTogb3B0aW9ucy5rZXlmcmFtZVxuXHRcdH07XG5cblx0XHQvL2ZvcmNlSGVpZ2h0IGlzIHRydWUgYnkgZGVmYXVsdFxuXHRcdF9mb3JjZUhlaWdodCA9IG9wdGlvbnMuZm9yY2VIZWlnaHQgIT09IGZhbHNlO1xuXG5cdFx0aWYoX2ZvcmNlSGVpZ2h0KSB7XG5cdFx0XHRfc2NhbGUgPSBvcHRpb25zLnNjYWxlIHx8IDE7XG5cdFx0fVxuXG5cdFx0X21vYmlsZURlY2VsZXJhdGlvbiA9IG9wdGlvbnMubW9iaWxlRGVjZWxlcmF0aW9uIHx8IERFRkFVTFRfTU9CSUxFX0RFQ0VMRVJBVElPTjtcblxuXHRcdF9zbW9vdGhTY3JvbGxpbmdFbmFibGVkID0gb3B0aW9ucy5zbW9vdGhTY3JvbGxpbmcgIT09IGZhbHNlO1xuXHRcdF9zbW9vdGhTY3JvbGxpbmdEdXJhdGlvbiA9IG9wdGlvbnMuc21vb3RoU2Nyb2xsaW5nRHVyYXRpb24gfHwgREVGQVVMVF9TTU9PVEhfU0NST0xMSU5HX0RVUkFUSU9OO1xuXG5cdFx0Ly9EdW1teSBvYmplY3QuIFdpbGwgYmUgb3ZlcndyaXR0ZW4gaW4gdGhlIF9yZW5kZXIgbWV0aG9kIHdoZW4gc21vb3RoIHNjcm9sbGluZyBpcyBjYWxjdWxhdGVkLlxuXHRcdF9zbW9vdGhTY3JvbGxpbmcgPSB7XG5cdFx0XHR0YXJnZXRUb3A6IF9pbnN0YW5jZS5nZXRTY3JvbGxUb3AoKVxuXHRcdH07XG5cblx0XHQvL0EgY3VzdG9tIGNoZWNrIGZ1bmN0aW9uIG1heSBiZSBwYXNzZWQuXG5cdFx0X2lzTW9iaWxlID0gKChvcHRpb25zLm1vYmlsZUNoZWNrIHx8IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuICgvQW5kcm9pZHxpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaSkudGVzdChuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhKTtcblx0XHR9KSgpKTtcblxuXHRcdGlmKF9pc01vYmlsZSkge1xuXHRcdFx0X3Nrcm9sbHJCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nrcm9sbHItYm9keScpO1xuXG5cdFx0XHQvL0RldGVjdCAzZCB0cmFuc2Zvcm0gaWYgdGhlcmUncyBhIHNrcm9sbHItYm9keSAob25seSBuZWVkZWQgZm9yICNza3JvbGxyLWJvZHkpLlxuXHRcdFx0aWYoX3Nrcm9sbHJCb2R5KSB7XG5cdFx0XHRcdF9kZXRlY3QzRFRyYW5zZm9ybXMoKTtcblx0XHRcdH1cblxuXHRcdFx0X2luaXRNb2JpbGUoKTtcblx0XHRcdF91cGRhdGVDbGFzcyhkb2N1bWVudEVsZW1lbnQsIFtTS1JPTExSX0NMQVNTLCBTS1JPTExSX01PQklMRV9DTEFTU10sIFtOT19TS1JPTExSX0NMQVNTXSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdF91cGRhdGVDbGFzcyhkb2N1bWVudEVsZW1lbnQsIFtTS1JPTExSX0NMQVNTLCBTS1JPTExSX0RFU0tUT1BfQ0xBU1NdLCBbTk9fU0tST0xMUl9DTEFTU10pO1xuXHRcdH1cblxuXHRcdC8vVHJpZ2dlcnMgcGFyc2luZyBvZiBlbGVtZW50cyBhbmQgYSBmaXJzdCByZWZsb3cuXG5cdFx0X2luc3RhbmNlLnJlZnJlc2goKTtcblxuXHRcdF9hZGRFdmVudCh3aW5kb3csICdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB3aWR0aCA9IGRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcblx0XHRcdHZhciBoZWlnaHQgPSBkb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG5cdFx0XHQvL09ubHkgcmVmbG93IGlmIHRoZSBzaXplIGFjdHVhbGx5IGNoYW5nZWQgKCMyNzEpLlxuXHRcdFx0aWYoaGVpZ2h0ICE9PSBfbGFzdFZpZXdwb3J0SGVpZ2h0IHx8IHdpZHRoICE9PSBfbGFzdFZpZXdwb3J0V2lkdGgpIHtcblx0XHRcdFx0X2xhc3RWaWV3cG9ydEhlaWdodCA9IGhlaWdodDtcblx0XHRcdFx0X2xhc3RWaWV3cG9ydFdpZHRoID0gd2lkdGg7XG5cblx0XHRcdFx0X3JlcXVlc3RSZWZsb3cgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dmFyIHJlcXVlc3RBbmltRnJhbWUgPSBwb2x5ZmlsbFJBRigpO1xuXG5cdFx0Ly9MZXQncyBnby5cblx0XHQoZnVuY3Rpb24gYW5pbWxvb3AoKXtcblx0XHRcdF9yZW5kZXIoKTtcblx0XHRcdF9hbmltRnJhbWUgPSByZXF1ZXN0QW5pbUZyYW1lKGFuaW1sb29wKTtcblx0XHR9KCkpO1xuXG5cdFx0cmV0dXJuIF9pbnN0YW5jZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAoUmUpcGFyc2VzIHNvbWUgb3IgYWxsIGVsZW1lbnRzLlxuXHQgKi9cblx0U2tyb2xsci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uKGVsZW1lbnRzKSB7XG5cdFx0dmFyIGVsZW1lbnRJbmRleDtcblx0XHR2YXIgZWxlbWVudHNMZW5ndGg7XG5cdFx0dmFyIGlnbm9yZUlEID0gZmFsc2U7XG5cblx0XHQvL0NvbXBsZXRlbHkgcmVwYXJzZSBhbnl0aGluZyB3aXRob3V0IGFyZ3VtZW50LlxuXHRcdGlmKGVsZW1lbnRzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vSWdub3JlIHRoYXQgc29tZSBlbGVtZW50cyBtYXkgYWxyZWFkeSBoYXZlIGEgc2tyb2xsYWJsZSBJRC5cblx0XHRcdGlnbm9yZUlEID0gdHJ1ZTtcblxuXHRcdFx0X3Nrcm9sbGFibGVzID0gW107XG5cdFx0XHRfc2tyb2xsYWJsZUlkQ291bnRlciA9IDA7XG5cblx0XHRcdGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcblx0XHR9IGVsc2UgaWYoZWxlbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vV2UgYWxzbyBhY2NlcHQgYSBzaW5nbGUgZWxlbWVudCBhcyBwYXJhbWV0ZXIuXG5cdFx0XHRlbGVtZW50cyA9IFtlbGVtZW50c107XG5cdFx0fVxuXG5cdFx0ZWxlbWVudEluZGV4ID0gMDtcblx0XHRlbGVtZW50c0xlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdGZvcig7IGVsZW1lbnRJbmRleCA8IGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuXHRcdFx0dmFyIGVsID0gZWxlbWVudHNbZWxlbWVudEluZGV4XTtcblx0XHRcdHZhciBhbmNob3JUYXJnZXQgPSBlbDtcblx0XHRcdHZhciBrZXlGcmFtZXMgPSBbXTtcblxuXHRcdFx0Ly9JZiB0aGlzIHBhcnRpY3VsYXIgZWxlbWVudCBzaG91bGQgYmUgc21vb3RoIHNjcm9sbGVkLlxuXHRcdFx0dmFyIHNtb290aFNjcm9sbFRoaXMgPSBfc21vb3RoU2Nyb2xsaW5nRW5hYmxlZDtcblxuXHRcdFx0Ly9UaGUgZWRnZSBzdHJhdGVneSBmb3IgdGhpcyBwYXJ0aWN1bGFyIGVsZW1lbnQuXG5cdFx0XHR2YXIgZWRnZVN0cmF0ZWd5ID0gX2VkZ2VTdHJhdGVneTtcblxuXHRcdFx0Ly9JZiB0aGlzIHBhcnRpY3VsYXIgZWxlbWVudCBzaG91bGQgZW1pdCBrZXlmcmFtZSBldmVudHMuXG5cdFx0XHR2YXIgZW1pdEV2ZW50cyA9IGZhbHNlO1xuXG5cdFx0XHQvL0lmIHdlJ3JlIHJlc2V0aW5nIHRoZSBjb3VudGVyLCByZW1vdmUgYW55IG9sZCBlbGVtZW50IGlkcyB0aGF0IG1heSBiZSBoYW5naW5nIGFyb3VuZC5cblx0XHRcdGlmKGlnbm9yZUlEICYmIFNLUk9MTEFCTEVfSURfRE9NX1BST1BFUlRZIGluIGVsKSB7XG5cdFx0XHRcdGRlbGV0ZSBlbFtTS1JPTExBQkxFX0lEX0RPTV9QUk9QRVJUWV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKCFlbC5hdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvL0l0ZXJhdGUgb3ZlciBhbGwgYXR0cmlidXRlcyBhbmQgc2VhcmNoIGZvciBrZXkgZnJhbWUgYXR0cmlidXRlcy5cblx0XHRcdHZhciBhdHRyaWJ1dGVJbmRleCA9IDA7XG5cdFx0XHR2YXIgYXR0cmlidXRlc0xlbmd0aCA9IGVsLmF0dHJpYnV0ZXMubGVuZ3RoO1xuXG5cdFx0XHRmb3IgKDsgYXR0cmlidXRlSW5kZXggPCBhdHRyaWJ1dGVzTGVuZ3RoOyBhdHRyaWJ1dGVJbmRleCsrKSB7XG5cdFx0XHRcdHZhciBhdHRyID0gZWwuYXR0cmlidXRlc1thdHRyaWJ1dGVJbmRleF07XG5cblx0XHRcdFx0aWYoYXR0ci5uYW1lID09PSAnZGF0YS1hbmNob3ItdGFyZ2V0Jykge1xuXHRcdFx0XHRcdGFuY2hvclRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXR0ci52YWx1ZSk7XG5cblx0XHRcdFx0XHRpZihhbmNob3JUYXJnZXQgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdHRocm93ICdVbmFibGUgdG8gZmluZCBhbmNob3IgdGFyZ2V0IFwiJyArIGF0dHIudmFsdWUgKyAnXCInO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9HbG9iYWwgc21vb3RoIHNjcm9sbGluZyBjYW4gYmUgb3ZlcnJpZGRlbiBieSB0aGUgZWxlbWVudCBhdHRyaWJ1dGUuXG5cdFx0XHRcdGlmKGF0dHIubmFtZSA9PT0gJ2RhdGEtc21vb3RoLXNjcm9sbGluZycpIHtcblx0XHRcdFx0XHRzbW9vdGhTY3JvbGxUaGlzID0gYXR0ci52YWx1ZSAhPT0gJ29mZic7XG5cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vR2xvYmFsIGVkZ2Ugc3RyYXRlZ3kgY2FuIGJlIG92ZXJyaWRkZW4gYnkgdGhlIGVsZW1lbnQgYXR0cmlidXRlLlxuXHRcdFx0XHRpZihhdHRyLm5hbWUgPT09ICdkYXRhLWVkZ2Utc3RyYXRlZ3knKSB7XG5cdFx0XHRcdFx0ZWRnZVN0cmF0ZWd5ID0gYXR0ci52YWx1ZTtcblxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9JcyB0aGlzIGVsZW1lbnQgdGFnZ2VkIHdpdGggdGhlIGBkYXRhLWVtaXQtZXZlbnRzYCBhdHRyaWJ1dGU/XG5cdFx0XHRcdGlmKGF0dHIubmFtZSA9PT0gJ2RhdGEtZW1pdC1ldmVudHMnKSB7XG5cdFx0XHRcdFx0ZW1pdEV2ZW50cyA9IHRydWU7XG5cblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBtYXRjaCA9IGF0dHIubmFtZS5tYXRjaChyeEtleWZyYW1lQXR0cmlidXRlKTtcblxuXHRcdFx0XHRpZihtYXRjaCA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGtmID0ge1xuXHRcdFx0XHRcdHByb3BzOiBhdHRyLnZhbHVlLFxuXHRcdFx0XHRcdC8vUG9pbnQgYmFjayB0byB0aGUgZWxlbWVudCBhcyB3ZWxsLlxuXHRcdFx0XHRcdGVsZW1lbnQ6IGVsLFxuXHRcdFx0XHRcdC8vVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHdoaWNoIHRoaXMga2V5ZnJhbWUgd2lsbCBmaXJlLCBpZiBlbWl0RXZlbnRzIGlzXG5cdFx0XHRcdFx0ZXZlbnRUeXBlOiBhdHRyLm5hbWUucmVwbGFjZShyeENhbWVsQ2FzZSwgcnhDYW1lbENhc2VGbilcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRrZXlGcmFtZXMucHVzaChrZik7XG5cblx0XHRcdFx0dmFyIGNvbnN0YW50ID0gbWF0Y2hbMV07XG5cblx0XHRcdFx0aWYoY29uc3RhbnQpIHtcblx0XHRcdFx0XHQvL1N0cmlwIHRoZSB1bmRlcnNjb3JlIHByZWZpeC5cblx0XHRcdFx0XHRrZi5jb25zdGFudCA9IGNvbnN0YW50LnN1YnN0cigxKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vR2V0IHRoZSBrZXkgZnJhbWUgb2Zmc2V0LlxuXHRcdFx0XHR2YXIgb2Zmc2V0ID0gbWF0Y2hbMl07XG5cblx0XHRcdFx0Ly9JcyBpdCBhIHBlcmNlbnRhZ2Ugb2Zmc2V0P1xuXHRcdFx0XHRpZigvcCQvLnRlc3Qob2Zmc2V0KSkge1xuXHRcdFx0XHRcdGtmLmlzUGVyY2VudGFnZSA9IHRydWU7XG5cdFx0XHRcdFx0a2Yub2Zmc2V0ID0gKG9mZnNldC5zbGljZSgwLCAtMSkgfCAwKSAvIDEwMDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRrZi5vZmZzZXQgPSAob2Zmc2V0IHwgMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgYW5jaG9yMSA9IG1hdGNoWzNdO1xuXG5cdFx0XHRcdC8vSWYgc2Vjb25kIGFuY2hvciBpcyBub3Qgc2V0LCB0aGUgZmlyc3Qgd2lsbCBiZSB0YWtlbiBmb3IgYm90aC5cblx0XHRcdFx0dmFyIGFuY2hvcjIgPSBtYXRjaFs0XSB8fCBhbmNob3IxO1xuXG5cdFx0XHRcdC8vXCJhYnNvbHV0ZVwiIChvciBcImNsYXNzaWNcIikgbW9kZSwgd2hlcmUgbnVtYmVycyBtZWFuIGFic29sdXRlIHNjcm9sbCBvZmZzZXQuXG5cdFx0XHRcdGlmKCFhbmNob3IxIHx8IGFuY2hvcjEgPT09IEFOQ0hPUl9TVEFSVCB8fCBhbmNob3IxID09PSBBTkNIT1JfRU5EKSB7XG5cdFx0XHRcdFx0a2YubW9kZSA9ICdhYnNvbHV0ZSc7XG5cblx0XHRcdFx0XHQvL2RhdGEtZW5kIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQgYWZ0ZXIgYWxsIGtleSBmcmFtZXMgYXJlIGtub3duLlxuXHRcdFx0XHRcdGlmKGFuY2hvcjEgPT09IEFOQ0hPUl9FTkQpIHtcblx0XHRcdFx0XHRcdGtmLmlzRW5kID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2UgaWYoIWtmLmlzUGVyY2VudGFnZSkge1xuXHRcdFx0XHRcdFx0Ly9Gb3IgZGF0YS1zdGFydCB3ZSBjYW4gYWxyZWFkeSBzZXQgdGhlIGtleSBmcmFtZSB3L28gY2FsY3VsYXRpb25zLlxuXHRcdFx0XHRcdFx0Ly8jNTk6IFwic2NhbGVcIiBvcHRpb25zIHNob3VsZCBvbmx5IGFmZmVjdCBhYnNvbHV0ZSBtb2RlLlxuXHRcdFx0XHRcdFx0a2Yub2Zmc2V0ID0ga2Yub2Zmc2V0ICogX3NjYWxlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvL1wicmVsYXRpdmVcIiBtb2RlLCB3aGVyZSBudW1iZXJzIGFyZSByZWxhdGl2ZSB0byBhbmNob3JzLlxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRrZi5tb2RlID0gJ3JlbGF0aXZlJztcblx0XHRcdFx0XHRrZi5hbmNob3JzID0gW2FuY2hvcjEsIGFuY2hvcjJdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vRG9lcyB0aGlzIGVsZW1lbnQgaGF2ZSBrZXkgZnJhbWVzP1xuXHRcdFx0aWYoIWtleUZyYW1lcy5sZW5ndGgpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vV2lsbCBob2xkIHRoZSBvcmlnaW5hbCBzdHlsZSBhbmQgY2xhc3MgYXR0cmlidXRlcyBiZWZvcmUgd2UgY29udHJvbGxlZCB0aGUgZWxlbWVudCAoc2VlICM4MCkuXG5cdFx0XHR2YXIgc3R5bGVBdHRyLCBjbGFzc0F0dHI7XG5cblx0XHRcdHZhciBpZDtcblxuXHRcdFx0aWYoIWlnbm9yZUlEICYmIFNLUk9MTEFCTEVfSURfRE9NX1BST1BFUlRZIGluIGVsKSB7XG5cdFx0XHRcdC8vV2UgYWxyZWFkeSBoYXZlIHRoaXMgZWxlbWVudCB1bmRlciBjb250cm9sLiBHcmFiIHRoZSBjb3JyZXNwb25kaW5nIHNrcm9sbGFibGUgaWQuXG5cdFx0XHRcdGlkID0gZWxbU0tST0xMQUJMRV9JRF9ET01fUFJPUEVSVFldO1xuXHRcdFx0XHRzdHlsZUF0dHIgPSBfc2tyb2xsYWJsZXNbaWRdLnN0eWxlQXR0cjtcblx0XHRcdFx0Y2xhc3NBdHRyID0gX3Nrcm9sbGFibGVzW2lkXS5jbGFzc0F0dHI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvL0l0J3MgYW4gdW5rbm93biBlbGVtZW50LiBBc2lnbiBpdCBhIG5ldyBza3JvbGxhYmxlIGlkLlxuXHRcdFx0XHRpZCA9IChlbFtTS1JPTExBQkxFX0lEX0RPTV9QUk9QRVJUWV0gPSBfc2tyb2xsYWJsZUlkQ291bnRlcisrKTtcblx0XHRcdFx0c3R5bGVBdHRyID0gZWwuc3R5bGUuY3NzVGV4dDtcblx0XHRcdFx0Y2xhc3NBdHRyID0gX2dldENsYXNzKGVsKTtcblx0XHRcdH1cblxuXHRcdFx0X3Nrcm9sbGFibGVzW2lkXSA9IHtcblx0XHRcdFx0ZWxlbWVudDogZWwsXG5cdFx0XHRcdHN0eWxlQXR0cjogc3R5bGVBdHRyLFxuXHRcdFx0XHRjbGFzc0F0dHI6IGNsYXNzQXR0cixcblx0XHRcdFx0YW5jaG9yVGFyZ2V0OiBhbmNob3JUYXJnZXQsXG5cdFx0XHRcdGtleUZyYW1lczoga2V5RnJhbWVzLFxuXHRcdFx0XHRzbW9vdGhTY3JvbGxpbmc6IHNtb290aFNjcm9sbFRoaXMsXG5cdFx0XHRcdGVkZ2VTdHJhdGVneTogZWRnZVN0cmF0ZWd5LFxuXHRcdFx0XHRlbWl0RXZlbnRzOiBlbWl0RXZlbnRzLFxuXHRcdFx0XHRsYXN0RnJhbWVJbmRleDogLTFcblx0XHRcdH07XG5cblx0XHRcdF91cGRhdGVDbGFzcyhlbCwgW1NLUk9MTEFCTEVfQ0xBU1NdLCBbXSk7XG5cdFx0fVxuXG5cdFx0Ly9SZWZsb3cgZm9yIHRoZSBmaXJzdCB0aW1lLlxuXHRcdF9yZWZsb3coKTtcblxuXHRcdC8vTm93IHRoYXQgd2UgZ290IGFsbCBrZXkgZnJhbWUgbnVtYmVycyByaWdodCwgYWN0dWFsbHkgcGFyc2UgdGhlIHByb3BlcnRpZXMuXG5cdFx0ZWxlbWVudEluZGV4ID0gMDtcblx0XHRlbGVtZW50c0xlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdGZvcig7IGVsZW1lbnRJbmRleCA8IGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50SW5kZXgrKykge1xuXHRcdFx0dmFyIHNrID0gX3Nrcm9sbGFibGVzW2VsZW1lbnRzW2VsZW1lbnRJbmRleF1bU0tST0xMQUJMRV9JRF9ET01fUFJPUEVSVFldXTtcblxuXHRcdFx0aWYoc2sgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly9QYXJzZSB0aGUgcHJvcGVydHkgc3RyaW5nIHRvIG9iamVjdHNcblx0XHRcdF9wYXJzZVByb3BzKHNrKTtcblxuXHRcdFx0Ly9GaWxsIGtleSBmcmFtZXMgd2l0aCBtaXNzaW5nIHByb3BlcnRpZXMgZnJvbSBsZWZ0IGFuZCByaWdodFxuXHRcdFx0X2ZpbGxQcm9wcyhzayk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF9pbnN0YW5jZTtcblx0fTtcblxuXHQvKipcblx0ICogVHJhbnNmb3JtIFwicmVsYXRpdmVcIiBtb2RlIHRvIFwiYWJzb2x1dGVcIiBtb2RlLlxuXHQgKiBUaGF0IGlzLCBjYWxjdWxhdGUgYW5jaG9yIHBvc2l0aW9uIGFuZCBvZmZzZXQgb2YgZWxlbWVudC5cblx0ICovXG5cdFNrcm9sbHIucHJvdG90eXBlLnJlbGF0aXZlVG9BYnNvbHV0ZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIHZpZXdwb3J0QW5jaG9yLCBlbGVtZW50QW5jaG9yKSB7XG5cdFx0dmFyIHZpZXdwb3J0SGVpZ2h0ID0gZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcblx0XHR2YXIgYm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHR2YXIgYWJzb2x1dGUgPSBib3gudG9wO1xuXG5cdFx0Ly8jMTAwOiBJRSBkb2Vzbid0IHN1cHBseSBcImhlaWdodFwiIHdpdGggZ2V0Qm91bmRpbmdDbGllbnRSZWN0LlxuXHRcdHZhciBib3hIZWlnaHQgPSBib3guYm90dG9tIC0gYm94LnRvcDtcblxuXHRcdGlmKHZpZXdwb3J0QW5jaG9yID09PSBBTkNIT1JfQk9UVE9NKSB7XG5cdFx0XHRhYnNvbHV0ZSAtPSB2aWV3cG9ydEhlaWdodDtcblx0XHR9IGVsc2UgaWYodmlld3BvcnRBbmNob3IgPT09IEFOQ0hPUl9DRU5URVIpIHtcblx0XHRcdGFic29sdXRlIC09IHZpZXdwb3J0SGVpZ2h0IC8gMjtcblx0XHR9XG5cblx0XHRpZihlbGVtZW50QW5jaG9yID09PSBBTkNIT1JfQk9UVE9NKSB7XG5cdFx0XHRhYnNvbHV0ZSArPSBib3hIZWlnaHQ7XG5cdFx0fSBlbHNlIGlmKGVsZW1lbnRBbmNob3IgPT09IEFOQ0hPUl9DRU5URVIpIHtcblx0XHRcdGFic29sdXRlICs9IGJveEhlaWdodCAvIDI7XG5cdFx0fVxuXG5cdFx0Ly9Db21wZW5zYXRlIHNjcm9sbGluZyBzaW5jZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgcmVsYXRpdmUgdG8gdmlld3BvcnQuXG5cdFx0YWJzb2x1dGUgKz0gX2luc3RhbmNlLmdldFNjcm9sbFRvcCgpO1xuXG5cdFx0cmV0dXJuIChhYnNvbHV0ZSArIDAuNSkgfCAwO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBbmltYXRlcyBzY3JvbGwgdG9wIHRvIG5ldyBwb3NpdGlvbi5cblx0ICovXG5cdFNrcm9sbHIucHJvdG90eXBlLmFuaW1hdGVUbyA9IGZ1bmN0aW9uKHRvcCwgb3B0aW9ucykge1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0dmFyIG5vdyA9IF9ub3coKTtcblx0XHR2YXIgc2Nyb2xsVG9wID0gX2luc3RhbmNlLmdldFNjcm9sbFRvcCgpO1xuXG5cdFx0Ly9TZXR0aW5nIHRoaXMgdG8gYSBuZXcgdmFsdWUgd2lsbCBhdXRvbWF0aWNhbGx5IGNhdXNlIHRoZSBjdXJyZW50IGFuaW1hdGlvbiB0byBzdG9wLCBpZiBhbnkuXG5cdFx0X3Njcm9sbEFuaW1hdGlvbiA9IHtcblx0XHRcdHN0YXJ0VG9wOiBzY3JvbGxUb3AsXG5cdFx0XHR0b3BEaWZmOiB0b3AgLSBzY3JvbGxUb3AsXG5cdFx0XHR0YXJnZXRUb3A6IHRvcCxcblx0XHRcdGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uIHx8IERFRkFVTFRfRFVSQVRJT04sXG5cdFx0XHRzdGFydFRpbWU6IG5vdyxcblx0XHRcdGVuZFRpbWU6IG5vdyArIChvcHRpb25zLmR1cmF0aW9uIHx8IERFRkFVTFRfRFVSQVRJT04pLFxuXHRcdFx0ZWFzaW5nOiBlYXNpbmdzW29wdGlvbnMuZWFzaW5nIHx8IERFRkFVTFRfRUFTSU5HXSxcblx0XHRcdGRvbmU6IG9wdGlvbnMuZG9uZVxuXHRcdH07XG5cblx0XHQvL0Rvbid0IHF1ZXVlIHRoZSBhbmltYXRpb24gaWYgdGhlcmUncyBub3RoaW5nIHRvIGFuaW1hdGUuXG5cdFx0aWYoIV9zY3JvbGxBbmltYXRpb24udG9wRGlmZikge1xuXHRcdFx0aWYoX3Njcm9sbEFuaW1hdGlvbi5kb25lKSB7XG5cdFx0XHRcdF9zY3JvbGxBbmltYXRpb24uZG9uZS5jYWxsKF9pbnN0YW5jZSwgZmFsc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHRfc2Nyb2xsQW5pbWF0aW9uID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdHJldHVybiBfaW5zdGFuY2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIFN0b3BzIGFuaW1hdGVUbyBhbmltYXRpb24uXG5cdCAqL1xuXHRTa3JvbGxyLnByb3RvdHlwZS5zdG9wQW5pbWF0ZVRvID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYoX3Njcm9sbEFuaW1hdGlvbiAmJiBfc2Nyb2xsQW5pbWF0aW9uLmRvbmUpIHtcblx0XHRcdF9zY3JvbGxBbmltYXRpb24uZG9uZS5jYWxsKF9pbnN0YW5jZSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0X3Njcm9sbEFuaW1hdGlvbiA9IHVuZGVmaW5lZDtcblx0fTtcblxuXHQvKipcblx0ICogUmV0dXJucyBpZiBhbiBhbmltYXRpb24gY2F1c2VkIGJ5IGFuaW1hdGVUbyBpcyBjdXJyZW50bHkgcnVubmluZy5cblx0ICovXG5cdFNrcm9sbHIucHJvdG90eXBlLmlzQW5pbWF0aW5nVG8gPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gISFfc2Nyb2xsQW5pbWF0aW9uO1xuXHR9O1xuXG5cdFNrcm9sbHIucHJvdG90eXBlLmlzTW9iaWxlID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIF9pc01vYmlsZTtcblx0fTtcblxuXHRTa3JvbGxyLnByb3RvdHlwZS5zZXRTY3JvbGxUb3AgPSBmdW5jdGlvbih0b3AsIGZvcmNlKSB7XG5cdFx0X2ZvcmNlUmVuZGVyID0gKGZvcmNlID09PSB0cnVlKTtcblxuXHRcdGlmKF9pc01vYmlsZSkge1xuXHRcdFx0X21vYmlsZU9mZnNldCA9IE1hdGgubWluKE1hdGgubWF4KHRvcCwgMCksIF9tYXhLZXlGcmFtZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLCB0b3ApO1xuXHRcdH1cblxuXHRcdHJldHVybiBfaW5zdGFuY2U7XG5cdH07XG5cblx0U2tyb2xsci5wcm90b3R5cGUuZ2V0U2Nyb2xsVG9wID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYoX2lzTW9iaWxlKSB7XG5cdFx0XHRyZXR1cm4gX21vYmlsZU9mZnNldDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wIHx8IDA7XG5cdFx0fVxuXHR9O1xuXG5cdFNrcm9sbHIucHJvdG90eXBlLmdldE1heFNjcm9sbFRvcCA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfbWF4S2V5RnJhbWU7XG5cdH07XG5cblx0U2tyb2xsci5wcm90b3R5cGUub24gPSBmdW5jdGlvbihuYW1lLCBmbikge1xuXHRcdF9saXN0ZW5lcnNbbmFtZV0gPSBmbjtcblxuXHRcdHJldHVybiBfaW5zdGFuY2U7XG5cdH07XG5cblx0U2tyb2xsci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24obmFtZSkge1xuXHRcdGRlbGV0ZSBfbGlzdGVuZXJzW25hbWVdO1xuXG5cdFx0cmV0dXJuIF9pbnN0YW5jZTtcblx0fTtcblxuXHRTa3JvbGxyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNhbmNlbEFuaW1GcmFtZSA9IHBvbHlmaWxsQ0FGKCk7XG5cdFx0Y2FuY2VsQW5pbUZyYW1lKF9hbmltRnJhbWUpO1xuXHRcdF9yZW1vdmVBbGxFdmVudHMoKTtcblxuXHRcdF91cGRhdGVDbGFzcyhkb2N1bWVudEVsZW1lbnQsIFtOT19TS1JPTExSX0NMQVNTXSwgW1NLUk9MTFJfQ0xBU1MsIFNLUk9MTFJfREVTS1RPUF9DTEFTUywgU0tST0xMUl9NT0JJTEVfQ0xBU1NdKTtcblxuXHRcdHZhciBza3JvbGxhYmxlSW5kZXggPSAwO1xuXHRcdHZhciBza3JvbGxhYmxlc0xlbmd0aCA9IF9za3JvbGxhYmxlcy5sZW5ndGg7XG5cblx0XHRmb3IoOyBza3JvbGxhYmxlSW5kZXggPCBza3JvbGxhYmxlc0xlbmd0aDsgc2tyb2xsYWJsZUluZGV4KyspIHtcblx0XHRcdF9yZXNldChfc2tyb2xsYWJsZXNbc2tyb2xsYWJsZUluZGV4XS5lbGVtZW50KTtcblx0XHR9XG5cblx0XHRkb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG5cdFx0ZG9jdW1lbnRFbGVtZW50LnN0eWxlLmhlaWdodCA9IGJvZHkuc3R5bGUuaGVpZ2h0ID0gJyc7XG5cblx0XHRpZihfc2tyb2xsckJvZHkpIHtcblx0XHRcdHNrcm9sbHIuc2V0U3R5bGUoX3Nrcm9sbHJCb2R5LCAndHJhbnNmb3JtJywgJ25vbmUnKTtcblx0XHR9XG5cblx0XHRfaW5zdGFuY2UgPSB1bmRlZmluZWQ7XG5cdFx0X3Nrcm9sbHJCb2R5ID0gdW5kZWZpbmVkO1xuXHRcdF9saXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cdFx0X2ZvcmNlSGVpZ2h0ID0gdW5kZWZpbmVkO1xuXHRcdF9tYXhLZXlGcmFtZSA9IDA7XG5cdFx0X3NjYWxlID0gMTtcblx0XHRfY29uc3RhbnRzID0gdW5kZWZpbmVkO1xuXHRcdF9tb2JpbGVEZWNlbGVyYXRpb24gPSB1bmRlZmluZWQ7XG5cdFx0X2RpcmVjdGlvbiA9ICdkb3duJztcblx0XHRfbGFzdFRvcCA9IC0xO1xuXHRcdF9sYXN0Vmlld3BvcnRXaWR0aCA9IDA7XG5cdFx0X2xhc3RWaWV3cG9ydEhlaWdodCA9IDA7XG5cdFx0X3JlcXVlc3RSZWZsb3cgPSBmYWxzZTtcblx0XHRfc2Nyb2xsQW5pbWF0aW9uID0gdW5kZWZpbmVkO1xuXHRcdF9zbW9vdGhTY3JvbGxpbmdFbmFibGVkID0gdW5kZWZpbmVkO1xuXHRcdF9zbW9vdGhTY3JvbGxpbmdEdXJhdGlvbiA9IHVuZGVmaW5lZDtcblx0XHRfc21vb3RoU2Nyb2xsaW5nID0gdW5kZWZpbmVkO1xuXHRcdF9mb3JjZVJlbmRlciA9IHVuZGVmaW5lZDtcblx0XHRfc2tyb2xsYWJsZUlkQ291bnRlciA9IDA7XG5cdFx0X2VkZ2VTdHJhdGVneSA9IHVuZGVmaW5lZDtcblx0XHRfaXNNb2JpbGUgPSBmYWxzZTtcblx0XHRfbW9iaWxlT2Zmc2V0ID0gMDtcblx0XHRfdHJhbnNsYXRlWiA9IHVuZGVmaW5lZDtcblx0fTtcblxuXHQvKlxuXHRcdFByaXZhdGUgbWV0aG9kcy5cblx0Ki9cblxuXHR2YXIgX2luaXRNb2JpbGUgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgaW5pdGlhbEVsZW1lbnQ7XG5cdFx0dmFyIGluaXRpYWxUb3VjaFk7XG5cdFx0dmFyIGluaXRpYWxUb3VjaFg7XG5cdFx0dmFyIGN1cnJlbnRFbGVtZW50O1xuXHRcdHZhciBjdXJyZW50VG91Y2hZO1xuXHRcdHZhciBjdXJyZW50VG91Y2hYO1xuXHRcdHZhciBsYXN0VG91Y2hZO1xuXHRcdHZhciBkZWx0YVk7XG5cblx0XHR2YXIgaW5pdGlhbFRvdWNoVGltZTtcblx0XHR2YXIgY3VycmVudFRvdWNoVGltZTtcblx0XHR2YXIgbGFzdFRvdWNoVGltZTtcblx0XHR2YXIgZGVsdGFUaW1lO1xuXG5cdFx0X2FkZEV2ZW50KGRvY3VtZW50RWxlbWVudCwgW0VWRU5UX1RPVUNIU1RBUlQsIEVWRU5UX1RPVUNITU9WRSwgRVZFTlRfVE9VQ0hDQU5DRUwsIEVWRU5UX1RPVUNIRU5EXS5qb2luKCcgJyksIGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHRcdGN1cnJlbnRFbGVtZW50ID0gZS50YXJnZXQ7XG5cblx0XHRcdC8vV2UgZG9uJ3Qgd2FudCB0ZXh0IG5vZGVzLlxuXHRcdFx0d2hpbGUoY3VycmVudEVsZW1lbnQubm9kZVR5cGUgPT09IDMpIHtcblx0XHRcdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50VG91Y2hZID0gdG91Y2guY2xpZW50WTtcblx0XHRcdGN1cnJlbnRUb3VjaFggPSB0b3VjaC5jbGllbnRYO1xuXHRcdFx0Y3VycmVudFRvdWNoVGltZSA9IGUudGltZVN0YW1wO1xuXG5cdFx0XHRpZighcnhUb3VjaElnbm9yZVRhZ3MudGVzdChjdXJyZW50RWxlbWVudC50YWdOYW1lKSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHN3aXRjaChlLnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBFVkVOVF9UT1VDSFNUQVJUOlxuXHRcdFx0XHRcdC8vVGhlIGxhc3QgZWxlbWVudCB3ZSB0YXBwZWQgb24uXG5cdFx0XHRcdFx0aWYoaW5pdGlhbEVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdGluaXRpYWxFbGVtZW50LmJsdXIoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfaW5zdGFuY2Uuc3RvcEFuaW1hdGVUbygpO1xuXG5cdFx0XHRcdFx0aW5pdGlhbEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcblxuXHRcdFx0XHRcdGluaXRpYWxUb3VjaFkgPSBsYXN0VG91Y2hZID0gY3VycmVudFRvdWNoWTtcblx0XHRcdFx0XHRpbml0aWFsVG91Y2hYID0gY3VycmVudFRvdWNoWDtcblx0XHRcdFx0XHRpbml0aWFsVG91Y2hUaW1lID0gY3VycmVudFRvdWNoVGltZTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEVWRU5UX1RPVUNITU9WRTpcblx0XHRcdFx0XHQvL1ByZXZlbnQgZGVmYXVsdCBldmVudCBvbiB0b3VjaElnbm9yZSBlbGVtZW50cyBpbiBjYXNlIHRoZXkgZG9uJ3QgaGF2ZSBmb2N1cyB5ZXQuXG5cdFx0XHRcdFx0aWYocnhUb3VjaElnbm9yZVRhZ3MudGVzdChjdXJyZW50RWxlbWVudC50YWdOYW1lKSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBjdXJyZW50RWxlbWVudCkge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGRlbHRhWSA9IGN1cnJlbnRUb3VjaFkgLSBsYXN0VG91Y2hZO1xuXHRcdFx0XHRcdGRlbHRhVGltZSA9IGN1cnJlbnRUb3VjaFRpbWUgLSBsYXN0VG91Y2hUaW1lO1xuXG5cdFx0XHRcdFx0X2luc3RhbmNlLnNldFNjcm9sbFRvcChfbW9iaWxlT2Zmc2V0IC0gZGVsdGFZLCB0cnVlKTtcblxuXHRcdFx0XHRcdGxhc3RUb3VjaFkgPSBjdXJyZW50VG91Y2hZO1xuXHRcdFx0XHRcdGxhc3RUb3VjaFRpbWUgPSBjdXJyZW50VG91Y2hUaW1lO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRjYXNlIEVWRU5UX1RPVUNIQ0FOQ0VMOlxuXHRcdFx0XHRjYXNlIEVWRU5UX1RPVUNIRU5EOlxuXHRcdFx0XHRcdHZhciBkaXN0YW5jZVkgPSBpbml0aWFsVG91Y2hZIC0gY3VycmVudFRvdWNoWTtcblx0XHRcdFx0XHR2YXIgZGlzdGFuY2VYID0gaW5pdGlhbFRvdWNoWCAtIGN1cnJlbnRUb3VjaFg7XG5cdFx0XHRcdFx0dmFyIGRpc3RhbmNlMiA9IGRpc3RhbmNlWCAqIGRpc3RhbmNlWCArIGRpc3RhbmNlWSAqIGRpc3RhbmNlWTtcblxuXHRcdFx0XHRcdC8vQ2hlY2sgaWYgaXQgd2FzIG1vcmUgbGlrZSBhIHRhcCAobW92ZWQgbGVzcyB0aGFuIDdweCkuXG5cdFx0XHRcdFx0aWYoZGlzdGFuY2UyIDwgNDkpIHtcblx0XHRcdFx0XHRcdGlmKCFyeFRvdWNoSWdub3JlVGFncy50ZXN0KGluaXRpYWxFbGVtZW50LnRhZ05hbWUpKSB7XG5cdFx0XHRcdFx0XHRcdGluaXRpYWxFbGVtZW50LmZvY3VzKCk7XG5cblx0XHRcdFx0XHRcdFx0Ly9JdCB3YXMgYSB0YXAsIGNsaWNrIHRoZSBlbGVtZW50LlxuXHRcdFx0XHRcdFx0XHR2YXIgY2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuXHRcdFx0XHRcdFx0XHRjbGlja0V2ZW50LmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUsIHRydWUsIGUudmlldywgMSwgdG91Y2guc2NyZWVuWCwgdG91Y2guc2NyZWVuWSwgdG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WSwgZS5jdHJsS2V5LCBlLmFsdEtleSwgZS5zaGlmdEtleSwgZS5tZXRhS2V5LCAwLCBudWxsKTtcblx0XHRcdFx0XHRcdFx0aW5pdGlhbEVsZW1lbnQuZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluaXRpYWxFbGVtZW50ID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRcdFx0dmFyIHNwZWVkID0gZGVsdGFZIC8gZGVsdGFUaW1lO1xuXG5cdFx0XHRcdFx0Ly9DYXAgc3BlZWQgYXQgMyBwaXhlbC9tcy5cblx0XHRcdFx0XHRzcGVlZCA9IE1hdGgubWF4KE1hdGgubWluKHNwZWVkLCAzKSwgLTMpO1xuXG5cdFx0XHRcdFx0dmFyIGR1cmF0aW9uID0gTWF0aC5hYnMoc3BlZWQgLyBfbW9iaWxlRGVjZWxlcmF0aW9uKTtcblx0XHRcdFx0XHR2YXIgdGFyZ2V0T2Zmc2V0ID0gc3BlZWQgKiBkdXJhdGlvbiArIDAuNSAqIF9tb2JpbGVEZWNlbGVyYXRpb24gKiBkdXJhdGlvbiAqIGR1cmF0aW9uO1xuXHRcdFx0XHRcdHZhciB0YXJnZXRUb3AgPSBfaW5zdGFuY2UuZ2V0U2Nyb2xsVG9wKCkgLSB0YXJnZXRPZmZzZXQ7XG5cblx0XHRcdFx0XHQvL1JlbGF0aXZlIGR1cmF0aW9uIGNoYW5nZSBmb3Igd2hlbiBzY3JvbGxpbmcgYWJvdmUgYm91bmRzLlxuXHRcdFx0XHRcdHZhciB0YXJnZXRSYXRpbyA9IDA7XG5cblx0XHRcdFx0XHQvL0NoYW5nZSBkdXJhdGlvbiBwcm9wb3J0aW9uYWxseSB3aGVuIHNjcm9sbGluZyB3b3VsZCBsZWF2ZSBib3VuZHMuXG5cdFx0XHRcdFx0aWYodGFyZ2V0VG9wID4gX21heEtleUZyYW1lKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRSYXRpbyA9IChfbWF4S2V5RnJhbWUgLSB0YXJnZXRUb3ApIC8gdGFyZ2V0T2Zmc2V0O1xuXG5cdFx0XHRcdFx0XHR0YXJnZXRUb3AgPSBfbWF4S2V5RnJhbWU7XG5cdFx0XHRcdFx0fSBlbHNlIGlmKHRhcmdldFRvcCA8IDApIHtcblx0XHRcdFx0XHRcdHRhcmdldFJhdGlvID0gLXRhcmdldFRvcCAvIHRhcmdldE9mZnNldDtcblxuXHRcdFx0XHRcdFx0dGFyZ2V0VG9wID0gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkdXJhdGlvbiA9IGR1cmF0aW9uICogKDEgLSB0YXJnZXRSYXRpbyk7XG5cblx0XHRcdFx0XHRfaW5zdGFuY2UuYW5pbWF0ZVRvKCh0YXJnZXRUb3AgKyAwLjUpIHwgMCwge2Vhc2luZzogJ291dEN1YmljJywgZHVyYXRpb246IGR1cmF0aW9ufSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvL0p1c3QgaW4gY2FzZSB0aGVyZSBoYXMgYWxyZWFkeSBiZWVuIHNvbWUgbmF0aXZlIHNjcm9sbGluZywgcmVzZXQgaXQuXG5cdFx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xuXHRcdGRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblx0fTtcblxuXHQvKipcblx0ICogVXBkYXRlcyBrZXkgZnJhbWVzIHdoaWNoIGRlcGVuZCBvbiBvdGhlcnMgLyBuZWVkIHRvIGJlIHVwZGF0ZWQgb24gcmVzaXplLlxuXHQgKiBUaGF0IGlzIFwiZW5kXCIgaW4gXCJhYnNvbHV0ZVwiIG1vZGUgYW5kIGFsbCBrZXkgZnJhbWVzIGluIFwicmVsYXRpdmVcIiBtb2RlLlxuXHQgKiBBbHNvIGhhbmRsZXMgY29uc3RhbnRzLCBiZWNhdXNlIHRoZXkgbWF5IGNoYW5nZSBvbiByZXNpemUuXG5cdCAqL1xuXHR2YXIgX3VwZGF0ZURlcGVuZGVudEtleUZyYW1lcyA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB2aWV3cG9ydEhlaWdodCA9IGRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cdFx0dmFyIHByb2Nlc3NlZENvbnN0YW50cyA9IF9wcm9jZXNzQ29uc3RhbnRzKCk7XG5cdFx0dmFyIHNrcm9sbGFibGU7XG5cdFx0dmFyIGVsZW1lbnQ7XG5cdFx0dmFyIGFuY2hvclRhcmdldDtcblx0XHR2YXIga2V5RnJhbWVzO1xuXHRcdHZhciBrZXlGcmFtZUluZGV4O1xuXHRcdHZhciBrZXlGcmFtZXNMZW5ndGg7XG5cdFx0dmFyIGtmO1xuXHRcdHZhciBza3JvbGxhYmxlSW5kZXg7XG5cdFx0dmFyIHNrcm9sbGFibGVzTGVuZ3RoO1xuXHRcdHZhciBvZmZzZXQ7XG5cdFx0dmFyIGNvbnN0YW50VmFsdWU7XG5cblx0XHQvL0ZpcnN0IHByb2Nlc3MgYWxsIHJlbGF0aXZlLW1vZGUgZWxlbWVudHMgYW5kIGZpbmQgdGhlIG1heCBrZXkgZnJhbWUuXG5cdFx0c2tyb2xsYWJsZUluZGV4ID0gMDtcblx0XHRza3JvbGxhYmxlc0xlbmd0aCA9IF9za3JvbGxhYmxlcy5sZW5ndGg7XG5cblx0XHRmb3IoOyBza3JvbGxhYmxlSW5kZXggPCBza3JvbGxhYmxlc0xlbmd0aDsgc2tyb2xsYWJsZUluZGV4KyspIHtcblx0XHRcdHNrcm9sbGFibGUgPSBfc2tyb2xsYWJsZXNbc2tyb2xsYWJsZUluZGV4XTtcblx0XHRcdGVsZW1lbnQgPSBza3JvbGxhYmxlLmVsZW1lbnQ7XG5cdFx0XHRhbmNob3JUYXJnZXQgPSBza3JvbGxhYmxlLmFuY2hvclRhcmdldDtcblx0XHRcdGtleUZyYW1lcyA9IHNrcm9sbGFibGUua2V5RnJhbWVzO1xuXG5cdFx0XHRrZXlGcmFtZUluZGV4ID0gMDtcblx0XHRcdGtleUZyYW1lc0xlbmd0aCA9IGtleUZyYW1lcy5sZW5ndGg7XG5cblx0XHRcdGZvcig7IGtleUZyYW1lSW5kZXggPCBrZXlGcmFtZXNMZW5ndGg7IGtleUZyYW1lSW5kZXgrKykge1xuXHRcdFx0XHRrZiA9IGtleUZyYW1lc1trZXlGcmFtZUluZGV4XTtcblxuXHRcdFx0XHRvZmZzZXQgPSBrZi5vZmZzZXQ7XG5cdFx0XHRcdGNvbnN0YW50VmFsdWUgPSBwcm9jZXNzZWRDb25zdGFudHNba2YuY29uc3RhbnRdIHx8IDA7XG5cblx0XHRcdFx0a2YuZnJhbWUgPSBvZmZzZXQ7XG5cblx0XHRcdFx0aWYoa2YuaXNQZXJjZW50YWdlKSB7XG5cdFx0XHRcdFx0Ly9Db252ZXJ0IHRoZSBvZmZzZXQgdG8gcGVyY2VudGFnZSBvZiB0aGUgdmlld3BvcnQgaGVpZ2h0LlxuXHRcdFx0XHRcdG9mZnNldCA9IG9mZnNldCAqIHZpZXdwb3J0SGVpZ2h0O1xuXG5cdFx0XHRcdFx0Ly9BYnNvbHV0ZSArIHBlcmNlbnRhZ2UgbW9kZS5cblx0XHRcdFx0XHRrZi5mcmFtZSA9IG9mZnNldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGtmLm1vZGUgPT09ICdyZWxhdGl2ZScpIHtcblx0XHRcdFx0XHRfcmVzZXQoZWxlbWVudCk7XG5cblx0XHRcdFx0XHRrZi5mcmFtZSA9IF9pbnN0YW5jZS5yZWxhdGl2ZVRvQWJzb2x1dGUoYW5jaG9yVGFyZ2V0LCBrZi5hbmNob3JzWzBdLCBrZi5hbmNob3JzWzFdKSAtIG9mZnNldDtcblxuXHRcdFx0XHRcdF9yZXNldChlbGVtZW50LCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGtmLmZyYW1lICs9IGNvbnN0YW50VmFsdWU7XG5cblx0XHRcdFx0Ly9Pbmx5IHNlYXJjaCBmb3IgbWF4IGtleSBmcmFtZSB3aGVuIGZvcmNlSGVpZ2h0IGlzIGVuYWJsZWQuXG5cdFx0XHRcdGlmKF9mb3JjZUhlaWdodCkge1xuXHRcdFx0XHRcdC8vRmluZCB0aGUgbWF4IGtleSBmcmFtZSwgYnV0IGRvbid0IHVzZSBvbmUgb2YgdGhlIGRhdGEtZW5kIG9uZXMgZm9yIGNvbXBhcmlzb24uXG5cdFx0XHRcdFx0aWYoIWtmLmlzRW5kICYmIGtmLmZyYW1lID4gX21heEtleUZyYW1lKSB7XG5cdFx0XHRcdFx0XHRfbWF4S2V5RnJhbWUgPSBrZi5mcmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyMxMzM6IFRoZSBkb2N1bWVudCBjYW4gYmUgbGFyZ2VyIHRoYW4gdGhlIG1heEtleUZyYW1lIHdlIGZvdW5kLlxuXHRcdF9tYXhLZXlGcmFtZSA9IE1hdGgubWF4KF9tYXhLZXlGcmFtZSwgX2dldERvY3VtZW50SGVpZ2h0KCkpO1xuXG5cdFx0Ly9Ob3cgcHJvY2VzcyBhbGwgZGF0YS1lbmQga2V5ZnJhbWVzLlxuXHRcdHNrcm9sbGFibGVJbmRleCA9IDA7XG5cdFx0c2tyb2xsYWJsZXNMZW5ndGggPSBfc2tyb2xsYWJsZXMubGVuZ3RoO1xuXG5cdFx0Zm9yKDsgc2tyb2xsYWJsZUluZGV4IDwgc2tyb2xsYWJsZXNMZW5ndGg7IHNrcm9sbGFibGVJbmRleCsrKSB7XG5cdFx0XHRza3JvbGxhYmxlID0gX3Nrcm9sbGFibGVzW3Nrcm9sbGFibGVJbmRleF07XG5cdFx0XHRrZXlGcmFtZXMgPSBza3JvbGxhYmxlLmtleUZyYW1lcztcblxuXHRcdFx0a2V5RnJhbWVJbmRleCA9IDA7XG5cdFx0XHRrZXlGcmFtZXNMZW5ndGggPSBrZXlGcmFtZXMubGVuZ3RoO1xuXG5cdFx0XHRmb3IoOyBrZXlGcmFtZUluZGV4IDwga2V5RnJhbWVzTGVuZ3RoOyBrZXlGcmFtZUluZGV4KyspIHtcblx0XHRcdFx0a2YgPSBrZXlGcmFtZXNba2V5RnJhbWVJbmRleF07XG5cblx0XHRcdFx0Y29uc3RhbnRWYWx1ZSA9IHByb2Nlc3NlZENvbnN0YW50c1trZi5jb25zdGFudF0gfHwgMDtcblxuXHRcdFx0XHRpZihrZi5pc0VuZCkge1xuXHRcdFx0XHRcdGtmLmZyYW1lID0gX21heEtleUZyYW1lIC0ga2Yub2Zmc2V0ICsgY29uc3RhbnRWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRza3JvbGxhYmxlLmtleUZyYW1lcy5zb3J0KF9rZXlGcmFtZUNvbXBhcmF0b3IpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyBhbmQgc2V0cyB0aGUgc3R5bGUgcHJvcGVydGllcyBmb3IgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGZyYW1lLlxuXHQgKiBAcGFyYW0gZmFrZUZyYW1lIFRoZSBmcmFtZSB0byByZW5kZXIgYXQgd2hlbiBzbW9vdGggc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG5cdCAqIEBwYXJhbSBhY3R1YWxGcmFtZSBUaGUgYWN0dWFsIGZyYW1lIHdlIGFyZSBhdC5cblx0ICovXG5cdHZhciBfY2FsY1N0ZXBzID0gZnVuY3Rpb24oZmFrZUZyYW1lLCBhY3R1YWxGcmFtZSkge1xuXHRcdC8vSXRlcmF0ZSBvdmVyIGFsbCBza3JvbGxhYmxlcy5cblx0XHR2YXIgc2tyb2xsYWJsZUluZGV4ID0gMDtcblx0XHR2YXIgc2tyb2xsYWJsZXNMZW5ndGggPSBfc2tyb2xsYWJsZXMubGVuZ3RoO1xuXG5cdFx0Zm9yKDsgc2tyb2xsYWJsZUluZGV4IDwgc2tyb2xsYWJsZXNMZW5ndGg7IHNrcm9sbGFibGVJbmRleCsrKSB7XG5cdFx0XHR2YXIgc2tyb2xsYWJsZSA9IF9za3JvbGxhYmxlc1tza3JvbGxhYmxlSW5kZXhdO1xuXHRcdFx0dmFyIGVsZW1lbnQgPSBza3JvbGxhYmxlLmVsZW1lbnQ7XG5cdFx0XHR2YXIgZnJhbWUgPSBza3JvbGxhYmxlLnNtb290aFNjcm9sbGluZyA/IGZha2VGcmFtZSA6IGFjdHVhbEZyYW1lO1xuXHRcdFx0dmFyIGZyYW1lcyA9IHNrcm9sbGFibGUua2V5RnJhbWVzO1xuXHRcdFx0dmFyIGZyYW1lc0xlbmd0aCA9IGZyYW1lcy5sZW5ndGg7XG5cdFx0XHR2YXIgZmlyc3RGcmFtZSA9IGZyYW1lc1swXTtcblx0XHRcdHZhciBsYXN0RnJhbWUgPSBmcmFtZXNbZnJhbWVzLmxlbmd0aCAtIDFdO1xuXHRcdFx0dmFyIGJlZm9yZUZpcnN0ID0gZnJhbWUgPCBmaXJzdEZyYW1lLmZyYW1lO1xuXHRcdFx0dmFyIGFmdGVyTGFzdCA9IGZyYW1lID4gbGFzdEZyYW1lLmZyYW1lO1xuXHRcdFx0dmFyIGZpcnN0T3JMYXN0RnJhbWUgPSBiZWZvcmVGaXJzdCA/IGZpcnN0RnJhbWUgOiBsYXN0RnJhbWU7XG5cdFx0XHR2YXIgZW1pdEV2ZW50cyA9IHNrcm9sbGFibGUuZW1pdEV2ZW50cztcblx0XHRcdHZhciBsYXN0RnJhbWVJbmRleCA9IHNrcm9sbGFibGUubGFzdEZyYW1lSW5kZXg7XG5cdFx0XHR2YXIga2V5O1xuXHRcdFx0dmFyIHZhbHVlO1xuXG5cdFx0XHQvL0lmIHdlIGFyZSBiZWZvcmUvYWZ0ZXIgdGhlIGZpcnN0L2xhc3QgZnJhbWUsIHNldCB0aGUgc3R5bGVzIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gZWRnZSBzdHJhdGVneS5cblx0XHRcdGlmKGJlZm9yZUZpcnN0IHx8IGFmdGVyTGFzdCkge1xuXHRcdFx0XHQvL0NoZWNrIGlmIHdlIGFscmVhZHkgaGFuZGxlZCB0aGlzIGVkZ2UgY2FzZSBsYXN0IHRpbWUuXG5cdFx0XHRcdC8vTm90ZTogdXNpbmcgc2V0U2Nyb2xsVG9wIGl0J3MgcG9zc2libGUgdGhhdCB3ZSBqdW1wZWQgZnJvbSBvbmUgZWRnZSB0byB0aGUgb3RoZXIuXG5cdFx0XHRcdGlmKGJlZm9yZUZpcnN0ICYmIHNrcm9sbGFibGUuZWRnZSA9PT0gLTEgfHwgYWZ0ZXJMYXN0ICYmIHNrcm9sbGFibGUuZWRnZSA9PT0gMSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9BZGQgdGhlIHNrcm9sbHItYmVmb3JlIG9yIC1hZnRlciBjbGFzcy5cblx0XHRcdFx0aWYoYmVmb3JlRmlyc3QpIHtcblx0XHRcdFx0XHRfdXBkYXRlQ2xhc3MoZWxlbWVudCwgW1NLUk9MTEFCTEVfQkVGT1JFX0NMQVNTXSwgW1NLUk9MTEFCTEVfQUZURVJfQ0xBU1MsIFNLUk9MTEFCTEVfQkVUV0VFTl9DTEFTU10pO1xuXG5cdFx0XHRcdFx0Ly9UaGlzIGhhbmRsZXMgdGhlIHNwZWNpYWwgY2FzZSB3aGVyZSB3ZSBleGl0IHRoZSBmaXJzdCBrZXlmcmFtZS5cblx0XHRcdFx0XHRpZihlbWl0RXZlbnRzICYmIGxhc3RGcmFtZUluZGV4ID4gLTEpIHtcblx0XHRcdFx0XHRcdF9lbWl0RXZlbnQoZWxlbWVudCwgZmlyc3RGcmFtZS5ldmVudFR5cGUsIF9kaXJlY3Rpb24pO1xuXHRcdFx0XHRcdFx0c2tyb2xsYWJsZS5sYXN0RnJhbWVJbmRleCA9IC0xO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRfdXBkYXRlQ2xhc3MoZWxlbWVudCwgW1NLUk9MTEFCTEVfQUZURVJfQ0xBU1NdLCBbU0tST0xMQUJMRV9CRUZPUkVfQ0xBU1MsIFNLUk9MTEFCTEVfQkVUV0VFTl9DTEFTU10pO1xuXG5cdFx0XHRcdFx0Ly9UaGlzIGhhbmRsZXMgdGhlIHNwZWNpYWwgY2FzZSB3aGVyZSB3ZSBleGl0IHRoZSBsYXN0IGtleWZyYW1lLlxuXHRcdFx0XHRcdGlmKGVtaXRFdmVudHMgJiYgbGFzdEZyYW1lSW5kZXggPCBmcmFtZXNMZW5ndGgpIHtcblx0XHRcdFx0XHRcdF9lbWl0RXZlbnQoZWxlbWVudCwgbGFzdEZyYW1lLmV2ZW50VHlwZSwgX2RpcmVjdGlvbik7XG5cdFx0XHRcdFx0XHRza3JvbGxhYmxlLmxhc3RGcmFtZUluZGV4ID0gZnJhbWVzTGVuZ3RoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vUmVtZW1iZXIgdGhhdCB3ZSBoYW5kbGVkIHRoZSBlZGdlIGNhc2UgKGJlZm9yZS9hZnRlciB0aGUgZmlyc3QvbGFzdCBrZXlmcmFtZSkuXG5cdFx0XHRcdHNrcm9sbGFibGUuZWRnZSA9IGJlZm9yZUZpcnN0ID8gLTEgOiAxO1xuXG5cdFx0XHRcdHN3aXRjaChza3JvbGxhYmxlLmVkZ2VTdHJhdGVneSkge1xuXHRcdFx0XHRcdGNhc2UgJ3Jlc2V0Jzpcblx0XHRcdFx0XHRcdF9yZXNldChlbGVtZW50KTtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdGNhc2UgJ2Vhc2UnOlxuXHRcdFx0XHRcdFx0Ly9IYW5kbGUgdGhpcyBjYXNlIGxpa2UgaXQgd291bGQgYmUgZXhhY3RseSBhdCBmaXJzdC9sYXN0IGtleWZyYW1lIGFuZCBqdXN0IHBhc3MgaXQgb24uXG5cdFx0XHRcdFx0XHRmcmFtZSA9IGZpcnN0T3JMYXN0RnJhbWUuZnJhbWU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHRcdFx0XHR2YXIgcHJvcHMgPSBmaXJzdE9yTGFzdEZyYW1lLnByb3BzO1xuXG5cdFx0XHRcdFx0XHRmb3Ioa2V5IGluIHByb3BzKSB7XG5cdFx0XHRcdFx0XHRcdGlmKGhhc1Byb3AuY2FsbChwcm9wcywga2V5KSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlID0gX2ludGVycG9sYXRlU3RyaW5nKHByb3BzW2tleV0udmFsdWUpO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9TZXQgc3R5bGUgb3IgYXR0cmlidXRlLlxuXHRcdFx0XHRcdFx0XHRcdGlmKGtleS5pbmRleE9mKCdAJykgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleS5zdWJzdHIoMSksIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2tyb2xsci5zZXRTdHlsZShlbGVtZW50LCBrZXksIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vRGlkIHdlIGhhbmRsZSBhbiBlZGdlIGxhc3QgdGltZT9cblx0XHRcdFx0aWYoc2tyb2xsYWJsZS5lZGdlICE9PSAwKSB7XG5cdFx0XHRcdFx0X3VwZGF0ZUNsYXNzKGVsZW1lbnQsIFtTS1JPTExBQkxFX0NMQVNTLCBTS1JPTExBQkxFX0JFVFdFRU5fQ0xBU1NdLCBbU0tST0xMQUJMRV9CRUZPUkVfQ0xBU1MsIFNLUk9MTEFCTEVfQUZURVJfQ0xBU1NdKTtcblx0XHRcdFx0XHRza3JvbGxhYmxlLmVkZ2UgPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vRmluZCBvdXQgYmV0d2VlbiB3aGljaCB0d28ga2V5IGZyYW1lcyB3ZSBhcmUgcmlnaHQgbm93LlxuXHRcdFx0dmFyIGtleUZyYW1lSW5kZXggPSAwO1xuXG5cdFx0XHRmb3IoOyBrZXlGcmFtZUluZGV4IDwgZnJhbWVzTGVuZ3RoIC0gMTsga2V5RnJhbWVJbmRleCsrKSB7XG5cdFx0XHRcdGlmKGZyYW1lID49IGZyYW1lc1trZXlGcmFtZUluZGV4XS5mcmFtZSAmJiBmcmFtZSA8PSBmcmFtZXNba2V5RnJhbWVJbmRleCArIDFdLmZyYW1lKSB7XG5cdFx0XHRcdFx0dmFyIGxlZnQgPSBmcmFtZXNba2V5RnJhbWVJbmRleF07XG5cdFx0XHRcdFx0dmFyIHJpZ2h0ID0gZnJhbWVzW2tleUZyYW1lSW5kZXggKyAxXTtcblxuXHRcdFx0XHRcdGZvcihrZXkgaW4gbGVmdC5wcm9wcykge1xuXHRcdFx0XHRcdFx0aWYoaGFzUHJvcC5jYWxsKGxlZnQucHJvcHMsIGtleSkpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHByb2dyZXNzID0gKGZyYW1lIC0gbGVmdC5mcmFtZSkgLyAocmlnaHQuZnJhbWUgLSBsZWZ0LmZyYW1lKTtcblxuXHRcdFx0XHRcdFx0XHQvL1RyYW5zZm9ybSB0aGUgY3VycmVudCBwcm9ncmVzcyB1c2luZyB0aGUgZ2l2ZW4gZWFzaW5nIGZ1bmN0aW9uLlxuXHRcdFx0XHRcdFx0XHRwcm9ncmVzcyA9IGxlZnQucHJvcHNba2V5XS5lYXNpbmcocHJvZ3Jlc3MpO1xuXG5cdFx0XHRcdFx0XHRcdC8vSW50ZXJwb2xhdGUgYmV0d2VlbiB0aGUgdHdvIHZhbHVlc1xuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9IF9jYWxjSW50ZXJwb2xhdGlvbihsZWZ0LnByb3BzW2tleV0udmFsdWUsIHJpZ2h0LnByb3BzW2tleV0udmFsdWUsIHByb2dyZXNzKTtcblxuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9IF9pbnRlcnBvbGF0ZVN0cmluZyh2YWx1ZSk7XG5cblx0XHRcdFx0XHRcdFx0Ly9TZXQgc3R5bGUgb3IgYXR0cmlidXRlLlxuXHRcdFx0XHRcdFx0XHRpZihrZXkuaW5kZXhPZignQCcpID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LnN1YnN0cigxKSwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHNrcm9sbHIuc2V0U3R5bGUoZWxlbWVudCwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvL0FyZSBldmVudHMgZW5hYmxlZCBvbiB0aGlzIGVsZW1lbnQ/XG5cdFx0XHRcdFx0Ly9UaGlzIGNvZGUgaGFuZGxlcyB0aGUgdXN1YWwgY2FzZXMgb2Ygc2Nyb2xsaW5nIHRocm91Z2ggZGlmZmVyZW50IGtleWZyYW1lcy5cblx0XHRcdFx0XHQvL1RoZSBzcGVjaWFsIGNhc2VzIG9mIGJlZm9yZSBmaXJzdCBhbmQgYWZ0ZXIgbGFzdCBrZXlmcmFtZSBhcmUgaGFuZGxlZCBhYm92ZS5cblx0XHRcdFx0XHRpZihlbWl0RXZlbnRzKSB7XG5cdFx0XHRcdFx0XHQvL0RpZCB3ZSBwYXNzIGEgbmV3IGtleWZyYW1lP1xuXHRcdFx0XHRcdFx0aWYobGFzdEZyYW1lSW5kZXggIT09IGtleUZyYW1lSW5kZXgpIHtcblx0XHRcdFx0XHRcdFx0aWYoX2RpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XG5cdFx0XHRcdFx0XHRcdFx0X2VtaXRFdmVudChlbGVtZW50LCBsZWZ0LmV2ZW50VHlwZSwgX2RpcmVjdGlvbik7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0X2VtaXRFdmVudChlbGVtZW50LCByaWdodC5ldmVudFR5cGUsIF9kaXJlY3Rpb24pO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0c2tyb2xsYWJsZS5sYXN0RnJhbWVJbmRleCA9IGtleUZyYW1lSW5kZXg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlbmRlcnMgYWxsIGVsZW1lbnRzLlxuXHQgKi9cblx0dmFyIF9yZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0XHRpZihfcmVxdWVzdFJlZmxvdykge1xuXHRcdFx0X3JlcXVlc3RSZWZsb3cgPSBmYWxzZTtcblx0XHRcdF9yZWZsb3coKTtcblx0XHR9XG5cblx0XHQvL1dlIG1heSByZW5kZXIgc29tZXRoaW5nIGVsc2UgdGhhbiB0aGUgYWN0dWFsIHNjcm9sbGJhciBwb3NpdGlvbi5cblx0XHR2YXIgcmVuZGVyVG9wID0gX2luc3RhbmNlLmdldFNjcm9sbFRvcCgpO1xuXG5cdFx0Ly9JZiB0aGVyZSdzIGFuIGFuaW1hdGlvbiwgd2hpY2ggZW5kcyBpbiBjdXJyZW50IHJlbmRlciBjYWxsLCBjYWxsIHRoZSBjYWxsYmFjayBhZnRlciByZW5kZXJpbmcuXG5cdFx0dmFyIGFmdGVyQW5pbWF0aW9uQ2FsbGJhY2s7XG5cdFx0dmFyIG5vdyA9IF9ub3coKTtcblx0XHR2YXIgcHJvZ3Jlc3M7XG5cblx0XHQvL0JlZm9yZSBhY3R1YWxseSByZW5kZXJpbmcgaGFuZGxlIHRoZSBzY3JvbGwgYW5pbWF0aW9uLCBpZiBhbnkuXG5cdFx0aWYoX3Njcm9sbEFuaW1hdGlvbikge1xuXHRcdFx0Ly9JdCdzIG92ZXJcblx0XHRcdGlmKG5vdyA+PSBfc2Nyb2xsQW5pbWF0aW9uLmVuZFRpbWUpIHtcblx0XHRcdFx0cmVuZGVyVG9wID0gX3Njcm9sbEFuaW1hdGlvbi50YXJnZXRUb3A7XG5cdFx0XHRcdGFmdGVyQW5pbWF0aW9uQ2FsbGJhY2sgPSBfc2Nyb2xsQW5pbWF0aW9uLmRvbmU7XG5cdFx0XHRcdF9zY3JvbGxBbmltYXRpb24gPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvL01hcCB0aGUgY3VycmVudCBwcm9ncmVzcyB0byB0aGUgbmV3IHByb2dyZXNzIHVzaW5nIGdpdmVuIGVhc2luZyBmdW5jdGlvbi5cblx0XHRcdFx0cHJvZ3Jlc3MgPSBfc2Nyb2xsQW5pbWF0aW9uLmVhc2luZygobm93IC0gX3Njcm9sbEFuaW1hdGlvbi5zdGFydFRpbWUpIC8gX3Njcm9sbEFuaW1hdGlvbi5kdXJhdGlvbik7XG5cblx0XHRcdFx0cmVuZGVyVG9wID0gKF9zY3JvbGxBbmltYXRpb24uc3RhcnRUb3AgKyBwcm9ncmVzcyAqIF9zY3JvbGxBbmltYXRpb24udG9wRGlmZikgfCAwO1xuXHRcdFx0fVxuXG5cdFx0XHRfaW5zdGFuY2Uuc2V0U2Nyb2xsVG9wKHJlbmRlclRvcCwgdHJ1ZSk7XG5cdFx0fVxuXHRcdC8vU21vb3RoIHNjcm9sbGluZyBvbmx5IGlmIHRoZXJlJ3Mgbm8gYW5pbWF0aW9uIHJ1bm5pbmcgYW5kIGlmIHdlJ3JlIG5vdCBmb3JjaW5nIHRoZSByZW5kZXJpbmcuXG5cdFx0ZWxzZSBpZighX2ZvcmNlUmVuZGVyKSB7XG5cdFx0XHR2YXIgc21vb3RoU2Nyb2xsaW5nRGlmZiA9IF9zbW9vdGhTY3JvbGxpbmcudGFyZ2V0VG9wIC0gcmVuZGVyVG9wO1xuXG5cdFx0XHQvL1RoZSB1c2VyIHNjcm9sbGVkLCBzdGFydCBuZXcgc21vb3RoIHNjcm9sbGluZy5cblx0XHRcdGlmKHNtb290aFNjcm9sbGluZ0RpZmYpIHtcblx0XHRcdFx0X3Ntb290aFNjcm9sbGluZyA9IHtcblx0XHRcdFx0XHRzdGFydFRvcDogX2xhc3RUb3AsXG5cdFx0XHRcdFx0dG9wRGlmZjogcmVuZGVyVG9wIC0gX2xhc3RUb3AsXG5cdFx0XHRcdFx0dGFyZ2V0VG9wOiByZW5kZXJUb3AsXG5cdFx0XHRcdFx0c3RhcnRUaW1lOiBfbGFzdFJlbmRlckNhbGwsXG5cdFx0XHRcdFx0ZW5kVGltZTogX2xhc3RSZW5kZXJDYWxsICsgX3Ntb290aFNjcm9sbGluZ0R1cmF0aW9uXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vSW50ZXJwb2xhdGUgdGhlIGludGVybmFsIHNjcm9sbCBwb3NpdGlvbiAobm90IHRoZSBhY3R1YWwgc2Nyb2xsYmFyKS5cblx0XHRcdGlmKG5vdyA8PSBfc21vb3RoU2Nyb2xsaW5nLmVuZFRpbWUpIHtcblx0XHRcdFx0Ly9NYXAgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgdG8gdGhlIG5ldyBwcm9ncmVzcyB1c2luZyBlYXNpbmcgZnVuY3Rpb24uXG5cdFx0XHRcdHByb2dyZXNzID0gZWFzaW5ncy5zcXJ0KChub3cgLSBfc21vb3RoU2Nyb2xsaW5nLnN0YXJ0VGltZSkgLyBfc21vb3RoU2Nyb2xsaW5nRHVyYXRpb24pO1xuXG5cdFx0XHRcdHJlbmRlclRvcCA9IChfc21vb3RoU2Nyb2xsaW5nLnN0YXJ0VG9wICsgcHJvZ3Jlc3MgKiBfc21vb3RoU2Nyb2xsaW5nLnRvcERpZmYpIHwgMDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvL1RoYXQncyB3ZXJlIHdlIGFjdHVhbGx5IFwic2Nyb2xsXCIgb24gbW9iaWxlLlxuXHRcdGlmKF9pc01vYmlsZSAmJiBfc2tyb2xsckJvZHkpIHtcblx0XHRcdC8vU2V0IHRoZSB0cmFuc2Zvcm0gKFwic2Nyb2xsIGl0XCIpLlxuXHRcdFx0c2tyb2xsci5zZXRTdHlsZShfc2tyb2xsckJvZHksICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsICcgKyAtKF9tb2JpbGVPZmZzZXQpICsgJ3B4KSAnICsgX3RyYW5zbGF0ZVopO1xuXHRcdH1cblxuXHRcdC8vRGlkIHRoZSBzY3JvbGwgcG9zaXRpb24gZXZlbiBjaGFuZ2U/XG5cdFx0aWYoX2ZvcmNlUmVuZGVyIHx8IF9sYXN0VG9wICE9PSByZW5kZXJUb3ApIHtcblx0XHRcdC8vUmVtZW1iZXIgaW4gd2hpY2ggZGlyZWN0aW9uIGFyZSB3ZSBzY3JvbGxpbmc/XG5cdFx0XHRfZGlyZWN0aW9uID0gKHJlbmRlclRvcCA+IF9sYXN0VG9wKSA/ICdkb3duJyA6IChyZW5kZXJUb3AgPCBfbGFzdFRvcCA/ICd1cCcgOiBfZGlyZWN0aW9uKTtcblxuXHRcdFx0X2ZvcmNlUmVuZGVyID0gZmFsc2U7XG5cblx0XHRcdHZhciBsaXN0ZW5lclBhcmFtcyA9IHtcblx0XHRcdFx0Y3VyVG9wOiByZW5kZXJUb3AsXG5cdFx0XHRcdGxhc3RUb3A6IF9sYXN0VG9wLFxuXHRcdFx0XHRtYXhUb3A6IF9tYXhLZXlGcmFtZSxcblx0XHRcdFx0ZGlyZWN0aW9uOiBfZGlyZWN0aW9uXG5cdFx0XHR9O1xuXG5cdFx0XHQvL1RlbGwgdGhlIGxpc3RlbmVyIHdlIGFyZSBhYm91dCB0byByZW5kZXIuXG5cdFx0XHR2YXIgY29udGludWVSZW5kZXJpbmcgPSBfbGlzdGVuZXJzLmJlZm9yZXJlbmRlciAmJiBfbGlzdGVuZXJzLmJlZm9yZXJlbmRlci5jYWxsKF9pbnN0YW5jZSwgbGlzdGVuZXJQYXJhbXMpO1xuXG5cdFx0XHQvL1RoZSBiZWZvcmVyZW5kZXIgbGlzdGVuZXIgZnVuY3Rpb24gaXMgYWJsZSB0aGUgY2FuY2VsIHJlbmRlcmluZy5cblx0XHRcdGlmKGNvbnRpbnVlUmVuZGVyaW5nICE9PSBmYWxzZSkge1xuXHRcdFx0XHQvL05vdyBhY3R1YWxseSBpbnRlcnBvbGF0ZSBhbGwgdGhlIHN0eWxlcy5cblx0XHRcdFx0X2NhbGNTdGVwcyhyZW5kZXJUb3AsIF9pbnN0YW5jZS5nZXRTY3JvbGxUb3AoKSk7XG5cblx0XHRcdFx0Ly9SZW1lbWJlciB3aGVuIHdlIGxhc3QgcmVuZGVyZWQuXG5cdFx0XHRcdF9sYXN0VG9wID0gcmVuZGVyVG9wO1xuXG5cdFx0XHRcdGlmKF9saXN0ZW5lcnMucmVuZGVyKSB7XG5cdFx0XHRcdFx0X2xpc3RlbmVycy5yZW5kZXIuY2FsbChfaW5zdGFuY2UsIGxpc3RlbmVyUGFyYW1zKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZihhZnRlckFuaW1hdGlvbkNhbGxiYWNrKSB7XG5cdFx0XHRcdGFmdGVyQW5pbWF0aW9uQ2FsbGJhY2suY2FsbChfaW5zdGFuY2UsIGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRfbGFzdFJlbmRlckNhbGwgPSBub3c7XG5cdH07XG5cblx0LyoqXG5cdCAqIFBhcnNlcyB0aGUgcHJvcGVydGllcyBmb3IgZWFjaCBrZXkgZnJhbWUgb2YgdGhlIGdpdmVuIHNrcm9sbGFibGUuXG5cdCAqL1xuXHR2YXIgX3BhcnNlUHJvcHMgPSBmdW5jdGlvbihza3JvbGxhYmxlKSB7XG5cdFx0Ly9JdGVyYXRlIG92ZXIgYWxsIGtleSBmcmFtZXNcblx0XHR2YXIga2V5RnJhbWVJbmRleCA9IDA7XG5cdFx0dmFyIGtleUZyYW1lc0xlbmd0aCA9IHNrcm9sbGFibGUua2V5RnJhbWVzLmxlbmd0aDtcblxuXHRcdGZvcig7IGtleUZyYW1lSW5kZXggPCBrZXlGcmFtZXNMZW5ndGg7IGtleUZyYW1lSW5kZXgrKykge1xuXHRcdFx0dmFyIGZyYW1lID0gc2tyb2xsYWJsZS5rZXlGcmFtZXNba2V5RnJhbWVJbmRleF07XG5cdFx0XHR2YXIgZWFzaW5nO1xuXHRcdFx0dmFyIHZhbHVlO1xuXHRcdFx0dmFyIHByb3A7XG5cdFx0XHR2YXIgcHJvcHMgPSB7fTtcblxuXHRcdFx0dmFyIG1hdGNoO1xuXG5cdFx0XHR3aGlsZSgobWF0Y2ggPSByeFByb3BWYWx1ZS5leGVjKGZyYW1lLnByb3BzKSkgIT09IG51bGwpIHtcblx0XHRcdFx0cHJvcCA9IG1hdGNoWzFdO1xuXHRcdFx0XHR2YWx1ZSA9IG1hdGNoWzJdO1xuXG5cdFx0XHRcdGVhc2luZyA9IHByb3AubWF0Y2gocnhQcm9wRWFzaW5nKTtcblxuXHRcdFx0XHQvL0lzIHRoZXJlIGFuIGVhc2luZyBzcGVjaWZpZWQgZm9yIHRoaXMgcHJvcD9cblx0XHRcdFx0aWYoZWFzaW5nICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cHJvcCA9IGVhc2luZ1sxXTtcblx0XHRcdFx0XHRlYXNpbmcgPSBlYXNpbmdbMl07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWFzaW5nID0gREVGQVVMVF9FQVNJTkc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0V4Y2xhbWF0aW9uIHBvaW50IGF0IGZpcnN0IHBvc2l0aW9uIGZvcmNlcyB0aGUgdmFsdWUgdG8gYmUgdGFrZW4gbGl0ZXJhbC5cblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5pbmRleE9mKCchJykgPyBfcGFyc2VQcm9wKHZhbHVlKSA6IFt2YWx1ZS5zbGljZSgxKV07XG5cblx0XHRcdFx0Ly9TYXZlIHRoZSBwcm9wIGZvciB0aGlzIGtleSBmcmFtZSB3aXRoIGhpcyB2YWx1ZSBhbmQgZWFzaW5nIGZ1bmN0aW9uXG5cdFx0XHRcdHByb3BzW3Byb3BdID0ge1xuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0XHRlYXNpbmc6IGVhc2luZ3NbZWFzaW5nXVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRmcmFtZS5wcm9wcyA9IHByb3BzO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogUGFyc2VzIGEgdmFsdWUgZXh0cmFjdGluZyBudW1lcmljIHZhbHVlcyBhbmQgZ2VuZXJhdGluZyBhIGZvcm1hdCBzdHJpbmdcblx0ICogZm9yIGxhdGVyIGludGVycG9sYXRpb24gb2YgdGhlIG5ldyB2YWx1ZXMgaW4gb2xkIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHZhbCBUaGUgQ1NTIHZhbHVlIHRvIGJlIHBhcnNlZC5cblx0ICogQHJldHVybiBTb21ldGhpbmcgbGlrZSBbXCJyZ2JhKD8lLD8lLCA/JSw/KVwiLCAxMDAsIDUwLCAwLCAuN11cblx0ICogd2hlcmUgdGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlIGZvcm1hdCBzdHJpbmcgbGF0ZXIgdXNlZFxuXHQgKiBhbmQgYWxsIGZvbGxvd2luZyBlbGVtZW50cyBhcmUgdGhlIG51bWVyaWMgdmFsdWUuXG5cdCAqL1xuXHR2YXIgX3BhcnNlUHJvcCA9IGZ1bmN0aW9uKHZhbCkge1xuXHRcdHZhciBudW1iZXJzID0gW107XG5cblx0XHQvL09uZSBzcGVjaWFsIGNhc2UsIHdoZXJlIGZsb2F0cyBkb24ndCB3b3JrLlxuXHRcdC8vV2UgcmVwbGFjZSBhbGwgb2NjdXJlbmNlcyBvZiByZ2JhIGNvbG9yc1xuXHRcdC8vd2hpY2ggZG9uJ3QgdXNlIHBlcmNlbnRhZ2Ugbm90YXRpb24gd2l0aCB0aGUgcGVyY2VudGFnZSBub3RhdGlvbi5cblx0XHRyeFJHQkFJbnRlZ2VyQ29sb3IubGFzdEluZGV4ID0gMDtcblx0XHR2YWwgPSB2YWwucmVwbGFjZShyeFJHQkFJbnRlZ2VyQ29sb3IsIGZ1bmN0aW9uKHJnYmEpIHtcblx0XHRcdHJldHVybiByZ2JhLnJlcGxhY2UocnhOdW1lcmljVmFsdWUsIGZ1bmN0aW9uKG4pIHtcblx0XHRcdFx0cmV0dXJuIG4gLyAyNTUgKiAxMDAgKyAnJSc7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vSGFuZGxlIHByZWZpeGluZyBvZiBcImdyYWRpZW50XCIgdmFsdWVzLlxuXHRcdC8vRm9yIG5vdyBvbmx5IHRoZSBwcmVmaXhlZCB2YWx1ZSB3aWxsIGJlIHNldC4gVW5wcmVmaXhlZCBpc24ndCBzdXBwb3J0ZWQgYW55d2F5LlxuXHRcdGlmKHRoZURhc2hlZENTU1ByZWZpeCkge1xuXHRcdFx0cnhHcmFkaWVudC5sYXN0SW5kZXggPSAwO1xuXHRcdFx0dmFsID0gdmFsLnJlcGxhY2UocnhHcmFkaWVudCwgZnVuY3Rpb24ocykge1xuXHRcdFx0XHRyZXR1cm4gdGhlRGFzaGVkQ1NTUHJlZml4ICsgcztcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vTm93IHBhcnNlIEFOWSBudW1iZXIgaW5zaWRlIHRoaXMgc3RyaW5nIGFuZCBjcmVhdGUgYSBmb3JtYXQgc3RyaW5nLlxuXHRcdHZhbCA9IHZhbC5yZXBsYWNlKHJ4TnVtZXJpY1ZhbHVlLCBmdW5jdGlvbihuKSB7XG5cdFx0XHRudW1iZXJzLnB1c2goK24pO1xuXHRcdFx0cmV0dXJuICd7P30nO1xuXHRcdH0pO1xuXG5cdFx0Ly9BZGQgdGhlIGZvcm1hdHN0cmluZyBhcyBmaXJzdCB2YWx1ZS5cblx0XHRudW1iZXJzLnVuc2hpZnQodmFsKTtcblxuXHRcdHJldHVybiBudW1iZXJzO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBGaWxscyB0aGUga2V5IGZyYW1lcyB3aXRoIG1pc3NpbmcgbGVmdCBhbmQgcmlnaHQgaGFuZCBwcm9wZXJ0aWVzLlxuXHQgKiBJZiBrZXkgZnJhbWUgMSBoYXMgcHJvcGVydHkgWCBhbmQga2V5IGZyYW1lIDIgaXMgbWlzc2luZyBYLFxuXHQgKiBidXQga2V5IGZyYW1lIDMgaGFzIFggYWdhaW4sIHRoZW4gd2UgbmVlZCB0byBhc3NpZ24gWCB0byBrZXkgZnJhbWUgMiB0b28uXG5cdCAqXG5cdCAqIEBwYXJhbSBzayBBIHNrcm9sbGFibGUuXG5cdCAqL1xuXHR2YXIgX2ZpbGxQcm9wcyA9IGZ1bmN0aW9uKHNrKSB7XG5cdFx0Ly9XaWxsIGNvbGxlY3QgdGhlIHByb3BlcnRpZXMga2V5IGZyYW1lIGJ5IGtleSBmcmFtZVxuXHRcdHZhciBwcm9wTGlzdCA9IHt9O1xuXHRcdHZhciBrZXlGcmFtZUluZGV4O1xuXHRcdHZhciBrZXlGcmFtZXNMZW5ndGg7XG5cblx0XHQvL0l0ZXJhdGUgb3ZlciBhbGwga2V5IGZyYW1lcyBmcm9tIGxlZnQgdG8gcmlnaHRcblx0XHRrZXlGcmFtZUluZGV4ID0gMDtcblx0XHRrZXlGcmFtZXNMZW5ndGggPSBzay5rZXlGcmFtZXMubGVuZ3RoO1xuXG5cdFx0Zm9yKDsga2V5RnJhbWVJbmRleCA8IGtleUZyYW1lc0xlbmd0aDsga2V5RnJhbWVJbmRleCsrKSB7XG5cdFx0XHRfZmlsbFByb3BGb3JGcmFtZShzay5rZXlGcmFtZXNba2V5RnJhbWVJbmRleF0sIHByb3BMaXN0KTtcblx0XHR9XG5cblx0XHQvL05vdyBkbyB0aGUgc2FtZSBmcm9tIHJpZ2h0IHRvIGZpbGwgdGhlIGxhc3QgZ2Fwc1xuXG5cdFx0cHJvcExpc3QgPSB7fTtcblxuXHRcdC8vSXRlcmF0ZSBvdmVyIGFsbCBrZXkgZnJhbWVzIGZyb20gcmlnaHQgdG8gbGVmdFxuXHRcdGtleUZyYW1lSW5kZXggPSBzay5rZXlGcmFtZXMubGVuZ3RoIC0gMTtcblxuXHRcdGZvcig7IGtleUZyYW1lSW5kZXggPj0gMDsga2V5RnJhbWVJbmRleC0tKSB7XG5cdFx0XHRfZmlsbFByb3BGb3JGcmFtZShzay5rZXlGcmFtZXNba2V5RnJhbWVJbmRleF0sIHByb3BMaXN0KTtcblx0XHR9XG5cdH07XG5cblx0dmFyIF9maWxsUHJvcEZvckZyYW1lID0gZnVuY3Rpb24oZnJhbWUsIHByb3BMaXN0KSB7XG5cdFx0dmFyIGtleTtcblxuXHRcdC8vRm9yIGVhY2gga2V5IGZyYW1lIGl0ZXJhdGUgb3ZlciBhbGwgcmlnaHQgaGFuZCBwcm9wZXJ0aWVzIGFuZCBhc3NpZ24gdGhlbSxcblx0XHQvL2J1dCBvbmx5IGlmIHRoZSBjdXJyZW50IGtleSBmcmFtZSBkb2Vzbid0IGhhdmUgdGhlIHByb3BlcnR5IGJ5IGl0c2VsZlxuXHRcdGZvcihrZXkgaW4gcHJvcExpc3QpIHtcblx0XHRcdC8vVGhlIGN1cnJlbnQgZnJhbWUgbWlzc2VzIHRoaXMgcHJvcGVydHksIHNvIGFzc2lnbiBpdC5cblx0XHRcdGlmKCFoYXNQcm9wLmNhbGwoZnJhbWUucHJvcHMsIGtleSkpIHtcblx0XHRcdFx0ZnJhbWUucHJvcHNba2V5XSA9IHByb3BMaXN0W2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly9JdGVyYXRlIG92ZXIgYWxsIHByb3BzIG9mIHRoZSBjdXJyZW50IGZyYW1lIGFuZCBjb2xsZWN0IHRoZW1cblx0XHRmb3Ioa2V5IGluIGZyYW1lLnByb3BzKSB7XG5cdFx0XHRwcm9wTGlzdFtrZXldID0gZnJhbWUucHJvcHNba2V5XTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIG5ldyB2YWx1ZXMgZm9yIHR3byBnaXZlbiB2YWx1ZXMgYXJyYXkuXG5cdCAqL1xuXHR2YXIgX2NhbGNJbnRlcnBvbGF0aW9uID0gZnVuY3Rpb24odmFsMSwgdmFsMiwgcHJvZ3Jlc3MpIHtcblx0XHR2YXIgdmFsdWVJbmRleDtcblx0XHR2YXIgdmFsMUxlbmd0aCA9IHZhbDEubGVuZ3RoO1xuXG5cdFx0Ly9UaGV5IGJvdGggbmVlZCB0byBoYXZlIHRoZSBzYW1lIGxlbmd0aFxuXHRcdGlmKHZhbDFMZW5ndGggIT09IHZhbDIubGVuZ3RoKSB7XG5cdFx0XHR0aHJvdyAnQ2FuXFwndCBpbnRlcnBvbGF0ZSBiZXR3ZWVuIFwiJyArIHZhbDFbMF0gKyAnXCIgYW5kIFwiJyArIHZhbDJbMF0gKyAnXCInO1xuXHRcdH1cblxuXHRcdC8vQWRkIHRoZSBmb3JtYXQgc3RyaW5nIGFzIGZpcnN0IGVsZW1lbnQuXG5cdFx0dmFyIGludGVycG9sYXRlZCA9IFt2YWwxWzBdXTtcblxuXHRcdHZhbHVlSW5kZXggPSAxO1xuXG5cdFx0Zm9yKDsgdmFsdWVJbmRleCA8IHZhbDFMZW5ndGg7IHZhbHVlSW5kZXgrKykge1xuXHRcdFx0Ly9UaGF0J3MgdGhlIGxpbmUgd2hlcmUgdGhlIHR3byBudW1iZXJzIGFyZSBhY3R1YWxseSBpbnRlcnBvbGF0ZWQuXG5cdFx0XHRpbnRlcnBvbGF0ZWRbdmFsdWVJbmRleF0gPSB2YWwxW3ZhbHVlSW5kZXhdICsgKCh2YWwyW3ZhbHVlSW5kZXhdIC0gdmFsMVt2YWx1ZUluZGV4XSkgKiBwcm9ncmVzcyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGludGVycG9sYXRlZDtcblx0fTtcblxuXHQvKipcblx0ICogSW50ZXJwb2xhdGVzIHRoZSBudW1lcmljIHZhbHVlcyBpbnRvIHRoZSBmb3JtYXQgc3RyaW5nLlxuXHQgKi9cblx0dmFyIF9pbnRlcnBvbGF0ZVN0cmluZyA9IGZ1bmN0aW9uKHZhbCkge1xuXHRcdHZhciB2YWx1ZUluZGV4ID0gMTtcblxuXHRcdHJ4SW50ZXJwb2xhdGVTdHJpbmcubGFzdEluZGV4ID0gMDtcblxuXHRcdHJldHVybiB2YWxbMF0ucmVwbGFjZShyeEludGVycG9sYXRlU3RyaW5nLCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB2YWxbdmFsdWVJbmRleCsrXTtcblx0XHR9KTtcblx0fTtcblxuXHQvKipcblx0ICogUmVzZXRzIHRoZSBjbGFzcyBhbmQgc3R5bGUgYXR0cmlidXRlIHRvIHdoYXQgaXQgd2FzIGJlZm9yZSBza3JvbGxyIG1hbmlwdWxhdGVkIHRoZSBlbGVtZW50LlxuXHQgKiBBbHNvIHJlbWVtYmVycyB0aGUgdmFsdWVzIGl0IGhhZCBiZWZvcmUgcmVzZXRpbmcsIGluIG9yZGVyIHRvIHVuZG8gdGhlIHJlc2V0LlxuXHQgKi9cblx0dmFyIF9yZXNldCA9IGZ1bmN0aW9uKGVsZW1lbnRzLCB1bmRvKSB7XG5cdFx0Ly9XZSBhY2NlcHQgYSBzaW5nbGUgZWxlbWVudCBvciBhbiBhcnJheSBvZiBlbGVtZW50cy5cblx0XHRlbGVtZW50cyA9IFtdLmNvbmNhdChlbGVtZW50cyk7XG5cblx0XHR2YXIgc2tyb2xsYWJsZTtcblx0XHR2YXIgZWxlbWVudDtcblx0XHR2YXIgZWxlbWVudHNJbmRleCA9IDA7XG5cdFx0dmFyIGVsZW1lbnRzTGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuXG5cdFx0Zm9yKDsgZWxlbWVudHNJbmRleCA8IGVsZW1lbnRzTGVuZ3RoOyBlbGVtZW50c0luZGV4KyspIHtcblx0XHRcdGVsZW1lbnQgPSBlbGVtZW50c1tlbGVtZW50c0luZGV4XTtcblx0XHRcdHNrcm9sbGFibGUgPSBfc2tyb2xsYWJsZXNbZWxlbWVudFtTS1JPTExBQkxFX0lEX0RPTV9QUk9QRVJUWV1dO1xuXG5cdFx0XHQvL0NvdWxkbid0IGZpbmQgdGhlIHNrcm9sbGFibGUgZm9yIHRoaXMgRE9NIGVsZW1lbnQuXG5cdFx0XHRpZighc2tyb2xsYWJsZSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYodW5kbykge1xuXHRcdFx0XHQvL1Jlc2V0IGNsYXNzIGFuZCBzdHlsZSB0byB0aGUgXCJkaXJ0eVwiIChzZXQgYnkgc2tyb2xscikgdmFsdWVzLlxuXHRcdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBza3JvbGxhYmxlLmRpcnR5U3R5bGVBdHRyO1xuXHRcdFx0XHRfdXBkYXRlQ2xhc3MoZWxlbWVudCwgc2tyb2xsYWJsZS5kaXJ0eUNsYXNzQXR0cik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvL1JlbWVtYmVyIHRoZSBcImRpcnR5XCIgKHNldCBieSBza3JvbGxyKSBjbGFzcyBhbmQgc3R5bGUuXG5cdFx0XHRcdHNrcm9sbGFibGUuZGlydHlTdHlsZUF0dHIgPSBlbGVtZW50LnN0eWxlLmNzc1RleHQ7XG5cdFx0XHRcdHNrcm9sbGFibGUuZGlydHlDbGFzc0F0dHIgPSBfZ2V0Q2xhc3MoZWxlbWVudCk7XG5cblx0XHRcdFx0Ly9SZXNldCBjbGFzcyBhbmQgc3R5bGUgdG8gd2hhdCBpdCBvcmlnaW5hbGx5IHdhcy5cblx0XHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc2tyb2xsYWJsZS5zdHlsZUF0dHI7XG5cdFx0XHRcdF91cGRhdGVDbGFzcyhlbGVtZW50LCBza3JvbGxhYmxlLmNsYXNzQXR0cik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBEZXRlY3RzIHN1cHBvcnQgZm9yIDNkIHRyYW5zZm9ybXMgYnkgYXBwbHlpbmcgaXQgdG8gdGhlIHNrcm9sbHItYm9keS5cblx0ICovXG5cdHZhciBfZGV0ZWN0M0RUcmFuc2Zvcm1zID0gZnVuY3Rpb24oKSB7XG5cdFx0X3RyYW5zbGF0ZVogPSAndHJhbnNsYXRlWigwKSc7XG5cdFx0c2tyb2xsci5zZXRTdHlsZShfc2tyb2xsckJvZHksICd0cmFuc2Zvcm0nLCBfdHJhbnNsYXRlWik7XG5cblx0XHR2YXIgY29tcHV0ZWRTdHlsZSA9IGdldFN0eWxlKF9za3JvbGxyQm9keSk7XG5cdFx0dmFyIGNvbXB1dGVkVHJhbnNmb3JtID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKTtcblx0XHR2YXIgY29tcHV0ZWRUcmFuc2Zvcm1XaXRoUHJlZml4ID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHRoZURhc2hlZENTU1ByZWZpeCArICd0cmFuc2Zvcm0nKTtcblx0XHR2YXIgaGFzM0QgPSAoY29tcHV0ZWRUcmFuc2Zvcm0gJiYgY29tcHV0ZWRUcmFuc2Zvcm0gIT09ICdub25lJykgfHwgKGNvbXB1dGVkVHJhbnNmb3JtV2l0aFByZWZpeCAmJiBjb21wdXRlZFRyYW5zZm9ybVdpdGhQcmVmaXggIT09ICdub25lJyk7XG5cblx0XHRpZighaGFzM0QpIHtcblx0XHRcdF90cmFuc2xhdGVaID0gJyc7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIENTUyBwcm9wZXJ0eSBvbiB0aGUgZ2l2ZW4gZWxlbWVudC4gU2V0cyBwcmVmaXhlZCBwcm9wZXJ0aWVzIGFzIHdlbGwuXG5cdCAqL1xuXHRza3JvbGxyLnNldFN0eWxlID0gZnVuY3Rpb24oZWwsIHByb3AsIHZhbCkge1xuXHRcdHZhciBzdHlsZSA9IGVsLnN0eWxlO1xuXG5cdFx0Ly9DYW1lbCBjYXNlLlxuXHRcdHByb3AgPSBwcm9wLnJlcGxhY2UocnhDYW1lbENhc2UsIHJ4Q2FtZWxDYXNlRm4pLnJlcGxhY2UoJy0nLCAnJyk7XG5cblx0XHQvL01ha2Ugc3VyZSB6LWluZGV4IGdldHMgYSA8aW50ZWdlcj4uXG5cdFx0Ly9UaGlzIGlzIHRoZSBvbmx5IDxpbnRlZ2VyPiBjYXNlIHdlIG5lZWQgdG8gaGFuZGxlLlxuXHRcdGlmKHByb3AgPT09ICd6SW5kZXgnKSB7XG5cdFx0XHRpZihpc05hTih2YWwpKSB7XG5cdFx0XHRcdC8vSWYgaXQncyBub3QgYSBudW1iZXIsIGRvbid0IHRvdWNoIGl0LlxuXHRcdFx0XHQvL0l0IGNvdWxkIGZvciBleGFtcGxlIGJlIFwiYXV0b1wiICgjMzUxKS5cblx0XHRcdFx0c3R5bGVbcHJvcF0gPSB2YWw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvL0Zsb29yIHRoZSBudW1iZXIuXG5cdFx0XHRcdHN0eWxlW3Byb3BdID0gJycgKyAodmFsIHwgMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIzY0OiBcImZsb2F0XCIgY2FuJ3QgYmUgc2V0IGFjcm9zcyBicm93c2Vycy4gTmVlZHMgdG8gdXNlIFwiY3NzRmxvYXRcIiBmb3IgYWxsIGV4Y2VwdCBJRS5cblx0XHRlbHNlIGlmKHByb3AgPT09ICdmbG9hdCcpIHtcblx0XHRcdHN0eWxlLnN0eWxlRmxvYXQgPSBzdHlsZS5jc3NGbG9hdCA9IHZhbDtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQvL05lZWQgdHJ5LWNhdGNoIGZvciBvbGQgSUUuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvL1NldCBwcmVmaXhlZCBwcm9wZXJ0eSBpZiB0aGVyZSdzIGEgcHJlZml4LlxuXHRcdFx0XHRpZih0aGVDU1NQcmVmaXgpIHtcblx0XHRcdFx0XHRzdHlsZVt0aGVDU1NQcmVmaXggKyBwcm9wLnNsaWNlKDAsMSkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSldID0gdmFsO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9TZXQgdW5wcmVmaXhlZC5cblx0XHRcdFx0c3R5bGVbcHJvcF0gPSB2YWw7XG5cdFx0XHR9IGNhdGNoKGlnbm9yZSkge31cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIENyb3NzIGJyb3dzZXIgZXZlbnQgaGFuZGxpbmcuXG5cdCAqL1xuXHR2YXIgX2FkZEV2ZW50ID0gc2tyb2xsci5hZGRFdmVudCA9IGZ1bmN0aW9uKGVsZW1lbnQsIG5hbWVzLCBjYWxsYmFjaykge1xuXHRcdHZhciBpbnRlcm1lZGlhdGUgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHQvL05vcm1hbGl6ZSBJRSBldmVudCBzdHVmZi5cblx0XHRcdGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuXHRcdFx0aWYoIWUudGFyZ2V0KSB7XG5cdFx0XHRcdGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRpZighZS5wcmV2ZW50RGVmYXVsdCkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdGUuZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGUpO1xuXHRcdH07XG5cblx0XHRuYW1lcyA9IG5hbWVzLnNwbGl0KCcgJyk7XG5cblx0XHR2YXIgbmFtZTtcblx0XHR2YXIgbmFtZUNvdW50ZXIgPSAwO1xuXHRcdHZhciBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aDtcblxuXHRcdGZvcig7IG5hbWVDb3VudGVyIDwgbmFtZXNMZW5ndGg7IG5hbWVDb3VudGVyKyspIHtcblx0XHRcdG5hbWUgPSBuYW1lc1tuYW1lQ291bnRlcl07XG5cblx0XHRcdGlmKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2ssIGZhbHNlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIG5hbWUsIGludGVybWVkaWF0ZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vUmVtZW1iZXIgdGhlIGV2ZW50cyB0byBiZSBhYmxlIHRvIGZsdXNoIHRoZW0gbGF0ZXIuXG5cdFx0XHRfcmVnaXN0ZXJlZEV2ZW50cy5wdXNoKHtcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0bGlzdGVuZXI6IGNhbGxiYWNrXG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0dmFyIF9yZW1vdmVFdmVudCA9IHNrcm9sbHIucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lcywgY2FsbGJhY2spIHtcblx0XHRuYW1lcyA9IG5hbWVzLnNwbGl0KCcgJyk7XG5cblx0XHR2YXIgbmFtZUNvdW50ZXIgPSAwO1xuXHRcdHZhciBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aDtcblxuXHRcdGZvcig7IG5hbWVDb3VudGVyIDwgbmFtZXNMZW5ndGg7IG5hbWVDb3VudGVyKyspIHtcblx0XHRcdGlmKGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZXNbbmFtZUNvdW50ZXJdLCBjYWxsYmFjaywgZmFsc2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudC5kZXRhY2hFdmVudCgnb24nICsgbmFtZXNbbmFtZUNvdW50ZXJdLCBjYWxsYmFjayk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBfcmVtb3ZlQWxsRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGV2ZW50RGF0YTtcblx0XHR2YXIgZXZlbnRDb3VudGVyID0gMDtcblx0XHR2YXIgZXZlbnRzTGVuZ3RoID0gX3JlZ2lzdGVyZWRFdmVudHMubGVuZ3RoO1xuXG5cdFx0Zm9yKDsgZXZlbnRDb3VudGVyIDwgZXZlbnRzTGVuZ3RoOyBldmVudENvdW50ZXIrKykge1xuXHRcdFx0ZXZlbnREYXRhID0gX3JlZ2lzdGVyZWRFdmVudHNbZXZlbnRDb3VudGVyXTtcblxuXHRcdFx0X3JlbW92ZUV2ZW50KGV2ZW50RGF0YS5lbGVtZW50LCBldmVudERhdGEubmFtZSwgZXZlbnREYXRhLmxpc3RlbmVyKTtcblx0XHR9XG5cblx0XHRfcmVnaXN0ZXJlZEV2ZW50cyA9IFtdO1xuXHR9O1xuXG5cdHZhciBfZW1pdEV2ZW50ID0gZnVuY3Rpb24oZWxlbWVudCwgbmFtZSwgZGlyZWN0aW9uKSB7XG5cdFx0aWYoX2xpc3RlbmVycy5rZXlmcmFtZSkge1xuXHRcdFx0X2xpc3RlbmVycy5rZXlmcmFtZS5jYWxsKF9pbnN0YW5jZSwgZWxlbWVudCwgbmFtZSwgZGlyZWN0aW9uKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIF9yZWZsb3cgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgcG9zID0gX2luc3RhbmNlLmdldFNjcm9sbFRvcCgpO1xuXG5cdFx0Ly9XaWxsIGJlIHJlY2FsY3VsYXRlZCBieSBfdXBkYXRlRGVwZW5kZW50S2V5RnJhbWVzLlxuXHRcdF9tYXhLZXlGcmFtZSA9IDA7XG5cblx0XHRpZihfZm9yY2VIZWlnaHQgJiYgIV9pc01vYmlsZSkge1xuXHRcdFx0Ly91bi1cImZvcmNlXCIgdGhlIGhlaWdodCB0byBub3QgbWVzcyB3aXRoIHRoZSBjYWxjdWxhdGlvbnMgaW4gX3VwZGF0ZURlcGVuZGVudEtleUZyYW1lcyAoIzIxNikuXG5cdFx0XHRib2R5LnN0eWxlLmhlaWdodCA9ICcnO1xuXHRcdH1cblxuXHRcdF91cGRhdGVEZXBlbmRlbnRLZXlGcmFtZXMoKTtcblxuXHRcdGlmKF9mb3JjZUhlaWdodCAmJiAhX2lzTW9iaWxlKSB7XG5cdFx0XHQvL1wiZm9yY2VcIiB0aGUgaGVpZ2h0LlxuXHRcdFx0Ym9keS5zdHlsZS5oZWlnaHQgPSAoX21heEtleUZyYW1lICsgZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgKyAncHgnO1xuXHRcdH1cblxuXHRcdC8vVGhlIHNjcm9sbCBvZmZzZXQgbWF5IG5vdyBiZSBsYXJnZXIgdGhhbiBuZWVkZWQgKG9uIGRlc2t0b3AgdGhlIGJyb3dzZXIvb3MgcHJldmVudHMgc2Nyb2xsaW5nIGZhcnRoZXIgdGhhbiB0aGUgYm90dG9tKS5cblx0XHRpZihfaXNNb2JpbGUpIHtcblx0XHRcdF9pbnN0YW5jZS5zZXRTY3JvbGxUb3AoTWF0aC5taW4oX2luc3RhbmNlLmdldFNjcm9sbFRvcCgpLCBfbWF4S2V5RnJhbWUpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9SZW1lbWJlciBhbmQgcmVzZXQgdGhlIHNjcm9sbCBwb3MgKCMyMTcpLlxuXHRcdFx0X2luc3RhbmNlLnNldFNjcm9sbFRvcChwb3MsIHRydWUpO1xuXHRcdH1cblxuXHRcdF9mb3JjZVJlbmRlciA9IHRydWU7XG5cdH07XG5cblx0Lypcblx0ICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIGNvbnN0YW50cyBvYmplY3Qgd2hlcmUgYWxsIGZ1bmN0aW9ucyBhbmQgc3RyaW5ncyBoYXZlIGJlZW4gZXZhbHVhdGVkLlxuXHQgKi9cblx0dmFyIF9wcm9jZXNzQ29uc3RhbnRzID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHZpZXdwb3J0SGVpZ2h0ID0gZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcblx0XHR2YXIgY29weSA9IHt9O1xuXHRcdHZhciBwcm9wO1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGZvcihwcm9wIGluIF9jb25zdGFudHMpIHtcblx0XHRcdHZhbHVlID0gX2NvbnN0YW50c1twcm9wXTtcblxuXHRcdFx0aWYodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWUuY2FsbChfaW5zdGFuY2UpO1xuXHRcdFx0fVxuXHRcdFx0Ly9QZXJjZW50YWdlIG9mZnNldC5cblx0XHRcdGVsc2UgaWYoKC9wJC8pLnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHZhbHVlID0gKHZhbHVlLnNsaWNlKDAsIC0xKSAvIDEwMCkgKiB2aWV3cG9ydEhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0Y29weVtwcm9wXSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb3B5O1xuXHR9O1xuXG5cdC8qXG5cdCAqIFJldHVybnMgdGhlIGhlaWdodCBvZiB0aGUgZG9jdW1lbnQuXG5cdCAqL1xuXHR2YXIgX2dldERvY3VtZW50SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNrcm9sbHJCb2R5SGVpZ2h0ID0gKF9za3JvbGxyQm9keSAmJiBfc2tyb2xsckJvZHkub2Zmc2V0SGVpZ2h0IHx8IDApO1xuXHRcdHZhciBib2R5SGVpZ2h0ID0gTWF0aC5tYXgoc2tyb2xsckJvZHlIZWlnaHQsIGJvZHkuc2Nyb2xsSGVpZ2h0LCBib2R5Lm9mZnNldEhlaWdodCwgZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCwgZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCwgZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XG5cblx0XHRyZXR1cm4gYm9keUhlaWdodCAtIGRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgb2Ygc3BhY2Ugc2VwYXJhdGVkIGNsYXNzbmFtZXMgZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXG5cdCAqIFdvcmtzIHdpdGggU1ZHIGFzIHdlbGwuXG5cdCAqL1xuXHR2YXIgX2dldENsYXNzID0gZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdHZhciBwcm9wID0gJ2NsYXNzTmFtZSc7XG5cblx0XHQvL1NWRyBzdXBwb3J0IGJ5IHVzaW5nIGNsYXNzTmFtZS5iYXNlVmFsIGluc3RlYWQgb2YganVzdCBjbGFzc05hbWUuXG5cdFx0aWYod2luZG93LlNWR0VsZW1lbnQgJiYgZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50ID0gZWxlbWVudFtwcm9wXTtcblx0XHRcdHByb3AgPSAnYmFzZVZhbCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1lbnRbcHJvcF07XG5cdH07XG5cblx0LyoqXG5cdCAqIEFkZHMgYW5kIHJlbW92ZXMgYSBDU1MgY2xhc3Nlcy5cblx0ICogV29ya3Mgd2l0aCBTVkcgYXMgd2VsbC5cblx0ICogYWRkIGFuZCByZW1vdmUgYXJlIGFycmF5cyBvZiBzdHJpbmdzLFxuXHQgKiBvciBpZiByZW1vdmUgaXMgb21taXRlZCBhZGQgaXMgYSBzdHJpbmcgYW5kIG92ZXJ3cml0ZXMgYWxsIGNsYXNzZXMuXG5cdCAqL1xuXHR2YXIgX3VwZGF0ZUNsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgYWRkLCByZW1vdmUpIHtcblx0XHR2YXIgcHJvcCA9ICdjbGFzc05hbWUnO1xuXG5cdFx0Ly9TVkcgc3VwcG9ydCBieSB1c2luZyBjbGFzc05hbWUuYmFzZVZhbCBpbnN0ZWFkIG9mIGp1c3QgY2xhc3NOYW1lLlxuXHRcdGlmKHdpbmRvdy5TVkdFbGVtZW50ICYmIGVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuU1ZHRWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudCA9IGVsZW1lbnRbcHJvcF07XG5cdFx0XHRwcm9wID0gJ2Jhc2VWYWwnO1xuXHRcdH1cblxuXHRcdC8vV2hlbiByZW1vdmUgaXMgb21taXRlZCwgd2Ugd2FudCB0byBvdmVyd3JpdGUvc2V0IHRoZSBjbGFzc2VzLlxuXHRcdGlmKHJlbW92ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRlbGVtZW50W3Byb3BdID0gYWRkO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vQ2FjaGUgY3VycmVudCBjbGFzc2VzLiBXZSB3aWxsIHdvcmsgb24gYSBzdHJpbmcgYmVmb3JlIHBhc3NpbmcgYmFjayB0byBET00uXG5cdFx0dmFyIHZhbCA9IGVsZW1lbnRbcHJvcF07XG5cblx0XHQvL0FsbCBjbGFzc2VzIHRvIGJlIHJlbW92ZWQuXG5cdFx0dmFyIGNsYXNzUmVtb3ZlSW5kZXggPSAwO1xuXHRcdHZhciByZW1vdmVMZW5ndGggPSByZW1vdmUubGVuZ3RoO1xuXG5cdFx0Zm9yKDsgY2xhc3NSZW1vdmVJbmRleCA8IHJlbW92ZUxlbmd0aDsgY2xhc3NSZW1vdmVJbmRleCsrKSB7XG5cdFx0XHR2YWwgPSBfdW50cmltKHZhbCkucmVwbGFjZShfdW50cmltKHJlbW92ZVtjbGFzc1JlbW92ZUluZGV4XSksICcgJyk7XG5cdFx0fVxuXG5cdFx0dmFsID0gX3RyaW0odmFsKTtcblxuXHRcdC8vQWxsIGNsYXNzZXMgdG8gYmUgYWRkZWQuXG5cdFx0dmFyIGNsYXNzQWRkSW5kZXggPSAwO1xuXHRcdHZhciBhZGRMZW5ndGggPSBhZGQubGVuZ3RoO1xuXG5cdFx0Zm9yKDsgY2xhc3NBZGRJbmRleCA8IGFkZExlbmd0aDsgY2xhc3NBZGRJbmRleCsrKSB7XG5cdFx0XHQvL09ubHkgYWRkIGlmIGVsIG5vdCBhbHJlYWR5IGhhcyBjbGFzcy5cblx0XHRcdGlmKF91bnRyaW0odmFsKS5pbmRleE9mKF91bnRyaW0oYWRkW2NsYXNzQWRkSW5kZXhdKSkgPT09IC0xKSB7XG5cdFx0XHRcdHZhbCArPSAnICcgKyBhZGRbY2xhc3NBZGRJbmRleF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZWxlbWVudFtwcm9wXSA9IF90cmltKHZhbCk7XG5cdH07XG5cblx0dmFyIF90cmltID0gZnVuY3Rpb24oYSkge1xuXHRcdHJldHVybiBhLnJlcGxhY2UocnhUcmltLCAnJyk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBzcGFjZSBiZWZvcmUgYW5kIGFmdGVyIHRoZSBzdHJpbmcuXG5cdCAqL1xuXHR2YXIgX3VudHJpbSA9IGZ1bmN0aW9uKGEpIHtcblx0XHRyZXR1cm4gJyAnICsgYSArICcgJztcblx0fTtcblxuXHR2YXIgX25vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiArbmV3IERhdGUoKTtcblx0fTtcblxuXHR2YXIgX2tleUZyYW1lQ29tcGFyYXRvciA9IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRyZXR1cm4gYS5mcmFtZSAtIGIuZnJhbWU7XG5cdH07XG5cblx0Lypcblx0ICogUHJpdmF0ZSB2YXJpYWJsZXMuXG5cdCAqL1xuXG5cdC8vU2luZ2xldG9uXG5cdHZhciBfaW5zdGFuY2U7XG5cblx0Lypcblx0XHRBIGxpc3Qgb2YgYWxsIGVsZW1lbnRzIHdoaWNoIHNob3VsZCBiZSBhbmltYXRlZCBhc3NvY2lhdGVkIHdpdGggdGhlaXIgdGhlIG1ldGFkYXRhLlxuXHRcdEV4bWFwbGUgc2tyb2xsYWJsZSB3aXRoIHR3byBrZXkgZnJhbWVzIGFuaW1hdGluZyBmcm9tIDEwMHB4IHdpZHRoIHRvIDIwcHg6XG5cblx0XHRza3JvbGxhYmxlID0ge1xuXHRcdFx0ZWxlbWVudDogPHRoZSBET00gZWxlbWVudD4sXG5cdFx0XHRzdHlsZUF0dHI6IDxzdHlsZSBhdHRyaWJ1dGUgb2YgdGhlIGVsZW1lbnQgYmVmb3JlIHNrcm9sbHI+LFxuXHRcdFx0Y2xhc3NBdHRyOiA8Y2xhc3MgYXR0cmlidXRlIG9mIHRoZSBlbGVtZW50IGJlZm9yZSBza3JvbGxyPixcblx0XHRcdGtleUZyYW1lczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZnJhbWU6IDEwMCxcblx0XHRcdFx0XHRwcm9wczoge1xuXHRcdFx0XHRcdFx0d2lkdGg6IHtcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFsnez99cHgnLCAxMDBdLFxuXHRcdFx0XHRcdFx0XHRlYXNpbmc6IDxyZWZlcmVuY2UgdG8gZWFzaW5nIGZ1bmN0aW9uPlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bW9kZTogXCJhYnNvbHV0ZVwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmcmFtZTogMjAwLFxuXHRcdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0XHR3aWR0aDoge1xuXHRcdFx0XHRcdFx0XHR2YWx1ZTogWyd7P31weCcsIDIwXSxcblx0XHRcdFx0XHRcdFx0ZWFzaW5nOiA8cmVmZXJlbmNlIHRvIGVhc2luZyBmdW5jdGlvbj5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG1vZGU6IFwiYWJzb2x1dGVcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fTtcblx0Ki9cblx0dmFyIF9za3JvbGxhYmxlcztcblxuXHR2YXIgX3Nrcm9sbHJCb2R5O1xuXG5cdHZhciBfbGlzdGVuZXJzO1xuXHR2YXIgX2ZvcmNlSGVpZ2h0O1xuXHR2YXIgX21heEtleUZyYW1lID0gMDtcblxuXHR2YXIgX3NjYWxlID0gMTtcblx0dmFyIF9jb25zdGFudHM7XG5cblx0dmFyIF9tb2JpbGVEZWNlbGVyYXRpb247XG5cblx0Ly9DdXJyZW50IGRpcmVjdGlvbiAodXAvZG93bikuXG5cdHZhciBfZGlyZWN0aW9uID0gJ2Rvd24nO1xuXG5cdC8vVGhlIGxhc3QgdG9wIG9mZnNldCB2YWx1ZS4gTmVlZGVkIHRvIGRldGVybWluZSBkaXJlY3Rpb24uXG5cdHZhciBfbGFzdFRvcCA9IC0xO1xuXG5cdC8vVGhlIGxhc3QgdGltZSB3ZSBjYWxsZWQgdGhlIHJlbmRlciBtZXRob2QgKGRvZXNuJ3QgbWVhbiB3ZSByZW5kZXJlZCEpLlxuXHR2YXIgX2xhc3RSZW5kZXJDYWxsID0gX25vdygpO1xuXG5cdC8vRm9yIGRldGVjdGluZyBpZiBpdCBhY3R1YWxseSByZXNpemVkICgjMjcxKS5cblx0dmFyIF9sYXN0Vmlld3BvcnRXaWR0aCA9IDA7XG5cdHZhciBfbGFzdFZpZXdwb3J0SGVpZ2h0ID0gMDtcblxuXHR2YXIgX3JlcXVlc3RSZWZsb3cgPSBmYWxzZTtcblxuXHQvL1dpbGwgY29udGFpbiBkYXRhIGFib3V0IGEgcnVubmluZyBzY3JvbGxiYXIgYW5pbWF0aW9uLCBpZiBhbnkuXG5cdHZhciBfc2Nyb2xsQW5pbWF0aW9uO1xuXG5cdHZhciBfc21vb3RoU2Nyb2xsaW5nRW5hYmxlZDtcblxuXHR2YXIgX3Ntb290aFNjcm9sbGluZ0R1cmF0aW9uO1xuXG5cdC8vV2lsbCBjb250YWluIHNldHRpbnMgZm9yIHNtb290aCBzY3JvbGxpbmcgaWYgZW5hYmxlZC5cblx0dmFyIF9zbW9vdGhTY3JvbGxpbmc7XG5cblx0Ly9DYW4gYmUgc2V0IGJ5IGFueSBvcGVyYXRpb24vZXZlbnQgdG8gZm9yY2UgcmVuZGVyaW5nIGV2ZW4gaWYgdGhlIHNjcm9sbGJhciBkaWRuJ3QgbW92ZS5cblx0dmFyIF9mb3JjZVJlbmRlcjtcblxuXHQvL0VhY2ggc2tyb2xsYWJsZSBnZXRzIGFuIHVuaXF1ZSBJRCBpbmNyZW1lbnRlZCBmb3IgZWFjaCBza3JvbGxhYmxlLlxuXHQvL1RoZSBJRCBpcyB0aGUgaW5kZXggaW4gdGhlIF9za3JvbGxhYmxlcyBhcnJheS5cblx0dmFyIF9za3JvbGxhYmxlSWRDb3VudGVyID0gMDtcblxuXHR2YXIgX2VkZ2VTdHJhdGVneTtcblxuXG5cdC8vTW9iaWxlIHNwZWNpZmljIHZhcnMuIFdpbGwgYmUgc3RyaXBwZWQgYnkgVWdsaWZ5SlMgd2hlbiBub3QgaW4gdXNlLlxuXHR2YXIgX2lzTW9iaWxlID0gZmFsc2U7XG5cblx0Ly9UaGUgdmlydHVhbCBzY3JvbGwgb2Zmc2V0IHdoZW4gdXNpbmcgbW9iaWxlIHNjcm9sbGluZy5cblx0dmFyIF9tb2JpbGVPZmZzZXQgPSAwO1xuXG5cdC8vSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgM2QgdHJhbnNmb3JtcywgdGhpcyB3aWxsIGJlIGZpbGxlZCB3aXRoICd0cmFuc2xhdGVaKDApJyAoZW1wdHkgc3RyaW5nIG90aGVyd2lzZSkuXG5cdHZhciBfdHJhbnNsYXRlWjtcblxuXHQvL1dpbGwgY29udGFpbiBkYXRhIGFib3V0IHJlZ2lzdGVyZWQgZXZlbnRzIGJ5IHNrcm9sbHIuXG5cdHZhciBfcmVnaXN0ZXJlZEV2ZW50cyA9IFtdO1xuXG5cdC8vQW5pbWF0aW9uIGZyYW1lIGlkIHJldHVybmVkIGJ5IFJlcXVlc3RBbmltYXRpb25GcmFtZSAob3IgdGltZW91dCB3aGVuIFJBRiBpcyBub3Qgc3VwcG9ydGVkKS5cblx0dmFyIF9hbmltRnJhbWU7XG5cblx0Ly9FeHBvc2Ugc2tyb2xsciBhcyBlaXRoZXIgYSBnbG9iYWwgdmFyaWFibGUgb3IgYSByZXF1aXJlLmpzIG1vZHVsZVxuXHRpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoJ3Nrcm9sbHInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gc2tyb2xscjtcblx0XHR9KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gc2tyb2xscjtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuc2tyb2xsciA9IHNrcm9sbHI7XG5cdH1cblxufSh3aW5kb3csIGRvY3VtZW50KSk7XG4iXX0=
