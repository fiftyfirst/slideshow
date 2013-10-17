Slideshow
=========
* Author: Chiel Robben
* License: MIT
* Website: http://pephers.org

Slideshow plugin for jQuery.

Transitions are done using CSS3 with progressive fallback to jQuery fadeIn.

Usage
-----
Example markup:

    <div class="slideshow">
        <figure class="slide slide-active">
            <img src="slide1.jpg" alt="">
        </div>
        <figure class="slide">
            <img src="slide2.jpg" alt="">
        </div>
        <figure class="slide">
            <img src="slide3.jpg" alt="">
        </div>
        <figure class="slide">
            <img src="slide4.jpg" alt="">
        </div>
    </div>

Initialize using:

    <script src="modernizr.js"></script>
    <script src="jquery.js"></script>
    <script src="slideshow.js"></script>
    <script>
    $(function () {
        $('.slideshow').slideshow();
    });
    </script>

Options
-------
Optional options are:

    $('.slideshow').slideshow({
        auto: true, // Auto-change slides
        interval: 5000, // Interval in ms between each slide
        duration: 600, // Duration of fallback jQuery animation
        pause: true, // Pause slideshow when the mouse cursor is positioned over the slideshow
        zIndexOffset: 0 // Offset the z-index
    });
