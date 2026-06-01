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

const header = document.querySelector("#header");
const logo = document.querySelector(".logo img");
const searchicon = document.querySelector(".info_r img");

header.addEventListener("mouseenter", function(){
    header.classList.add("on");
    logo.src = "./images/logo_b.png";
    searchicon.src = "./images/s_search_1.png";
});

header.addEventListener("mouseleave", function(){
    header.classList.remove("on");
    logo.src = "./images/logo.png";
    searchicon.src = "./images/search.png";
});

const serviceData = [
    {
        title: "오가노이드 (Organoids)",
        desc: "환자 유래 오가노이드 (Patient-Derived Organoids) 기반의 약물 스크리닝<br>서비스로 신약 후보 물질의 효능을 평가합니다.",
        img: "./images/Original_Loop_high_img.png",
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

    title.innerHTML = data.title;
    desc.innerHTML = data.desc;
    img.src = data.img;
    serviceLink.href = data.link;

    menuBtns.forEach(function(item) {
        item.classList.remove("active");
    });

    menuBtns[index].classList.add("active");

    title.classList.remove("service_motion");
    desc.classList.remove("service_motion");
    img.classList.remove("service_motion");

    void title.offsetWidth;

    title.classList.add("service_motion");
    desc.classList.add("service_motion");
    img.classList.add("service_motion");
}

menuBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        const index = Number(btn.dataset.index);
        changeService(index);
    });
});

const counters = document.querySelectorAll(".count");
let isCounted = false;

function countUp() {
    counters.forEach(function(counter) {
        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix;
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
    const performanceTop = performance.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (performanceTop < windowHeight * 0.8) {
        performance.classList.add("active");
    }

});
window.addEventListener("scroll", function() {
    const performance = document.querySelector("#performance");
    const performanceTop = performance.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (performanceTop < windowHeight - 150 && isCounted === false) {
        countUp();
        isCounted = true;
    }
});

const archiveBox = document.querySelector("#archive .box");
let archiveItems = document.querySelectorAll("#archive .box div");

const archivePrev = document.querySelector(".archive_prev");
const archiveNext = document.querySelector(".archive_next");
const archivePagination = document.querySelector(".archive_pagination");

let archiveIndex = 1;
let archiveTimer;
const gap = 100;
const realCount = archiveItems.length;

// pagination 만들기
for (let i = 0; i < realCount; i++) {
    const dot = document.createElement("span");

    if (i === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", function() {
        archiveIndex = i + 1;
        archiveMove(true);
        restartAuto();
    });

    archivePagination.appendChild(dot);
}

const archiveDots = document.querySelectorAll(".archive_pagination span");

// 앞뒤 복제
const firstClone = archiveItems[0].cloneNode(true);
const lastClone = archiveItems[archiveItems.length - 1].cloneNode(true);

archiveBox.appendChild(firstClone);
archiveBox.insertBefore(lastClone, archiveItems[0]);

archiveItems = document.querySelectorAll("#archive .box div");

function archiveMove(transition = true) {
    archiveBox.style.transition = transition ? "transform 0.3s ease" : "none";

    archiveItems.forEach(function(item) {
        item.classList.remove("active");
    });

    archiveItems[archiveIndex].classList.add("active");

    let realIndex = archiveIndex - 1;

    if (realIndex < 0) {
        realIndex = realCount - 1;
    }

    if (realIndex >= realCount) {
        realIndex = 0;
    }

    archiveDots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    archiveDots[realIndex].classList.add("active");

    const itemWidth = archiveItems[0].offsetWidth;
    const moveX = archiveIndex * (itemWidth + gap);

    archiveBox.style.transform =
        "translateX(calc(50% - 450px - " + moveX + "px))";
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

const newsList = document.querySelector("#newsroom .news_list");
const newsPrev = document.querySelector("#newsroom .circle_l");
const newsNext = document.querySelector("#newsroom .circle_r");

const originalNewsItems = Array.from(
    document.querySelectorAll("#newsroom .news_item")
);

let newsIndex = 0;
const visibleCount = 3;
const maxIndex = originalNewsItems.length - visibleCount;

function renderNews() {
    newsList.innerHTML = "";

    for (let i = newsIndex; i < newsIndex + visibleCount; i++) {
        newsList.appendChild(originalNewsItems[i]);
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

const esgSection = document.querySelector("#esg");

window.addEventListener("scroll", function () {
    const esgTop = esgSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (esgTop < windowHeight * 0.3) {
        esgSection.classList.add("active");
    } else {
        esgSection.classList.remove("active");
    }
}, { passive: true });

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

const esgCards = document.querySelectorAll("#esg .esg_card");

window.addEventListener("scroll", function () {

    const esgTop = esgSection.offsetTop;
    const scrollY = window.scrollY;

    const progress = scrollY - esgTop;

    // 지구본 이동 시작
    if (progress > 150) {
        esgSection.classList.add("active");
    } else {
        esgSection.classList.remove("active");
    }

    // 카드만 내려오기
    if (progress > 300 && progress < 2800) {

    esgCards.forEach(function(card, index) {

        const moveY = (progress - 300) * 0.28;

        card.style.transform =
            "translateY(" + (moveY + index * 360) + "px)";
    });

}

});

document.querySelectorAll(".esg_simg").forEach(function (box) {
  const video = box.querySelector("video");

  if (!video) return;

  box.addEventListener("mouseenter", function () {
    video.currentTime = 0;
    video.play();
  });

  box.addEventListener("mouseleave", function () {
    video.pause();
    video.currentTime = 0;
  });
});

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

