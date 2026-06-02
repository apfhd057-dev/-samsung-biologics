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

window.addEventListener("load", function(){

    const motionItems = document.querySelectorAll(".motion");

    setTimeout(function(){

        const observer = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("show");
                }
            });
        }, {
            threshold:0.15,
            rootMargin:"0px 0px -8% 0px"
        });

        motionItems.forEach(function(item){
            observer.observe(item);
        });

    }, 300);

});

const s5Wrap = document.querySelector("#section5 .s5_wrap");
const s5Bar = document.querySelector("#section5 .s5_progress_bar");

if(s5Wrap){
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    s5Wrap.addEventListener("mousedown", function(e){
        isDown = true;
        s5Wrap.classList.add("dragging");
        startX = e.pageX;
        scrollLeft = s5Wrap.scrollLeft;
    });

    window.addEventListener("mouseup", function(){
        isDown = false;
        s5Wrap.classList.remove("dragging");
    });

    s5Wrap.addEventListener("mousemove", function(e){
        if(!isDown) return;
        e.preventDefault();

        const moveX = e.pageX - startX;
        s5Wrap.scrollLeft = scrollLeft - moveX;
    });

    function updateS5Progress(){
        if(!s5Bar) return;

        const maxScroll = s5Wrap.scrollWidth - s5Wrap.clientWidth;
        const progress = maxScroll <= 0 ? 0 : s5Wrap.scrollLeft / maxScroll;

        const barWidth = (s5Wrap.clientWidth / s5Wrap.scrollWidth) * 100;
        const maxLeft = 100 - barWidth;

        s5Bar.style.width = barWidth + "%";
        s5Bar.style.left = (progress * maxLeft) + "%";
    }

    s5Wrap.addEventListener("scroll", updateS5Progress);
    window.addEventListener("resize", updateS5Progress);
    updateS5Progress();
}