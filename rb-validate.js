/*!
 * RB Validate
 * ver. 0.8 beta
 * Simple validation jQuery plugin.
 * 
 * Copyright (c) 2015 Marek Kędzierski
 * License: MIT
 * 
 * Based on jQuery plugin boilerplate by @ajpiano and @addyosmani
 */

/*
 * 
 * Usage:
    $(document).ready(function() {
        $('#contact-form').RBvalidate();
    });
 * 
 * 
 * TODO: 
 * - DRY and clean code
 * 
 */

;(function ($, window, document, undefined) {

    // Default options
    var RBvalidate = 'RBvalidate',
        defaults = {
            outlineColor: 'red',
            errorInfo: 'This field is required',
            eachInput: function() {},
            errorInfoFile: 'This field is required. Accepted file formats: ',
            eachFileInput: function() {},
            extensions: ['gif','png','jpg','jpeg'],
            scrollSpeed: 500,
            scrollOffset: 70
        };

    // Constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = RBvalidate;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            this.validate();
        },

        validate: function () {
            RBform = $(this.element);
            RBinputs = RBform.find('input.required, select.required, textarea.required');
            //            this.options.outlineColor

            var that = this;
            RBform.submit(function (e) {
                var emptyInputs = false;
                RBinputs.css({
                    outline: 'initial',
                    outlineColor: 'initial'
                });
                RBerrors = $('.input-error-info, .file-input-error-info');
                RBerrors.remove();

                RBinputs.each(function () {
                    var ext = $(this).val().split('.').pop().toLowerCase();
                    var printExt = (that.options.extensions).join(', ');
                    
                    if (($(this).val() === '') && ($(this).attr('type') !== 'file')) {
                        $(this).css({
                            outline: '2px solid ' + that.options.outlineColor
                        });
                        $(this).addClass('fill-it');
                        $(this).after('<div class="input-error-info">' + that.options.errorInfo + '</div>').next('div').css({ display: 'none' }).slideDown(200);

                        that.options.eachInput.call(this);

                        emptyInputs = true;
                    } else if ((($(this).attr('type') === 'checkbox') || ($(this).attr('type') === 'radio')) && (!$(this).is(':checked'))) {
                        $(this).css({
                            outline: '2px solid ' + that.options.outlineColor
                        });
                        $(this).addClass('fill-it');
                        $(this).after('<div class="input-error-info">' + that.options.errorInfo + '</div>').next('div').css({ display: 'none' }).slideDown(200);
                        
                        that.options.eachInput.call(this);

                        emptyInputs = true;
                    } else if ($(this).attr('type') === 'file') {
                        if (($(this).val() === '') || ($.inArray(ext, that.options.extensions) === -1)) {
                            $(this).css({
                                outline: '2px solid ' + that.options.outlineColor
                            });
                            $(this).addClass('fill-it');
                            $(this).after('<div class="file-input-error-info">' + that.options.errorInfoFile + printExt + '</div>').next('div').css({ display: 'none' }).slideDown(200);

                            that.options.eachFileInput.call(this);

                            emptyInputs = true;
                        }
                    }
                });

                if (emptyInputs === true) {
                    fillIt = $('.fill-it').first();
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: (fillIt.offset().top - fillIt.height() - that.options.scrollOffset)
                    }, that.options.scrollSpeed);
                }
            });
        }
        
    };

    // Plugin wrapper around the constructor preventing against multiple instantiations
    $.fn[RBvalidate] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + RBvalidate)) {
                $.data(this, 'plugin_' + RBvalidate,
                new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);