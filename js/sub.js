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
window.addEventListener("load", function(){

    const mobileBtn = document.querySelector(".mobile_btn");

    const mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile_menu";

    mobileMenu.innerHTML = `
        <button class="mobile_menu_close">×</button>
        <ul class="m_menu">
            <li>
                <a href="./aboutus.html">ABOUT US</a>
                <ul class="m_sub">
                    <li><a href="./aboutus.html">삼성바이오로직스</a></li>
                    <li><a href="#">리더십</a></li>
                    <li><a href="#">사업장 소개</a></li>
                </ul>
            </li>
            <li>
                <a href="./ourservices.html">Our Services</a>
                <ul class="m_sub">
                    <li><a href="./ourservices.html">Research Services</a></li>
                    <li><a href="./d_research.html">Development Services</a></li>
                    <li><a href="./m_research.html">Manufacturing Services</a></li>
                    <li><a href="./a_research.html">Advanced Modalities</a></li>
                    <li><a href="./q_research.html">Quality Services</a></li>
                </ul>
            </li>
            <li>
                <a href="./sustainability.html">Sustainability</a>
                <ul class="m_sub">
                    <li><a href="#">ESG 경영</a></li>
                </ul>
            </li>
            <li>
                <a href="./careers.html">Careers</a>
                <ul class="m_sub">
                    <li><a href="#">인재상</a></li>
                </ul>
            </li>
            <li>
                <a href="./newsroom.html">Newsroom</a>
                <ul class="m_sub">
                    <li><a href="#">뉴스룸</a></li>
                </ul>
            </li>
        </ul>
    `;

    const dim = document.createElement("div");
    dim.className = "mobile_dim";

    document.body.appendChild(dim);
    document.body.appendChild(mobileMenu);

    const closeBtn = mobileMenu.querySelector(".mobile_menu_close");

    mobileBtn.addEventListener("click", function(){
        mobileMenu.classList.add("on");
        dim.classList.add("on");
    });

    closeBtn.addEventListener("click", function(){
        mobileMenu.classList.remove("on");
        dim.classList.remove("on");
    });

    dim.addEventListener("click", function(){
        mobileMenu.classList.remove("on");
        dim.classList.remove("on");
    });

    const menuLinks = mobileMenu.querySelectorAll(".m_menu > li > a");

    menuLinks.forEach(function(link){
        link.addEventListener("click", function(e){
            const sub = this.nextElementSibling;

            if(sub && sub.classList.contains("m_sub")){
                e.preventDefault();

                document.querySelectorAll(".mobile_menu .m_sub").forEach(function(item){
                    if(item !== sub) item.style.display = "none";
                });

                sub.style.display = sub.style.display === "block" ? "none" : "block";
            }
        });
    });

});