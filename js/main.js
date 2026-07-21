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

const header = document.querySelector("#header");
const logo = document.querySelector(".logo img");
const searchicon = document.querySelector(".info_r img");

function updateHeaderLogo(){
    if(!header) return;

    const isScrolled = window.scrollY > 80;
    const isHover = header.classList.contains("hover");

    if(isScrolled || isHover){
        header.classList.add("scroll");
        if(logo) logo.src = "./images/Logo_B.svg";
        if(searchicon) searchicon.src = "./images/s_search_1.png";
    }else{
        header.classList.remove("scroll");
        if(logo) logo.src = "./images/Logo_w.svg";
        if(searchicon) searchicon.src = "./images/search.png";
    }
}

if(header){
    header.addEventListener("mouseenter", function(){
        header.classList.add("hover");
        updateHeaderLogo();
    });

    header.addEventListener("mouseleave", function(){
        header.classList.remove("hover");
        updateHeaderLogo();
    });
}

window.addEventListener("scroll", updateHeaderLogo);
window.addEventListener("load", updateHeaderLogo);


/* SERVICES */
const serviceData = [
    {
        title: "오가노이드 (Organoids)",
        desc: "환자 유래 오가노이드 (Patient-Derived Organoids) 기반의 약물 스크리닝<br>서비스로 신약 후보 물질의 효능을 평가합니다.",
        img: "./images/img_overview_01.png",
        link: "./ourservices.html"
    },
    {
        title: "개발 서비스 (Development)",
        desc: "세포주 개발부터 공정 개발, 분석법 개발까지<br>신약 개발 단계에 필요한 통합 CMC 서비스를 제공합니다.",
        img: "./images/img_overview_02.png",
        link: "./d_research.html"
    },
    {
        title: "생산 서비스 (Manufacturing)",
        desc: "소규모 파일럿 생산부터 대규모 상업 생산까지<br>고객의 개발 전략에 맞춘 유연한 생산 서비스를 제공합니다.",
        img: "./images/img_overview_03.png",
        link: "./m_research.html"
    },
    {
        title: "품질 관리 (Quality)",
        desc: "국제 규제 기준에 부합하는 품질 시스템을 기반으로<br>안정적이고 신뢰도 높은 바이오 생산 환경을 제공합니다.",
        img: "./images/img_overview_04.png",
        link: "./a_research.html"
    },
    {
        title: "신규 모달리티 (New Modalities)",
        desc: "ADC, mRNA 등 차세대 바이오의약품 분야까지<br>확장 가능한 생산 솔루션을 제공합니다.",
        img: "./images/img_overview_05.png",
        link: "./q_research.html"
    }
];

const menuBtns = document.querySelectorAll(".services_menu button");
const title = document.querySelector(".service_title");
const desc = document.querySelector(".service_desc");
const img = document.querySelector(".service_img");
const serviceLink = document.querySelector(".service_link");

let currentServiceIndex = 0;

function changeService(index) {
    if (currentServiceIndex === index) return;

    currentServiceIndex = index;
    const data = serviceData[index];

    if(title) title.innerHTML = data.title;
    if(desc) desc.innerHTML = data.desc;
    if(img) img.src = data.img;
    if(serviceLink) serviceLink.href = data.link;

    menuBtns.forEach(function(item) {
        item.classList.remove("active");
    });

    if(menuBtns[index]) menuBtns[index].classList.add("active");

    [title, desc, img].forEach(function(el){
        if(!el) return;
        el.classList.remove("service_motion");
        void el.offsetWidth;
        el.classList.add("service_motion");
    });
}

menuBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        const index = Number(btn.dataset.index);
        changeService(index);
    });
});


/* PERFORMANCE COUNT */
const counters = document.querySelectorAll(".count");
let isCounted = false;

function countUp() {
    counters.forEach(function(counter) {
        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";
        let current = 0;
        const speed = 30;
        const step = target / 60;

        const timer = setInterval(function() {
            current += step;

            if (current >= target) {
                counter.innerHTML = target + suffix;
                clearInterval(timer);
            } else {
                counter.innerHTML = Math.floor(current) + suffix;
            }
        }, speed);
    });
}

