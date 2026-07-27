$(document).ready(function(){

    const SUBMENU_HEIGHT = 350;

    const $header = $('#header');
    const $sub = $('.sub');
    const $subArea = $('.submn_area');

    $sub.hide();
    $subArea.hide().css({ height: 0 });

    $header.on('mouseenter', function(){
        $header.addClass('act');
        updateHeaderAssets();
    });

    $('#nav').on('mouseenter', function(){
        $subArea
            .stop(true, true)
            .show()
            .animate({ height: SUBMENU_HEIGHT }, 200);

        $sub
            .stop(true, true)
            .fadeIn(150);
    });

    $header.on('mouseleave', closeDesktopMenu);
    $subArea.on('mouseleave', closeDesktopMenu);

    function closeDesktopMenu(){
        $header.removeClass('act');

        $sub
            .stop(true, true)
            .fadeOut(100);

        $subArea
            .stop(true, true)
            .animate({ height: 0 }, 150, function(){
                $(this).hide();
            });

        updateHeaderAssets();
    }
});

const header = document.querySelector('#header');
const headerLogo = document.querySelector('#header .logo img');
const headerSearchIcon = document.querySelector('#header .info_r img');

function updateHeaderState(){
    if(!header) return;

    if(window.scrollY > 80){
        header.classList.add('scroll');
    }else{
        header.classList.remove('scroll');
    }

    updateHeaderAssets();
}

function updateHeaderAssets(){
    if(!header) return;

    const useDarkAssets =
        window.scrollY > 80 ||
        header.classList.contains('act') ||
        header.matches(':hover');

    if(headerLogo){
        headerLogo.src = useDarkAssets
            ? './images/Logo_B.svg'
            : './images/Logo_B.svg';
    }

    if(headerSearchIcon){
        headerSearchIcon.src = useDarkAssets
            ? './images/s_search_1.png'
            : './images/s_search_1.png';
    }
}

window.addEventListener('scroll', updateHeaderState, { passive: true });
window.addEventListener('load', updateHeaderState);

window.addEventListener('load', function(){

    const motionItems = document.querySelectorAll('.motion');

    setTimeout(function(){

        const observer = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -8% 0px'
        });

        motionItems.forEach(function(item){
            observer.observe(item);
        });

    }, 300);
});

