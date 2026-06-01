$(document).ready(function(){
            $('.sub').hide();
            $('.submn_area').hide().css({height:0});

            $('#header').mouseenter(function(){
                $('.submn_area')
                    .stop(true,true)
                    .show()
                    .animate({height:250},200);

                $('.sub')
                    .stop(true,true)
                    .fadeIn(150);
            });

            $('#header').mouseleave(function(){
                $('.sub')
                    .stop(true,true)
                    .fadeOut(100);

                $('.submn_area')
                    .stop(true,true)
                    .delay(50)
                    .animate({height:0},150,function(){
                        $(this).hide();
                    });
            });
        });