window.addEventListener("scroll", function() {
    const performance = document.querySelector("#performance");
    if(!performance) return;

    const performanceTop = performance.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (performanceTop < windowHeight * 0.8) {
        performance.classList.add("active");
    }

    if (performanceTop < windowHeight - 150 && isCounted === false) {
        countUp();
        isCounted = true;
    }
}, { passive:true });


/* ARCHIVE */
const archiveBox = document.querySelector("#archive .box");
let archiveItems = document.querySelectorAll("#archive .box > div");

const archivePrev = document.querySelector(".archive_prev");
const archiveNext = document.querySelector(".archive_next");
const archivePagination = document.querySelector(".archive_pagination");

if(archiveBox && archivePrev && archiveNext && archivePagination && archiveItems.length > 0){

    let archiveIndex = 1;
    let archiveTimer;
    const realCount = archiveItems.length;

    for (let i = 0; i < realCount; i++) {
        const dot = document.createElement("span");

        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", function() {
            archiveIndex = i + 1;
            archiveMove(true);
            restartAuto();
        });

        archivePagination.appendChild(dot);
    }

    const archiveDots = document.querySelectorAll(".archive_pagination span");

    const firstClone = archiveItems[0].cloneNode(true);
    const lastClone = archiveItems[archiveItems.length - 1].cloneNode(true);

    archiveBox.appendChild(firstClone);
    archiveBox.insertBefore(lastClone, archiveItems[0]);

    archiveItems = document.querySelectorAll("#archive .box > div");

    function archiveMove(transition = true) {
        archiveBox.style.transition = transition ? "transform 0.3s ease" : "none";

        archiveItems.forEach(function(item) {
            item.classList.remove("active");
        });

        if(archiveItems[archiveIndex]) {
            archiveItems[archiveIndex].classList.add("active");
        }

        let realIndex = archiveIndex - 1;

        if (realIndex < 0) realIndex = realCount - 1;
        if (realIndex >= realCount) realIndex = 0;

        archiveDots.forEach(function(dot) {
            dot.classList.remove("active");
        });

        if(archiveDots[realIndex]) {
            archiveDots[realIndex].classList.add("active");
        }

        const itemWidth = archiveItems[0].offsetWidth;
        const currentGap = window.innerWidth <= 768 ? 0 : 100;
        const moveX = archiveIndex * (itemWidth + currentGap);

        if (window.innerWidth <= 768) {
            archiveBox.style.transform = "translateX(-" + moveX + "px)";
        } else {
            archiveBox.style.transform =
                "translateX(calc(50% - " + (itemWidth / 2) + "px - " + moveX + "px))";
        }
    }

    function nextSlide() {
        archiveIndex++;
        archiveMove(true);
    }

    function prevSlide() {
        archiveIndex--;
        archiveMove(true);
    }

    archiveBox.addEventListener("transitionend", function() {
        if (archiveIndex === archiveItems.length - 1) {
            archiveIndex = 1;
            archiveMove(false);
        }

        if (archiveIndex === 0) {
            archiveIndex = archiveItems.length - 2;
            archiveMove(false);
        }
    });

    archiveNext.addEventListener("click", function() {
        nextSlide();
        restartAuto();
    });

    archivePrev.addEventListener("click", function() {
        prevSlide();
        restartAuto();
    });

    function startAuto() {
        archiveTimer = setInterval(nextSlide, 3000);
    }

    function restartAuto() {
        clearInterval(archiveTimer);
        startAuto();
    }

    archiveMove(false);
    startAuto();
}


/* NEWSROOM */
const newsList = document.querySelector("#newsroom .news_list");
const newsPrev = document.querySelector("#newsroom .circle_l");
const newsNext = document.querySelector("#newsroom .circle_r");

const originalNewsItems = Array.from(
    document.querySelectorAll("#newsroom .news_item")
);

