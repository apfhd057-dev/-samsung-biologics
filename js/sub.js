$(document).ready(function(){
    $('.sub').hide();
    $('.submn_area').hide().css({height:0});

    $('#header').mouseenter(function(){
        // $('.submn_area').stop(true,true).show().animate({height:250},200);
        // $('.sub').stop(true,true).fadeIn(150);
        $(this).addClass("act");
    });

    $('#header').mouseleave(function(){
        $('.sub').stop(true,true).fadeOut(100);
        $('.submn_area').stop(true,true).delay(0).animate({height:0},150,function(){
            $(this).hide();
        });
        $(this).removeClass("act");
    });
    $('#nav').mouseenter(function(){
        $('.submn_area').stop(true,true).show().animate({height:250},200);
        $('.sub').stop(true,true).fadeIn(150);
    });
    // $('#nav').mouseleave(function(){
    //     $('.sub').stop(true,true).fadeOut(100);
    //     $('.submn_area').stop(true,true).delay(0).animate({height:0},150,function(){
    //         $(this).hide();
    //     });  
    // });
    
  
    $('.submn_area').mouseleave(function(){
        $('#header').removeClass("act");
        $('.sub').stop(true,true).fadeOut(100);
        $('.submn_area').stop(true,true).delay(0).animate({height:0},150,function(){
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

window.addEventListener("load", function(){

    const mobileBtn = document.querySelector(".mobile_btn");
    if(!mobileBtn) return;

    const mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile_menu";

    mobileMenu.innerHTML = `
        <button class="mobile_menu_close">×</button>
        <ul class="m_menu">
            <li>
                <a href="#">ABOUT US</a>
                <ul class="m_sub">
                    <li><a href="./aboutus.html">삼성바이오로직스</a></li>
                    <li><a href="#">리더십</a></li>
                    <li><a href="#">사업장 소개</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Our Services</a>
                <ul class="m_sub">
                    <li><a href="./ourservices.html">Research Services</a></li>
                    <li><a href="./d_research.html">Development Services</a></li>
                    <li><a href="./m_research.html">Manufacturing Services</a></li>
                    <li><a href="./a_research.html">Advanced Modalities</a></li>
                    <li><a href="./q_research.html">Quality Services</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Sustainability</a>
                <ul class="m_sub">
                    <li><a href="./sustainability.html">ESG 경영</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Careers</a>
                <ul class="m_sub">
                    <li><a href="./careers.html">인재상</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Newsroom</a>
                <ul class="m_sub">
                    <li><a href="./newsroom.html">뉴스룸</a></li>
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

    closeBtn.addEventListener("click", closeMenu);
    dim.addEventListener("click", closeMenu);

    function closeMenu(){
        mobileMenu.classList.remove("on");
        dim.classList.remove("on");
    }

    const menuLinks = mobileMenu.querySelectorAll(".m_menu > li > a");

    menuLinks.forEach(function(link){
        link.addEventListener("click", function(e){
            e.preventDefault();

            const sub = this.nextElementSibling;

            document.querySelectorAll(".mobile_menu .m_sub").forEach(function(item){
                if(item !== sub) item.style.display = "none";
            });

            if(sub){
                sub.style.display = sub.style.display === "block" ? "none" : "block";
            }
        });
    });

});