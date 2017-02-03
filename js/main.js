$(document).ready(function() {
    var sticky = $(".sticky");

    if (sticky.length) {
        var top = sticky.position().top;
        $(document).on("scroll", function(e) {
            if ($(this).scrollTop() > top) {
                sticky.addClass("sticky-fix");
            } else {
                sticky.removeClass("sticky-fix");
            }

        });
    }

    var sideNav = $(".side-nav.side-nav-single-page");

    if (sideNav.length) {
        $(document).on("scroll", onScroll);

        //smoothscroll
        sideNav.find('a').each(function() {
            var a = $(this);
            a.on('click', function(e) {
                var parent = $(this).parent();
                e.preventDefault();
                $(document).off("scroll");

                a.each(function () {
                    parent.removeClass('active');
                })
                parent.addClass('active');

                var target = this.hash,
                    menu = target;
                $target = $(target);
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top+2
                }, 500, 'swing', function () {
                    window.location.hash = target;
                    $(document).on("scroll", onScroll);
                });
            })
        })


    }



    function onScroll(event){
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