if(newsList && newsPrev && newsNext && originalNewsItems.length > 0){

    let newsIndex = 0;
    const visibleCount = 3;
    const maxIndex = Math.max(originalNewsItems.length - visibleCount, 0);

    function renderNews() {
        newsList.innerHTML = "";

        for (let i = newsIndex; i < newsIndex + visibleCount; i++) {
            if(originalNewsItems[i]) newsList.appendChild(originalNewsItems[i]);
        }

        newsPrev.classList.remove("disabled", "active");
        newsNext.classList.remove("disabled", "active");

        if (newsIndex === 0) {
            newsPrev.classList.add("disabled");
        } else {
            newsPrev.classList.add("active");
        }

        if (newsIndex === maxIndex) {
            newsNext.classList.add("disabled");
        } else {
            newsNext.classList.add("active");
        }
    }

    newsNext.addEventListener("click", function () {
        if (newsIndex < maxIndex) {
            newsIndex++;
            renderNews();
        }
    });

    newsPrev.addEventListener("click", function () {
        if (newsIndex > 0) {
            newsIndex--;
            renderNews();
        }
    });

    renderNews();
}


/* SECTION POP */
const popItems = document.querySelectorAll(
    ".services_section, .performance_inner, .archive_inner, .archive_slider, .newsroom_inner, .notice_inner, .mcontact_inner"
);

popItems.forEach(function(item) {
    item.classList.add("section-pop");
});

function popOnScroll() {
    popItems.forEach(function(item) {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight * 0.78) {
            item.classList.add("show");
        }
    });
}

window.addEventListener("scroll", popOnScroll, { passive: true });
popOnScroll();


/* ESG */
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

    "(min-width: 1201px)": function(){

        const esgSection = document.querySelector("#esg");
        const esgImg = document.querySelector("#esg .esg_img");
        const esgTitle = document.querySelector("#esg .esg_title");
        const esgRight = document.querySelector("#esg .esg_right");
        const esgCards = gsap.utils.toArray("#esg .esg_card");

        if(esgSection && esgImg && esgTitle && esgRight && esgCards.length > 0){

            gsap.set(esgImg, {
                left: "50%",
                top: "44.5%",
                width: 760,
                height: 760,
                xPercent: -50,
                yPercent: -50,
                scale: 1.05
            });

            gsap.set(esgTitle, {
                opacity: 0
            });

            gsap.set(esgRight, {
                opacity: 0
            });

            gsap.set(esgCards, {
                y: function(index){
                    return 300 + index * 420;
                }
            });

            const esgTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#esg",
                    start: "top 110px",
                    end: "+=3200",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            esgTl
            // 가운데에서 크게 머무는 시간
            .to({}, {
                duration: 0.7
            })

            // 지구본 왼쪽 이동
            .to(esgImg, {
                left: "20%",
                top: "59%",
                width: 500,
                height: 500,
                scale: 1,
                duration: 0.8,
                ease: "power2.inOut"
            })

            // 제목 등장
            .to(esgTitle, {
                opacity: 1,
                duration: 0.4
            }, "-=0.3")

            // 카드 등장
            .to(esgRight, {
                opacity: 1,
                duration: 0.4
            })

            // 카드 위로 이동
            .to(esgCards, {
                y: function(index){
                    return -620 + index * 350;
                },
                ease: "none",
                duration: 1.8
            });
        }
    },

    "(max-width: 1200px)": function(){

        const esgSection = document.querySelector("#esg");
        const esgImg = document.querySelector("#esg .esg_img");
        const esgTitle = document.querySelector("#esg .esg_title");
        const esgRight = document.querySelector("#esg .esg_right");
        const esgCards = gsap.utils.toArray("#esg .esg_card");

        if(esgSection) esgSection.classList.remove("active");

        gsap.set([esgImg, esgTitle, esgRight, esgCards], {
            clearProps: "all"
        });
    }

});

/* MAIN VISUAL SHRINK */
window.addEventListener("scroll", function () {
    const visual = document.querySelector("#main_visual");
    if (!visual) return;

    let progress = window.scrollY / 500;
    progress = Math.max(0, Math.min(progress, 1));

    const scale = 1 - progress * 0.10;
    const width = 100 - progress * 2;

    visual.style.transform = `scale(${scale})`;
    visual.style.width = `${width}%`;
    visual.style.margin = "0 auto";
});

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

window.addEventListener("scroll", function(){
    const header = document.querySelector("#header");

    if(window.scrollY > 80){
        header.classList.add("scroll");
    }else{
        header.classList.remove("scroll");
    }
});
