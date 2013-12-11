/**
 * Slideshow plugin for jQuery.
 *
 * Transitions are done using CSS3 with progressive fallback to jQuery fadeIn.
 *
 * @dependencies jQuery, Modernizr
 * @author Chiel Robben <chiel@pephers.org>
 * @url https://github.com/Pephers/Slideshow
 * @license MIT
 */
(function ($, Modernizr, window, undefined) {

    'use strict';

    /**
     * Constructor
     *
     * @param {object} element
     * @param {object} options
     */
    var Slideshow = function (element, options) {

        var defaults = {
            auto: true,
            interval: 5000,
            duration: 600,
            pause: true,
            zIndexOffset: 0
        };

        this.$element = $(element);
        this.$window = $(window);
        this.$slides = this.$element.children();
        this.isRunning = undefined;
        this.slideCount = this.$slides.length - 1;
        this.currentSlide = 0;
        this.options = $.extend({}, defaults, options);

        if (this.slideCount > 0) {
            this.init();
        }

    };

    Slideshow.prototype = {

        /**
         * Initialize the slideshow
         */
        init: function () {

            var self = this;

            // Hide all images but the first one
            if (Modernizr.csstransitions) {
                self.$slides.eq(self.currentSlide).addClass('slide-active');
            } else {

                self.$slides.css(
                    'zIndex',
                    self.options.zIndexOffset + 1
                ).hide().eq(self.currentSlide).css(
                    'zIndex',
                    self.options.zIndexOffset + 2
                ).show();

            }

            // Start the slideshow on load
            self.$window.on('load', function () {

                self.$element.addClass('slideshow-ready');
                self.setHeight();
                self.start();

            });

            // Pause slideshow when the mouse cursor is hovering
            if (!Modernizr.touch && this.options.pause) {

                self.$element.on({

                    mouseenter: function (e) {
                        self.stop();
                    },

                    mouseleave: function (e) {
                        self.start();
                    }

                });

            }

            // Set height of the slideshow when window is resized
            self.$window.on('resize', function () {
                self.setHeight();
            });

        },

        /**
         * Start the slideshow
         */
        start: function () {

            var self = this;

            // Prevent multiple timers from running at once
            if (self.isRunning) {
                clearInterval(self.isRunning);
            }

            if (self.options.auto) {

                self.isRunning = setInterval(function () {
                    self.nextSlide();
                }, self.options.interval);

            }

        },

        /**
         * Stop the slideshow
         */
        stop: function () {
            clearInterval(this.isRunning);
        },

        /**
         * Slide to the next image
         */
        nextSlide: function () {

            var slide = this.currentSlide === this.slideCount ? 0 : this.currentSlide + 1;

            this.changeSlide(slide);

        },

        /**
         * Slide to the previous image
         */
        previousSlide: function () {

            var slide = this.currentSlide === 0 ? this.slideCount : this.currentSlide - 1;

            this.changeSlide(slide);

        },

        /**
         * Change to the slide specified.
         *
         * @param {int} slide
         */
        changeSlide: function (slide) {

            var self = this,
                previousSlide = slide > self.slideCount ? (self.slideCount - 1) : (slide <= 0 ? self.slideCount : (slide - 1));

            self.currentSlide = slide;

            if (Modernizr.csstransitions) {
                self.$slides.removeClass('slide-active').eq(self.currentSlide).addClass('slide-active');
            } else {

                self.$slides.css(
                    'zIndex',
                    self.options.zIndexOffset + 1
                ).eq(self.currentSlide).css(
                    'zIndex',
                    self.options.zIndexOffset + 2
                ).fadeIn(self.options.duration, function () {
                    self.$slides.eq(previousSlide).hide();
                });

            }

        },

        /**
         * Set height of the slideshow container
         */
        setHeight: function () {

            var height = this.$slides.eq(this.currentSlide).height();

            this.$element[0].style.height = height + 'px';

        }

    };

    /**
     * Expose as jQuery plugin in Singleton fashion so it can only be
     * initialized once per element.
     */
    $.fn.slideshow = function (options) {

        return this.each(function () {

            if (!$.data(this, 'slideshow')) {
                $.data(this, 'slideshow', new Slideshow(this, options));
            }

        });

    };

})(jQuery, Modernizr, window);