window.addEventListener('load', function(){

    const mobileBtn = document.querySelector('.mobile_btn');
    if(!mobileBtn) return;

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile_menu';

    mobileMenu.innerHTML = `
        <button class="mobile_menu_close" type="button" aria-label="메뉴 닫기">×</button>
        <ul class="m_menu">
            <li>
                <a href="#">About us</a>
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

    const dim = document.createElement('div');
    dim.className = 'mobile_dim';

    document.body.appendChild(dim);
    document.body.appendChild(mobileMenu);

    const closeBtn = mobileMenu.querySelector('.mobile_menu_close');

    mobileBtn.addEventListener('click', function(){
        mobileMenu.classList.add('on');
        dim.classList.add('on');
    });

    closeBtn.addEventListener('click', closeMenu);
    dim.addEventListener('click', closeMenu);

    function closeMenu(){
        mobileMenu.classList.remove('on');
        dim.classList.remove('on');
    }

    mobileMenu.querySelectorAll('.m_menu > li > a').forEach(function(link){
        link.addEventListener('click', function(event){
            const sub = this.nextElementSibling;

            if(!sub || !sub.classList.contains('m_sub')) return;

            event.preventDefault();

            document.querySelectorAll('.mobile_menu .m_sub').forEach(function(item){
                if(item !== sub){
                    item.style.display = 'none';
                }
            });

            sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
        });
    });
});


/* =========================================================
   SECTION 05 — 생산시설 자유 드래그 + 관성 + 진행바
========================================================= */

function initFacilityDrag(){
    const slider = document.querySelector('#section5 .s5_wrap');
    const progressTrack = document.querySelector('#section5 .s5_progress');
    const progressBar = document.querySelector('#section5 .s5_progress_bar');

    if(!slider) return;

    let isDragging = false;
    let activePointerId = null;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let inertiaFrame = null;

    slider.style.scrollSnapType = 'none';
    slider.style.scrollBehavior = 'auto';
    slider.style.touchAction = 'pan-y';

    function clampScroll(value){
        const maxScroll = Math.max(slider.scrollWidth - slider.clientWidth, 0);
        return Math.min(Math.max(value, 0), maxScroll);
    }

    function updateProgress(){
        if(!progressTrack || !progressBar) return;

        const visibleWidth = slider.clientWidth;
        const totalWidth = slider.scrollWidth;
        const maxScroll = Math.max(totalWidth - visibleWidth, 0);
        const progressWidth = progressTrack.clientWidth;

        const visibleRatio =
            totalWidth > 0
                ? Math.min(visibleWidth / totalWidth, 1)
                : 1;

        const barWidth = Math.max(progressWidth * visibleRatio, 40);
        const movableWidth = Math.max(progressWidth - barWidth, 0);
        const scrollRatio =
            maxScroll > 0
                ? slider.scrollLeft / maxScroll
                : 0;

        progressBar.style.width = barWidth + 'px';
        progressBar.style.transform =
            'translate3d(' + (movableWidth * scrollRatio) + 'px, 0, 0)';
    }

    function stopInertia(){
        if(inertiaFrame !== null){
            cancelAnimationFrame(inertiaFrame);
            inertiaFrame = null;
        }
    }

    function runInertia(){
        stopInertia();

        function step(){
            velocity *= 0.94;

            if(Math.abs(velocity) < 0.05){
                inertiaFrame = null;
                return;
            }

            const before = slider.scrollLeft;
            slider.scrollLeft = clampScroll(before - velocity * 16);
            updateProgress();

            if(slider.scrollLeft === before){
                inertiaFrame = null;
                return;
            }

            inertiaFrame = requestAnimationFrame(step);
        }

        inertiaFrame = requestAnimationFrame(step);
    }

    slider.addEventListener('pointerdown', function(event){
        if(event.pointerType === 'mouse' && event.button !== 0) return;

        stopInertia();

        isDragging = true;
        activePointerId = event.pointerId;
        lastX = event.clientX;
        lastTime = performance.now();
        velocity = 0;

        slider.classList.add('dragging');
        slider.setPointerCapture(event.pointerId);
    });

    slider.addEventListener('pointermove', function(event){
        if(!isDragging || event.pointerId !== activePointerId) return;

        const now = performance.now();
        const deltaX = event.clientX - lastX;
        const deltaTime = Math.max(now - lastTime, 1);

        slider.scrollLeft = clampScroll(slider.scrollLeft - deltaX);

        velocity = deltaX / deltaTime;
        lastX = event.clientX;
        lastTime = now;

        updateProgress();
    });

    function endDrag(event){
        if(!isDragging) return;

        if(
            event &&
            activePointerId !== null &&
            event.pointerId !== activePointerId
        ){
            return;
        }

        isDragging = false;
        slider.classList.remove('dragging');

        if(
            activePointerId !== null &&
            slider.hasPointerCapture(activePointerId)
        ){
            slider.releasePointerCapture(activePointerId);
        }

        activePointerId = null;
        runInertia();
    }

    slider.addEventListener('pointerup', endDrag);
    slider.addEventListener('pointercancel', endDrag);
    slider.addEventListener('lostpointercapture', function(){
        if(isDragging){
            isDragging = false;
            slider.classList.remove('dragging');
            activePointerId = null;
            runInertia();
        }
    });

    slider.addEventListener('scroll', updateProgress, {
        passive: true
    });

    slider.addEventListener('dragstart', function(event){
        event.preventDefault();
    });

    slider.querySelectorAll('img').forEach(function(image){
        image.draggable = false;
    });

    window.addEventListener('resize', updateProgress);

    updateProgress();
}

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initFacilityDrag);
}else{
    initFacilityDrag();
}
