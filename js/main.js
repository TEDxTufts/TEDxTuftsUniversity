$(document).ready(function() {

    var flipContainer = $('.flip-container');
    flipContainer.click(function() {
        $('.flip-container').not($(this)).removeClass('flip');
        $(this).toggleClass('flip');
    })



    // only works for one sticky element
    var sticky = $(".sticky");
    var stickytop = sticky.position().top;

    if (sticky.length) {

        $(document).on("scroll", function(e) {
            onScrollSticky(sticky, stickytop);
        });

    }

    var sideNav = $(".side-nav.side-nav-single-page");

    if (sideNav.length) {
        $(document).on("scroll", onScrollSideNav);
    }

    var smoothScroll = $(".smooth-scroll");

    if (smoothScroll.length) {
        smoothScroll.find('a').addBack('a').each(function() {
            var a = $(this);
            a.on('click', function(e) {
                var parent = $(this).parent();
                e.preventDefault();
                $(document).off("scroll");

                a.each(function () {
                    parent.removeClass('active');
                })
                parent.addClass('active');

                var target = this.hash;
                $target = $(target);
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top+2
                }, 500, 'swing', function () {
                    window.location.hash = target;
                    $(document).on("scroll", onScrollSideNav);
                });
            })
        })
    }

    function onScrollSticky(sticky, initTop) {
        if ($(this).scrollTop() > initTop) {
            sticky.addClass("sticky-fix");
        } else {
            sticky.removeClass("sticky-fix");
        }
    }

    function onScrollSideNav(event){
        onScrollSticky(sticky, stickytop);

        var scrollPos = $(document).scrollTop();
        $('.side-nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.side-nav li').removeClass("active");
                currLink.parent().addClass("active");
            }
            else{
                currLink.parent().removeClass("active");
            }
        });
    }

});
